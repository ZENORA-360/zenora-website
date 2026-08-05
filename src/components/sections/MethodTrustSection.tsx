import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { methodTrustKeys } from "@/data/method-page";

export const MethodTrustSection = () => {
  const refTrust = useRef(null);
  const isTrustInView = useInView(refTrust, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const trustPoints = methodTrustKeys.map((key) => t(key));

  return (
    <section className="section-padding bg-background" ref={refTrust}>
      <div className="container-zenora">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isTrustInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-gradient-gold rounded-lg p-8 md:p-12 shadow-elegant"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-8 text-center">
            {t("method.trust.title")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isTrustInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-5 text-center"
              >
                <CheckCircle2 className="w-8 h-8 text-primary-foreground mx-auto mb-3" />
                <p className="text-primary-foreground font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
