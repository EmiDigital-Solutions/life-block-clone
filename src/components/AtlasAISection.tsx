import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AtlasAIDemoAnimation from "./AtlasAIDemoAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const AtlasAISection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  return (
    <section ref={ref} data-nav-theme="light" className="relative bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-start-2 lg:col-span-5 mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">{t.atlas.eyebrow}</span>
            </div>
            <h2 className="section-headline text-foreground mb-6 whitespace-pre-line">
              {t.atlas.headline}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              {t.atlas.subtitle}
            </p>
          </motion.div>

          <div className="lg:col-start-2 lg:col-span-5 mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-12">
              {t.atlas.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="border-t-2 border-foreground/10 pt-6"
                >
                  <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-start-2 lg:col-span-5"
          >
            <div className="overflow-hidden aspect-[16/10] w-full bg-white">
              <AtlasAIDemoAnimation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AtlasAISection;
