import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { images, links } from "@/config/site";
import { outbound } from "@/lib/analytics";

const Fashion = () => {
  return (
    <>
      <Seo
        title="Fashion"
        path="/fashion"
        description="Be More Modest is the fashion extension of Runway Music — the same creative language, worn instead of played."
      />

      <section className="relative h-[70svh] min-h-[480px] w-full overflow-hidden">
        <img
          src={images.fendiPress}
          alt="Fendi Frost — fashion editorial"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-6">Music &times; Fashion</p>
          <h1 className="font-serif text-5xl sm:text-6xl uppercase tracking-tight">Be More Modest</h1>
        </div>
      </section>

      <section className="container py-20 sm:py-28 max-w-2xl mx-auto text-center">
        <Eyebrow className="justify-center flex">The Same Language, Worn</Eyebrow>
        <p className="text-muted-foreground leading-relaxed text-lg">
          Fashion has never been decoration around the music for Fendi Frost — it's part of the arrangement. Be
          More Modest is the streetwear extension of Runway Music: built in the same Workhouse, on the same
          timeline, with the same eye that directs the visuals and mixes the records.
        </p>
      </section>

      <section className="border-t border-border/30 py-20 sm:py-28">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AspectRatio ratio={4 / 5}>
            <img
              src={images.runwayKeyArt}
              alt="Runway Music key art"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <AspectRatio ratio={4 / 5}>
            <img
              src={images.fendiPress}
              alt="Fendi Frost editorial"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      </section>

      <section className="border-t border-border/30 py-24 sm:py-32">
        <div className="container text-center max-w-lg mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl mb-8">The Collection Lives at Be More Modest</h2>
          <button
            onClick={() => outbound(links.fashion, "fashion_page_cta", "fashion_page")}
            className="inline-block text-sm uppercase tracking-[0.25em] text-background bg-gold px-10 py-4 hover:bg-gold/90 transition-colors"
          >
            Explore the Collection &rarr; bemoremodest.com
          </button>
        </div>
      </section>
    </>
  );
};

export default Fashion;
