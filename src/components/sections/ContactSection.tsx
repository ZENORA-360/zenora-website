import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import logoZenora from "@/assets/logo-zenora-monogram.png";
import {
  buildContactWhatsAppMessage,
  buildWhatsAppChatUrl,
  contactPageInfo,
  contactSocialLinks,
} from "@/data/contact";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      company: "",
      subject: "Contact site",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t("contact.form.validation"));
      return;
    }

    setIsSubmitting(true);
    const url = buildWhatsAppChatUrl(buildContactWhatsAppMessage(language, formData));
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    await new Promise((r) => setTimeout(r, 400));
    setIsSubmitting(false);

    if (!popup || popup.closed) {
      toast.message(t("contact.form.popupBlocked"), {
        description: t("contact.form.popupBlockedDesc"),
        action: {
          label: t("contact.form.openWhatsApp"),
          onClick: () => window.open(url, "_blank", "noopener,noreferrer"),
        },
      });
      return;
    }

    toast.success(t("contact.form.success"), {
      description: t("contact.form.successDesc"),
    });
    form.reset();
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>

      <div className="container-zenora relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-eyebrow mb-4 inline-block">{t("contact.label")}</span>
          <h2 className="section-title-on-secondary mb-6">
            {t("contact.title")}{" "}
            <span className="text-gradient-gold">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="section-lead mx-auto max-w-2xl text-secondary-foreground/70">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <img src={logoZenora} alt="ZENORA" className="h-16 w-16 object-contain" />
              <div>
                <h3 className="font-display text-2xl font-bold">ZENORA</h3>
                <p className="text-sm italic text-primary">
                  {t("footer.slogan.from")} {t("footer.slogan.zero")} {t("footer.slogan.to")}{" "}
                  {t("footer.slogan.zenith")}
                </p>
              </div>
            </div>

            <p className="section-lead max-w-none text-secondary-foreground/80">
              {t("contact.collab")}
            </p>

            <div className="space-y-3">
              {contactPageInfo.map((item, index) => (
                <motion.a
                  key={item.labelKey}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="group flex items-center gap-4 rounded-lg bg-secondary-foreground/5 p-4 transition-colors hover:bg-secondary-foreground/10"
                >
                  <item.icon className="h-10 w-10 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-sm text-secondary-foreground/60">{t(item.labelKey)}</p>
                    <p className="font-medium text-secondary-foreground group-hover:text-primary">
                      {item.value}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-secondary-foreground/30 group-hover:text-primary" />
                </motion.a>
              ))}
            </div>

            <div className="pt-6">
              <p className="mb-4 text-sm text-secondary-foreground/60">{t("contact.followUs")}</p>
              <div className="flex gap-3">
                {contactSocialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary transition-all duration-300 hover:bg-primary/30"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-primary/20 bg-card p-8 text-card-foreground shadow-elegant"
              noValidate
            >
              <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
                {t("contact.form.title")}
              </h3>
              <p className="card-copy mb-6">{t("contact.form.hint")}</p>

              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cs-name" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.form.name")} *
                    </label>
                    <Input id="cs-name" name="name" required className="border-border bg-background focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="cs-email" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.form.email")} *
                    </label>
                    <Input id="cs-email" name="email" type="email" required className="border-border bg-background focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label htmlFor="cs-phone" className="mb-2 block text-sm font-medium text-foreground">
                    {t("contact.form.phone")}
                  </label>
                  <Input id="cs-phone" name="phone" type="tel" className="border-border bg-background focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="cs-message" className="mb-2 block text-sm font-medium text-foreground">
                    {t("contact.form.message")} *
                  </label>
                  <Textarea id="cs-message" name="message" required rows={5} className="resize-none border-border bg-background focus:border-primary" />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    t("contact.form.submitting")
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {t("contact.form.submit")}
                      <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
