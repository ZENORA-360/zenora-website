import {
  Icon3DCode,
  Icon3DHandshake,
  Icon3DLightbulb,
  Icon3DRocket,
  Icon3DSearch,
  type Icon3D,
} from "@/components/icons/Zenora3DIcons";

export type MethodPageStep = {
  number: string;
  icon: Icon3D;
  titleKey: string;
  descriptionKey: string;
  detailKeys: string[];
};

export const methodPageSteps: MethodPageStep[] = [
  {
    number: "01",
    icon: Icon3DSearch,
    titleKey: "method.step1.title",
    descriptionKey: "method.step1.description",
    detailKeys: [
      "method.step1.detail1",
      "method.step1.detail2",
      "method.step1.detail3",
      "method.step1.detail4",
    ],
  },
  {
    number: "02",
    icon: Icon3DLightbulb,
    titleKey: "method.step2.title",
    descriptionKey: "method.step2.description",
    detailKeys: [
      "method.step2.detail1",
      "method.step2.detail2",
      "method.step2.detail3",
      "method.step2.detail4",
    ],
  },
  {
    number: "03",
    icon: Icon3DCode,
    titleKey: "method.step3.title",
    descriptionKey: "method.step3.description",
    detailKeys: [
      "method.step3.detail1",
      "method.step3.detail2",
      "method.step3.detail3",
      "method.step3.detail4",
    ],
  },
  {
    number: "04",
    icon: Icon3DRocket,
    titleKey: "method.step4.title",
    descriptionKey: "method.step4.description",
    detailKeys: [
      "method.step4.detail1",
      "method.step4.detail2",
      "method.step4.detail3",
      "method.step4.detail4",
    ],
  },
  {
    number: "05",
    icon: Icon3DHandshake,
    titleKey: "method.step5.title",
    descriptionKey: "method.step5.description",
    detailKeys: [
      "method.step5.detail1",
      "method.step5.detail2",
      "method.step5.detail3",
      "method.step5.detail4",
    ],
  },
];

export const methodTrustKeys = [
  "method.trust.point1",
  "method.trust.point2",
  "method.trust.point3",
  "method.trust.point4",
] as const;
