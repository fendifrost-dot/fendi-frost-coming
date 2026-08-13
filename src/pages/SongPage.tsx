import { Link, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { songPages, images, links } from "@/config/site";
import { useListenModal } from "@/context/ListenModalContext";
import { outbound } from "@/lib/analytics";

const SongPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { open } = useListenModal();
  const song = songPages.find((s) => s.slug === slug);

  if (!song) {
    return (
      <>
        <Seo title="Coming Soon" path={`/runway/${slug ?? ""}`} noindex />
        <section className="container py-32 text-center max-w-lg mx-auto">
          <Eyebrow className="justify-center flex">Runway Music</Eyebrow>
          <h1 className="font-serif text-4xl sm:text-5xl mb-6">Coming Soon</h1>
          <p className="text-muted-foreground leading-relaxed">
            This page hasn't dropped yet. This cut is still taking shape inside the Runway Music world.
          </p>
          <Link
            to="/runway"
            className="mt-8 inline-block text-xs uppercase tracking-[0.2em] text-gold border-b border-gold pb-1"
          >
            Back to Runway Music
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title={song.title}
        path={`/runway/${song.slug}`}
        description={song.story.slice(0, 155)}
        image={song.art ?? images.runwayKeyArt}
        type="music.song"
      />

      <section className="relative h-[60svh] min-h-[420px] w-full overflow-hidden">
        <img
          src={song.art ?? images.runwayKeyArt}
          alt={song.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-16 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
            {song.status === "live" ? song.era : `From the ${song.era} World`}
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl uppercase tracking-tight">{song.title}</h1>
        </div>
      </section>

      <section className="container py-20 max-w-2xl mx-auto">
        <Eyebrow>The Story</Eyebrow>
        <p className="text-foreground leading-relaxed text-lg">{song.story}</p>

        <Eyebrow className="mt-12">Workhouse Production Note</Eyebrow>
        <p className="text-muted-foreground leading-relaxed">{song.productionNote}</p>

        <Eyebrow className="mt-12">Fashion Reference</Eyebrow>
        <p className="text-muted-foreground leading-relaxed italic font-serif text-lg">{song.fashionRef}</p>

        <div className="mt-14 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() =>
              song.listenUrl
                ? outbound(song.listenUrl, `song_page_${song.slug}`, "song_page")
                : open("song_page")
            }
            className="text-xs uppercase tracking-[0.25em] text-background bg-gold px-8 py-3.5 hover:bg-gold/90 transition-colors w-full sm:w-auto text-center"
          >
            {song.status === "live" ? "Listen Now" : "Listen to Runway Music"}
          </button>
          <Link
            to="/runway"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors"
          >
            Back to Runway Music
          </Link>
        </div>
      </section>

      <section className="border-t border-border/30 py-16">
        <div className="container grid grid-cols-1 sm:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
          <AspectRatio ratio={4 / 3}>
            <img
              src={images.fendiPress}
              alt="Be More Modest"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Also From the World</p>
            <h3 className="font-serif text-2xl mb-4">Be More Modest</h3>
            <button
              onClick={() => outbound(links.fashion, `song_page_fashion_${song.slug}`, "song_page")}
              className="text-xs uppercase tracking-[0.2em] text-gold border-b border-gold pb-1"
            >
              Explore the Collection
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SongPage;
