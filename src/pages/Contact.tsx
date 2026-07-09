import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { MouseParticles } from "@/components/MouseParticles";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/zenoraofficiel", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/zenora_officiel", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/zenora", label: "LinkedIn" },
];

const ADMIN_NUMBERS = ["237655958641", "237655646688"];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const contactInfo = [
    { icon: MapPin, label: t("contact.info.address"), value: "Melen, Yaoundé - Cameroun" },
    { icon: Phone, label: t("contact.info.phone"), value: "+237 655 958 641 / +237 675 166 734" },
    { icon: Mail, label: t("contact.info.email"), value: "contact@zenora360.com" },
    { icon: Globe, label: t("contact.info.website"), value: "www.zenora360.com" },
  ];

  const sendViaWhatsApp = (formData: { name: string; email: string; phone: string; company: string; subject: string; message: string }) => {
    const text = encodeURIComponent(
      `📩 *Nouveau message depuis zenora360.com*\n\n` +
      `👤 *Nom :* ${formData.name}\n` +
      `📧 *Email :* ${formData.email}\n` +
      `📱 *Tél :* ${formData.phone || "Non renseigné"}\n` +
      `🏢 *Entreprise :* ${formData.company || "Non renseignée"}\n` +
      `📋 *Sujet :* ${formData.subject}\n\n` +
      `💬 *Message :*\n${formData.message}`
    );
    // Open WhatsApp for the first admin number
    const url = `https://wa.me/${ADMIN_NUMBERS[0]}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
    // After a slight delay, open for the second admin number
    setTimeout(() => {
      const url2 = `https://wa.me/${ADMIN_NUMBERS[1]}?text=${text}`;
      window.open(url2, "_blank", "noopener,noreferrer");
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    // Send via WhatsApp
    sendViaWhatsApp(formData);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success(t("contact.form.success"), {
      description: t("contact.form.successDesc"),
    });
    
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Mouse particles for entire contact page */}
      <MouseParticles />
      
      <SEO 
        title={t("nav.contact")}
        description={t("contact.description")}
      />
      <Header />
      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="pt-40 pb-24 md:pt-48 md:pb-32 relative overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary/8 blur-[130px]" />
            <div className="absolute inset-0 grid-pattern opacity-[0.1]" />
          </div>
          <div className="container-zenora relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold text-primary tracking-[0.3em] uppercase font-display">
                  {t("contact.title")}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02] tracking-tight mb-6">
                {t("contact.title")} <span className="text-gradient-gold">{t("contact.titleHighlight")}</span>
              </h1>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t("contact.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="py-8 bg-background">
          <div className="container-zenora">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Clock, label: t("contact.availability"), value: t("contact.availabilityValue") },
                { icon: MessageSquare, label: t("contact.responseTime"), value: t("contact.responseTimeValue"), delay: 0.1 },
                { icon: Globe, label: t("contact.reach"), value: t("contact.reachValue"), delay: 0.2, extraClass: "sm:col-span-2 lg:col-span-1" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: item.delay || 0 }}
                  className={`flex items-center gap-4 p-6 rounded-xl bg-card border border-border ${item.extraClass || ""}`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="section-padding bg-secondary text-secondary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          <div className="container-zenora relative" ref={ref}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="mb-2" />

                <p className="text-secondary-foreground/80 leading-relaxed text-lg">
                  {t("contact.collab")}
                </p>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-secondary-foreground/5 hover:bg-secondary-foreground/10 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-secondary-foreground/60 mb-1">{item.label}</p>
                        <p className="font-medium text-secondary-foreground">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6">
                  <p className="text-sm text-secondary-foreground/60 mb-4">{t("contact.followUs")}</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-primary/20 hover:bg-gradient-gold-shine flex items-center justify-center transition-all duration-300 hover:shadow-gold group"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="bg-card text-card-foreground p-8 rounded-2xl shadow-elegant border border-primary/20"
                >
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                    {t("contact.form.title")}
                  </h3>

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{t("contact.form.name")} *</label>
                        <Input id="name" name="name" required placeholder={t("contact.form.namePlaceholder")} className="bg-background border-border focus:border-primary" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{t("contact.form.email")} *</label>
                        <Input id="email" name="email" type="email" required placeholder={t("contact.form.emailPlaceholder")} className="bg-background border-border focus:border-primary" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">{t("contact.form.phone")}</label>
                        <Input id="phone" name="phone" type="tel" placeholder={t("contact.form.phonePlaceholder")} className="bg-background border-border focus:border-primary" />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">{t("contact.form.company")}</label>
                        <Input id="company" name="company" placeholder={t("contact.form.companyPlaceholder")} className="bg-background border-border focus:border-primary" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">{t("contact.form.subject")} *</label>
                      <Input id="subject" name="subject" required placeholder={t("contact.form.subjectPlaceholder")} className="bg-background border-border focus:border-primary" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">{t("contact.form.message")} *</label>
                      <Textarea id="message" name="message" required rows={5} placeholder={t("contact.form.messagePlaceholder")} className="bg-background border-border focus:border-primary resize-none" />
                    </div>

                    <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? t("contact.form.submitting") : (
                        <>
                          {t("contact.form.submit")}
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA Section */}
        <section className="py-12 md:py-16 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_70%)]" />
          <div className="container-zenora relative">
            <motion.a
              href="https://wa.me/237655958641?text=Bonjour%20Zenora%2C%20je%20souhaite%20discuter%20d%27un%20projet."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="block group"
            >
              <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-10 md:p-16 text-center overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_60px_-10px_hsl(var(--primary)/0.3)]">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-700" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-700" />

                <div className="relative z-10">
                  <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#25D366]" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {t("contact.whatsapp.title")}
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                    {t("contact.whatsapp.description")}
                  </p>

                  <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold text-lg group-hover:shadow-[0_0_30px_-5px_#25D366] transition-all duration-500">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {t("contact.whatsapp.button")}
                  </div>

                  <p className="text-sm text-muted-foreground mt-6">
                    {t("contact.whatsapp.note")}
                  </p>
                </div>
              </div>
            </motion.a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;