/**
 * The everforest palette, mapped onto the 26 semantic slots used throughout
 * the upstream catppuccin/obsidian theme (slot names kept from upstream so
 * the port stays mechanical).
 *
 * Sources of exact values:
 * https://github.com/sainnhe/everforest/blob/master/palette.md
 *
 * Flavor model: upstream's four flavors map by contrast level —
 * latte -> light (medium contrast), frappe -> soft, macchiato -> medium,
 * mocha -> hard. Everforest chromatic colors (accents, fg, greys) are
 * identical across contrast levels; only the background slots differ.
 *
 * 7 of the 14 accent slots have no everforest equivalent and are derived
 * from exact anchors; formulas are noted per color. RGB mixes are LESS
 * mix() semantics (channel-weighted average); "arc" is an HSL interpolation
 * taking the short hue arc (used where RGB mixing would pass through grey).
 * Chromatic values are shared with the sibling port
 * stellaaash/everforest-userstyles (scripts/port/palette.ts there).
 */

export const slots = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
  "text",
  "subtext1",
  "subtext0",
  "overlay2",
  "overlay1",
  "overlay0",
  "surface2",
  "surface1",
  "surface0",
  "base",
  "mantle",
  "crust",
] as const;

export type Slot = (typeof slots)[number];

/** Slots that upstream duplicates as `--hex-*` variables (in this order). */
export const hexSlots = [
  "pink",
  "mauve",
  "red",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
] as const satisfies readonly Slot[];

export type Flavor = "light" | "soft" | "medium" | "hard";

export const flavors = ["light", "soft", "medium", "hard"] as const;

type ChromaticSlot = Exclude<
  Slot,
  "surface2" | "surface1" | "surface0" | "base" | "mantle" | "crust"
>;
type BgSlot = Exclude<Slot, ChromaticSlot>;

/** Contrast-invariant colors, one set per polarity. */
const chromatic: Record<"light" | "dark", Record<ChromaticSlot, string>> = {
  light: {
    rosewater: "#DA9889", // derived: lighten(desaturate(spin(red, 10), 40%), 5%)
    flamingo: "#E16B68", // derived: desaturate(red, 25%)
    pink: "#E86296", // derived: mix(mauve, red, 65%)
    mauve: "#DF69BA", // purple
    red: "#F85552", // red
    maroon: "#F76343", // derived: mix(red, peach, 65%)
    peach: "#F57D26", // orange
    yellow: "#DFA000", // yellow
    green: "#8DA101", // green
    teal: "#35A77C", // aqua
    sky: "#379F99", // derived: arc(teal, blue, 60%)
    sapphire: "#389AAF", // derived: arc(blue, teal, 70%)
    blue: "#3A94C5", // blue
    lavender: "#6D4ED2", // derived: arc(blue, mauve, 55%)
    text: "#5C6A72", // fg
    subtext1: "#697777", // derived: mix(fg, grey2, 66%)
    subtext0: "#75847C", // derived: mix(fg, grey2, 33%)
    overlay2: "#829181", // grey2
    overlay1: "#939F91", // grey1
    overlay0: "#A6B0A0", // grey0
  },
  dark: {
    rosewater: "#D0B2AD", // derived: lighten(desaturate(spin(red, 10), 40%), 5%)
    flamingo: "#D39193", // derived: desaturate(red, 25%)
    pink: "#DC90A3", // derived: mix(mauve, red, 65%)
    mauve: "#D699B6", // purple
    red: "#E67E80", // red
    maroon: "#E6877C", // derived: mix(red, peach, 65%)
    peach: "#E69875", // orange
    yellow: "#DBBC7F", // yellow
    green: "#A7C080", // green
    teal: "#83C092", // aqua
    sky: "#81BE9F", // derived: mix(teal, blue, 60%)
    sapphire: "#80BCA9", // derived: mix(blue, teal, 70%)
    blue: "#7FBBB3", // blue
    lavender: "#8E8AC8", // derived: arc(blue, mauve, 55%)
    text: "#D3C6AA", // fg
    subtext1: "#C1BCA7", // derived: mix(fg, grey2, 66%)
    subtext0: "#AFB3A3", // derived: mix(fg, grey2, 33%)
    overlay2: "#9DA9A0", // grey2
    overlay1: "#859289", // grey1
    overlay0: "#7A8478", // grey0
  },
};

/**
 * Per-flavor background sets. Slot rule (same as the userstyles port):
 * base=bg0, mantle=bg_dim, surface0=bg1, surface1=bg3, surface2=bg5
 * (light uses the wider bg3/bg4/bg5 spread because light bg1..bg2 are nearly
 * indistinguishable from bg0); crust = bg_dim of the next-harder contrast.
 */
const backgrounds: Record<Flavor, Record<BgSlot, string>> = {
  // Everforest Light (medium contrast)
  light: {
    surface2: "#BDC3AF", // bg5
    surface1: "#E0DCC7", // bg4
    surface0: "#E6E2CC", // bg3
    base: "#FDF6E3", // bg0
    mantle: "#F4F0D9", // bg1
    crust: "#EFEBD4", // bg_dim
  },
  // Everforest Dark Soft
  soft: {
    surface2: "#5D6B66", // bg5
    surface1: "#4D5960", // bg3
    surface0: "#3A464C", // bg1
    base: "#333C43", // bg0
    mantle: "#293136", // bg_dim
    crust: "#232A2E", // medium bg_dim
  },
  // Everforest Dark Medium
  medium: {
    surface2: "#56635F", // bg5
    surface1: "#475258", // bg3
    surface0: "#343F44", // bg1
    base: "#2D353B", // bg0
    mantle: "#232A2E", // bg_dim
    crust: "#1E2326", // hard bg_dim
  },
  // Everforest Dark Hard
  hard: {
    surface2: "#4F5B58", // bg5
    surface1: "#414B50", // bg3
    surface0: "#2E383C", // bg1
    base: "#272E33", // bg0
    mantle: "#1E2326", // bg_dim
    // derived: darken(bg_dim, L(medium bg_dim) - L(hard bg_dim)) — no harder
    // contrast set exists, so extrapolate by the same HSL-lightness step that
    // separates medium and hard bg_dim
    crust: "#181C1F",
  },
};

export const palette: Record<Flavor, Record<Slot, string>> = {
  light: { ...chromatic.light, ...backgrounds.light },
  soft: { ...chromatic.dark, ...backgrounds.soft },
  medium: { ...chromatic.dark, ...backgrounds.medium },
  hard: { ...chromatic.dark, ...backgrounds.hard },
};
