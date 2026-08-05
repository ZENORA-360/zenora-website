import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { MeshGrid } from "@/components/ui/mesh-grid";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const isFr = language === "fr";

  useEffect(() => {
    // Quiet, single-line log — not console.error, so it doesn't get flagged
    // as a real exception by error trackers watching this route.
    console.info(`[404] no route for "${location.pathname}"`);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center">
      <SEO
        title="404"
        description={
          isFr
            ? "La page demandée n'existe pas ou a été déplacée."
            : "The page you requested doesn't exist or has moved."
        }
        noindex
      />

      {/* Atmosphere — lighter version of the PageHero treatment */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[hsl(0_0%_2%)] dark:to-black" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.14] blur-[120px]" />
        <div
          className="absolute inset-0 text-primary/40 dark:text-primary/30"
          style={{
            maskImage: "radial-gradient(ellipse 65% 55% at 50% 45%, black 0%, transparent 76%)",
            WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 45%, black 0%, transparent 76%)",
          }}
        >
          <MeshGrid size={64} fineSize={16} />
        </div>
        <div className="absolute inset-0 opacity-[0.18] mix-blend-soft-light">
          <NoiseTexture frequency={0.75} octaves={2} slope={0.06} noiseOpacity={0.4} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex max-w-xl flex-col items-center"
      >
        <div className="mb-2 flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          <span className="section-eyebrow">ZENORA</span>
          <span className="h-px w-8 bg-primary" />
        </div>

        <h1 className="text-gradient-gold font-display text-[6rem] font-bold leading-none tracking-tight sm:text-[8.5rem]">
          404
        </h1>

        <h2 className="mt-5 font-display text-2xl font-bold text-foreground sm:text-3xl">
          {isFr ? "Cette page a quitté la trajectoire" : "This page left the trajectory"}
        </h2>

        <p className="section-lead-lg mt-4">
          {isFr
            ? "La page que vous cherchez n'existe pas ou a été déplacée. Revenons vers le zénith."
            : "The page you're looking for doesn't exist or has moved. Let's head back toward the zenith."}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="gold" size="lg" asChild>
            <Link to="/">
              <Home className="h-5 w-5" />
              {isFr ? "Retour à l'accueil" : "Back to home"}
            </Link>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <Link to="/contact">
              <MessageCircle className="h-5 w-5" />
              {isFr ? "Contactez-nous" : "Contact us"}
            </Link>
          </Button>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/70">
          {isFr ? "Chemin demandé : " : "Requested path: "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">{location.pathname}</code>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
