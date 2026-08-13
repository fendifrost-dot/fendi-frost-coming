import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play } from "lucide-react";
import { visuals, links } from "@/config/site";
import type { Visual } from "@/config/site";
import { outbound } from "@/lib/analytics";

const VisualCard = ({ visual, size = "default" }: { visual: Visual; size?: "default" | "featured" }) => {
  const playable = Boolean(visual.videoUrl);

  return (
    <button
      onClick={() => {
        if (playable) outbound(visual.videoUrl!, `visual_${visual.id}`, "visuals");
      }}
      disabled={!playable}
      className={`group relative block w-full overflow-hidden bg-secondary text-left ${
        playable ? "cursor-pointer" : "cursor-default"
      }`}
      aria-label={playable ? `Watch ${visual.title} on YouTube` : `${visual.title} — coming soon`}
    >
      <AspectRatio ratio={size === "featured" ? 16 / 9 : 4 / 5} className="bg-secondary relative">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${visual.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        {playable && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span
              className={`flex items-center justify-center rounded-full border border-gold/70 bg-background/50 backdrop-blur ${
                size === "featured" ? "h-20 w-20" : "h-14 w-14"
              }`}
            >
              <Play
                className={size === "featured" ? "h-7 w-7 text-gold fill-gold" : "h-5 w-5 text-gold fill-gold"}
              />
            </span>
          </div>
        )}
        {!playable && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground border border-border/50 bg-background/60 px-4 py-2">
              Full film coming soon
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <h3
            className={`font-serif ${
              size === "featured" ? "text-3xl sm:text-4xl" : "text-xl"
            } text-foreground`}
          >
            {visual.title}
          </h3>
          <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-muted-foreground mt-2">
            {visual.credit}
          </p>
        </div>
      </AspectRatio>
    </button>
  );
};

const Visuals = () => {
  const [featured, ...rest] = visuals;

  return (
    <>
      <Seo
        title="Visuals"
        path="/visuals"
        description="The Fendi Frost fashion-film archive — curated visuals from the Runway Music world."
      />

      <section className="container py-28 sm:py-36 text-center">
        <Eyebrow className="justify-center flex">Fashion Film Archive</Eyebrow>
        <h1 className="font-serif text-5xl sm:text-6xl">Visuals</h1>
      </section>

      <section className="border-t border-border/30 py-16 sm:py-20">
        <div className="container">
          {featured && (
            <div className="mb-10 sm:mb-14">
              <VisualCard visual={featured} size="featured" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {rest.map((visual) => (
              <VisualCard key={visual.id} visual={visual} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => outbound(links.youtube, "visuals_page_youtube", "visuals")}
              className="text-xs uppercase tracking-[0.2em] text-foreground/80 border border-border/50 px-6 py-3 hover:border-gold hover:text-gold transition-colors"
            >
              View all on YouTube &rarr;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Visuals;
