import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQCategory {
  title: string;
  questions: { q: string; a: string }[];
}

const FAQ = () => {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const categories: FAQCategory[] = isFr
    ? [
        {
          title: "Général",
          questions: [
            {
              q: "Qu'est-ce que ZENORA ?",
              a: "ZENORA est une entreprise technologique spécialisée dans la digitalisation, la structuration numérique et la visibilité des organisations. Nous accompagnons entreprises et institutions dans leur transformation digitale à travers l'Afrique et au-delà.",
            },
            {
              q: "Où êtes-vous situés ?",
              a: "Notre siège social est basé à Melen, Yaoundé au Cameroun. Nous travaillons cependant avec des clients à travers l'Afrique et à l'international grâce à notre approche digitale.",
            },
            {
              q: "Quelles sont vos heures de disponibilité ?",
              a: "Notre équipe est disponible du lundi au samedi, de 8h à 20h (GMT+1). Vous pouvez nous contacter par email, téléphone ou WhatsApp pour une réponse rapide.",
            },
          ],
        },
        {
          title: "Services",
          questions: [
            {
              q: "Quels services proposez-vous ?",
              a: "Nous proposons quatre domaines d'expertise : le Développement Web (sites vitrines, e-commerce, applications web), le Marketing Digital (SEO, réseaux sociaux, publicité en ligne), le Design Graphique (identité visuelle, branding, supports de communication) et les Solutions Métiers (logiciels sur mesure, automatisation, conseil digital).",
            },
            {
              q: "Travaillez-vous avec des startups ou uniquement des grandes entreprises ?",
              a: "Nous travaillons avec des organisations de toutes tailles — des startups ambitieuses aux grandes entreprises établies. Chaque projet est adapté à la taille, aux objectifs et au budget de nos clients.",
            },
            {
              q: "Proposez-vous des forfaits ou des tarifs personnalisés ?",
              a: "Nous proposons des solutions sur mesure adaptées à chaque projet. Après une première consultation gratuite, nous élaborons un devis détaillé correspondant à vos besoins et à votre budget.",
            },
            {
              q: "Combien de temps prend la réalisation d'un projet web ?",
              a: "La durée dépend de la complexité du projet. Un site vitrine peut être livré en 2-4 semaines, tandis qu'une application web complexe peut prendre 2-4 mois. Nous définissons ensemble un calendrier précis dès le début du projet.",
            },
          ],
        },
        {
          title: "Processus & Collaboration",
          questions: [
            {
              q: "Comment se déroule un projet avec ZENORA ?",
              a: "Notre méthode suit quatre étapes : Découverte (analyse de vos besoins), Stratégie (planification et conception), Exécution (développement et création) et Optimisation (tests, lancement et suivi). Vous êtes impliqué à chaque étape.",
            },
            {
              q: "Offrez-vous un suivi après la livraison ?",
              a: "Absolument. Nous proposons des contrats de maintenance et d'accompagnement pour assurer la pérennité de vos solutions digitales. Cela inclut les mises à jour, le support technique et l'optimisation continue.",
            },
            {
              q: "Puis-je voir des exemples de projets réalisés ?",
              a: "Oui, contactez-nous pour recevoir notre portfolio détaillé. Nous pourrons vous présenter des projets similaires au vôtre et discuter des résultats obtenus pour nos clients.",
            },
          ],
        },
        {
          title: "Paiement & Facturation",
          questions: [
            {
              q: "Quels modes de paiement acceptez-vous ?",
              a: "Nous acceptons les virements bancaires, les paiements mobile money (MTN, Orange Money) et les paiements en ligne. Un acompte de 40% est généralement demandé au démarrage du projet.",
            },
            {
              q: "Proposez-vous des facilités de paiement ?",
              a: "Oui, nous proposons des plans de paiement échelonnés pour les projets de grande envergure. Les modalités sont discutées et formalisées dans le contrat de prestation.",
            },
          ],
        },
      ]
    : [
        {
          title: "General",
          questions: [
            {
              q: "What is ZENORA?",
              a: "ZENORA is a technology company specializing in digitalization, digital structuring, and organizational visibility. We support businesses and institutions in their digital transformation across Africa and beyond.",
            },
            {
              q: "Where are you located?",
              a: "Our headquarters is based in Melen, Yaoundé, Cameroon. However, we work with clients across Africa and internationally through our digital-first approach.",
            },
            {
              q: "What are your business hours?",
              a: "Our team is available Monday to Saturday, 8am to 8pm (GMT+1). You can contact us by email, phone, or WhatsApp for a quick response.",
            },
          ],
        },
        {
          title: "Services",
          questions: [
            {
              q: "What services do you offer?",
              a: "We offer four areas of expertise: Web Development (showcase websites, e-commerce, web applications), Digital Marketing (SEO, social media, online advertising), Graphic Design (visual identity, branding, communication materials), and Business Solutions (custom software, automation, digital consulting).",
            },
            {
              q: "Do you work with startups or only large companies?",
              a: "We work with organizations of all sizes — from ambitious startups to established enterprises. Each project is tailored to the size, goals, and budget of our clients.",
            },
            {
              q: "Do you offer packages or custom pricing?",
              a: "We offer tailored solutions adapted to each project. After a free initial consultation, we prepare a detailed quote matching your needs and budget.",
            },
            {
              q: "How long does a web project take?",
              a: "Duration depends on project complexity. A showcase website can be delivered in 2-4 weeks, while a complex web application may take 2-4 months. We define a precise timeline together at the start of the project.",
            },
          ],
        },
        {
          title: "Process & Collaboration",
          questions: [
            {
              q: "How does a project with ZENORA work?",
              a: "Our method follows four steps: Discovery (analyzing your needs), Strategy (planning and design), Execution (development and creation), and Optimization (testing, launch, and monitoring). You are involved at every step.",
            },
            {
              q: "Do you offer post-delivery support?",
              a: "Absolutely. We offer maintenance and support contracts to ensure the longevity of your digital solutions. This includes updates, technical support, and continuous optimization.",
            },
            {
              q: "Can I see examples of completed projects?",
              a: "Yes, contact us to receive our detailed portfolio. We can present projects similar to yours and discuss the results achieved for our clients.",
            },
          ],
        },
        {
          title: "Payment & Billing",
          questions: [
            {
              q: "What payment methods do you accept?",
              a: "We accept bank transfers, mobile money payments (MTN, Orange Money), and online payments. A 40% deposit is generally required at project start.",
            },
            {
              q: "Do you offer payment plans?",
              a: "Yes, we offer installment payment plans for large-scale projects. The terms are discussed and formalized in the service contract.",
            },
          ],
        },
      ];

  // JSON-LD structured data for FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((cat) =>
      cat.questions.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="FAQ"
        description={
          isFr
            ? "Questions fréquemment posées sur les services et solutions de ZENORA."
            : "Frequently asked questions about ZENORA's services and solutions."
        }
      />
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                FAQ
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                {isFr ? "Questions " : "Frequently Asked "}
                <span className="text-gradient-gold">{isFr ? "Fréquentes" : "Questions"}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {isFr
                  ? "Retrouvez les réponses aux questions les plus courantes sur nos services et notre fonctionnement."
                  : "Find answers to the most common questions about our services and how we work."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="section-padding">
          <div className="container-zenora max-w-4xl">
            <div className="space-y-10">
              {categories.map((category, catIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: catIndex * 0.08 }}
                >
                  <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-primary rounded-full" />
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.questions.map((item, qIndex) => (
                      <AccordionItem
                        key={qIndex}
                        value={`${catIndex}-${qIndex}`}
                        className="border border-border rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/[0.02] transition-colors duration-300"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 p-10 rounded-2xl bg-secondary text-secondary-foreground text-center"
            >
              <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold mb-3">
                {isFr ? "Vous n'avez pas trouvé votre réponse ?" : "Didn't find your answer?"}
              </h3>
              <p className="text-secondary-foreground/70 mb-6 max-w-md mx-auto">
                {isFr
                  ? "Notre équipe est à votre disposition pour répondre à toutes vos questions."
                  : "Our team is available to answer all your questions."}
              </p>
              <Button variant="gold" size="lg" asChild>
                <Link to="/contact">
                  {isFr ? "Contactez-nous" : "Contact us"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
