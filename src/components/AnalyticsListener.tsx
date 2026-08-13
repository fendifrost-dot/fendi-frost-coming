import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, pageview } from "@/lib/analytics";

const AnalyticsListener = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    pageview(location.pathname);
  }, [location.pathname]);

  return null;
};

export default AnalyticsListener;
