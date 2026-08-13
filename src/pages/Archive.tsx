import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { releases, images } from "@/config/site";
import { useListenModal } from "@/context/ListenModalContext";

const archiveItems = releases.filter((r) => r.category === "ARCHIVE");

const Archive = () => {
  const { open } = useListenModal();

  return (
    <>
      <Seo
        title="Archive"
        path="/archive"
        description="The Fendi Frost archive — selected historical records and projects from before Runway Music."
      />

      <section className="container py-28 sm:py-36 text-center">
        <Eyebrow className="justify-center flex">The Archive</Eyebrow>
        <h1 className="font-serif text-5xl sm:text-6xl">Before Runway Music</h1>
        <p className="mt-6 max-w-lg mx-auto text-muted-foreground leading-relaxed">
          A living record of where the catalog started. More will be added here as the archive grows.
        </p>
      </section>

      <section className="border-t border-border/30 py-16 sm:py-20">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
          {archiveItems.map((item) => (
            <div key={item.id} className="bg-background p-8 flex flex-col">
              <img
                src={images.runwayKeyArt}
                alt=""
                aria-hidden
                loading="lazy"
                className="w-full h-40 object-cover mb-6 opacity-60"
              />
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                {item.type} &middot; {item.year}
              </p>
              <h3 className="font-serif text-2xl mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{item.description}</p>
              <button
                onClick={() => open("archive")}
                className="text-xs uppercase tracking-[0.2em] text-gold hover:opacity-70 transition-opacity self-start"
              >
                Listen
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Archive;
