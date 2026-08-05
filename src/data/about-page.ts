import {
  Icon3DAward,
  Icon3DCompass,
  Icon3DEye,
  Icon3DLightbulb,
  Icon3DShield,
  Icon3DTarget,
  Icon3DUsers,
  Icon3DZap,
  type Icon3D,
} from "@/components/icons/Zenora3DIcons";

export type AboutValueItem = {
  icon: Icon3D;
  titleKey: string;
  descriptionKey: string;
};

export const aboutBenefitKeys = [
  "about.benefit1",
  "about.benefit2",
  "about.benefit3",
  "about.benefit4",
] as const;

export const aboutValuesPage: AboutValueItem[] = [
  { icon: Icon3DTarget, titleKey: "about.value.results", descriptionKey: "about.value.resultsDesc" },
  { icon: Icon3DUsers, titleKey: "about.value.transparency", descriptionKey: "about.value.transparencyDesc" },
  { icon: Icon3DLightbulb, titleKey: "about.value.innovation", descriptionKey: "about.value.innovationDesc" },
  { icon: Icon3DEye, titleKey: "about.value.support", descriptionKey: "about.value.supportDesc" },
];

export const aboutEngagements: AboutValueItem[] = [
  { icon: Icon3DShield, titleKey: "about.engagement.reliability", descriptionKey: "about.engagement.reliabilityDesc" },
  { icon: Icon3DCompass, titleKey: "about.engagement.guidance", descriptionKey: "about.engagement.guidanceDesc" },
  { icon: Icon3DZap, titleKey: "about.engagement.responsiveness", descriptionKey: "about.engagement.responsivenessDesc" },
  { icon: Icon3DAward, titleKey: "about.engagement.excellence", descriptionKey: "about.engagement.excellenceDesc" },
];

export const aboutMissionKeys = [
  "about.mission.point1",
  "about.mission.point2",
  "about.mission.point3",
] as const;

export const aboutVisionKeys = [
  "about.vision.point1",
  "about.vision.point2",
  "about.vision.point3",
] as const;
