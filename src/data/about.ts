import {
  Icon3DEye,
  Icon3DLightbulb,
  Icon3DTarget,
  Icon3DUsers,
  type Icon3D,
} from "@/components/icons/Zenora3DIcons";

export const aboutBenefits = [
  "Renforcer votre visibilité digitale",
  "Valoriser votre image de marque",
  "Structurer vos processus numériques",
  "Préparer la croissance de votre activité",
] as const;

export type AboutValue = {
  icon: Icon3D;
  title: string;
  description: string;
};

export const aboutValues: AboutValue[] = [
  { icon: Icon3DTarget, title: "Résultats", description: "Approche orientée performance" },
  { icon: Icon3DUsers, title: "Transparence", description: "Communication claire et continue" },
  { icon: Icon3DLightbulb, title: "Innovation", description: "Solutions évolutives et modernes" },
  { icon: Icon3DEye, title: "Accompagnement", description: "Support personnalisé" },
];
