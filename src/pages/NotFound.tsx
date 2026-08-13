import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Seo title="Page Not Found" path={location.pathname} noindex />
      <section className="flex min-h-[80svh] flex-col items-center justify-center text-center px-6">
        <p className="text-xs uppercase tracking-[0.4em] text-gold mb-6">Off the Runway</p>
        <h1 className="font-serif text-6xl sm:text-8xl mb-6">404</h1>
        <p className="text-muted-foreground max-w-sm mb-10 leading-relaxed">
          This page doesn't exist in the Runway Music world — yet.
        </p>
        <Link
          to="/"
          className="text-xs uppercase tracking-[0.25em] text-background bg-gold px-8 py-3.5 hover:bg-gold/90 transition-colors"
        >
          Back to Fendi Frost
        </Link>
      </section>
    </>
  );
};

export default NotFound;
