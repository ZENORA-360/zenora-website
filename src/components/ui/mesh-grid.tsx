import { useId } from "react";
import { cn } from "@/lib/utils";

type MeshGridProps = {
  className?: string;
  /** Major cell size in px */
  size?: number;
  /** Minor subdivision size in px (optional fine grid) */
  fineSize?: number;
};

/**
 * Theme-aware gold engineering mesh — readable in light and dark.
 */
export function MeshGrid({ className, size = 56, fineSize = 14 }: MeshGridProps) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={`${id}-fine`} width={fineSize} height={fineSize} patternUnits="userSpaceOnUse">
          <path
            d={`M ${fineSize} 0 L 0 0 0 ${fineSize}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="opacity-[0.35]"
          />
        </pattern>
        <pattern id={`${id}-major`} width={size} height={size} patternUnits="userSpaceOnUse">
          <rect width={size} height={size} fill={`url(#${id}-fine)`} />
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-major)`} />
    </svg>
  );
}
