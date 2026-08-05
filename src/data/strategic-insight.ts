import type { ComponentType, SVGProps } from "react";
import {
  Icon3DClipboard,
  Icon3DHeadset,
  Icon3DShield,
} from "@/components/icons/Strategic3DIcons";
import type { LocalizedString } from "./locale";

export type FeatureIcon = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

export type StrategicFeature = {
  icon: FeatureIcon;
  title: LocalizedString;
  description: LocalizedString;
};

export const strategicFeatures: StrategicFeature[] = [
  {
    icon: Icon3DClipboard,
    title: {
      fr: "Cadrage & itération",
      en: "Framing & iteration",
    },
    description: {
      fr: "Cahier des charges rédigé, sprints courts, livrables validés à chaque étape.",
      en: "Written brief, short sprints, deliverables validated at every step.",
    },
  },
  {
    icon: Icon3DShield,
    title: {
      fr: "Code sous contrôle",
      en: "Code under control",
    },
    description: {
      fr: "Revue de code, tests, CI/CD, sauvegardes et journalisation dès le premier commit.",
      en: "Code review, tests, CI/CD, backups and logging from the first commit.",
    },
  },
  {
    icon: Icon3DHeadset,
    title: {
      fr: "Suivi post-livraison",
      en: "Post-launch support",
    },
    description: {
      fr: "Maintenance corrective et évolutive, SLA écrit, un interlocuteur unique.",
      en: "Corrective and evolutive maintenance, written SLA, a single point of contact.",
    },
  },
];
