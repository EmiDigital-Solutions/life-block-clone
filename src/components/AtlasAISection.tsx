import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Row 1: Headline starting at 2nd grid line, spanning 2 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 mb-8">
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-headline text-foreground"
            >
              Meet Atlas, the AI engine for auditing
            </motion.h2>
          </div>
        </div>

        {/* Row 2: Description + CTA at 2nd grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 mb-10">
          <div className="hidden lg:block lg:col-span-1" />
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              Atlas transforms every auditor into an expert. It understands standards, learns from patterns, and guides assessments in real time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Link
                to="/features"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-mono text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                explore atlas ai
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Row 3: Demo video (smaller, at 2nd grid) + Accordion on right */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          <div className="hidden lg:block lg:col-span-1" />

          {/* Demo video — 2 cols, reduced size */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full aspect-[4/3] overflow-hidden"
            >
              <AtlasAIDemoAnimation />
            </motion.div>
          </div>

          {/* Accordion features — right of demo, 3 cols */}
          <div className="lg:col-span-3 lg:pl-8 mt-8 lg:mt-0">
            <div className="border-t border-foreground/10">
              {atlasFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-b border-foreground/10"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                  >
                    <span className={`text-base font-medium transition-colors ${
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
                        <p className="text-sm text-muted-foreground leading-relaxed pb-4 max-w-sm">
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
    </section>
  );
};

export default AtlasAISection;
