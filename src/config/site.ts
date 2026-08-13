// Single source of truth for all site content: links, catalog, nav, feature flags.
// Fendi (or anyone editing this site) should only need to touch this file for content changes.

import runwayKeyArt from "@/assets/runway-key-art.png";
import fendiBanner from "@/assets/fendi-banner.jpg";
import fendiPress from "@/assets/fendi-press.jpg";
import runwayAlbumCover from "@/assets/runway-album-cover.png";
import heartChakraArt from "@/assets/heart-chakra.png";

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
}

export const releases: Release[] = [
  {
    id: "runway-music",
    title: "Runway Music",
    type: "album",
    year: 2025,
    category: "CURRENT ERA",
    art: runwayAlbumCover,
    description:
      "The current world connecting music, fashion, artwork, sound design and Chicago. This is the sound of style.",
    listenUrl: links.runwaySmartLink,
    accent: "gold",
  },
  {
    id: "designed-for-me",
    title: "Designed For Me (Control)",
    type: "single",
    year: 2025,
    category: "CURRENT ERA",
    description:
      "A deep-house-leaning record built for the late-night hours — luxury tempo, control as a love language.",
    listenUrl: links.designedForMeSmartLink,
    accent: "gold",
  },
  {
    id: "heart-chakra",
    title: "Heart Chakra",
    type: "single",
    year: 2024,
    category: "ESSENTIAL",
    art: heartChakraArt,
    description:
      "An open-hearted record built around a neon-red pulse — vulnerability rendered as dance floor energy.",
    listenUrl: links.heartChakraSmartLink,
    accent: "chakra",
  },
  {
    id: "exhausting",
    title: "Exhausting (feat. FBG Duck)",
    type: "single",
    year: 2020,
    category: "ESSENTIAL",
    description: "The record that traveled the furthest — a common entry point into the catalog.",
    listenUrl: links.spotify,
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
    type: "single",
    year: 2021,
    category: "ESSENTIAL",
    description: "Inheritance as a theme — what gets passed down, what gets remixed.",
  },
  {
    id: "raw-denim",
    title: "Raw Denim",
    type: "project",
    year: 2019,
    category: "ARCHIVE",
    description: "Early catalog project — raw, unfinished textures before the wash.",
  },
  {
    id: "cashmere",
    title: "Cashmere",
    type: "project",
    year: 2018,
    category: "ARCHIVE",
    description: "A softer, interior-facing project from the early catalog.",
  },
  {
    id: "suede-vs-leather",
    title: "Suede vs Leather",
    type: "project",
    year: 2017,
    category: "ARCHIVE",
    description: "Two textures, one artist — the project that set the fashion-as-music language in motion.",
  },
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
    era: "RUNWAY MUSIC",
    status: "live",
    story:
      "This one came together in the Workhouse after midnight, when the city outside goes quiet enough to hear the low end properly. \"Designed For Me\" is about ownership — of a room, of a sound, of a night that bends to what you built instead of the other way around. It's Chicago house DNA run through a rapper's phrasing, made for the hour when the lights go low and the tempo does the talking.",
    productionNote:
      "Built around a warm, filtered house pulse cut with live-feeling drum programming out of the Workhouse. The vocal sits close and controlled — mixed to feel like it's speaking directly to one person in the room, not a crowd.",
    fashionRef: "Tailored, not loud — think a longline coat over bare skin. Control is the whole outfit.",
    listenUrl: links.designedForMeSmartLink,
    art: runwayAlbumCover,
  },
  {
    slug: "mcqueen",
    title: "McQueen",
    era: "RUNWAY MUSIC",
    status: "upcoming",
    story:
      "Named for the house that treated the runway like a theater — this cut lives in that same tension between beauty and edge. Still taking shape inside the Runway Music world, built for a moment when the story needs a harder silhouette.",
    productionNote:
      "Early Workhouse sessions — sound design built from distressed textures and a sharp, cinematic low end, referencing the drama of a closing show more than a typical drop.",
    fashionRef: "Structured shoulders, a hard hem, something a little dangerous under the polish.",
    art: runwayKeyArt,
  },
  {
    slug: "balenciaga",
    title: "Balenciaga",
    era: "RUNWAY MUSIC",
    status: "upcoming",
    story:
      "Named for the house that made distortion feel like couture — oversized, deconstructed, unmistakably itself. This is that idea in record form, still being cut and pressed inside the Runway Music world.",
    productionNote:
      "In development at the Workhouse — early passes lean into heavier low end and warped, oversized textures, mirroring the fashion reference in the sound design itself.",
    fashionRef: "Oversized, deconstructed, worn with total confidence — the beat is the silhouette.",
    art: runwayKeyArt,
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
    credit: "Fendi Frost \u00D7 Phor",
    poster: "https://img.youtube.com/vi/Rt4EcZ_R4X8/hqdefault.jpg",
    youtubeId: "Rt4EcZ_R4X8",
    videoUrl: "https://www.youtube.com/watch?v=Rt4EcZ_R4X8",
  },
  {
    id: "everything-black",
    title: "Everything Black",
    credit: "B-Class \u00D7 Fendi Frost \u00B7 Prod. Ingenious Music",
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
  runwayAlbumCover,
  heartChakraArt,
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
