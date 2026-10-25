# Outbound for SES MGT: how to set it up and what it really takes

Prepared 2026-10-25. Read-only desk research: nothing was signed up for, bought, sent or changed. This file extends `market/benchmarks.md` section 5 (cold email and cold call yields) and `market/auto/AUTO-SYNTHESIS.md` section e (80,129 top-20 auto employer establishments; 202,176 US). It does not repeat those figures; it adds infrastructure, tools, costs, compliance, more benchmarks and an operating plan.

**Labels.** [primary] = official, legal or pricing page. [vendor: sells X] = vendor data, blog or help page. [secondary] = someone else's write-up or a search summary. [estimate] = my judgement, with the method shown. All pages were accessed 2026-10-25; the page's own date is given where it shows one ("undated" otherwise). Note: the research session crashed once (disk full) and was rebuilt from the original fetch logs; every figure below comes from a page that was actually read, unless marked as a search summary.

---

## 1. Verdict

1. **Do it, but as a small, personal, owner-approved program, not a volume machine.** Cold email is legal for B2B in the US with conditions (section 4), cheap to run (about $220 to $500 a month in tools at 3,000 contacts, section 3.7) and slow to start (3 to 5 weeks from buying domains to full sending capacity). Labor, not software, is the real cost: about 10 to 12 hours a week for the email program at full volume, plus meetings.
2. **Plan with 1 / 4 / 10 booked meetings per 1,000 new contacts (low / mid / high)**, the existing benchmarks.md band, and then take off no-shows: about 30% of cold-booked meetings do not happen (section 5). At 3,000 contacts a month that is about **2 / 8 / 24 held meetings a month from email**. The low case (1 per 1,000) is close to the only large agency-run measurement (Belkins: about 0.6 meetings per 1,000 contacts, section 5).
3. **The list is smaller than the market model assumes.** Only about a third of US Google Maps listings expose any email (one vendor sample of about 2M listings), and most found addresses are generic (info@, service@). Usable top-20 auto contacts are about **20,000 to 28,000, not 80,129** [estimate, section 3.4]. At 3,000 a month the top-20 list runs out in roughly 7 to 9 months, so national lists (about 50,000 to 70,000 usable) are needed by mid-2027.
4. **The best fit for SES is a personalized video-audit play** on a few hundred well-chosen shops a month (section 6), with email as the delivery vehicle and calls as the follow-up. It plays to the in-house video team and real auto proof, and it costs about $80 to $320 per booked meeting at a $25 an hour operator rate [estimate]. All channels together (email, video audits, optional calls) give about **5 / 15 / 38 held meetings a month** at full volume (section 7.4).
5. **Red lines:** no cold SMS (carriers and the TCPA make it a no without prior consent), no autodialed or prerecorded or AI-voice calls to cell phones without consent, no ringless voicemail, no fake sender names, no deceptive subjects, every email carries SES's postal address and an opt-out honored within 10 business days (section 4).

---

## 2. Email infrastructure in 2026

### 2.1 What Gmail, Yahoo and Microsoft require

Many small shop owners use @gmail.com, @yahoo.com or @outlook.com addresses, so these consumer-mailbox rules apply directly.

