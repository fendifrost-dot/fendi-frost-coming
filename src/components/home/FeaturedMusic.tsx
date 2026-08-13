import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Eyebrow from "@/components/Eyebrow";
import { releases, images } from "@/config/site";
import { outbound } from "@/lib/analytics";
import { useListenModal } from "@/context/ListenModalContext";
import { cn } from "@/lib/utils";

const featured = releases.filter((r) => r.category === "CURRENT ERA" || r.category === "ESSENTIAL").slice(0, 5);

const FeaturedMusic = () => {
  const { open } = useListenModal();

  return (
    <section className="container py-24 sm:py-32 border-t border-border/30">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <Eyebrow>Featured Music</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl">Selected Records</h2>
        </div>
        <Link
          to="/music"
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors"
        >
          View Full Catalog &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {featured.map((release) => (
          <div key={release.id} className="group">
            <AspectRatio ratio={1} className="bg-secondary mb-3 overflow-hidden">
              {release.art ? (
                <img
                  src={release.art}
                  alt={release.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <img
                  src={images.runwayKeyArt}
                  alt={release.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </AspectRatio>
            <p
              className={cn(
                "text-xs uppercase tracking-[0.15em] mb-1",
                release.accent === "chakra" ? "text-chakra" : "text-gold",
              )}
            >
              {release.category}
            </p>
            <h3 className="font-serif text-sm sm:text-base leading-tight">{release.title}</h3>
            <button
              onClick={() =>
                release.listenUrl
                  ? outbound(release.listenUrl, `featured_${release.id}`, "featured_music")
                  : open("featured_music")
              }
              className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors"
            >
              Listen
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedMusic;
