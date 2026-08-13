import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListenModalProvider } from "@/context/ListenModalContext";
import ListenModal from "@/components/ListenModal";
import Layout from "@/components/Layout";
import PageLoader from "@/components/PageLoader";
import AnalyticsListener from "@/components/AnalyticsListener";

const Index = lazy(() => import("./pages/Index"));
const Runway = lazy(() => import("./pages/Runway"));
const SongPage = lazy(() => import("./pages/SongPage"));
const Music = lazy(() => import("./pages/Music"));
const Fashion = lazy(() => import("./pages/Fashion"));
const Visuals = lazy(() => import("./pages/Visuals"));
const About = lazy(() => import("./pages/About"));
const Archive = lazy(() => import("./pages/Archive"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ListenModalProvider>
          <BrowserRouter>
            <AnalyticsListener />
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/runway" element={<Runway />} />
                  <Route path="/runway/:slug" element={<SongPage />} />
                  <Route path="/music" element={<Music />} />
                  <Route path="/fashion" element={<Fashion />} />
                  <Route path="/visuals" element={<Visuals />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/archive" element={<Archive />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
            <ListenModal />
          </BrowserRouter>
        </ListenModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
