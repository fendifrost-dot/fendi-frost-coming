import { Link } from "react-router-dom";
import { links, handles, featureFlags } from "@/config/site";
import { useListenModal } from "@/context/ListenModalContext";
import { outbound } from "@/lib/analytics";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const { open } = useListenModal();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span className="font-serif text-2xl uppercase tracking-[0.1em]">Fendi Frost</span>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Independent Chicago artist and producer. Runway Music is the sound of style — music, fashion and
            visual design as one world.
          </p>
          <button
            onClick={() => open("footer")}
            className="mt-6 text-xs uppercase tracking-[0.2em] text-gold border border-gold px-5 py-3 hover:bg-gold hover:text-background transition-colors"
          >
            Listen Now
          </button>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Streaming</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={() => outbound(links.spotify, "footer_spotify", "footer")}
                className="hover:text-gold transition-colors"
              >
                Spotify
              </button>
            </li>
            <li>
              <button
                onClick={() => outbound(links.appleMusic, "footer_apple", "footer")}
                className="hover:text-gold transition-colors"
              >
                Apple Music
              </button>
            </li>
            <li>
              <button
                onClick={() => outbound(links.soundcloud, "footer_soundcloud", "footer")}
                className="hover:text-gold transition-colors"
              >
                SoundCloud
              </button>
            </li>
            {featureFlags.showYoutube && (
              <li>
                <button
                  onClick={() => outbound(links.youtube, "footer_youtube", "footer")}
                  className="hover:text-gold transition-colors"
                >
                  YouTube
                </button>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Connect</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={() => outbound(links.instagram, "footer_instagram", "footer")}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Instagram className="h-3.5 w-3.5" /> {handles.instagram}
              </button>
            </li>
            <li>
              <button
                onClick={() => outbound(links.twitter, "footer_twitter", "footer")}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Twitter className="h-3.5 w-3.5" /> {handles.twitter}
              </button>
            </li>
            {featureFlags.showReddit && (
              <li>
                <button
                  onClick={() => outbound(links.reddit, "footer_reddit", "footer")}
                  className="hover:text-gold transition-colors"
                >
                  Join the Conversation
                </button>
              </li>
            )}
            <li>
              <Link to="/fashion" className="hover:text-gold transition-colors">
                Be More Modest
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground uppercase tracking-[0.15em]">
          <span>&copy; {year} Fendi Frost</span>
          <span>Chicago</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
