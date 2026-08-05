import {
  Icon3DGear,
  Icon3DGlobe,
  Icon3DMegaphone,
  Icon3DPalette,
  type Icon3D,
} from "@/components/icons/Zenora3DIcons";
import {
  Building2,
  Cog,
  FileText,
  GraduationCap,
  Layers,
  Mail,
  Megaphone,
  Monitor,
  Palette,
  Search,
  Settings,
  ShoppingCart,
  Video,
  type LucideIcon,
} from "lucide-react";

export type ServiceFeature = {
  icon: LucideIcon;
  labelKey: string;
};

export type ServiceCatalogItem = {
  id: string;
  icon: Icon3D;
  titleKey: string;
  descriptionKey: string;
  items: ServiceFeature[];
};

/** Structure only — labels resolved via `t()` in the UI. */
export const servicesCatalog: ServiceCatalogItem[] = [
  {
    id: "web",
    icon: Icon3DGlobe,
    titleKey: "services.webDev.title",
    descriptionKey: "services.webDev.description",
    items: [
      { icon: Monitor, labelKey: "services.webDev.feature1" },
      { icon: Layers, labelKey: "services.webDev.feature2" },
      { icon: ShoppingCart, labelKey: "services.webDev.feature3" },
      { icon: Building2, labelKey: "services.webDev.feature4" },
    ],
  },
  {
    id: "marketing",
    icon: Icon3DMegaphone,
    titleKey: "services.marketing.title",
    descriptionKey: "services.marketing.description",
    items: [
      { icon: Megaphone, labelKey: "services.marketing.feature1" },
      { icon: Mail, labelKey: "services.marketing.feature2" },
      { icon: Search, labelKey: "services.marketing.feature3" },
      { icon: Settings, labelKey: "services.marketing.feature4" },
    ],
  },
  {
    id: "design",
    icon: Icon3DPalette,
    titleKey: "services.design.title",
    descriptionKey: "services.design.description",
    items: [
      { icon: Palette, labelKey: "services.design.feature1" },
      { icon: Video, labelKey: "services.design.feature2" },
      { icon: FileText, labelKey: "services.design.feature3" },
      { icon: Video, labelKey: "services.design.feature4" },
    ],
  },
  {
    id: "expertise",
    icon: Icon3DGear,
    titleKey: "services.solutions.title",
    descriptionKey: "services.solutions.description",
    items: [
      { icon: Cog, labelKey: "services.solutions.feature1" },
      { icon: Settings, labelKey: "services.solutions.feature2" },
      { icon: Building2, labelKey: "services.solutions.feature3" },
      { icon: GraduationCap, labelKey: "services.solutions.feature4" },
    ],
  },
];
