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
