import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Eyebrow from "@/components/Eyebrow";
import { images, links } from "@/config/site";
import { useListenModal } from "@/context/ListenModalContext";
import { outbound } from "@/lib/analytics";

const CurrentEra = () => {
  const { open } = useListenModal();

  return (
    <section className="container py-24 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <Eyebrow>Current Era</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight">Runway Music</h2>
          <p className="mt-2 text-gold font-serif italic text-lg">The Sound of Style</p>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Runway Music is the world Fendi Frost lives in right now — the record, and the language it speaks in.
            Chicago hip-hop phrasing over Chicago house DNA, with fashion and visual design treated as part of the
            music instead of decoration around it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              onClick={() => outbound(links.runwaySmartLink, "current_era_listen", "current_era")}
              className="rounded-none bg-gold text-background hover:bg-gold/90 uppercase text-xs tracking-[0.2em] h-11 px-6"
            >
              Listen
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-foreground/40 hover:bg-foreground hover:text-background uppercase text-xs tracking-[0.2em] h-11 px-6"
            >
              <Link to="/runway">View Full Project</Link>
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <AspectRatio ratio={1}>
            <img
              src={images.runwayAlbumCover}
              alt="Runway Music album art"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default CurrentEra;
