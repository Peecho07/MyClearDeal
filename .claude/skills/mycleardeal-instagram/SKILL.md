---
name: mycleardeal-instagram
description: "Entry point for MyClearDeal Instagram and Facebook content: captions, carousels, Reels, hooks, hashtags, weekly plans, profile audits and AI-tell scrubs, all in the MyClearDeal voice with the brand's hard copy rules. Use whenever the owner asks for MyClearDeal social content or wants a post reviewed. Routes to the ig-* skills in this folder. Draft only: nothing publishes."
---

# MyClearDeal Instagram content

Adapted from [sergebulaev/instagram-skills](https://github.com/sergebulaev/instagram-skills) (MIT, see
`../LICENSE-instagram-skills.txt`) for MyClearDeal. The upstream research (hook formulas, 2026 ranking
signals, sized hashtags, humanizer passes) is kept; publishing, data scraping and image generation were
removed because none of them is set up for this account.

## Read first, every time

1. `../../references/mycleardeal-brand.md`: facts, hard copy rules and visual system. **It wins over every other file.**
2. `../../references/voice-profile.md`: how MyClearDeal sounds.
3. `../../references/hook-formulas.md` and `../../references/algorithm-heuristics.md`: what earns saves and sends.

## Route the request

| The owner wants | Use |
|---|---|
| A caption for a post or Reel | `ig-caption-writer` |
| A carousel planned slide by slide | `ig-carousel-planner`, then build it in `marketing/social/src/carousels.js` |
| A Reel scripted | hook formulas IG9/IG10, then build it in `marketing/social/src/reels.js` |
| Hashtags | `ig-hashtag-strategist` + `mycleardeal-hashtag-bank.md` |
| A week or month of posts | `ig-content-planner` + `mycleardeal-pillars.md` |
| A draft checked before posting | `ig-humanizer --mode audit`, then the brand check below |
| The profile (bio, name, highlights, pinned posts) | `ig-profile-optimizer` (current kit: `marketing/social/instagram-playbook.md`) |
| A post they admire, reverse-engineered | `ig-hook-extractor` (owner pastes the caption or slide text) |
| A website section or email turned into a post | `ig-repurposer` |
| Niche or competitor numbers | `ig-audience-insights` in pasted-data mode only (no Apify token) |

## Brand check before anything is shown to the owner

- [ ] No em dash (—) or en dash (–). Search the text for both characters.
- [ ] No "fair", no financing words, no hype words.
- [ ] MyClearDeal spelled correctly; slogan "Car Buying Made Clear"; main line "We negotiate. You just sign."
- [ ] Every price, rule and example number matches `mycleardeal-brand.md`; examples are labelled "Example deal".
- [ ] Hook under 125 characters and readable alone; one idea; one ask with a reason.
- [ ] 3-5 sized hashtags for the first comment.
- [ ] Media named (which PNG or MP4 to attach) and within limits: 4:5 carousels, 1080x1920 Reels with clear top and bottom 250px.

## Approval

Show the draft and wait. Nothing is posted from here: the owner posts in Instagram or Meta Business Suite.
