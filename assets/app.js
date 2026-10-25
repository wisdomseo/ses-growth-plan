/* SES auto growth plan: state, model, charts, interactive sections.
   All numbers come from assets/data.js; this file only computes and renders. */
(function () {
  "use strict";
  var D = window.DATA;
  var KEY = "ses-growth-plan-v1";
  var CASES = ["low", "mid", "high"];

  /* ---------- state (per viewer, browser only) ---------- */
  var defaults = {
    inputs: { start: 0, target: 100000, months: 3, fee: 2500, stay: 12, salesCap: 10, onboardCap: 6 },
    caseName: "mid",
    area: "top20",
    mix: {},
    checks: {},
    decisions: {},
    notes: {},
    vertical: "all"
  };
  D.channels.forEach(function (c) { defaults.mix[c.id] = { on: c.defaultOn !== false, v: c.default }; });
  var S = load();
  function load() {
    var s = JSON.parse(JSON.stringify(defaults));
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        ["inputs", "mix", "checks", "decisions", "notes"].forEach(function (k) { Object.assign(s[k], saved[k] || {}); });
        ["caseName", "area", "vertical"].forEach(function (k) { if (saved[k]) s[k] = saved[k]; });
      }
    } catch (e) { /* storage blocked: defaults only */ }
    return s;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function money(n) {
    if (!isFinite(n)) return "n/a";
    var a = Math.abs(n);
    if (a >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
    if (a >= 10000) return "$" + Math.round(n / 1000) + "k";
    return "$" + Math.round(n).toLocaleString("en-US");
  }
  function moneyFull(n) { return isFinite(n) ? "$" + Math.round(n).toLocaleString("en-US") : "n/a"; }
  function num(n, d) {
    if (!isFinite(n)) return "n/a";
    if (d == null) d = Math.abs(n) < 10 ? 1 : 0;
    return Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function cssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function monthLabel(i) {
    var start = new Date(D.startMonth + "-01T12:00:00");
    var d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    return d.toLocaleString("en-US", { month: "short" }) + (d.getMonth() === 0 || i === 0 ? " " + String(d.getFullYear()).slice(2) : "");
  }
  function monthYear(i) {
    var start = new Date(D.startMonth + "-01T12:00:00");
    var d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    return d.toLocaleString("en-US", { month: "short" }) + " " + d.getFullYear();
  }
  function chartSize(svg, h1, h2) {
    var w = Math.round(svg.getBoundingClientRect().width) || 720;
    w = Math.max(300, Math.min(900, w));
    var h = w < 520 ? h2 : h1;
    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    return { W: w, H: h, step: function (n) { return n > 12 ? (w < 520 ? 4 : 2) : (w < 520 ? 2 : 1); } };
  }
  function chById(id) { for (var i = 0; i < D.channels.length; i++) if (D.channels[i].id === id) return D.channels[i]; }

  /* ---------- model ---------- */
  function ltc(cs) { return D.base.leadToClient[cs]; }
  function m2c(cs) { return D.base.leadToClient[cs] / D.base.leadToQualified; }
  function mult(x, cs) { return x == null ? 1 : (typeof x === "object" ? x[cs] : x); }
  function ramp(c, m) { var r = c.ramp || [1]; return m < r.length ? r[m] : r[r.length - 1]; }

  /* One channel, one month: returns {spend, leads, meetings, clients, hours} at volume v. */
  function channelMonth(c, v, m, cs, area, used) {
    var out = { spend: 0, leads: 0, qualified: 0, meetings: 0, clients: 0, hours: 0, capped: false };
    var r = ramp(c, m);
    if (c.kind === "fixed") {
      var f = c.fixed[area];
      out.spend = f.spend[cs];
      out.leads = f.leads[cs];
      out.qualified = out.leads * D.base.leadToQualified;
      out.clients = out.leads * ltc(cs);
      return out;
    }
    if (c.kind === "paid") {
      if (c.minBudget && v > 0 && v < c.minBudget) v = c.minBudget;
      out.spend = v;
      var eff = v;
      if (c.saturate && c.saturate[area] && v > c.saturate[area]) { eff = c.saturate[area] + (v - c.saturate[area]) * 0.5; out.saturated = true; }
      out.leads = (eff / c.cpl[cs]) * r;
      out.qualified = out.leads * D.base.leadToQualified * mult(c.qualMult, cs);
      out.clients = out.leads * ltc(cs) * mult(c.ltcMult, cs);
      return out;
    }
    if (c.kind === "outbound") {
      var vol = v;
      if (c.listCap) {
        var cap = c.listCap[area] - (used || 0);
        if (vol > cap) { vol = Math.max(0, cap); out.capped = true; }
      }
      out.volume = vol * r;
      out.booked = (vol / c.perMeeting[cs]) * r;
      out.meetings = out.booked * mult(c.show, cs);
      out.qualified = out.meetings;
      out.clients = out.meetings * m2c(cs);
      out.spend = vol > 0 ? c.cost(vol) : 0;
      out.hours = vol * (c.minutesEach || 0) / 60;
      return out;
    }
    if (c.kind === "meetings") {
      out.meetings = v * r;
      out.qualified = out.meetings;
      out.clients = out.meetings * c.close[cs];
      out.spend = c.cost ? c.cost(v) : 0;
      return out;
    }
    return out;
  }

  function simulate(opts) {
    var cs = opts.caseName, area = opts.area, months = opts.months;
    var churn = 1 / Math.max(1, opts.stay);
    var mrr = opts.start, rows = [], used = {};
    for (var m = 0; m < months; m++) {
      var row = { m: m, label: monthLabel(m), byFam: {}, byCh: {}, spend: 0, leads: 0, qualified: 0, meetings: 0, clients: 0, hours: 0, capped: [] };
      D.channels.forEach(function (c) {
        var mx = opts.mix[c.id];
        if (!mx || !mx.on) return;
        if (c.kind !== "fixed" && !(mx.v > 0)) return;
        var o = channelMonth(c, mx.v, m, cs, area, used[c.id]);
        if (c.listCap) used[c.id] = (used[c.id] || 0) + (o.volume || 0);
        if (o.capped) row.capped.push(c.id);
        if (o.saturated) row.saturated = (row.saturated || []).concat([c.id]);
        row.byCh[c.id] = o;
        row.byFam[c.family] = (row.byFam[c.family] || 0) + o.clients;
        row.spend += o.spend; row.leads += o.leads; row.qualified += o.qualified;
        row.meetings += o.meetings; row.clients += o.clients; row.hours += o.hours;
      });
      mrr = mrr * (1 - churn) + row.clients * opts.fee;
      row.mrr = mrr;
      rows.push(row);
    }
    var hit = -1;
    for (var i = 0; i < rows.length; i++) if (rows[i].mrr >= opts.target) { hit = i; break; }
    return { rows: rows, hit: hit };
  }

  /* Steady new clients a month needed to reach target by month M, given a channel's ramp. */
  function neededPerMonth(inp, rampArr) {
    var c = 1 / Math.max(1, inp.stay), M = inp.months;
    var base = inp.start * Math.pow(1 - c, M);
    var gap = inp.target - base;
    if (gap <= 0) return 0;
    var w = 0;
    for (var m = 0; m < M; m++) {
      var r = rampArr ? (m < rampArr.length ? rampArr[m] : rampArr[rampArr.length - 1]) : 1;
      w += r * Math.pow(1 - c, M - 1 - m);
    }
    return gap / (inp.fee * w);
  }

  /* ---------- section: the answer ---------- */
  function renderAnswer() {
    var inp = S.inputs, cs = S.caseName;
    var flat = neededPerMonth(inp, null);
    var total = flat * inp.months;
    var calls = flat / m2c(cs) / 4.33;
    if (!$("#answer-head")) return;
    var already = flat <= 0;
    var head = already
      ? "You are already at or above the target with the stay you entered."
      : "To reach <b>" + money(inp.target) + " MRR</b> in <b>" + inp.months + " month" + (inp.months > 1 ? "s" : "") +
        "</b>, SES has to sign about <b>" + num(flat, 1) + " new clients every month</b> (" + num(total, 0) +
        " in total) at " + moneyFull(inp.fee) + " a month each, starting now.";
    var cap = [];
    if (!already) {
      cap.push("That means about <b>" + num(calls, 0) + " qualified sales calls a week</b> at a " +
        Math.round(m2c(cs) * 100) + "% close rate (" + cs + " case), and onboarding " + num(flat, 0) + " clients a month.");
      if (calls > inp.salesCap) cap.push("<span style='color:var(--bad)'>Above the " + inp.salesCap + " sales calls a week you said the team can run.</span>");
      if (flat > inp.onboardCap) cap.push("<span style='color:var(--bad)'>Above the " + inp.onboardCap + " onboardings a month you said the team can take.</span>");
    }
    $("#answer-head").innerHTML = head;
    $("#answer-cap").innerHTML = cap.join(" ");

    var tb = $("#alone-body");
    tb.innerHTML = "";
    D.channels.forEach(function (c) {
      if (!c.alone) return;
      var tr = el("tr");
      var need = neededPerMonth(inp, c.ramp);
      var what = "", cost = "", note = c.alone.note || "";
      if (already) { what = "n/a"; cost = "n/a"; }
      else if (c.kind === "fixed") {
        var f = c.fixed[S.area];
        var max = f.leads[cs] * ltc(cs);
        what = "Can't scale: about " + num(max, 2) + " clients a month at most";
        cost = moneyFull(f.spend[cs]) + " a month (all it can spend)";
      } else if (c.kind === "paid") {
        var leads = need / (ltc(cs) * mult(c.ltcMult, cs));
        var budget = leads * c.cpl[cs];
        what = num(leads, 0) + " leads a month at " + moneyFull(c.cpl[cs]) + " each";
        cost = "<b>" + money(budget) + "</b> a month in ads";
      } else if (c.kind === "outbound") {
        var meetings = need / m2c(cs);
        var vol = (meetings / mult(c.show, cs)) * c.perMeeting[cs];
        what = num(vol, 0) + " " + c.alone.unit + " a month (" + num(meetings, 0) + " held meetings)";
        cost = money(c.cost(vol)) + " a month in tools" + (c.minutesEach ? ", " + num(vol * c.minutesEach / 60 / 4.33, 0) + " hours a week" : "");
        if (c.listCap) {
          var mo = c.listCap[S.area] / vol;
          note = (note ? note + " " : "") + "The " + (S.area === "top20" ? "top 20 metro" : "US") + " list lasts about " + num(mo, 1) + " months at that pace.";
        }
      } else if (c.kind === "meetings") {
        var mt = need / c.close[cs];
        what = num(mt, 0) + " referral or partner meetings a month";
        cost = "Referral fees only";
      }
      tr.innerHTML = "<td><b>" + c.name + "</b><div class='tiny muted'>" + note + "</div></td><td>" + what + "</td><td>" + cost + "</td>";
      tb.appendChild(tr);
    });
    save();
  }

  function bindAnswerInputs() {
    $$("[data-in]").forEach(function (inp) {
      var k = inp.getAttribute("data-in");
      inp.value = S.inputs[k];
      var show = $("[data-show='" + k + "']");
      function upd() {
        var v = parseFloat(inp.value);
        if (!isFinite(v)) v = 0;
        S.inputs[k] = v;
        if (show) show.textContent = inp.getAttribute("data-fmt") === "money" ? moneyFull(v) : num(v, 0);
        renderAnswer(); renderBuilderOutputs();
      }
      inp.addEventListener("input", upd);
      if (show) show.textContent = inp.getAttribute("data-fmt") === "money" ? moneyFull(S.inputs[k]) : num(S.inputs[k], 0);
    });
    $$("[data-case]").forEach(function (b) {
      b.addEventListener("click", function () { S.caseName = b.getAttribute("data-case"); syncSegs(); renderAnswer(); renderBuilderOutputs(); });
    });
    $$("[data-area]").forEach(function (b) {
      b.addEventListener("click", function () { S.area = b.getAttribute("data-area"); syncSegs(); renderAnswer(); renderBuilderOutputs(); });
    });
    syncSegs();
  }
  function syncSegs() {
    $$("[data-case]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-case") === S.caseName); });
    $$("[data-area]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-area") === S.area); });
  }

  /* ---------- section: channel cards ---------- */
  function renderChannels() {
    var host = $("#channel-cards");
    if (!host) return;
    host.innerHTML = "";
    D.cards.forEach(function (k) {
      if (S.vertical !== "all" && k.verticals.indexOf(S.vertical) < 0) return;
      var card = el("article", { class: "card ch" });
      card.innerHTML =
        "<div class='top-row'><h3>" + k.name + "</h3><span class='pill " + k.verdict + "'>" + D.verdicts[k.verdict] + "</span></div>" +
        "<p class='small' style='color:var(--fg-2)'>" + k.what + "</p>" +
        "<div class='facts'><div><span>Reach</span><b>" + k.reach + "</b></div><div><span>Cost</span><b>" + k.cost + "</b></div><div><span>First meeting</span><b>" + k.speed + "</b></div></div>" +
        "<details><summary>Why, and how to start</summary><div class='body'>" + k.detail + (k.src ? "<p class='src'>" + k.src + "</p>" : "") + "</div></details>";
      host.appendChild(card);
    });
    $$("[data-vert]").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-vert") === S.vertical); });
  }
  function bindChannelFilter() {
    $$("[data-vert]").forEach(function (b) {
      b.addEventListener("click", function () { S.vertical = b.getAttribute("data-vert"); save(); renderChannels(); renderSignals(); });
    });
  }

  /* ---------- section: funnel builder ---------- */
  function renderMix() {
    var host = $("#mix");
    if (!host) return;
    host.innerHTML = "";
    D.channels.forEach(function (c) {
      var mx = S.mix[c.id];
      var row = el("div", { class: "mix-row" + (mx.on ? "" : " off") });
      var fam = D.families[c.family];
      var id = "mix-" + c.id;
      var h = "<div class='hd'><label for='" + id + "-on'><input type='checkbox' id='" + id + "-on'" + (mx.on ? " checked" : "") +
        "><span class='swatch' style='background:var(" + fam.color + ")'></span>" + c.name + "</label><span class='val num' id='" + id + "-val'></span></div>";
      if (c.kind !== "fixed") {
        h += "<input type='range' id='" + id + "' min='" + c.min + "' max='" + c.max + "' step='" + c.step + "' value='" + mx.v + "' aria-label='" + c.name + " " + c.unit + "'>";
      } else {
        h += "<div class='tiny muted'>Fixed: the auto campaign spends what the searches allow. Area and case toggles change it.</div>";
      }
      h += "<div class='tiny muted'>" + c.hint + "</div>";
      row.innerHTML = h;
      host.appendChild(row);
      var cb = $("#" + id + "-on", row);
      cb.addEventListener("change", function () { mx.on = cb.checked; row.classList.toggle("off", !mx.on); renderBuilderOutputs(); });
      var sl = $("#" + id, row);
      if (sl) sl.addEventListener("input", function () { mx.v = parseFloat(sl.value); renderBuilderOutputs(); });
    });
  }
  function mixLabel(c) {
    var mx = S.mix[c.id];
    if (c.kind === "fixed") return money(c.fixed[S.area].spend[S.caseName]) + "/mo";
    if (c.unitShort === "$") return money(mx.v) + "/mo";
    return num(mx.v, 0) + " " + c.unitShort;
  }
  function applyPreset(p) {
    D.channels.forEach(function (c) {
      var v = p.mix[c.id];
      if (v == null) { S.mix[c.id] = { on: c.kind === "fixed" ? !!p.search : false, v: c.default }; }
      else S.mix[c.id] = { on: true, v: v };
    });
    if (p.search === false) S.mix.search.on = false;
    renderMix(); renderBuilderOutputs();
  }
  function renderPresets() {
    var host = $("#presets");
    if (!host) return;
    D.presets.forEach(function (p) {
      var b = el("button", { class: "btn", type: "button", title: p.note }, p.name);
      b.addEventListener("click", function () { applyPreset(p); });
      host.appendChild(b);
    });
  }

  var lastSim = null;
  function renderBuilderOutputs() {
    if (!$("#mix")) return;
    D.channels.forEach(function (c) { var v = $("#mix-" + c.id + "-val"); if (v) v.textContent = mixLabel(c); });
    var inp = S.inputs;
    var horizon = Math.max(12, Math.min(24, inp.months * 2));
    var sim = simulate({ caseName: S.caseName, area: S.area, months: horizon, stay: inp.stay, start: inp.start, fee: inp.fee, target: inp.target, mix: S.mix });
    lastSim = sim;
    var r = sim.rows;
    var atM = r[Math.min(inp.months, r.length) - 1];
    var avg = function (k, n) { var s = 0; for (var i = 0; i < n; i++) s += r[i][k]; return s / n; };
    var n3 = Math.min(3, r.length);
    var spend3 = avg("spend", n3), clients3 = avg("clients", n3);
    var steady = r[Math.min(5, r.length - 1)];
    var callsWk = steady.qualified / 4.33;
    $("#k-target").textContent = sim.hit >= 0 ? monthYear(sim.hit) : "Not in " + horizon + " months";
    $("#k-target-s").textContent = sim.hit >= 0 ? "Month " + (sim.hit + 1) + " of the plan" : "Peak in view: " + money(Math.max.apply(null, r.map(function (x) { return x.mrr; })));
    $("#k-mrrm").textContent = money(atM.mrr);
    $("#k-mrrm-l").textContent = "MRR after month " + inp.months;
    $("#k-new").textContent = num(steady.clients, 1);
    $("#k-spend").textContent = money(steady.spend);
    $("#k-cac").textContent = steady.clients > 0 ? money(steady.spend / steady.clients) : "n/a";
    $("#k-calls").textContent = num(callsWk, 0);
    var flags = [];
    if (callsWk > inp.salesCap) flags.push("Needs about " + num(callsWk, 0) + " sales calls a week; you set capacity at " + inp.salesCap + ".");
    if (steady.clients > inp.onboardCap) flags.push("Signs about " + num(steady.clients, 1) + " clients a month; you set onboarding capacity at " + inp.onboardCap + ".");
    var capped = {};
    r.forEach(function (x) { x.capped.forEach(function (id) { capped[id] = x.label; }); });
    var sat = {};
    r.forEach(function (x) { (x.saturated || []).forEach(function (id) { sat[id] = 1; }); });
    Object.keys(sat).forEach(function (id) { flags.push(chById(id).name + ": above about " + money(chById(id).saturate[S.area]) + " a month in the " + (S.area === "top20" ? "top 20 metros" : "US") + ", extra spend mostly repeats the same people, so it counts at half value."); });
    Object.keys(capped).forEach(function (id) { flags.push(chById(id).name + ": the " + (S.area === "top20" ? "top 20 metro" : "US") + " list runs out by " + capped[id] + "."); });
    $("#flags").innerHTML = flags.length
      ? flags.map(function (f) { return "<div class='flag bad'>" + f + "</div>"; }).join("")
      : "<div class='flag ok'>Within the sales and onboarding capacity you set.</div>";
    drawMrr(sim, inp);
    drawBars(sim);
    renderResultTable(sim);
    save();
  }

  function renderResultTable(sim) {
    var body = $("#res-body");
    if (!body) return;
    var r = sim.rows.slice(0, 6);
    var html = "";
    D.channels.forEach(function (c) {
      var tot = { spend: 0, leads: 0, meetings: 0, clients: 0 };
      var on = false;
      r.forEach(function (x) { var o = x.byCh[c.id]; if (o) { on = true; tot.spend += o.spend; tot.leads += o.leads; tot.meetings += o.meetings; tot.clients += o.clients; } });
      if (!on) return;
      html += "<tr><td><span class='swatch' style='display:inline-block;margin-right:6px;background:var(" + D.families[c.family].color + ")'></span>" + c.name + "</td>" +
        "<td class='r'>" + moneyFull(tot.spend / 6) + "</td><td class='r'>" + num(tot.leads / 6, 1) + "</td><td class='r'>" + num(tot.meetings / 6, 1) + "</td>" +
        "<td class='r'>" + num(tot.clients / 6, 2) + "</td><td class='r'>" + (tot.clients > 0 ? moneyFull(tot.spend / tot.clients) : "n/a") + "</td></tr>";
    });
    var all = { spend: 0, leads: 0, meetings: 0, clients: 0 };
    r.forEach(function (x) { all.spend += x.spend; all.leads += x.leads; all.meetings += x.meetings; all.clients += x.clients; });
    html += "<tr class='total'><td>All channels</td><td class='r'>" + moneyFull(all.spend / 6) + "</td><td class='r'>" + num(all.leads / 6, 1) + "</td><td class='r'>" +
      num(all.meetings / 6, 1) + "</td><td class='r'>" + num(all.clients / 6, 2) + "</td><td class='r'>" + (all.clients > 0 ? moneyFull(all.spend / all.clients) : "n/a") + "</td></tr>";
    body.innerHTML = html;
  }

  /* ---------- charts (inline SVG) ---------- */
  var tip;
  function showTip(evt, html) {
    if (!tip) { tip = el("div", { class: "tip", role: "status" }); document.body.appendChild(tip); }
    tip.innerHTML = html; tip.hidden = false;
    var x = evt.clientX + 14, y = evt.clientY + 14;
    var w = tip.offsetWidth, h = tip.offsetHeight;
    if (x + w > window.innerWidth - 8) x = evt.clientX - w - 14;
    if (y + h > window.innerHeight - 8) y = evt.clientY - h - 14;
    tip.style.left = x + "px"; tip.style.top = y + "px";
  }
  function hideTip() { if (tip) tip.hidden = true; }
  function niceMax(v) {
    if (v <= 0) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p;
    var s = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
    return s * p;
  }
  function ticks(maxRaw) {
    var raw = Math.max(maxRaw, 1e-9) / 4;
    var p = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / p;
    var st = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
    var out = [];
    for (var v = 0; v <= maxRaw + st * 0.999; v += st) out.push(v);
    return out;
  }
  function drawMrr(sim, inp) {
    var svg = $("#chart-mrr");
    if (!svg) return;
    var cs0 = chartSize(svg, 280, 240);
    var W = cs0.W, H = cs0.H, L = 52, R = 14, T = 16, B = 30;
    var rows = sim.rows, n = rows.length;
    var tk = ticks(Math.max(inp.target, Math.max.apply(null, rows.map(function (r) { return r.mrr; }))) * 1.05);
    var maxV = tk[tk.length - 1];
    var x = function (i) { return L + (i + 0.5) * (W - L - R) / n; };
    var y = function (v) { return T + (H - T - B) * (1 - v / maxV); };
    var s = "";
    s += "<g class='grid'>";
    tk.forEach(function (gv) { s += "<line x1='" + L + "' x2='" + (W - R) + "' y1='" + y(gv) + "' y2='" + y(gv) + "'/><text x='" + (L - 8) + "' y='" + (y(gv) + 4) + "' text-anchor='end'>" + money(gv) + "</text>"; });
    s += "</g>";
    rows.forEach(function (r, i) { if (i % cs0.step(n) === 0) s += "<text x='" + x(i) + "' y='" + (H - 10) + "' text-anchor='middle'>" + r.label + "</text>"; });
    s += "<line x1='" + L + "' x2='" + (W - R) + "' y1='" + y(inp.target) + "' y2='" + y(inp.target) + "' stroke='" + cssVar("--fg-2") + "' stroke-width='1.5' stroke-dasharray='5 5'/>";
    s += "<text class='lbl' x='" + (L + 6) + "' y='" + (y(inp.target) - 6) + "' text-anchor='start'>Target " + money(inp.target) + "</text>";
    var d = rows.map(function (r, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(r.mrr).toFixed(1); }).join(" ");
    s += "<path d='" + d + "' fill='none' stroke='" + cssVar("--s1") + "' stroke-width='2' stroke-linejoin='round'/>";
    if (W >= 520) rows.forEach(function (r, i) { s += "<circle cx='" + x(i) + "' cy='" + y(r.mrr) + "' r='3' fill='" + cssVar("--s1") + "' stroke='" + cssVar("--surface") + "' stroke-width='2'/>"; });
    var last = rows[n - 1];
    s += "<text class='lbl' x='" + (x(n - 1) - 6) + "' y='" + (y(last.mrr) - 10) + "' text-anchor='end'>" + money(last.mrr) + "</text>";
    s += "<line id='mrr-cross' y1='" + T + "' y2='" + (H - B) + "' stroke='" + cssVar("--muted") + "' stroke-width='1' visibility='hidden'/>";
    s += "<rect id='mrr-hit' x='" + L + "' y='" + T + "' width='" + (W - L - R) + "' height='" + (H - T - B) + "' fill='transparent'/>";
    svg.innerHTML = s;
    var hit = $("#mrr-hit", svg), cross = $("#mrr-cross", svg);
    hit.addEventListener("mousemove", function (e) {
      var pt = svg.getBoundingClientRect();
      var px = (e.clientX - pt.left) * W / pt.width;
      var i = Math.max(0, Math.min(n - 1, Math.floor((px - L) / ((W - L - R) / n))));
      cross.setAttribute("x1", x(i)); cross.setAttribute("x2", x(i)); cross.setAttribute("visibility", "visible");
      var r = rows[i];
      showTip(e, "<b>" + r.label + "</b><div class='r'><span>MRR</span><span>" + moneyFull(r.mrr) + "</span></div><div class='r'><span>New clients</span><span>" + num(r.clients, 2) +
        "</span></div><div class='r'><span>Spend</span><span>" + moneyFull(r.spend) + "</span></div>");
    });
    hit.addEventListener("mouseleave", function () { cross.setAttribute("visibility", "hidden"); hideTip(); });
  }
  function drawBars(sim) {
    var svg = $("#chart-bars");
    if (!svg) return;
    var cs1 = chartSize(svg, 220, 200);
    var W = cs1.W, H = cs1.H, L = 36, R = 14, T = 14, B = 30;
    var rows = sim.rows, n = rows.length;
    var fams = Object.keys(D.families);
    var tk = ticks(Math.max.apply(null, rows.map(function (r) { return r.clients; })) || 1);
    var maxV = tk[tk.length - 1];
    var bw = Math.max(4, Math.min(28, (W - L - R) / n - (W < 520 ? 3 : 6)));
    var x = function (i) { return L + (i + 0.5) * (W - L - R) / n; };
    var y = function (v) { return T + (H - T - B) * (1 - v / maxV); };
    var s = "<g class='grid'>";
    tk.forEach(function (gv) { s += "<line x1='" + L + "' x2='" + (W - R) + "' y1='" + y(gv) + "' y2='" + y(gv) + "'/><text x='" + (L - 8) + "' y='" + (y(gv) + 4) + "' text-anchor='end'>" + num(gv, gv % 1 ? 1 : 0) + "</text>"; });
    s += "</g>";
    rows.forEach(function (r, i) {
      var acc = 0;
      var segs = fams.filter(function (f) { return (r.byFam[f] || 0) > 0; });
      segs.forEach(function (f, j) {
        var v = r.byFam[f], y0 = y(acc), y1 = y(acc + v);
        var h = Math.max(0, y0 - y1 - (j > 0 ? 2 : 0));
        var top = j === segs.length - 1;
        var rx = top ? 4 : 0;
        if (h > 0) {
          if (top && h > rx) {
            var xx = x(i) - bw / 2, yy = y1;
            s += "<path d='M" + xx + " " + (yy + h) + " V" + (yy + rx) + " Q" + xx + " " + yy + " " + (xx + rx) + " " + yy + " H" + (xx + bw - rx) + " Q" + (xx + bw) + " " + yy + " " + (xx + bw) + " " + (yy + rx) + " V" + (yy + h) + " Z' fill='" + cssVar(D.families[f].color) + "'/>";
          } else s += "<rect x='" + (x(i) - bw / 2) + "' y='" + y1 + "' width='" + bw + "' height='" + h + "' fill='" + cssVar(D.families[f].color) + "'/>";
        }
        acc += v;
      });
      if (i % cs1.step(n) === 0) s += "<text x='" + x(i) + "' y='" + (H - 10) + "' text-anchor='middle'>" + r.label + "</text>";
      s += "<rect class='hitbar' data-i='" + i + "' x='" + (x(i) - (W - L - R) / n / 2) + "' y='" + T + "' width='" + ((W - L - R) / n) + "' height='" + (H - T - B) + "' fill='transparent'/>";
    });
    svg.innerHTML = s;
    $$(".hitbar", svg).forEach(function (hb) {
      hb.addEventListener("mousemove", function (e) {
        var r = rows[+hb.getAttribute("data-i")];
        var lines = fams.filter(function (f) { return r.byFam[f] > 0; }).map(function (f) { return "<div class='r'><span>" + D.families[f].label + "</span><span>" + num(r.byFam[f], 2) + "</span></div>"; }).join("");
        showTip(e, "<b>" + r.label + ": " + num(r.clients, 2) + " new clients</b>" + (lines || "<div class='muted'>None</div>"));
      });
      hb.addEventListener("mouseleave", hideTip);
    });
    var lg = $("#bars-legend");
    if (lg) lg.innerHTML = fams.map(function (f) { return "<span><i class='swatch' style='background:var(" + D.families[f].color + ")'></i>" + D.families[f].label + "</span>"; }).join("");
  }

  /* ---------- section: signals ("things they use") ---------- */
  function renderSignals() {
    var body = $("#sig-body");
    if (!body || !D.signals) return;
    var all = D.signals.filter(function (s) { return S.vertical === "all" || s.vertical === S.vertical || s.vertical === "all"; });
    var rows = sigAll ? all : topPerVertical(all, 8);
    var more = $("#sig-more");
    if (more) { more.hidden = all.length === rows.length && !sigAll; more.textContent = sigAll ? "Show the top 8 per vertical" : "Show all " + all.length; }
    body.innerHTML = rows.map(function (s) {
      return "<tr><td>" + D.verticalNames[s.vertical] + "</td><td><b>" + s.name + "</b><div class='tiny muted'>" + s.type + (s.domain ? " · " + s.domain : "") + "</div></td><td>" + s.terms + "</td><td class='r'>" + (s.volume == null ? "n/a" : num(s.volume, 0)) + "</td></tr>";
    }).join("");
    var cnt = $("#sig-count");
    if (cnt) cnt.textContent = rows.length + " of " + all.length + " signals shown";
  }
  var sigAll = false;
  function topPerVertical(list, n) {
    var seen = {};
    return list.filter(function (s) { seen[s.vertical] = (seen[s.vertical] || 0) + 1; return seen[s.vertical] <= n; });
  }
  function bindSignals() {
    var b = $("#sig-more");
    if (b) b.addEventListener("click", function () { sigAll = !sigAll; renderSignals(); });
  }

  /* ---------- checklists, decisions ---------- */
  function renderChecklists() {
    $$("[data-checklist]").forEach(function (host) {
      var id = host.getAttribute("data-checklist");
      var list = D.playbooks[id];
      if (!list) return;
      host.innerHTML = "";
      list.steps.forEach(function (st, i) {
        var k = id + ":" + i;
        var row = el("label", { class: "check" + (S.checks[k] ? " done" : "") });
        row.innerHTML = "<input type='checkbox'" + (S.checks[k] ? " checked" : "") + "><span>" + st + "</span>";
        $("input", row).addEventListener("change", function (e) { S.checks[k] = e.target.checked; row.classList.toggle("done", e.target.checked); save(); });
        host.appendChild(row);
      });
    });
  }
  function renderDecisions() {
    var host = $("#decisions");
    if (!host) return;
    host.innerHTML = "";
    D.decisions.forEach(function (d, di) {
      var card = el("div", { class: "card dec" });
      var h = "<div class='eyebrow'>Decision " + (di + 1) + "</div><h3>" + d.q + "</h3>" + (d.why ? "<p class='small muted'>" + d.why + "</p>" : "") + "<div class='opts'>";
      d.options.forEach(function (o, oi) {
        var nm = "dec-" + d.id;
        h += "<label class='opt'><input type='radio' name='" + nm + "' value='" + oi + "'" + (S.decisions[d.id] === oi ? " checked" : "") + "><span>" + o.label +
          (d.rec === oi ? "<span class='rec'>Recommended</span>" : "") + (o.note ? "<div class='tiny muted'>" + o.note + "</div>" : "") + "</span></label>";
      });
      h += "</div><textarea placeholder='Notes (saved in this browser only)' data-note='" + d.id + "'></textarea>";
      card.innerHTML = h;
      host.appendChild(card);
      $$("input[type=radio]", card).forEach(function (rb) { rb.addEventListener("change", function () { S.decisions[d.id] = +rb.value; save(); }); });
      var ta = $("textarea", card);
      ta.value = S.notes[d.id] || "";
      ta.addEventListener("input", function () { S.notes[d.id] = ta.value; save(); });
    });
    var btn = $("#copy-dec");
    if (btn) btn.addEventListener("click", function () {
      var lines = ["SES auto growth plan: my picks (" + new Date().toLocaleDateString("en-US") + ")"];
      D.decisions.forEach(function (d, di) {
        var pick = S.decisions[d.id];
        lines.push((di + 1) + ". " + d.q.replace(/<[^>]+>/g, ""));
        lines.push("   " + (pick == null ? "(no pick yet)" : d.options[pick].label.replace(/<[^>]+>/g, "")));
        if (S.notes[d.id]) lines.push("   Notes: " + S.notes[d.id]);
      });
      var txt = lines.join("\n");
      var out = $("#copy-out");
      function fallback() { out.hidden = false; out.value = txt; out.focus(); out.select(); $("#copy-msg").textContent = "Select all and copy."; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(function () { $("#copy-msg").textContent = "Copied. Paste it into WhatsApp, email or the chat."; }, fallback);
      } else fallback();
    });
  }

  /* ---------- theme + nav ---------- */
  function bindTheme() {
    var b = $("#theme");
    var order = ["system", "light", "dark"];
    var cur = "system";
    try { cur = localStorage.getItem(KEY + ":theme") || "system"; } catch (e) { /* ignore */ }
    function apply() {
      if (cur === "system") document.documentElement.removeAttribute("data-theme");
      else document.documentElement.setAttribute("data-theme", cur);
      b.textContent = "Theme: " + cur;
      renderBuilderOutputs();
    }
    b.addEventListener("click", function () { cur = order[(order.indexOf(cur) + 1) % 3]; try { localStorage.setItem(KEY + ":theme", cur); } catch (e) { /* ignore */ } apply(); });
    apply();
    if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", renderBuilderOutputs);
  }
  function bindNav() {
    var links = $$(".nav a");
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$("section[id]").forEach(function (s) { io.observe(s); });
  }
  function bindReset() {
    var b = $("#reset");
    if (b) b.addEventListener("click", function () {
      var keep = { checks: S.checks, decisions: S.decisions, notes: S.notes };
      S = JSON.parse(JSON.stringify(defaults));
      Object.assign(S, keep);
      $$("[data-in]").forEach(function (i) { i.value = S.inputs[i.getAttribute("data-in")]; i.dispatchEvent(new Event("input")); });
      syncSegs(); renderMix(); renderAnswer(); renderBuilderOutputs();
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    bindAnswerInputs();
    bindChannelFilter();
    renderChannels();
    renderPresets();
    renderMix();
    renderAnswer();
    renderSignals();
    bindSignals();
    renderChecklists();
    renderDecisions();
    bindTheme();
    bindNav();
    bindReset();
    window.addEventListener("scroll", hideTip, { passive: true });
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(renderBuilderOutputs, 150); });
  });
})();
