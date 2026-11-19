# site-polish

Workspace for polishing my websites with Claude Code.

- `/polish <site> <what to change>`: the one entry point. It reads the request, picks the right
  skills and delivers a before/after demo. See `.claude/skills/polish/SKILL.md`.
- `sites.md`: the site queue.
- `CLAUDE.md`: the workflow.
- `scripts/capture.js`: desktop and mobile screenshots of a URL.

Bundled skills (in `.claude/skills/`, each keeps its own license):
- [emilkowalski/skills](https://github.com/emilkowalski/skills): 20 animation and design-engineering skills
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable): `impeccable`
- [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill): `taste-skill`
- [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): `ui-ux-pro-max` (searchable palettes, font pairings, UX and accessibility rules)
