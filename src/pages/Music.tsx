import Seo from "@/components/Seo";
import Eyebrow from "@/components/Eyebrow";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { releases, images } from "@/config/site";
import type { ReleaseCategory } from "@/config/site";
import { outbound } from "@/lib/analytics";
import { useListenModal } from "@/context/ListenModalContext";
import { cn } from "@/lib/utils";

const groups: { label: string; category: ReleaseCategory }[] = [
  { label: "Current Era", category: "CURRENT ERA" },
  { label: "Essential Records", category: "ESSENTIAL" },
  { label: "Archives", category: "ARCHIVE" },
];

const Music = () => {
  const { open } = useListenModal();

  return (
    <>
      <Seo
        title="Music"
        path="/music"
        description="The full Fendi Frost catalog — Runway Music, essential records and archives, organized editorially."
      />

      <section className="container py-28 sm:py-36 text-center">
        <Eyebrow className="justify-center flex">Catalog</Eyebrow>
        <h1 className="font-serif text-5xl sm:text-6xl">Music</h1>
      </section>

      {groups.map(({ label, category }) => {
        const items = releases.filter((r) => r.category === category);
        if (!items.length) return null;
        return (
          <section key={category} className="border-t border-border/30 py-16 sm:py-20">
            <div className="container">
              <h2 className="font-serif text-3xl sm:text-4xl mb-10">{label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((release) => (
                  <div key={release.id} className="group">
                    <AspectRatio ratio={1} className="bg-secondary mb-4 overflow-hidden">
                      <img
                        src={release.art ?? images.runwayKeyArt}
                        alt={release.title}
                        loading="lazy"
                        className={cn(
                          "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                          !release.art && "opacity-70",
                        )}
                      />
                    </AspectRatio>
                    {release.parent && (
                      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 mb-1">
                        {release.parent}
                      </p>
                    )}
                    <p
                      className={cn(
                        "text-[10px] uppercase tracking-[0.15em] mb-1",
                        release.accent === "chakra" ? "text-chakra" : "text-gold",
                      )}
                    >
                      {release.type} &middot; {release.year}
                    </p>
                    <h3 className="font-serif text-xl mb-2">{release.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{release.description}</p>
                    <button
                      onClick={() =>
                        release.listenUrl
                          ? outbound(release.listenUrl, `music_page_${release.id}`, "music_page")
                          : open("music_page")
                      }
                      className="text-xs uppercase tracking-[0.2em] text-gold hover:opacity-70 transition-opacity"
                    >
                      Listen
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Music;
