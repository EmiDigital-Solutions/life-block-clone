import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <>
    <section ref={ref} className="py-24 lg:py-32 bg-white overflow-hidden">
       <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">{t.howItWorks.eyebrow}</span>
            </div>
            <h2 className="section-headline text-foreground">
              {t.howItWorks.headline1}<br />{t.howItWorks.headline2}
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 lg:col-start-5 flex flex-col justify-end"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">{t.howItWorks.subtitle}</p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-border" />
          <div className="flex flex-col md:flex-row">
            {t.howItWorks.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative border-b md:border-b-0 md:border-r border-border last:border-r-0 cursor-pointer transition-all duration-500 ease-out ${
                  hoveredIndex === index ? 'md:flex-[2.5]' : hoveredIndex !== null ? 'md:flex-[0.8]' : 'md:flex-1'
                }`}
              >
                <div className="py-10 md:py-16 px-6 md:px-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-auto">
                    <span className={`text-6xl md:text-7xl font-extralight transition-all duration-300 ${hoveredIndex === index ? 'text-foreground' : 'text-foreground/40'}`}>
                      {step.number}
                    </span>
                  </div>
                  <div className="mt-12 md:mt-20">
                    <span className={`text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${hoveredIndex === index ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                      {step.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-medium text-foreground mt-2 mb-4">{step.title}</h3>
                    <motion.p
                      initial={false}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0, height: hoveredIndex === index ? 'auto' : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg text-muted-foreground leading-relaxed overflow-hidden"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-500 ${hoveredIndex === index ? 'w-full' : 'w-0'}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default HowItWorksSection;
