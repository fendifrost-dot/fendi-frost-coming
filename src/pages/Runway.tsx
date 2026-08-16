import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { images, links, releases, runwayTracklist, songPages } from "@/config/site";
import { outbound } from "@/lib/analytics";

const tracklist = releases.filter((r) => r.category === "CURRENT ERA" || r.id === "heart-chakra");

const Runway = () => {
  return (
    <>
      <Seo
        title="Runway Music"
        path="/runway"
        description="Runway Music — the current world connecting music, fashion, artwork, sound design and Chicago. The sound of style, from Fendi Frost."
      />

      <section className="relative h-[80svh] min-h-[520px] w-full overflow-hidden">
        <img
          src={images.runwayKeyArt}
          alt="Runway Music key art"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-6">The Sound of Style</p>
          <h1 className="font-serif text-5xl sm:text-7xl uppercase tracking-tight">Runway Music</h1>
        </div>
      </section>

      <section className="container py-20 sm:py-28 max-w-3xl mx-auto text-center">
        <Eyebrow className="justify-center flex">Project Statement</Eyebrow>
        <p className="font-serif italic text-xl sm:text-2xl leading-relaxed text-foreground">
          "Runway Music is the space between Chicago hip-hop and Chicago house — rap phrasing over the same
          city's dance-floor DNA, with fashion and visual design treated as part of the music instead of
          decoration around it."
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => outbound(links.runwaySmartLink, "runway_page_listen", "runway_page")}
            className="text-xs uppercase tracking-[0.25em] text-background bg-gold px-8 py-3.5 hover:bg-gold/90 transition-colors"
          >
            Listen to Runway Music
          </button>
        </div>
      </section>

      <section className="border-t border-border/30 py-20 sm:py-28">
        <div className="container">
          <Eyebrow>Tracklist &amp; Featured Cuts</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl mb-12">From the Runway Music World</h2>

          <div className="divide-y divide-border/30 border-y border-border/30">
            {tracklist.map((track, i) => (
              <div key={track.id} className="flex items-center justify-between py-6 gap-4">
                <div className="flex items-center gap-6">
                  <span className="text-muted-foreground text-sm w-6">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    {track.parent && (
                      <p className="text-[10px] uppercase tracking-[0.15em] text-gold/80 mb-1">{track.parent}</p>
                    )}
                    <h3 className="font-serif text-xl sm:text-2xl">{track.title}</h3>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">
                      {track.type} &middot; {track.year}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => outbound(track.listenUrl ?? links.runwaySmartLink, `runway_track_${track.id}`, "runway_page")}
                  className="text-xs uppercase tracking-[0.2em] text-gold hover:opacity-70 transition-opacity shrink-0"
                >
                  Listen
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Deep Dive: Song Pages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {songPages.map((song) => (
                <Link
                  key={song.slug}
                  to={`/runway/${song.slug}`}
                  className="group border border-border/30 p-6 hover:border-gold transition-colors"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {song.status === "live" ? "Now Playing" : "From the Runway Music World"}
                  </p>
                  <h4 className="font-serif text-xl group-hover:text-gold transition-colors">{song.title}</h4>
                  <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.2em] text-gold">
                    Read the Story &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/30 py-20 sm:py-28 bg-secondary/10">
        <div className="container max-w-2xl mx-auto">
          <Eyebrow className="justify-center flex">Full Tracklist</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl mb-12 text-center">Runway Music &mdash; 15 Tracks</h2>
          <ol className="divide-y divide-border/30 border-y border-border/30">
            {runwayTracklist.map((track, i) => {
              const songPage = songPages.find(
                (s) => s.title.toLowerCase() === track.toLowerCase() || s.title.toLowerCase().startsWith(track.toLowerCase().split(" (")[0]),
              );
              return (
                <li key={track} className="flex items-center justify-between py-4 gap-4">
                  <div className="flex items-center gap-6">
                    <span className="text-muted-foreground text-sm w-6">{String(i + 1).padStart(2, "0")}</span>
                    {songPage ? (
                      <Link to={`/runway/${songPage.slug}`} className="font-serif text-lg hover:text-gold transition-colors">
                        {track}
                      </Link>
                    ) : (
                      <span className="font-serif text-lg">{track}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-border/30 py-20 sm:py-28">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AspectRatio ratio={4 / 5}>
            <img
              src={images.fendiPress}
              alt="Fendi Frost — Runway Music editorial"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <div>
            <Eyebrow>Fashion Language</Eyebrow>
            <h2 className="font-serif text-4xl sm:text-5xl leading-tight">Worn, Not Just Played</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Every Runway Music era gets a fashion reference before it gets a mix note. Silhouette, texture and
              tempo move together — the clothes are part of the arrangement.
            </p>
          </div>
        </div>
      </section>

      <section id="workhouse" className="border-t border-border/30 py-20 sm:py-28 bg-secondary/20">
        <div className="container max-w-3xl mx-auto text-center">
          <Eyebrow className="justify-center flex">Workhouse Production Notes</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">Built in the Workhouse</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Every record on Runway Music is written, produced, mixed and directed out of the Workhouse — Fendi
            Frost's studio and the base for the whole operation. Sound design leans on warm, filtered low end and
            live-feeling drum programming; visuals and fashion direction are cut in the same room, on the same
            timeline, by the same person.
          </p>
        </div>
      </section>

      <section className="border-t border-border/30 py-16">
        <div className="container max-w-2xl mx-auto text-center text-sm text-muted-foreground">
          <h3 className="text-xs uppercase tracking-[0.2em] mb-4">Credits</h3>
          <p>Written, produced &amp; directed by Fendi Frost at the Workhouse, Chicago.</p>
        </div>
      </section>
    </>
  );
};

export default Runway;
