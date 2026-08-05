import type { LocalizedString } from "./locale";
import { projectImages, partnerImages } from "@/lib/site";

export type Project = {
  name: string;
  client: LocalizedString;
  sector: LocalizedString;
  scope: LocalizedString;
  summary: LocalizedString;
  stack: string[];
  url: string;
  screenshot: string;
  screenshotMode?: "logo";
  /** Period label shown on the card (month + year, localized). */
  year: LocalizedString;
  featured?: boolean;
  role?: LocalizedString;
  duration?: LocalizedString;
  status?: LocalizedString;
  impact?: LocalizedString;
};

export const projects: Project[] = [
  {
    name: "KETC Services",
    client: {
      fr: "KETC — Kenya Engineering & Technical Consortium",
      en: "KETC — Engineering Consortium",
    },
    sector: {
      fr: "Ingénierie & Services techniques",
      en: "Engineering & Technical Services",
    },
    scope: {
      fr: "Site corporate, identité digitale, refonte UX complète",
      en: "Corporate website, digital identity, full UX redesign",
    },
    summary: {
      fr: "Refonte de la présence en ligne d'un acteur B2B de l'ingénierie : positionnement clair, hiérarchie des services, prise de contact fluide.",
      en: "Complete rebuild of the online presence of a B2B engineering group: clear positioning, service hierarchy, frictionless contact flow.",
    },
    stack: ["React", "Tailwind", "SEO"],
    url: "https://ketc-services.com/",
    screenshot: projectImages.ketc,
    year: { fr: "Mai 2026", en: "May 2026" },
    featured: true,
    role: { fr: "Design, dev, SEO", en: "Design, dev, SEO" },
    duration: { fr: "8 semaines", en: "8 weeks" },
    status: { fr: "En ligne", en: "Live" },
    impact: { fr: "+180 % de trafic organique", en: "+180% organic traffic" },
  },
  {
    name: "ESOPA",
    client: {
      fr: "ESOPA — Organisation panafricaine",
      en: "ESOPA — Pan-African Organization",
    },
    sector: { fr: "Organisation & ONG", en: "Organization & NGO" },
    scope: {
      fr: "Plateforme institutionnelle multilingue, gestion des programmes et des actualités",
      en: "Multilingual institutional platform, programs and news management",
    },
    summary: {
      fr: "Plateforme éditoriale institutionnelle pour porter la mission d'une organisation panafricaine : programmes, actualités, appels à contribution.",
      en: "Institutional editorial platform for a pan-African organization: programs, news, calls for contributions.",
    },
    stack: ["Next.js", "CMS", "i18n"],
    url: "https://esopa.org/",
    screenshot: projectImages.esopa,
    year: { fr: "Février 2026", en: "February 2026" },
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
    scope: {
      fr: "ERP modulaire : ventes, projets, facturation, RH, tableaux de bord",
      en: "Modular ERP: sales, projects, invoicing, HR, dashboards",
    },
    summary: {
      fr: "Suite ERP interne, déployée chez nos clients pour piloter les opérations : modules interconnectés, permissions fines, dashboards temps réel.",
      en: "In-house ERP suite, deployed for our clients to run operations: interconnected modules, granular permissions, real-time dashboards.",
    },
    stack: ["React", "Node.js", "PostgreSQL"],
    url: "https://erp-dev.zenora360.com/",
    screenshot: projectImages.erp,
    year: { fr: "Janvier 2026", en: "January 2026" },
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
    scope: {
      fr: "ERP modulaire multi-restaurants : commandes, cuisine, stock, caisse",
      en: "Modular multi-restaurant ERP: orders, kitchen, stock, POS",
    },
    summary: {
      fr: "Plateforme de gestion complète : orchestration des commandes, stocks, caisse, et reporting consolidé multi-établissements.",
      en: "Full management platform: order orchestration, stock, POS, and consolidated multi-site reporting.",
    },
    stack: ["React", "Node.js", "Real-time"],
    url: "https://barthez-kenwou.dev/projects/1",
    screenshot: partnerImages.nexus,
    screenshotMode: "logo",
    year: { fr: "Mars 2026", en: "March 2026" },
    role: { fr: "Produit, dev full-stack", en: "Product, full-stack dev" },
    duration: { fr: "En cours", en: "In progress" },
    status: { fr: "En cours", en: "In progress" },
    impact: { fr: "Offline-first, terrain africain", en: "Offline-first, African context" },
  },
  {
    name: "KAZA",
    client: { fr: "Gestionnaires immobiliers", en: "Real estate managers" },
    sector: { fr: "Immobilier — Mobile", en: "Real Estate — Mobile" },
    scope: {
      fr: "App mobile de gestion immobilière : biens, locataires, paiements, contrats",
      en: "Real estate management mobile app: properties, tenants, payments, contracts",
    },
    summary: {
      fr: "App mobile pour les gestionnaires immobiliers indépendants : suivi des biens, locataires, encaissements et contrats depuis un smartphone.",
      en: "Mobile app for independent property managers: property, tenant, payment and contract tracking from a smartphone.",
    },
    stack: ["React Native", "Node.js"],
    url: "https://barthez-kenwou.dev/projects/3",
    screenshot: projectImages.kaza,
    year: { fr: "Mai 2026", en: "May 2026" },
    role: { fr: "Design mobile, dev React Native", en: "Mobile design, React Native dev" },
    duration: { fr: "En cours", en: "In progress" },
    status: { fr: "En cours", en: "In progress" },
    impact: { fr: "Mobile Money natif", en: "Native Mobile Money" },
  },
  {
    name: "Barthez Kenwou",
    client: { fr: "Portfolio Tech Lead", en: "Tech Lead Portfolio" },
    sector: { fr: "Personal branding tech", en: "Tech personal branding" },
    scope: {
      fr: "Site personnel, showcase projets",
      en: "Personal site, project showcase",
    },
    summary: {
      fr: "Site personnel et vitrine de projets pour un tech lead : narration éditoriale, études de cas détaillées, ton corporate premium.",
      en: "Personal site and project showcase for a tech lead: editorial storytelling, detailed case studies, premium corporate tone.",
    },
    stack: ["Next.js", "MDX"],
    url: "https://barthez-kenwou.dev/",
    screenshot: projectImages.portfolio,
    year: { fr: "Avril 2026", en: "April 2026" },
    role: { fr: "Design, dev, éditorial", en: "Design, dev, editorial" },
    duration: { fr: "4 semaines", en: "4 weeks" },
    status: { fr: "En ligne", en: "Live" },
    impact: { fr: "Positionnement premium consolidé", en: "Consolidated premium positioning" },
  },
];

