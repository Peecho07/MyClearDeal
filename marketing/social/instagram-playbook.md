# MyClearDeal Instagram playbook

How the adapted instagram-skills apply to MyClearDeal, the profile setup, and how to make new posts.
The skills live in `.claude/skills/` (entry point: `mycleardeal-instagram`). Brand facts and rules live in
`.claude/references/mycleardeal-brand.md`; update that file first if a price or rule changes.

## 1. Profile kit (from ig-profile-optimizer)

| Part | Set it to | Why |
|---|---|---|
| Profile photo | `profile/profile-picture.png` (logo mark on mint, made for the circle crop) | A brand account has no face to show; the mark reads at 56px and matches the site |
| NAME field | `MyClearDeal \| Car Buying Help` (29 of 30 chars) | Instagram search indexes the NAME field, not the @handle. "Car Buying Help" is what people type |
| @handle | `@mycleardeal` if it is free | Matches the domain. Avoid numbers and underscores |
| Category | Automotive Consultant (or the closest automotive service category Instagram offers) | Shows under the name and backs up the bio |
| Bio (125 of 150 chars) | We negotiate your next car: price, fees and trade-in. You just sign.<br>$995 flat. $0 for heroes.<br>Free dealer quote review below | Says what a follower gets, the price and one proof point, and points to the link |
| Link | mycleardeal.com/start as link 1, mycleardeal.com/heroes as link 2, mycleardeal.com/#review as link 3 | Business accounts can add several links, but the top one gets the click, so it goes to booking |
| Highlights (in this order) | Start Here · Heroes · How It Works · Quote Review · FAQ · Español | Ordered by the visitor's next question. Use one-word names so they don't truncate |
| Pinned posts | Hero announcement reel · Hero launch carousel · "We negotiate. You just sign." carousel | The 3 best answers to "what is this, and is it for me?" |

Spanish bio, if you run a second line or a Spanish highlight: "Negociamos tu próximo auto: precio, cargos e intercambio. Tú solo firmas. $995 fijo. $0 para héroes." (100 chars)

**Header test:** someone reading only the photo, name, bio, link and first row should know this is a remote car negotiator with a flat fee who works for the buyer, and that heroes pay $0. Read it fresh once it's live and check.

**First-9 grid after the first two weeks** (newest first): written recap reel, Dealer vs. carousel, Programa Héroes reel, Hero launch carousel, Hero announcement reel, Send us your quote reel. Every tile uses the same mint or ink backdrop and the same type, so the grid reads as one set. The reel covers keep their text between y=300 and y=1360, inside the 3:4 crop the profile grid shows.

## 2. What the skills changed in the launch set

| Skill rule | What we changed |
|---|---|
| The hook is line 1 and stands alone before the 125-character fold | Every caption now opens with its hook, 57 to 120 characters |
| 3 to 5 sized hashtags, in the first comment | Was 10 to 11 per post; now 5 per post (2-3 niche, 1-2 mid, 1 broad), rotated by topic |
| No engagement bait ("tag 3 friends") | "Tag a hero" became "Send this to a hero" (sends are the strongest ranking signal). Folder renamed `06-send-to-a-hero` |
| A Reel is decided in the first 1 to 3 seconds | Every reel shows its hook text on frame 1. The Hero reel now opens with "Your car negotiator is on us." instead of a title |
| The last slide is a summary plus one ask | How it works, What $995 gets you and Do I qualify now end on a one-line recap with a save ask |
| Slide 1 is a promise, not a title | "What $995 gets you" now promises "6 things that one fee covers, one per slide" |
| 4 to 5 feed posts a week plus daily Stories | The 13 posts now run Nov 27 to Dec 18, with a Stories plan and timed slots |
| Pillars: education, story, engagement, promotion | MyClearDeal pillars set: Buyer education 40%, Proof and stories 25%, Heroes 20%, Offer 15% |
| Never invent a number or story | Example figures come only from the site and are labelled "Example deal". The Proof slot waits for a real deal from you |

Kept as MyClearDeal rules where the upstream skills are looser:
- **Dashes:** zero em and en dashes. Upstream allows about one per 100 words.
- **Case:** sentence case. Upstream allows lowercase sentence starts.
- **Words:** "fair" and all financing words are banned.

## 3. Making new content

Ask in plain words. The `mycleardeal-instagram` skill picks the right tool:

- "Write a caption for a Reel about doc fees." Uses the caption writer: hook first, one ask, 5 hashtags.
- "Plan a carousel: 4 dealer quote lines to question before you sign." Uses the carousel planner, then builds the slides in `src/carousels.js` and renders them.
- "Plan next week's posts." Uses the content planner with the MyClearDeal pillars and idea bank (`.claude/skills/ig-content-planner/references/mycleardeal-pillars.md`).
- "Check this caption before I post it." Runs the humanizer audit plus the brand check.
- "Here's a post I like: [paste the caption]. What makes it work?" Uses the hook extractor and gives you a template for your topic.
- "Turn the calculator page into a post." Uses the repurposer.

Render commands (from `marketing/social/src/`):
- `node render-carousels.js`: carousels.
- `node render-reels.js` then `node check-reels.js`: reels, plus the safe-zone check.
- `node contact-sheet.js`: refreshes the review grid.

## 4. What these skills can't do here (and what it would take)

| Upstream feature | Status | To turn it on |
|---|---|---|
| Auto-posting via Publora | Not set up. Drafts only; you post in Instagram or Meta Business Suite | A Publora account and API key, plus a Business or Creator Instagram account |
| Niche and competitor data via Apify | Not set up. Paste captions or numbers in and the skills work from those | An Apify token |
| AI image generation via Pixfaro | Removed. Images are built in-house from the brand templates | Not recommended: it would drift from the site's look |

## 5. Things only you can supply

- **Real customer stories, reviews or savings numbers**, with the client's OK. These fill the Proof pillar. The site has none published yet.
- **Your target area.** The hashtags use Orlando and Central Florida, but the site doesn't name a service area and your phone number is a 561 (Palm Beach) number.
- **Your Instagram handle**, to stamp on future slides.
- **Instagram Insights after 30 days**, to replace the default posting times with your audience's real ones.
