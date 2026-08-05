import type { LocalizedString } from "./locale";

export type BlogCategory = {
  value: string;
  label: LocalizedString;
};

export const blogCategories: BlogCategory[] = [
  { value: "", label: { fr: "Tous", en: "All" } },
  { value: "Technologie", label: { fr: "Technologie", en: "Technology" } },
  { value: "Marketing", label: { fr: "Marketing", en: "Marketing" } },
  { value: "Design", label: { fr: "Design", en: "Design" } },
  { value: "E-commerce", label: { fr: "E-commerce", en: "E-commerce" } },
  { value: "Sécurité", label: { fr: "Sécurité", en: "Security" } },
];
