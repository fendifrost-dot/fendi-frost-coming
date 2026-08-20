# I1a — Observation & Measurement Record

**Observation date:** 2026-08-20
**Round:** I1a (post-deployment observation — no new optimization)
**Deployment observed:** `x-deployment-id: c4eaa48b-26bf-483e-a9ae-ef9530ee2864`
**Site changes made during this round:** **none.** Working tree was clean at the end of
observation; the only additions are the append-only files under `observations/`, which are
outside the Vite build output and are therefore not deployed to fendifrost.com.

This directory is **append-only**. Do not overwrite these files in later rounds. Add
`observations/I1b/`, `observations/I1c/`, etc. alongside it.

---

## 0. Scope limits — read this before trusting any number below

Three limits materially constrain this round. They are stated up front so nothing downstream
is mistaken for a measurement it is not.

### 0.1 No prior baseline artifact exists in this repository

The directive treats "the existing Fendi Frost baseline and all previous captures" as
immutable and instructs me to append to them. **No such captures exist here.** Every file ever
tracked in this repository across all six commits is application source, assets, or config —
there is no baseline file, no prior query panel, no screenshot set, no claim ledger, no A3
canonical biography package, and no Modest research document.

Verified by `git log --pretty=format: --name-only --all | sort -u`.

Consequence: **Deliverable B (baseline → current delta) cannot be computed as specified.** A
delta table requires two measurements; only one exists. What follows is therefore recorded as
**T0 — the first durable measurement**, structured so that I1b *can* be a genuine delta against
it. Any "change classification" I emitted here would be invented, so none is emitted.

If a baseline package does exist outside this repository (a doc, a sheet, another repo), supply
it and the delta table can be produced without re-running anything — the raw evidence is
preserved in `evidence/`.

### 0.2 No search-console or platform-analytics access

Section 4 asks for indexed URL count, submitted-vs-indexed, Google-selected canonical, crawl
activity, impressions, clicks, CTR, average position, and query-level reports. **All of these
require authenticated Google Search Console / Bing Webmaster access, which this session does
not have.** Section 4 is therefore reported as *not captured*, not as zero. Zero and
unmeasured are different findings and are not merged here.

### 0.3 Platform panel coverage is partial

I could not run authenticated sessions against ChatGPT, Gemini, Perplexity, or Copilot. Two
retrieval channels were measurable and are reported **separately**, per the directive's
prohibition on synthetic cross-platform scoring:

