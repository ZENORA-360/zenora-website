import type { LocalizedString } from "./locale";

export type CapabilityCard = {
  title: LocalizedString;
  description: LocalizedString;
};

export const capabilityCards: CapabilityCard[] = [
  {
    title: { fr: "Architecture", en: "Architecture" },
    description: {
      fr: "Systèmes modulaires, découplés, prêts pour la scalabilité horizontale.",
      en: "Modular, decoupled systems ready for horizontal scaling.",
    },
  },
  {
    title: { fr: "Design System", en: "Design System" },
    description: {
      fr: "Tokens, composants, et cohérence visuelle pilotée par le design.",
      en: "Tokens, components, and visual consistency driven by design.",
    },
  },
  {
    title: { fr: "Automatisation", en: "Automation" },
    description: {
      fr: "Pipelines CI/CD, tests, déploiements. Zéro friction opérationnelle.",
      en: "CI/CD pipelines, tests, deployments. Zero operational friction.",
    },
  },
  {
    title: { fr: "Sécurité", en: "Security" },
    description: {
      fr: "Audits, scans SAST/DAST, conformité, chiffrement et RBAC.",
      en: "Audits, SAST/DAST scans, compliance, encryption and RBAC.",
    },
  },
  {
    title: { fr: "Performance", en: "Performance" },
    description: {
      fr: "Core Web Vitals au vert, bundles optimisés, rendu instantané.",
      en: "Core Web Vitals in the green, optimised bundles, instant rendering.",
    },
  },
  {
    title: { fr: "Excellence", en: "Excellence" },
    description: {
      fr: "Standards internationaux, revue de code, mentorat continu.",
      en: "International standards, code review, continuous mentorship.",
    },
  },
];
