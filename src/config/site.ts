// Single source of truth for all site content: links, catalog, nav, feature flags.
// Fendi (or anyone editing this site) should only need to touch this file for content changes.

import runwayKeyArt from "@/assets/runway-key-art.png";
import fendiBanner from "@/assets/fendi-banner.jpg";
import fendiPress from "@/assets/fendi-press.jpg";

// Real, official album/single artwork — pulled from the iTunes Lookup API
// (artist id 898143348), same strategy as the Artist Growth Hub resolve-artwork tool.
import runwayMusicCover from "@/assets/covers/runway-music.jpg";
import heartChakraCover from "@/assets/covers/heart-chakra.jpg";
import exhaustingCover from "@/assets/covers/exhausting.jpg";
import handMeDownCover from "@/assets/covers/hand-me-down.jpg";
import rawDenimCover from "@/assets/covers/raw-denim.jpg";
import cashmereCover from "@/assets/covers/cashmere.jpg";
import suedeVsLeatherCover from "@/assets/covers/suede-vs-leather.jpg";
import balenciagaSingleCover from "@/assets/covers/balenciaga-single.jpg";

export const siteMeta = {
  name: "Fendi Frost",
  title: "Fendi Frost — Runway Music | Chicago House × Hip-Hop × Fashion",
  description:
    "Fendi Frost is an independent Chicago artist and producer living between Chicago hip-hop and Chicago house. Runway Music is the sound of style — music, fashion and visual design as one world.",
  url: "https://fendifrost.com",
  defaultOgImage: "/og-runwaymusic.png",
  chakraOgImage: "/og-chakra.png",
};

// ---------------------------------------------------------------------------
// Links & handles — verified, do not invent new ones.
// ---------------------------------------------------------------------------
export const links = {
  spotify: "https://open.spotify.com/artist/7rVTumlXRokJASRK6BSIsK",
  appleMusic: "https://music.apple.com/us/artist/fendi-frost/898143348",
  soundcloud: "https://soundcloud.com/fendi-frost",
  instagram: "https://instagram.com/officialfendifrost",
  twitter: "https://twitter.com/Fendi_Frost",
  runwaySmartLink: "https://links.fendifrost.com/runway",
  designedForMeSmartLink: "https://rnd.fm/runway-music-hlpad6",
  heartChakraSmartLink: "https://links.fendifrost.com/heartchakra",
  fashion: "https://bemoremodest.com",
  youtube: "https://www.youtube.com/@FendiFrost",
  reddit: "https://www.reddit.com/user/Few-Membership-9143",
};

export const handles = {
  instagram: "@officialfendifrost",
  twitter: "@Fendi_Frost",
};

export const featureFlags = {
  showYoutube: Boolean(links.youtube),
  showReddit: Boolean(links.reddit),
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export interface NavItem {
  label: string;
  to: string;
}

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Runway Music", to: "/runway" },
  { label: "Music", to: "/music" },
  { label: "Visuals", to: "/visuals" },
  { label: "Fashion", to: "/fashion" },
  { label: "Archive", to: "/archive" },
  { label: "About", to: "/about" },
];

// ---------------------------------------------------------------------------
// Catalog
// Verified against the iTunes Lookup API (artist id 898143348) — authoritative
// for years, release types and artwork.
// ---------------------------------------------------------------------------
export type ReleaseCategory = "CURRENT ERA" | "ESSENTIAL" | "ARCHIVE";
export type ReleaseType = "album" | "single" | "project";

export interface Release {
  id: string;
  title: string;
  type: ReleaseType;
  year: number;
  category: ReleaseCategory;
  art?: string;
  description: string;
  listenUrl?: string;
  accent?: "gold" | "chakra";
  /** Optional small eyebrow rendered on cards, e.g. "From Runway Music" for tracks that aren't standalone releases. */
  parent?: string;
}

