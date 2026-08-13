import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { images } from "@/config/site";

const About = () => {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Fendi Frost — independent Chicago artist and producer. Chicago, music, house, hip-hop, fashion and independence."
      />

      <section className="container py-28 sm:py-36 text-center">
        <Eyebrow className="justify-center flex">About</Eyebrow>
        <h1 className="font-serif text-5xl sm:text-6xl">Fendi Frost</h1>
      </section>

      <section className="border-t border-border/30 py-20 sm:py-28">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AspectRatio ratio={4 / 5}>
            <img
              src={images.fendiPress}
              alt="Fendi Frost portrait"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
          <div>
            <Eyebrow>Chicago</Eyebrow>
            <p className="text-foreground leading-relaxed text-lg mb-8">
              Fendi Frost is an independent artist and producer working out of Chicago — a city that gave him two
              inheritances at once: hip-hop's phrasing and house music's pulse. "I live in the space between
              Chicago hip-hop and Chicago house," he says, and that space is the whole project.
            </p>

            <Eyebrow>Lineage</Eyebrow>
            <p className="text-muted-foreground leading-relaxed mb-8">
              His father played saxophone in the late '70s and '80s — a musician's household before it was a
              music career. That inheritance shows up less as a sound than as a standard: play it live, mean it,
              finish it yourself.
            </p>

            <Eyebrow>Music &amp; Fashion</Eyebrow>
            <p className="text-muted-foreground leading-relaxed">
              Fashion and visual design aren't marketing for the music — they're written into it. Every era gets
              a fashion reference before it gets a final mix. Be More Modest carries that language into clothing.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border/30 py-20 sm:py-28">
        <div className="container max-w-2xl mx-auto text-center">
          <Eyebrow className="justify-center flex">Independence</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-6">Run It Yourself</h2>
          <p className="text-muted-foreground leading-relaxed">
            Fendi Frost produces his own records, directs his own visuals, and runs the business side himself —
            independent in the fullest sense. No committee between the idea and the release.
          </p>
        </div>
      </section>

      <section id="workhouse" className="border-t border-border/30 py-20 sm:py-28 bg-secondary/20 scroll-mt-24">
        <div className="container max-w-2xl mx-auto text-center">
          <Eyebrow className="justify-center flex">The Workhouse</Eyebrow>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-6">Studio, Sound &amp; Sound Design</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Workhouse is Fendi Frost's studio and the operational base for everything — writing, production,
            mixing, visual direction, and the fashion language that runs through it all. Engineering choices lean
            toward warm, filtered low end and live-feeling drum programming; the same ear that tunes a mix also
            calls the wardrobe. One room, one throughline, start to finish.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
