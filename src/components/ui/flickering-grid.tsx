import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
}

/**
 * Soft canvas square grid with sparse gold flicker.
 * Pauses off-screen / reduced-motion; theme-aware via CSS --primary by default.
 */
export function FlickeringGrid({
  squareSize = 3,
  gridGap = 8,
  flickerChance = 0.08,
  color,
  width,
  height,
  className,
  maxOpacity = 0.14,
  ...props
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);
  const gridRef = useRef<{
    cols: number;
    rows: number;
    squares: Float32Array;
    dpr: number;
  } | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const [resolvedColor, setResolvedColor] = useState("rgba(212, 168, 67,");

  const colorSource = color ?? "hsl(var(--primary))";

  useEffect(() => {
    const probe = document.createElement("canvas");
    probe.width = probe.height = 1;
    const ctx = probe.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = colorSource;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
    setResolvedColor(`rgba(${r}, ${g}, ${b},`);
  }, [colorSource]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const cols = Math.ceil(w / (squareSize + gridGap));
      const rows = Math.ceil(h / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);

      for (let i = 0; i < squares.length; i++) {
        // Sparse base: most cells nearly invisible
        squares[i] = Math.random() < 0.35 ? Math.random() * maxOpacity * 0.55 : Math.random() * maxOpacity * 0.12;
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
      colorPrefix: string,
    ) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const cell = (squareSize + gridGap) * dpr;
      const size = squareSize * dpr;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          if (opacity < 0.01) continue;
          ctx.fillStyle = `${colorPrefix}${opacity})`;
          ctx.fillRect(i * cell, j * cell, size, size);
        }
      }
    },
    [squareSize, gridGap],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const w = width ?? container.clientWidth;
      const h = height ?? container.clientHeight;
      if (w <= 0 || h <= 0) return;
      gridRef.current = setupCanvas(canvas, w, h);
      if (gridRef.current) {
        drawGrid(
          ctx,
          canvas.width,
          canvas.height,
          gridRef.current.cols,
          gridRef.current.rows,
          gridRef.current.squares,
          gridRef.current.dpr,
          resolvedColor,
        );
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !prefersReducedMotion) {
          lastTimeRef.current = performance.now();
          startLoop();
        } else if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const onVisibility = () => {
      if (document.hidden && rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!document.hidden && isInViewRef.current && !prefersReducedMotion) {
        lastTimeRef.current = performance.now();
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    function animate(time: number) {
      if (!isInViewRef.current || prefersReducedMotion || !gridRef.current || !ctx || !canvas) {
        rafRef.current = null;
        return;
      }

      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      const { squares, cols, rows, dpr } = gridRef.current;
      const chance = flickerChance * delta;

      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < chance) {
          // Soft flicker: mostly dim, rare brighter pulse
          squares[i] =
            Math.random() < 0.18
              ? maxOpacity * (0.45 + Math.random() * 0.55)
              : Math.random() * maxOpacity * 0.35;
        }
      }

      drawGrid(ctx, canvas.width, canvas.height, cols, rows, squares, dpr, resolvedColor);
      rafRef.current = requestAnimationFrame(animate);
    }

    function startLoop() {
      if (rafRef.current !== null || prefersReducedMotion) return;
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [
    setupCanvas,
    drawGrid,
    width,
    height,
    flickerChance,
    maxOpacity,
    resolvedColor,
    prefersReducedMotion,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      aria-hidden
      {...props}
    >
      <canvas ref={canvasRef} className="pointer-events-none block size-full" />
    </div>
  );
}
