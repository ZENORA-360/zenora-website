export type HeroStat = {
  value: string;
  /** i18n key resolved via LanguageContext `t()` */
  labelKey: string;
  /** Fallback if the key is missing */
  labelFallback: string;
};

export const heroStats: HeroStat[] = [
  {
    value: "10+",
    labelKey: "hero.stat.projects",
    labelFallback: "Projets livrés",
  },
  {
    value: "6",
    labelKey: "hero.stat.sectors",
    labelFallback: "Secteurs couverts",
  },
  {
    value: "3",
    labelKey: "hero.stat.countries",
    labelFallback: "Pays d'intervention",
  },
];
