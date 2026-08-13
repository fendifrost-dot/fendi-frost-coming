import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navItems } from "@/config/site";
import { useListenModal } from "@/context/ListenModalContext";
import { cn } from "@/lib/utils";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useListenModal();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur border-b border-border/40 py-3" : "bg-transparent py-6",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-lg tracking-[0.15em] uppercase text-foreground hover:text-gold transition-colors"
        >
          Fendi Frost
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-xs uppercase tracking-[0.2em] transition-colors hover:text-gold",
                location.pathname === item.to ? "text-gold" : "text-foreground/80",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button
            onClick={() => open("nav")}
            variant="outline"
            size="sm"
            className="rounded-none border-gold text-gold hover:bg-gold hover:text-background uppercase text-xs tracking-[0.2em]"
          >
            Listen
          </Button>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Button
            onClick={() => open("nav_mobile")}
            variant="outline"
            size="sm"
            className="rounded-none border-gold text-gold hover:bg-gold hover:text-background uppercase text-[10px] tracking-[0.2em] px-3"
          >
            Listen
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="text-foreground p-2 -mr-2"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-full bg-background border-none p-0 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-border/40">
                <span className="font-serif text-lg tracking-[0.15em] uppercase">Menu</span>
                <SheetClose asChild>
                  <button aria-label="Close menu" className="p-2 -mr-2">
                    <X className="h-6 w-6" />
                  </button>
                </SheetClose>
              </div>
              <nav className="flex flex-col justify-center flex-1 px-8 gap-8">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "font-serif text-3xl uppercase tracking-wide transition-colors hover:text-gold",
                        location.pathname === item.to ? "text-gold" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Nav;
