import { partnerImages } from "@/lib/site";

export type Partner = {
  name: string;
  logo: string;
  /** Extra size for logos with small source artwork */
  logoClassName?: string;
};

export const partners: Partner[] = [
  { name: "K&C Services", logo: partnerImages.kcServices },
  { name: "NEXUS", logo: partnerImages.nexus },
  { name: "CAFCA", logo: partnerImages.cafca },
  {
    name: "Educate Young Girls",
    logo: partnerImages.eyg,
    logoClassName: "max-h-14 md:max-h-[3.5rem] scale-[1.25] origin-center",
  },
  {
    name: "Worketyamo",
    logo: partnerImages.worketyamo,
    logoClassName: "max-h-14 md:max-h-[3.5rem] scale-[3] origin-center",
  },
];
