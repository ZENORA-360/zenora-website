import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export interface NoiseTextureProps extends ComponentProps<"svg"> {
  className?: string;
  /** `baseFrequency` — higher = finer grain. @default 0.55 */
  frequency?: number;
  /** `numOctaves` — more detail at smaller scales. @default 4 */
  octaves?: number;
  /** Linear slope after desaturation — contrast. @default 0.12 */
  slope?: number;
  /** Opacity of the noise fill. @default 0.55 */
  noiseOpacity?: number;
}

/**
 * SVG fractal noise overlay. Soft film grain for premium surfaces.
 */
export function NoiseTexture({
  className,
  frequency = 0.55,
  octaves = 4,
  slope = 0.12,
  noiseOpacity = 0.55,
  ...props
}: NoiseTextureProps) {
  const filterId = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 size-full select-none opacity-40 dark:opacity-60",
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={frequency}
          numOctaves={octaves}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} opacity={noiseOpacity} />
    </svg>
  );
}