export const releases: Release[] = [
  {
    id: "runway-music",
    title: "Runway Music",
    type: "album",
    year: 2026,
    category: "CURRENT ERA",
    art: runwayMusicCover,
    description:
      "The current world connecting music, fashion, artwork, sound design and Chicago. This is the sound of style. 15 tracks, released 2026-05-20 under Work Hard Entertainment / Modest Mob.",
    listenUrl: links.runwaySmartLink,
    accent: "gold",
  },
  {
    id: "designed-for-me",
    title: "Designed For Me (Control)",
    type: "single",
    year: 2026,
    category: "CURRENT ERA",
    art: runwayMusicCover,
    parent: "From Runway Music",
    description:
      "A deep-house-leaning record built for the late-night hours — luxury tempo, control as a love language. Track 6 on Runway Music.",
    listenUrl: links.designedForMeSmartLink,
    accent: "gold",
  },
  {
    id: "heart-chakra",
    title: "Heart Chakra",
    type: "album",
    year: 2026,
    category: "ESSENTIAL",
    art: heartChakraCover,
    description:
      "An open-hearted record built around a neon-red pulse — vulnerability rendered as dance floor energy. 10 tracks, released 2026-02-14 under Work Hard Entertainment / Modest Mob.",
    listenUrl: links.heartChakraSmartLink,
    accent: "chakra",
  },
  {
    id: "exhausting",
    title: "Exhausting (feat. FBG Duck)",
    type: "single",
    year: 2020,
    category: "ESSENTIAL",
    art: exhaustingCover,
    description: "The record that traveled the furthest — a common entry point into the catalog.",
    listenUrl: "https://music.apple.com/us/album/exhausting-feat-fbg-duck-single/1586489116",
  },
  {
    id: "pappy-tribute",
    title: "Pappy Tribute",
    type: "single",
    year: 2021,
    category: "ESSENTIAL",
    description: "A tribute record, family lineage rendered in sound.",
  },
  {
    id: "hand-me-down",
    title: "Hand Me Down",
    type: "album",
    year: 2020,
    category: "ESSENTIAL",
    art: handMeDownCover,
    description: "Inheritance as a theme — what gets passed down, what gets remixed. 10-track album.",
    listenUrl: "https://music.apple.com/us/album/hand-me-down/1687826314",
  },
  {
    id: "raw-denim",
    title: "Raw Denim",
    type: "album",
    year: 2018,
    category: "ARCHIVE",
    art: rawDenimCover,
    description: "Early catalog project — raw, unfinished textures before the wash.",
    listenUrl: "https://music.apple.com/us/album/raw-denim/1687825859",
  },
  {
    id: "cashmere",
    title: "Cashmere",
    type: "album",
    year: 2018,
    category: "ARCHIVE",
    art: cashmereCover,
    description: "A softer, interior-facing project from the early catalog.",
    listenUrl: "https://music.apple.com/us/album/cashmere/1527529906",
  },
  {
    id: "suede-vs-leather",
    title: "Suede vs Leather",
    type: "album",
    year: 2020,
    category: "ARCHIVE",
    art: suedeVsLeatherCover,
    description:
      "Two textures, one collaboration — Fendi Frost with B-Class, the album that set the fashion-as-music language in motion.",
    listenUrl: "https://music.apple.com/us/album/suede-vs-leather/1518394298",
  },
];

// ---------------------------------------------------------------------------
// Runway Music — full official tracklist (15 tracks, in order)
// ---------------------------------------------------------------------------
export const runwayTracklist: string[] = [
  "McQueen",
  "D&G SPELLED BACKWARDS",
  "Balenciaga (Let Me Freeze)",
  "Fall In Love (Chloe Tote)",
  "COMME des GARÇONS",
  "Designed For Me (Control)",
  "YSL (Ice On)",
  "MODEST Members Only",
  "Runway Music",
  "Electrilla",
  "Dan Ryan Woods",
  "White Horse (POLO SPORT)",
  "Materialistic",
  "Neva Too Much Prada",
  "Fear Of God (Prada Lorin)",
];

// ---------------------------------------------------------------------------
// Song pages — data-driven deep pages under /runway/:slug
// ---------------------------------------------------------------------------
export interface SongPage {
  slug: string;
  title: string;
  era: string;
  status: "live" | "upcoming";
  story: string;
  productionNote: string;
  fashionRef: string;
  listenUrl?: string;
  art?: string;
}

