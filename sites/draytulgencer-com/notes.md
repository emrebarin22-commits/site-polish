# draytulgencer.com

Dr. Aytül Gençer's personal physician site (Turkish): longevity and functional medicine in Maslak.
Sister site aglongevity.com handles the score test and campaigns; this site is the doctor's identity,
services and the canonical home of the 90 blog posts.

## Capture

2026-11-19: the live site could not be captured. This environment's network proxy refuses
draytulgencer.com (CONNECT 403), so `sites/draytulgencer-com/before/` holds a blank capture.
No before/after comparison exists; `demos/draytulgencer-com/overview.jpg` shows the new page instead.

## 2026-11-19: /polish "make a new website using the md file", built from scratch

Source: only the owner's site summary (`draytulgencer-site-ozeti.md`, 19 Nov 2026). No code, images,
logo or colours were taken from the live site or from the aglongevity demo, at the owner's request.

Demo: `demos/draytulgencer-com/index.html` (one self-contained file; Google Fonts is the only external load).

Skills used
- taste-skill: service page plan, copy rules (copy-lint: 0 FAIL), hero entrance plus one dealt moment, hover layer.
- impeccable: visual system (one button pair, one card style, one radius scale) and the critique pass on screenshots.
- emil-design-eng / animate: entrance timing, strong ease-out, press to 0.97, hover only on hover devices.
- mobile-native: full-screen menu, sticky bottom bar with safe-area padding, 16px inputs, no tap highlight.
- ui-ux-pro-max (pre-delivery): contrast, 44px targets, focus rings, reduced motion, no horizontal scroll.

Page (home), sections in order
1. Hero: the site's own line "Takvim yaşınız sabit. Biyolojik yaşınız değil.", Randevu al / Sizi arayalım,
   education in one line. Visual: the Yıllık Takip 12-month calendar drawn as a ring (start, 3rd month online,
   6th month exam and panel, 9th month online, 12th month plan update), built from the protocol facts.
2. "Her adımda aynı hekim" (dark band): the continuity promise, 40+ years, education, fields, Cleveland Clinic.
3. Three protocols (Keşif, Yıllık Takip, Bütüncül Takip) with what is and isn't included; no prices, as on the live site.
4. Treatments list + the blood panel (separate women's and men's panels, 40+ tests, optional add-ons).
5. Patient journey, 5 steps; the line fills step by step when it reaches the screen (the dealt moment).
6. Blog: 38 condition posts (topic chips) and 52 general posts, plus what every post contains.
7. Clinic and contact: address, hours, phone/WhatsApp, e-mail, Instagram, directions; the "Sizi arayalım" form
   validates under each field and sends the request as a pre-filled WhatsApp message.
8. FAQ (native details, animated open), footer with KVKK link; Physician JSON-LD with hours and clinic.

Design
- Type: Newsreader (serif, headings) + Figtree (text); both cover Turkish characters.
- Colour: warm paper #f5f2ec, forest #173a31, leaf #2b6b59, clay #b4643c used only for "online" markers.
  The AG Longevity petrol/turquoise was deliberately not reused (from-scratch brief); swap tokens in `:root` to align.
- Mark: a typographic "AG" monogram, standing in for the real logo file.

Verified
- 320/390/768/1024/1440: no horizontal scroll; no console errors.
- Mobile menu opens full-screen, closes on Escape and link tap; sticky bar hidden on the hero, the form and the footer.
- Reduced motion: everything visible, journey shown complete.

Not done, and why
- No photographs: the md has none. The page needs a portrait of Dr. Gençer and clinic photos to finish;
  a portrait would sit best in the "Her adımda aynı hekim" band.
- Only the home page was built; inner pages (hizmetler, hakkımda, blog, yazı, randevu, iletişim) link to the live URLs.
- Blog post titles and covers were not in the md, so the blog block lists topics, not individual posts.
- The Wix Bookings embed and the live arayalim.js backend are not reproduced; the form uses WhatsApp instead.
- The live site was not changed.
