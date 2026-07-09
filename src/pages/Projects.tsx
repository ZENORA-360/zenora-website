import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

import { projectImages, partnerImages } from "@/lib/site";

type Bilingual = { fr: string; en: string };

export interface Project {
  name: string;
  client: Bilingual;
  sector: Bilingual;
  scope: Bilingual;
  summary: Bilingual;
  stack: string[];
  url: string;
  screenshot: string;
  screenshotMode?: "logo";
  year: string;
  featured?: boolean;
  role?: Bilingual;
  duration?: Bilingual;
  status?: Bilingual;
  impact?: Bilingual;
}


export const projects: Project[] = [
  {
    name: "KETC Services",
    client: { fr: "KETC — Kenya Engineering & Technical Consortium", en: "KETC — Engineering Consortium" },
    sector: { fr: "Ingénierie & Services techniques", en: "Engineering & Technical Services" },
    scope: { fr: "Site corporate, identité digitale, refonte UX complète", en: "Corporate website, digital identity, full UX redesign" },
    summary: {
      fr: "Refonte de la présence en ligne d'un acteur B2B de l'ingénierie : positionnement clair, hiérarchie des services, prise de contact fluide.",
      en: "Complete rebuild of the online presence of a B2B engineering group: clear positioning, service hierarchy, frictionless contact flow.",
    },
    stack: ["React", "Tailwind", "SEO"],
    url: "https://ketc-services.com/",
    screenshot: projectImages.ketc,
    year: "2025",
    featured: true,
    role: { fr: "Design, dev, SEO", en: "Design, dev, SEO" },
    duration: { fr: "8 semaines", en: "8 weeks" },
    status: { fr: "En ligne", en: "Live" },
    impact: { fr: "+180 % de trafic organique", en: "+180% organic traffic" },
  },
  {
    name: "ESOPA",
    client: { fr: "ESOPA — Organisation panafricaine", en: "ESOPA — Pan-African Organization" },
    sector: { fr: "Organisation & ONG", en: "Organization & NGO" },
    scope: { fr: "Plateforme institutionnelle multilingue, gestion des programmes et des actualités", en: "Multilingual institutional platform, programs and news management" },
    summary: {
      fr: "Plateforme éditoriale institutionnelle pour porter la mission d'une organisation panafricaine : programmes, actualités, appels à contribution.",
      en: "Institutional editorial platform for a pan-African organization: programs, news, calls for contributions.",
    },
    stack: ["Next.js", "CMS", "i18n"],
    url: "https://esopa.org/",
    screenshot: projectImages.esopa,
    year: "2025",
    featured: true,
    role: { fr: "Design, dev, éditorial", en: "Design, dev, editorial" },
    duration: { fr: "10 semaines", en: "10 weeks" },
    status: { fr: "En ligne", en: "Live" },
    impact: { fr: "Autonomie éditoriale complète", en: "Full editorial autonomy" },
  },
  {
    name: "ERP Zenora 360",
    client: { fr: "Interne — ZENORA", en: "Internal — ZENORA" },
    sector: { fr: "SaaS — ERP opérationnel", en: "SaaS — Operational ERP" },
    scope: { fr: "ERP modulaire : ventes, projets, facturation, RH, tableaux de bord", en: "Modular ERP: sales, projects, invoicing, HR, dashboards" },
    summary: {
      fr: "Suite ERP interne, déployée chez nos clients pour piloter les opérations : modules interconnectés, permissions fines, dashboards temps réel.",
      en: "In-house ERP suite, deployed for our clients to run operations: interconnected modules, granular permissions, real-time dashboards.",
    },
    stack: ["React", "Node.js", "PostgreSQL"],
    url: "https://erp-dev.zenora360.com/",
    screenshot: projectImages.erp,
    year: "2025",
    featured: true,
    role: { fr: "Produit, architecture, dev", en: "Product, architecture, dev" },
    duration: { fr: "En itération continue", en: "Continuous iteration" },
    status: { fr: "En production", en: "In production" },
    impact: { fr: "5+ clients en production", en: "5+ clients in production" },
  },
  {
    name: "NEXUS",
    client: { fr: "Groupes de restauration", en: "Hospitality groups" },
    sector: { fr: "Restauration & Hospitality", en: "Hospitality & F&B" },
    scope: { fr: "ERP modulaire multi-restaurants : commandes, cuisine, stock, caisse", en: "Modular multi-restaurant ERP: orders, kitchen, stock, POS" },
    summary: {
      fr: "Plateforme de gestion complète : orchestration des commandes, stocks, caisse, et reporting consolidé multi-établissements.",
      en: "Full management platform: order orchestration, stock, POS, and consolidated multi-site reporting.",
    },
    stack: ["React", "Node.js", "Real-time"],
    url: "https://barthez-kenwou.dev/projects/1",
    screenshot: partnerImages.nexus,
    screenshotMode: "logo",
    year: "2024",
    role: { fr: "Produit, dev full-stack", en: "Product, full-stack dev" },
    duration: { fr: "14 semaines", en: "14 weeks" },
    status: { fr: "En production", en: "In production" },
    impact: { fr: "Offline-first, terrain africain", en: "Offline-first, African context" },
  },
  {
    name: "KAZA",
    client: { fr: "Gestionnaires immobiliers", en: "Real estate managers" },
    sector: { fr: "Immobilier — Mobile", en: "Real Estate — Mobile" },
    scope: { fr: "App mobile de gestion immobilière : biens, locataires, paiements, contrats", en: "Real estate management mobile app: properties, tenants, payments, contracts" },
    summary: {
      fr: "App mobile pour les gestionnaires immobiliers indépendants : suivi des biens, locataires, encaissements et contrats depuis un smartphone.",
      en: "Mobile app for independent property managers: property, tenant, payment and contract tracking from a smartphone.",
    },
    stack: ["React Native", "Node.js"],
    url: "https://barthez-kenwou.dev/projects/3",
    screenshot: projectImages.kaza,
    year: "2024",
    role: { fr: "Design mobile, dev React Native", en: "Mobile design, React Native dev" },
    duration: { fr: "12 semaines", en: "12 weeks" },
    status: { fr: "En ligne", en: "Live" },
    impact: { fr: "Mobile Money natif", en: "Native Mobile Money" },
  },
  {
    name: "Barthez Kenwou",
    client: { fr: "Portfolio Tech Lead", en: "Tech Lead Portfolio" },
    sector: { fr: "Personal branding tech", en: "Tech personal branding" },
    scope: { fr: "Site personnel, showcase projets", en: "Personal site, project showcase" },
    summary: {
      fr: "Site personnel et vitrine de projets pour un tech lead : narration éditoriale, études de cas détaillées, ton corporate premium.",
      en: "Personal site and project showcase for a tech lead: editorial storytelling, detailed case studies, premium corporate tone.",
    },
    stack: ["Next.js", "MDX"],
    url: "https://barthez-kenwou.dev/",
    screenshot: projectImages.portfolio,
    year: "2024",
    role: { fr: "Design, dev, éditorial", en: "Design, dev, editorial" },
    duration: { fr: "4 semaines", en: "4 weeks" },
    status: { fr: "En ligne", en: "Live" },
    impact: { fr: "Positionnement premium consolidé", en: "Consolidated premium positioning" },
  },
];

