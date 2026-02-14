import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import AtlasAIDemoAnimation from "./AtlasAIDemoAnimation";

const atlasFeatures = [
  {
    title: "Atlas Brain",
    description: "Auto-generated audit context per question. Client-specific priorities, standard requirements, verification points, and evidence checklists — all in real time."
  },
  {
    title: "Atlas Copilot",
    description: "Conversational audit execution with voice input, smart evidence requests, equipment photo recognition, and AI-generated findings."
  },
  {
    title: "Cross-Audit Intelligence",
    description: "Pattern recognition from historical audits. Industry benchmarking, predictive insights, and continuous learning."
  },
  {
    title: "Evidence Analysis",
    description: "Automatic evidence categorization, relevance scoring, and AI-powered acceptance recommendations."
  }
];

const AtlasAISection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="relative bg-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          {/* 2-column offset */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Content — spans 4 columns */}
          <div className="lg:col-span-4">
            {/* Header — Auditors page pattern: line + label + headline + subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mb-12 md:mb-16"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-foreground" />
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  Technology
                </span>
              </div>
              <h2 className="section-headline text-foreground mb-6">
                Meet Atlas, the AI engine for auditing
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mb-8">
                Atlas transforms every auditor into an expert. It understands standards, learns from patterns, and guides assessments in real time.
              </p>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-mono text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                explore atlas ai
              </Link>
            </motion.div>

            {/* Feature accordion */}
            <div className="mb-10">
              <div className="border-t border-foreground/10">
                {atlasFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-foreground/10"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                      className="w-full flex items-center justify-between py-4 text-left group"
                    >
                      <span className={`text-lg font-medium transition-colors ${
                        openIndex === index ? "text-foreground" : "text-foreground/60"
                      } group-hover:text-foreground`}>
                        {feature.title}
                      </span>
                      {openIndex === index ? (
                        <ChevronUp className="w-4 h-4 text-foreground/40 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-foreground/40 shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-base text-muted-foreground leading-relaxed pb-4 max-w-lg">
                            {feature.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Demo — 4 columns wide, offset by 2 (grid lines 3–6) */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 mt-10">
          <div className="hidden lg:block lg:col-span-2" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="overflow-hidden aspect-[16/10] w-full bg-white p-4 md:p-6">
              <AtlasAIDemoAnimation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AtlasAISection;
