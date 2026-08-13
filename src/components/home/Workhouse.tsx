import { Link } from "react-router-dom";
import Eyebrow from "@/components/Eyebrow";

const Workhouse = () => {
  return (
    <section className="border-t border-border/30 py-24 sm:py-32 bg-secondary/20">
      <div className="container max-w-3xl text-center mx-auto">
        <Eyebrow className="justify-center flex">From the Workhouse</Eyebrow>
        <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
          Written, Produced &amp; Directed Independently
        </h2>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          The Workhouse is where the records get built, the visuals get cut, and the business gets run — all by
          Fendi Frost. No outside label, no outside vision. Sound design, mixing, direction and the fashion
          language all pass through the same room, the same hands.
        </p>
        <Link
          to="/about#workhouse"
          className="mt-8 inline-block text-xs uppercase tracking-[0.25em] text-gold border-b border-gold pb-1 hover:opacity-70 transition-opacity"
        >
          Inside the Workhouse
        </Link>
      </div>
    </section>
  );
};

export default Workhouse;
