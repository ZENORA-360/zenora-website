import {
  Icon3DGlobe,
  Icon3DHeadset,
  Icon3DMail,
  Icon3DMapPin,
  Icon3DPhone,
  Icon3DZap,
  type Icon3D,
} from "@/components/icons/Zenora3DIcons";
import { Facebook, Instagram, Linkedin, type LucideIcon } from "lucide-react";
import type { Locale } from "./locale";

/** Single source of truth for public contact channels */
export const contactChannels = {
  email: "contact@zenora360.com",
  phones: [
    {
      display: "+237 655 958 641",
      tel: "+237655958641",
      whatsapp: "237655958641",
    },
    {
      display: "+237 675 166 734",
      tel: "+237675166734",
    },
  ],
  address: {
    display: "Melen, Yaoundé - Cameroun",
    mapsUrl: "https://maps.google.com/?q=Melen,Yaoundé,Cameroun",
  },
  website: {
    display: "zenora360.com",
    href: "https://zenora360.com",
  },
  /** Primary WhatsApp Business line */
  whatsapp: "237655958641",
} as const;

export type ContactInfoItem = {
  icon: Icon3D;
  labelKey: string;
  value: string;
  href: string;
  external?: boolean;
};

export const contactPageInfo: ContactInfoItem[] = [
  {
    icon: Icon3DMapPin,
    labelKey: "contact.info.address",
    value: contactChannels.address.display,
    href: contactChannels.address.mapsUrl,
    external: true,
  },
  {
    icon: Icon3DPhone,
    labelKey: "contact.info.phone",
    value: contactChannels.phones.map((p) => p.display).join(" / "),
    href: `tel:${contactChannels.phones[0].tel}`,
  },
  {
    icon: Icon3DMail,
    labelKey: "contact.info.email",
    value: contactChannels.email,
    href: `mailto:${contactChannels.email}`,
  },
  {
    icon: Icon3DGlobe,
    labelKey: "contact.info.website",
    value: contactChannels.website.display,
    href: contactChannels.website.href,
    external: true,
  },
];

export type ContactQuickFact = {
  icon: Icon3D;
  labelKey: string;
  valueKey: string;
};

export const contactQuickFacts: ContactQuickFact[] = [
  {
    icon: Icon3DZap,
    labelKey: "contact.availability",
    valueKey: "contact.availabilityValue",
  },
  {
    icon: Icon3DHeadset,
    labelKey: "contact.responseTime",
    valueKey: "contact.responseTimeValue",
  },
  {
    icon: Icon3DGlobe,
    labelKey: "contact.reach",
    valueKey: "contact.reachValue",
  },
];

export type SocialLink = {
  icon: LucideIcon;
  href: string;
  label: string;
};

export const contactSocialLinks: SocialLink[] = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/zenoraofficiel",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/zenora_officiel",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/zenora",
    label: "LinkedIn",
  },
];

/** Footer strip — compact, clickable */
export const footerContactLinks = [
  {
    icon: Icon3DMail,
    label: contactChannels.email,
    href: `mailto:${contactChannels.email}`,
  },
  {
    icon: Icon3DPhone,
    label: contactChannels.phones[0].display,
    href: `tel:${contactChannels.phones[0].tel}`,
  },
  {
    icon: Icon3DMapPin,
    label: contactChannels.address.display,
    href: contactChannels.address.mapsUrl,
  },
] as const;

export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

export function buildWhatsAppChatUrl(prefill: string, phone = contactChannels.whatsapp) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(prefill)}`;
}

export function buildContactWhatsAppMessage(
  locale: Locale,
  data: ContactFormPayload,
): string {
  if (locale === "en") {
    return (
      `New message from zenora360.com\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || "Not provided"}\n` +
      `Company: ${data.company || "Not provided"}\n` +
      `Subject: ${data.subject}\n\n` +
      `Message:\n${data.message}`
    );
  }

  return (
    `Nouveau message depuis zenora360.com\n\n` +
    `Nom : ${data.name}\n` +
    `Email : ${data.email}\n` +
    `Tél : ${data.phone || "Non renseigné"}\n` +
    `Entreprise : ${data.company || "Non renseignée"}\n` +
    `Sujet : ${data.subject}\n\n` +
    `Message :\n${data.message}`
  );
}

export function buildWhatsAppGreeting(locale: Locale) {
  return locale === "en"
    ? "Hello Zenora, I would like to discuss a project."
    : "Bonjour Zenora, je souhaite discuter d'un projet.";
}

/** @deprecated use contactPageInfo — kept for ContactSection during migration */
export const contactInfo = contactPageInfo.map((item) => ({
  icon: item.icon,
  label: item.labelKey,
  value: item.value,
  href: item.href,
}));
