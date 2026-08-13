import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { images } from "@/config/site";
import { useListenModal } from "@/context/ListenModalContext";

const Hero = () => {
  const { open } = useListenModal();

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src={images.fendiBanner}
        alt="Fendi Frost — Runway Music"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
      <div className="absolute inset-0 bg-background/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-24 text-center sm:pb-32">
        <p className="text-xs uppercase tracking-[0.4em] text-gold mb-6">
          Chicago House &times; Hip-Hop &times; Fashion
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-foreground">
          Fendi Frost
        </h1>
        <p className="mt-4 font-serif italic text-xl sm:text-2xl text-gold">Runway Music</p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button
            asChild
            className="rounded-none bg-gold text-background hover:bg-gold/90 uppercase text-xs tracking-[0.25em] px-8 h-12"
          >
            <Link to="/runway">Enter Runway Music</Link>
          </Button>
          <Button
            onClick={() => open("hero")}
            variant="outline"
            className="rounded-none border-foreground/40 text-foreground hover:bg-foreground hover:text-background uppercase text-xs tracking-[0.25em] px-8 h-12"
          >
            Listen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
