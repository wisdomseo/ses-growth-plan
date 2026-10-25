/* Renders the static content sections from assets/data.js. */
(function () {
  "use strict";
  var D = window.DATA;
  function $(s) { return document.querySelector(s); }
  function set(sel, html) { var n = $(sel); if (n) n.innerHTML = html; }

  document.addEventListener("DOMContentLoaded", function () {
    set("#asof", D.asOfLabel);
    set("#asof2", D.asOfLabel);
    set("#start-month", D.startMonthLabel);
    set("#honest-body", D.honest.map(function (p) { return "<p>" + p + "</p>"; }).join(""));

    set("#why-lede", D.why.lede);
    set("#why-stats", D.why.stats.map(function (s) {
      return "<div class='card stat'><span class='v'>" + s.v + "</span><span class='l'>" + s.l + "</span><span class='s'>" + s.s + "</span></div>";
    }).join(""));
    set("#why-src", D.why.src);

    set("#targeting-lede", D.targeting.lede);
    set("#targeting-cards", D.targeting.cards.map(function (c) {
      return "<div class='card'><h3>" + c.h + "</h3><div class='small' style='color:var(--fg-2);display:flex;flex-direction:column;gap:8px'>" + c.body + "</div></div>";
    }).join(""));
    set("#sig-src", D.targeting.src);

    set("#playbook-cards", D.playbookOrder.map(function (id) {
      var p = D.playbooks[id];
      return "<div class='card'><div class='eyebrow'>" + p.eyebrow + "</div><h3>" + p.title + "</h3>" +
        (p.summary ? "<p class='small' style='color:var(--fg-2)'>" + p.summary + "</p>" : "") +
        "<div data-checklist='" + id + "'></div>" + (p.src ? "<p class='src'>" + p.src + "</p>" : "") + "</div>";
    }).join(""));

    set("#plan-lede", D.plan.lede);
    set("#timeline", D.plan.phases.map(function (p) {
      return "<div class='phase'><div class='eyebrow'>" + p.when + "</div><h3>" + p.title + "</h3><ul class='clean small' style='color:var(--fg-2)'>" +
        p.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul></div>";
    }).join(""));
    set("#thresholds", D.plan.thresholds.map(function (t) {
      return "<tr><td><b>" + t.ch + "</b></td><td>" + t.kill + "</td><td>" + t.scale + "</td><td>" + t.len + "</td></tr>";
    }).join(""));

    set("#method", D.method.map(function (m) {
      return "<div class='card'><h3>" + m.h + "</h3><div class='small' style='color:var(--fg-2);display:flex;flex-direction:column;gap:6px'>" + m.body + "</div></div>";
    }).join(""));
    set("#source-list", D.sources.map(function (s) {
      return "<li>" + (s.url ? "<a href='" + s.url + "' target='_blank' rel='noopener'>" + s.name + "</a>" : s.name) + (s.date ? " · " + s.date : "") + (s.note ? " · <span class='muted'>" + s.note + "</span>" : "") + "</li>";
    }).join(""));
  });
})();
