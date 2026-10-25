/* SES auto growth plan: every number on the page lives here, with its source.
   No internal revenue, fee, client-count or churn figures: those are viewer inputs.
   Cases: low moves every rate against us at once, high moves every rate for us.
   Research behind each figure: research/*.md in this repo (all read 2026-10-25). */
window.DATA = {
  asOfLabel: "Oct 25, 2026",
  startMonth: "2026-11",
  startMonthLabel: "Nov 2026",

  base: {
    // Raw lead to signed client for Search and other high-intent leads: 50% qualify x 20% close at mid.
    leadToClient: { low: 0.05, mid: 0.10, high: 0.20 },
    leadToQualified: 0.5
  },

  families: {
    paid: { label: "Paid ads", color: "--s1" },
    search: { label: "Google Search", color: "--s2" },
    outbound: { label: "Outbound", color: "--s3" },
    relationships: { label: "Referrals and partners", color: "--s4" }
  },

  verdicts: { start: "Start now", test: "Test small", later: "Later", skip: "Skip" },
  verticalNames: { all: "All auto", dealers: "Dealerships", repair: "Repair and collision", detailing: "Detailing, tint, wash" },

  channels: [
    {
      id: "search", name: "Google Search (auto campaign)", family: "search", kind: "fixed", defaultOn: true, default: 0,
      fixed: {
        top20: { spend: { low: 222, mid: 688, high: 1154 }, leads: { low: 0.07, mid: 0.64, high: 3.88 } },
        us: { spend: { low: 536, mid: 1657, high: 2774 }, leads: { low: 0.16, mid: 1.52, high: 9.24 } }
      },
      hint: "The 97 relaunch keywords at $100 a day. Searches run out before the budget does.",
      alone: { note: "Raising the budget changes nothing." }
    },
    {
      id: "gaud", name: "Google: YouTube and Demand Gen, tool users", family: "paid", kind: "paid", default: 2100, min: 0, max: 10000, step: 100,
      unit: "ad budget a month", unitShort: "$",
      cpl: { low: 275, mid: 100, high: 47 },
      qualMult: { low: 0.6, mid: 0.9, high: 1.2 }, ltcMult: { low: 0.6, mid: 0.585, high: 0.51 },
      ramp: [0.6, 1], saturate: { top20: 3000, us: 8000 },
      hint: "Raw lead $275 / $100 / $47; 30% to 60% are owners. No published benchmark for this audience; pool size is unknown until the segments exist in the account.",
      alone: { note: "Untested: no benchmark exists for ads aimed at auto owners." }
    },
    {
      id: "meta", name: "Meta ads (Facebook, Instagram)", family: "paid", kind: "paid", default: 3200, min: 0, max: 40000, step: 200,
      unit: "ad budget a month", unitShort: "$",
      cpl: { low: 150, mid: 80, high: 40 },
      qualMult: { low: 0.5, mid: 0.6, high: 0.8 }, ltcMult: { low: 0.5, mid: 0.39, high: 0.34 },
      ramp: [0.5, 0.8, 1], saturate: { top20: 8000, us: 40000 },
      hint: "Raw lead $150 / $80 / $40; 25% to 40% qualify after screening questions. Top 20 metros likely saturate around $6k to $10k a month.",
      alone: { note: "Above about $8k a month the top 20 metros saturate." }
    },
    {
      id: "linkedin", name: "LinkedIn (dealerships)", family: "paid", kind: "paid", default: 0, min: 0, max: 10000, step: 250, minBudget: 300,
      unit: "ad budget a month", unitShort: "$", defaultOn: false,
      cpl: { low: 188, mid: 120, high: 62 },
      qualMult: { low: 0.5, mid: 0.6, high: 0.8 }, ltcMult: { low: 0.5, mid: 0.4, high: 0.35 },
      ramp: [0.6, 1], saturate: { top20: 2500, us: 6000 },
      hint: "Lead Gen Form cost per lead about $62 to $188. Dealership decision makers only; SES has no dealership client to show yet.",
      alone: { note: "Dealerships only." }
    },
    {
      id: "email", name: "Cold email", family: "outbound", kind: "outbound", default: 1500, min: 0, max: 10000, step: 250,
      unit: "new contacts a month", unitShort: "contacts", perMeeting: { low: 1000, mid: 250, high: 100 },
      show: { low: 0.65, mid: 0.70, high: 0.80 },
      listCap: { top20: 22000, us: 60000 },
      cost: function (v) { return 100 + 0.077 * v; }, minutesEach: 0.95,
      ramp: [0.15, 0.4, 1],
      hint: "1 / 4 / 10 booked meetings per 1,000 contacts; 65% to 80% show up. About 3 weeks to the first send. Tools about $330 a month at 3,000 contacts.",
      alone: { unit: "new contacts", note: "Only about 20k to 28k top-20 auto businesses can be emailed." }
    },
    {
      id: "video", name: "Personal video audits", family: "outbound", kind: "outbound", default: 120, min: 0, max: 500, step: 10,
      unit: "audits a month", unitShort: "audits", perMeeting: { low: 50, mid: 25, high: 12.5 },
      show: { low: 0.65, mid: 0.70, high: 0.80 },
      cost: function (v) { return 18 + 0.05 * v; }, minutesEach: 15,
      ramp: [0.5, 1],
      hint: "2 / 4 / 8 booked meetings per 100 hand-picked shops [estimate]. About 15 minutes each, 4 an hour.",
      alone: { unit: "video audits", note: "Labor heavy: about 15 minutes per shop." }
    },
    {
      id: "calls", name: "Cold calls (live, human dialed)", family: "outbound", kind: "outbound", default: 0, min: 0, max: 6000, step: 100, defaultOn: false,
      unit: "dials a month", unitShort: "dials", perMeeting: { low: 600, mid: 370, high: 250 },
      show: { low: 0.60, mid: 0.65, high: 0.75 },
      cost: function () { return 40; }, minutesEach: 1.5,
      ramp: [0.75, 1],
      hint: "600 / 370 / 250 dials per booked meeting. About 40 dials an hour. No autodialers, recordings or texts.",
      alone: { unit: "dials", note: "Best as follow-up to video audits." }
    },
    {
      id: "referral", name: "Referrals, partners, events", family: "relationships", kind: "meetings", default: 1, min: 0, max: 20, step: 0.5,
      unit: "meetings a month", unitShort: "meetings",
      close: { low: 0.30, mid: 0.40, high: 0.50 },
      ramp: [0.5, 1],
      hint: "Type the meetings you expect from client referrals, partners and events. Referred meetings close at 30% to 50%.",
      alone: {}
    }
  ],

  presets: [
    { name: "Today: Search only", note: "Only the relaunch Search campaign.", search: true, mix: {} },
    { name: "Recommended test", note: "About $5.3k a month in ads plus tools; the 90-day test plan.", search: true, mix: { gaud: 2100, meta: 3200, email: 1500, video: 120, referral: 1 } },
    { name: "Scale after proof", note: "What month 4 could look like if the gates pass.", search: true, mix: { gaud: 3000, meta: 8000, linkedin: 2500, email: 3000, video: 200, calls: 2000, referral: 3 } },
    { name: "All-in 90-day push", note: "Everything at once. Watch the capacity and saturation flags.", search: true, mix: { gaud: 6000, meta: 20000, linkedin: 4000, email: 6000, video: 300, calls: 4000, referral: 4 } }
  ],

  honest: [
    "<b>Search can't carry it.</b> The auto campaign tops out at about 0.06 new clients a month in the top 20 metros (mid case). A bigger budget changes nothing because the searches run out.",
    "<b>$100k in 90 days needs double-digit new clients every month</b>, a closer running 15 or more qualified calls a week, and onboarding to match. None of the channels below is proven for SES yet, cold email needs 3 to 5 weeks before it sends at full volume, and Meta needs weeks to learn.",
    "<b>Package size is the fastest lever.</b> At $5,000 a client (both search engines) the number of clients needed is half of what $2,500 needs. Try it in the fee slider.",
    "<b>The realistic play:</b> run 4 to 5 channels small for 60 to 90 days, measure the real cost per qualified lead, show rate and close rate, then put money behind the winners. Set the months to 6 or 9 and load the presets in the funnel builder to see the path."
  ],

  why: {
    lede: "About 80,000 auto businesses with employees sit in the top 20 metros, and they buy marketing. Only about 675 searches a month in those metros are for an agency, roughly one search for every 119 businesses. Yet the people who run those businesses search for their own tools, suppliers and portals about 276,000 times a month across the US. The owners are reachable; they are just not searching for us.",
    stats: [
      { v: "80,129", l: "auto businesses with employees in the top 20 metros", s: "202,176 in the US. Dealers, repair and collision, detailing and wash, tint. Census CBP 2023." },
      { v: "675", l: "searches a month for an auto marketing agency, top 20 metros", s: "Mid case, range 337 to 1,347. 3,187 across the US. Keyword Planner, Jul to Sep 2026." },
      { v: "$688", l: "all the auto Search campaign can spend a month at $100 a day", s: "Of $3,040. About 44 clicks and 0.6 leads a month. Top 20 metros, mid case." },
      { v: "275,750", l: "US searches a month for tools only auto businesses use", s: "Login, pricing and owner terms in 3 segments, e.g. tekmetric login 33,100. Keyword Planner, Oct 2025 to Sep 2026." }
    ],
    src: "Sources: SES auto market research (Census County Business Patterns 2023, Nonemployer Statistics 2024, Google Keyword Planner pulled Oct 25, 2026); research/google-audience-targeting.md section 4."
  },

  cards: [
    {
      name: "Meta ads (Facebook, Instagram)", verdict: "start", verticals: ["detailing", "repair", "dealers"],
      what: "The only paid channel that reaches auto owners at scale. Targeting is loose, so the creative and a screening form do the filtering.",
      reach: "Owners in top 20 DMAs", cost: "$80 a lead, about $270 qualified (mid)", speed: "2 to 3 weeks",
      detail: "<ul class='clean'><li>Target as a hard limit: top 20 DMAs, age 25 to 65, (Small business owners OR Business Page admins) AND auto-trade interests. Meta cannot target 'detailing shop owner' directly, and interest exclusions were removed in March 2025.</li><li>Lead with real client films (owners on camera, no added numbers) and a free content and ads audit offer.</li><li>Instant Form with 'Higher intent' and screening questions: business type and role close the form for non-owners.</li><li>Competitors already do this: Tekmetric runs 44 ads, mostly customer-story videos; KUKUI has run the same demo ads since Oct 4, 2024, which suggests they pay back.</li><li>SES's own history: about 700 paid social visits Aug to Oct 2026, almost all sent to the homepage instead of /social-marketing, 7 leads and 2 bookings. Spend is not in GA4, so the real cost per lead is still unknown.</li><li>Test: about $3,200 a month for 90 days, raised only if gates pass (see the 90-day plan).</li></ul>",
      src: "research/meta-linkedin.md sections 1 to 9; Meta Ad Library scan Oct 25, 2026; GA4 sesmgt.com."
    },
    {
      name: "Google YouTube and Demand Gen, aimed at tool users", verdict: "test", verticals: ["dealers", "repair", "detailing"],
      what: "Your Fiverr idea, in the form Google allows: show ads to people who searched 'tekmetric login', 'dealercenter login' or 'urable'.",
      reach: "275,750 tool searches a month (US)", cost: "$100 a lead, about $220 qualified (mid)", speed: "2 to 3 weeks",
      detail: "<ul class='clean'><li>Works on YouTube, Gmail, Discover and Display (Demand Gen). Not on Search.</li><li>Google won't target the literal users of a site or app; URL and app segments only reach people interested in similar sites.</li><li>Many searchers are staff (service advisors, sales staff), so owner-leaning terms are used and every lead is screened.</li><li>Test: $70 a day for 45 days (about $3,150). Kill an ad group with no qualified lead after $1,000.</li></ul>",
      src: "research/google-audience-targeting.md; Google Ads Help 9805516 and 2497941."
    },
    {
      name: "Personal video audits", verdict: "start", verticals: ["detailing", "repair", "dealers"],
      what: "A 60 to 90 second screen-and-face teardown of one shop's Google profile, site and ads, sent to hand-picked businesses. It uses SES's real edge: the in-house video team.",
      reach: "100 to 250 shops a month", cost: "$80 to $320 per booked meeting (labor)", speed: "1 to 2 weeks",
      detail: "<ul class='clean'><li>Pick shops that are busy but market badly: 4.3+ stars and 80+ reviews or premium services, plus a slow mobile site, no ads running, unanswered reviews, or missing from Google's AI answer.</li><li>About 15 minutes per shop, 4 an hour. Ask-first variant: offer the teardown, record only for owners who say yes.</li><li>Follow up with two live calls in a week. Never ringless voicemail.</li><li>Start with tint, PPF, ceramic and detailing, where SES has the strongest proof.</li></ul>",
      src: "research/outbound.md section 6 (estimates, method shown)."
    },
    {
      name: "Cold email", verdict: "start", verticals: ["detailing", "repair", "dealers"],
      what: "Legal for B2B in the US with conditions, cheap in software, slow to start. Labor is the real cost.",
      reach: "20k to 28k emailable in the top 20 metros", cost: "$220 to $500 a month in tools, 10 to 12 hours a week", speed: "3 to 5 weeks",
      detail: "<ul class='clean'><li>Only about a third of Google Maps listings expose an email, and most are info@ addresses. Plan for 20,000 to 28,000 usable top-20 contacts, about 50,000 to 70,000 nationally.</li><li>Setup for 3,000 contacts a month: 10 lookalike domains, 30 inboxes, SPF, DKIM and DMARC, 2 to 4 weeks of warmup, then a slow ramp. Never send from sesmgt.com.</li><li>Plan 1 / 4 / 10 booked meetings per 1,000 contacts, then about 30% don't show.</li><li>Every email: truthful sender and subject, SES postal address, one-line opt-out honored within 10 business days.</li></ul>",
      src: "research/outbound.md sections 2 to 5 and 7."
    },
    {
      name: "Retargeting (Meta and Google)", verdict: "start", verticals: ["detailing", "repair", "dealers"],
      what: "Show the client films and the audit offer again to site visitors, film viewers and people who opened a form.",
      reach: "Site visitors, film viewers, form openers", cost: "$10 to $15 a day per platform", speed: "Once lists reach 100 active users",
      detail: "<ul class='clean'><li>Website audiences don't backfill, so create them on day 1 even before spending.</li><li>Google needs 100 active users in 30 days before a list serves; Meta video audiences fill cheaply from a ThruPlay campaign.</li><li>Exclude current clients and open leads (SES's own customer list is allowed for exclusions).</li></ul>",
      src: "Google Ads Help 7558048; research/meta-linkedin.md section 8."
    },
    {
      name: "Google Search (auto campaign)", verdict: "start", verticals: ["detailing", "repair", "dealers"],
      what: "Keep it: the few people who do search for an auto marketing agency are the highest-intent clicks SES can buy. It just can't scale.",
      reach: "675 hire searches a month, top 20", cost: "About $688 of $3,040 a month", speed: "Immediate",
      detail: "<ul class='clean'><li>Phrase match, top 20 metros, auto-only ad groups, as in the relaunch plan.</li><li>The budget is never the limit; expanding keywords adds about 75%, going national about 140%, and both stay small.</li></ul>",
      src: "SES auto market research, Oct 25, 2026."
    },
    {
      name: "Referral program", verdict: "start", verticals: ["detailing", "repair", "dealers"],
      what: "Referred owners close far more often than cold ones. Make referring easy and worth it.",
      reach: "Every happy client and partner", cost: "$100 to $600 per signed client", speed: "1 to 2 months",
      detail: "<ul class='clean'><li><b>Proposed terms (for Kaisin):</b> $100 when a referred owner takes a strategy call, $500 after their second paid invoice; the referred shop gets a free half-day video shoot. Partners such as brand reps get 10% of first-year fees instead. A simple /refer form tracks it.</li><li>Competitor terms for comparison: Autoshop Solutions pays $50 for a demo plus $150 if the shop joins; KUKUI gives a free month; OrbisX pays $100 per referred customer.</li><li>Referred meetings close at about 30% to 50%.</li></ul>",
      src: "research/partners-communities.md section 7; benchmarks.md."
    },
    {
      name: "Owner podcasts (guest spots)", verdict: "start", verticals: ["repair", "detailing", "dealers"],
      what: "Free, video-native and aimed at owners. SES brings real client stories and short film cuts.",
      reach: "Shows with hundreds of episodes", cost: "$0 plus prep time", speed: "1 to 2 months",
      detail: "<ul class='clean'><li>Shows that take guests: Remarkable Results Radio (repair, 2,001 episodes), The Independent Dealer Podcast (506), The Dealer Playbook (729, has had marketing vendors on), Road to $1 Million Detailing (103), Wash Talk (car wash, 299).</li><li>Build a guest kit: 3 topics, a one-page bio and a 60-second reel cut from client footage; pitch through each show's contact page.</li><li>Competitors run their own shows (Shop Marketing Pros, LIFT, Leads Near Me).</li></ul>",
      src: "research/partners-communities.md section 3 (Apple Podcasts listings, Oct 25, 2026)."
    },
    {
      name: "GIADA: Georgia independent dealers", verdict: "start", verticals: ["dealers"],
      what: "A cheap local door to dealers: associate membership includes the member mailing lists.",
      reach: "3,000+ Georgia member dealers", cost: "$250 a year", speed: "2 to 4 weeks",
      detail: "<ul class='clean'><li>'Associate Membership is $250 annually', with 'Access to all GIADA membership databases for mailings'.</li><li>Georgia is the largest state in the national independent dealer association (3,018 of 13,189 members).</li><li>Independent and used-car dealers have no co-op lock-in, and used-car video is an easy add-on.</li><li>First step: Kaisin approves the $250, join by phone, then test a mailing or video audits on about 200 metro dealers.</li></ul>",
      src: "giada.org associate membership page; NIADA 2026 media kit (Oct 25, 2026)."
    },
    {
      name: "Partner network: film, coating, detailing software", verdict: "start", verticals: ["detailing", "repair"],
      what: "Brands promise their installers leads and assets but have no done-for-you video and local SEO partner. SES can be that partner.",
      reach: "Installer networks and shop coaches", cost: "Time; referral fees", speed: "1 to 3 months",
      detail: "<ul class='clean'><li>Write a one-page partner offer, then approach Glasstint (a film brand headquartered in Georgia), a 3M or XPEL rep, and OrbisX (detailing software, pays $100 per referred customer after 12 months).</li><li>Repair: Shop Marketing Pros lists 9 coaching companies it works with; Autoshop Solutions lists 23 program partners (Protractor, Shop-Ware, Shop Boss, Steer) and 9 associations. SES has none yet.</li><li>The brands' dealer locators (XPEL, 3M, LLumar, Ceramic Pro) double as prospect lists for video audits.</li></ul>",
      src: "research/partners-communities.md sections 6 and 8."
    },
    {
      name: "Events and trade shows", verdict: "test", verticals: ["detailing", "repair", "dealers"],
      what: "Meet owners with the film reel and the audit offer. Teach a session before buying a booth.",
      reach: "Hundreds to thousands of owners", cost: "$50 to $1,575 plus travel", speed: "Nov 2026 to Apr 2027",
      detail: "<ul class='clean'><li><b>Mobile Tech Expo</b>, Orlando, Feb 11 to 13, 2027: detailing, tint, PPF, ceramic. $50 expo pass, about 6.5 hours' drive. Pre-book 10 floor meetings.</li><li><b>Sales Fix Live</b>, Murfreesboro TN, Mar 18 to 19, 2027: repair owners, $250, about 3.5 hours' drive.</li><li><b>FLACA Accelerate</b>, Orlando, Apr 16 to 17, 2027: repair owners; an agency taught a class there in 2026, so pitch one.</li><li><b>Georgia Collision Industry Association</b> meetings Nov 18 and Dec 3, 2026, through a $750 sponsorship (a collision agency already sponsors).</li><li>VISION (Kansas City, Mar 4 to 7, $1,575 booth) only to test a booth. Skip SEMA and AAPEX this year; NADA (Feb 17 to 20, $1,299) once SES has dealer proof.</li></ul>",
      src: "research/partners-communities.md section 5 (event sites, Oct 25, 2026)."
    },
    {
      name: "LinkedIn (dealerships only)", verdict: "later", verticals: ["dealers"],
      what: "The one place to target dealership GMs, internet and BDC managers by title. Small shops and detailers are thin on LinkedIn.",
      reach: "About 27k to 83k dealer decision makers", cost: "About $62 to $188 a lead", speed: "2 weeks",
      detail: "<ul class='clean'><li>Wait until SES has a dealership client to show: without proof the ads sell capability only.</li><li>Then test $2,500 a month for 2 months, US-wide, Lead Gen Forms plus thought-leader posts from Kaisin's profile.</li><li>Kill if cost per lead is above $250 or under 10% of leads book a call.</li></ul>",
      src: "research/meta-linkedin.md section 6."
    },
    {
      name: "Trade press and communities", verdict: "later", verticals: ["repair", "detailing", "dealers"],
      what: "Sponsored content, webinars and podcasts in the outlets owners read. Rate cards are not public.",
      reach: "Ratchet+Wrench: 91k+ print subscribers, 69% owners or partners", cost: "Ask for rates", speed: "1 to 3 months",
      detail: "<ul class='clean'><li>Ratchet+Wrench (repair), FenderBender (collision), Modern Tire Dealer and Motor Age sell display, newsletter, webinar and podcast slots. Professional Carwashing and Detailing sells Wash Talk video at $1,200 a video.</li><li>Competitors run owner Facebook groups and podcasts (LIFT, Shop Marketing Pros, Leads Near Me), and Leads Near Me runs its own Atlanta conference.</li><li>Worth it once SES has a repeatable story and a few more auto case films.</li></ul>",
      src: "Endeavor 2027 media kits; research/partners-communities.md sections 3, 4 and 8."
    },
    {
      name: "Co-op funds", verdict: "skip", verticals: ["dealers", "detailing"],
      what: "Brand money a dealer or shop could spend with SES. Real only for tire dealers, and small.",
      reach: "n/a", cost: "n/a", speed: "n/a",
      detail: "<ul class='clean'><li>Tire dealers: brand accruals of 2.5% to 5% of purchases, websites and SEO eligible with pre-approval (sources date from 2008 to 2014, so confirm current rates).</li><li>Repair: small pockets, such as Jasper Engines, up to $3,000 a year.</li><li>Franchise dealers: digital co-op only through OEM-certified providers (Stellantis requires certification, a dealer sponsor, NDA and integrations).</li><li>Detailing and film brands, car washes and independent dealers: none found; LLumar removed its co-op line after 2024.</li></ul>",
      src: "research/partners-communities.md section 6a."
    },
    {
      name: "Cold SMS, Nextdoor, TikTok", verdict: "skip", verticals: ["detailing", "repair", "dealers"],
      what: "Cold texts are a legal no without prior consent. Nextdoor and TikTok have no business-owner targeting.",
      reach: "n/a", cost: "n/a", speed: "n/a",
      detail: "<ul class='clean'><li>Carriers and the TCPA make cold SMS to owners a no; no autodialed, prerecorded, AI-voice or ringless-voicemail calls to cells either.</li><li>Nextdoor and TikTok offer no job, industry or business-owner targeting.</li></ul>",
      src: "research/outbound.md section 4; research/meta-linkedin.md section 6."
    }
  ],

  targeting: {
    lede: "<p>Your idea was: show ads only to people who use the tools auto businesses use, the way a Fiverr tool would target Fiverr sellers. Google allows a version of this, with limits:</p><ul class='clean'><li><b>Yes:</b> a custom segment of <i>people who searched</i> 'tekmetric login', 'dealercenter login', 'urable' and similar terms on Google or YouTube.</li><li><b>No:</b> the literal visitors of tekmetric.com or users of an app. URL and app segments only reach people interested in <i>similar</i> sites.</li><li><b>Not on Search.</b> It runs on YouTube, Gmail, Discover and Display through Demand Gen campaigns.</li><li><b>No bought lists.</b> Customer Match is first-party only and needs more than $50,000 lifetime spend for targeting.</li></ul>",
    cards: [
      { h: "The three segments", body: "<p><b>A1 Dealerships:</b> 34 terms, 134,100 US searches a month (independent-dealer software, auctions, floor-plan lenders, dealer portals, website vendors, dealer licenses).</p><p><b>A2 Repair, collision, tire:</b> 43 terms, 109,480 (Tekmetric, Shopmonkey, AutoLeap, CCC ONE, parts portals, shop insurance and software).</p><p><b>A3 Detailing, tint, PPF, wash:</b> 48 terms, 32,170 (Urable, Tint Wiz, XPEL DAP, car wash equipment and software). Small: may need the whole US.</p><p class='src'>Searches, not people; many searchers are staff. The top 20 metros hold an estimated 35% to 42%.</p>" },
      { h: "How the test runs", body: "<p><b>A. Demand Gen, tool users:</b> one ad group per segment, $40 a day, top 20 metros.</p><p><b>B. YouTube:</b> SES client films cut to 15 to 30 seconds per vertical, same segments, $20 a day.</p><p><b>C. Remarketing:</b> site visitors and film viewers, $10 a day, clients excluded.</p><p>$70 a day, about $2,100 a month, 45 days. Optimized targeting, lookalikes and automatic Customer Match inclusion all switched off, or Google quietly widens the audience.</p>" },
      { h: "When to kill or scale", body: "<p><b>Day 14:</b> each ad group needs 5,000+ impressions and 0.35%+ CTR, else swap creative once.</p><p><b>Day 30 or $1,000 per ad group:</b> kill with no qualified lead or above $400 per qualified lead; iterate between $150 and $400; scale 25% a week at $150 or less.</p><p><b>Day 45 to 60:</b> keep it if it produced a signed client or 3 qualified sales calls per $1,500 spent.</p><p><b>Phase 2 option:</b> Microsoft Ads with LinkedIn industry data, as a bid boost for dealership and repair profiles.</p>" }
    ],
    src: "Google Ads Help 9805516 (custom segments), 2497941 (where they run), adspolicy 6299717 (Customer Match). Volumes: Google Keyword Planner, US, Oct 2025 to Sep 2026 average, pulled Oct 25, 2026. Full list of 276 terms: research/google_signals.csv."
  },

  playbookOrder: ["meta", "google", "email", "video", "referral", "tracking"],
  playbooks: {
    meta: {
      eyebrow: "Meta", title: "Meta ads setup",
      summary: "About 2 weeks of setup, then 4 small test cells at about $735 a week.",
      steps: [
        "Confirm SES owns the ad account, Page and Instagram; verify sesmgt.com; 2FA for every admin.",
        "In Events Manager, test that PageView, Lead, Schedule and Contact fire on /social-marketing and the site forms.",
        "Add server-side Lead and Schedule events (Conversions API) with the same event ID as the browser; check match quality.",
        "Create audiences on day 1: site visitors 180 days, /social-marketing visitors 90 days, film viewers 50%+ 365 days, Instagram and Page engagers, form openers 90 days. Clients and open leads as exclusions only.",
        "Prospecting audience as a hard limit: top 20 DMAs, age 25 to 65, (Small business owners OR Business Page admins) AND auto-trade interests. Record the US size.",
        "Cut client films to 15 to 45 seconds in 9:16 and 4:5 per vertical, with each client's permission. Owners on camera, no added numbers.",
        "Build a Higher-intent Instant Form: business type (non-auto closes), role (employee closes), current marketing spend, business name and website, then a booking screen.",
        "Launch 4 cells: A hard-limit owners $45 a day, B Advantage+ suggestions $35, C retargeting to /social-marketing $15, D film views $10.",
        "Put UTM tags on every ad (source facebook, medium paid_social, campaign, ad set and ad names).",
        "Weekly report from the portal: spend, leads, genuine, booked, held, won, cost per qualified lead, cost per booked call.",
        "Once the portal feedback loop is live, send lead stage changes back to Meta as CRM events."
      ],
      src: "research/meta-linkedin.md sections 3 and 8."
    },
    google: {
      eyebrow: "Google", title: "YouTube and Demand Gen test",
      summary: "Budget, bidding and new campaigns are Google Ads UI changes; they go to Kaisin for approval first.",
      steps: [
        "Create 3 search-term custom segments (A1 dealers, A2 repair, A3 detailing and wash) from the signal list.",
        "Demand Gen campaign, one ad group per segment, top 20 metros, $40 a day. Optimized targeting OFF; demographic expansion restricted.",
        "YouTube campaign with client films, same segments, $20 a day. Audience expansion off.",
        "Remarketing ad group to site visitors and video viewers, $10 a day; current clients excluded.",
        "Turn off 'Use all Customer Match lists in Smart Bidding or Optimized Targeting'; file the lookalike opt-out.",
        "Count only the real form-lead and booking conversions; keep Google Business Profile actions out.",
        "Add a role question (owner, GM or manager / staff / other) and a landing page per vertical with UTM tags.",
        "Day 14: 5,000+ impressions and 0.35%+ CTR per ad group; widen A3 to the US if it spends under half.",
        "Day 30 or $1,000 per ad group: apply the kill and scale rules."
      ],
      src: "research/google-audience-targeting.md section 6."
    },
    email: {
      eyebrow: "Outbound", title: "Cold email setup",
      summary: "About 3 weeks to the first send, 5 weeks to full capacity. Copy approved by Kaisin.",
      steps: [
        "Pick the inbox route (Google Workspace or a reseller) and one sending tool (Instantly, Smartlead or lemlist).",
        "Buy 10 lookalike domains (no hyphens or numbers) and 15 inboxes for 2 to 3 real SES senders. Never send from sesmgt.com.",
        "Set SPF, DKIM (2048-bit) and DMARC (p=none with reports) on every domain; point each domain to sesmgt.com.",
        "Warm up for 2 to 4 weeks, then ramp: 2 sends a day per inbox, plus 2 a day, up to 25.",
        "Footer on every email: SES postal address and a one-line opt-out. Suppression list honored within 10 business days.",
        "Pilot: pull 500 Atlanta auto listings to measure the real email find rate before buying more data.",
        "Write a 4-step sequence per vertical. First email text only, tracking off.",
        "Verify every list; pause any list source with bounces above 2%.",
        "Day 45: at least 1% replies and 1 booked meeting, else change the offer or segment before adding volume.",
        "Day 90: under 1 meeting per 1,000 contacts, stop; 1 to 3, hold at 1,500 a month; 4+ and a signed client, scale to 3,000."
      ],
      src: "research/outbound.md sections 2, 4 and 7."
    },
    video: {
      eyebrow: "Outbound", title: "Video audit play",
      summary: "The outbound that plays to SES's in-house video team.",
      steps: [
        "Score shops: 4.3+ stars and 80+ reviews or premium services, plus weak marketing (slow mobile site, no ads in Google's Ads Transparency Center, unanswered reviews, missing from Google's AI answer).",
        "Start with the proof verticals: tint, PPF and ceramic, then detailing, then collision and repair.",
        "Record a 60 to 90 second screen-and-face teardown showing 3 specific gaps. No invented numbers, no guarantees.",
        "Run two versions: video in email 2, and ask-first (offer the teardown, record only for owners who say yes).",
        "Follow up with 2 live, human-dialed calls within a week.",
        "Track audits sent, watched, booked and held. Target 4+ booked per 100; stop under 2, double at 8+."
      ],
      src: "research/outbound.md section 6."
    },
    referral: {
      eyebrow: "Relationships", title: "Referrals, partners, podcasts, events",
      summary: "Cheap to start; slower to pay off, but these meetings close best. Every spend waits for Kaisin's approval.",
      steps: [
        "Kaisin sets referral terms (proposal: $100 at the strategy call, $500 after the second paid invoice, a free half-day shoot for the referred shop; partners 10% of first-year fees). Add a /refer form.",
        "Ask each happy auto client for one intro and a short testimonial clip.",
        "Podcast guest kit: 3 topics, bio, a 60-second reel from client footage. Pitch 5 owner shows.",
        "Join GIADA ($250 a year, by phone) and request the member mailing list.",
        "One-page partner offer; approach Glasstint, a 3M or XPEL rep, and OrbisX.",
        "Pull the XPEL, 3M, LLumar and Ceramic Pro dealer locators for the top 20 metros as video-audit prospect lists.",
        "Book Mobile Tech Expo (Feb 11 to 13, 2027, $50 pass) and pre-book 10 floor meetings; consider Sales Fix Live (Mar 18 to 19, $250)."
      ],
      src: "research/partners-communities.md."
    },
    tracking: {
      eyebrow: "Measurement", title: "Know which channel works",
      summary: "Without this, every channel looks good or bad by accident.",
      steps: [
        "Ship the site's lead-capture update: click IDs, UTMs and the spam guard on every form.",
        "Portal Connections page: mark every lead Genuine, Spam or Won, with the won value typed in.",
        "Send Genuine and Won back to Google Ads and Meta. Raw form fills never count as wins.",
        "Judge each channel on cost per qualified lead, cost per booked call and cost per client, from the portal."
      ],
      src: "SES enhanced conversions design, Oct 2026."
    }
  },

  plan: {
    lede: "Set up in 2 weeks, run small tests in parallel, then move money to whatever clears its bar. Dates assume work starts the week of Oct 26.",
    phases: [
      { when: "Weeks 1 to 2 · Oct 26 to Nov 8", title: "Set up", items: ["Meta: account checks, Conversions API, audiences, film cuts, Instant Form", "Google: 3 segments and campaigns built, waiting for approval", "Email: domains, inboxes, DNS, warmup starts; 500-listing pilot", "Referral terms, podcast guest kit, GIADA membership, partner one-pager; Mobile Tech Expo booked", "Lead-capture update live"] },
      { when: "Weeks 3 to 6 · Nov 9 to Dec 6", title: "Test small", items: ["Meta 4 cells at about $735 a week", "Google $70 a day", "25 video audits a week plus live follow-up calls", "First cold emails from week 4 on a slow ramp", "Search relaunch running; Thanksgiving week light"] },
      { when: "Weeks 7 to 10 · Dec 7 to Jan 3", title: "Gate 1", items: ["Meta: cost per qualified lead $400 or less and 2+ booked calls, then $1,500 a week", "Google: day-30 kill and scale rules", "Email: day-45 check", "No new sequences Dec 23 to Jan 1"] },
      { when: "Weeks 11 to 13 · Jan 4 to 22", title: "Gate 2 and decide", items: ["Meta: $300 or less per qualified lead, $600 or less per booked call, 3+ proposals or 1 client, then $2,500 a week", "Email to 3,000 a month if 4+ meetings per 1,000", "Day-90 review Jan 22: where the next $10k a month goes"] }
    ],
    thresholds: [
      { ch: "Meta, per cell", kill: "Cost per lead above $200 after 20 leads, under 15% qualified, or above $600 per qualified lead", scale: "Under $300 per qualified lead and under $600 per booked call: raise 20% to 30% every 3 to 4 days", len: "4 weeks per cell" },
      { ch: "Meta, whole channel", kill: "No booked call after $5,000, or above $600 per qualified lead at week 8", scale: "Gate 2 passed and cost per client under $3,000", len: "8 to 13 weeks" },
      { ch: "Google YouTube and Demand Gen", kill: "No qualified lead after $1,000 per ad group, or above $400 per qualified lead", scale: "$150 or less per qualified lead: +25% a week", len: "45 days" },
      { ch: "Cold email", kill: "Under 1 booked meeting per 1,000 contacts", scale: "4+ per 1,000 and a signed client: go to 3,000 a month", len: "90 days" },
      { ch: "Video audits", kill: "Under 2 booked per 100", scale: "8+ per 100: double to 200 to 250 a month", len: "60 days" },
      { ch: "Cold calls", kill: "Under 2 booked per 1,000 dials", scale: "Keep as audit follow-up", len: "60 days" },
      { ch: "LinkedIn (dealers)", kill: "Above $250 per lead or under 10% book a call", scale: "Under $150 per lead and 2+ dealer meetings", len: "8 weeks" }
    ]
  },

  decisions: [
    { id: "channels", q: "Which channels start now?", why: "Each needs setup time, so the start date matters more than the budget.", rec: 0, options: [
      { label: "Meta, Google tool-user test, video audits, cold email, referrals", note: "About $5,300 a month in ads, about $400 in tools, about 16 to 25 hours a week." },
      { label: "Meta and video audits only", note: "Leaner: about $3,500 a month; slower to learn." },
      { label: "Wait for the Search relaunch data first", note: "Search alone gives under 1 client a year." } ] },
    { id: "budget", q: "Ad budget for the first 90 days?", rec: 0, options: [
      { label: "About $5,300 a month (Meta $3,200, Google $2,100), raised only through the gates" },
      { label: "About $3,000 a month" },
      { label: "$10,000+ a month from day 1", note: "Spends before we know cost per qualified lead." } ] },
    { id: "people", q: "Who runs outbound and who closes?", rec: 0, options: [
      { label: "Asmat runs outbound, the video team records audits, Kaisin closes", note: "About 9 to 11 hours a week for Asmat, 3 to 8 for video, 4 to 6 for Kaisin." },
      { label: "Hire a part-time SDR or VA for list building and follow-up" },
      { label: "Kaisin does everything" } ] },
    { id: "offer", q: "Lead offer in ads and outreach?", rec: 0, options: [
      { label: "Free content and ads audit (a short recorded teardown)", note: "Same offer as /social-marketing; mirrors Steer's free audit and Tekmetric's Shop Index." },
      { label: "Free strategy call" },
      { label: "Paid audit" } ] },
    { id: "verticals", q: "Which verticals lead?", rec: 0, options: [
      { label: "Tint, PPF, ceramic and detailing first; repair second; dealers later", note: "Matches where SES has named proof." },
      { label: "All four at once" },
      { label: "Dealerships first" } ] },
    { id: "package", q: "Which package do we push?", rec: 0, options: [
      { label: "Lead with the two-service bundle to raise the average fee", note: "At $5,000 a client, half as many clients reach the same MRR." },
      { label: "Single service to start, upsell later" },
      { label: "Keep pricing as is" } ] },
    { id: "area", q: "Where do we target?", rec: 0, options: [
      { label: "Top 20 metros; widen to the US only for small segments" },
      { label: "Whole US from day 1" },
      { label: "Atlanta and the Southeast first" } ] },
    { id: "linkedin", q: "LinkedIn for dealerships now?", rec: 0, options: [
      { label: "Later, once SES has a dealership client to show" },
      { label: "Test $2,500 a month for 2 months now" } ] },
    { id: "referral", q: "Referral terms?", rec: 0, options: [
      { label: "$100 at the strategy call, $500 after the second paid invoice, free half-day shoot for the referred shop; partners 10% of first-year fees" },
      { label: "One free month of service per signed referral" },
      { label: "No paid referrals; ask for intros only" } ] },
    { id: "local", q: "Approve the cheap local doors?", why: "GIADA's $250 membership includes mailing lists for 3,000+ Georgia dealers; the GCIA sponsorship is $750 this year.", rec: 0, options: [
      { label: "GIADA now ($250); GCIA later" },
      { label: "Both now ($1,000)" },
      { label: "Neither for now" } ] },
    { id: "metaspend", q: "Can we get the Aug to Sep Meta spend?", why: "GA4 shows 7 leads and 2 bookings from paid social but no spend, so SES's real Meta cost per lead is unknown.", rec: 0, options: [
      { label: "Yes: Kaisin shares the spend from Ads Manager (or grants read access)" },
      { label: "No: start the test from benchmarks" } ] }
  ],

  method: [
    { h: "How the model works", body: "<p>Month by month from Nov 2026: MRR = last month's MRR x (1 minus 1 / average stay) + new clients x average fee.</p><p>Paid channels: leads = budget / cost per lead, then a qualified share and a close rate per channel. Outbound: booked meetings per volume, times the share that show up, times the meeting close rate. Referrals: meetings you type, times 30% to 50%.</p><p>Each channel ramps in its first months (learning, warmup). Low and high cases move every rate together, so they bound the answer rather than predict it.</p>" },
    { h: "Rates used (low / mid / high)", body: "<p><b>Search:</b> fixed by the auto keyword research; lead to client 5% / 10% / 20%.</p><p><b>Meta:</b> $150 / $80 / $40 a lead; 25% / 30% / 40% qualify; 10% / 13% / 17% of qualified sign.</p><p><b>Google tool users:</b> $275 / $100 / $47 a lead; 30% / 45% / 60% are owners; same close as Meta.</p><p><b>LinkedIn:</b> $188 / $120 / $62 a lead.</p><p><b>Email:</b> 1 / 4 / 10 booked per 1,000; 65% / 70% / 80% show. <b>Video audits:</b> 2 / 4 / 8 booked per 100. <b>Calls:</b> 600 / 370 / 250 dials per booked meeting. Held meetings close at 10% / 20% / 40%.</p>" },
    { h: "What it leaves out", body: "<p>Staff time is shown in hours, not priced. Creative production, agency fees and seasonality on paid channels are not modeled. Capacity is a warning, not a limit. Most rates are vendor benchmarks that are not auto-specific; SES has not tested these channels yet, which is the point of the 90-day plan.</p>" },
    { h: "What SES's own data says so far", body: "<p><b>Meta, Aug to Oct 2026:</b> about 700 paid social visits, almost all to the homepage, about 15% engaged, 7 leads and 2 bookings. Spend unknown.</p><p><b>Search:</b> the relaunch is auto-only, phrase match, top 20 metros, so its first months will give SES's first clean auto search numbers.</p>" }
  ],

  sources: [
    { name: "Google Ads Help: custom segments (answer 9805516)", url: "https://support.google.com/google-ads/answer/9805516", date: "read Oct 25, 2026" },
    { name: "Google Ads Help: audience segments by campaign type (answer 2497941)", url: "https://support.google.com/google-ads/answer/2497941", date: "read Oct 25, 2026" },
    { name: "Google Ads policy: Customer Match (answer 6299717)", url: "https://support.google.com/adspolicy/answer/6299717", date: "read Oct 25, 2026" },
    { name: "Google Keyword Planner via the SES Google Ads account", date: "pulled Oct 25, 2026", note: "US, English, Oct 2025 to Sep 2026 average" },
    { name: "Meta: Use detailed targeting", url: "https://www.facebook.com/business/help/440167386536513", date: "read Oct 25, 2026" },
    { name: "Meta: About performance goals for lead ads", url: "https://www.facebook.com/business/help/782657799338685", date: "read Oct 25, 2026" },
    { name: "Meta Ad Library, US active ads", url: "https://www.facebook.com/ads/library/", date: "scanned Oct 25, 2026" },
    { name: "LocaliQ: Facebook Advertising Benchmarks", url: "https://localiq.com/blog/facebook-advertising-benchmarks/", date: "updated Sep 23, 2026", note: "vendor" },
    { name: "GrowthSpree: Meta Ads benchmarks 2026 B2B", url: "https://www.growthspreeofficial.com/blogs/meta-ads-benchmarks-2026-b2b-saas-b2b-cpm-cpc-cpl-vertical", date: "May 22, 2026", note: "vendor, no data basis disclosed" },
    { name: "Evergreen Growth: How to target business owners on Meta Ads", url: "https://evergreen-growth.com/articles/meta-ads-target-business-owners", date: "checked Oct 13, 2026", note: "vendor, UK sizes" },
    { name: "Fibbler: LinkedIn Ads benchmarks", url: "https://www.fibbler.co/blog/linkedin-ads-benchmarks", date: "Aug 2026", note: "vendor" },
    { name: "Metadata.io: B2B Advertising Benchmarks 2026", url: "https://metadata.io", date: "2025 data", note: "vendor" },
    { name: "Gmail sender guidelines", url: "https://support.google.com/mail/answer/81126", date: "read Oct 25, 2026" },
    { name: "Yahoo Sender Hub best practices", url: "https://senders.yahooinc.com/best-practices/", date: "read Oct 25, 2026" },
    { name: "FTC: CAN-SPAM Act compliance guide for business", url: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business", date: "read Oct 25, 2026" },
    { name: "Instantly help center: deliverability, warmup and ramp", url: "https://help.instantly.ai/en/articles/16034903-deliverability-guide", date: "read Oct 25, 2026", note: "vendor" },
    { name: "The Silicon Review: Google Maps email extraction rates (Scrap.io)", url: "https://thesiliconreview.com/2026/10/google-maps-email-extractor-where-emails-come-from", date: "Oct 5, 2026", note: "vendor sample" },
    { name: "Endeavor Vehicle Repair Group 2027 media kits (Ratchet+Wrench, FenderBender)", url: "https://vehiclerepair.endeavorb2b.com/vrg-all-resources/", date: "read Oct 25, 2026" },
    { name: "Mobile Tech Expo 2027", url: "https://mobiletechexpo.com/", date: "read Oct 25, 2026" },
    { name: "NADA Show 2027 registration", url: "https://www.nada.org/nada-show/about/nada-show-2027-attendee-registration", date: "read Oct 25, 2026" },
    { name: "Stellantis Digital Certified program", url: "https://www.stellantisdigitalcertified.com/Overview/FAQ", date: "read Oct 25, 2026" },
    { name: "GIADA associate membership benefits", url: "https://giada.org/associate-membership-benefits/", date: "read Oct 25, 2026" },
    { name: "NIADA 2026 media kit", url: "https://niada.com/files/Media_Kit_2026.pdf", date: "read Oct 25, 2026" },
    { name: "OrbisX referral program", url: "https://orbisx.com/orbisx-referral-program/", date: "terms effective Nov 4, 2023" },
    { name: "Shop Fix Academy upcoming events (Sales Fix Live)", url: "https://www.shopfixacademy.com/upcoming-events", date: "read Oct 25, 2026" },
    { name: "Autoshop Solutions: refer a shop", url: "https://autoshopsolutions.com/refer-a-shop/", date: "read Oct 25, 2026" },
    { name: "Census County Business Patterns 2023 and Nonemployer Statistics 2024", url: "https://www.census.gov/programs-surveys/cbp.html", date: "via SES auto market research" },
    { name: "Pew Research: Social media fact sheet", url: "https://www.pewresearch.org/internet/fact-sheet/social-media/", date: "Oct 19, 2026" }
  ]
};
