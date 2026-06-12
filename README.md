<h3 align="center">
  🌲 Everforest for <a href="https://obsidian.md">Obsidian</a>
</h3>

<p align="center">
  Comfortable & pleasant <a href="https://github.com/sainnhe/everforest">everforest</a> theme for Obsidian —
  a generated port of <a href="https://github.com/catppuccin/obsidian">catppuccin/obsidian</a>.
</p>

## Usage

Manual install:

1. Copy `manifest.json` and `theme.css` into `<your vault>/.obsidian/themes/Everforest/`.
2. In Obsidian: **Settings → Appearance → Themes** and pick **Everforest**.

Or via [BRAT](https://github.com/TfTHacker/obsidian42-brat): **Add a beta theme** → `https://github.com/stellaaash/everforest-obsidian`.

Install the [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin to switch the dark contrast level, pick an accent color, and toggle the theme's other options (icons, fonts, headings, PDF, tags).

## Flavors

Obsidian's base **light/dark** mode picks the polarity; Style Settings picks the dark contrast level.

| Upstream flavor | This port              | Default      |
| --------------- | ---------------------- | ------------ |
| Latte           | Everforest Light       | (light mode) |
| Frappé          | Everforest Dark Soft   |              |
| Macchiato       | Everforest Dark Medium | ✅ (dark mode) |
| Mocha           | Everforest Dark Hard   |              |

Only background colors differ between contrast levels — accents and foreground are shared, per everforest's design.

## How this repo works

This is a **generated port**: everything in `scss/` plus `manifest.json` is produced from a pinned commit of catppuccin/obsidian (`UPSTREAM_COMMIT`) by the codemod in `scripts/port/`. **Never hand-edit `scss/`** — one-off fixes go into the codemod's `TEXT_FIXES`/rules so the port stays reproducible.

- `deno task port` — regenerate `scss/` + `manifest.json` from the pinned upstream tree (includes a post-check that no catppuccin reference survives)
- `deno task build` — compile `theme.css` (sass, pinned at upstream's version)
- `deno task check` — both

Syncing with upstream:

```sh
git fetch upstream-remote
git push origin upstream-remote/main:upstream   # advance the pristine mirror branch
git rev-parse upstream-remote/main > UPSTREAM_COMMIT
deno task check                                  # regenerate + rebuild
git diff                                         # review, then commit
```

## Palette mapping

The 26 upstream color slots keep their names (`--efs-rosewater` … `--efs-crust`) so the port stays mechanical. Exact values and the slot rules live in [`scripts/port/palette.ts`](scripts/port/palette.ts); 7 accent slots have no everforest equivalent and are derived from exact anchors (formulas noted per color). Chromatic values are shared with the sibling port [everforest-userstyles](https://github.com/stellaaash/everforest-userstyles).

## Credits & license

- [catppuccin/obsidian](https://github.com/catppuccin/obsidian) — the original theme this port is generated from; all structural and component styling is theirs.
- [sainnhe/everforest](https://github.com/sainnhe/everforest) — the everforest color scheme.

MIT, retaining Catppuccin's copyright — see [LICENSE](LICENSE).