| Rule | Gmail (personal @gmail.com) | Yahoo | Outlook.com, Hotmail, Live (consumer) |
|---|---|---|---|
| Who is a "bulk" sender | "close to 5,000 messages or more to personal Gmail accounts within a 24-hour period"; counted per **primary domain**; once reached, "permanently considered bulk senders" | "a significant volume of mail. We will not specify a volume threshold." | Domains "sending more than 5,000 emails per day" |
| All senders | SPF **or** DKIM; valid forward and reverse DNS (PTR); TLS; spam rate in Postmaster Tools below 0.3%; RFC 5322 format | SPF or DKIM; spam rate below 0.3%; valid forward and reverse DNS; RFC 5321 and 5322 | All senders "strongly" advised to use SPF, DKIM and DMARC |
| Bulk senders, in addition | SPF **and** DKIM; DMARC (policy "can be set to none"); From domain aligned with SPF or DKIM; "Marketing messages and subscribed messages must support one-click unsubscribe, and include a clearly visible unsubscribe link"; honor unsubscribes within 48 hours (FAQ enforcement table) | SPF and DKIM; DMARC at least p=none and passing; alignment; one-click List-Unsubscribe (RFC 8058 "highly recommended"); visible unsubscribe link; "Honor unsubscribes within 2 days" | SPF and DKIM must pass; DMARC "At least p=none (p=reject is recommended)"; non-compliant mail is rejected with "550; 5.7.515 Access denied" |
| Spam-rate target | "keep your user-reported spam rate below 0.1% and prevent it from reaching 0.3% or higher" | below 0.3% | List hygiene, working unsubscribe links recommended |
| Enforcement | "Starting November 2025, Gmail is ramping up its enforcement on non-compliant traffic... temporary and permanent rejections" | Phased in from February 2024 | Effective May 5, 2025 |
| Source | [primary] [Gmail sender guidelines](https://support.google.com/mail/answer/81126) (undated; requirements dated Feb 1, 2024) and [FAQ](https://support.google.com/mail/answer/14229414) | [primary] [Yahoo Sender Hub best practices](https://senders.yahooinc.com/best-practices/) and [FAQ](https://senders.yahooinc.com/faqs/), undated | [primary] [Microsoft Tech Community post](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730), Apr 2, 2025; [Outlook.com postmaster policies](https://substrate.office.com/ip-domain-management-snds/Postmaster/Policies); [Fix NDR 550 5.7.515](https://support.microsoft.com/en-us/office/fix-ndr-error-550-5-7-515-in-outlook-com-34ed3d56-97ad-46a7-8c7d-7fc0cf4e8ab4) |

**What this means for SES.** At 3,000 contacts a month SES sends about 570 emails a day across about 10 separate domains, far under 5,000 a day per domain. SES is **not** a bulk sender at any of the three. It must still meet the all-sender rules, and it should meet the bulk rules anyway (SPF, DKIM and DMARC on every sending domain, a visible opt-out in every email), because CAN-SPAM requires an opt-out and spam complaints are the main risk. Two scope notes from Google's FAQ: the guidelines "don't apply to messages sent to Google Workspace accounts" (shops with their own Workspace domain), and they apply to mail sent from Workspace to personal Gmail.

### 2.2 Limits and acceptable use on the sending side

| Item | Fact | Source |
|---|---|---|
| Google Workspace daily limit | 2,000 messages per user per day; "500 for trial accounts"; limits rise once the domain has paid at least $100 | [primary] [Gmail sending limits in Google Workspace](https://support.google.com/a/answer/166852), last updated 2026-10-22 |
| Google Workspace spam policy | Users agree "not to use the account to send spam"; Google may "immediately suspend the user" or "the entire account" if domain-wide | [primary] [Spam and abuse policy in Gmail](https://support.google.com/a/answer/178266), last updated 2026-10-22 |
| Google acceptable use | Google's Cloud AUP bars using services "to generate, distribute, publish or facilitate unsolicited mass email, promotions, advertisements, or other solicitations ("spam")"; the Workspace AUP (last modified 14 Mar 2023 per search summary) bars "unsolicited bulk commercial email" | [primary] [AUP page](https://workspace.google.com/terms/use_policy/); Workspace wording [secondary: search summary] |
| Microsoft 365 limits | Mailbox: "10,000 recipients per day". Tenant External Recipient Rate Limit: 500 x (licenses^0.7) + 9,500 a day; "Trial tenants: Limited to 500 total external recipients per day"; reduced quotas for new tenants. The separate per-mailbox external limit was "canceled indefinitely" (Jan 6, 2026) | [primary] [Exchange Online limits](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits), 2026-10-19; [TERRL post](https://techcommunity.microsoft.com/blog/exchange/introducing-exchange-online-tenant-outbound-email-limits/4372797), updated Aug 13, 2026; [ERR cancellation](https://techcommunity.microsoft.com/blog/exchange/exchange-online-canceling-the-mailbox-external-recipient-rate-limit/4483498), Jan 6, 2026 |

The provider limits are not the constraint at SES's volume; reputation is. The acceptable-use risk is real: personalized, low-volume, compliant B2B email is common practice, but Google and Microsoft can suspend accounts that draw complaints. That is the main reason cold email must never run from sesmgt.com or from the inboxes the business depends on.

### 2.3 Operating rules from the sending vendors

All [vendor]. They agree closely.

| Rule | What the vendors say | Source |
|---|---|---|
| Separate domains | "Consider sending cold email from a domain other than your primary company domain"; lemlist: cold email "never goes out from your primary company domain"; Smartlead: pick names "closely related to your primary domain", "Never buy secondary domains with numbers or hyphens", avoid .biz or .online | [Instantly deliverability guide](https://help.instantly.ai/en/articles/16034903-deliverability-guide) [vendor: sells sending software]; [lemlist guide](https://www.lemlist.com/blog/cold-email-deliverability), Sep 28, 2026 [vendor]; [Smartlead secondary domains](https://helpcenter.smartlead.ai/en/articles/147-all-you-need-to-know-about-secondary-sending-domains-for-cold-email-campaigns) [vendor] |
| Point them at the main site | lemlist: "Point secondary domains to your main website"; Instantly: forwarding "optional" | same |
| Inboxes per domain | 2 to 3 (Smartlead, Mailforge, Woodpecker); 3 (Instantly blog); "max 3-5" (Instantly help); 3 to 5 "common" (lemlist) | as above; [Mailforge pricing](https://www.mailforge.ai/pricing) [vendor: sells inboxes] |
| Cold sends per inbox per day | "max 30 campaign emails per day per account" (Instantly); "We recommend sending 30 emails per mailbox per day (max 100)" (Mailforge); 30 to 50 per fresh mailbox (lemlist); pre-warmed accounts start at 5 a day, with a "recommended maximum" of 20 to 25 a day per account (Instantly) | [Instantly delivery tips](https://help.instantly.ai/en/articles/6222401-how-to-ensure-your-emails-get-delivered-and-avoid-spam-filters); [Instantly pre-warmed](https://help.instantly.ai/en/articles/9969215-pre-warmed-domains-accounts) |
| Warmup | "At least 2 weeks of warmup. 3 weeks for AirMail accounts"; "Recommended: 3-4 weeks for new domains"; lemlist: "two to four weeks" | [Instantly ready-for-campaigns](https://help.instantly.ai/en/articles/13938078-when-your-email-account-is-ready-for-campaigns); [Instantly pre-launch checklist](https://help.instantly.ai/en/articles/6222212-pre-launch-campaign-checklist) |
| Ramp after warmup | Instantly slow ramp: "2 campaign emails on day 1", plus 2 a day, reaching 30 a day after day 15 | [Instantly slow ramp](https://help.instantly.ai/en/articles/10056946-campaign-slow-ramp-system) |
| Tracking and format | "Open tracking turned off on the first email"; "Always send first email as text-only"; use a custom tracking domain when tracking, because the default one "is shared among Instantly customers" | [Instantly deliverability guide]; [custom tracking domain](https://help.instantly.ai/en/articles/6984188-custom-tracking-domain) |
| Bounce ceiling | "Bounce rate below 2%"; Instantly pauses campaigns above 5% | [Instantly deliverability guide] |
| Per-company cap | Default "2 individuals per company per day" | [Company send limits](https://help.instantly.ai/en/articles/12578026-company-send-limits) |
| Match providers | Send Gmail to Gmail and Outlook to Outlook "whenever you can" | [Instantly deliverability guide] |
| DMARC on cold domains | Start at p=none to monitor, then tighten; "p=reject is becoming standard" | [lemlist guide] |
| Postmaster data | Google Postmaster Tools: "Data might be missing if the total number of messages for a given day is too low" | [primary] [Set up Postmaster Tools](https://support.google.com/mail/answer/9981691) |

The last row matters: at about 50 to 60 emails a day per domain, Postmaster Tools will often show nothing, so SES must watch its own signals (bounces, replies, spam-folder placement checks, unsubscribes).

### 2.4 Inbox and domain options and prices

| Option | Price | What it is | Source |
|---|---|---|---|
| Google Workspace direct, Business Starter | $7.00 per user a month with a 1-year commitment (pricing page; currently "up to 50% off your first 3 months"); $8.40 on the Flexible plan | Real Google accounts SES owns and administers | [primary] [Workspace pricing](https://workspace.google.com/pricing); [Business editions](https://knowledge.workspace.google.com/admin/getting-started/editions/business-editions) |
| Microsoft 365 Business Basic direct | **Not verified**: the Microsoft page did not load (timeouts; prices render by script) | | failed fetch |
| InboxKit (Google or Microsoft 365) | $3.00 per mailbox a month, $2.50 on annual; pre-warmed $6 (2 to 4 weeks warmed), $7 (4 to 8), $9 (8+) | Reseller-provisioned real Google or Microsoft accounts | [InboxKit pricing](https://www.inboxkit.com/pricing) [vendor: sells inboxes] |
| Zapmail | Starter $39 a month with 10 mailboxes (+$3.50 each); Growth $99 with 30 (+$3.25); Pro $299 with 100 | Google and Microsoft mailboxes | [Zapmail](https://zapmail.ai/) [vendor] |
| Scaledmail | Google $3.50 per mailbox a month; Microsoft $50 per domain a month | | [Scaledmail](https://scaledmail.com/pricing) [vendor] |
| Hypertide | Google $3.30 per inbox a month; Outlook-login package $25 per domain a month with 25 inboxes | | [Hypertide](https://www.hypertide.io/pricing) [vendor] |
| Smartlead SmartSenders | Google or Outlook via Zapmail $4.50 per mailbox a month + $13 per domain a year; pre-warmed $9 + $18 | Bought inside the sending tool | [Smartlead pricing](https://www.smartlead.ai/pricing) [vendor] |
| Instantly done-for-you | "$5 per account per month", domain "$15 per year", max 5 accounts per domain; pre-warmed "$10 per account/month" | Bought inside the sending tool | [Instantly DFY setup](https://help.instantly.ai/en/articles/9361043-done-for-you-google-email-setup); [pre-warmed](https://help.instantly.ai/en/articles/9969215-pre-warmed-domains-accounts) [vendor] |
| Mailforge / Infraforge | $3 / $4 per mailbox a month; .com "$14/year" | Private or shared SMTP (not Google or Microsoft) | [Mailforge](https://www.mailforge.ai/pricing), [Infraforge](https://www.infraforge.ai/pricing) [vendor] |
| Maildoso | From $0.49 to $2.50 per mailbox a month by volume | SMTP | [Maildoso](https://maildoso.com/pricing) [vendor] |
| .com domains | Cloudflare at cost $10.46 a year (registration and renewal); Porkbun "from $11.08"; Namecheap returned 403 | | [cfdomainpricing.com](https://cfdomainpricing.com/), updated 2026-10-21 [secondary tracker]; [Porkbun](https://porkbun.com/tld/com) [primary] |

**Choice [estimate].** Use real Google Workspace (or Microsoft 365) mailboxes, not cheap SMTP, because most auto-shop recipients sit on Gmail, Outlook or Yahoo and the vendors advise provider matching. Buying direct from Google costs about 2 to 3 times a reseller but keeps admin control with SES; a reseller (InboxKit, Zapmail) is cheaper and faster to set up. Either way, sending names must be **real SES people** (for example Kaisin and Asmat), each with a working reply inbox.

### 2.5 The concrete setup for 500, 1,500 and 3,000 new contacts a month

Assumptions [estimate]: 4-step sequence (worst case, so it sizes capacity); weekday sending, 21 days a month; 25 cold emails per inbox per day (under the 30 maximum, leaving room for warmup traffic); 3 inboxes per domain; 25% spare inboxes so a tired or flagged inbox can rest.

| | 500 contacts / mo | 1,500 / mo | 3,000 / mo |
|---|---:|---:|---:|
| Emails a month (4 steps) | 2,000 | 6,000 | 12,000 |
| Emails per send day | 95 | 286 | 571 |
| Inboxes needed at 25 a day | 4 | 12 | 23 |
| **Inboxes to run (with spares)** | **6** | **15** | **30** |
| **Sending domains (3 inboxes each)** | **2** | **5** | **10** |
| Monthly capacity at 25 a day | 3,150 | 7,875 | 15,750 |
| Sending tool that fits | Instantly Growth ($47 monthly; "1000 Uploaded Contacts", "5000 Emails Monthly") or Smartlead Base ($39; 2,000 contacts, 6,000 sends) | lemlist Email ($69 or $55 annual; 50,000 emails), Instantly Hypergrowth ($97 or $77.60), Smartlead Pro ($94 or $78) | same as 1,500 |
| Places to scrape a month (27% usable, section 3.4) | about 1,900 | about 5,600 | about 11,100 |
| Lead time to first send | 3 weeks (domains and DNS 1 to 3 days, 2+ weeks warmup) | same, if bought together | same |
| Lead time to full capacity | about 5 weeks (warmup plus 15-day ramp) | same | same |

Buy all 10 domains and at least 15 inboxes in week 1, even though month 1 only needs 6. The 9 idle inboxes cost about $25 to $75 a month and save a second 3 to 5 week warmup delay before the January step to 3,000. Pre-warmed inboxes ($6 to $10 each) can cut the wait to days, but Instantly still advises starting them at 5 a day.

DNS checklist per sending domain: SPF including only the mailbox provider; DKIM (2048-bit where possible; Gmail requires at least 1024); DMARC p=none with a rua report address, tightened after a month of clean reports; redirect the website to sesmgt.com; custom tracking domain only if tracking is on (it should be off on email 1).

---

## 3. Tools and costs

### 3.1 Sending tools

All [primary] pricing pages, undated, read 2026-10-25.

| Tool | Plan that fits about 3,000 contacts and 12,000 emails | Monthly / annual price | Limits | Inboxes and warmup |
|---|---|---|---|---|
| Instantly | Hypergrowth (Growth is too small) | $97 / $77.60 | "25 000 Uploaded Contacts", "125 000 Emails Monthly" | "Unlimited Email Accounts", "Unlimited Email Warmup" |
| Smartlead | Pro (Base: 2,000 contacts, 6,000 sends) | $94 / $78 | "30,000 contacts", "90,000 Email sends" | unlimited email accounts |
| lemlist | Email | $69 / $55 | "50,000 emails/mo", unlimited contacts | "lemwarm ... included in all plans" |
| Saleshandy | Pro | $99 / $76 | 30,000 active prospects, 100,000 emails | unlimited mailboxes and warmup |
| Woodpecker | 50,000-email tier | $79 / $52.67 | unlimited contacts | only 10 warmups included, then $5 per account |
| Reply.io | Email Volume, 3,000 active contacts | $79 / $69 per user | first-step email to 3,000 unique contacts a month | unlimited mailboxes, warmup included |
| Apollo | Professional (Basic caps 250 sends a day) | $79 per seat, annual | "Unlimited" sends, fair use | unlimited Google and Microsoft mailboxes |

Sources: [instantly.ai/pricing](https://instantly.ai/pricing), [smartlead.ai/pricing](https://www.smartlead.ai/pricing), [lemlist.com/pricing](https://www.lemlist.com/pricing), [saleshandy.com/pricing](https://www.saleshandy.com/pricing), [woodpecker.co/pricing](https://woodpecker.co/pricing), [reply.io/pricing](https://reply.io/pricing), [apollo.io/pricing](https://www.apollo.io/pricing).

### 3.2 List building and enrichment

| Source | Price | Fit for auto shops | Source and label |
|---|---|---|---|
| Apify Google Maps scraper (compass/crawler-google-places) | Per 1,000 places: $4 Free tier, $3 Bronze (Starter plan $19 a month), $2 Silver; website contact enrichment +$2 per 1,000; "business leads" (name, work email, title) $0.005 each on Bronze | Best fit: every shop is on Maps with rating, review count, website, phone | [actor page](https://apify.com/compass/crawler-google-places), modified 2026-10-22; [Apify pricing](https://apify.com/pricing) [primary] |
| Outscraper | Maps: 500 free, then $3 per 1,000; Emails and Contacts: $3 per 1,000 domains; verifier $3 per 1,000 | Same data, pay as you go | [outscraper.com/pricing](https://outscraper.com/pricing) [primary] |
| DataForSEO Business Listings | $0.31 per 1,000 rows | Listing data, no emails | [DataForSEO](https://dataforseo.com/apis/business-data-api/business-listings-api) [primary] |
| Google Places API (New) | Text Search Enterprise $35 per 1,000 (1,000 free a month); max 60 results per query; storage restricted (section 3.5) | Compliant but cannot be stored as a lead database | [Google Maps billing](https://developers.google.com/maps/billing-and-pricing), 2026-10-21 [primary] |
| Apollo data | Email = 1 credit; Basic $49 = 30,000 credits a seat a year | Coverage of local trades "patchy" per competitor snippets; strongest for dealership managers | [apollo.io/pricing](https://www.apollo.io/pricing) [primary]; coverage [vendor snippet] |
| Clay | Launch $167 a month annual ($185 monthly) | Waterfall enrichment; overkill at this volume [estimate] | [clay.com/pricing](https://www.clay.com/pricing) [primary] |
| Email finders (owner email from name + domain) | Hunter $49 for 2,000 credits; Prospeo $49 for 2,000; Icypeas $19 for 1,000 found; Findymail $99 for 5,000; LeadMagic $99 for 5,000; most charge only for found emails | Useful when the owner's name is known (from the website, GBP owner replies or state records) | pricing pages [primary] |
| Data Axle, ZoomInfo, D&B Hoovers | No public prices | Dealership and larger-shop coverage; sales-led | [primary] |

### 3.3 Email verification

| Vendor | Price | Catch-all handling | Source |
|---|---|---|---|
| Reoon | 10,000 credits $11.90 | send to catch-alls "with caution, as a separate segment" | [reoon.com](https://www.reoon.com/email-verifier/) [primary] |
| Bouncer | 10,000 = $60 | unknowns not charged | [usebouncer.com/pricing](https://www.usebouncer.com/pricing) [primary] |
| NeverBounce | $8 per 1,000 pay as you go; $49 a month up to 10,000 | not captured (403) | [neverbounce.com/pricing](https://neverbounce.com/pricing) [primary] |
| ZeroBounce | from $39 for 2,000 | catch-alls "impossible to validate without sending"; segment them | [zerobounce.net](https://www.zerobounce.net/) [primary] |
| Apify add-on | $0.004 per check on Bronze | "not charged for catch-all, unknown, or error results" | actor page [primary] |

Why it matters: Saleshandy's 30.3M-email sample shows bounce rates of 1.21% on verified lists, 2.11% unverified and 10.58% on "bad" lists [vendor: sells sending software, updated Oct 7, 2026]. ZeroBounce found only 62% of all addresses submitted in 2025 were valid and over 9% were catch-all (11 billion checked) [vendor: sells verification].

### 3.4 Find rates: how many auto businesses can actually be emailed

| Fact | Value | Source and label |
|---|---|---|
| US Google Maps listings with a website / with at least one email found | **57% / 34%** (about 2M listings; plumbers 58.8% / 37.1%, dentists 54.6% / 32.7%) | Scrap.io co-founder in [The Silicon Review](https://thesiliconreview.com/2026/10/google-maps-email-extractor-where-emails-come-from), 2026-10-05 [vendor: sells Maps scraping] |
| Listings with a website; websites showing an email | about 60%; "40-55% of business websites display a contact email" | [MapsLeads](https://mapsleads.co/blog/google-maps-email-extractor), 2026-01-18 [vendor] |
| US small businesses with no website | 17% in 2025 (Clutch, 406 owners) | [review42](https://review42.com/), updated 2026-07-14 [secondary; originals returned 403/404] |
| Auto repair shops with no website | 11% (Ratchet+Wrench 2022 survey) | search snippet only [secondary, unverified] |
| Owner name plus personal email | **No published rate found** | |

**Estimate for SES [estimate].** Method: 34% of listings yield an email (vendor sample, all US categories, not auto-specific) times about 75% to 85% that survive verification and de-duplication = about **25% to 30% usable**. Applied to the 80,129 top-20 auto establishments that is **about 20,000 to 24,000 contacts** (28,000 at a generous 35%), and most will be generic shop inboxes, not the owner. Nationally (202,176) it is about 50,000 to 70,000. At 3,000 new contacts a month the top-20 list lasts **7 to 9 months**. The earlier market model assumed all 80,129 could be emailed, about 3 times too many.

How to reach the owner rather than info@ [estimate]: the owner's first name is often on the website's About page, in GBP review replies, or in state business filings; an email finder (Prospeo, Hunter, Icypeas) then tests name@domain for about 1 to 2.5 cents a found address (Icypeas $89 for 10,000; Hunter $49 for 2,000).

### 3.5 Is scraping Google Maps allowed?

- **Google Maps Platform Terms 3.2.3(a)** (API customers): "No Scraping. Customer will not export, extract, or otherwise scrape Google Maps Content for use outside the Services", including to "copy and save business names, addresses, or user reviews"; 3.2.3(b) "No Caching". Only place_id may be stored indefinitely. [primary] [Maps Platform Terms](https://cloud.google.com/maps-platform/terms), last modified 2026-08-26; [Places policies](https://developers.google.com/maps/documentation/places/web-service/policies), 2026-10-21.
- **Google Terms of Service** bar "using automated means to access content from any of our services in violation of the machine-readable instructions on our web pages (for example, robots.txt files...)". [primary] [policies.google.com/terms](https://policies.google.com/terms), effective 2026-07-30.
- **Case law on public data**: Van Buren v. US (2021) narrowed the federal anti-hacking law to a "gates-up-or-down inquiry" [primary, law.cornell.edu]; hiQ v. LinkedIn ended in Dec 2022 with hiQ found in breach of LinkedIn's User Agreement and a $500,000 consent judgment [secondary: Nat Law Review, 2022-12-08]; courts ruled for Bright Data against Meta (Jan 2024) and X (May 2024) on scraping logged-out public data [secondary: Wikipedia only].
- **Vendors' view**: Apify says "we firmly believe that it is legal" [vendor, 2026-02-10]; Outscraper cites the First Amendment [vendor].

**Reading [estimate, not legal advice]:** scraping public Maps listings through a third-party scraper is a breach of Google's terms (contract risk, and Google can act against Google accounts), not a crime under current federal case law; using the official Places API to build a stored lead list is expressly against the API terms. The practical risk for SES is low but not zero; the cleaner options are Outscraper or Apify (the vendor carries the scraping), or DataForSEO's listings API, and storing only what is needed.

### 3.6 Calling, video and mail tools

| Item | Price | Source |
|---|---|---|
| Loom Business (video audits) | $18 per user a month on monthly billing; annual "save 17%"; free Starter capped at 25 videos of 5 minutes | [primary] [Loom pricing](https://www.atlassian.com/software/loom/pricing) |
| Power dialer, cheapest published | CloudTalk Starter $25 + Power Dialer $15 = $40 per user a month (annual); Close Growth $99 annual / $109 monthly; PhoneBurner $140 / $165 | [vendor: Kixie sells a dialer] [power dialer comparison](https://www.kixie.com/sales-blog/best-affordable-power-dialers/), prices checked 2026-10-07 |
| National Do Not Call Registry | $85 per area code a year (FY2027), "The first five area codes are free", maximum $23,425 | [primary] [FTC](https://www.ftc.gov/news-events/news/press-releases/2026/08/ftc-announces-2027-telemarketer-fees-access-national-do-not-call-registry), 2026-08-26 |
| Postage | USPS from July 12, 2026: postcard 65 cents, Forever stamp 82 cents (PRC cleared the change May 27, 2026) | [primary] [USPS newsroom](https://about.usps.com/newsroom/national-releases/2026/0409-usps-recommends-new-prices-for-july.htm), 2026-04-09; [Postal Bulletin](https://about.usps.com/postal-bulletin/2026/pb22704/html/updt_001.htm) |
| Print and mail APIs | Lob postcards from $0.905 (Developer, $0 a month) or $0.645 (Startup, $260 a month), postage included; PostGrid 4x6 First Class $0.902 | [Lob](https://www.lob.com/pricing), [PostGrid](https://www.postgrid.com/pricing-print-mail/) [primary] |
| Handwritten-style notes | thanks.io notecard $3.04 pay as you go (postage included, handwriting "digitally rendered"), updated July 12, 2026; Handwrytten "$3.75. ... Postage extra"; Simply Noted $2.80 a card at 100 plus $0.82 postage, updated Oct 19, 2026 | [thanks.io](https://www.thanks.io/pricing), [Handwrytten](https://www.handwrytten.com/pricing/), [Simply Noted](https://simplynoted.com/pages/pricing) [primary] |

### 3.7 Monthly cost at 3,000 contacts a month

| Line | Lean (reseller inboxes, annual billing) | Standard (Google direct, monthly billing) |
|---|---:|---:|
| 10 domains (Cloudflare $10.46 a year) | $9 | $9 |
| 30 inboxes | $75 (InboxKit $2.50) | $252 (Workspace Flexible $8.40) |
| Sending tool | $55 (lemlist annual) to $78 | $97 (Instantly Hypergrowth) |
| Data: about 11,100 places with contact enrichment | $56 (Apify Bronze $5 per 1,000) + $19 plan | $52 (Outscraper: $33 Maps + $19 emails on about 6,300 sites) |
| Verification, about 4,000 emails | $5 (Reoon) | $32 (NeverBounce) |
| **Email program subtotal** | **about $220 to $240** | **about $440** |
| Loom (video audits) | $15 | $18 |
| Dialer (optional) | $40 | $40 |
| **All tools** | **about $275 to $295** | **about $500** |
| One-off | first-year domains $105, paid up front | same |

Labor at 3,000 contacts a month [estimate]: list pulls, cleaning and segmenting 3 to 4 hours a week; semi-automated personalization and QA 2 to 3; reply handling 3 to 4 (about 45 replies a month at a 1.5% reply rate); deliverability checks 1; total **10 to 12 hours a week**, plus 2 to 3 hours a week of held meetings at the mid case. At $25 an hour that is about $1,100 to $1,300 a month, 2 to 5 times the software bill.

---

## 4. Compliance

Not legal advice; summary of the law as published. SES should have a lawyer confirm the call and text rules before any calling at scale.

### 4.1 Email: CAN-SPAM (applies to B2B)

The FTC: "The law makes no exception for business-to-business email." Cold B2B email is allowed without prior consent if every message meets these conditions ([primary] [FTC compliance guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business), Aug 2023, edited Jan 2024):

1. No false or misleading header information: From, To, Reply-To and routing "must be accurate and identify the person or business who initiated the message".
2. No deceptive subject lines ("must accurately reflect the content"). Gmail adds: no "Re:" or "Fwd:" unless it is a real reply or forward.
3. Identify the message as an ad, "clearly and conspicuously".
4. Include SES's valid physical postal address.
5. Explain clearly how to opt out of future email.
6. Honor opt-outs "within 10 business days"; keep the opt-out working "for at least 30 days after you send"; no fee or extra information to opt out; never sell or transfer opted-out addresses.
7. Monitor vendors: "you can't contract away your legal responsibility".

Penalty: "Each separate email in violation ... is subject to penalties of up to $53,088" (FTC guide). The FTC made no inflation adjustment in 2026 ([primary] [Federal Register 2026-18853](https://www.federalregister.gov/documents/2026/09/15/2026-18853/civil-penalty-inflation-adjustments), 2026-09-15). Aggravated violations (15 U.S.C. 7704(b)) include harvesting addresses from websites that post a no-transfer notice and dictionary attacks; on the statute's wording they add penalties to a message that already breaks the rules ([primary] [15 U.S.C. 7704](https://www.law.cornell.edu/uscode/text/15/7704)). Practical rule: do not scrape sites that say they do not share addresses, and never guess addresses by dictionary permutation.

### 4.2 State email laws

CAN-SPAM preempts state laws that "expressly regulate the use of electronic mail to send commercial messages", except to the extent they prohibit "falsity or deception" ([primary] [15 U.S.C. 7707(b)](https://www.law.cornell.edu/uscode/text/15/7707)). No state law requiring consent for B2B email was found (and one would likely be preempted). The state laws that survive bite on false or deceptive headers and subject lines, and they carry private damages: California Bus. and Prof. Code 17529.5 ("Liquidated damages of one thousand dollars ($1,000) for each unsolicited commercial e-mail advertisement" with a misleading subject or header; [primary] [leginfo](https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=17529.5.&lawCode=BPC)); Washington's CEMA, where Brown v. Old Navy (Wash. Apr 17, 2025, 5 to 4) made any false or misleading subject-line content, including false urgency, worth $500 per email [secondary: Arnold & Porter, 2025-10-31; K&L Gates, 2025-08-07]; and Georgia's Slam Spam E-mail Act (O.C.G.A. 16-9-100 and following), which makes deceptive commercial email a crime [secondary: Cornell LII summary]. Truthful sender names and plain, accurate subjects keep SES clear.

### 4.3 Cold calls to auto owners

The FTC's Telemarketing Sales Rule mostly exempts B2B calls; the FCC's TCPA rules do not. The TCPA turns on the type of line (wireless or residential), not on whether the person called is a business.

| Rule | What it says | Source |
|---|---|---|
| Cell phones: autodialer or artificial/prerecorded voice | No call to "any telephone number assigned to a ... cellular telephone service" using an autodialer or "an artificial or prerecorded voice" without prior express consent. No business exemption. $500 per violation, up to 3 times if willful | [primary] [47 U.S.C. 227(b)](https://www.law.cornell.edu/uscode/text/47/227) |
| What counts as an autodialer | Facebook v. Duguid (U.S., Apr 1, 2021, 9 to 0): needs the capacity to use a random or sequential number generator, so a dialer working from a list usually falls outside the federal definition. The prerecorded and artificial voice ban applies regardless | [primary] (not re-fetched in this run) |
| AI voices | FCC 24-17 (Feb 8, 2024): "artificial or prerecorded voice" covers "current AI technologies that generate human voices"; callers "must obtain prior express consent" | [primary] [FCC 24-17](https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf) |
| Ringless voicemail | FCC 22-85 (Nov 21, 2022): ringless voicemail to a wireless number is a "call" and needs consent | [primary] [FCC 22-85](https://docs.fcc.gov/public/attachments/FCC-22-85A1_Rcd.pdf) (via search summary) |
| National Do Not Call list | No telephone solicitation to a registered "residential telephone subscriber"; the rule extends to wireless numbers (64.1200(c)(2), (e)); scrub at least every 31 days for the safe harbor. FTC: "Business phone numbers and fax lines are not covered" | [primary] [47 C.F.R. 64.1200](https://www.ecfr.gov/current/title-47/section-64.1200) (current to 2026-10-22); [FTC DNC FAQ](https://consumer.ftc.gov/articles/national-do-not-call-registry-faqs) |
| Owner's cell used for the business (unsettled) | Chennette v. Porch.com (9th Cir. Oct 12, 2022): a registered cell used for both personal and business purposes is "presumptively residential", and the caller carries the burden (facts: B2B texts to contractors). Anthony v. Brian Marketing Group (S.D. Fla. Sept 11, 2026) held the DNC rules do not cover cells at all, which commentators call "certainly the minority view". No ruling squarely addresses a sole proprietor's cell listed as the business number | [secondary: Olshan; Duane Morris, 2026-09-21] |
| Internal do-not-call policy | Written policy, trained staff, record and honor requests within 10 business days, keep them 5 years, callers identify themselves and SES (64.1200(d)) | [primary] |
| Hours and caller ID | No solicitation before 8 a.m. or after 9 p.m. local (64.1200(c)(1)); transmit caller ID with a number that accepts do-not-call requests; no blocking or spoofing (64.1601) | [primary] [47 C.F.R. 64.1601](https://www.ecfr.gov/current/title-47/section-64.1601) |
| FTC Telemarketing Sales Rule | Exempts "Telephone calls between a telemarketer and any business to induce the purchase of goods or services" (310.6(b)(7)), but since May 16, 2024 the bans on material misrepresentations and false or misleading statements apply to B2B calls | [primary] [16 C.F.R. 310.6](https://www.ecfr.gov/current/title-16/section-310.6); [89 FR 26760](https://www.federalregister.gov/d/2024-07180), 2024-04-16 |
| DNC registry access | First five area codes free; $85 per extra area code in FY2027; maximum $23,425 | [primary] FTC, 2026-08-26 (section 3.6) |

**2025 to 2026 changes**

- The FCC's one-to-one consent rule was vacated by the 11th Circuit (Insurance Marketing Coalition v. FCC, Jan 24, 2025) and removed from the rules (DA 25-621, 90 FR 42137, Aug 29, 2025). [primary] [Federal Register](https://www.federalregister.gov/documents/2025/08/29/2025-16641)
- Consent revocation rules took effect Apr 11, 2025: revoke "by any reasonable method", words such as "stop" or "unsubscribe" count, honor within 10 business days. The "revoke all" part was delayed to Jan 31, 2027 and then replaced by FCC 26-67 (adopted Sept 30, 2026): "Marketing opt-outs, however, must be applied at the caller or texter level"; Federal Register publication Oct 26, 2026, effective Nov 25, 2026. [primary: FR Doc 2026-21821 metadata] [secondary: Kelley Drye, 2026-10-13]
- McLaughlin Chiropractic v. McKesson (U.S., June 20, 2025, 6 to 3): district courts may decide for themselves whether the FCC's reading of the TCPA is correct. FCC positions (cells are residential, texts are calls) now persuade but do not bind. [secondary: Gibson Dunn; Faegre Drinker]
- Courts are split on whether texts are "calls" for DNC lawsuits: the 7th Circuit says no (Steidinger v. Blackstone Medical Services, July 14, 2026); the 9th Circuit treats texts as calls under 227(b) (Howard v. RNC, Jan 13, 2026). [secondary: Troutman, 2026-07-15]

**State rules that matter**

| State | Rule | Applies to SES's B2B calls? | Source |
|---|---|---|---|
| Georgia (home state) | O.C.G.A. 46-5-27: no "telephone solicitation" (any voice call "encouraging the purchase ... of ... goods, or services") to a "residential, mobile, or wireless subscriber" on the state no-call list; exemptions for prior invitation or an existing business relationship; up to $2,000 per knowing violation | Probably yes for a registered Georgia cell: the text is not limited to consumer goods. Current list mechanics not verified | [secondary: unofficial code host](https://law.onecle.com/georgia/title-46/46-5-27.html) |
| Florida | Telephone Solicitation Act 501.059: consent needed for calls or texts using "an automated system for the selection and dialing" or recorded messages, for "consumer goods or services". Telemarketing Act 501.616(6): no calls before 8 a.m. or after 8 p.m., no "More than three ... calls from any number to a person over a 24-hour period" | Likely not, since marketing services for a business are not consumer goods (reading of the text; no case law checked). Safe practice: follow the hours and the 3-call cap anyway | [primary] [Fla. Stat. 501.059](https://www.flsenate.gov/Laws/Statutes/2025/501.059), [501.616](https://www.flsenate.gov/Laws/Statutes/2025/501.616) |
| Maryland | Stop the Spam Calls Act (Jan 1, 2024): consent for automated dialing or recorded messages; no calls between 8 p.m. and 8 a.m.; no more than 3 calls in 24 hours on the same subject; B2B exemption for a solicitor "lawfully operating continuously for at least 3 years under the same business name" | Yes for hours and call caps; SES likely qualifies for the B2B consent exemption if it has traded 3+ years as SES MGT (verify) | [primary] [Maryland Ch. 413](https://mgaleg.maryland.gov/2023RS/chapters_noln/Ch_413_sb0090E.pdf) (section placement uncertain) |
| Oklahoma | Telephone Solicitation Act (Nov 1, 2022): consent for automated "selection or dialing" or recorded messages; texts included | Scope, hours and call caps not verified | [secondary: Hall Estill, Oct 2022] |
| Texas | SB 140 (Sept 1, 2025): "telephone solicitation" now includes texts; sellers must register unless exempt; violations actionable under the DTPA; no general B2B exemption listed | Check registration before calling or texting Texas at volume | [secondary: Greenberg Traurig, 2025-09-23] |
| Washington | RCW 19.190.060 and .070: no commercial texts to a Washington cell without clear consent; $500 per message. Brown v. Old Navy (Wash. Apr 17, 2025): any false or misleading subject-line content in commercial email is actionable at $500 per email | Yes for texts and email subject lines | [secondary: Arnold & Porter, 2025-10-31] |

### 4.4 Is cold SMS to shop owners allowed? No.

Cold texting a shop owner's cell is **not allowed in practice without prior consent**:
- Federal: a text is a "call" under 227(b), so any platform-sent, autodialed, prerecorded or AI text needs consent; DNC exposure remains for personal or mixed-use cells (split above).
- State: Washington bans cold commercial texts outright; Florida, Oklahoma and Maryland consent rules cover texts; Texas requires registration for text solicitations.
- Carriers: the CTIA Messaging Principles (May 2023) expect senders to "Obtain a Consumer's express written consent to specifically receive marketing messages" and say senders "should not use opt-in lists that have been rented, sold, or shared"; 10DLC campaign registration requires describing how opt-in was collected. [primary industry standard] [CTIA principles](https://api.ctia.org/wp-content/uploads/2023/05/230523-CTIA-Messaging-Principles-and-Best-Practices-FINAL.pdf)

Allowed: replying to an owner who texts SES first ("If the Consumer initiates the text message exchange", per CTIA), and texting people who opted in on a form with an unchecked box, signature, the phone number and a disclosure, from a registered number with STOP and HELP.

### 4.5 LinkedIn and direct mail

- LinkedIn User Agreement (effective Nov 3, 2025), section 8.2, bars using "software, devices, scripts, robots" to scrape and using "bots or other unauthorized automated methods"; section 3.4 lets LinkedIn "restrict, suspend, or terminate your account". The risk is contractual. Manual outreach and Sales Navigator are fine. [primary] [User Agreement](https://www.linkedin.com/legal/user-agreement). For targeting and fit, see the sibling file `meta-linkedin.md` (LinkedIn fits dealerships; shop owners are thin there, section 5).
- Direct mail to business addresses needs no consent. Keep it truthful, never make it look like an invoice, honor removal requests. [unverified: no consent rule for B2B postal mail was found; the postal statutes (39 U.S.C. 3001, 3009) were not re-fetched]

### 4.6 Red lines and green list

**Never:**
1. Text an owner's cell without prior consent; use bought or shared SMS lists; text Washington numbers.
2. Use prerecorded, AI-voice or ringless-voicemail calls to cells without prior express consent.
3. Call numbers on the National or Georgia do-not-call lists on the theory that "it's a business owner": a mixed-use cell is presumed residential in the 9th Circuit.
4. Call outside 8 a.m. to 8 p.m. recipient time, or more than 3 times in 24 hours on the same subject.
5. Block or spoof caller ID.
6. Contact anyone after an opt-out, or share opted-out addresses.
7. Use fake sender names or personas, fake "Re:" or "Fwd:", false urgency or misleading subjects (CAN-SPAM up to $53,088 per email; California $1,000 per email; Washington $500 per email; Georgia criminal).
8. Guess addresses by dictionary permutation or harvest from sites that post a no-transfer notice.
9. Make guarantees, fabricated stats or false claims on calls or in email (TSR 310.3 now covers B2B; SES copy rules also forbid them).
10. Use LinkedIn automation or scraping tools.

**Allowed with conditions:**
1. Cold email to business and @gmail.com addresses: truthful headers and subject, ad disclosure, SES postal address, working opt-out for 30+ days, suppression within 10 business days, vendor oversight.
2. Live, human-dialed calls to business lines and owner cells: no autodialer or recorded voice, DNC scrub every 31 days (National and Georgia), written internal DNC policy, caller ID with a callback number, 9 a.m. to 6 p.m. local, at most 3 attempts a day per person.
3. Texts only after the owner texts first or opts in.
4. Manual LinkedIn outreach; truthful postal mail.

---

## 5. Benchmarks 2025 to 2026 for outreach to local SMB owners

This extends benchmarks.md section 5 (Belkins 0.45% reply per send, Smartlead 0.74%, Instantly 3.43%, Woodpecker; Belkins 370 dials per meeting; Cognism). No auto-specific outreach benchmark was found for any channel.

### 5.1 By channel

| Channel | Metric | Value | Scope and definition | Source and date |
|---|---|---|---|---|
| Email | Meetings per send | Belkins: "over 1,200 appointments" on 7,530,489 emails = **0.16 per 1,000 sends, about 0.6 per 1,000 contacts** at 4 sends each [arithmetic] | Agency-run B2B campaigns, 2025 | [vendor: outbound agency] [Belkins](https://belkins.io/blog/cold-email-response-rates), updated 2026-06-26 |
| Email | Meeting-booked rate | "roughly 1% of sends turning into booked meetings"; 2025 average 0.5% to 2% of prospects emailed | Instantly platform; prospects emailed | [vendor: sells sending software] [Instantly blog](https://instantly.ai/blog/meeting-email-metrics-to-track-response-booking-rates/), 2026-02-24 |
| Email | Reply rate | 4.5% overall; 3% for sales outreach; bounce 3.6% | 31M emails by Hunter users, 2025 | [vendor: sells email finder] [Hunter State of Email Outreach 2026](https://hunter.io/the-state-of-cold-email), undated |
| Email | Reply rate; meetings | 4.5% of delivered; top campaigns "2-3 meetings per 100 emails"; bounce 1.21% verified, 2.11% unverified, 10.58% bad lists | 30.3M emails; period stated inconsistently (2026) | [vendor: sells sending software] [Saleshandy](https://www.saleshandy.com/blog/cold-email-statistics/), updated 2026-10-07 |
| Email | Bounce, unsubscribe | Bounce 1.71%; unsubscribe 0.36% (marketing and advertising 0.70%) | 7.53M emails, 2025 | [vendor] [Belkins deliverability](https://belkins.io/blog/email-deliverability-rates), updated 2026-06-29 |
| Email | Positive reply to meeting | 15% to 30% of positive replies (unsourced vendor blog); about 18% of human replies positive and booked (one agency, self-reported) | | [secondary: search summary] |
| Show rate | No-show by booking channel | **Cold email, SDR-booked 36%; cold call 39%**; referral 12%; paid search or social lead form 33%; outsourced appointment setter 42% | Normalized from published datasets; no sample size for the channel table | [vendor: agency] [Focus Digital](https://focus-digital.co/average-no-show-rate-for-booked-sales-meetings-by-booking-channel/), 2026-09-14 |
| Show rate | No-show | "~20% typical"; top performers "below 15%" | Instantly, 2025 | [vendor] Instantly blog, 2026-02-24 |
| Show rate | No-show | 6.5% (419 of 6,428 meetings) | Scheduler data, mostly inbound demos | [vendor: scheduler] [RevenueHero](https://revenuehero.io/reports/no-show-benchmark-december-02-2024), 2024-12-13 (older) |
| Calls | Answer and success | "Only about 28% of cold calls are answered" (Service Bell); average success 2.3%; 3 attempts to connect | 10,000+ calls; region not stated | [vendor: sells data] [Cognism SMB cold calling](https://www.cognism.com/blog/smb-cold-calling), updated 2026-10-12 |
| Calls | Best times | Positive outcomes highest 3 to 4 p.m. (1.05% to 1.22% of dials) and 6 p.m. (1.47%); Wednesday 0.95%, Friday 0.51% | 175,000+ dials, 2025, US healthcare and retail heavy | [vendor] [Belkins calling](https://belkins.io/blog/cold-calling-benchmarks), 2026-06-26 |
| Calls | Local caller ID | 27.5% say they would answer a local area code vs 7% toll-free | Stated intent, survey year not given | [secondary: Software Advice via Landbase](https://landbase.com/blog/direct-dial-coverage-statistics), 2026-01-08 |
| Calls | Shop timing | Mid-morning 9:30 to 11 a.m., after the drop-off rush; avoid opening hour, lunch, after 4 p.m. | No data behind it | [vendor: Apollo blog, via search summary] |
| LinkedIn | Shop owners on LinkedIn | **15%** (Facebook 82%, Instagram 33%, none 17%) | Ratchet+Wrench reader survey; year not shown (about 2023) | [secondary: trade publication] [Ratchet+Wrench](https://www.ratchetandwrench.com/articles/13071-numbers-preferred-social-media-platforms) |
| LinkedIn | Collision shops on LinkedIn | **14%** (Facebook 73%, Google Business Profile 41%, none 26%) | FenderBender 2021 Industry Survey | [secondary] [FenderBender](https://www.fenderbender.com/home/article/11468440/numbers-the-industrys-social-media-usage) (older) |
| Video | Reply lift | No independent study found. Loom case: Intercom +19% reply rate; Vidyard case: "4x improvement in reply rates"; practitioner anecdotes 10% to 16%, and 4% to 22% after 90-second Looms | Vendor case studies and anecdotes | [vendor] Loom, [Vidyard](https://www.vidyard.com/video-benchmark/); anecdotes [secondary: search summary] |
| Video | Watch-through | Videos under 1 minute: 65% of viewers stay to the end; over 20 minutes: 20% | 943,305 Vidyard videos, 2024 | [vendor: sells video] [Vidyard 2025 benchmark](https://www.vidyard.com/video-benchmark/) |
| Direct mail | Response | House lists 5% to 9%, prospect lists 2.0% to 4.4% (ANA/DMA 2025 as cited); automotive 3.84% | Consumer-heavy; "response" is any response, not a meeting; the ANA report (now "Impact Pulse") is members-only | [secondary] [directmail.io](https://directmail.io/direct-mail-response-rate); [mydoceo](https://www.mydoceo.com/blog/direct-mail-response-rates-2026), 2026-03-16; [ANA page](https://www.ana.net/miccontent/show/id/ii-2025-07-impact-pulse-report), 2025-07-24 |

### 5.2 Auto-specific context (who can pay)

| Fact | Value | Source |
|---|---|---|
| Average US franchised dealership ad spend, 2025 | **$586,246** a year; search 21.1%, third-party listings 20.0%, SEO 19.5%, social 14.2%, TV 10.5%, direct mail 5.6%; $739 per new vehicle (H1 2026: $791) | [primary] [NADA Data 2025](https://www.nada.org/media/4695), Apr 2026; [NADA midyear 2026](https://www.nada.org/media/4694), Sept 2026 |
| Repair shops' marketing budget | 62% spend under 5% of annual sales on marketing; 38% more | [secondary: Ratchet+Wrench 2021 survey](https://www.ratchetandwrench.com/running-a-shop/article/11463262/numbers-the-impact-of-marketing), 2021-12-21 (old) |
| Car washes | 34% put only 1% to 10% of budget into acquiring customers; 11% none; word of mouth 64% | [vendor-sponsored survey] [Carwash.com](https://www.carwash.com/2024-carwash-customer-acquisition-survey-results/), 2024-11-13 |
| Dealer vendor switching | 40% dissatisfied with their inventory photo and video vendor; 33% of vendor decisions driven by existing relationships (3,000+ dealer staff, 2023) | [secondary: search summary; page returned 403] Dealer Image Pro via AutoSuccess |
| Detailing, tint, PPF | No cited spend or outreach data found | |

Reading [estimate]: dealerships have budgets far above SES's $1,500 to $5,000 range but buy through relationships; owner-run repair, detailing and wash shops have the opposite problem. A $1,500 retainer is $18,000 a year, which at a 5% marketing share needs about $360,000 of annual sales. Target shops that look busy (many reviews, several bays, premium services) but market badly, not the weakest listings.

### 5.3 Planning band

| Metric | Low | Mid | High | Basis |
|---|---:|---:|---:|---|
| Email: booked meetings per 1,000 new contacts | 1 | 4 | 10 | benchmarks.md; Belkins measured about 0.6; Instantly 5 to 20 |
| Video audit: booked meetings per 100 prospects | 2 | 4 | 8 | [estimate]: reply 5% / 10% / 16% times 40% / 40% / 50% booked; anecdotes only |
| Calls: dials per booked meeting | 600 | 370 | 250 | benchmarks.md |
| Share of booked meetings that happen | 65% | 70% | 80% | Focus Digital 61% to 64% held for cold-booked; Instantly about 80% |
| Direct mail: responses per 100 pieces, B2B agency offer | 0.5 | 1 | 2 | [estimate]: well under the consumer-heavy 2% to 4.4% prospect rate |

---

## 6. The personalized-audit play

**Idea.** Pick auto businesses that are clearly busy but market badly, record a 60 to 90 second screen-and-face video showing three specific gaps (Google Business Profile, website on a phone, whether Google's AI answer or ads show competitors instead), send it by email, and follow up by phone. It uses what SES has that generic agencies do not: an in-house video team, real auto proof (named client testimonials) and a 5.0 Google rating.

**Who to pick (Tier A, about 100 to 120 a month)** [estimate]:
- Signals of a business that can pay: 4.3+ stars and 80+ reviews, or several bays, premium services (PPF, ceramic, collision), or a dealership.
- Signals of weak marketing: no website or a slow mobile site (PageSpeed mobile score under 50; free via PageSpeed Insights), not running Google Ads (public check in the [Google Ads Transparency Center](https://adstransparency.google.com/)), few photos or posts on the profile, unanswered reviews, not named in Google's AI answer for "best [service] in [city]".
- SES's proof verticals first: tint, PPF and ceramic; detailing; collision and repair; then dealerships.
- Skip the weakest listings (no website and 10 reviews): they rarely afford $1,500 a month.

**Workflow and time per prospect [estimate, from walking through each step]:**

| Step | Minutes |
|---|---:|
| Automated pull and scoring (Maps scraper, PageSpeed API, review counts), per prospect | 0.5 |
| Manual check: profile, mobile site, AI answer, ads check | 4 to 5 |
| Record a 60 to 90 second video (one retake) | 3 to 4 |
| Email with 2 custom lines and the video thumbnail; log in CRM | 2 |
| Two follow-up calls over the next week, leaving a live voicemail (human-dialed; never a prerecorded or ringless drop) | 3 to 4 |
| **Total** | **about 13 to 16, so 4 prospects an hour** |

Deliverability note: Instantly advises a text-only first email with no tracking, so put the video in email 2, or use an **ask-first variant**: email 1 offers the 90-second teardown and SES records only for owners who say yes. ListKit's example: "you only have to create 14 Looms if you get 14 replies from 1,000 emails" [vendor, via search summary]. Run both and compare.

**Cost per meeting [estimate].** Method: 120 prospects a month x 15 minutes = 30 hours at $25 an hour = $750, plus Loom $18 and data about $5 = **about $775 a month**. At 2 / 4 / 8 booked meetings per 100 prospects that is 2.4 / 4.8 / 9.6 booked a month, so **about $320 / $160 / $80 per booked meeting**, or about $500 / $230 / $100 per held meeting. At an owner's time value of $50 an hour, double these.

For comparison on the same method: email at 3,000 contacts (tools about $300 plus 11 hours a week at $25 = about $1,490 a month) costs about $500 / $125 / $50 per booked meeting; calling 2,000 dials a month (50 hours at 40 dials an hour, plus a $40 dialer) costs about $390 / $240 / $160.

Copy rules for every message (SES copy rules): no em or en dashes, no guarantees or timeframes, no fabricated numbers or badges; lead with the honest 5.0 Google rating and named real client testimonials; "Results or we work free", "No contracts" and "Fixed pricing" are allowed; all copy approved through Kaisin.

---

## 7. A 90-day outbound plan (Oct 26, 2026 to Jan 22, 2027)

### 7.1 Timeline

| Weeks | Dates | Work | Volume |
|---|---|---|---|
| 1 | Oct 26 to Nov 1 | Pick inbox route and sending tool. Buy 10 domains and 15 inboxes for 2 to 3 real SES senders; set SPF, DKIM, DMARC (p=none) and redirects; start warmup by Oct 30. Footer with SES postal address and opt-out; suppression list; written do-not-call policy; DNC registry access (first five area codes free). Pilot pull: 500 Atlanta auto listings to measure website, email, verified and owner-name rates | 0 sends |
| 2 | Nov 2 to 8 | Copy: 4-step sequence per vertical, video-audit template, call script; 5 sample audits; Kaisin approves. Build Tier A (100) and Tier B (500) lists; verify | 0 |
| 3 | Nov 9 to 15 | Warmup continues (2+ weeks by Nov 13). Live calls to Tier A Atlanta can start (no warmup needed) | calls only |
| 4 | Nov 16 to 22 | First cold sends on the slow ramp (2 a day per inbox, +2 a day); first 25 video audits | about 250 contacts |
| 5 | Nov 23 to 29 | Thanksgiving Nov 26: send Mon to Wed only | about 150 |
| 6 to 8 | Nov 30 to Dec 18 | Ramp to the 1,500-a-month pace; 25 audits a week; buy and warm the second 15 inboxes by Dec 7 for January | about 375 a week |
| 9 to 10 | Dec 21 to Jan 1 | No new sequences Dec 23 to Jan 1; work replies; review deliverability; rewrite losing variants | replies only |
| 11 to 13 | Jan 4 to 22 | 3,000-a-month pace; 30 audits a week; day-90 review on Jan 22 | about 700 a week |

About 3,600 new contacts and 200 to 250 video audits in the 90 days [estimate: sum of the weekly volumes above]. The holiday gap means the market model's "1,500 in December" is optimistic; plan about 1,100 to 1,200.

### 7.2 Who does what (hours a week at full volume) [estimate]

| Person | Work | Hours a week |
|---|---|---:|
| Asmat (operator) | Infrastructure and deliverability 1 to 2; list pulls and verification 3 to 4; sequences, reply triage and CRM 4 to 5 | 9 to 11 (one-off setup 15 to 20 in weeks 1 to 2) |
| SES strategist or video team | 30 video audits at about 15 minutes (or a VA researches and the strategist only records: about 3) | 3 to 8 |
| Caller (optional) | About 400 to 480 live dials a week at 40 an hour | 10 to 12 |
| Kaisin (owner, closer) | Copy approvals; about 3 to 4 held meetings a week at the mid case plus proposals | 4 to 6 |
| **Total without calls / with calls** | | **about 16 to 25 / 26 to 37** |

At the high case (about 38 held meetings a month) SES needs a dedicated closer.

### 7.3 Metrics and thresholds

Track weekly: new contacts, delivered, bounce rate, unsubscribe rate, replies, positive replies, booked, held, proposals, clients; video audits sent and watched; dials, connects, conversations.

**Stop-the-line rules (any time):** bounce above 2% on a list source: pause that source and re-verify (Instantly auto-pauses at 5%); any Gmail or Microsoft rejection codes or a spam-complaint signal: pause that inbox for 2 weeks; any opt-out not processed within 10 business days: stop sending until fixed.

**Day 45 check (about Dec 11, about 1,000 contacts):** reply rate at least 1% and at least 1 booked meeting. Below 0.5% replies: do not add volume; change the offer, the segment or the first line.

**Day 90 decision (Jan 22, about 3,000+ contacts):**

| Result | Action |
|---|---|
| Under 1 booked meeting per 1,000 contacts | Kill email at scale; keep video audits only if they clear their bar |
| 1 to 3 per 1,000 | Hold at 1,500 a month and iterate copy and segments |
| 4+ per 1,000 and at least 1 client signed from outbound | Scale to 3,000 a month; plan the national list (top-20 usable list lasts 7 to 9 months) |
| Video audits under 2 booked per 100 | Stop; 4+ keep; 8+ double to 200 to 250 a month |
| Calls under 2 booked per 1,000 dials | Stop calling |

### 7.4 Meetings a month at full ramp (from January 2027)

| Channel and volume | Low | Mid | High |
|---|---:|---:|---:|
| Email, 3,000 contacts: booked / held | 3 / 2.0 | 12 / 8.4 | 30 / 24 |
| Video audits, 120 prospects: booked / held | 2.4 / 1.6 | 4.8 / 3.4 | 9.6 / 7.7 |
| Calls, 2,000 dials (optional): booked / held | 3.3 / 2.0 | 5.4 / 3.5 | 8 / 6.0 |
| **Held meetings, all three** | **about 5.5** | **about 15** | **about 38** |
| Held meetings, email plus video only | about 3.5 | about 12 | about 32 |
| New clients at 20% of held meetings (10%) | 1.1 (0.6) | 3.1 (1.5) | 7.5 (3.8) |

Show rates: 65% / 70% / 80% for email and video, 60% / 65% / 75% for calls [estimate from section 5]. Against the market model: SYNTHESIS treats 12 booked meetings from 3,000 contacts as 2.4 clients a month; after no-shows the email line alone gives about 1.7 at the same 20% close.

---

## 8. Risks

1. **Deliverability and account suspension.** Gmail has been "ramping up its enforcement" since Nov 2025, Microsoft rejects non-compliant mail with 550 5.7.515, and Google's AUP bars spam. A few complaints can burn an inbox; that is why cold email never runs from sesmgt.com.
2. **A thin list.** About a third of listings expose any email and most are generic; the owner often never sees info@. The top-20 list lasts about 7 to 9 months at 3,000 a month.
3. **Legal exposure on the phone.** Owner cells listed as business numbers may count as residential for DNC; texts are a no; state rules differ (Georgia, Florida, Maryland, Texas). Get a lawyer's sign-off before calling at volume.
4. **Brand risk.** Cold outreach carries the SES name. Lookalike domains must clearly be SES (no impersonation), senders must be real people, and every claim must be true (no fabricated stats, no guarantees).
5. **Capacity.** Video audits and meetings are labor; at the high case SES needs a closer and a VA.
6. **Benchmarks are vendor data.** Nearly every rate here comes from companies selling tools or services; the only independent signals are the federal and provider rules. Nothing is auto-specific. The first 90 days are the real test.
7. **Seasonality.** Thanksgiving and late December cut sending weeks; shop owners are busiest at opening and drop-off times.
8. **Scraping terms.** Scraping Maps breaches Google's terms; using the Places API for a stored lead list breaches the API terms. Low practical risk, but use a vendor and store only what is needed.

---

## 9. Sources and what could not be verified

All accessed 2026-10-25. Page dates as shown; "undated" if none.

**Mailbox providers and sending limits [primary]:** Gmail [sender guidelines](https://support.google.com/mail/answer/81126) (undated) and [FAQ](https://support.google.com/mail/answer/14229414) (undated); Gmail [Postmaster setup](https://support.google.com/mail/answer/9981691) (undated); Yahoo [best practices](https://senders.yahooinc.com/best-practices/) and [FAQ](https://senders.yahooinc.com/faqs/) (undated); Microsoft [Tech Community](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730) (2025-04-02), [postmaster policies](https://substrate.office.com/ip-domain-management-snds/Postmaster/Policies) (undated), [550 5.7.515](https://support.microsoft.com/en-us/office/fix-ndr-error-550-5-7-515-in-outlook-com-34ed3d56-97ad-46a7-8c7d-7fc0cf4e8ab4) (undated), [Exchange Online limits](https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits) (2026-10-19), [TERRL](https://techcommunity.microsoft.com/blog/exchange/introducing-exchange-online-tenant-outbound-email-limits/4372797) (updated 2026-08-13), [ERR cancellation](https://techcommunity.microsoft.com/blog/exchange/exchange-online-canceling-the-mailbox-external-recipient-rate-limit/4483498) (2026-01-06); Google Workspace [sending limits](https://support.google.com/a/answer/166852) (2026-10-22), [spam policy](https://support.google.com/a/answer/178266) (2026-10-22), [pricing](https://workspace.google.com/pricing) (undated), [editions](https://knowledge.workspace.google.com/admin/getting-started/editions/business-editions) (undated), [AUP](https://workspace.google.com/terms/use_policy/).

**Vendor deliverability guidance [vendor]:** Instantly help center articles cited in section 2.3 (relative dates only, "Updated over a week ago"); lemlist (2026-09-28); Smartlead help center (undated); Mailforge and Infraforge pricing (undated).

**Prices [primary pricing pages, undated unless shown]:** inbox providers (InboxKit, Zapmail, Scaledmail, Hypertide, Maildoso, Smartlead, Instantly); domains (cfdomainpricing.com 2026-10-21, Porkbun); sending tools (Instantly, Smartlead, lemlist, Saleshandy, Woodpecker, Reply.io, Apollo); data (Apify actor 2026-10-22, Apify, Outscraper, DataForSEO, Google Maps billing 2026-10-21, Clay, Hunter, Snov, Prospeo, Findymail, LeadMagic, Icypeas); verification (Reoon, Bouncer, NeverBounce, ZeroBounce, Emailable, MillionVerifier); Loom; Kixie dialer comparison (2026-10-07); FTC DNC fees (2026-08-26); USPS (2026-04-09; Postal Bulletin PB22704); Lob, PostGrid, thanks.io (2026-07-12), Handwrytten, Simply Noted (2026-10-19).

**Law [primary unless marked]:** FTC CAN-SPAM guide (Aug 2023, edited Jan 2024); 15 U.S.C. 7704, 7707; FR 2025-01361 (2025-01-17) and 2026-18853 (2026-09-15); Cal. B&P 17529.5; 47 U.S.C. 227; 47 C.F.R. 64.1200 and 64.1601; FCC 24-17 and 22-85; 16 C.F.R. 310.6 and 89 FR 26760; FR 2025-16641 and 2026-21821; Fla. Stat. 501.059, 501.603, 501.604, 501.616; Maryland Ch. 413 (2023); CTIA Messaging Principles (May 2023); LinkedIn User Agreement (Nov 3, 2025); Google Maps Platform Terms (2026-08-26), Service Specific Terms (2026-10-15), Places policies (2026-10-21), Google Terms (2026-07-30). [secondary] law-firm summaries named inline (Kelley Drye, Troutman, Duane Morris, Greenberg Traurig, Arnold & Porter, Hall Estill, Gibson Dunn), Cornell LII Georgia summary, onecle.com for O.C.G.A. 46-5-27, Nat Law Review and Wikipedia for the scraping cases.

**Benchmarks:** as listed in section 5 with dates.

**Could not verify (said plainly):**
- Microsoft 365 Business Basic direct price (page would not load).
- The exact current Google Workspace AUP wording (search summary; the fetched page was Google's Cloud AUP).
- Any published rate for finding an owner's name plus personal email at small auto shops; the share of generic vs webmail addresses; any auto-specific cold email, call, video or mail response rate.
- Independent (non-vendor) data on video prospecting; the ANA direct mail report itself (members-only).
- Georgia no-call list mechanics and whether texts are covered; Oklahoma scope and call caps; Texas registration details and B2B treatment; Washington statute text; exact Maryland section placement.
- Primary opinions for hiQ, Meta v. Bright Data and X v. Bright Data (secondary sources only); Facebook v. Duguid and some C.F.R. subsections were cited without re-fetching.
- Dealership-specific databases and their prices.
- The Atlanta area codes covered by the five free DNC area codes (check before relying).
