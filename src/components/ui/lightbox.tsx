import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export const Lightbox = ({ images, index, onClose, onChange }: LightboxProps) => {
  const isOpen = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % images.length);
  }, [index, images.length, onChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onChange]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, next, prev, onClose]);

  return (
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-card/80 backdrop-blur border border-border hover:bg-primary/20 flex items-center justify-center transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur border border-border hover:bg-primary/20 flex items-center justify-center transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Précédent"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-card/80 backdrop-blur border border-border hover:bg-primary/20 flex items-center justify-center transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Suivant"
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </>
          )}
          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            src={images[index]}
            alt={`Visuel ${index + 1}`}
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-card/80 backdrop-blur border border-border text-xs font-mono text-muted-foreground">
              {index + 1} / {images.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
