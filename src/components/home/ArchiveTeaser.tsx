import { Link } from "react-router-dom";
import Eyebrow from "@/components/Eyebrow";
import { releases } from "@/config/site";

const archiveItems = releases.filter((r) => r.category === "ARCHIVE");

const ArchiveTeaser = () => {
  return (
    <section className="border-t border-border/30 py-24 sm:py-32">
      <div className="container">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <Eyebrow>The Archive</Eyebrow>
            <h2 className="font-serif text-4xl sm:text-5xl">Before Runway Music</h2>
          </div>
          <Link
            to="/archive"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors"
          >
            Explore the Archive &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border/30">
          {archiveItems.map((item) => (
            <div key={item.id} className="bg-background p-8">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">{item.year}</p>
              <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchiveTeaser;
