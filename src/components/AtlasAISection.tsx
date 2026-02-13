import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const atlasFeatures = [
  {
    title: "Atlas Brain",
    description: "Auto-generated audit context per question. Client-specific priorities, standard requirements, verification points, best practices, common issues, and evidence checklists — all in real time."
  },
  {
    title: "Atlas Copilot",
    description: "Conversational audit execution with voice input, smart evidence requests, equipment photo recognition, AI-generated findings, and maturity level recommendations."
  },
  {
    title: "Cross-Audit Intelligence",
    description: "Pattern recognition from historical audits. Industry benchmarking, predictive insights, and continuous learning from every completed assessment."
  },
  {
    title: "Evidence Analysis",
    description: "Automatic evidence categorization, relevance scoring, document data extraction, and AI-powered acceptance recommendations."
  }
];

const AtlasAISection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-white py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left column — headline, description, CTA, visual */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-primary tracking-[-0.03em] leading-[0.95] mb-6"
            >
              Meet Atlas, the AI
              <br />
              engine for auditing
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground leading-relaxed mb-8 max-w-md"
            >
              Atlas transforms every auditor into an expert. It understands standards, learns from patterns, and guides assessments in real time — so your team delivers consistent, high-quality audits every time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-10"
            >
              <Link
                to="/features"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-mono text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Explore Atlas AI
              </Link>
            </motion.div>

            {/* Minimal visual — three-panel mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[hsl(0,0%,93%)] aspect-[4/3] relative overflow-hidden"
            >
              {/* Simplified three-panel layout sketch */}
              <div className="absolute inset-4 flex gap-[2px]">
                {/* Left panel */}
                <div className="w-[22%] bg-[hsl(0,0%,96%)] p-3 flex flex-col gap-2">
                  <div className="h-2 w-16 bg-foreground/20" />
                  <div className="h-1.5 w-12 bg-foreground/10" />
                  <div className="mt-2 space-y-1.5">
                    <div className="h-1.5 w-full bg-foreground/8" />
                    <div className="h-1.5 w-4/5 bg-primary/20" />
                    <div className="h-1.5 w-full bg-foreground/8" />
                    <div className="h-1.5 w-3/4 bg-foreground/8" />
                    <div className="h-1.5 w-full bg-foreground/8" />
                  </div>
                  <div className="mt-auto">
                    <div className="h-1 w-8 bg-primary/30" />
                  </div>
                </div>

                {/* Middle panel */}
                <div className="flex-1 bg-white p-4 flex flex-col gap-2">
                  <div className="h-2.5 w-32 bg-foreground/15" />
                  <div className="h-1.5 w-24 bg-foreground/8" />
                  <div className="mt-2 p-2 bg-primary/5 border-l-2 border-primary/30">
                    <div className="h-1.5 w-20 bg-primary/20 mb-1" />
                    <div className="h-1 w-full bg-foreground/6" />
                    <div className="h-1 w-4/5 bg-foreground/6 mt-0.5" />
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 w-24 bg-foreground/12" />
                    <div className="h-1 w-full bg-foreground/5" />
                    <div className="h-1 w-full bg-foreground/5" />
                    <div className="h-1 w-3/4 bg-foreground/5" />
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 w-20 bg-foreground/12" />
                    <div className="h-1 w-full bg-foreground/5" />
                    <div className="h-1 w-full bg-foreground/5" />
                  </div>
                </div>

                {/* Right panel */}
                <div className="w-[24%] bg-[hsl(0,0%,96%)] p-3 flex flex-col gap-2">
                  <div className="h-2 w-14 bg-foreground/15" />
                  <div className="space-y-1.5 mt-1">
                    <div className="h-1 w-full bg-foreground/8" />
                    <div className="h-1 w-3/4 bg-foreground/8" />
                  </div>
                  <div className="mt-2">
                    <div className="h-1.5 w-12 bg-primary/25" />
                    <div className="h-1 w-full bg-foreground/6 mt-1" />
                    <div className="h-1 w-4/5 bg-foreground/6 mt-0.5" />
                  </div>
                  <div className="mt-2">
                    <div className="h-1.5 w-10 bg-foreground/12" />
                    <div className="h-1 w-full bg-foreground/6 mt-1" />
                  </div>
                  <div className="mt-auto">
                    <div className="h-1.5 w-14 bg-[#3DC88E]/30" />
                    <div className="h-1 w-10 bg-foreground/6 mt-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column — accordion features */}
          <div className="flex flex-col justify-end">
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
                    className="w-full flex items-center justify-between py-5 text-left group"
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
                        <p className="text-sm text-muted-foreground leading-relaxed pb-5 max-w-md">
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
