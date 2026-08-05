import { useEffect, useRef, useState, type ReactNode } from "react";
import { SiteLoader } from "@/components/SiteLoader";

const MIN_DISPLAY_MS = 800;
const MAX_WAIT_MS = 1500;
const FADE_MS = 550;

/** Warms the module cache for the routes visitors are most likely to hit next. */
function prefetchLikelyRoutes() {
  void import("@/pages/Services");
  void import("@/pages/APropos");
  void import("@/pages/Methode");
  void import("@/pages/Contact");
  void import("@/pages/Projects");
  void import("@/pages/Blog");
}

/**
 * Shows the ZENORA boot loader once, on first mount, while fonts settle and
 * we warm up the next likely route chunks. Does not re-trigger on client-side
 * navigation — it lives above the router and only cares about the initial load.
 */
export const AppBoot = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState(6);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const startedAt = useRef(typeof performance !== "undefined" ? performance.now() : 0);

  useEffect(() => {
    let cancelled = false;
    let progressTimer: number | undefined;

    const tick = () => {
      setProgress((p) => (p < 88 ? p + (88 - p) * 0.15 + 1 : p));
      progressTimer = window.setTimeout(tick, 110);
    };
    progressTimer = window.setTimeout(tick, 110);

    const fontsReady: Promise<unknown> =
      typeof document !== "undefined" && document.fonts ? document.fonts.ready : Promise.resolve();
    const timeout = new Promise((resolve) => window.setTimeout(resolve, MAX_WAIT_MS));

    Promise.race([fontsReady, timeout])
      .catch(() => undefined)
      .then(() => {
        if (cancelled) return;
        prefetchLikelyRoutes();

        const elapsed = performance.now() - startedAt.current;
        const remaining = Math.max(MIN_DISPLAY_MS - elapsed, 0);

        window.setTimeout(() => {
          if (cancelled) return;
          if (progressTimer) window.clearTimeout(progressTimer);
          setProgress(100);
          setFading(true);
          window.setTimeout(() => {
            if (!cancelled) setMounted(false);
          }, FADE_MS);
        }, remaining);
      });

    return () => {
      cancelled = true;
      if (progressTimer) window.clearTimeout(progressTimer);
    };
  }, []);

  return (
    <>
      {children}
      {mounted && <SiteLoader progress={progress} fading={fading} />}
    </>
  );
};
