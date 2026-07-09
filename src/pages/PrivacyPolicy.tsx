import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Eye, Lock, Database, UserCheck, Globe, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const sections = isFr
    ? [
        {
          icon: Eye,
          title: "Collecte des données",
          content: [
            "Nous collectons uniquement les données personnelles que vous nous fournissez volontairement via nos formulaires de contact, d'inscription à la newsletter ou lors de demandes de devis.",
            "Les données collectées incluent : nom, prénom, adresse email, numéro de téléphone, nom de l'entreprise et toute information que vous choisissez de nous communiquer dans vos messages.",
          ],
        },
        {
          icon: Database,
          title: "Utilisation des données",
          content: [
            "Vos données personnelles sont utilisées exclusivement pour :",
            "• Répondre à vos demandes de contact et de devis\n• Vous fournir nos services et solutions digitales\n• Vous envoyer des communications marketing (avec votre consentement)\n• Améliorer nos services et l'expérience utilisateur de notre site\n• Respecter nos obligations légales et réglementaires",
          ],
        },
        {
          icon: Lock,
          title: "Protection des données",
          content: [
            "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.",
            "Nos serveurs sont hébergés dans des centres de données sécurisés et nous utilisons le chiffrement SSL/TLS pour toutes les transmissions de données.",
          ],
        },
        {
          icon: UserCheck,
          title: "Vos droits",
          content: [
            "Conformément à la réglementation en vigueur, vous disposez des droits suivants :",
            "• Droit d'accès à vos données personnelles\n• Droit de rectification des données inexactes\n• Droit à l'effacement de vos données\n• Droit à la limitation du traitement\n• Droit à la portabilité de vos données\n• Droit d'opposition au traitement",
            "Pour exercer ces droits, contactez-nous à : contact@zenora360.com",
          ],
        },
        {
          icon: Globe,
          title: "Cookies et technologies de suivi",
          content: [
            "Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil.",
            "Nous utilisons des cookies essentiels (nécessaires au fonctionnement du site), des cookies analytiques (pour comprendre l'utilisation du site) et des cookies de préférence (pour mémoriser vos choix).",
            "Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.",
          ],
        },
        {
          icon: Shield,
          title: "Conservation des données",
          content: [
            "Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, et dans le respect des délais de prescription légaux.",
            "Les données de contact sont conservées pendant 3 ans à compter du dernier contact. Les données de facturation sont conservées pendant 10 ans conformément aux obligations comptables.",
          ],
        },
      ]
    : [
        {
          icon: Eye,
          title: "Data Collection",
          content: [
            "We only collect personal data that you voluntarily provide through our contact forms, newsletter subscriptions, or quote requests.",
            "Collected data includes: first name, last name, email address, phone number, company name, and any information you choose to share in your messages.",
          ],
        },
        {
          icon: Database,
          title: "Data Usage",
          content: [
            "Your personal data is used exclusively for:",
            "• Responding to your contact and quote requests\n• Providing our digital services and solutions\n• Sending marketing communications (with your consent)\n• Improving our services and website user experience\n• Complying with legal and regulatory obligations",
          ],
        },
        {
          icon: Lock,
          title: "Data Protection",
          content: [
            "We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, modification, disclosure, or destruction.",
            "Our servers are hosted in secure data centers and we use SSL/TLS encryption for all data transmissions.",
          ],
        },
        {
          icon: UserCheck,
          title: "Your Rights",
          content: [
            "In accordance with applicable regulations, you have the following rights:",
            "• Right to access your personal data\n• Right to rectification of inaccurate data\n• Right to erasure of your data\n• Right to restriction of processing\n• Right to data portability\n• Right to object to processing",
            "To exercise these rights, contact us at: contact@zenora360.com",
          ],
        },
        {
          icon: Globe,
          title: "Cookies and Tracking Technologies",
          content: [
            "Our website uses cookies to improve your browsing experience. Cookies are small text files stored on your device.",
            "We use essential cookies (necessary for site operation), analytical cookies (to understand site usage), and preference cookies (to remember your choices).",
            "You can manage your cookie preferences through your browser settings.",
          ],
        },
        {
          icon: Shield,
          title: "Data Retention",
          content: [
            "Your personal data is retained for the duration necessary for the purposes for which it was collected, in compliance with legal prescription periods.",
            "Contact data is retained for 3 years from the last contact. Billing data is retained for 10 years in accordance with accounting obligations.",
          ],
        },
      ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isFr ? "Politique de confidentialité" : "Privacy Policy"}
        description={
          isFr
            ? "Découvrez comment ZENORA protège et utilise vos données personnelles."
            : "Learn how ZENORA protects and uses your personal data."
        }
      />
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
          <div className="container-zenora">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
                {isFr ? "CONFIDENTIALITÉ" : "PRIVACY"}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                {isFr ? "Politique de " : "Privacy "}
                <span className="text-gradient-gold">{isFr ? "Confidentialité" : "Policy"}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {isFr
                  ? "Dernière mise à jour : Février 2026 — Votre vie privée est notre priorité."
                  : "Last updated: February 2026 — Your privacy is our priority."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-zenora max-w-4xl">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground pt-2">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4 pl-16">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-muted-foreground leading-relaxed whitespace-pre-line"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center"
            >
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {isFr ? "Des questions ?" : "Questions?"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isFr
                  ? "Pour toute question relative à cette politique, contactez notre délégué à la protection des données."
                  : "For any questions regarding this policy, contact our data protection officer."}
              </p>
              <a
                href="mailto:contact@zenora360.com"
                className="text-primary font-semibold hover:underline"
              >
                contact@zenora360.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
