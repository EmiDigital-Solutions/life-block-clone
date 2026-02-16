import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="relative bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-0">
          {/* Header — 5 columns (line 2–7), offset 1 from left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-start-2 lg:col-span-5 mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">
                Technology
              </span>
            </div>
            <h2 className="section-headline text-foreground mb-6 whitespace-nowrap">
              Atlas: The AI that ensures audit quality
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              Atlas transforms every auditor into an expert. It understands standards, learns from patterns, and guides assessments in real time.
            </p>
            <Link
              to="/features"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white py-4 font-mono text-base font-medium hover:bg-primary/90 transition-colors tracking-wide lowercase w-[calc(100%/5)]"
            >
              explore atlas ai
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Features — 5 columns (line 1–6), 4 items inside */}
          <div className="lg:col-start-2 lg:col-span-5 mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-16 gap-y-12">
              {atlasFeatures.map((feature, index) => (
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

          {/* Demo — 5 columns (line 1–6) */}
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
