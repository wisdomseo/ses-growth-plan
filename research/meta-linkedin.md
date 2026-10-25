# Meta and LinkedIn for winning auto-business clients (SES MGT)

Prepared 2026-10-25. Read-only desk research. Nothing was logged into, changed or created in any ad account, and nothing was sent. Every figure has a source and date or is marked [estimate] with its method. "[vendor]" means the source sells ads, software or services, so treat its numbers as marketing material. The shared web search budget ran out partway through, so some items rest on direct fetches of known pages only (noted where it matters).

## 1. Verdict

1. **Meta is worth a real test. It is the only paid channel that reaches auto owners at scale, but the targeting is loose, so the creative and the form must do the filtering.** Auto software and marketing vendors run owner-targeted Meta ads right now (section 5). KUKUI has run the same five demo-offer image ads since 2024-10-04, more than a year, which suggests they pay back. Tekmetric runs 44 ads, mostly customer-story videos. Meta cannot target "owner of a detailing shop" directly. The best available signals are the "Small business owners" and "Business Page admins" behaviors, layered with auto-trade interests as hard limits, then retargeting of people who watch SES's real client films.
2. **Plan with a raw CPL of $80 (range $40 to $150) and a cost per qualified lead of about $270 (range $100 to $600).** No published auto-owner B2B Meta number exists. These are B2B and SMB vendor benchmarks, adjusted for Instant Form quality (section 4).
3. **Budget at mid case: about $8,000, $16,000 and $32,000 a month for 30, 60 and 120 qualified leads.** The low-cost case is $3,000, $6,000 and $12,000; the high-cost case is $18,000, $36,000 and $72,000. Above about $6,000 to $10,000 a month the top 20 DMAs probably saturate, so 120 a month likely needs US-wide geography [estimate, section 4.4].
4. **Start with a 90-day test at $3,200 a month, then scale only through gates** (section 9). At mid case that buys about 40 leads, 12 qualified, 5 to 8 booked calls and 1 to 2 clients a month.
5. **Build the CRM feedback loop now, but do not expect it to optimize yet.** Since April 2026 Meta's "qualified leads" goal needs a Conversions API CRM link, and Meta's fit guideline is 200 or more leads a month. SES will be far below that during the test.
6. **LinkedIn: dealerships only, $2,500 a month for 2 months, expected CPL $62 to $188 [estimate].** Repair, detailing, tint and wash owners are thin on LinkedIn. **Nextdoor and TikTok: no.** Neither has any business-owner targeting.

## 2. Meta targeting reality in 2026

### 2.1 What still exists

