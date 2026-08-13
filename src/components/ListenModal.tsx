import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useListenModal } from "@/context/ListenModalContext";
import { links, featureFlags } from "@/config/site";
import { outbound } from "@/lib/analytics";
import { Music2, Disc3, Cloud, Youtube } from "lucide-react";

const OPTIONS = [
  { key: "spotify", label: "Spotify", url: links.spotify, Icon: Music2 },
  { key: "apple", label: "Apple Music", url: links.appleMusic, Icon: Disc3 },
  { key: "soundcloud", label: "SoundCloud", url: links.soundcloud, Icon: Cloud },
] as const;

const ListenModal = () => {
  const { isOpen, close, campaign } = useListenModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="bg-background border-border/40 text-foreground max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl tracking-tight">Listen</DialogTitle>
          <DialogDescription className="text-muted-foreground uppercase text-xs tracking-[0.2em]">
            Choose your platform
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 pt-2">
          {OPTIONS.map(({ key, label, url, Icon }) => (
            <button
              key={key}
              onClick={() => {
                outbound(url, `listen_modal_${key}`, campaign);
                close();
              }}
              className="group flex items-center justify-between border border-border/40 px-4 py-3.5 text-left transition-colors hover:border-gold hover:bg-gold/5"
            >
              <span className="flex items-center gap-3 text-sm uppercase tracking-[0.15em]">
                <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                {label}
              </span>
              <span className="text-muted-foreground group-hover:text-gold transition-colors">&rarr;</span>
            </button>
          ))}
          {featureFlags.showYoutube && (
            <button
              onClick={() => {
                outbound(links.youtube, "listen_modal_youtube", campaign);
                close();
              }}
              className="group flex items-center justify-between border border-border/40 px-4 py-3.5 text-left transition-colors hover:border-gold hover:bg-gold/5"
            >
              <span className="flex items-center gap-3 text-sm uppercase tracking-[0.15em]">
                <Youtube className="h-4 w-4 text-gold" strokeWidth={1.5} />
                YouTube
              </span>
              <span className="text-muted-foreground group-hover:text-gold transition-colors">&rarr;</span>
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListenModal;
