# Google audience targeting: reaching auto business owners by the tools they use

Prepared 2026-10-25. Read-only desk research. No ad account, site or list was changed, nothing was sent, no ads were created. Companion file: `google_signals.csv` in this folder (173 signals, 276 search terms).

## 1. Verdict

**The owner's idea works on Google only in a weaker form than the Fiverr analogy, and only outside Search.**

1. **Google will not show ads to the literal visitors of tekmetric.com or the users of the Tekmetric app.** A custom segment built from URLs reaches "people who browse websites similar to the URLs you enter". One built from apps reaches "people who download and use apps similar to the ones you enter" (Google Ads Help, answer 9805516, read 2026-10-25). These are interest models, not visitor lists.
2. **The closest match to the idea is a search-term custom segment**: "People who searched for any of these terms on Google properties". A segment made of "tekmetric login", "dealercenter login" or "xpel dap login" reaches people who actually typed those words on Google or YouTube. That is real and usable. Google does not say how far back it looks.
3. **It cannot run on Search.** Custom segments work on Demand Gen, Display and Video (YouTube), and only as signals on Performance Max. Google's table marks Search "No" (answer 2497941). So this is a YouTube, Discover, Gmail and Display play, aimed at people who are not looking for an agency at that moment.
4. **The pool is large for dealers and repair, small for detailing and car washes.** The three owner-leaning segments built in section 6.2 add up to about 134,100 searches a month (dealerships), 109,500 (repair, collision, tire) and 32,200 (detailing, tint, PPF, ceramic and car wash combined), US, Google Keyword Planner, 12-month average to Sep 2026. Those are searches, not people. The top 20 metros hold roughly 35% to 42% of that [estimate]. For scale: hire searches for an auto marketing agency in the top 20 metros are about 675 a month (AUTO-SYNTHESIS.md section c).
5. **Many of the searchers are staff, not owners.** The biggest login terms are technician tools (ALLDATA 74,000, Identifix 40,500, ProDemand 18,100) and dealership staff tools (Dealertrack and VinSolutions 18,100 each, RouteOne 14,800). The segments in section 6.2 leave most of those out and lean on owner signals (shop software pricing, floor-plan lenders, dealer licenses, insurance, competitor marketing vendors). Even so, owners will be a minority of the people reached [estimate].
6. **Customer Match cannot rescue it.** A purchased or scraped list of the 80,000 metro auto businesses is third-party data, which Google forbids for targeting. Targeting with Customer Match also needs more than $50,000 lifetime spend, which SES very likely does not have.
7. **The only true firmographic targeting is on Microsoft Advertising** (LinkedIn company, industry, job function, seniority, title). On Search it is a bid adjustment only. It fits dealership managers better than small shops.
8. **Recommendation: a 45-day test, not a channel bet.** Demand Gen with one search-term segment per vertical (optimized targeting off), a YouTube campaign using SES's own client videos aimed at the same segments, and a small remarketing layer: **$70 a day, about $2,100 a month, about $3,150 for 45 days** (section 6). Judge it on qualified owner leads and booked calls, not clicks. No published benchmark covers this audience, so the test is the benchmark.

## 2. Mechanics (verified 2026-10-25)

Google Help Center pages are undated unless a date is shown; API and Microsoft Learn pages carry their own "last updated" date.

### 2.1 Custom segments: what each input really does

| Input | What Google says it does | Source |
|---|---|---|
| Search terms | "People who searched for any of these terms on Google properties (such as Google.com and YouTube). Only on campaigns running on Google properties. On other campaigns, they will be used as interests or purchase intentions." | support.google.com/google-ads/answer/9805516 |
| Keywords (default) | "People with any of these interests or purchase intentions (This is the default)." | same |
| URLs | "Your ads will reach people who browse websites similar to the URLs you enter. Note: This doesn't mean your ads will show on those URLs." | same |
| Apps | "Your ads will reach people who download and use apps similar to the ones you enter. Note: This doesn't mean that your ads will show on those apps." | same |

- **No lookback window** is published for search-term segments.
- Google Ads API v26 (reference pages last updated 2026-10-13): member types KEYWORD, URL, PLACE_CATEGORY, APP; audience types AUTO ("Google Ads will auto-select the best interpretation at serving time"), INTEREST, PURCHASE_INTENT, SEARCH ("Matches users by what they searched on Google Search"). INTEREST and PURCHASE_INTENT are "not allowed for newly created custom audience but kept for existing audiences".
- Custom intent and custom affinity are gone; custom audiences are "the migration of the two previous customizable offerings" (API custom audiences guide, last updated 2026-10-14).
- "Custom segments are not shareable from one account to another." (9805516)
- Inputs are reviewed against ad policy (9805516). The trademark policy lists "Using trademarks as keywords" under what it will not restrict (adspolicy/answer/6118, undated). No rule against competitor or software brand names as custom-segment inputs was found; brand names in ad text remain restricted.

### 2.2 Which campaign types accept custom segments

