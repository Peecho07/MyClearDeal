# MyClearDeal brand sheet (read before every draft)

Single source of truth for every Instagram/Facebook skill in this folder. Facts come from the live site
(pricing.html, heroes.html, start.html, index.html, about.html) as checked on Nov 25, 2026. If the site changes,
update this file first. **When this file and any other reference disagree, this file wins.**

## Name, lines, contact

- Spelling: **MyClearDeal** (capital M, C, D). Never "My Clear Deal", "Mycleardeal" or "myClearDeal". URLs stay lowercase: mycleardeal.com.
- Slogan: **Car Buying Made Clear**
- Main line: **We negotiate. You just sign.**
- Contact: (561) 410-2709 · hello@mycleardeal.com · mycleardeal.com
- Links: start a deal `mycleardeal.com/start` · Hero Program `mycleardeal.com/start?plan=hero` · page `mycleardeal.com/heroes` · free quote review `mycleardeal.com/#review` · calculator `mycleardeal.com/calculator`

## Hard copy rules (no exceptions, stricter than the upstream voice rules)

1. **Zero em dashes (—) and zero en dashes (–)** anywhere: captions, slides, reels, comments. Hyphens inside compound words are fine (trade-in, out-the-door). Use a comma, colon, period or line break.
2. **Never the word "fair"** (or "fairly", "fairness").
3. **No financing talk:** never mention financing, F&I, loans, rates, APR, credit, lenders or monthly payments.
4. **No hype words:** game-changer, revolutionary, unlock, elevate, seamless, next level, must-have, and the upstream AI vocabulary list.
5. Short, human, confident. Sentence case. 0-2 emoji per caption, usually none.
6. **Never invent a number, a client, a review or a result.** Example figures must come from the site and be labelled "Example deal".

## The offer (facts you may state)

**Done For You, flat $995, one car**
- We negotiate the whole deal for you: vehicle price, dealer fees and add-ons, and the trade-in
- Trade-in included at no extra charge; kept separate and backed by market value
- Price checked against market data
- A written out-the-door recap before you agree to anything; nothing moves without your OK; not happy with the recap, we keep working
- Phone support until you drive away, plus text and email
- Free consultation call to build your plan (car, budget, trade, timeline); no obligation
- New or used, buy or lease
- One flat fee, same for everyone. No % of savings, no dealer kickbacks, no hidden fees. Fee confirmed on the free call. The dealer never pays us.
- Remote: everything by phone, text and email; one trip to the dealer to sign

**Free quote review**
- Type in the key numbers from your dealer quote on the home page form (no file upload)
- A real person on the team reviews it by hand: price, fees, add-ons and trade-in, checked against market data
- Follow-up by phone, text or email, usually within 1 business day. Free, no obligation to hire us.

**Hero Program ($995 → $0)**
- The full Done For You service at no cost: same negotiation, same written recap, same support
- Five fields, active or retired: firefighters (career and volunteer), law enforcement (police, sheriff's deputies, state troopers, corrections officers), medical field (nurses, doctors, EMTs, paramedics, other licensed healthcare workers), teachers (pre-K through college, public and private), military (active duty, Reserve, National Guard). Veterans qualify.
- Proof on the free call: a work ID or badge, a current license, a recent pay stub, or a military ID, VA card or DD-214
- One car, bought or leased for your own household. One Hero deal per person. Book through the Hero Program option before any work starts.
- Proof is only used to confirm eligibility and is never shared with a dealer
- In return (nothing required): if we did right by you, tell a friend who is shopping for a car and leave an honest review
- The program may change or end at any time; a deal confirmed in the signed agreement is always honored
- CTA: "Claim my Hero deal" → mycleardeal.com/start?plan=hero

**Example numbers already on the site (label them "Example deal")**
- Vehicle price $38,450 · doc fee $899 · trade-in: first offer $14,200, market value check $16,300, agreed $16,100
- Fees removed in an example: $1,995 appearance package, $299 nitrogen fill
- Out-the-door with that trade in Orange County: $40,994 (taxes, tag and title $1,645), per the site calculator

## Not on the site yet (ask before using)

- Customer stories, reviews, savings totals, number of deals done: **none published**. Story-pillar posts need real ones from the owner.
- Service area: the site says remote; it does not name Orlando or Central Florida. The owner asked for those hashtags; confirm the target area before geo-specific copy.

## Visual system (for slides, reels and covers)

- Build in HTML/CSS with `marketing/social/src/base.css` (tokens copied from site.css, Mint Fresh backdrop) and render with the scripts in `marketing/social/src/`.
- Colors: ink #0F2D24, green #1DB87A, green text #0B6E48, accent #13955F, mint pop #7BE8B6, mint highlight #BFF3D9, mint background #F5FCF8 / #E3F6EC, coral #E8692F (warnings), strike red #D9534F.
- Fonts: DM Sans (800 headlines, 500-600 body); Saira italic 700 for the accent words.
- Logo: the magnifier + check mark from the site header, wordmark My**Clear**Deal.
- No stock photos of people, no dealership or car-brand logos.
- Reels: 1080x1920, nothing but background in the top and bottom 250px, captions burned in, silent track (owner adds music in-app). Carousels: 1080x1350 (4:5).
