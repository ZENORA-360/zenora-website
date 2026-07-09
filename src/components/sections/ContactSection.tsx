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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import logoZenora from "@/assets/logo-zenora-monogram.png";

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "Melen, Yaoundé - Cameroun",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+237 655 958 641 / +237 675 166 734",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@zenora360.com",
  },
  {
    icon: Globe,
    label: "Site Web",
    value: "www.zenora360.com",
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/zenora_officiel", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/zenora_officiel", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/zenora", label: "LinkedIn" },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Message envoyé avec succès !", {
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="section-padding bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>

      <div className="container-zenora relative" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
            CONTACT
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Contactez-<span className="text-gradient-gold">Nous</span>
          </h2>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            Prêt à transformer votre vision en réalité ? Discutons de votre projet.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Logo and tagline */}
            <div className="flex items-center gap-4 mb-8">
              <img src={logoZenora} alt="Zenora" className="h-16 w-auto" />
            </div>

            <p className="text-secondary-foreground/80 leading-relaxed">
              Chez ZENORA, la collaboration est au cœur de notre succès. Nous nous 
              entourons des meilleurs talents et partenaires pour offrir des solutions 
              innovantes et durables à nos clients.
            </p>

            {/* Contact details */}
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
                    <p className="text-sm text-secondary-foreground/60 mb-1">
                      {item.label}
                    </p>
                    <p className="font-medium text-secondary-foreground">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-6">
              <p className="text-sm text-secondary-foreground/60 mb-4">Suivez-nous</p>
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
              <p className="text-sm text-secondary-foreground/60 mt-3">@zenora_officiel</p>
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
                Envoyez-nous un message
              </h3>

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nom complet *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Votre nom"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Adresse email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="votre@email.com"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+237 6XX XXX XXX"
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Sujet *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    placeholder="L'objet de votre message"
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Décrivez votre projet ou votre demande..."
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer le message
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
  );
};
