import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Eyebrow from "@/components/Eyebrow";
import { visuals, links } from "@/config/site";
import { outbound } from "@/lib/analytics";

const VisualFilm = () => {
  const featured = visuals.find((v) => v.featured) ?? visuals[0];

  return (
    <section className="border-t border-border/30 py-24 sm:py-32">
      <div className="container">
        <Eyebrow>Visual Film</Eyebrow>
        <h2 className="font-serif text-4xl sm:text-5xl mb-10">Runway Music, In Motion</h2>
      </div>
      <div className="relative">
        <Link
          to="/visuals"
          aria-label={`Watch ${featured.title} and more on the Visuals page`}
          className="group relative block"
        >
          <AspectRatio ratio={21 / 9} className="bg-secondary relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${featured.poster})` }}
            />
            <div className="absolute inset-0 bg-background/40" />
          </AspectRatio>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-gold/70 bg-background/40 backdrop-blur transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 sm:h-7 sm:w-7 text-gold fill-gold" />
            </span>
          </span>
        </Link>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
          <p className="font-serif italic text-lg sm:text-2xl text-foreground">The Sound of Style</p>
          <div className="flex flex-col items-end gap-2 pointer-events-auto">
            <Link
              to="/visuals"
              className="text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-gold transition-colors"
            >
              View Visuals &rarr;
            </Link>
            <button
              onClick={() => outbound(links.youtube, "home_visual_film_youtube", "visuals")}
              className="text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-gold transition-colors"
            >
              View all on YouTube &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualFilm;
