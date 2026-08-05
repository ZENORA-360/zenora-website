import {
  Icon3DGear,
  Icon3DGlobe,
  Icon3DMegaphone,
  Icon3DPalette,
  type Icon3D,
} from "@/components/icons/Zenora3DIcons";

export type ServicePageCard = {
  id: string;
  icon: Icon3D;
  titleKey: string;
  descriptionKey: string;
  featureKeys: string[];
};

export const servicesPageCards: ServicePageCard[] = [
  {
    id: "developpement-web",
    icon: Icon3DGlobe,
    titleKey: "services.webDev.title",
    descriptionKey: "services.webDev.description",
    featureKeys: [
      "services.webDev.feature1",
      "services.webDev.feature2",
      "services.webDev.feature3",
      "services.webDev.feature4",
    ],
  },
  {
    id: "marketing-digital",
    icon: Icon3DMegaphone,
    titleKey: "services.marketing.title",
    descriptionKey: "services.marketing.description",
    featureKeys: [
      "services.marketing.feature1",
      "services.marketing.feature2",
      "services.marketing.feature3",
      "services.marketing.feature4",
    ],
  },
  {
    id: "design-graphic",
    icon: Icon3DPalette,
    titleKey: "services.design.title",
    descriptionKey: "services.design.description",
    featureKeys: [
      "services.design.feature1",
      "services.design.feature2",
      "services.design.feature3",
      "services.design.feature4",
    ],
  },
  {
    id: "solutions-metiers",
    icon: Icon3DGear,
    titleKey: "services.solutions.title",
    descriptionKey: "services.solutions.description",
    featureKeys: [
      "services.solutions.feature1",
      "services.solutions.feature2",
      "services.solutions.feature3",
      "services.solutions.feature4",
    ],
  },
];
