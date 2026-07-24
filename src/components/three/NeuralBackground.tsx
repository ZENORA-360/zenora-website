import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface NeuralBackgroundProps {
  className?: string;
  /** Particle count — keep moderate for hero ambient. Default: 320 */
  particleCount?: number;
  /** Flow speed multiplier. Default: 0.7 */
  speed?: number;
  /** Trail fade strength (higher = shorter trails). Default: 0.08 */
  trailOpacity?: number;
}

/**
 * Soft gold flow-field particles for the ZENORA hero.
 * Theme-aware (light/dark), non-blocking (pointer-events: none),
 * listens to mouse on window so CTAs stay clickable.
 */
export function NeuralBackground({
  className,
  particleCount = 320,
  speed = 0.7,
  trailOpacity = 0.08,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let particles: Particle[] = [];
    const mouse = { x: -2000, y: -2000 };
    let isDark = document.documentElement.classList.contains("dark");
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    class Particle {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      age = 0;
      life = 100;
      size = 1.2;

      constructor() {
        this.reset(true);
      }

      reset(randomAge = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = randomAge ? Math.random() * 120 : 0;
        this.life = 140 + Math.random() * 180;
        this.size = 1.3 + Math.random() * 1.6;
      }

      update() {
        const angle =
          (Math.cos(this.x * 0.0045) + Math.sin(this.y * 0.0045)) * Math.PI +
          Math.sin((this.x + this.y) * 0.0015) * 0.35;

        this.vx += Math.cos(angle) * 0.14 * speed;
        this.vy += Math.sin(angle) * 0.14 * speed;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 140;
        if (dist < radius && dist > 0.1) {
          const force = (radius - dist) / radius;
          this.vx -= (dx / dist) * force * 0.35;
          this.vy -= (dy / dist) * force * 0.35;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94;
        this.vy *= 0.94;

        this.age++;
        if (this.age > this.life) this.reset();

        if (this.x < -8) this.x = width + 8;
        if (this.x > width + 8) this.x = -8;
        if (this.y < -8) this.y = height + 8;
        if (this.y > height + 8) this.y = -8;
      }

      draw(context: CanvasRenderingContext2D) {
        const lifeT = this.age / this.life;
        const fade = 1 - Math.abs(lifeT - 0.5) * 2;
        const alpha = Math.max(0, fade) * (isDark ? 0.85 : 0.7);

        context.globalAlpha = alpha;
        context.fillStyle = isDark
          ? "rgba(245, 200, 90, 1)"
          : "rgba(150, 95, 8, 1)";
        context.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const init = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = reducedMotion ? Math.floor(particleCount * 0.35) : particleCount;
      particles = Array.from({ length: count }, () => new Particle());
    };

    const trailFill = () => {
      // Match page background so trails dissolve cleanly in both themes
      if (isDark) {
        return `rgba(3, 3, 3, ${trailOpacity})`;
      }
      return `rgba(251, 249, 245, ${Math.min(0.2, trailOpacity + 0.04)})`;
    };

    const animate = () => {
      if (reducedMotion) {
        ctx.clearRect(0, 0, width, height);
        ctx.globalAlpha = 1;
        particles.forEach((p) => {
          p.draw(ctx);
        });
        return;
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = trailFill();
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
      if (reducedMotion) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => p.draw(ctx));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
      // Soft reset trails when theme flips
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, width, height);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      reducedMotion = motionMq.matches;
      init();
      cancelAnimationFrame(animationFrameId);
      if (reducedMotion) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p) => p.draw(ctx));
      } else {
        animate();
      }
    };
    motionMq.addEventListener("change", onMotionChange);

    init();
    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => p.draw(ctx));
    } else {
      // Prime with a clear frame so first trail isn't a black flash in light mode
      ctx.clearRect(0, 0, width, height);
      animate();
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      motionMq.removeEventListener("change", onMotionChange);
      themeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, speed, trailOpacity]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
