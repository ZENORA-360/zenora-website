import type { LocalizedString } from "./locale";

export type FaqItem = {
  question: LocalizedString;
  answer: LocalizedString;
};

export const faqs: FaqItem[] = [
  {
    question: {
      fr: "Dans quels secteurs d'activité êtes-vous spécialisés ?",
      en: "What specific industries do you specialize in?",
    },
    answer: {
      fr: "Bien que nous ayons une expertise approfondie dans la FinTech, la Santé et le E-commerce, nos cadres de transformation digitale sont agnostiques en termes de secteur. Nous adaptons nos méthodologies de base pour correspondre aux paysages réglementaires et opérationnels uniques de chaque secteur.",
      en: "While we have deep expertise in FinTech, Healthcare, and E-commerce, our digital transformation frameworks are industry-agnostic. We adapt our core methodologies to fit the unique regulatory and operational landscapes of any sector.",
    },
  },
  {
    question: {
      fr: "Comment fonctionne votre méthodologie agile pour les grandes entreprises ?",
      en: "How does your agile methodology work for large enterprises?",
    },
    answer: {
      fr: "Nous utilisons les principes du Scaled Agile Framework (SAFe) pour les grandes organisations. Cela garantit que, bien que les équipes individuelles avancent rapidement avec des sprints de 2 semaines, les objectifs organisationnels plus larges restent alignés, minimisant les risques tout en maximisant la vitesse d'innovation.",
      en: "We utilize Scaled Agile Framework (SAFe) principles for larger organizations. This ensures that while individual teams move fast with 2-week sprints, the broader organizational goals remain aligned, minimizing risk while maximizing innovation speed.",
    },
  },
  {
    question: {
      fr: "Pouvez-vous vous intégrer à nos systèmes existants ?",
      en: "Can you integrate with our existing legacy systems?",
    },
    answer: {
      fr: "Absolument. « De Zéro au Zénith » signifie souvent combler le fossé entre l'ancien et le nouveau. Nous sommes spécialisés dans la connectivité pilotée par API et les architectures de microservices qui nous permettent de moderniser progressivement votre stack sans perturber les opérations commerciales critiques.",
      en: 'Absolutely. "From Zero to Zenith" often means bridging the gap between old and new. We specialize in API-led connectivity and microservices architectures that allow us to modernize your stack incrementally without disrupting critical business operations.',
    },
  },
  {
    question: {
      fr: "Quel est le délai typique pour un projet de transformation digitale ?",
      en: "What is the typical timeline for a digital transformation project?",
    },
    answer: {
      fr: "Les délais varient en fonction de la portée, mais un engagement typique commence par une phase de découverte de 2 à 4 semaines, suivie du développement du MVP qui prend généralement 3 à 6 mois. Nous privilégions la livraison de valeur tangible tôt dans le processus plutôt que d'attendre un lancement « big bang ».",
      en: 'Timelines vary based on scope, but a typical engagement starts with a 2-4 week discovery phase, followed by MVP development which usually takes 3-6 months. We prioritize delivering tangible value early in the process rather than waiting for a "big bang" launch.',
    },
  },
];
