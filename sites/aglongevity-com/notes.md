# aglongevity.com

Captured 2026-11-19 from https://www.aglongevity.com (home page). Turkish, service site for
Dr. Aytül Gençer's longevity clinic in Maslak. Goal of the page: start the free 12-question
Longevity Skoru (`skor.html`).

## Audit, ranked by impact

Skills used: impeccable (critique, audit, adapt), taste-skill (copy tells, page plan for a
service business), find-animation-opportunities / review-animations, mobile-native, ui-ux-pro-max
pre-delivery rules.

### 1. The hero has no person in it (high)
A doctor-led clinic with 40+ years of practice opens with a quiz headline, a decorative arc and
a figure strip. Dr. Gençer appears only as a 48px avatar near the bottom of the page. Her
credentials (Dokuz Eylül Tıp, Cleveland Clinic functional medicine training, 40+ years) exist
only in the JSON-LD, not on the page. This is the main reason the page feels generic rather than
premium and personal.
**Fix:** put her portrait and credentials in the hero, beside the quiz headline.

### 2. On mobile the cookie banner covers the hero button (high)
On a 390px phone the banner sits over the primary "Teste başla" button and the figures.
The first thing a phone visitor can tap is "Kabul et", not the test.
**Fix:** a compact banner pinned to the bottom with safe-area padding, below the hero's call to action.

### 3. The patterns that read as AI-made (high, the user's main complaint)
- An italic accent word in **every** section heading (5 of 5): *kaç yaşında?*, *kişisel plana*,
  *beş durak.*, *edilenler*, *kendinize*. Once is a signature; five times is a template.
- A small caps label with a leading rule above every section (ÜCRETSİZ · 3 DAKİKA, NASIL ÇALIŞIR?…).
- The strip of three figures under the hero (12 / Anında / Ücretsiz), the most common pattern on
  model-made pages.
- An arrow after every button label, primary or not.
- A decorative arc with a dot that carries no meaning.
- Two-fragment headings: "Bir yıl, beş durak."
**Fix:** keep the italic only in the hero, drop the labels and the strip, say the facts in a
sentence, keep the arrow only on the primary action, and use the logo's own two rings instead of the arc.

### 4. One action, four names (medium)
"Teste başla", "Skorumu öğren", "Skorunu öğren", "Önce skorunuzu öğrenin" all go to `skor.html`.
**Fix:** one label, "Skorumu öğren", everywhere.

### 5. Mobile layout (medium)
- The page is about 7,400px tall on a phone. The process steps, the dark score block and the
  12-month plan each take more than a screen.
- Three stacked full-width outline buttons under the 12-month plan.
- No call to action is reachable once the hero scrolls away.
- The h1 breaks as "Hücreleriniz kaç / yaşında?", leaving the italic word stranded.
**Fix:** tighter vertical rhythm, the score block's ring beside the copy, one secondary link instead
of three buttons, a sticky bottom "Skorumu öğren" bar after the hero, `text-wrap: balance` on headings.

### 6. Motion (medium)
Almost none on the home page. The one strong idea, the 68/100 score ring, is static.
**Fix:** a once-per-visit hero entrance (Emil choreography: 0.5–0.6s steps, about 100ms apart),
the score ring filling to 68 when it scrolls into view (the page's one dealt moment), smooth
FAQ open and close, press feedback on buttons, hover only on hover-capable devices,
everything off under `prefers-reduced-motion`.

### 7. Fragile images (low)
The portrait and clinic photo are hot-linked from `static.wixstatic.com`. When that host fails,
the alt text spills out of a 48px circle ("Dr. Aytül Gençer" broken across three lines).
**Fix:** host the images with the site and give the frame a background colour.

### What is already good (keep)
- The colour system is careful and documented WCAG AA; the petrol / turquoise / champagne palette
  is distinct. Cormorant Garamond with Manrope is a good clinical-elegant pair.
- The 12-month plan is the most original section on the page; the mobile accordion works.
- The FAQ is a native `<details>` list; `prefers-reduced-motion` is already respected globally.

## 2026-11-19: /polish "audit, premium and personal hero, mobile layout and motion, less AI"

Demo: `demos/aglongevity-com/index.html` (open it in a browser; images are local).
Before/after: `demos/aglongevity-com/before-after.jpg`.

Skills used
- impeccable (critique, audit, adapt): the ranked audit above; refinement, not a new brand.
- taste-skill (copy tells, service page plan): what reads as AI-made, a real photograph in the hero, one dealt moment.
- emil-design-eng / animate / choreograph: hero entrance timing, the score ring, press feedback.
- find-animation-opportunities: picked the score ring and FAQ, rejected scroll reveals on every section.
- mobile-native: hover only on hover devices, 44px targets, safe-area insets, tap highlight off.
- ui-ux-pro-max (pre-delivery rules): contrast, touch targets, focus, reduced motion, no horizontal scroll.

Changes
- Layout: the hero is now two columns with Dr. Gençer's portrait and a credentials card
  (40+ years, Cleveland Clinic functional medicine, Dokuz Eylül), all facts from the site's own data.
  The doctor section became a short statement with the clinic, the consultation and contact.
  The 12-month plan keeps its five cards; the three stacked buttons under it became two text links.
- Copy: removed the section labels, the figure strip and four of the five italic accent words;
  the hero's facts now sit in one sentence. One action name everywhere: "Skorumu öğren".
  Two-fragment heading "Bir yıl, beş durak." became one line.
- Type: same fonts, larger hero (up to 96px) with `text-wrap: balance`; the italic stays only in the hero.
- Color: unchanged tokens. Gold now marks only the doctor's byline.
- Motion: hero enters once (about 100ms steps, strong ease-out, portrait unmasks, the logo's two
  rings draw behind it); the score ring fills to 68 and counts up when it reaches the screen;
  FAQ and plan panels open smoothly; buttons press to 0.97. All off under reduced motion.
- Mobile: the cookie bar sits under the hero's button instead of over it; a sticky "Skorumu öğren"
  bar appears after the hero (hidden near the final call and the footer); steps become a vertical
  timeline; the score ring moves above its copy; the page is about 6,600px tall instead of 7,400px.

Not done, and why
- The live site was not changed. To apply this, copy the hero, CSS and script into the site's own
  files (`index.html`, `css/site.css`, `js/site.js`).
- The portrait is hosted locally in the demo; the live site should host it itself rather than hot-link Wix.
- The cookie bar in the demo does not store the choice; keep the live site's consent logic.
