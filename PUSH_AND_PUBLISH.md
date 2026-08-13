# FendiFrost.com — V1 (content-complete, committed, ready to push)

Built by Claude Code on your Lovable stack (Vite+React+TS+shadcn+Tailwind).
Build verified clean (`npm run build`, `tsc --noEmit`). Local commit: f9f75a4.

## What's DONE (real content, not placeholders)
- Black/gold fashion-editorial design system, Playfair Display + Space Grotesk.
- Pages: / (9-section home), /runway (+/runway/:slug song pages), /music, /fashion
  (Be More Modest bridge), /visuals, /about (+#workhouse), /archive, branded 404.
- Real links wired: Spotify, Apple, SoundCloud, IG @officialfendifrost, X @Fendi_Frost,
  YouTube @FendiFrost, Reddit u/Few-Membership-9143, links.fendifrost.com/runway, bemoremodest.com.
- Real videos on /visuals + home Visual Film: Jimmy Choo (93Pj60ptMFY, featured), On TV
  (Rt4EcZ_R4X8), Everything Black (HsbzHB0a49A), Call Me 911 (3sVf_WabApU).
- SEO (per-page meta, JSON-LD MusicGroup, sitemap.xml, robots), analytics + UTM outbound,
  Meta Pixel 788829401662107, universal Listen modal, mobile-first + lazy loading.
- All content editable in ONE file: src/config/site.ts.

## Only open item
- Fan-email signup posts to VITE_FAN_SIGNUP_URL (unset → optimistic success + console log).
  No Supabase function was created (your rule). Wire it to your existing lead endpoint/table
  in Lovable/Supabase, or give me the Supabase anon key + table name and I'll wire the client insert.

## PUSH (run on YOUR Mac — it has your GitHub login; this sandbox does not)
```
cd ~/Desktop
git clone https://github.com/fendifrost-dot/fendi-frost-coming.git
cd fendi-frost-coming
rsync -a --exclude node_modules --exclude .git --exclude dist \
  "/Users/gocrazyglobal/ffh-work/fendifrost-com-site/" ./
git add -A
git commit -m "V1: Runway Music artist site"
git push origin main
```

## PUBLISH
Lovable auto-syncs from GitHub after the push. Then open Lovable → Share → Publish
(or tell Lovable chat to publish). Connect fendifrost.com in Lovable → Settings → Domains.
