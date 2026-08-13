import Eyebrow from "@/components/Eyebrow";
import { images, links } from "@/config/site";
import { outbound } from "@/lib/analytics";

const FashionBridge = () => {
  return (
    <section className="border-t border-border/30 py-24 sm:py-32">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={images.fendiPress}
            alt="Fendi Frost"
            loading="lazy"
            className="w-full h-[420px] sm:h-[560px] object-cover object-top"
          />
        </div>
        <div>
          <Eyebrow>Music &times; Fashion</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">The Runway Doesn't Stop at Sound</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Fashion isn't merch. It's the same creative language, worn instead of played. Be More Modest is the
            streetwear extension of Runway Music — built by the same hands, in the same studio, on the same
            timeline as the songs.
          </p>
          <button
            onClick={() => outbound(links.fashion, "fashion_bridge_cta", "fashion_bridge")}
            className="mt-8 inline-block text-xs uppercase tracking-[0.25em] text-gold border border-gold px-7 py-3.5 hover:bg-gold hover:text-background transition-colors"
          >
            Explore Be More Modest
          </button>
        </div>
      </div>
    </section>
  );
};

export default FashionBridge;
