import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import logoZenoraLight from "@/assets/logo-zenora-light.png";
import logoZenoraDark from "@/assets/logo-zenora-dark.png";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const servicesSubLinks = [
    { href: "/services/developpement-web", label: t("nav.webDev") },
    { href: "/services/marketing-digital", label: t("nav.marketing") },
    { href: "/services/design-graphic", label: t("nav.design") },
    { href: "/services/solutions-metiers", label: t("nav.solutions") },
  ];

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services"), hasDropdown: true },
    { href: "/projects", label: t("nav.projects") },
    { href: "/a-propos", label: t("nav.about") },
    { href: "/methode", label: t("nav.method") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);


  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 animate-fade-in ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-zenora">
        <div className="flex items-center justify-between h-20">
          {/* Logo - dual image swap for instant theme switch (no JS needed) */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="ZENORA — Accueil">
            <img
              src={logoZenoraLight}
              alt="Zenora Logo"
              className="h-12 md:h-14 w-auto block dark:hidden transition-transform duration-300 group-hover:scale-105"
            />
            <img
              src={logoZenoraDark}
              alt="Zenora Logo"
              className="h-12 md:h-14 w-auto hidden dark:block transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.hasDropdown ? (
                  <div
                    className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link to={link.href} className={isActive(link.href) ? "text-primary" : ""}>{link.label}</Link>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                    
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 pt-4"
                        >
                          <div className="bg-card/95 backdrop-blur-xl rounded-xl border border-border shadow-elegant p-2 min-w-[240px]">
                            {servicesSubLinks.map((subLink, index) => (
                              <motion.div
                                key={subLink.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  to={subLink.href}
                                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                                    isActive(subLink.href)
                                      ? "text-primary bg-accent"
                                      : "text-foreground/80 hover:text-primary hover:bg-accent"
                                  }`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                  {subLink.label}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-all duration-300 relative group ${
                      isActive(link.href) ? "text-primary" : "text-foreground/70 hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-500 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Button 
              variant="goldOutline" 
              size="sm"
              className="ml-2 border-primary/50 hover:border-primary hover:shadow-[0_0_20px_hsla(42,70%,50%,0.3)] transition-all duration-500"
              asChild
            >
              <Link to="/contact">{t("hero.cta.start")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              className="p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </header>


    {/* Mobile Menu — Rendered as sibling to escape header stacking context */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ zIndex: 99 }}
          className="lg:hidden fixed inset-0 top-20 bg-background overflow-y-auto border-t border-border shadow-2xl"
        >
          <nav className="container-zenora py-8 flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.hasDropdown ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={link.href}
                        className={`flex-1 text-lg font-medium py-4 transition-colors ${
                          isActive(link.href) ? "text-primary" : "text-foreground/80 hover:text-primary"
                        }`}
                      >
                        {link.label}
                      </Link>
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="p-3 text-foreground/60 hover:text-primary transition-colors"
                        aria-label="Toggle services submenu"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    <AnimatePresence>
                      {isMobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 border-l-2 border-primary/30 ml-3 space-y-1 pb-3">
                            {servicesSubLinks.map((subLink) => (
                              <Link
                                key={subLink.href}
                                to={subLink.href}
                                className={`block text-sm py-2.5 px-3 rounded-lg transition-colors ${
                                  isActive(subLink.href)
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-primary hover:bg-accent"
                                }`}
                              >
                                {subLink.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={`block text-lg font-medium py-4 transition-colors border-b border-border/30 ${
                      isActive(link.href) ? "text-primary" : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
            <div className="pt-6">
              <Button variant="gold" className="w-full" size="lg" asChild>
                <Link to="/contact">{t("hero.cta.start")}</Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};