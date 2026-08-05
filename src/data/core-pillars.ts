import type { LocalizedString } from "./locale";

export type CorePillar = {
  title: LocalizedString;
  description: LocalizedString;
  link: string;
};

export const corePillars: CorePillar[] = [
  {
    title: {
      fr: "Développement web & ERP",
      en: "Web & ERP development",
    },
    description: {
      fr: "Sites corporate, plateformes SaaS et ERP métier, conçus sur mesure et documentés.",
      en: "Corporate websites, SaaS platforms and business ERPs, built to spec and documented.",
    },
    link: "/services/developpement-web",
  },
  {
    title: {
      fr: "Marketing digital",
      en: "Digital marketing",
    },
    description: {
      fr: "Stratégie de contenu, SEO, campagnes payantes, avec un reporting mensuel chiffré.",
      en: "Content strategy, SEO, paid campaigns, with a measurable monthly report.",
    },
    link: "/services/marketing-digital",
  },
  {
    title: {
      fr: "Design & identité",
      en: "Design & identity",
    },
    description: {
      fr: "Identité visuelle, charte graphique, UI/UX. Un système cohérent, pas une image ponctuelle.",
      en: "Visual identity, brand system, UI/UX. A coherent system, not a one-off image.",
    },
    link: "/services/design-graphic",
  },
  {
    title: {
      fr: "Solutions métiers",
      en: "Business solutions",
    },
    description: {
      fr: "Automatisation de processus, intégrations, hébergement et maintenance sous contrat.",
      en: "Process automation, integrations, hosting and maintenance under contract.",
    },
    link: "/services/solutions-metiers",
  },
];
