import { Shield, Eye, Lock, Database, UserCheck, Globe, type LucideIcon } from "lucide-react";
import type { LocalizedString } from "./locale";
import { contactChannels } from "./contact";

export type PrivacySection = {
  icon: LucideIcon;
  title: LocalizedString;
  /** One entry per paragraph, rendered with `whitespace-pre-line` for bullet lists */
  paragraphs: LocalizedString[];
};

export const privacySections: PrivacySection[] = [
  {
    icon: Eye,
    title: { fr: "Collecte des données", en: "Data Collection" },
    paragraphs: [
      {
        fr: "Nous collectons uniquement les données personnelles que vous nous fournissez volontairement via nos formulaires de contact, d'inscription à la newsletter ou lors de demandes de devis.",
        en: "We only collect personal data that you voluntarily provide through our contact forms, newsletter subscriptions, or quote requests.",
      },
      {
        fr: "Les données collectées incluent : nom, prénom, adresse email, numéro de téléphone, nom de l'entreprise et toute information que vous choisissez de nous communiquer dans vos messages.",
        en: "Collected data includes: first name, last name, email address, phone number, company name, and any information you choose to share in your messages.",
      },
    ],
  },
  {
    icon: Database,
    title: { fr: "Utilisation des données", en: "Data Usage" },
    paragraphs: [
      {
        fr: "Vos données personnelles sont utilisées exclusivement pour :",
        en: "Your personal data is used exclusively for:",
      },
      {
        fr: "• Répondre à vos demandes de contact et de devis\n• Vous fournir nos services et solutions digitales\n• Vous envoyer des communications marketing (avec votre consentement)\n• Améliorer nos services et l'expérience utilisateur de notre site\n• Respecter nos obligations légales et réglementaires",
        en: "• Responding to your contact and quote requests\n• Providing our digital services and solutions\n• Sending marketing communications (with your consent)\n• Improving our services and website user experience\n• Complying with legal and regulatory obligations",
      },
    ],
  },
  {
    icon: Lock,
    title: { fr: "Protection des données", en: "Data Protection" },
    paragraphs: [
      {
        fr: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.",
        en: "We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, modification, disclosure, or destruction.",
      },
      {
        fr: "Nos serveurs sont hébergés dans des centres de données sécurisés et nous utilisons le chiffrement SSL/TLS pour toutes les transmissions de données.",
        en: "Our servers are hosted in secure data centers and we use SSL/TLS encryption for all data transmissions.",
      },
    ],
  },
  {
    icon: UserCheck,
    title: { fr: "Vos droits", en: "Your Rights" },
    paragraphs: [
      {
        fr: "Conformément à la réglementation en vigueur, vous disposez des droits suivants :",
        en: "In accordance with applicable regulations, you have the following rights:",
      },
      {
        fr: "• Droit d'accès à vos données personnelles\n• Droit de rectification des données inexactes\n• Droit à l'effacement de vos données\n• Droit à la limitation du traitement\n• Droit à la portabilité de vos données\n• Droit d'opposition au traitement",
        en: "• Right to access your personal data\n• Right to rectification of inaccurate data\n• Right to erasure of your data\n• Right to restriction of processing\n• Right to data portability\n• Right to object to processing",
      },
      {
        fr: `Pour exercer ces droits, contactez-nous à : ${contactChannels.email}`,
        en: `To exercise these rights, contact us at: ${contactChannels.email}`,
      },
    ],
  },
  {
    icon: Globe,
    title: { fr: "Cookies et technologies de suivi", en: "Cookies and Tracking Technologies" },
    paragraphs: [
      {
        fr: "Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil.",
        en: "Our website uses cookies to improve your browsing experience. Cookies are small text files stored on your device.",
      },
      {
        fr: "Nous utilisons des cookies essentiels (nécessaires au fonctionnement du site), des cookies analytiques (pour comprendre l'utilisation du site) et des cookies de préférence (pour mémoriser vos choix).",
        en: "We use essential cookies (necessary for site operation), analytical cookies (to understand site usage), and preference cookies (to remember your choices).",
      },
      {
        fr: "Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.",
        en: "You can manage your cookie preferences through your browser settings.",
      },
    ],
  },
  {
    icon: Shield,
    title: { fr: "Conservation des données", en: "Data Retention" },
    paragraphs: [
      {
        fr: "Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, et dans le respect des délais de prescription légaux.",
        en: "Your personal data is retained for the duration necessary for the purposes for which it was collected, in compliance with legal prescription periods.",
      },
      {
        fr: "Les données de contact sont conservées pendant 3 ans à compter du dernier contact. Les données de facturation sont conservées pendant 10 ans conformément aux obligations comptables.",
        en: "Contact data is retained for 3 years from the last contact. Billing data is retained for 10 years in accordance with accounting obligations.",
      },
    ],
  },
];

/** Page-level copy for /politique-de-confidentialite */
export const privacyPageCopy = {
  seoTitle: { fr: "Politique de confidentialité", en: "Privacy Policy" },
  seoDescription: {
    fr: "Découvrez comment ZENORA protège et utilise vos données personnelles.",
    en: "Learn how ZENORA protects and uses your personal data.",
  },
  hero: {
    eyebrow: { fr: "CONFIDENTIALITÉ", en: "PRIVACY" },
    titleStart: { fr: "Politique de ", en: "Privacy " },
    titleHighlight: { fr: "Confidentialité", en: "Policy" },
    lead: {
      fr: "Dernière mise à jour : Février 2026 — Votre vie privée est notre priorité.",
      en: "Last updated: February 2026 — Your privacy is our priority.",
    },
  },
  contact: {
    title: { fr: "Des questions ?", en: "Questions?" },
    lead: {
      fr: "Pour toute question relative à cette politique, contactez notre délégué à la protection des données.",
      en: "For any questions regarding this policy, contact our data protection officer.",
    },
    email: contactChannels.email,
  },
} as const;
