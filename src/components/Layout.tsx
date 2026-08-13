import { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