| Campaign type | Custom segments | Notes and source |
|---|---|---|
| Demand Gen | Yes, as targeting | answer 2497941. Serves on YouTube, Discover, Gmail and Display |
| Display | Yes | answer 2497941. Display is being folded into Demand Gen: "June 2026: Google is launching a phased rollout of our migration tool"; "Coming later: New Google Display Ads campaigns can only be created within Demand Gen" (answer 17051545) |
| Video (YouTube) | Yes | answer 2497941. Video action campaigns are gone: no new ones from April 2025, the last were auto-upgraded to Demand Gen by April 2026 (answer 15110871). Conversion-focused YouTube now runs through Demand Gen; awareness and consideration Video campaigns remain |
| Performance Max | Signals only | "custom segments can't be applied directly to Performance Max campaigns" (9805516). PMax "may show ads to relevant audiences outside of your signals if they have a strong likelihood of converting" (14530785) |
| Search | **No**, neither targeting nor observation | answer 2497941 lists Search "No". Search observation covers Google's own data segments (answer 7365594) |
| Shopping, Hotel | No | answer 2497941 |

### 2.3 Settings that silently widen the audience

| Setting | Default | How to stop it | Source |
|---|---|---|---|
| Optimized targeting (Display, Demand Gen, Video with Sales, Leads or Website traffic goals) | **On**: "automatically turned on for all campaigns"; it "looks beyond manually-selected audience segments" | Ad group, Settings tab, expand "Optimized targeting", untick | answers 10537509, 10538014 |
| Demographic expansion (Demand Gen) | Applies whenever optimized targeting is on | Option "to restrict demographic expansion to the age and gender specifications" | 10537509 |
| Demand Gen setup | "Keep or deselect optimized targeting" (pre-selected) | Deselect at creation | 13695389 |
| Customer Match auto-inclusion | "Campaigns using Smart Bidding and optimized targeting automatically include all the Customer Match lists in your account" | Admin, Account settings, "Use all Customer Match lists in Smart Bidding or Optimized Targeting" | 6379332 |
| Audience expansion (Video, awareness and consideration goals) | "Check the Audience expansion checkbox to turn on" (reads as opt-in; default not stated) | Leave unticked | 9496986, 9496929 |
| Lookalike segments (Demand Gen only) | Moving "to a suggestion mode for Demand Gen campaigns through a phased approach throughout 2026"; opt-out by form from March 2026, "UI opt-out controls coming later in the year" | Opt-out form | 13541369 |
| Performance Max | Always expands | Cannot | 10538014 |

### 2.4 Minimum audience sizes

- Your-data lists (site visitors, YouTube viewers) and Customer Match: "a minimum of 100 active visitors or users within the last 30 days" on Display, and the same for Search and YouTube; the old 1,000 rule covers only lists uploaded before 2024-02-01 (answer 7558048).
- Customer Match uploads: "All files submitted must have a minimum of 100 user records"; eligibility needs "at least 100 members added or updated within the last 540 days" (answer 7474166).
- **Custom segments: no minimum published.** The segment builder shows an estimate ("Segment Insights", defaults to US and English). Not checked here, because it needs a segment to be created in the account.
- Lookalike seeds: the 100-user minimum "is no longer true" (13541369).

### 2.5 Customer Match eligibility and data source (policy unchanged in 2026)

- All policy-compliant advertisers can use Customer Match "in the 'Observation' setting and for Exclusions". **Targeting** needs "90 days of Google Ads history and more than USD $50,000 total lifetime spend", plus "A good history of policy compliance" and "A good payment history" (support.google.com/adspolicy/answer/6299717). The policy names Search, Shopping, Display, YouTube and Gmail; it does not name Demand Gen, so the gate there is not stated.
- SES has run at $30 to $50 a day since mid-2026, so lifetime spend is very likely under $50,000 [estimate from the budgets in the project notes; check in the account]. That means Observation and Exclusions only.
- **First-party data only**: "you may only upload customer information that you collected in the first-party context" (6299717). The data-use policy (adspolicy/answer/6242605) lists as not allowed "Using third-party data to create audiences for ads targeting", where third-party data "is user information that you purchase or otherwise obtain from other sources". So a bought, rented or scraped business list is out. (The words "purchased list" and "scraped" are not used verbatim; the ban follows from that definition.) Allowlisted API customers can create third-party lists of fixed types (credit bureau, voter file, partner data), which does not apply to SES.
- 2025 to 2026 changes: Google points new integrations to Data Manager; since 2026-04-01, API Customer Match calls fail for Cloud projects with no Customer Match activity between 2025-10-01 and 2026-03-31; since 2025-04-07 membership cannot be infinite (540 days maximum) (Google Ads API audience docs, last updated 2026-10-14).
- What SES can use: its own clients, leads and booked-call contacts as an **exclusion** (stop paying to reach existing clients) and for Observation.

### 2.6 Google B2B features: what exists