const Projects = () => {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={language === "fr" ? "Projets & Réalisations — ZENORA" : "Projects & Case Studies — ZENORA"}
        description={
          language === "fr"
            ? "Sélection des plateformes, ERP, sites et applications conçus et livrés par ZENORA pour ses clients."
            : "Selected platforms, ERPs, websites and applications designed and shipped by ZENORA for its clients."
        }
      />
      <Header />

      <main>
        {/* Hero with parallax */}
        <section ref={heroRef} className="relative pt-40 pb-24 md:pt-48 md:pb-32 border-b border-border/60 overflow-hidden">
          <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-primary/8 blur-[130px]" />
            <div className="absolute inset-0 grid-pattern opacity-[0.12]" />
          </motion.div>
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container-zenora relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold text-primary tracking-[0.3em] uppercase font-display">
                  {language === "fr" ? "Réalisations" : "Case studies"}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.02] mb-6">
                {language === "fr"
                  ? "Les projets que nous avons livrés."
                  : "The projects we have shipped."}
              </h1>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {language === "fr"
                  ? "Plateformes institutionnelles, ERP métier, sites corporate, applications mobiles. Chaque projet répond à un cahier des charges réel, avec des utilisateurs réels."
                  : "Institutional platforms, business ERPs, corporate websites, mobile apps. Every project answers a real brief, with real users."}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Projects grid */}
        <section className="py-14 md:py-20">
          <div className="container-zenora">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((p, i) => (
                <motion.a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.35)]"
                >
                  {/* Screenshot */}
                  <div className={`relative aspect-[16/10] overflow-hidden ${p.screenshotMode === "logo" ? "bg-gradient-to-br from-[#0a1a3a] via-[#0d2350] to-[#1a1030] flex items-center justify-center" : "bg-muted"}`}>
                    <img
                      src={p.screenshot}
                      alt={`${p.name} — ${p.scope[language]}`}
                      loading="lazy"
                      className={
                        p.screenshotMode === "logo"
                          ? "max-w-[70%] max-h-[70%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-[1.05]"
                          : "w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      }
                    />
                    {p.screenshotMode !== "logo" && (
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                    )}
                    {p.status && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary/95 text-primary-foreground text-[10px] font-mono uppercase tracking-wider backdrop-blur">
                        {p.status[language]}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 p-5 md:p-6 flex-1">
                    <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-muted-foreground">
                      <span className="uppercase tracking-widest truncate">{p.sector[language]}</span>
                      <span className="tabular-nums">{p.year}</span>
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {p.name}
                    </h2>
                    <p className="text-xs text-foreground/70 font-medium">{p.scope[language]}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.summary[language]}</p>

                    {/* Meta grid */}
                    {(p.role || p.duration || p.impact) && (
                      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 pt-3 border-t border-border/60 text-xs">
                        {p.role && (
                          <div>
                            <dt className="text-muted-foreground text-[10px] uppercase tracking-wider font-mono mb-0.5">{language === "fr" ? "Rôle" : "Role"}</dt>
                            <dd className="text-foreground/80 font-medium">{p.role[language]}</dd>
                          </div>
                        )}
                        {p.duration && (
                          <div>
                            <dt className="text-muted-foreground text-[10px] uppercase tracking-wider font-mono mb-0.5">{language === "fr" ? "Durée" : "Duration"}</dt>
                            <dd className="text-foreground/80 font-medium">{p.duration[language]}</dd>
                          </div>
                        )}
                        {p.impact && (
                          <div className="col-span-2">
                            <dt className="text-muted-foreground text-[10px] uppercase tracking-wider font-mono mb-0.5">{language === "fr" ? "Impact" : "Impact"}</dt>
                            <dd className="text-primary font-semibold">{p.impact[language]}</dd>
                          </div>
                        )}
                      </dl>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2 mt-auto text-sm font-medium text-primary">
                      <span>{language === "fr" ? "Voir le projet" : "View project"}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/60 py-14 md:py-20">
          <div className="container-zenora text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === "fr" ? "Un projet en tête ?" : "Have a project in mind?"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {language === "fr"
                ? "Parlons du cadre, du périmètre et du calendrier. Nous revenons vers vous sous 24 h."
                : "Let's talk scope, framework and timeline. We reply within 24 hours."}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              {language === "fr" ? "Démarrer une conversation" : "Start a conversation"}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
