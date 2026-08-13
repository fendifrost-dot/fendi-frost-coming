// Lightweight analytics helper: GA4 (gtag) + Meta Pixel.
// Everything no-ops cleanly when IDs are not configured.

import { analyticsConfig } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let initialized = false;

/**
 * Injects GA4 + Meta Pixel scripts if their IDs are configured.
 * Safe to call multiple times — only runs once.
 */
export function initAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const { gaId, metaPixelId } = analyticsConfig;

  if (gaId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { send_page_view: false });
  }

  if (metaPixelId) {
    /* eslint-disable */
    (function (f: any, b: any, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function (...args: unknown[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e);
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq?.("init", metaPixelId);
    window.fbq?.("track", "PageView");
  }
}

export function pageview(path: string): void {
  if (window.gtag && analyticsConfig.gaId) {
    window.gtag("event", "page_view", { page_path: path });
  }
  if (window.fbq && analyticsConfig.metaPixelId) {
    window.fbq("track", "PageView");
  }
}

export function track(event: string, props: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (window.gtag && analyticsConfig.gaId) {
    window.gtag("event", event, props);
  }
  if (window.fbq && analyticsConfig.metaPixelId) {
    window.fbq("trackCustom", event, props);
  }
}

/**
 * Appends UTM params to an outbound URL, tracks the click, then opens it.
 */
export function outbound(url: string, label: string, campaign = "site"): void {
  if (!url) return;

  track("outbound_click", { label, url, campaign });

  let finalUrl = url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("utm_source", "fendifrost.com");
    parsed.searchParams.set("utm_medium", "site");
    parsed.searchParams.set("utm_campaign", campaign);
    finalUrl = parsed.toString();
  } catch {
    // If URL parsing fails (relative/invalid), fall back to the raw url.
    finalUrl = url;
  }

  if (typeof window !== "undefined") {
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  }
}
