import { useEffect, useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects, projectsPageCopy, type Project } from "@/data/projects";
import { pickLocale, type Locale } from "@/data/locale";

type CardLabels = typeof projectsPageCopy.card;

function ProjectCard({
  project: p,
  language,
  labels,
  className = "",
}: {
  project: Project;
  language: Locale;
  labels: CardLabels;
  className?: string;
}) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card",
        "transition-[transform,border-color,box-shadow] duration-500",
        "hover:-translate-y-1 hover:border-primary/50",
        "hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.35)]",
        className,
      ].join(" ")}
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden ${
          p.screenshotMode === "logo"
            ? "flex items-center justify-center bg-gradient-to-br from-[#0a1a3a] via-[#0d2350] to-[#1a1030]"
            : "bg-muted"
        }`}
      >
        <img
          src={p.screenshot}
          alt={`${p.name} — ${pickLocale(language, p.scope)}`}
          loading="lazy"
          draggable={false}
          className={
            p.screenshotMode === "logo"
              ? "pointer-events-none max-h-[70%] max-w-[70%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-[1.05]"
              : "pointer-events-none h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          }
        />
        {p.screenshotMode !== "logo" && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        )}
        {p.status && (
          <span className="absolute left-3 top-3 rounded-full bg-primary/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary-foreground backdrop-blur">
            {pickLocale(language, p.status)}
          </span>
        )}
        <div className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 -translate-y-1 items-center justify-center rounded-full border border-border bg-background/90 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-primary" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] text-muted-foreground">
          <span className="truncate uppercase tracking-widest">
            {pickLocale(language, p.sector)}
          </span>
          <span className="shrink-0 tabular-nums">{pickLocale(language, p.year)}</span>
        </div>
        <h2 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">
          {p.name}
        </h2>
        <p className="text-xs font-medium text-foreground/70">
          {pickLocale(language, p.scope)}
        </p>
        <p className="card-copy line-clamp-3">{pickLocale(language, p.summary)}</p>

        {(p.role || p.duration || p.impact) && (
          <dl className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-border/60 pt-3 text-xs">
            {p.role && (
              <div>
                <dt className="mb-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {pickLocale(language, labels.role)}
                </dt>
                <dd className="font-medium text-foreground/80">
                  {pickLocale(language, p.role)}
                </dd>
              </div>
            )}
            {p.duration && (
              <div>
                <dt className="mb-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {pickLocale(language, labels.duration)}
                </dt>
                <dd className="font-medium text-foreground/80">
                  {pickLocale(language, p.duration)}
                </dd>
              </div>
            )}
            {p.impact && (
              <div className="col-span-2">
                <dt className="mb-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {pickLocale(language, labels.impact)}
                </dt>
                <dd className="font-semibold text-primary">
                  {pickLocale(language, p.impact)}
                </dd>
              </div>
            )}
          </dl>
        )}

        <div className="flex flex-wrap gap-1.5 pt-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-primary">
          <span>{pickLocale(language, labels.view)}</span>
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </a>
  );
}

/**
 * Mobile: dedicated horizontal scrollport (CSS + axis-locked touch/pointer).
 * md+: separate grid — never mix flex+grid on the same node.
 */
export const ProjectsGridSection = () => {
  const { language } = useLanguage();
  const labels = projectsPageCopy.card;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let originScroll = 0;
    let axis: "x" | "y" | null = null;
    let pointerId: number | null = null;
    let dragged = false;

    const onPointerDown = (e: PointerEvent) => {
      // Left mouse / touch / pen only
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      originScroll = el.scrollLeft;
      axis = null;
      dragged = false;
      el.classList.add("is-dragging");
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!axis) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "y") {
          // Let the page scroll vertically — release capture
          el.classList.remove("is-dragging");
          try {
            el.releasePointerCapture(e.pointerId);
          } catch {
            /* ignore */
          }
          pointerId = null;
          return;
        }
      }

      if (axis === "x") {
        dragged = true;
        el.scrollLeft = originScroll - dx;
        e.preventDefault();
      }
    };

    const endPointer = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      el.classList.remove("is-dragging");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      // Suppress the click that follows a horizontal drag (avoids accidental open)
      if (dragged && axis === "x") {
        const blockClick = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
          el.removeEventListener("click", blockClick, true);
        };
        el.addEventListener("click", blockClick, true);
        window.setTimeout(() => el.removeEventListener("click", blockClick, true), 0);
      }
      pointerId = null;
      axis = null;
      dragged = false;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", endPointer);
    el.addEventListener("pointercancel", endPointer);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endPointer);
      el.removeEventListener("pointercancel", endPointer);
    };
  }, []);

  return (
    <section className="py-14 md:py-20">
      {/* —— Mobile carousel (own scrollport, full-bleed padding) —— */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="projects-mobile-track"
          role="list"
          aria-label={language === "fr" ? "Projets — défiler horizontalement" : "Projects — swipe horizontally"}
        >
          {projects.map((p) => (
            <div key={p.name} role="listitem" className="projects-mobile-slide">
              <ProjectCard project={p} language={language} labels={labels} />
            </div>
          ))}
        </div>
      </div>

      {/* —— Tablet / desktop grid —— */}
      <div className="container-zenora hidden md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} language={language} labels={labels} />
        ))}
      </div>
    </section>
  );
};