/** Page-level copy for /projects */
export const projectsPageCopy = {
  seoTitle: {
    fr: "Projets & Réalisations — ZENORA",
    en: "Projects & Case Studies — ZENORA",
  },
  seoDescription: {
    fr: "Sélection des plateformes, ERP, sites et applications conçus et livrés par ZENORA pour ses clients.",
    en: "Selected platforms, ERPs, websites and applications designed and shipped by ZENORA for its clients.",
  },
  hero: {
    eyebrow: { fr: "Réalisations", en: "Case studies" },
    title: {
      fr: "Les projets que nous avons livrés",
      en: "The projects we have shipped",
    },
    lead: {
      fr: "Plateformes institutionnelles, ERP métier, sites corporate, applications mobiles. Chaque projet répond à un cahier des charges réel, avec des utilisateurs réels.",
      en: "Institutional platforms, business ERPs, corporate websites, mobile apps. Every project answers a real brief, with real users.",
    },
  },
  cta: {
    title: { fr: "Un projet en tête ?", en: "Have a project in mind?" },
    lead: {
      fr: "Parlons du cadre, du périmètre et du calendrier. Nous revenons vers vous sous 24 h.",
      en: "Let's talk scope, framework and timeline. We reply within 24 hours.",
    },
    button: {
      fr: "Démarrer une conversation",
      en: "Start a conversation",
    },
  },
  card: {
    role: { fr: "Rôle", en: "Role" },
    duration: { fr: "Durée", en: "Duration" },
    impact: { fr: "Impact", en: "Impact" },
    view: { fr: "Voir le projet", en: "View project" },
  },
} as const;
