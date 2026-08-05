import type { LocalizedString } from "./locale";

export type FaqPageQuestion = {
  question: LocalizedString;
  answer: LocalizedString;
};

export type FaqPageCategory = {
  title: LocalizedString;
  questions: FaqPageQuestion[];
};

export const faqPageCategories: FaqPageCategory[] = [
  {
    title: { fr: "Général", en: "General" },
    questions: [
      {
        question: { fr: "Qu'est-ce que ZENORA ?", en: "What is ZENORA?" },
        answer: {
          fr: "ZENORA est une entreprise technologique spécialisée dans la digitalisation, la structuration numérique et la visibilité des organisations. Nous accompagnons entreprises et institutions dans leur transformation digitale à travers l'Afrique et au-delà.",
          en: "ZENORA is a technology company specializing in digitalization, digital structuring, and organizational visibility. We support businesses and institutions in their digital transformation across Africa and beyond.",
        },
      },
      {
        question: { fr: "Où êtes-vous situés ?", en: "Where are you located?" },
        answer: {
          fr: "Notre siège social est basé à Melen, Yaoundé au Cameroun. Nous travaillons cependant avec des clients à travers l'Afrique et à l'international grâce à notre approche digitale.",
          en: "Our headquarters is based in Melen, Yaoundé, Cameroon. However, we work with clients across Africa and internationally through our digital-first approach.",
        },
      },
      {
        question: { fr: "Quelles sont vos heures de disponibilité ?", en: "What are your business hours?" },
        answer: {
          fr: "Notre équipe est disponible du lundi au samedi, de 8h à 20h (GMT+1). Vous pouvez nous contacter par email, téléphone ou WhatsApp pour une réponse rapide.",
          en: "Our team is available Monday to Saturday, 8am to 8pm (GMT+1). You can contact us by email, phone, or WhatsApp for a quick response.",
        },
      },
    ],
  },
  {
    title: { fr: "Services", en: "Services" },
    questions: [
      {
        question: { fr: "Quels services proposez-vous ?", en: "What services do you offer?" },
        answer: {
          fr: "Nous proposons quatre domaines d'expertise : le Développement Web (sites vitrines, e-commerce, applications web), le Marketing Digital (SEO, réseaux sociaux, publicité en ligne), le Design Graphique (identité visuelle, branding, supports de communication) et les Solutions Métiers (logiciels sur mesure, automatisation, conseil digital).",
          en: "We offer four areas of expertise: Web Development (showcase websites, e-commerce, web applications), Digital Marketing (SEO, social media, online advertising), Graphic Design (visual identity, branding, communication materials), and Business Solutions (custom software, automation, digital consulting).",
        },
      },
      {
        question: {
          fr: "Travaillez-vous avec des startups ou uniquement des grandes entreprises ?",
          en: "Do you work with startups or only large companies?",
        },
        answer: {
          fr: "Nous travaillons avec des organisations de toutes tailles — des startups ambitieuses aux grandes entreprises établies. Chaque projet est adapté à la taille, aux objectifs et au budget de nos clients.",
          en: "We work with organizations of all sizes — from ambitious startups to established enterprises. Each project is tailored to the size, goals, and budget of our clients.",
        },
      },
      {
        question: {
          fr: "Proposez-vous des forfaits ou des tarifs personnalisés ?",
          en: "Do you offer packages or custom pricing?",
        },
        answer: {
          fr: "Nous proposons des solutions sur mesure adaptées à chaque projet. Après une première consultation gratuite, nous élaborons un devis détaillé correspondant à vos besoins et à votre budget.",
          en: "We offer tailored solutions adapted to each project. After a free initial consultation, we prepare a detailed quote matching your needs and budget.",
        },
      },
      {
        question: {
          fr: "Combien de temps prend la réalisation d'un projet web ?",
          en: "How long does a web project take?",
        },
        answer: {
          fr: "La durée dépend de la complexité du projet. Un site vitrine peut être livré en 2-4 semaines, tandis qu'une application web complexe peut prendre 2-4 mois. Nous définissons ensemble un calendrier précis dès le début du projet.",
          en: "Duration depends on project complexity. A showcase website can be delivered in 2-4 weeks, while a complex web application may take 2-4 months. We define a precise timeline together at the start of the project.",
        },
      },
    ],
  },
  {
    title: { fr: "Processus & Collaboration", en: "Process & Collaboration" },
    questions: [
      {
        question: { fr: "Comment se déroule un projet avec ZENORA ?", en: "How does a project with ZENORA work?" },
        answer: {
          fr: "Notre méthode suit quatre étapes : Découverte (analyse de vos besoins), Stratégie (planification et conception), Exécution (développement et création) et Optimisation (tests, lancement et suivi). Vous êtes impliqué à chaque étape.",
          en: "Our method follows four steps: Discovery (analyzing your needs), Strategy (planning and design), Execution (development and creation), and Optimization (testing, launch, and monitoring). You are involved at every step.",
        },
      },
      {
        question: { fr: "Offrez-vous un suivi après la livraison ?", en: "Do you offer post-delivery support?" },
        answer: {
          fr: "Absolument. Nous proposons des contrats de maintenance et d'accompagnement pour assurer la pérennité de vos solutions digitales. Cela inclut les mises à jour, le support technique et l'optimisation continue.",
          en: "Absolutely. We offer maintenance and support contracts to ensure the longevity of your digital solutions. This includes updates, technical support, and continuous optimization.",
        },
      },
      {
        question: {
          fr: "Puis-je voir des exemples de projets réalisés ?",
          en: "Can I see examples of completed projects?",
        },
        answer: {
          fr: "Oui, contactez-nous pour recevoir notre portfolio détaillé. Nous pourrons vous présenter des projets similaires au vôtre et discuter des résultats obtenus pour nos clients.",
          en: "Yes, contact us to receive our detailed portfolio. We can present projects similar to yours and discuss the results achieved for our clients.",
        },
      },
    ],
  },
  {
    title: { fr: "Paiement & Facturation", en: "Payment & Billing" },
    questions: [
      {
        question: { fr: "Quels modes de paiement acceptez-vous ?", en: "What payment methods do you accept?" },
        answer: {
          fr: "Nous acceptons les virements bancaires, les paiements mobile money (MTN, Orange Money) et les paiements en ligne. Un acompte de 40% est généralement demandé au démarrage du projet.",
          en: "We accept bank transfers, mobile money payments (MTN, Orange Money), and online payments. A 40% deposit is generally required at project start.",
        },
      },
      {
        question: { fr: "Proposez-vous des facilités de paiement ?", en: "Do you offer payment plans?" },
        answer: {
          fr: "Oui, nous proposons des plans de paiement échelonnés pour les projets de grande envergure. Les modalités sont discutées et formalisées dans le contrat de prestation.",
          en: "Yes, we offer installment payment plans for large-scale projects. The terms are discussed and formalized in the service contract.",
        },
      },
    ],
  },
];

/** Page-level copy for /faq */
export const faqPageCopy = {
  seoTitle: { fr: "FAQ", en: "FAQ" },
  seoDescription: {
    fr: "Questions fréquemment posées sur les services et solutions de ZENORA.",
    en: "Frequently asked questions about ZENORA's services and solutions.",
  },
  hero: {
    eyebrow: { fr: "FAQ", en: "FAQ" },
    titleStart: { fr: "Questions ", en: "Frequently Asked " },
    titleHighlight: { fr: "Fréquentes", en: "Questions" },
    lead: {
      fr: "Retrouvez les réponses aux questions les plus courantes sur nos services et notre fonctionnement.",
      en: "Find answers to the most common questions about our services and how we work.",
    },
  },
  cta: {
    title: { fr: "Vous n'avez pas trouvé votre réponse ?", en: "Didn't find your answer?" },
    lead: {
      fr: "Notre équipe est à votre disposition pour répondre à toutes vos questions.",
      en: "Our team is available to answer all your questions.",
    },
    button: { fr: "Contactez-nous", en: "Contact us" },
  },
} as const;