| Channel | What it is | Status |
|---|---|---|
| **Channel A — web search index** | A live web search index queried through this session's search tool | Measured |
| **Channel B — JS-rendering AI fetcher** | A URL-fetching retriever that executes JavaScript before extracting | Measured |
| Google SERP (authenticated//localized) | — | Not captured |
| Bing / Copilot | — | Not captured |
| ChatGPT | — | Not captured |
| Gemini | — | Not captured |
| Perplexity | — | Not captured |

Channels A and B are **not** combined into any score. They disagree with each other in an
informative way, and that disagreement is the central finding of this round.

---

## A. I1a current-state verification

All ten sitemap routes were fetched raw (no JS) and separately rendered in headless Chromium
against the **live deployed bundle** (`index-DwO6szZ2.js`, `index-BARvIDJH.css` and all
nineteen mirrored chunks, pulled from production and served locally because browser egress is
blocked in this environment; the JS artifact under test is byte-identical to production).

### A.1 Verification matrix

| # | Check | Raw / non-JS | Rendered (JS) | Verdict |
|---|---|---|---|---|
| 1 | HTTP response/status | 200 on all 10 routes; `www` → apex 302 | — | **PASS** |
| 2 | Canonical | **absent on every route** | present, correct, exactly one per route | **DEFECT D1** |
| 3 | Title | identical homepage title on all 10 routes | correct per-route | **DEFECT D2** |
| 4 | Meta description | identical homepage description on all 10 | correct per-route, **but duplicated** | **DEFECT D2 + D3** |
| 5 | OG metadata | homepage OG on all 10; `og:url` = `/` everywhere | **duplicated — stale homepage tag emitted first** | **DEFECT D3** |
| 6 | Raw/non-JS HTML visibility | `<div id="root"></div>` — **zero body content** | — | **DEFECT D2** |
| 7 | Rendered content | — | full content, correct H1 per route | **PASS** |
| 8 | Internal links | **zero** `<a>` elements in raw HTML | 7–10 internal links per route | **DEFECT D2** |
| 9 | Structured data | **absent on every route** | `MusicGroup` on `/` only; **0 on the other 9** | **DEFECT D1 + D4** |
| 10 | Structured-data validity | n/a | JSON-LD parses; type/fields valid | PASS (as far as it goes — see D4) |
| 11 | Sitemap inclusion | 200, `text/xml`, all 10 routes present, matches repo | — | **PASS** |
| 12 | Robots/indexability | robots.txt 200, all agents `Allow: /`, sitemap declared | no `noindex` anywhere | **PASS**, with **D5** |

### A.2 Defect register

Documented before any repair, per §3. **None of these were fixed during this round.**

---

**D1 — No canonical and no structured data survive without JavaScript.** `CRITICAL`

`index.html` ships no `<link rel="canonical">` at all. Canonical is injected client-side by
`src/components/Seo.tsx` via react-helmet-async; JSON-LD likewise by
`src/components/StructuredData.tsx`. Any consumer that does not execute JS sees **neither**.
The declared canonical is invisible to exactly the consumers that most need it.

---

**D2 — All ten routes are byte-identical in raw HTML.** `CRITICAL`

```
84c236333ae5d4d16f965beb1213e769   /            (11944 bytes)
84c236333ae5d4d16f965beb1213e769   /runway
84c236333ae5d4d16f965beb1213e769   /runway/designed-for-me
84c236333ae5d4d16f965beb1213e769   /runway/mcqueen
84c236333ae5d4d16f965beb1213e769   /runway/balenciaga
84c236333ae5d4d16f965beb1213e769   /music
84c236333ae5d4d16f965beb1213e769   /fashion
84c236333ae5d4d16f965beb1213e769   /visuals
84c236333ae5d4d16f965beb1213e769   /about
84c236333ae5d4d16f965beb1213e769   /archive
```

One distinct hash across ten URLs. No prerendering, no SSR, no static generation.

Verified against seven crawler user-agents — Googlebot, bingbot, GPTBot, PerplexityBot,
ClaudeBot, Google-Extended, facebookexternalhit — **all seven receive the same
`84c2363…` shell.** There is no UA-conditional prerender path.

Route content is additionally **lazy-loaded per route** (`About-DfrxTTwk.js`,
`Runway-DXuzfyWH.js`, …), so a renderer must execute the entry bundle *and* resolve a dynamic
import before any body text exists.

---

**D3 — Duplicate `<meta>` tags on every subpage; the stale homepage tag is emitted first.** `HIGH`

The static tags in `index.html` are never removed, and Helmet appends a second set. Measured on
`/about` in the rendered DOM:

```
og:url         [1] https://fendifrost.com/          ← static, homepage, WRONG for this route
               [2] https://fendifrost.com/about     ← correct

og:title       [1] Fendi Frost — Runway Music | Chicago House × Hip-Hop × Fashion
               [2] About | Fendi Frost

description    [1] Fendi Frost is an independent Chicago artist and producer…
               [2] Fendi Frost — independent Chicago artist and producer. Chicago, music, house…

twitter:title  [1] Fendi Frost — Runway Music | …
               [2] About | Fendi Frost
```

Same pattern confirmed on `/runway`. Consumers that take the **first** occurrence — which
includes most social scrapers and many metadata parsers — read every subpage as the homepage,
with `og:url` pointing at `/`. This is a self-inflicted canonical-conflict signal that
contradicts the correct `<link rel="canonical">` sitting in the same document.

`<link rel="canonical">` is *not* duplicated (exactly one, correct). Only the meta/OG set is.

---

**D4 — Structured data covers one route and omits the entity's core facts.** `HIGH`

`StructuredData` is mounted only in `src/pages/Index.tsx:16`. Nine of ten routes emit no
schema at all. The single home-page payload:

```json
{"@context":"https://schema.org","@type":"MusicGroup","name":"Fendi Frost",
 "url":"https://fendifrost.com","image":"https://fendifrost.com/og-runwaymusic.png",
 "genre":["Hip-Hop","House","Electronic"],
 "address":{"@type":"PostalAddress","addressLocality":"Chicago","addressRegion":"IL","addressCountry":"US"},
 "sameAs":["…spotify…","…apple…","…instagram…","…soundcloud…","…twitter…"]}
```

Gaps, recorded as observation only:
- Typed `MusicGroup` (an ensemble) for a solo artist, producer and engineer.
- No `alternateName`, and **no `Terrence Cleveland` anywhere in the repository** — verified by
  grep across `src/`, `index.html`, `public/`. The real name is absent from first-party
  structured data even though third parties already publish it (see §D/F).
- No `MusicAlbum` / `MusicRecording` for *Runway Music*, *Heart Chakra*, or the three song
  pages, despite dedicated URLs existing for them.
- `sameAs` omits the YouTube channel, which is present in `src/config/site.ts:42` and linked
  in the UI.
- No producer/engineer role expressed in any machine-readable form.

---

**D5 — Soft 404.** `MEDIUM`

`https://fendifrost.com/this-route-does-not-exist-zzz999` returns **HTTP 200** with the same
`84c2363…` shell. Every arbitrary path is a 200-status indexable URL that is indistinguishable
from a real one. Standard SPA-hosting behaviour, but it is an indexability defect and it
interacts badly with D2: an index cannot tell real routes from invented ones by status alone.

---

**D6 — Third-party badge injected into production markup.** `LOW`

The host injects a `#lovable-badge` block plus `https://cdn.gpteng.co` font and
`/~flock.js` analytics into the served HTML. Consequence for measurement: **"Edit with" is the
only text present in the accessibility/text layer of the raw document**, and it trails the
extracted text of every rendered page (visible at the end of every file in
`evidence/rendered-text/`). Noted so it is not misread as page content in future rounds.

---

**D7 — Canonical brand-name style not applied.** `OBSERVATION ONLY — DO NOT FIX IN I1b`

Directive §1 fixes the clothing-brand entity name as **Modest**, display **MOD#$T**, first
prose reference "Modest (stylized MOD#$T)". The deployed site instead uses **"Be More Modest"**
throughout: `Fashion.tsx:25` (H1), `Fashion.tsx:33,61,66`, `About.tsx:48`,
`FashionBridge.tsx:21,29`, `Footer.tsx:99`, `SongPage.tsx:95,102`.

Flagged for the record only. **Correcting it is explicitly out of bounds** — every available
correction would strengthen the Fendi Frost ↔ Modest association that §7 requires be held
frozen. See §G.

---

### A.3 Compliance checks that PASSED

- **Retired designer claim is absent.** No form of "every track is named after a designer"
  appears in source or rendered output. Current `/runway` wording is *"Every Runway Music era
  gets a fashion reference before it gets a mix note."* — the retired claim has not
  reappeared.
- **No Modest reinforcement was deployed.** Working tree clean; zero commits touching site
  source this round.
- **Sitemap ↔ router parity.** All ten sitemap URLs resolve to real routes; no orphans.
- **robots.txt permits AI crawlers.** No `Disallow`, no GPTBot/CCBot/Google-Extended block.
  The site is *permitted* everywhere; it is simply *empty* to non-rendering agents.

---

## B. T0 measurement table (delta table deferred — see §0.1)

Recorded per §5. `—` means not measurable this round, **not** a negative result.

### Channel A — web search index

| # | Query | Direct mention | FF.com retrieved | FF.com cited | Accuracy | Entity resolution |
|---|---|---|---|---|---|---|
| A1 | `site:fendifrost.com` | Y | Y (**1 URL only**) | Y | **incorrect — stale** | correct |
| A2 | `"Fendi Frost" Chicago artist producer` | Y | N | N | accurate | correct |
| A3 | `Who is Fendi Frost` | Y | Y (listed, low rank) | partial | **partial — 2 unverified claims** | correct |
| A4 | `"Fendi Frost" "Runway Music" album tracklist` | **N** | N | N | **incorrect — nil return** | **wrong — collapsed to FENDI SpA** |
| A5 | `"Fendi Frost" "Heart Chakra" OR "Designed For Me" 2026` | **N** | N | N | **incorrect — nil return** | **wrong — collapsed to FENDI SpA** |
| A6 | `"Fendi Frost" house music electronic Chicago house` | Y | N | N | **contradicts site** | correct entity, **wrong genre** |
| A7 | `"Fendi Frost" Terrence Cleveland` | Y | N | N | accurate | correct |
| A8 | `"Fendi Frost" Modest / Be More Modest / bemoremodest` | **N** | N | N | nil return | **n/a — zero linkage** |

### Channel B — JS-rendering AI fetcher

| # | Target | Retrieved | Content extracted | Accuracy |
|---|---|---|---|---|
| B1 | `fendifrost.com/about` | **Y — full body** | Chicago; hip-hop + house; father's saxophone; the Workhouse; independence; **"Be More Modest"** | accurate to deployed copy |
| B2 | `fendifrost.com/runway` | **Y — full body** | album name; **complete 15-track tracklist in order**, incl. **"MODEST Members Only"**; project statement; streaming platforms | accurate to deployed copy |

**The two channels disagree completely, and that is the finding.** A JS-rendering retriever
reads the site perfectly. A non-rendering index sees an empty shell and a stale snapshot. The
deployed content is not weak — for most of the measured surface it is simply **not present in
the format the consumer reads**.

### Per-association state at T0

| Association | Channel A (search) | Channel B (AI fetch) | Class |
|---|---|---|---|
| Exact-entity resolution | correct on name queries; **fails on release queries** | correct | — |
| Chicago | **established** | established | **C — independent** |
| Artist / producer | **established** | established | **C — independent** |
| Engineer (mixing/mastering) | **established** — SoundBetter, with gear and client detail | thin on site | **C — independent** |
| Hip-hop | **established** (drill-adjacent) | established | **C — independent** |
| House / electronic evolution | **absent and actively contradicted** | established | **A only — first-party** |
| Fashion | **absent** | established | **A only — first-party** |
| Runway Music (catalog) | **absent** | established | **A only — first-party** |
| The Fabric Series | absent | absent on site | not present |
| Individual releases (2026 era) | **absent** | established | **A only — first-party** |
| Terrence Cleveland ↔ Fendi Frost | **established** — Shazam writer credits | **absent from site entirely** | **C — independent** |
| Fendi Frost ↔ Modest | **zero — baseline holds** | **leaks: /about + /runway** | see §D.3 |

---

## C. Retrieval-chain analysis

The chain is `retrievable → retrieved → cited → association expressed`. It breaks in a
different place per channel.

### Channel A — breaks at link 1, *retrievable*

```
retrievable ✗ ──── retrieved ── cited ── expressed
     ▲
     └── D1 + D2: no content, no canonical, no schema, no links without JS
```

Nothing downstream can be diagnosed, because nothing downstream is reached. The single hard
proof: **the indexed representation of `fendifrost.com` is the retired pre-V1 construction
page.** Query A1 returned *"new music coming soon"*, a booking email and a phone number.
None of those strings exist anywhere in the current deployment — verified by grep across the
raw shell, all nineteen mirrored production chunks, and the rendered text of all ten routes
(the only `coming soon` hits in the bundle are unrelated `aria-label` and "Full film coming
soon" UI strings in `Visuals-CGA_yYpz.js`).

The index is serving a snapshot that predates the entire V1 site. Under D2 there is no
non-JS content that would ever compel it to update.

### Channel B — reaches link 4, but there is no link 0

```
[discoverable] ✗ ── retrievable ✓ ── retrieved ✓ ── cited ✓ ── expressed ✓
      ▲
      └── the URL must already be known; nothing in Channel A supplies it
```

Given the URL, the chain completes end to end: content extracted accurately, tracklist in
correct order, associations expressed as written. The break is *upstream* of the modelled
chain — **discovery**. Channel A does not surface fendifrost.com for any release, genre, or
fashion query (A4, A5, A6, A8 all nil), so in practice a system only reaches Channel B when a
user hands it the domain.

**This is the single highest-information result of I1a.** It separates two hypotheses that
would otherwise be confounded:

- ~~"the content is not persuasive enough"~~ — **falsified.** Where the content is read, it
  is extracted accurately and completely.
- **"the content is not readable by the consumers that matter"** — **supported**, with a
  clean mechanism (D1/D2) and a clean control (Channel B, where readability is satisfied and
  everything works).

Per §5 I am explicitly *not* scoring A3's mention of Fendi Frost as chain success. The site
was listed, not read; the facts in that answer came from Facebook, Apple Music, Instagram and
a blog, and two of them are wrong (see §E).

---

## D. New associations

Given §0.1, "new since baseline" is not establishable. Recorded instead: **associations present
at T0, with their provenance class** (A = direct first-party retrieval, B = propagation from
first-party, C = independent corroboration). §6 forbids misclassifying A or B as C.

### D.1 Class C — independent corroboration (predates and outweighs the site)

- **Terrence Cleveland ↔ Fendi Frost** — Shazam writer credits ("Terrence G. Cleveland has
  written music for Fendi Frost"). Notable: this is the *only* strongly-corroborated identity
  fact that **the site itself never states**.
- **Chicago** — Facebook location posts, SoundBetter, Ill-Boyz Ent.
- **Engineer / mixing / mastering** — SoundBetter profile 377405 carries specific, credible
  detail (SSL and API EQs, LA-2A, FabFilter, Ozone) and named clients (FBG Duck, Taysav, Lil
  Mouse, Drilla, Brandon Thomas). This is currently the **strongest** third-party
  entity document in existence for Fendi Frost.
- **Hip-hop / drill adjacency** — SoundBetter, Hood Illustrated, 24Hip-Hop, TIDAL.
- **Work Hard Ent** — corroborated in Channel A independently of the site.
- **Back catalog** — *Exhausting (feat. FBG Duck)*, *No Love November*, *Pappy Tribute*,
  *Ghetto Olympian*, *Aura*, *Mama Loved Me*, *3 MINDS* all resolve on Apple Music, Shazam,
  TIDAL, SoundCloud.

### D.2 Class A only — first-party, zero external propagation

House/electronic evolution · fashion-as-arrangement · **Runway Music** and its entire 15-track
tracklist · the 2026 era (*Runway Music*, *Heart Chakra*, *Designed For Me*) · the Workhouse ·
the father-saxophone lineage.

**No Class B propagation was detected for any of these.** Nothing originating on
FendiFrost.com has been absorbed by any third-party source in Channel A. The site is not yet
a source of record for anything.

### D.3 Modest control variable — §7 status

**The public baseline HOLDS.** Query A8 returned zero Fendi Frost ↔ Modest linkage; results
collapsed entirely to generic modest-fashion retail. Nothing was deployed to strengthen it.

**Three exposures are recorded, none created this round:**

1. **Pre-existing on-site linkage, deployed before I1a.** The association is already extensive
   in the deployed build: a whole `/fashion` route (H1 "Be More Modest"), a "FASHION" nav item
   on every page, a homepage bridge section, a **sitewide footer link**, a SongPage module, and
   outbound links to `bemoremodest.com` from four places (`src/config/site.ts:41`). Additionally
   **"MODEST Members Only" is track 8** of the published Runway Music tracklist
   (`src/config/site.ts:206`), and **"Work Hard Entertainment / Modest Mob"** is the label
   credit on two releases (`src/config/site.ts:105,130`). *This is prior state, not an I1a
   action — but it means the control variable was never clean on the site itself, only in
   public retrieval.*

2. **The linkage already leaks through Channel B.** Both AI fetches surfaced it unprompted:
   B1 returned "Be More Modest" as a related brand; B2 returned "MODEST Members Only" as track
   8 and listed MODEST among the fashion brands in the tracklist. **A JS-rendering AI retriever
   can already state the Fendi Frost ↔ Modest association today.** It has simply not yet
   propagated to Channel A.

3. **The tension this creates.** The public baseline is being preserved *by the very defect
   this round diagnosed*. D1/D2 are the reason Channel A cannot see the Modest linkage. Any
   I1b intervention that makes the site readable to non-rendering crawlers — which is the
   obvious remedy for everything in §C — **will also expose the Modest association to Channel
   A and destroy the control variable**, without anyone having deployed a single new Modest
   link.

**This is itself an important observation and it forces a design choice in I1b.** It is
carried into §G as the primary constraint, not as a footnote.

---

## E. Anomalies and regressions

Per §9 — recorded, not optimized away.

**E1 — Stale index snapshot. `CRITICAL`.** The web index serves the retired pre-V1 "new music
coming soon" construction page for `fendifrost.com`, including a booking email and phone
number. The entire V1 deployment is absent from the index. This is the clearest single
regression indicator in the round.

**E2 — `site:` returns a single URL. `CRITICAL`.** Ten submitted sitemap URLs; `site:`
surfaced one, and that one is stale. Consistent with near-zero indexation of the V1 route set.
Cannot be quantified without Search Console (§0.2).

**E3 — Brand-token collapse into FENDI SpA. `CRITICAL`, structural.** Queries A4 and A5
returned **pure luxury-fashion-house results** — Fendi Spring 2026 RTW, Qixi capsule
collections, fendi.com category pages. The token pair "Fendi" + a fashion word is captured by
one of the strongest commercial entities on the web. Because the artist's entire creative
strategy is *fashion-referential* — an album called Runway Music with a tracklist built around
designers, garments, brands and fashion culture — **the positioning and the collision point in
the same direction.** Every fashion-adjacent query the strategy generates is a query the
artist is structurally least able to win. This is not fixable by content volume and should
be treated as a permanent constraint on query selection.

**E4 — Name collisions.** `Fendi Da Rappa` (surfaced in A2), `Frost (rapper)`,
`David Frost (producer)`, `Edith Frost`, `Frost Children`, `Frost*`, `DJ Frost`,
`Frost Giant Electronics`, and — in the Terrence query — `Terrence Fede`, `Terrence J`, plus
"Fendi Bags for sale in Cleveland, Ohio" (a literal `Fendi` + `Cleveland` string collision).
The `FendiDa Rappa / Frost` collision the directive asked to watch for **is confirmed present**.

**E5 — Third parties own the entity. `HIGH`.** For the facts search *can* answer, the
authoritative sources are SoundBetter, Apple Music, Shazam, Facebook, Instagram, TIDAL,
24Hip-Hop and Ill-Boyz Ent. FendiFrost.com is not the source for a single fact in Channel A.
See §F.

**E6 — Genre positioning actively contradicted. `HIGH`.** Query A6 did not merely fail to
confirm the house/electronic evolution; the channel **concluded against it** — that the
evidence shows hip-hop/rap and drill, "not... a house music producer." The site's central
current-era claim is being outvoted by better-indexed third-party evidence. This is the
sharpest example of E5.

**E7 — Unverified third-party facts entering AI answers. `HIGH`.** Query A3 produced two
claims that are **not in the canonical ledger and are not supported anywhere in the deployed
site**:
- an **album titled "Nutrition"** (sourced to 24Hip-Hop);
- an affiliation with **Roc Nation**;
- plus a self-description as "artist, designer, activist, entrepreneur", which does not match
  the canonical "artist, producer and engineer".

These are propagating into synthesized answers **because no first-party source is being read
to contradict them.** Flagged for Fendi's factual review — I am not correcting the ledger.

**E8 — Social handle fragmentation. `MEDIUM`.** Channel A surfaces Instagram
**`@fendi_frost`** and Facebook **`@FendiFrost`** / **`@fendidarappa`**. The site declares
**`@officialfendifrost`** and `@Fendi_Frost` (`src/config/site.ts:38-39,46-48`). The
`sameAs` array cannot consolidate profiles it does not list, and it does not list the ones
the index actually ranks.

**E9 — Own canonical contradicted by own OG. `MEDIUM`.** Per D3, every subpage tells a
first-tag-wins consumer that its `og:url` is the homepage while `<link rel="canonical">` says
otherwise. The site is currently emitting conflicting canonical signals about itself.

**E10 — Soft 404 (D5). `MEDIUM`.**

**E11 — Measurement anomaly, not a site defect.** Browser egress is blocked in this
environment (`ERR_CONNECTION_RESET` for all hosts, proxy-configured or not). Rendering was
therefore performed against a local mirror of the **live production bundle**. The JS under
test is production-identical; only the fetch path differs. Recorded so the method is
reproducible and the caveat is not lost.

---

## F. Source movement

**Is FendiFrost.com becoming the authoritative source for Fendi Frost facts? At T0: no —
and there is no evidence of movement in that direction.**

| Fact | Current authority | FF.com status |
|---|---|---|
| Real name (Terrence Cleveland) | **Shazam** writer credits | **not stated on the site at all** |
| Engineer / mixing / mastering | **SoundBetter** (detailed, client-named) | one clause on `/about` |
| Chicago | Facebook, SoundBetter | stated, unread by Channel A |
| Back catalog | **Apple Music, Shazam, TIDAL** | stated, unread by Channel A |
| Label | Work Hard Ent (third-party) | stated, unread by Channel A |
| Genre | **SoundBetter / drill credits — contradicts the site** | stated, unread by Channel A |
| Runway Music + tracklist | **nobody** | **sole holder — unread by Channel A** |
| House/electronic evolution | **nobody; third parties contradict** | **sole holder — unread by Channel A** |
| Fashion-as-arrangement | **nobody** | **sole holder — unread by Channel A** |

Two distinct problems, which must not be conflated:

1. **Contested facts** (genre, role): third-party sources are better indexed *and disagree*.
   Volume of first-party assertion will not settle this while the assertion is unreadable.
2. **Uncontested facts** (Runway Music, the tracklist, the fashion thesis): nobody disputes
   them because **nobody has read them**. These have no competing authority at all — they are
   pure upside the moment readability is solved.

Class-B propagation from FendiFrost.com to any third party: **none detected.** The site is not
yet functioning as a source.

---

## G. Recommendation for I1b — proposal only, nothing implemented

### G.1 What the evidence does and does not support

The strongest constraint on I1b comes from §D.3: **the Modest control variable is currently
protected only by the rendering defect.** Fixing readability site-wide and preserving the
Modest baseline are, as things stand, **mutually exclusive** — `/fashion`, the sitewide footer
link, the homepage bridge, and "MODEST Members Only" in the tracklist would all become
crawler-visible in the same deploy.

I1b must therefore make an explicit choice. Three viable postures:

- **G-α — Scope the fix.** Make readability apply to a subset of routes that excludes the
  Modest surfaces, keeping the control variable clean while testing the core hypothesis.
- **G-β — Spend the control.** Accept that the Modest baseline ends, and convert it into a
  measured observation: watch precisely how fast and through which path the association
  propagates to Channel A.
- **G-γ — Protect first.** Freeze all readability work until Fendi decides the Modest
  question.

**Recommended: G-α**, because it keeps the highest-information experiment available *and*
preserves the control. It is also the only option that keeps G-β available as a deliberate
later round rather than an accident.

This is Fendi's call, not mine. It is the first thing I1b needs a decision on.

### G.2 Ranked candidate interventions

Ranked by expected information gain first, per §10.G.

---

**Rank 1 — Prerender / SSR a *scoped* route set. (G-α)**

Scope: `/`, `/about`, `/runway`, `/music`, `/archive` and the three song pages. **Exclude
`/fashion`, and suppress the footer/homepage Modest links and the "MODEST Members Only"
tracklist row within prerendered output only** — the rendered site for humans stays untouched.

| Criterion | Assessment |
|---|---|
| Expected information gain | **Highest.** Directly tests the one hypothesis I1a isolated. Channel B already proves the content converts when read; this supplies the missing readability and holds everything else constant. A clean single-variable experiment. |
| SEO impact | **Highest.** Addresses D1, D2, D3, E1, E2 at the root. Also the only route to refreshing the stale snapshot in E1. |
| GEO/AI retrieval impact | **High.** Opens the site to non-rendering AI crawlers, which is most of them. |
| Entity impact | **High.** First time canonical + JSON-LD are visible to a non-rendering consumer. |
| Contamination risk | **Medium** — and this is the crux. Scoped exclusion keeps the Modest control clean; the risk is implementation leakage. Must be verified by re-running §A.1 *before* announcing the deploy. |
| Reversibility | **High.** Build-step change, revert by rollback; no content or copy is rewritten. |

**Why this and not more content:** §10 warns against assuming more content is the answer. The
evidence here specifically falsifies that assumption — Channel B extracted the existing content
accurately and completely. The bottleneck is format, not volume. **Adding content in I1b would
change two variables at once and waste the cleanest experiment available.**

---

**Rank 2 — Fix the duplicate meta tags (D3/E9).**

Remove the static OG/description block from `index.html` so Helmet's values stand alone.

| Criterion | Assessment |
|---|---|
| Information gain | Low-moderate — a hygiene fix, not a hypothesis test. |
| SEO impact | Moderate. Removes a self-contradicting canonical signal. |
| GEO impact | Moderate. Metadata-first parsers stop reading every subpage as the homepage. |
| Entity impact | Low. |
| Contamination risk | **Very low.** Touches no Modest surface, adds no new signal. |
| Reversibility | **Very high.** |

Qualifies as a **repair of a defect documented in §A.2**, not a new optimization. Safe to bundle
with Rank 1 — but note it does change a second variable; if experimental cleanliness is the
priority, ship it as a separate small deploy.

---

**Rank 3 — Decide the Terrence Cleveland identity question.**

The name is publicly corroborated (Shazam) but **absent from the site**. Adding
`alternateName` and correcting `MusicGroup` → `Person`/`MusicGroup` pair would let the site
claim its own strongest entity anchor.

| Criterion | Assessment |
|---|---|
| Information gain | Moderate-high — tests whether first-party schema can consolidate a fragmented entity. |
| Entity impact | **Highest of any candidate.** Directly targets E4 collisions. |
| Contamination risk | Low for Modest; **non-zero for privacy** — this publishes a real name on a first-party property. |
| Reversibility | Moderate. Removable from the site, but **not** from anything that has cached or propagated it. |

**Requires Fendi's explicit sign-off before implementation.** Do not treat the Shazam credit as
consent to publish. Flagged, not scheduled.

---

**Rank 4 — Query-panel redesign (measurement, not deployment).**

E3 shows fashion-adjacent queries are structurally unwinnable against FENDI SpA. A panel
weighted toward them will keep producing nil results that say more about the search index than
about the intervention. Rebalance toward queries the entity can actually contest — name +
role, name + collaborator, name + release title, name + label — and retain a small fixed set
of collision queries purely as a **collision monitor**.

Zero deployment risk. Improves every future round's signal-to-noise. Cheap. Do this regardless
of which posture is chosen.

---

**Rank 5 — Establish the missing baseline infrastructure.**

Per §0.1, no durable baseline existed. `observations/I1a/` now supplies one. I1b should adopt
the same append-only structure so B-deltas become computable from I1b onward, and — if a
pre-existing baseline package exists outside this repo — import it so a genuine I1a delta can
be back-computed from the preserved evidence.

---

**Explicitly NOT recommended for I1b**

- Any new content layer — Fabric Series, expanded Runway semantics, release pages, biography
  distribution (§8, and falsified by the Channel B result).
- Any Modest bridge, cross-domain `sameAs`, `/collections/fendi-frost`, merch or
  wardrobe-credit campaign (§7).
- Correcting "Be More Modest" → "Modest (stylized MOD#$T)" (D7) — every version of this
  strengthens the frozen association.
- External profile synchronization, including consolidating the E8 handle fragmentation —
  it is a real defect, but it is a *new authority signal*, which §8 defers.

### G.3 Decisions required from Fendi before I1b starts

1. **Modest posture — G-α, G-β or G-γ?** Blocking. Nothing in Rank 1 can proceed without it.
2. **Publish "Terrence Cleveland" on first-party properties — yes or no?** Blocking for Rank 3
   only.
3. **Does a pre-I1a baseline package exist outside this repository?** If yes, supply it and
   Deliverable B can be produced from preserved evidence with no re-measurement.
4. **Can Search Console / Bing Webmaster access be provided?** Section 4 stays unmeasurable
   without it, and E1/E2 stay unquantified.

---

## STOP

I1a observation complete. No I1b work performed. No Modest bridge started. No unrelated SEO
changes made. Awaiting Fendi's review and explicit next directive.

---

## Evidence index

| Path | Contents |
|---|---|
| `evidence/raw-shell-all-routes.html` | The single raw document served for all 10 routes and for all 7 crawler UAs |
| `evidence/raw-route-hashes.txt` | MD5 per route — the D2 proof |
| `evidence/rendered-metadata.json` | Per-route title, canonical, description, OG, JSON-LD, headings, links, text |
| `evidence/rendered-text/*.txt` | Full extracted text per route, rendered from the live production bundle |

**Method note (reproducibility).** Raw fetches: `curl`, 2026-08-20, plus seven crawler
user-agents. Rendered capture: production `index-DwO6szZ2.js` / `index-BARvIDJH.css` and all
nineteen route/asset chunks pulled from `https://fendifrost.com`, served from localhost under
SPA fallback, driven with headless Chromium — necessitated by E11. Search results: Channel A
and Channel B as defined in §0.3, single pass, 2026-08-20.