- **Company name and job title targeting do not exist on Google.** No official page offers them.
- **"Employment" detailed demographics exist**: company size (Small 1 to 249, Large 250 to 10k, Very Large 10k+ employees) and industry (Construction, Education Sector, Financial, Healthcare, Hospitality, Manufacturing, Real Estate, Technology). **No automotive industry.** Google's segment CSV marks them available on Gmail, Discovery (Demand Gen), Search, Shopping and Video, not Display. Country availability is not stated anywhere found. The CSV is undated (linked from answer 2497941); its "Discovery" label suggests 2022 to 2023. "Small Employer" is far too broad to isolate auto shops.
- In-market and affinity segments do not describe auto business owners. "/Autos & Vehicles/..." segments are consumers shopping for cars and repairs. Adjacent segments that exist: in-market "/Business Services/Advertising & Marketing Services", "SEO & SEM Services", "Web Design & Development"; affinity "Business Professionals" (Google's in-market and affinity CSVs).

### 2.7 Microsoft Advertising: LinkedIn profile targeting

- Dimensions: CompanyName, Industry, JobFunction, JobSeniority, JobTitle (ProfileType reference, learn.microsoft.com, updated 2026-09-07). Up to 1,000 company names per campaign or ad group (targeting guide, updated 2026-06-05).
- **Search: bid adjustment only**, from -90% to +900%. "Target and bid" for Company, Industry and Job function "is only supported with the Audience campaign type" (TargetSettingDetail reference, updated 2024-12-03; bulk Industry Criterion page, 2024-11-13). On Audience campaigns (native and display) it restricts delivery.
- No published minimum; narrow targeting must reach an "Active" privacy status (Audience ads guide, updated 2026-06-05).
- 2026 changes are additions, not retirement: LinkedIn segment interfaces (March and August 2026) and "Company List" with audience size (September 2026) (release notes, updated 2026-10-14).
- Relevant LinkedIn industries (industry taxonomy V2, updated 2026-05-15): Retail Motor Vehicles (1292, which includes "repair and maintenance services"), Vehicle Repair and Maintenance (2226), Wholesale Motor Vehicles and Parts (1128). "Automotive" (3198) is deprecated. Whether Microsoft's UI uses this list or the older one is unclear.
- **Fit for SES**: dealership GMs, sales and service managers (Retail Motor Vehicles plus seniority Owner, CXO, Director, Manager). Small independent shops and detailers are thinly represented on LinkedIn [inference, not an official statement]. Not verified: Microsoft's exact industry and function lists (downloadable only through an authenticated API call) and US-only availability.

## 3. Signal lists per vertical

Full list: `google_signals.csv`. Columns as briefed. One extra `signal_type` value, `owner_intent`, holds terms about running the business (insurance, licenses, equipment, "for sale", marketing), because they belong in the segments.

How the lists were built and checked (2026-10-25):
- **Names**: the brief's starting list, extended with competing shop software, collision estimating, pro parts and tire distributor portals, wholesale auctions and floor-plan lenders, dealer website vendors (SES competitors), film and coating brands, car wash equipment makers, trade press, associations and shows.
- **Domains**: each domain was requested once with curl. Most returned the expected site or a bot wall (403 or Cloudflare, which still proves the site exists). Corrections: protractor.com goes to protractorsoftware.com; steercrm.com to steer.io; washify.com to drb.com (DRB owns Washify); sincrodigital.com to dealeron.com/sincro; shopgenie.io is now "Shopgenie - Now Tekmetric Marketing"; demandforce.com now sells "Patient Communication Software". Domains that timed out or showed an unrelated page are flagged in the note column.
- **Apps**: checked in Apple's public iTunes Search API and on Google Play search pages. Install bands (for example "10K+") are from the Play listing. App inputs reach people who use *similar* apps, so they are weaker than search terms.
- **Vendor size claims** (from their home pages, 2026-10-25, unaudited): Tekmetric "more than 16,000 shops"; Shopmonkey "over 8,000 shops"; DealerCenter "more than 20,000+ dealerships"; Rinsed "over 3,000 car washes"; CDK "9,000+ CDK customers" (a bio line, customers not rooftops). AutoLeap, Urable, Tint Wiz, Mobile Tech RX, XPEL, Ceramic Pro, VinSolutions and Sonny's give no number. cccis.com and routeone.com refused the fetch (403).

### 3.1 Strongest signals by vertical

US monthly searches, Keyword Planner average Oct 2025 to Sep 2026.

**Repair, collision, tire**

| Signal | Terms (volume) | Who searches |
|---|---|---|
| Tekmetric (shop management) | tekmetric 40,500; tekmetric login 33,100; tekmetric pricing 390 | Owners, service advisors |
| Shopmonkey | shopmonkey 12,100; shopmonkey login 5,400 | Owners, advisors |
| AutoLeap | autoleap login 5,400; autoleap 3,600; autoleap pricing 170 | Owners, advisors |
| Shop-Ware | shop-ware login 1,900 | Owners, advisors |
| CCC ONE (collision) | ccc one 5,400; ccc one login 1,900; ccc estimating 390 | Estimators, owners |
| Pro parts | worldpac 49,500; worldpac speeddial 2,900; partstech 12,100; nexpart 12,100; partstech login and nexpart login 2,400 each | Advisors, parts staff |
| Tire distributors | tirehub 22,200; tirehub login 2,400; atd online 3,600 | Tire dealers |
| Repair information | alldata login 74,000; identifix login 40,500; prodemand login 18,100 | Mostly technicians |
| Owner intent | auto repair shop software 2,900; garage liability insurance 1,600; auto repair shop for sale 1,000; auto repair shop marketing 880; auto repair shop insurance 720 | Owners, buyers |

**Dealerships**

| Signal | Terms (volume) | Who searches |
|---|---|---|
| Franchise DMS and CRM | dealertrack login 18,100; vinsolutions login 18,100; dealersocket login 12,100; cdk login 6,600; elead login 2,900; reynolds and reynolds login 1,600 | Sales, F&I, managers |
| Independent-dealer software | dealercenter login 9,900; frazer dms 1,000; carsforsale dealer login 1,000 | Small independent owners |
| Wholesale and inventory | auctionaccess 22,200; vauto login 14,800; manheim login 14,800; openlane login 8,100; acv auctions login 2,400 | Used-car managers, owners |
| Floor-plan lenders | kinetic advantage 4,400; nextgear capital login 3,600; westlake flooring 2,400; afc dealer login 1,900 | Owners, controllers |
| Listing marketplaces | carfax dealer login 14,800; cargurus dealer login 6,600; truecar dealer portal 4,400; cars.com dealer login 1,900 | Internet managers |
| Competitor website vendors | dealeron 2,400; dealer inspire 1,900; dealer spike 1,600; dealer.com 1,300; dealer eprocess 1,300; overfuel 880 | Marketing decision makers |
| Owner intent | how to get a dealer license 9,900; auto dealer license 3,600; car dealer insurance 1,300; car dealer marketing 720; dealership marketing 480 | Owners, would-be dealers |

**Detailing, tint, PPF, ceramic**

| Signal | Terms (volume) | Who searches |
|---|---|---|
| Urable | urable 3,600; urable login 390 | Owners |
| OrbisX | orbisx 1,600 | Owners |
| Mobile Tech RX | mobile tech rx 1,300 | Recon and mobile owners |
| Tint Wiz | tint wiz 880; tintwiz login 90 | Tint shop owners |
| XPEL installer software (DAP) | xpel dealer 320; xpel dap 260; xpel installer 260; xpel login 170; xpel dap login 110 | Installers |
| Suppliers and training | detail king 4,400; the wrap institute 720 | Owners, installers |
| Owner intent | window tint business 1,600; how to start a detailing business 1,000; ppf training 260; detailing business insurance 170 | Owners, would-be owners |

**Car washes**

| Signal | Terms (volume) | Who searches |
|---|---|---|
| Equipment | sonnys direct 2,900; ryko car wash 2,400; belanger car wash 590; macneil car wash 390 | Operators |
| Software | washify 480; ics car wash 320; washcard 260; drb car wash 210; micrologic car wash 210 | Operators |
| Associations and shows | international carwash association 320; the car wash show 320 | Operators |
| Owner intent | car wash for sale 14,800 (investor mix); car wash equipment 3,600; how to start a car wash business 880; car wash marketing 170 | Owners, investors |

**Cross-vertical**: podium login 18,100; birdeye login 2,400 (review software used by many kinds of local business).

**Do not use as segment terms** (consumer or noise heavy): xpel 12,100, ceramic pro 6,600, gtechniq 8,100, gyeon 4,400, stek ppf, suntek ppf, igl coatings, llumar, everwash, pdq car wash, sonnys car wash, alldata (DIY), manheim (a town), fenderbender ("fender bender"), automotive training institute, tire industry association, automotive news, openlane, kukui.

## 4. Sizing

**Source for every volume**: Google Ads Keyword Planner (KeywordPlanIdeaService) via the SEO Monitoring connector, property 34cd7a53-2beb-4770-8342-928a630d33c6, United States, English, pulled 2026-10-25 in 16 batches (290 seed terms; 288 returned exactly; "u.s. auto force" and "autonews" did not). Volume is Google's avgMonthlySearches for Oct 2025 to Sep 2026. Competition is Google's LOW, MEDIUM or HIGH; bids are the top-of-page low and high range in USD.

### 4.1 All terms in the CSV

| Vertical | Terms kept | Searches a month | Software and portal terms | Login terms | Owner-intent terms | Excluded as noise |
|---|---:|---:|---:|---:|---:|---:|
| Repair, collision, tire | 106 | 946,320 | 839,520 | 195,240 | 22,690 | 773,200 |
| Dealerships | 81 | 957,110 | 912,650 | 156,660 | 16,370 | 246,000 |
| Detailing, tint, PPF, ceramic | 53 | 66,530 | 59,050 | 820 | 5,450 | 0 |
| Car washes | 25 | 43,800 | 23,370 | 0 | 19,590 | 0 |
| Cross-vertical | 7 | 38,880 | 24,080 | 22,900 | 0 | 0 |

"Terms kept" still includes terms flagged as consumer-mixed in the note column; the noise exclusions are "automotive training institute" (550,000), "tire industry association" (201,000), "manheim" (246,000) and "fenderbender" (22,200).

### 4.2 The owner-leaning segments (what would actually be targeted)

| Segment (section 6.2) | Terms | US searches a month | Top-20-metro share [estimate, 35% to 42%] |
|---|---:|---:|---:|
| A1 Dealerships | 34 | 134,100 | about 47,000 to 56,000 |
| A2 Repair, collision, tire | 43 | 109,480 | about 38,000 to 46,000 |
| A3 Detailing, tint, PPF, ceramic, car wash | 48 | 32,170 | about 11,000 to 14,000 |

How to read it:
- **Searches, not people.** One service advisor may search "tekmetric login" every working day, so login volume is a proxy for active users (staff included), not a head count of businesses. Without the in-account Segment Insights estimate there is no people count.
- Keyword Planner rounds to buckets and groups close variants; terms under 100 are approximate.
- The top-20 share is the range the earlier research used per industry (AUTO-SYNTHESIS.md section h), applied here as an estimate. A3 is small enough that it may need the whole US to spend its budget.
- The market these pools sit in: 80,129 employer auto businesses in the top 20 metros and 202,176 in the US (AUTO-SYNTHESIS.md section e, Census CBP 2023 and NES 2024).

## 5. Benchmarks: Demand Gen, YouTube, Display (B2B and small business where possible)

Collected 2026-10-25 by a benchmark sweep (WebFetch and page fetches). The sweep stopped early when the disk filled, so a few sources (Strike Social's 2025 report, Tinuiti's full data, WordStream's display pages) were gated, refused (403) or unread. Labels: [vendor: what they sell]. Figures are quoted as published.

### 5.1 Demand Gen

| Metric | Value | Scope and caveat | Source and date |
|---|---|---|---|
| CPA | $8.59 to $7.35 (Q1 2025 to Q1 2026); best quarter Q3 2025: $5.50, ROAS 224.7% | 21,425 accounts, mostly ecommerce-weighted conversions, not B2B leads. Demand Gen campaign volume +53.2%; CTR -10.7% and CPC +33.33% year on year | Optmyzr [vendor: PPC software], "We Analyzed 21,425 Google Ads Accounts" (Q1 2026 report), 2026-05-13 |
| CTR and CPC planning tiers | Weak 0.35% to 0.75%, $2.00 to $2.75; Average 0.75% to 1.2%, $1.40 to $2.00; Optimal 1.5% to 2.5%, $0.40 to $1.20 | No data basis stated; "planning ranges" | Affect Group [vendor: performance marketing agency], 2026-06-04 |
| CTR, CPC, view rate, CVR | CTR 0.5% to 2%; CPC $0.30 to $1.50; view rate 15% to 35%; CVR 0.5% to 2% | Ecommerce, author's experience, no sample | Store Growers [vendor: Google Ads training and management], updated 2026-02-27 |
| Conversions per dollar | "26% increase in conversions per dollar" in a year | "Google Internal Data, February 2025 - March 2025" | Google (sells the ads), blog.google, 2025-09-18 |
| Case study | ServiceTitan: "7% reduction in cost per acquisition", "307% more conversions" than its social campaigns | Software company selling to trades; period not stated | Google, business.google.com lead-gen case studies, March 2025 |
| vs paid social | "3X higher click-through rates, at a 61% lower cost per action" (Naranja X) | One advertiser, no data basis | Google, blog.google, 2023-10-10 (old) |

### 5.2 YouTube and video

| Metric | Value | Scope and caveat | Source and date |
|---|---|---|---|
| CPM | Typical $5 to $10; standard video market average $9.29, small-to-mid advertisers $8.15; skippable in-stream $5 to $10; in-feed $3 to $8; bumper $3.24 to $4.37; Shorts about $4 | Compiled from Adzoola ($14.3B YouTube spend), Strike Social 2024/2025 and others | Store Growers [vendor], "YouTube Ads Benchmarks (2026)", updated 2026-02-19 |
| View rate | 31.9% overall | Strike Social 2018 (old; the page says nothing newer at scale exists) | same |
| By industry | B2B: CTR 0.37%, CPV $0.037, CPM $3.70. Business & Finance: CTR 0.38%, view rate 35.4%, CPV $0.048, CPM $3.30. Automotive: CTR 0.65%, CPV $0.058, CPM $2.90 | Data basis unclear (methodology describes Search campaigns); treat with caution | Mega Digital [vendor: Google Ads agency, ad account rentals], 2026-07-27 |
| CPM trend | YouTube CPM fell 18% year on year in Q4 2025 (spend +13%, impressions +38%); Q3 2026: "17 Quarters since average YouTube CPM increased year over year" | Large-brand spend | Tinuiti [vendor: agency], Q4 2025 report (2026-01-14) and Q3 2026 report page |
| Video CPA | $25.97 to $227.95 year on year | Optmyzr says this is lost attribution during the move to Demand Gen, "not real performance" | Optmyzr [vendor], 2026-05-13 |

### 5.3 Display

| Metric | Value | Scope and caveat | Source and date |
|---|---|---|---|
| Business Services | CTR 0.25%, CPC $3.35, CPL $149.90 | 7,074 LocaliQ display campaigns (programmatic incl. Google and YouTube), Apr 2025 to Jun 2026; medians | LocaliQ [vendor: ad platform and agency, USA TODAY Co], "Display & Video Ads Benchmarks for 2026", updated 2026-09-01 |
| Industrial & Commercial | CTR 0.19%, CPC $3.82, CPL $131.63 | same | same |
| Automotive: Repair, Service & Parts | CTR 0.20%, CPC $2.89, CPL $86.49 | Campaigns run by repair shops for consumers, not ads aimed at shop owners | same |
| B2B services CTR | 0.22% (overall 0.46%); Google Display Network CTR 0.46%, CPC $0.63 | US, Feb to Dec 2025, sample not disclosed | Focus Digital [vendor: SEO and Ads agency], 2025-12-26 |
| Display CPA and CVR | CPA $4.53 to $3.22; CVR 5.06% to 6.99% (Q1 2025 to Q1 2026); Display volume -17.3% | Mostly ecommerce; accounts that kept Display | Optmyzr [vendor], 2026-05-13 |

### 5.4 Remarketing and targeting type

| Metric | Value | Scope and caveat | Source and date |
|---|---|---|---|
| CTR by targeting | First-party data plus lookalike 0.73%; behavioral retargeting 0.68%; interest-based 0.38%; contextual 0.30%; broad 0.19% | Programmatic display, Q1 to Q3 2025, no sample size | Focus Digital [vendor], 2026-01-02 |
| B2B retargeting CPL | Facebook $120 retargeting vs $166 prospecting; LinkedIn $234 vs $194. No Google row | 153 B2B advertisers, $57.6M spend, 211,000 leads, calendar 2025, spend-weighted | Metadata.io [vendor: B2B ad automation], "B2B Advertising Benchmarks 2026" (undated page, 2025 data) |
| B2B cross-channel CPL | LinkedIn $202 (CTR 0.67%, CPM $63.19); Facebook $145; Instagram $138; Google Ads $524 (mostly Search) | same | same |

### 5.5 Microsoft Audience Network

| Metric | Value | Scope and caveat | Source and date |
|---|---|---|---|
| CPA vs Search | "ranges 2-4 times higher than the cost from search" | One B2B client, period not stated | Seer Interactive [vendor: agency], 2024-03-26 |

### 5.6 What does not exist

- **No published Demand Gen, YouTube or Display benchmark for audiences of auto business owners**, or for B2B lead generation on Demand Gen with a disclosed sample.
- **No benchmark comparing search-term custom segments with broader audiences.** The closest is vendor CTR by targeting type (5.4).
- Most Demand Gen figures are ecommerce. The cheap CPAs ($5 to $9) are purchases, not agency leads.
- Gated or refused: Strike Social 2025 YouTube report (form), Tinuiti's full benchmark data (form), WordStream display pages (403), Search Engine Land's Microsoft Audience Network article (403).

### 5.7 Planning band for this test [estimate]

| Metric | Low case | Mid case | High case | Basis |
|---|---|---|---|---|
| Demand Gen CPC | $2.75 | $2.00 | $1.40 | Affect tiers; narrow B2B segments assumed at the expensive end |
| Demand Gen CTR | 0.35% | 0.75% | 1.2% | Affect tiers; Focus Digital interest-based 0.38% |
| Click to raw lead | 1% | 2% | 3% | Below SES's Search band (1.5% to 5%, benchmarks.md section 1), since nobody is shopping for an agency |
| Raw CPL | $275 | $100 | $47 | CPC divided by click-to-lead |
| Share of leads that are real owners or decision makers | 30% | 45% | 60% | Staff-heavy pools (section 1 point 5) |
| Cost per qualified lead | about $920 | about $220 | about $78 | Raw CPL divided by owner share |
| YouTube CPM | $10 | $8 | $5 | Store Growers range; Adzoola small-to-mid $8.15 |

For comparison, the existing Meta planning band for raw local-owner leads is $40, $80 and $150 to $220 (benchmarks.md section 4).

## 6. Test design (45 days, decide by day 60)

### 6.1 Campaigns and budget

| Campaign | What it does | Budget | Geography |
|---|---|---|---|
| A. Demand Gen "tool users" | Three ad groups, one search-term custom segment each (6.2). Image, short video and carousel ads on YouTube, Discover, Gmail and Display. Offer: a free teardown of the business's Google profile, site and ads, by vertical | $40 a day | Top 20 metros (the earlier research's scope); widen A3 to the US if it spends under half its budget by day 14 |
| B. YouTube video | Video campaign (consideration goal) with the same three segments, skippable in-stream and in-feed, using SES's own client videos (Ultra Hi-Tintz, Gravity Detailing, USA Reflections Auto Spa, Xclusive Appearance), cut to 15 to 30 seconds per vertical. Builds a viewer list for C | $20 a day | Same |
| C. Remarketing | Demand Gen ad group aimed at site visitors and YouTube viewers of B; SES clients excluded through Customer Match (allowed under Exclusions) | $10 a day | Same |
| **Total** | | **$70 a day, about $2,100 a month, about $3,150 for 45 days** | |

- C may under-spend until the lists reach 100 active users in 30 days (answer 7558048).
- The Search campaign can only spend about $688 a month in the top 20 metros (AUTO-SYNTHESIS.md section d), so this test is about three times Search's ceiling.
- Optional phase 2 (not in the budget): Microsoft Advertising, either a +50% bid boost for the Retail Motor Vehicles and Vehicle Repair and Maintenance industries on SES's own Search keywords, or a $10 a day Audience campaign aimed at dealership owners and managers. Seer saw Audience Network CPA 2 to 4 times Search for a B2B client.

### 6.2 The segments (search-term custom segments, "People who searched for any of these terms")

- **A1 Dealerships (34 terms, 134,100 US searches a month)**: dealercenter login, frazer dms, carsforsale dealer login, nextgear capital login, westlake flooring, afc dealer login, kinetic advantage, auctionaccess, acv auctions login, openlane login, manheim login, vauto login, cargurus dealer login, cargurus dealer, cars.com dealer login, autotrader dealer login, truecar dealer portal, carfax dealer login, dealer.com login, dealeron, dealer inspire, dealer spike, dealer eprocess, overfuel, dealer management system, car dealer marketing, dealership marketing, niada, nada show, cbt news, dealerrefresh, digital dealer conference, car dealer insurance, auto dealer bond.
- **A2 Repair, collision, tire (43 terms, 109,480)**: tekmetric login, tekmetric pricing, shopmonkey login, shopmonkey, autoleap login, autoleap, autoleap pricing, shop-ware login, napa tracs, ro writer, protractor software, mitchell 1 manager se, auto repair shop software, auto repair shop management software, ccc one login, ccc one, ccc estimating, mitchell cloud estimating, worldpac speeddial, partstech login, nexpart login, tirehub login, atd online, tire shop software, autovitals, steer crm, shopgenie, autoserve1, shop boss pro, torque360, omnique, openbay, repairpal certified shop, garage liability insurance, auto repair shop insurance, auto repair shop for sale, auto repair shop marketing, ratchet and wrench, autobody news, iatn, aapex, scrs collision, body shop management software.
- **A3 Detailing, tint, PPF, ceramic, car wash (48 terms, 32,170)**: urable, urable login, mobile tech rx, tint wiz, tintwiz login, orbisx, xpel dap, xpel dap login, xpel dealer, xpel installer, xpel login, ceramic pro installer, ceramic pro certified installer, llumar dealer, 3m window film dealer, suntek dealer, gtechniq accredited, opti coat pro, detail king, the wrap institute, window tint business, how to start a detailing business, ppf training, ceramic coating certification, window tint certification, detailing business insurance, detailing business marketing, international detailing association, mobile tech expo, sonnys direct, drb car wash, drb tunnel watch, washify, washcard, micrologic car wash, ics car wash, car wash pos system, international carwash association, the car wash show, car wash equipment, tunnel car wash equipment, how to start a car wash business, car wash marketing, belanger car wash, macneil car wash, ryko car wash, professional carwashing and detailing, auto laundry news.
- Deliberately left out: technician tools (alldata, identifix, prodemand), franchise sales-floor CRMs (vinsolutions, dealertrack, routeone logins) and every consumer-mixed term listed in section 3.1. Add the staff-heavy terms back only if A1 or A2 cannot spend.

### 6.3 Settings checklist

- Optimized targeting **off** in every ad group (Settings tab). Demographic expansion restricted to the chosen age and gender. Lookalike opt-out form filed. Audience expansion unticked in B.
- Account setting "Use all Customer Match lists in Smart Bidding or Optimized Targeting" **off**.
- Conversion goals: only the real form-lead and booking conversions; keep the GBP "local action" conversions out. Report view-through conversions separately.
- A role question on the form ("Owner, GM or manager / Staff / Other") so leads can be qualified, plus a vertical-specific landing page per ad group with UTM tags.
- Ad copy follows SES's owner constraints (no guarantees, no invented stats; lead with the real 5.0 Google rating and named testimonials) and never names the competitor brands used in the segments. Client videos only with each client's permission.
- Budget, bidding and campaign creation are Google Ads UI changes; they go to Kaisin for approval first.

### 6.4 What to measure

Per ad group: impressions, CTR, CPC, CPM; for B, view rate and CPV; leads; share of leads that are owners or decision makers (tagged by SES within 48 hours); booked calls; signed clients; GA4 engaged-session rate; the size of the remarketing lists; and branded searches for "SES MGT" in Search Console during the test.

### 6.5 Kill and scale thresholds [estimate]

| When | Rule |
|---|---|
| Day 14 | Each ad group needs at least 5,000 impressions and CTR of at least 0.35% (bottom of the Demand Gen "weak" tier). Below that, swap creative once. If A3 spends under half its budget, widen it to the US |
| Day 30 or $1,000 spent per ad group | **Kill** an ad group with no qualified lead, or with cost per qualified lead over $400. **Iterate once** (new creative, prune terms) between $150 and $400. **Scale** by 25% a week at $150 or less |
| YouTube (B) | Kill if view rate stays under 15% after 20,000 impressions. Otherwise judge it on the remarketing list it builds and on assisted leads, not on direct leads |
| Day 45 to 60 | Keep the program if it produced at least one signed client, or at least three qualified sales calls per $1,500 spent, with a path to cost per client of $2,500 or less. Otherwise stop and move the money to the Meta and outbound plans |

## 7. Risks

1. **Staff, not owners.** Shop software logins include advisors; dealer tools are used by sales, F&I and managers. Mitigation: owner-leaning segments (6.2), owner-addressed creative ("Run a shop?"), the role question, and judging only qualified leads.
2. **Consumer car owners leaking in** through film, coating, auction and car wash brand terms. Mitigation: the exclusion list in section 3.1; check placement and audience reports weekly.
3. **Expansion drift.** Optimized targeting is on by default, demographic expansion follows it, lookalikes become suggestions during 2026 and Smart Bidding can pull in all Customer Match lists. Each must be switched off (2.3). Performance Max cannot be held to the segments at all, so it is not used.
4. **Unknown recency.** Google does not say how long ago someone must have searched a term to be in the segment.
5. **Small pools.** A3 may not spend in the top 20 metros; Demand Gen may push to widen targeting to deliver.
6. **Platform churn.** Display creation is moving into Demand Gen, Video action campaigns are gone, and lookalike behaviour changes during 2026. Settings may move again.
7. **Measurement.** Demand Gen counts view-through conversions; an Optmyzr test saw a "lower percentage of engaged sessions in GA4" for Demand Gen traffic (Optmyzr, 2024-02-28, single advertiser). Only CRM-confirmed leads count.
8. **Data rules.** Customer Match cannot use bought or scraped lists, and SES likely cannot use it for targeting before $50,000 lifetime spend.
9. **Trademarks.** Competitor brands as segment inputs are not restricted by the policies found, but must not appear in ad text.
10. **No benchmark for this audience.** Every cost figure in 5.7 is a vendor number or an estimate; the test exists to replace them with SES's own.

## 8. Not verified

- People counts for the segments (needs Segment Insights inside the account).
- SES's lifetime Google Ads spend (needed for the $50,000 Customer Match gate); not queried, to stay read-only.
- Whether the $50,000 gate applies to Demand Gen (the policy does not name it).
- Country availability of Google's Employment demographics.
- Microsoft's exact industry and job-function lists, and whether its UI uses LinkedIn's new or legacy taxonomy.
- Vendor customer counts (all self-reported); CCC and RouteOne pages refused the fetch.
- Domains that timed out (flagged in the CSV) and app publishers marked "not confirmed".
- The Microsoft Advertising help center (help.ads.microsoft.com) returned no article text; learn.microsoft.com was used instead.

## 9. Sources (all read 2026-10-25 unless stated)

**Google Ads Help and policy (undated pages)**: support.google.com/google-ads/answer/9805516 (custom segments); 2497941 (segment availability by campaign type, and the linked detailed-demographics, in-market and affinity CSVs); 7365594 (targeting and observation); 14530785 (Performance Max signals); 15110871 (Video action to Demand Gen, dated milestones April 2025 to April 2026); 17051545 (Display to Demand Gen migration, June 2026); 10537509 and 10538014 (optimized targeting); 13695389 (Demand Gen setup); 6379332 (Customer Match and optimized targeting); 9496986 and 9496929 (audience expansion); 13541369 (lookalike segments, 2026 changes); 7558048 (list size minimums); 7474166 (Customer Match upload rules); 2580383 (demographics); support.google.com/adspolicy/answer/6299717 (Customer Match policy), 6242605 (data use policy), 6118 (trademarks).

**Google Ads API**: developers.google.com/google-ads/api/reference/rpc/v26 CustomAudienceMemberTypeEnum, CustomAudienceTypeEnum and CustomAudience (last updated 2026-10-13); /docs/remarketing/audience-segments/custom-audiences and /getting-started, Customer Match guide (last updated 2026-10-14).

**Microsoft**: learn.microsoft.com/en-us/advertising campaign-management-service ProfileType (2026-09-07), TargetSettingDetail (2024-12-03), bulk Ad Group Industry Criterion (2024-11-13), show-ads-target-audience and Audience ads guides (2026-06-05), release notes (2026-10-14); learn.microsoft.com/en-us/linkedin/shared/references/reference-tables/industry-codes-v2 (2026-05-15).

**Keyword data**: Google Ads Keyword Planner via SEO Monitoring connector (property 34cd7a53-2beb-4770-8342-928a630d33c6), US, English, Oct 2025 to Sep 2026, pulled 2026-10-25.

**Apps and sites**: itunes.apple.com Search API and play.google.com search and listing pages (2026-10-25); one curl request to each domain in the CSV (2026-10-25); vendor home pages tekmetric.com, shopmonkey.io, autoleap.com, cdkglobal.com/about, urable.com, vinsolutions.com, tintwiz.com, dealercenter.com, mobiletechrx.com, drb.com, ceramicpro.com, xpel.com, sonnysdirect.com, rinsed.com (2026-10-25).

**Benchmarks**: Optmyzr, "We Analyzed 21,425 Google Ads Accounts" (2026-05-13) and "Google Demand Gen vs Google Display" (2024-02-28); Affect Group, Demand Gen CTR and CPC planning ranges (2026-06-04); Store Growers, Demand Gen benchmarks (updated 2026-02-27) and YouTube ads benchmarks (updated 2026-02-19); blog.google Demand Gen post (2025-09-18) and "Demand more from social" (2023-10-10); business.google.com lead-gen case studies (March 2025); Mega Digital, YouTube ad benchmarks (2026-07-27); Tinuiti Digital Ads Benchmark Reports Q4 2025 (2026-01-14) and Q3 2026 page; LocaliQ, Display & Video Ads Benchmarks for 2026 (updated 2026-09-01); Focus Digital, display CTR benchmarks (2025-12-26) and programmatic CTR benchmarks (2026-01-02); Metadata.io, B2B Advertising Benchmarks 2026 (2025 data); Seer Interactive, Microsoft Audience Network (2024-03-26); The Starr Conspiracy (2026-05-26, no Demand Gen figures found).

**Earlier SES research (not redone)**: `relaunch-2026-10/market/auto/AUTO-SYNTHESIS.md` sections a to h and `relaunch-2026-10/market/benchmarks.md` sections 1, 2 and 4 (both 2026-10-25).
