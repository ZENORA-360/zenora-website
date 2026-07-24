import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

/**
 * ZenoraGlobe — Canvas 2D network globe for the hero.
 * Hub: Yaoundé. Spokes: African & international nodes.
 * Gold / bronze palette adapts to light & dark theme.
 */

type LatLng = [number, number];

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  hub?: boolean;
}

interface Connection {
  from: LatLng;
  to: LatLng;
}

interface GlobeProps {
  className?: string;
  /** When true, ignores pointer (hero ambient). Default true. */
  ambient?: boolean;
}

/** Yaoundé HQ */
const HUB: LatLng = [3.848, 11.502];

const ZENORA_MARKERS: Marker[] = [
  { lat: 3.848, lng: 11.502, label: "Yaoundé", hub: true },
  { lat: 4.051, lng: 9.768, label: "Douala" },
  { lat: 6.524, lng: 3.379, label: "Lagos" },
  { lat: 5.36, lng: -4.008, label: "Abidjan" },
  { lat: 14.693, lng: -17.444, label: "Dakar" },
  { lat: -1.292, lng: 36.822, label: "Nairobi" },
  { lat: -26.204, lng: 28.047, label: "Johannesburg" },
  { lat: 48.857, lng: 2.352, label: "Paris" },
  { lat: 25.205, lng: 55.271, label: "Dubai" },
];

const ZENORA_CONNECTIONS: Connection[] = [
  { from: HUB, to: [4.051, 9.768] },
  { from: HUB, to: [6.524, 3.379] },
  { from: HUB, to: [5.36, -4.008] },
  { from: HUB, to: [14.693, -17.444] },
  { from: HUB, to: [-1.292, 36.822] },
  { from: HUB, to: [-26.204, 28.047] },
  { from: HUB, to: [48.857, 2.352] },
  { from: HUB, to: [25.205, 55.271] },
];

function latLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  fov: number
): [number, number] {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy];
}

