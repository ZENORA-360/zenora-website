import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Scale, Server, FileText, AlertTriangle, Gavel } from "lucide-react";

const MentionsLegales = () => {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const sections = isFr
    ? [
        {
          icon: Building2,
          title: "Éditeur du site",
          items: [
            { label: "Raison sociale", value: "ZENORA" },
            { label: "Forme juridique", value: "Société à responsabilité limitée (SARL)" },
            { label: "Siège social", value: "Melen, Yaoundé — Cameroun" },
            { label: "Téléphone", value: "+237 655 958 641 / +237 675 166 734" },
            { label: "Email", value: "contact@zenora360.com" },
            { label: "Site web", value: "www.zenora360.com" },
            { label: "Directeur de publication", value: "Le gérant de ZENORA" },
          ],
        },
        {
          icon: Server,
          title: "Hébergement",
          items: [
            { label: "Hébergeur", value: "OVH Cloud" },
            { label: "Localisation", value: "Infrastructure Cloud internationale" },
            { label: "Contact", value: "support@ovhcloud.com" },
          ],
        },
        {
          icon: Scale,
          title: "Propriété intellectuelle",
          content:
            "L'ensemble du contenu de ce site (textes, images, graphismes, logos, icônes, vidéos, logiciels) est la propriété exclusive de ZENORA ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de ZENORA.",
        },
        {
          icon: FileText,
          title: "Conditions d'utilisation",
          content:
            "L'utilisation du site www.zenora360.com implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions sont susceptibles d'être modifiées à tout moment. Les utilisateurs du site sont invités à les consulter régulièrement. Ce site est accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut toutefois être décidée par ZENORA.",
        },
        {
          icon: AlertTriangle,
          title: "Limitation de responsabilité",
          content:
            "ZENORA s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, ZENORA ne pourra être tenue responsable des omissions, inexactitudes ou carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. Toutes les informations indiquées sur le site sont données à titre indicatif et sont susceptibles d'évoluer.",
        },
        {
          icon: Gavel,
          title: "Droit applicable",
          content:
            "Tout litige en relation avec l'utilisation du site www.zenora360.com est soumis au droit camerounais. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Yaoundé, Cameroun.",
        },
      ]
    : [
        {
          icon: Building2,
          title: "Site Publisher",
          items: [
            { label: "Company name", value: "ZENORA" },
            { label: "Legal form", value: "Limited Liability Company (LLC)" },
            { label: "Headquarters", value: "Melen, Yaoundé — Cameroon" },
            { label: "Phone", value: "+237 655 958 641 / +237 675 166 734" },
            { label: "Email", value: "contact@zenora360.com" },
            { label: "Website", value: "www.zenora360.com" },
            { label: "Publication director", value: "ZENORA's Managing Director" },
          ],
        },
        {
          icon: Server,
          title: "Hosting",
          items: [
            { label: "Host", value: "OVH Cloud" },
            { label: "Location", value: "International Cloud Infrastructure" },
            { label: "Contact", value: "support@ovhcloud.com" },
          ],
        },
        {
          icon: Scale,
          title: "Intellectual Property",
          content:
            "All content on this website (texts, images, graphics, logos, icons, videos, software) is the exclusive property of ZENORA or its partners and is protected by French and international intellectual property laws. Any reproduction, representation, modification, publication, or adaptation of all or part of the site, by any means or process, is prohibited without the prior written authorization of ZENORA.",
        },
        {
          icon: FileText,
          title: "Terms of Use",
          content:
            "The use of the website www.zenora360.com implies full and complete acceptance of the general terms of use described herein. These terms may be modified at any time. Users of the site are invited to consult them regularly. This site is accessible at all times to users. An interruption for technical maintenance may however be decided by ZENORA.",
        },
        {
          icon: AlertTriangle,
          title: "Limitation of Liability",
          content:
            "ZENORA strives to provide information on the site that is as accurate as possible. However, ZENORA cannot be held responsible for omissions, inaccuracies, or deficiencies in updates, whether caused by ZENORA or third-party partners providing such information. All information on the site is provided for indicative purposes and is subject to change.",
        },
        {
          icon: Gavel,
          title: "Applicable Law",
          content:
            "Any dispute relating to the use of the website www.zenora360.com is subject to Cameroonian law. Exclusive jurisdiction is granted to the competent courts of Yaoundé, Cameroon.",
        },
      ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={isFr ? "Mentions Légales" : "Legal Mentions"}
        description={
          isFr
            ? "Informations légales concernant le site ZENORA et ses conditions d'utilisation."
            : "Legal information about the ZENORA website and its terms of use."
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
                {isFr ? "LÉGAL" : "LEGAL"}
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                {isFr ? "Mentions " : "Legal "}
                <span className="text-gradient-gold">{isFr ? "Légales" : "Mentions"}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {isFr
                  ? "Informations légales et réglementaires concernant le site ZENORA."
                  : "Legal and regulatory information about the ZENORA website."}
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
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground pt-2">
                      {section.title}
                    </h2>
                  </div>
                  <div className="pl-16">
                    {"items" in section && section.items ? (
                      <div className="space-y-3">
                        {section.items.map((item) => (
                          <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4">
                            <span className="text-sm font-semibold text-foreground min-w-[180px]">
                              {item.label}
                            </span>
                            <span className="text-muted-foreground">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed">
                        {"content" in section ? section.content : ""}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
