import { cn } from "@/lib/utils";

const Eyebrow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-xs uppercase tracking-[0.3em] text-gold mb-4", className)}>{children}</p>
);

export default Eyebrow;