function rgba(r: number, g: number, b: number, alpha: number) {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type Palette = {
  glow: (a: number) => string;
  mid: (a: number) => string;
  bright: (a: number) => string;
  label: (a: number) => string;
  boost: number;
};

function getPalette(isDark: boolean): Palette {
  if (isDark) {
    return {
      glow: (a) => rgba(212, 160, 32, a),
      mid: (a) => rgba(212, 160, 32, a),
      bright: (a) => rgba(245, 200, 90, a),
      label: (a) => rgba(245, 200, 90, a),
      boost: 1,
    };
  }
  // Light: deeper bronze so the globe reads on cream / white
  return {
    glow: (a) => rgba(175, 115, 15, a),
    mid: (a) => rgba(145, 90, 8, a),
    bright: (a) => rgba(175, 115, 12, a),
    label: (a) => rgba(75, 45, 5, a),
    boost: 2,
  };
}

function isDocumentDark() {
  return document.documentElement.classList.contains("dark");
}

export function NetworkScene({ className, ambient = true }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef = useRef(0.85);
  const rotXRef = useRef(0.18);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startRotY: 0,
    startRotX: 0,
  });
  const animRef = useRef(0);
  const timeRef = useRef(0);
  const dotsRef = useRef<[number, number, number][]>([]);
  const reducedMotionRef = useRef(false);
  const isDarkRef = useRef(true);

  useEffect(() => {
    const dots: [number, number, number][] = [];
    const numDots = 1400;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < numDots; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numDots);
      dots.push([
        Math.cos(theta) * Math.sin(phi),
        Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
      ]);
    }
    dotsRef.current = dots;

    isDarkRef.current = isDocumentDark();
    const themeObserver = new MutationObserver(() => {
      isDarkRef.current = isDocumentDark();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => {
      themeObserver.disconnect();
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.4;
    const fov = 620;
    const reduced = reducedMotionRef.current;
    const isDark = isDarkRef.current;
    const palette = getPalette(isDark);
    const b = palette.boost;

    if (!dragRef.current.active && !reduced) {
      rotYRef.current += 0.0018;
    }

    timeRef.current += reduced ? 0 : 0.014;
    const time = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(cx, cy, radius * 0.55, cx, cy, radius * 1.55);
    glow.addColorStop(0, palette.glow(0.08 * b));
    glow.addColorStop(0.55, palette.glow(0.035 * b));
    glow.addColorStop(1, palette.glow(0));
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = palette.mid(Math.min(0.55, 0.14 * b));
    ctx.lineWidth = isDark ? 1.25 : 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.06, 0, Math.PI * 2);
    ctx.strokeStyle = palette.bright(Math.min(0.35, 0.09 * b));
    ctx.lineWidth = 0.9;
    ctx.stroke();

    const ry = rotYRef.current;
    const rx = rotXRef.current;

    const drawWire = (points: [number, number, number][], alpha: number) => {
      let started = false;
      ctx.beginPath();
      for (const p of points) {
        let [x, y, z] = p;
        [x, y, z] = rotateX(x, y, z, rx);
        [x, y, z] = rotateY(x, y, z, ry);
        if (z > radius * 0.15) {
          started = false;
          continue;
        }
        const [sx, sy] = project(x, y, z, cx, cy, fov);
        if (!started) {
          ctx.moveTo(sx, sy);
          started = true;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.strokeStyle = palette.mid(Math.min(0.5, alpha * b));
      ctx.lineWidth = isDark ? 0.6 : 0.85;
      ctx.stroke();
    };

    for (const lat of [-45, 0, 45]) {
      const ring: [number, number, number][] = [];
      for (let i = 0; i <= 64; i++) {
        const lng = (i / 64) * 360 - 180;
        ring.push(latLngToXYZ(lat, lng, radius));
      }
      drawWire(ring, lat === 0 ? 0.12 : 0.05);
    }

    for (const lng of [-90, 0, 90]) {
      const meridian: [number, number, number][] = [];
      for (let i = 0; i <= 48; i++) {
        const lat = 90 - (i / 48) * 180;
        meridian.push(latLngToXYZ(lat, lng, radius));
      }
      drawWire(meridian, 0.045);
    }

    for (const dot of dotsRef.current) {
      let [x, y, z] = dot;
      x *= radius;
      y *= radius;
      z *= radius;
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > 0) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const depth = Math.max(0.08, 1 - (z + radius) / (2 * radius));
      ctx.beginPath();
      ctx.arc(sx, sy, 0.75 + depth * 0.95, 0, Math.PI * 2);
      ctx.fillStyle = palette.bright(Math.min(0.8, (0.15 + depth * 0.5) * b));
      ctx.fill();
    }

    ZENORA_CONNECTIONS.forEach((conn, idx) => {
      let [x1, y1, z1] = latLngToXYZ(conn.from[0], conn.from[1], radius);
      let [x2, y2, z2] = latLngToXYZ(conn.to[0], conn.to[1], radius);
      [x1, y1, z1] = rotateX(x1, y1, z1, rx);
      [x1, y1, z1] = rotateY(x1, y1, z1, ry);
      [x2, y2, z2] = rotateX(x2, y2, z2, rx);
      [x2, y2, z2] = rotateY(x2, y2, z2, ry);

      if (z1 > radius * 0.35 && z2 > radius * 0.35) return;

      const [sx1, sy1] = project(x1, y1, z1, cx, cy, fov);
      const [sx2, sy2] = project(x2, y2, z2, cx, cy, fov);

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;
      const midZ = (z1 + z2) / 2;
      const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ) || 1;
      const arcHeight = radius * 1.28;
      const [scx, scy] = project(
        (midX / midLen) * arcHeight,
        (midY / midLen) * arcHeight,
        (midZ / midLen) * arcHeight,
        cx,
        cy,
        fov
      );

      const grad = ctx.createLinearGradient(sx1, sy1, sx2, sy2);
      grad.addColorStop(0, palette.bright(Math.min(0.95, 0.6 * b)));
      grad.addColorStop(0.5, palette.mid(Math.min(0.8, 0.45 * b)));
      grad.addColorStop(1, palette.mid(Math.min(0.6, 0.28 * b)));

      ctx.beginPath();
      ctx.moveTo(sx1, sy1);
      ctx.quadraticCurveTo(scx, scy, sx2, sy2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = isDark ? 1.15 : 1.45;
      ctx.stroke();

      if (!reduced) {
        const t = (Math.sin(time * 1.15 + idx * 0.7) + 1) / 2;
        const tx = (1 - t) * (1 - t) * sx1 + 2 * (1 - t) * t * scx + t * t * sx2;
        const ty = (1 - t) * (1 - t) * sy1 + 2 * (1 - t) * t * scy + t * t * sy2;
        ctx.beginPath();
        ctx.arc(tx, ty, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = palette.bright(1);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(tx, ty, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = palette.glow(0.18 * b);
        ctx.fill();
      }
    });

    for (const marker of ZENORA_MARKERS) {
      let [x, y, z] = latLngToXYZ(marker.lat, marker.lng, radius);
      [x, y, z] = rotateX(x, y, z, rx);
      [x, y, z] = rotateY(x, y, z, ry);
      if (z > radius * 0.12) continue;

      const [sx, sy] = project(x, y, z, cx, cy, fov);
      const pulse = reduced ? 0.5 : Math.sin(time * 2.2 + marker.lat) * 0.5 + 0.5;
      const isHub = Boolean(marker.hub);

      if (isHub) {
        ctx.beginPath();
        ctx.arc(sx, sy, 10 + pulse * 8, 0, Math.PI * 2);
        ctx.strokeStyle = palette.bright(Math.min(0.75, (0.22 + pulse * 0.25) * b));
        ctx.lineWidth = 1.35;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sx, sy, 5 + pulse * 3, 0, Math.PI * 2);
        ctx.fillStyle = palette.mid(0.28 * b);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sx, sy, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = palette.bright(1);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(sx, sy, 3.5 + pulse * 3, 0, Math.PI * 2);
        ctx.strokeStyle = palette.mid(Math.min(0.7, (0.25 + pulse * 0.2) * b));
        ctx.lineWidth = 1.15;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sx, sy, 2.15, 0, Math.PI * 2);
        ctx.fillStyle = palette.bright(1);
        ctx.fill();
      }

      if (marker.label && (isHub || w > 480)) {
        ctx.font = isHub
          ? "600 11px 'Space Grotesk', system-ui, sans-serif"
          : "10px 'Space Grotesk', system-ui, sans-serif";
        ctx.fillStyle = isHub ? palette.label(0.92) : palette.label(0.7);
        ctx.fillText(marker.label, sx + (isHub ? 10 : 8), sy + 3);
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (ambient) return;
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startRotY: rotYRef.current,
        startRotX: rotXRef.current,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [ambient]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (ambient || !dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      rotYRef.current = dragRef.current.startRotY + dx * 0.005;
      rotXRef.current = Math.max(-0.9, Math.min(0.9, dragRef.current.startRotX + dy * 0.005));
    },
    [ambient]
  );

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", !ambient && "cursor-grab active:cursor-grabbing", className)}
      aria-hidden
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );
}
