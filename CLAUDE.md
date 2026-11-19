# Site Polish

This folder holds the owner's own websites. Each one gets a polished demo
built with the bundled skills in `.claude/skills/`.

## Layout

- `sites.md`: the queue of site URLs, which the owner fills in
- `sites/<slug>/before/`: capture of the live site (`page.html`, `desktop.png`, `mobile.png`)
- `sites/<slug>/notes.md`: audit findings and what changed
- `demos/<slug>/index.html`: the polished demo, a self-contained static page
- `demos/<slug>/after-desktop.png`, `after-mobile.png`: screenshots of the demo
- `scripts/capture.js <url> <outDir>`: Playwright capture of any URL or local file

`<slug>` is the domain with dots replaced by dashes, for example `my-site-com`.

## Entry point

Use the `polish` skill (`/polish <site> <what to change>`) for every website request. It routes
to the specialist skills and follows the workflow below.

## Workflow for each site in `sites.md` → Queue

1. **Capture**: `node scripts/capture.js <url> sites/<slug>/before`
2. **Audit**: look at the screenshots and the HTML.
   - `impeccable` (critique / audit): design problems, AI slop, accessibility
   - `taste-skill`: copy, layout system, hero, and the "does this look generic" check
   - `find-animation-opportunities` and `review-animations`: motion that is missing or wrong
   - `break-ui`: worst-case content on the key components
   - Write the findings to `sites/<slug>/notes.md`, ranked by impact.
3. **Polish**: build `demos/<slug>/index.html`.
   - Keep the site's real content, brand, colors and logo. This is a polish, not a new brand.
   - Apply the `impeccable` polish pass, `taste-skill` structure and finish gate,
     and the `emil-design-eng` / `animate` / `choreograph` rules for motion
     (purposeful, interruptible, respects `prefers-reduced-motion`).
   - Use `mobile-native` for the phone layout.
4. **Verify**: `node scripts/capture.js file://$PWD/demos/<slug>/index.html demos/<slug>`,
   then rename the files to `after-*.png`. Compare them with the `before` captures and fix any regressions.
5. **Present**: publish the demo as an Artifact so it can be opened in a browser,
   with a short before/after summary. Move the URL to "Done" in `sites.md`.

## Rules

- Never change the live site. Everything stays local in this folder.
- If the site's source code is in a repo, polish it there instead (on a branch)
  and only ask before opening a pull request.