export const songPages: SongPage[] = [
  {
    slug: "designed-for-me",
    title: "Designed For Me (Control)",
    era: "RUNWAY MUSIC — TRACK 6",
    status: "live",
    story:
      "This one came together in the Workhouse after midnight, when the city outside goes quiet enough to hear the low end properly. \"Designed For Me\" is about ownership — of a room, of a sound, of a night that bends to what you built instead of the other way around. It's Chicago house DNA run through a rapper's phrasing, made for the hour when the lights go low and the tempo does the talking.",
    productionNote:
      "Built around a warm, filtered house pulse cut with live-feeling drum programming out of the Workhouse. The vocal sits close and controlled — mixed to feel like it's speaking directly to one person in the room, not a crowd.",
    fashionRef: "Tailored, not loud — think a longline coat over bare skin. Control is the whole outfit.",
    listenUrl: links.designedForMeSmartLink,
    art: runwayMusicCover,
  },
  {
    slug: "mcqueen",
    title: "McQueen",
    era: "RUNWAY MUSIC — TRACK 1",
    status: "live",
    story:
      "Named for the house that treated the runway like a theater — this cut lives in that same tension between beauty and edge. It opens Runway Music, out now, setting the tone for the whole world before anything else gets said.",
    productionNote:
      "Cut at the Workhouse — sound design built from distressed textures and a sharp, cinematic low end, referencing the drama of a closing show more than a typical drop.",
    fashionRef: "Structured shoulders, a hard hem, something a little dangerous under the polish.",
    listenUrl: "https://music.apple.com/us/album/mcqueen/6785156637?i=6785156638",
    art: runwayMusicCover,
  },
  {
    slug: "balenciaga",
    title: "Balenciaga (Let Me Freeze)",
    era: "RUNWAY MUSIC — TRACK 3",
    status: "live",
    story:
      "Named for the house that made distortion feel like couture — oversized, deconstructed, unmistakably itself. \"Balenciaga (Let Me Freeze)\" first surfaced as a standalone single in 2023, then found its true home as track three on Runway Music.",
    productionNote:
      "Built at the Workhouse — heavier low end and warped, oversized textures, mirroring the fashion reference in the sound design itself.",
    fashionRef: "Oversized, deconstructed, worn with total confidence — the beat is the silhouette.",
    listenUrl: "https://music.apple.com/us/album/balenciaga-let-me-freeze/6785156637?i=6785156640",
    art: balenciagaSingleCover,
  },
];

// ---------------------------------------------------------------------------
// Visuals — fashion-film archive, data-driven
// ---------------------------------------------------------------------------
export interface Visual {
  id: string;
  title: string;
  credit: string;
  poster: string;
  youtubeId?: string;
  videoUrl?: string;
  featured?: boolean;
}

export const visuals: Visual[] = [
  {
    id: "jimmy-choo",
    title: "Jimmy Choo",
    credit: "Prod. By Ju",
    poster: "https://img.youtube.com/vi/93Pj60ptMFY/hqdefault.jpg",
    youtubeId: "93Pj60ptMFY",
    videoUrl: "https://www.youtube.com/watch?v=93Pj60ptMFY",
    featured: true,
  },
  {
    id: "on-tv",
    title: "On TV",
    credit: "Fendi Frost × Phor",
    poster: "https://img.youtube.com/vi/Rt4EcZ_R4X8/hqdefault.jpg",
    youtubeId: "Rt4EcZ_R4X8",
    videoUrl: "https://www.youtube.com/watch?v=Rt4EcZ_R4X8",
  },
  {
    id: "everything-black",
    title: "Everything Black",
    credit: "B-Class × Fendi Frost · Prod. Ingenious Music",
    poster: "https://img.youtube.com/vi/HsbzHB0a49A/hqdefault.jpg",
    youtubeId: "HsbzHB0a49A",
    videoUrl: "https://www.youtube.com/watch?v=HsbzHB0a49A",
  },
  {
    id: "call-me-911",
    title: "Call Me 911",
    credit: "feat. ClarkAirlines",
    poster: "https://img.youtube.com/vi/3sVf_WabApU/hqdefault.jpg",
    youtubeId: "3sVf_WabApU",
    videoUrl: "https://www.youtube.com/watch?v=3sVf_WabApU",
  },
];

// ---------------------------------------------------------------------------
// Shared image exports (used directly by pages)
// ---------------------------------------------------------------------------
export const images = {
  runwayKeyArt,
  fendiBanner,
  fendiPress,
  // Real official Runway Music album cover (iTunes API) — kept under the
  // original export key so existing components don't need to change.
  runwayAlbumCover: runwayMusicCover,
  // Real official Heart Chakra album cover (iTunes API) — kept under the
  // original export key so existing components don't need to change.
  heartChakraArt: heartChakraCover,
};

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------
export const analyticsConfig = {
  gaId: (import.meta.env.VITE_GA_ID as string | undefined) || "",
  metaPixelId: (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || "788829401662107",
};

// ---------------------------------------------------------------------------
// Fan signup
// ---------------------------------------------------------------------------
export const fanSignupUrl = (import.meta.env.VITE_FAN_SIGNUP_URL as string | undefined) || "";
