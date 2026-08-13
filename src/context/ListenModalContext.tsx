import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

interface ListenModalContextValue {
  isOpen: boolean;
  campaign: string;
  open: (campaign?: string) => void;
  close: () => void;
}

const ListenModalContext = createContext<ListenModalContextValue | undefined>(undefined);

export function ListenModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [campaign, setCampaign] = useState("site");

  const open = useCallback((c = "site") => {
    setCampaign(c);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, campaign, open, close }), [isOpen, campaign, open, close]);

  return <ListenModalContext.Provider value={value}>{children}</ListenModalContext.Provider>;
}

export function useListenModal(): ListenModalContextValue {
  const ctx = useContext(ListenModalContext);
  if (!ctx) throw new Error("useListenModal must be used within a ListenModalProvider");
  return ctx;
}
