import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  buildContactWhatsAppMessage,
  buildWhatsAppChatUrl,
  contactPageInfo,
  contactSocialLinks,
} from "@/data/contact";

export const ContactFormSection = () => {
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
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
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
    <section
      ref={ref}
      className="section-padding relative overflow-hidden bg-secondary text-secondary-foreground"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/[0.06] via-transparent to-transparent" />

      <div className="container-zenora relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="section-lead max-w-none text-secondary-foreground/75">{t("contact.collab")}</p>

            <div className="space-y-3">
              {contactPageInfo.map((item, index) => (
                <motion.a
                  key={item.labelKey}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                  className="group flex items-center gap-4 rounded-lg border border-secondary-foreground/10 bg-secondary-foreground/[0.04] p-4 transition-colors hover:border-primary/35 hover:bg-secondary-foreground/[0.07]"
                >
                  <item.icon className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105" />
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-sm text-secondary-foreground/55">{t(item.labelKey)}</p>
                    <p className="truncate font-medium text-secondary-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-secondary-foreground/30 transition-colors group-hover:text-primary" />
                </motion.a>
              ))}
            </div>

            <div className="pt-2">
              <p className="mb-4 text-sm text-secondary-foreground/55">{t("contact.followUs")}</p>
              <div className="flex gap-3">
                {contactSocialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-foreground/15 bg-secondary-foreground/5 text-secondary-foreground/70 transition-all duration-300 hover:border-primary/40 hover:bg-primary/15 hover:text-primary"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-primary/20 bg-card p-7 text-card-foreground shadow-elegant md:p-8"
              noValidate
            >
              <h2 className="section-title mb-2 text-2xl md:text-2xl">{t("contact.form.title")}</h2>
              <p className="card-copy mb-6">{t("contact.form.hint")}</p>

              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.form.name")} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      maxLength={120}
                      placeholder={t("contact.form.namePlaceholder")}
                      className="border-border bg-background focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.form.email")} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={160}
                      placeholder={t("contact.form.emailPlaceholder")}
                      className="border-border bg-background focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.form.phone")}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={40}
                      placeholder={t("contact.form.phonePlaceholder")}
                      className="border-border bg-background focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contact.form.company")}
                    </label>
                    <Input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      maxLength={120}
                      placeholder={t("contact.form.companyPlaceholder")}
                      className="border-border bg-background focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                    {t("contact.form.subject")} *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    maxLength={160}
                    placeholder={t("contact.form.subjectPlaceholder")}
                    className="border-border bg-background focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    {t("contact.form.message")} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={4000}
                    placeholder={t("contact.form.messagePlaceholder")}
                    className="resize-none border-border bg-background focus:border-primary"
                  />
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
