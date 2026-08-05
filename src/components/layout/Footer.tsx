import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { FooterParticles } from "@/components/FooterParticles";
import { contactSocialLinks, footerContactLinks } from "@/data/contact";
import logoZenora from "@/assets/logo-zenora-full.png";

export const Footer = () => {
  const { t, language } = useLanguage();

  const footerLinks = [
    {
      title: language === "fr" ? "Entreprise" : "Company",
      links: [
        { label: t("nav.about"), href: "/a-propos" },
        { label: t("nav.method"), href: "/methode" },
        { label: t("nav.projects") || (language === "fr" ? "Projets" : "Projects"), href: "/projects" },
        { label: t("nav.contact"), href: "/contact" },
      ],
    },
    {
      title: t("footer.services"),
      links: [
        { label: t("nav.webDev"), href: "/services/developpement-web" },
        { label: t("nav.marketing"), href: "/services/marketing-digital" },
        { label: t("nav.design"), href: "/services/design-graphic" },
        { label: t("nav.solutions"), href: "/services/solutions-metiers" },
      ],
    },
  ];

  const solutions = [
    {
      name: "NEXUS",
      desc: language === "fr" ? "ERP restauration" : "Restaurant ERP",
      href: "/projects",
    },
    {
      name: "KAZA",
      desc: language === "fr" ? "Gestion immobilière" : "Real estate app",
      href: "/projects",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[hsl(0_0%_4%)] text-white dark:bg-[hsl(0_0%_2%)]">
      <FooterParticles />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.04] via-transparent to-transparent pointer-events-none z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Main footer */}
      <div className="container-zenora py-4 md:py-6 relative z-[2]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 text-center sm:text-left">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col items-center sm:items-start">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logoZenora}
                alt="Zenora"
                className="h-14 w-auto brightness-0 invert opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="font-display text-lg text-white/80 mb-4 italic">
              {t("footer.slogan.from")} <span className="text-primary font-semibold">{t("footer.slogan.zero")}</span> {t("footer.slogan.to")}{" "}
              <span className="text-primary font-semibold">{t("footer.slogan.zenith")}</span>
            </p>
            <p className="text-white/60 leading-relaxed text-sm mb-6 max-w-md">
              {t("footer.description")}
            </p>
            <div className="flex gap-3 justify-center sm:justify-start">
              {contactSocialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/25 flex items-center justify-center text-white/70 hover:text-primary transition-all duration-300 border border-white/10 hover:border-primary/40"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title}>
              <h4 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-5">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={link.href}
                      className="text-white/65 hover:text-primary transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-2" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Solutions */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-5">
              {language === "fr" ? "Solutions" : "Solutions"}
            </h4>
            <ul className="space-y-3">
              {solutions.map((sol, i) => (
                <motion.li
                  key={sol.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={sol.href}
                    className="flex items-start gap-3 group justify-center sm:justify-start"
                  >
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white/90 group-hover:text-primary transition-colors">
                        {sol.name}
                      </div>
                      <div className="text-xs text-white/50">{sol.desc}</div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact row */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <h4 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-3 text-center sm:text-left">
            {language === "fr" ? "Contact" : "Connect"}
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {footerContactLinks.map((item, index) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 group justify-center sm:justify-start"
                >
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="w-10 h-10" />
                  </div>
                  <span className="text-white/70 group-hover:text-primary text-sm transition-colors">
                    {item.label}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 relative z-[2]">
        <div className="container-zenora py-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-xs text-center md:text-left">
              © {new Date().getFullYear()} ZENORA. {t("footer.rights")}
            </p>

            <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs">
              <Link to="/privacy" className="text-white/55 hover:text-primary transition-colors duration-300">
                {t("footer.privacy")}
              </Link>
              <span className="text-white/25">•</span>
              <Link to="/mentions-legales" className="text-white/55 hover:text-primary transition-colors duration-300">
                {t("footer.legal")}
              </Link>
              <span className="text-white/25">•</span>
              <Link to="/faq" className="text-white/55 hover:text-primary transition-colors duration-300">
                FAQ
              </Link>
            </nav>

            <motion.button
              onClick={scrollToTop}
              className="absolute bottom-20 right-10 md:right-20 flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-all duration-300 group"
              whileHover={{ y: -2 }}
            >
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                <ArrowUp className="w-4 h-4" />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
