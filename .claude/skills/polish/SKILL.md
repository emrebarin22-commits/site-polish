---
name: polish
description: One entry point for website changes. Takes a plain-language request about a site ("make the hero feel premium", "the mobile menu is janky", "polish turkanomad.com", "add motion to the pricing cards"), decides which of the bundled design skills apply (impeccable, taste-skill, ui-ux-pro-max, and Emil Kowalski's animation and design-engineering skills), reads only those, applies them in the right order, and delivers one finished result with a before/after demo. Use whenever the user asks to change, polish, redesign, review or animate one of their websites.
argument-hint: "[site url or slug] [what to change]"
---

# Polish: one router over four skill repos

The user describes a change in their own words, in any language. You turn it into one finished
output. The specialist skills live next to this one in `.claude/skills/`. Call them by
reading their `SKILL.md` (`../<name>/SKILL.md`, relative to this folder) or through the Skill tool.
Load only the ones the request needs. Never dump all of them.

## 1. Understand the request

Work out four things from the prompt and from `sites.md` / `sites/<slug>/notes.md` if they exist:

- **Target**: which site (URL or slug), which page, which part (hero, nav, cards, forms, the whole page).
- **Intent**: one or more from the routing table below.
- **Scope**: a small fix (one component), a polish pass (the whole page, same design), or a redesign (new layout, same brand).
- **Constraints**: brand colors, fonts, copy that must stay, the language of the site.

If the target is unclear, ask one short question. Otherwise proceed and state your reading in one line.

## 2. Route to the skills

| The user says something like… | Intent | Read these, in this order |
|---|---|---|
| "polish", "make it better", "looks off", "clean it up" | polish | `impeccable` → `reference/polish.md`, then `taste-skill` finish gate |
| "looks generic", "AI-made", "templated", "redesign", "new landing page" | redesign | `taste-skill` (main flow), then `impeccable` → `reference/critique.md` on the result |
| "review", "what's wrong", "audit", "critique", "score it" | review (no edits) | `impeccable` → `reference/critique.md` + `reference/audit.md`, `find-animation-opportunities`, `review-animations` |
| "bolder", "more personality", "too plain" | bolder | `impeccable` → `reference/bolder.md` (also `colorize.md`, `typeset.md` if relevant) |
| "too busy", "calmer", "too loud" | quieter | `impeccable` → `reference/quieter.md` / `distill.md`, `remove-animations` |
| "fonts", "typography", "text looks bad" | type | `impeccable` → `reference/typeset.md`, `ui-ux-pro-max` font-pairing search, `apple-design` (typography section) |
| "spacing", "layout", "alignment", "grid" | layout | `impeccable` → `reference/layout.md`, `taste-skill` → `references/layout-v4.md` |
| "colors", "palette", "dark mode" | color | `impeccable` → `reference/colorize.md`, `ui-ux-pro-max` color search (contrast and dark-mode rules) |
| "accessibility", "contrast", "keyboard", "screen reader" | accessibility | `ui-ux-pro-max` (`ux` domain, one outcome per query), `impeccable` → `reference/audit.md` |
| "forms", "sign-up", "errors", "validation" | forms | `ui-ux-pro-max` (`ux` domain: forms and feedback), `break-ui` |
| "menu", "navigation", "can't find things" | navigation | `ui-ux-pro-max` (`ux` domain: navigation), `impeccable` → `reference/layout.md` |
| "charts", "graphs", "dashboard numbers" | charts | `ui-ux-pro-max` (`chart` domain) |
| "what style fits my product", "pick a direction" | direction | `ui-ux-pro-max` `--design-system` for candidates, then `taste-skill` decides |
| "animate", "add motion", "feel alive", "transition" | add motion | `find-animation-opportunities` → `animate` → `choreograph` (if several elements) |
| "animation feels wrong / cheap / slow" | fix motion | `review-animations` → `emil-design-eng` → `animate` |
| "too much animation", "feels slow" | remove motion | `remove-animations` |
| "janky", "stutters", "drops frames" | performance | `animation-performance`, `impeccable` → `reference/optimize.md` |
| "drag", "swipe", "sheet", "drawer", "carousel" | gestures | `gestures`, `apple-design`, `pick-ui-library` |
| "on my phone", "mobile", "notch", "zooms in" | mobile | `mobile-native`, `impeccable` → `reference/adapt.md` |
| "edge cases", "long names", "break it" | stress test | `break-ui`, `impeccable` → `reference/harden.md` |
| "show me options", "a few versions" | variants | `prototype` |
| "toast", "notification popup" | toasts | `ask-sonner`, `pick-ui-library` |
| "which library for…" | library | `pick-ui-library` |
| "what's that effect called" | vocabulary | `animation-vocabulary` |
| "remember this", "always do X" | learn | `learn-taste` (write the rule into `CLAUDE.md` or the site's notes) |
| React Native / Expo app | native motion | `animate-expo` |
| Swift / iOS code | swift | `write-swift`, `impeccable` → `reference/ios.md` |

Rules for combining:
- **Structure before surface before motion.** Layout and copy (taste-skill, impeccable) first,
  then type and color, then motion (Emil's skills), then mobile and edge cases.
- When two skills disagree, the more specific one wins for its area: Emil's skills for motion,
  taste-skill for page structure and copy, impeccable for the visual system, critique and audit.
- Every motion change respects `prefers-reduced-motion` and only animates `transform` / `opacity`
  unless a skill says otherwise.
- Keep the site's real content, language, brand colors and logo unless the user asks to change them.
- `ui-ux-pro-max` is the lookup layer: palettes, font pairings, UX and accessibility rules,
  stack notes. It supplies options and checks. It does not choose the page direction (taste-skill
  and the existing brand do), and its GSAP presets never override Emil's motion rules.
  Run its search from the repo root: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>`
  (its own docs use `${CLAUDE_PLUGIN_ROOT}`, which is not set here). Don't use `--persist` unless the
  user wants a design-system file; if so, write it under `sites/<slug>/`.

## 3. Do the work

1. **Capture the current state** if there is no fresh capture:
   `node scripts/capture.js <url> sites/<slug>/before` (from the `site-polish` folder).
   If the page is a JavaScript app, check that the screenshot is not blank before going on.
   If the host is blocked by the network, say so and ask before changing the environment.
2. **Get the source**: if the user has the site's repo, edit it there on a new branch.
   Otherwise rebuild the relevant page as a self-contained `demos/<slug>/index.html`
   from the captured HTML, CSS and screenshots.
3. **Apply** the routed skills in the order above. Follow each skill's own steps and checks.
4. **Verify**: screenshot the result on desktop and mobile
   (`node scripts/capture.js file://$PWD/demos/<slug>/index.html demos/<slug>`), compare it with
   `before/`, fix regressions, and run taste-skill's finish gate when the page was rebuilt.
   Then go through `ui-ux-pro-max` → `references/pro-rules.md` (pre-delivery checklist):
   contrast, 44px touch targets, focus states, reduced motion, no horizontal scroll.

## 4. Deliver one final output

- The changed files (or `demos/<slug>/index.html`) plus a `before-after.jpg`, sent to the user as files.
  A demo carries a real brand, so do not publish it as a public page unless the user asks.
- A short summary for the user, in their language:
  - what you understood they wanted (one line)
  - which skills you used and why (one line each)
  - the changes, grouped as Layout / Type / Color / Motion / Mobile, most visible first
  - anything you chose not to do, and why
- Append the same summary, with the date, to `sites/<slug>/notes.md` so later requests build on it.