| Option | Status on 2026-10-25 | Source and date |
|---|---|---|
| Detailed targeting (interests, behaviors, demographics) | Exists. By default each selection is only an "audience suggestion". To make it a hard limit, choose "Further limit your audience" and untick "Advantage+ detailed targeting". | Meta, [Use detailed targeting](https://www.facebook.com/business/help/440167386536513), fetched 2026-10-25 (page undated) |
| Forced expansion | "If you optimize for Link clicks, Landing page views, Conversations, Conversion, App Events, App installs or Value, you will see Advantage+ detailed targeting automatically applied with no option to opt out." Instant Form lead optimization is not on that list, so detailed targeting can probably stay a hard limit on Instant Form campaigns [my reading; confirm in Ads Manager]. Website-lead campaigns optimizing for a conversion will expand. | same |
| Business-owner behaviors | "Small business owners" (Behaviours > Digital activities): UK 1.2m to 1.4m. "Business Page admins" (Behaviours > Digital activities > Facebook Page admins): UK 1.1m to 1.3m. "Facebook Page admins": UK 22.4m to 26.4m (too broad). "Business decision makers": UK 1,200 to 1,400 (too small). Job title "Managing Director": UK 33,200 to 39,100. **US sizes were not checked by anyone; read them in Ads Manager before launch.** | Evergreen Growth [vendor: agency], [How to target business owners on Meta Ads](https://evergreen-growth.com/articles/meta-ads-target-business-owners), "checked in Ads Manager on 13 October 2026", UK, Advantage+ audience off |
| Job title, employer, industry | Still in the Marketing API: `work_positions` ("self-declared work", up to 200), `work_employers` (up to 200) and the `industries` demographic class. Titles are self-declared and sparse for owners of 1 to 10 person shops, so expect small, patchy audiences [estimate]. | Meta for Developers, Basic targeting and [Targeting restrictions](https://developers.facebook.com/documentation/ads-commerce/marketing-api/audiences/reference/targeting-restrictions) reference, fetched 2026-10-25 |
| Location | A hard control. Country, state, DMA (`geo_markets`, Comscore markets), city, ZIP (up to 50,000) and radius. People are matched on home or recent location. | Meta, [Audience controls and suggestions](https://www.facebook.com/business/help/938372127764391); Marketing API targeting reference; both fetched 2026-10-25 |
| Minimum age | A hard control, and it can be raised to 25 under Advantage+ audience | Evergreen Growth, checked 2026-10-13; Meta audience controls page |

### 2.2 What was removed, 2022 to 2026

| Date | Change | Source |
|---|---|---|
| 2022-01-19 | Sensitive-topic options removed (health, race, religion, politics, sexual orientation) | Meta for Developers blog, [Updating Meta's detailed targeting options](https://developers.facebook.com/blog/post/2021/12/08/updating-metas-detailed-targeting-options/), 2021-12-08 |
| 2024-01-15 | Under-used, redundant and overly specific options removed; old ad sets ran until 2024-03-18 | [secondary] search summaries citing Jon Loomer and others, accessed 2026-10-25 |
| 2024-07-29, 2025-03-31, 2025-06-10 | Detailed targeting **exclusions** blocked for new campaigns, then removed from all Ads Manager ad sets, then from boosted posts. Custom audience exclusions still work. Meta's stated reason (relayed by blogs): median cost per conversion 22.6% lower without them. | [secondary] Evergreen Growth (checked 2026-10-13); 3my.org and Wicked Reports via search summaries. Meta's own "Updates to detailed targeting" page was not fetched. |
| 2025-06-23 (Ads Manager), 2025-08-21 (Business Suite) | Similar interests merged into broader ones; car models were among the merged groups | [secondary] MediaPost, Brandwatch help center, Jon Loomer, via search summaries, accessed 2026-10-25 |
| 2026-01-15 | Ad sets still using retired options stopped delivering | [secondary] Brandwatch help center; Evergreen Growth |
| 2026-08 | Meta tested removing placement exclusions on some Sales and Leads ad sets | Evergreen Growth, checked 2026-10-13 |

### 2.3 Advantage+ audience: what Meta must honor

- **Hard controls:** Locations, Minimum age, Custom audiences to exclude, Languages.
- **Suggestions only:** Age range, Gender, Detailed targeting, Custom audiences to include. Meta's own example: suggest "Women" and ads "could also deliver to men".
- To turn suggestions into limits, use "Further limit your audience". Evergreen's UK check: "Business decision makers" showed 50.8m to 59.8m with Advantage+ on, and 1,200 to 1,400 with it off.
- Meta claims Advantage+ audience gives 9.7% lower cost per result for the Traffic, Engagement and Leads objectives. Meta does not recommend it for retargeting. Meta's own claim for Advantage+ leads campaigns: 10% lower cost per qualified lead in early tests (Social Media Today, [Andrew Hutchinson](https://www.socialmediatoday.com/news/meta-advantage-plus-ad-updates-february-2025/739472/), 2025-02-06).
- Sources: Meta, [About Advantage+ audience](https://www.facebook.com/business/help/273363992030035) and [Audience controls and suggestions](https://www.facebook.com/business/help/938372127764391), fetched 2026-10-25 (undated).

### 2.4 Custom audiences and lookalikes

| Audience | What Meta allows | SES use |
|---|---|---|
| Website visitors | Pixel based, up to 5 rules, retention in days; **does not backfill** (fills from the day it is created) | Pixel [id removed] is live sitewide; create the audiences now |
| Video viewers | For example "viewed at least 10 seconds"; up to 200 videos; sources: Page, Instagram account, campaign or video ID. If an ad reuses an existing post, only that post's own views count. | Upload client films as new ad videos, not reused posts, so every ad view counts |
| Lead form engagers | "Opened" or "submitted" an Instant Form | Retarget openers who did not submit |
| Instagram and Page engagers | Yes | Warm pool from organic posts |
| Customer list | Email, phone, name. New ad accounts "may take a few weeks" before lists can be created. Lists not updated for 30 days show "Outdated". Exclusion-only lists exist. | Exclusion list of current clients and open leads |
| Lookalike | Source of "at least 100 people"; Meta recommends 1,000 to 5,000 | SES's client list is too small to seed one. Use website or video-viewer audiences once they pass 100 people. |
| Cap | 500 custom audiences per ad account | n/a |

Sources: Meta help, [About custom audiences](https://www.facebook.com/business/help/744354708981227), [Create a lookalike audience](https://www.facebook.com/business/help/465262276878947), [Customer list audience](https://www.facebook.com/business/help/170456843145568), [Website audience](https://www.facebook.com/business/help/1474662202748341), [Video audience](https://www.facebook.com/business/help/1099865760056389), [Lead form audience](https://www.facebook.com/business/help/900802126698360), all fetched 2026-10-25.

**Uploading lists: what the terms say.** Meta's [Customer List Custom Audiences Terms](https://www.facebook.com/legal/terms/customaudience) (effective 2025-12-03) make the advertiser warrant "all necessary rights and permissions and a lawful basis to disclose and use the Audience and Customer List Data". The terms do not mention scraped or purchased lists by name. My reading: a list scraped from Google Maps, or bought without a licence that covers ad matching, carries no such rights, so do not upload it. A licensed B2B data list is acceptable only if its contract covers ad-platform matching. Audiences may not be sold or transferred.

### 2.5 What can't be done

- No reliable way to target "owners of detailing shops" or "dealership GMs". Interests such as car detailing or auto repair mostly reach car owners and enthusiasts, not business owners [estimate; Meta publishes no audience composition].
- No detailed-targeting exclusions (removed 2025-03-31), so "exclude consumers" is impossible. Exclusions work only through custom audiences.
- No lookalike from SES's client list (below the 100 minimum).
- With Advantage+ audience on, interest and age choices are only hints.
- No US audience sizes for the owner behaviors in this research (needs Ads Manager).

## 3. Lead capture and Conversions API

### 3.1 Instant Form vs landing page

| Item | Finding | Source and date |
|---|---|---|
| Form types | "More volume" (default, fastest), "Higher intent" (adds a review screen where people confirm their details), "Rich creative" (long intro: benefits, how it works, social proof cards) | Jon Loomer [vendor: training], [Instant Forms guide](https://www.jonloomer.com/instant-forms/), 2024-08-19, updated 2025-03-06. Meta's own form-type page was not fetched (search budget exhausted). |
| Question types | Multiple choice, short answer, conditional (built from a CSV), appointment request, slider | same |
| Conditional logic | Each answer can go to another question, submit, or close the form without submitting. Questions cannot be optional while logic is on. With logic on, leads and non-leads get separate end screens. | same |
| Prefill | Name, email and phone are prefilled from the profile. This is why Instant Form leads are cheap and often low intent. | same |
| Privacy | A privacy policy link is required | same |
| Lead quality gap | Instant Form leads have a 35% to 55% lower SQL rate than Meta landing-page leads. Median CPL: Instant Form $80 to $220; landing page $120 to $380; direct calendar booking $180 to $420; warm retargeting $45 to $140. | GrowthSpree [vendor: B2B SaaS agency; no data basis disclosed], [Meta Ads benchmarks 2026](https://www.growthspreeofficial.com/blogs/meta-ads-benchmarks-2026-b2b-saas-b2b-cpm-cpc-cpl-vertical), 2026-05-22 |
| Meta's own claim | CRM-connected "Maximize number of qualified leads": 21% lower cost per quality lead on Instant Forms, 9.5% lower on website forms, vs "Maximize number of leads" | Meta, [About performance goals for lead ads](https://www.facebook.com/business/help/782657799338685), fetched 2026-10-25 |

**SES's own Meta history (GA4, Aug 1 to Oct 24, 2026).**
- About 700 Paid Social sessions: Instagram 535, Facebook 165. Almost all of them (697) landed on the **homepage "/"**, not on /social-marketing.
- Only about 15% of sessions were engaged (104 of 700).
- 20 form starts, 7 `generate_lead`, 2 `booking_scheduled`, 2 phone clicks. That is about 1.0% of sessions becoming a lead.
- Spend is not in GA4, so the CPL is unknown. Read it in Ads Manager. If visits cost $1 to $2 each, the CPL was about $100 to $200 [estimate].
- Source: GA4 for sesmgt.com via the SEO Monitoring connector, queried 2026-10-25.

**Recommendation.** Prospect with Instant Forms (Higher intent plus qualifying questions with conditional close), because Meta's CRM optimization only works there. Send warm audiences to /social-marketing, the page built for Meta: it carries the films, reviews and pricing, and its audit form already asks business type, Meta spend and goal. Judge every cell on cost per qualified lead and cost per booked call, never on raw CPL.

### 3.2 What Meta needs to optimize on qualified leads

| Requirement | Value | Source |
|---|---|---|
| CRM link is now mandatory for the goal | "Beginning April 2026, the qualified leads performance goal is no longer available for new campaign creation without Conversions API integration. Existing campaigns will be impacted beginning August 2026." | Meta, [About performance goals for lead ads](https://www.facebook.com/business/help/782657799338685), fetched 2026-10-25 |
| Fit guideline | Instant Forms; store the 15 to 17 digit Meta lead ID; **at least 200 leads a month**; upload at least once a day; the target stage happens **within 28 days** of the lead; that stage converts **between 1% and 40%** of leads | Meta for Developers, [Conversions API for CRM integration](https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration), fetched 2026-10-25 |
| Payload | `event_name`: free-form stage name; "send *all stages* as they are updated, including the initial lead stage". `event_time`: Unix seconds of the stage change, at most 7 days old and after the lead was created. `action_source`: `system_generated`. `custom_data.event_source`: `crm`. `custom_data.lead_event_source`: the CRM's name. `user_data.lead_id` (preferred; hashed email or phone otherwise). An invalid `lead_id` is rejected. | Meta for Developers, [Payload specification](https://developers.facebook.com/documentation/ads-commerce/conversions-api/conversion-leads-integration/payload-specification), fetched 2026-10-25 |
| Time to value | Zapier or partner link under 1 day; own build 3 to 4 weeks; Meta data check 1 to 2 days; training 2 to 4 weeks; about 3 to 4 weeks in total | Meta, Conversions API for CRM integration |
| Learning phase | About 50 results in the week after the last significant edit | Meta, [About the learning phase](https://www.facebook.com/business/help/112167992830700), fetched 2026-10-25 |
| Value optimization | At least 5 unique values per event, 100+ conversions in the past 14 days, budget for 50+ a week | Meta, About performance goals for lead ads |
| Website events | `event_name` plus `event_id` deduplicate pixel and server events; `event_time` up to 7 days old | Meta for Developers, Conversions API server event parameters, fetched 2026-10-25 |

**Docs conflict.** Meta's help page says the qualified-leads goal works with website forms too. The developer guide says conversion-leads optimization is "only compatible with" Instant Forms. Build for Instant Forms and treat website-form use as unconfirmed.

**What this means for SES.**
- Send one CRM event per portal status change, for example `Lead` → `Genuine` → `Meeting booked` → `Won`, plus `Spam` when marked. Use `lead_event_source: "SES Portal"` and upload at least daily.
- `Genuine` and `Meeting booked` fit Meta's window: they happen within 28 days and should convert 10% to 40% of leads [estimate].
- `Won` is too slow and too rare to optimize on.
- At 30 to 120 qualified leads a month SES stays far below the 200-lead guideline. The loop is still worth building: it gives clean CPQL reporting now and the history Meta needs later.
- Each ad set also stays "learning limited" at test budgets. At $80 CPL and $50 a day, an ad set gets about 4 leads a week, not 50. So keep ad sets few, avoid edits, and judge on 2-week windows.

## 4. Numbers

### 4.1 Benchmarks (none is auto-owner specific)

| Benchmark | CPM | CPC | CTR | CPL | Scope | Source and date |
|---|---:|---:|---:|---:|---|---|
| Facebook, B2B advertisers | $15.50 | $1.95 | 0.79% | **$145** (click to lead 2.6%); prospecting $166, retargeting $120 | 71 advertisers, calendar 2025, spend-weighted | Metadata.io [vendor: B2B ad platform], [B2B advertising benchmarks](https://metadata.io/b2b-advertising-benchmarks), page undated, 2025 data |
| Instagram, B2B advertisers | $18.25 | $2.82 | 0.65% | **$138** (click to lead 4.0%) | 49 advertisers, 2025 | same |
| Meta B2B, by format | $8 to $24 (medians by vertical) | $1.50 to $4.20 | Instant Form 1.4% to 2.2%; Reels 2.1% to 3.4% | Instant Form **$80 to $220**; landing page $120 to $380 | No data basis disclosed; SaaS verticals | GrowthSpree [vendor], 2026-05-22 |
| Meta, Business Services | n/a | $1.52 | 2.70% | **$16.95** (CVR 8.34%) | LocaliQ campaign data, mixed SMB and consumer | 27Five [vendor: agency], [B2B Meta ads benchmarks](https://27five.com/blog/b2b-meta-ads-benchmarks-cpl-cpc-roas/), 2026-03-23, citing LocaliQ |
| Cost per qualified lead multiple | n/a | n/a | n/a | CPQL often **3 to 6 times** CPL | Practitioner claim | 27Five, 2026-03-23 |
| Meta Leads, all industries | n/a | $1.80 | 2.70% | $27.39; automotive for-sale $35.52 | Consumer-heavy | LocaliQ [vendor], updated 2026-09-23 (via market/benchmarks.md section 4) |
| Meta by industry, North America | n/a | n/a | n/a | Automotive $39.10; B2B SaaS $63.40; lead form ads $34.10 | 138 client campaigns, Mar to Jun 2026 | Focus Digital [vendor], 2026-08-21 (via benchmarks.md) |
| Meta B2B, Netherlands | n/a | n/a | n/a | EUR 15 to 35 per lead; EUR 60 to 120 per MQL; lead to opportunity 5% to 10% | No primary source | Searchlab [vendor], 2026-03-17 (via benchmarks.md) |
| Meta vs LinkedIn, Europe | Meta EUR 9.18 vs LinkedIn EUR 34.33 | Meta EUR 1.60 vs LinkedIn EUR 5.98 | n/a | n/a | Aug 2024 to Jul 2025 | Dreamdata [vendor], 2026 report via PPC Land, 2026-03-10 |
| Consumer auto leads (for contrast) | n/a | n/a | n/a | Detailers $6 to $25 a lead | Agency self-reports for consumer bookings, **not B2B** | Search summaries of SV Growth and Clicks Geek pages, accessed 2026-10-25 |

**Lead to meeting and lead to client.** I found no measured Meta B2B lead-to-meeting benchmark; the search budget ran out before more could be tried. The planning ratios below come from SES's own planning notes (of qualified leads, about 2 in 3 hold a call and about 1 in 6 signs), cut for Meta's weaker intent.

**Case studies.** No public case study was found of an agency or software company selling to auto shops, detailers or dealers through Meta with reported CPL or cost per demo. Searches for shop software, detailing software, dealer software and agency self-acquisition found only consumer-side shop results.

### 4.2 Planning band [estimate]

| Case | Raw CPL | Share qualified (portal "genuine" + fit) | CPQL | Qualified to booked call | Qualified to client | Cost per client |
|---|---:|---:|---:|---:|---:|---:|
| Low cost | $40 | 40% | **$100** | 65% | 17% | about $600 |
| Mid | $80 | 30% | **$267** | 55% | 13% | about $2,000 |
| High cost | $150 | 25% | **$600** | 45% | 10% | about $6,000 |

Method:
- CPL: $40 is the auto and home-services rows. $80 is the bottom of the Instant Form B2B median. $150 is Metadata's Facebook B2B average.
- Qualified share: SES Search plans assume 50% qualify; Instant Forms lose 35% to 55% of that (GrowthSpree), and Higher intent plus screening questions win some back.
- The resulting CPQL is 2.5 to 4 times CPL, inside 27Five's 3 to 6 range at the mid and high cases.
- This matches the growth site's Meta inputs (CPL $150 / $80 / $40, quality multiplier 0.55).

### 4.3 Budget for 30, 60 and 120 qualified leads a month [estimate]

| Qualified leads a month | Low cost ($100 CPQL) | Mid ($267) | High cost ($600) | Raw leads needed (mid) | Clients a month (mid, 13%) |
|---:|---:|---:|---:|---:|---:|
| 30 | $3,000 | **$8,000** | $18,000 | 100 | about 4 |
| 60 | $6,000 | **$16,000** | $36,000 | 200 | about 8 |
| 120 | $12,000 | **$32,000** | $72,000 | 400 | about 16 |

Media only. Agency fees, creative production and sales time are not included.

### 4.4 Audience ceiling [estimate]

- **Universe.** The top 20 DMAs hold about 80,000 employer establishments in SES's auto segments: dealers 16,650, repair and collision 52,438, car wash and detailing 8,362 (one shared Census code), tint 2,679. They also hold about 200,000 solo operators: 110,670 repair, 55,374 used-car, 32,078 mobile detailing.
  - Source: market/auto/auto_business_counts.csv, built from Census County Business Patterns 2023 and Nonemployer Statistics 2024.
- **Reachable owners.** At 1 to 2 decision makers per employer establishment and 60% to 80% findable on Meta, that is about 50,000 to 130,000 people.
- **Saturation.** At a $15 CPM and 4 impressions a person a month, reaching all of them costs about $3,000 to $8,000 a month.
- **Conclusion.** Spend beyond about $6,000 to $10,000 a month in the top 20 DMAs mostly buys frequency or leaks to non-owners. The 120-a-month row therefore needs US-wide geography, and its CPQL will drift toward the high-cost column.

## 5. Competitor ads in the Meta Ad Library

Scanned 2026-10-25: [Meta Ad Library](https://www.facebook.com/ads/library/), US, active ads only, public view with no login. Searches covered four advertiser pages plus 10 exact-phrase keywords, with up to about 90 ads parsed per search. The Library shows no spend or reach for US commercial ads, so a long run time is the only proxy for profitability. A "start" date is the date the oldest active ad started.

| Advertiser (sells to) | Active ads | Oldest active start | Offer and CTA | Format | Read |
|---|---:|---|---|---|---|
| **KUKUI** (repair shop marketing platform) | 7 | **2024-10-04** | "Book your demo today", "Get More Google Reviews", "5 Stars from Shop Owners!" to kukui.com/demo | 5 static images, 1 video (2026-09-08), 1 dynamic | Same images running over 12 months: likely profitable |
| **Tekmetric** (shop software) | 44 | 2025-12-10 | Demo and sign-up; customer-story videos (Rush Automotive, Volz Automotive, EuroWise, Car Doctors, ABR); "Shop Index" benchmark that shows a shop "where your shop stands against thousands of auto repair shops"; Tekmetric Marketing; conference promo | 24 video, 20 dynamic; most link to a dedicated social landing page (/lp/social-lp) | Heavy, testimonial-led spend: the closest model for SES's films |
| **Shopmonkey** (shop software) | 19 | 2026-10-06 | "Get a demo" pages by topic (multi-location, labor guides, payments, estimates); claims "Trusted by 8000+ Owners", "4.8 stars. 1400+ reviews" | 16 dynamic, 3 video | Fresh rotation, pain-point copy ("underquoting", "weekends") |
| **Urable** (detailing and tint software) | 15 | 2026-07-01 | Feature ads: 3D Visualizer, UrPartners supplier marketplace, marine detailing, mass texting | 12 dynamic, 3 video | Talks to detailers and tint/PPF shops by trade |
| **Steer** (shop CRM) | 4 | 2026-06-22 | "Take The Free Car Count Audit": a 60-second audit | Dynamic | Free-audit offer, close to SES's audit form |
| **LIFT Auto Repair Marketing** (agency) | 3 | 2026-10-20 | Shop-owner testimonial videos ("huge uptick in Google reviews, phone calls"); contact or call | Video | Same shape as SES's client films |
| Autoshop Solutions (agency) | 2 | 2026-10-21 | "Auto Repair Marketing Only", "Get More Cars in Your Bays", to a Facebook-only landing page | Dynamic | New test |
| Element DMA, Shop Marketing Pros, Shop Growth Solutions, RepairPal for Shops, 36Pixels (repair and body) | 1 to 3 each | 2026-06 to 2026-10 | Guide download; discovery call; free consult; **"80 New Cars In Your Bays Every 30 Days [Or You Don't Pay]"** (36Pixels) | Image, carousel | Guarantee offers are common; SES may not copy them |
| Detailing growth sellers: 7 Figure Detailer, Rocket Detailer, Detailing Accelerator, MboSolution, Hudson Archer, Sovereign Scale, Revenue Acquisition, AdMotive | 1 to 7 each | 2026-05-24 to 2026-10-16 | AI booking bot with a 7-day free trial; free 2-hour training; "I will scale your business to $50K per month in 6 months, or I'll work with you one-on-one for free" (7 Figure Detailer); "Book 5 Details In 5 Days" | Mostly founder-to-camera video | A crowded, hype-heavy niche aimed at detailers; SES's honest, premium tone stands apart |
| Dealer sellers: Solutions Direct Marketing (11 ads, brand-specific "ATTENTION KIA DEALERS... Give us 15 minutes"), MCT Marketing ("guarantee page"), Auto-Up, Fullpath, PCG Digital (lifecycle whitepaper), Senreign (dealer groups) | 1 to 11 | 2026-06-22 to 2026-10-24 | 15-minute call, guide download, guarantee | Image, video | Dealers are reachable on Meta; offers lean on sold-unit claims SES cannot make |
| Car wash sellers: SplashSource ("free 30 minute marketing consultation"), AutoLaunch ("146 paid memberships in 30 days" case post), Uplead Digital | 1 each | 2026-08-31 to 2026-10-20 | Consult, case story | Image, dynamic | Thin; membership growth is the hook |
| Mobile Tech RX | 3 | 2026-10-21 | ADAS product page | Dynamic | Product, not lead gen |

Not found as advertisers: Shopgenie and Podium (only shops mentioning them, or unrelated pages), Broadly (the keyword is too generic to isolate). A more thorough sweep by advertiser page could change this.

## 6. LinkedIn (dealerships only)

| Item | Finding | Source and date |
|---|---|---|
| Industry targeting | 1292 "Retail Motor Vehicles" (dealers, also parts and service); 2226 "Vehicle Repair and Maintenance"; no car wash or detailing code; 3198 "Automotive" deprecated | LinkedIn, [Industry codes V2](https://learn.microsoft.com/en-us/linkedin/shared/references/reference-tables/industry-codes-v2), updated 2026-05-15 |
| Other facets | Job title, function, seniority, skills, years of experience; company name, size, revenue, growth; Matched Audiences (Insight Tag visitors, video viewers, Lead Gen Form engagers, contact and company lists); minimum audience 300 members; up to 200 selections | LinkedIn, [Targeting options](https://www.linkedin.com/help/lms/answer/a424655), "last updated 3 months ago", accessed 2026-10-25 |
| Lookalikes | Discontinued 2024-02-29. Replaced by Predictive audiences (seed of 300+ members) and Audience Expansion. | LinkedIn help [a94287](https://www.linkedin.com/help/lms/answer/94287), accessed 2026-10-25 |
| Minimums | $10 a day and $100 lifetime for new campaigns; LinkedIn suggests $25 a day. Minimum bids vary by audience (API sample: $4.00). | LinkedIn, [Maximize your budget](https://business.linkedin.com/marketing-solutions/best-practices/ad-tips/maximize-your-budget), undated; [Ad budget pricing API](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ad-budget-pricing), updated 2026-03-18 |
| Costs | Sponsored Content medians: CTR 0.39%, CPC $16.47, CPM $61.41; North America CPC $17.80, CPM $78.41; Thought Leader Ads CPC $6.95, CTR 1.35% | Fibbler [vendor: ad attribution], [LinkedIn Ads benchmarks](https://www.fibbler.co/blog/linkedin-ads-benchmarks), Aug 2026, 1,000+ advertisers |
| Costs per lead | LinkedIn B2B: CPC $9.39, CPM $63.19, CPL $202; Lead Gen Form $193 vs landing page $346; document ads $142 | Metadata.io [vendor], 2025 data, 138 advertisers |
| Lead Gen Form rate | LinkedIn's own legacy figure: 13% form conversion vs 4.02% landing page | LinkedIn blog, dated 2025-08-19 (originally 2017) |
| Reach of small shops | LinkedIn is used by 31% of US adults: 13% of those with high school or less, 51% of college graduates. Facebook: 70%. | Pew Research, [Social media fact sheet](https://www.pewresearch.org/internet/fact-sheet/social-media/), 2026-10-19 |
| Dealership universe | 16,991 franchised dealerships | NADA Data 2026 mid-year, [nada.org/NADAData](https://www.nada.org/NADAData/), page undated |
| CRM loop | Conversions API with HubSpot, Salesforce, Zapier, Make, GTM and others; MAX_QUALIFIED_LEAD optimization (Feb 2026); MQL and SQL conversion types (Aug 2026) | LinkedIn help [a1655394](https://www.linkedin.com/help/lms/answer/a1655394); [API recent changes](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/recent-changes), version 2026-10 |

**LinkedIn plan [estimate].**
- **Expected CPL.** CPC $8 to $15 at 8% to 13% form conversion gives a CPL of about $62 to $188.
- **Reachable audience.** About 27,000 to 83,000 dealership decision makers: 16,991 rooftops, 4 to 7 roles each, 40% to 70% with a matchable profile.
- **Test.** $2,500 a month for 2 months, US-wide, about 13 to 40 leads a month.
  - Targeting: industry 1292 plus Manager-and-above seniority plus dealer titles (GM, dealer principal, marketing manager, internet or BDC manager), with Audience Expansion off.
  - Ads: Lead Gen Form, plus Thought Leader Ads from Kaisin's profile using SES video.
- **Kill rule.** Stop if CPL is above $250 or fewer than 10% of leads book a call.
- **Before spending.** Check the real audience size in Campaign Manager's forecast.
- **Caveat.** SES has no dealership client to name yet, so this test sells capability (video, inventory and staff content), not results.

**Nextdoor and TikTok: no.** Neither offers business-owner, job or industry targeting (Nextdoor Ads Manager pages; TikTok [ad targeting help](https://ads.tiktok.com/help/article/ad-targeting?lang=en), last updated Oct 2026). TikTok minimums are $50 a day per campaign and $20 a day per ad group. No evidence was found that either reaches small-business owners efficiently.

## 7. Creative and offers

**Rules that apply** (owner constraints in the project CLAUDE.md):
- No money-back guarantee.
- No absolute lead or timeframe promises.
- No fabricated stats or badges.
- No AI spokesperson on the homepage hero. AI is fine for throwaway paid variants.

Most rival offers in section 5 break these rules (36Pixels' "or you don't pay" bay guarantee, 7 Figure Detailer's $50K-a-month-or-free promise, dealer sold-unit claims). That leaves SES the honest, premium lane to itself.

**What to run.**
- **Lead asset: real client films.** Make 15 to 45-second cuts in 9:16 and 4:5 from the Ultra Hi-Tintz, Gravity Detailing, USA Reflections Auto Spa and Xclusive Appearance shoots. Show the owner on camera in their own words, with no added numbers. This is the format Tekmetric and LIFT run at scale.
- **Proof line.** Use the live Google rating and named verbatim reviews. The landing-page hero stats ("$50M+ managed", "7-10x ROAS") are an operator decision for the page. Keep them out of ads unless SES can document them, because Meta reviews ad claims.
- **Offer.** "Free content + ads audit". It is already the /social-marketing form and mirrors Steer's free Car Count Audit and Tekmetric's Shop Index. Deliver it as a short recorded review of the shop's Instagram, Google profile and ads. Allowed risk-reversal lines: "No contracts", "Fixed pricing", "Results or we work free" (exact wording for Kaisin to confirm).
- **Disposable AI variants.** Static hook cards and headline tests are fine. Keep a real person and real work in every video.

| Vertical | SES proof | Hook to test | Priority |
|---|---|---|---|
| Window tint, PPF, ceramic | Strong (Ultra Hi-Tintz) | "Your work looks better than your feed. We film it at your shop and run it to people already shopping for ceramic." | 1 |
| Detailing (shop and mobile) | Strong (Gravity, USA Reflections, Xclusive) | "Booked solid in summer, quiet in January? Content and ads from one team, shot at your bay." | 1 |
| Repair and collision | Moderate | "Get found on Maps and look like the shop people trust: real video of your techs, not stock." Car count is the language this market uses. | 2 |
| Car wash | None yet | Membership growth; test only after a car-wash client exists | 3 |
| Dealerships | None to name | Video capability: inventory walkarounds, staff intros, service-lane content. Better on LinkedIn. | LinkedIn |

## 8. Setup checklist

**A. Account**
- [ ] Business portfolio and ad account owned by SES (not a vendor). Record the ad account ID in the project notes. 2FA for every admin. Payment method set.
- [ ] Facebook Page and Instagram professional account connected. Domain sesmgt.com verified.
- [ ] Account Quality shows no restrictions. Customer-list access may lag "a few weeks" on new accounts, so request it early.

**B. Pixel and Conversions API (website)**
- [ ] In Events Manager, Test Events: confirm that PageView, Lead (with eventID), Schedule and Contact fire on /social-marketing and on the site forms (dataset [id removed]).
- [ ] Add server-side Lead and Schedule from the Supabase edge function with the **same event_id** as the browser event. Include hashed email and phone, fbp/fbc, IP, user agent, event_source_url and `action_source: website`. Check deduplication and Event Match Quality.
- [ ] Custom conversion "Lead | Social LP" (Lead event, URL contains /social-marketing).
- [ ] Ship the site's lead-capture update (click ID and UTM capture) so every Meta lead arrives in the portal with its source.

**C. Instant Form CRM loop**
- [ ] Bring Instant Form leads into the portal through Meta's lead webhook, or through Zapier or Make (Meta lists partner paths at under a day). Store the Meta `lead_id`.
- [ ] Connect a CRM data source to the same dataset in Events Manager.
- [ ] On every portal status change, send an event with `event_name` (stage), `event_time`, `action_source: system_generated`, `user_data.lead_id`, `custom_data.event_source: crm`, `custom_data.lead_event_source: SES Portal`. Upload at least daily.

**D. Audiences (create on day 1, because website audiences do not backfill)**
- [ ] Website: all visitors 180 days; /social-marketing visitors 90 days; form starters without a Lead 30 days.
- [ ] Video: 50%+ viewers of the client films, 365 days. Upload films as ad videos, not reused posts.
- [ ] Instagram and Page engagers, 365 days. Lead form openers who did not submit, 90 days.
- [ ] Exclusion-only customer list: current and past clients plus open leads (SES's own customers).
- [ ] Prospecting hard-limit audience ("original audience options"): top 20 DMAs; age 25 to 65; detailed targeting as a limit: (Small business owners OR Business Page admins) AND (auto-trade interests such as auto detailing, car wash, window film, paint protection film, ceramic coating, auto repair shop, automotive industry; check each name exists in the search box). Record the US size estimates.

**E. Campaigns and naming**
- `SES | Meta | Leads | Prospect | IF | 2026-11`: objective Leads, Instant Form, goal "Maximize number of leads".
  - Ad set `AS | A-HardOwners+Auto | Top20 | 25-65`
  - Ad set `AS | B-AdvPlus-Suggest | Top20` (same inputs as suggestions)
- `SES | Meta | Leads | Retarget | LP | 2026-11`: objective Leads, website, Lead event. Ad set `AS | C-Warm-180d`.
- `SES | Meta | Video | ThruPlay | Films | 2026-11`: fills the video-viewer pool cheaply. Ad set `AS | D-Films-HardOwners | Top20`.
- Ads: `AD | <vertical> | <asset> | <hook> | <ratio>`, for example `AD | Tint | Film-UltraHiTintz | H1 | 9x16`.
- URL parameters: `utm_source=facebook&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}`. GA4 currently shows the bare campaign ID, which is unreadable.
- Placements: Facebook and Instagram Feeds, Stories and Reels. Check whether Audience Network can still be excluded (Meta tested removing placement exclusions in Aug 2026).

**F. Instant Form spec (Higher intent)**
1. Business type (multiple choice): Detailing / Tint, PPF, ceramic / Repair or collision / Dealership / Car wash / Not an auto business. The last option closes the form.
2. Your role: Owner / Manager / Employee. Employee closes the form.
3. Monthly marketing spend today: None / under $1,000 / $1,000 to $3,000 / $3,000+.
4. Business name and Instagram handle or website (short answer, which adds friction on purpose).
5. Prefilled name, email, phone; privacy link to the SES privacy page.
6. End screen: "Book your audit call" (Calendly) and "Watch a client film".

**G. Weekly report** (from the portal, not GA4): spend, leads, genuine, booked, held, proposals, won, CPL, CPQL, cost per booked call, cost per client.

## 9. 90-day test plan

| Weeks | Spend a week | Cells and daily budget | Goal and gate |
|---|---:|---|---|
| 1 to 2 | $0 | Setup (section 8), film cuts, form build, audiences start filling | All checklist items green |
| 3 to 6 | **$735** (about $3,200 a month) | A hard owners, Instant Form $45; B Advantage+ suggestions, Instant Form $35; C warm retargeting to /social-marketing $15; D ThruPlay films $10 | By week 6 (about $2,940): about 37 leads and 11 qualified at mid case. Each prospecting cell needs 20 leads before a verdict. |
| 7 to 10 | **$1,500** if gate 1 passes; else hold at $735 or stop | Move budget to the better of A and B; keep C and D; add 2 new hooks a fortnight | **Gate 1 (week 6):** CPQL $400 or less and at least 2 booked calls |
| 11 to 13 | **$2,500** if gate 2 passes | Winner cell plus retargeting. Add DMAs 21 to 30 or go US-wide. Try the qualified-leads goal in one cell once the CRM loop has run 4 weeks. | **Gate 2 (week 10):** CPQL $300 or less, cost per booked call $600 or less, at least 3 proposals or 1 client |

Total: about $3,000 if the test stops at week 6, up to about $16,400 if both gates pass. The parallel LinkedIn dealer test ($2,500 a month for 2 months) is separate and optional.

| Channel | Kill if, after the test | Keep | Scale if | Test length |
|---|---|---|---|---|
| Meta, per cell | CPL above $200 after 20 leads, or under 15% qualified, or CPQL above $600 | CPQL $300 to $600 and improving | CPQL under $300 and cost per booked call under $600: raise budget 20% to 30% every 3 to 4 days | 4 weeks per cell |
| Meta, whole channel | No booked call after $5,000, or blended CPQL above $600 at week 8 | n/a | Gate 2 passed and cost per client under $3,000 | 8 weeks, 13 with scaling |
| LinkedIn (dealers) | CPL above $250 or under 10% of leads book a call | CPL $150 to $250 | CPL under $150 and 2+ dealer meetings | 8 weeks |

## 10. Risks

- **Wrong people.** Interests and behaviors reach car owners and hobby Page admins. Expect consumers asking for a detail or a tint. Mitigations: hard limits, "for shop owners" in the first line, the role question with conditional close, and the portal's genuine and spam marking.
- **Thin signal.** Learning-limited ad sets and fewer than 200 leads a month mean Meta cannot optimize for quality during the test. Results will be noisy, so judge on 2-week windows.
- **Small universe.** About 50,000 to 130,000 reachable owners in the top 20 DMAs [estimate] means fatigue: frequency climbs and CPL rises with spend. Refresh hooks every 2 weeks.
- **Policy.** Meta reviews claims and personal-attribute language (for example, implying a reader's business is failing). Keep copy factual. Do not upload scraped or bought lists (section 2.4).
- **Proof gaps.** No dealership or car-wash client to name. Lead with tint, PPF and detailing.
- **Measurement.** GA4 shows only 7 Meta leads in 3 months, and the past Meta spend is unknown. Use the portal's statuses as the source of truth, not platform-reported leads.
- **Rules that change.** Meta changed lead-goal rules in April and August 2026 and tested placement changes. Re-check Ads Manager at launch.

## 11. Could not verify

- US audience sizes for Small business owners, Business Page admins and auto-trade interests (needs Ads Manager).
- Meta's own "Updates to detailed targeting" page and the Instant Form type page (search budget exhausted; secondary sources used).
- SES's past Meta spend, and so its real CPL.
- Any measured Meta B2B lead-to-meeting rate, and any auto-specific B2B Meta CPL or case study.
- Ad Library spend and reach (not shown for US commercial ads). Whether Shopgenie, Podium or Broadly advertise to shops under page names the keyword scan missed.
- LinkedIn real audience counts, a LinkedIn bid floor, and automotive LinkedIn benchmarks from primary data.

## 12. Sources

**Meta (official), all fetched 2026-10-25 unless dated**
- Meta Business Help: [About detailed targeting](https://www.facebook.com/business/help/182371508761821); [Use detailed targeting](https://www.facebook.com/business/help/440167386536513); [About Advantage+ detailed targeting](https://www.facebook.com/business/help/128066880933676); [About Advantage+ audience](https://www.facebook.com/business/help/273363992030035); [Audience controls and suggestions](https://www.facebook.com/business/help/938372127764391)
- Audiences: [About custom audiences](https://www.facebook.com/business/help/744354708981227); [Customer list audience](https://www.facebook.com/business/help/170456843145568); [Website audience](https://www.facebook.com/business/help/1474662202748341); [Video audience](https://www.facebook.com/business/help/1099865760056389); [Lead form audience](https://www.facebook.com/business/help/900802126698360); [Create a lookalike audience](https://www.facebook.com/business/help/465262276878947)
- Delivery and leads: [About the learning phase](https://www.facebook.com/business/help/112167992830700); [About performance goals for lead ads](https://www.facebook.com/business/help/782657799338685); [Set up your CRM for qualified leads](https://www.facebook.com/business/help/279369167153556)
- [Customer List Custom Audiences Terms](https://www.facebook.com/legal/terms/customaudience), effective 2025-12-03
- Meta for Developers: [Conversions API for CRM integration](https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration); [Payload specification](https://developers.facebook.com/documentation/ads-commerce/conversions-api/conversion-leads-integration/payload-specification); Conversions API server event parameters; Marketing API basic targeting and [targeting restrictions](https://developers.facebook.com/documentation/ads-commerce/marketing-api/audiences/reference/targeting-restrictions)
- Meta for Developers blog, [Updating Meta's detailed targeting options](https://developers.facebook.com/blog/post/2021/12/08/updating-metas-detailed-targeting-options/), 2021-12-08
- [Meta Ad Library](https://www.facebook.com/ads/library/), US active ads, scanned 2026-10-25

**Secondary and vendor**
- Evergreen Growth [vendor], [How to target business owners on Meta Ads](https://evergreen-growth.com/articles/meta-ads-target-business-owners), checked in Ads Manager 2026-10-13
- Social Media Today, [Meta Advantage+ updates](https://www.socialmediatoday.com/news/meta-advantage-plus-ad-updates-february-2025/739472/), 2025-02-06
- Jon Loomer [vendor], [Instant Forms](https://www.jonloomer.com/instant-forms/), 2024-08-19, updated 2025-03-06
- MediaPost, Brandwatch help center, 3my.org, Wicked Reports, Jon Loomer on detailed targeting changes: seen through search summaries, accessed 2026-10-24 to 2026-10-25
- Metadata.io [vendor], [B2B advertising benchmarks](https://metadata.io/b2b-advertising-benchmarks), 2025 data, page undated
- GrowthSpree [vendor], [Meta Ads benchmarks 2026 B2B](https://www.growthspreeofficial.com/blogs/meta-ads-benchmarks-2026-b2b-saas-b2b-cpm-cpc-cpl-vertical), 2026-05-22
- 27Five [vendor], [B2B Meta ads benchmarks](https://27five.com/blog/b2b-meta-ads-benchmarks-cpl-cpc-roas/), 2026-03-23
- LocaliQ, Focus Digital and Searchlab: as cited in market/benchmarks.md section 4 (dates there)
- Dreamdata 2026 benchmarks via PPC Land, 2026-03-10; Fibbler [vendor], [LinkedIn Ads benchmarks](https://www.fibbler.co/blog/linkedin-ads-benchmarks), Aug 2026

**LinkedIn, TikTok, Nextdoor, population**
- LinkedIn: [Targeting options](https://www.linkedin.com/help/lms/answer/a424655); [Lookalike retirement](https://www.linkedin.com/help/lms/answer/94287); [Conversions API](https://www.linkedin.com/help/lms/answer/a1655394); [Industry codes V2](https://learn.microsoft.com/en-us/linkedin/shared/references/reference-tables/industry-codes-v2) (2026-05-15); [API recent changes](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/recent-changes) (version 2026-10); [Ad budget pricing](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ad-budget-pricing) (2026-03-18); [Maximize your budget](https://business.linkedin.com/marketing-solutions/best-practices/ad-tips/maximize-your-budget)
- TikTok, [Ad targeting](https://ads.tiktok.com/help/article/ad-targeting?lang=en) (Oct 2026) and [Budget](https://ads.tiktok.com/help/article/budget?lang=en) (Jul 2026)
- Nextdoor, [Nextdoor Ads Manager](https://business.nextdoor.com/en-us/nam/nextdoor-ads-manager), undated
- Pew Research, [Social media fact sheet](https://www.pewresearch.org/internet/fact-sheet/social-media/), 2026-10-19
- NADA, [NADA Data 2026 mid-year](https://www.nada.org/NADAData/)

**SES internal**
- GA4 for sesmgt.com via the SEO Monitoring connector (Aug 1 to Oct 24, 2026), queried 2026-10-25
- market/auto/auto_business_counts.csv (Census CBP 2023, NES 2024)
- market/benchmarks.md section 4; earlier SES internal notes
- site-repo src/pages/SocialLpPage.tsx (the /social-marketing form and plans)
