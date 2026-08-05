import {
  Icon3DCode,
  Icon3DHandshake,
  Icon3DLightbulb,
  Icon3DRocket,
  Icon3DSearch,
  type Icon3D,
} from "@/components/icons/Zenora3DIcons";

export type MethodStep = {
  number: string;
  icon: Icon3D;
  title: string;
  description: string;
};

export const methodSteps: MethodStep[] = [
  {
    number: "01",
    icon: Icon3DSearch,
    title: "Analyse et Compréhension",
    description:
      "Nous étudions vos besoins, votre secteur et vos objectifs pour une compréhension approfondie de votre projet.",
  },
  {
    number: "02",
    icon: Icon3DLightbulb,
    title: "Proposition de Solution Adaptée",
    description:
      "Nous élaborons une stratégie sur mesure et des solutions technologiques adaptées à votre réalité.",
  },
  {
    number: "03",
    icon: Icon3DCode,
    title: "Conception et Développement",
    description:
      "Notre équipe conçoit et développe votre solution avec rigueur, en respectant les standards de qualité.",
  },
  {
    number: "04",
    icon: Icon3DRocket,
    title: "Validation et Déploiement",
    description:
      "Tests approfondis, validation client et mise en production de votre solution dans les meilleures conditions.",
  },
  {
    number: "05",
    icon: Icon3DHandshake,
    title: "Suivi, Support et Amélioration Continue",
    description:
      "Accompagnement post-lancement, maintenance et optimisations continues pour garantir la pérennité.",
  },
];

export const methodTrustPoints = [
  "Approche orientée résultats",
  "Transparence et communication",
  "Solutions claires et évolutives",
  "Accompagnement personnalisé",
] as const;
