# turkanomad.com

## Audit (2026-11-19), ranked by impact

1. **Professionals are hidden.** The live app already has a per-city experts directory
   (`#/sehir/<city>/uzmanlar`, RPC `tn_public_experts`), but it is three taps deep, and the
   "Uzman olarak başvur" sign-up goes to Profil. There is no top-level way to browse by city or field.
2. **Admin is ads-only.** `#/yonetim/reklam` (RPC `tn_ad_admin`) only moderates ads. There is no queue
   for expert applications, members, reports or city status.
3. **Looks templated / AI-made.** The first screen is a uniform grid of 27 identical photo cards with
   no headline saying what the site is. Uppercase eyebrow labels everywhere ("HOLLANDA", "BİRLEŞİK KRALLIK").
   The brand red (#c92132 favicon / #a3151b token) is used almost nowhere and the in-app logo is black.
4. **Feels sluggish.** The whole app scrolls inside a fixed `100dvh` grid with absolutely positioned tabs,
   so the mobile address bar never collapses and momentum scroll feels off. Counts render as "– burada –
   yakında" until Supabase answers, which reads as broken. Pages swap instantly with no state transition,
   and loading shows "Yükleniyor…" text.
5. **Mobile.** The "Şehir seç" + segmented control row takes a quarter of the phone screen before any city shows.

## Changes (2026-11-19): demo `demos/turkanomad-com/index.html`

Request: "looks sluggish and AI-made; add an admin panel and a professionals tab for sign-ups and browsing in each city".
Skills: impeccable (Operate mode, craft floor), taste-skill (copy/hero and anti-generic check), Emil's motion rules, mobile-native.

- **Layout:** a real headline + one-line pitch + 3 stats on Keşfet. The 4 open cities are large photo cards;
  the other 23 are a compact "waiting to open" list. City pages get Rehber / Profesyoneller / Etkinlikler tabs.
- **New Profesyoneller tab** (desktop nav + mobile bottom bar): city select, search, field chips with counts,
  verified badge, contact + website actions, empty state that links to sign-up for that city.
- **Sign-up flow** `#/profesyoneller/kayit`: name, e-mail, field, city, short intro (160 chars), languages,
  website, optional document, consent; inline validation, progress bar, then an "İncelemede" status page.
- **Yönetim panel** `#/yonetim`: overview (pending counts, pros per city, activity log), Başvurular
  (approve / reject with reason), Profesyoneller (verify, hide), Üyeler (block), Raporlar, Reklamlar, Şehirler
  (open/close a city community). Approving an application puts it straight into the city listing.
- **Type/colour:** Montserrat kept; tighter display tracking, tabular numbers, no uppercase eyebrows.
  Brand red now carries the logo mark, active nav, primary actions and the headline accent. Dark mode added.
- **Motion:** 240 ms view fade+rise, 2px card lift and 1.03 photo zoom (hover devices only), button press
  scale, row slide-out on approve; all off under `prefers-reduced-motion`.
- **Speed/feel:** normal document scroll (no fixed-height scroller), sized lazy images, instant local filtering.
- **Mobile:** 5-item bottom bar with safe-area padding, 16px inputs (no zoom), admin tables become cards.

Not done: the live backend. Professionals and admin data in the demo are fictional and kept in the browser.
To ship it, the real app needs a `tn_expert_apply` / `tn_expert_admin` RPC pair and an admin role check
(the existing `tn_ad_admin` gate can be reused).

## Changes (2026-11-21): second round of requests

Request (TR): remove the List view; always show weather and ratings on the city cards; working profile photo
and notifications; make the city's Uzmanlar / Etkinlikler / Rehber sections more visible; put the links inside a
city into clear boxes; show active-user counts next to the dots on the map; new hero text; bring Kulüp back as a waitlist.

- **Keşfet:** only Şehirler (grid) and Harita now. Every card shows weather (°C + icon) and the member rating
  (★ average) at all times, on large cards as chips over the photo and on small cards under the name.
- **Hero text:** "… Türkçe konuşan profesyonellere ulaş. Ücretsiz bir şekilde üye ol!"
- **Map:** zoomed in on Europe; the 4 cities outside it sit at the edge. Each dot has its name and "N aktif" next to it.
  Labels are placed automatically so none overlap (verified: 0 overlapping pairs), with a leader line when a label sits away from its dot.
- **Top bar:** notification bell (unread badge, list, mark one or all as read, click goes to the page) and a profile
  avatar menu (upload a photo, cropped to a 160px square and stored in the browser; remove photo; links to profile, application, Kulüp, admin).
  New notifications are created on application submitted/approved/rejected, rating saved, and joining the Kulüp list.
- **City page:** Rehber / Uzmanlar / Etkinlikler are now three large tiles with an icon and a count; the active one is filled.
  Rehber shows boxes for weather, community, member ratings (4 criteria, with a working 1–5 star "Şehri puanla" form),
  "Bu şehirde" link boxes (experts, events, community, travel plan) and news links in boxes.
- **Kulüp tab (desktop nav + mobile bar):** "Yakında" premium membership page with the live site's planned-perks copy and
  a waitlist form (name, e-mail, city, interest) that shows your place in line and lets you leave. Admin has a new
  "Kulüp listesi" section with interest totals, removal and CSV export.

Demo only: weather, ratings, counts and the waitlist number are sample data. On the live site, weather comes from MET Norway,
ratings from tn_city_ratings (shown only after 3+ votes), and the waitlist needs a new table + RPC.

## Changes (2026-11-21): Seyahatler moved into Profil

- Seyahatler is no longer a tab (removed from the desktop nav and the mobile bottom bar, which is back to 5 items:
  Keşfet, Topluluk, Uzmanlar, Kulüp, Profil).
- It stays as an option: a "Seyahatlerim" box on the Profil page and a "Seyahatlerim" item in the avatar menu.
  The page itself (`#/seyahatler`) has a back link to Profil and keeps Profil highlighted in the nav.
  The "Gelme planı ekle" box on city pages still opens it.

## 2026-11-21: rebuilt as a real site in its own repo

The site now lives in https://github.com/emrebarin22-commits/turkanomad (branch `main`):
Vite front end in the demo's design + Supabase backend (`supabase/migrations/0001_init.sql`),
strong-password sign-up with required terms/KVKK consent, legal pages, data export and account deletion.
Future changes to turkanomad.com go there, not into demos/turkanomad-com. Setup steps are in that repo's README.

## 2026-11-24: polish pass ("elden geçir") on the TURKANOMAD repo

Branch `polish/2026-11-24` in emrebarin22-commits/TURKANOMAD (not yet merged into `main`).
Skills: impeccable polish playbook (states, contrast, focus, responsive). taste-skill's finish gate was not run:
it checks pages built with its own kit, which this app does not use.
Checked 17 routes × desktop, tablet, phone and dark mode, as guest and member, with automatic checks
(console errors, overflow, tap targets, unlabelled controls, alt text, headings) plus keyboard Tab order.

- Bug: `[hidden]` lost to component display rules, so the city rating form was always open and the bell badge
  could show with nothing unread. Fixed globally.
- Bug: a focus ring was drawn around the whole page after each navigation (thin white line under the content in dark mode).
- Colour: dark-mode buttons now use a deeper red fill token (`--red-fill`) so white text passes contrast.
- Structure: Profil has a real h1; admin "Belgeyi aç" is a full-size button; logo link is a 44px target.
- Tablet: open-city cards are 4:3 instead of 4:5.
Left as is: small inline text links inside sentences (allowed by WCAG 2.5.8); the demo-mode badge (demo builds only).

## Keşfet design pass (24 Nov 2026, TURKANOMAD `feature/discovery` 3f186c2)

- Live numbers (cities / members / professionals) moved directly under the headline. The intro band, which repeated the hero, is now a photo strip of five cities.
- "Neden TurkaNomad?": the six identical icon cards became a two-column editorial list.
- Map legend fits on one line. Open communities get a soft pulse that is off under reduced motion.
- "Nasıl çalışır" is now a numbered timeline. Sign-up buttons went from 6 to 3 (header, headline, final band).
- Filter chips no longer show the "27/27" coverage counts.
- Fixed a mobile horizontal overflow (legend and map hint) and the gap above the footer.
- Data: Nomads.com was reviewed as a source for internet, rent and trip cost. It was not imported because there is no reuse licence and its metrics don't match the definitions (average crowd-sourced internet speed, rent in the centre). Waiting for the owner to decide.
