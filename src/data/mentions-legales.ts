import {
  Building2,
  Scale,
  Server,
  FileText,
  AlertTriangle,
  Gavel,
  type LucideIcon,
} from "lucide-react";
import type { LocalizedString } from "./locale";
import { contactChannels } from "./contact";

export type MentionsLegalesItem = {
  label: LocalizedString;
  value: LocalizedString;
};

export type MentionsLegalesSection = {
  icon: LucideIcon;
  title: LocalizedString;
  /** Structured key/value block (publisher, hosting) */
  items?: MentionsLegalesItem[];
  /** Free-form paragraph (IP, terms, liability, law) */
  content?: LocalizedString;
};

const phoneDisplay = contactChannels.phones.map((p) => p.display).join(" / ");

export const mentionsLegalesSections: MentionsLegalesSection[] = [
  {
    icon: Building2,
    title: { fr: "Éditeur du site", en: "Site Publisher" },
    items: [
      { label: { fr: "Raison sociale", en: "Company name" }, value: { fr: "ZENORA", en: "ZENORA" } },
      {
        label: { fr: "Forme juridique", en: "Legal form" },
        value: { fr: "Société à responsabilité limitée (SARL)", en: "Limited Liability Company (LLC)" },
      },
      {
        label: { fr: "Siège social", en: "Headquarters" },
        value: { fr: "Melen, Yaoundé — Cameroun", en: "Melen, Yaoundé — Cameroon" },
      },
      { label: { fr: "Téléphone", en: "Phone" }, value: { fr: phoneDisplay, en: phoneDisplay } },
      { label: { fr: "Email", en: "Email" }, value: { fr: contactChannels.email, en: contactChannels.email } },
      {
        label: { fr: "Site web", en: "Website" },
        value: { fr: contactChannels.website.display, en: contactChannels.website.display },
      },
      {
        label: { fr: "Directeur de publication", en: "Publication director" },
        value: { fr: "Le gérant de ZENORA", en: "ZENORA's Managing Director" },
      },
    ],
  },
  {
    icon: Server,
    title: { fr: "Hébergement", en: "Hosting" },
    items: [
      { label: { fr: "Hébergeur", en: "Host" }, value: { fr: "OVH Cloud", en: "OVH Cloud" } },
      {
        label: { fr: "Localisation", en: "Location" },
        value: { fr: "Infrastructure Cloud internationale", en: "International Cloud Infrastructure" },
      },
      {
        label: { fr: "Contact", en: "Contact" },
        value: { fr: "support@ovhcloud.com", en: "support@ovhcloud.com" },
      },
    ],
  },
  {
    icon: Scale,
    title: { fr: "Propriété intellectuelle", en: "Intellectual Property" },
    content: {
      fr: "L'ensemble du contenu de ce site (textes, images, graphismes, logos, icônes, vidéos, logiciels) est la propriété exclusive de ZENORA ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de ZENORA.",
      en: "All content on this website (texts, images, graphics, logos, icons, videos, software) is the exclusive property of ZENORA or its partners and is protected by French and international intellectual property laws. Any reproduction, representation, modification, publication, or adaptation of all or part of the site, by any means or process, is prohibited without the prior written authorization of ZENORA.",
    },
  },
  {
    icon: FileText,
    title: { fr: "Conditions d'utilisation", en: "Terms of Use" },
    content: {
      fr: "L'utilisation du site www.zenora360.com implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions sont susceptibles d'être modifiées à tout moment. Les utilisateurs du site sont invités à les consulter régulièrement. Ce site est accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut toutefois être décidée par ZENORA.",
      en: "The use of the website www.zenora360.com implies full and complete acceptance of the general terms of use described herein. These terms may be modified at any time. Users of the site are invited to consult them regularly. This site is accessible at all times to users. An interruption for technical maintenance may however be decided by ZENORA.",
    },
  },
  {
    icon: AlertTriangle,
    title: { fr: "Limitation de responsabilité", en: "Limitation of Liability" },
    content: {
      fr: "ZENORA s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, ZENORA ne pourra être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. Toutes les informations indiquées sur le site sont données à titre indicatif et sont susceptibles d'évoluer.",
      en: "ZENORA strives to provide information on the site that is as accurate as possible. However, ZENORA cannot be held responsible for omissions, inaccuracies, or deficiencies in updates, whether caused by ZENORA or third-party partners providing such information. All information on the site is provided for indicative purposes and is subject to change.",
    },
  },
  {
    icon: Gavel,
    title: { fr: "Droit applicable", en: "Applicable Law" },
    content: {
      fr: "Tout litige en relation avec l'utilisation du site www.zenora360.com est soumis au droit camerounais. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Yaoundé, Cameroun.",
      en: "Any dispute relating to the use of the website www.zenora360.com is subject to Cameroonian law. Exclusive jurisdiction is granted to the competent courts of Yaoundé, Cameroon.",
    },
  },
];

/** Page-level copy for /mentions-legales */
export const mentionsLegalesCopy = {
  seoTitle: { fr: "Mentions Légales", en: "Legal Mentions" },
  seoDescription: {
    fr: "Informations légales concernant le site ZENORA et ses conditions d'utilisation.",
    en: "Legal information about the ZENORA website and its terms of use.",
  },
  hero: {
    eyebrow: { fr: "LÉGAL", en: "LEGAL" },
    titleStart: { fr: "Mentions ", en: "Legal " },
    titleHighlight: { fr: "Légales", en: "Mentions" },
    lead: {
      fr: "Informations légales et réglementaires concernant le site ZENORA.",
      en: "Legal and regulatory information about the ZENORA website.",
    },
  },
} as const;
