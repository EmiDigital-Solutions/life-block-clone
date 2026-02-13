import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AtlasAISection = () => {
  return (
    <section className="relative bg-white py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="section-headline text-foreground max-w-2xl">
            YVOO Atlas AI
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl">
            Expert guidance. Every auditor.
          </p>
        </motion.div>

        {/* Minimal visualization — 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-foreground/10">
          {/* Atlas Brain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="border-b md:border-b-0 md:border-r border-foreground/10 p-8 md:p-10 group"
          >
            {/* Minimal diagram: layered knowledge bars */}
            <div className="mb-8 space-y-2">
              <div className="h-1 bg-foreground/80 w-full" />
              <div className="h-1 bg-foreground/40 w-4/5" />
              <div className="h-1 bg-foreground/20 w-3/5" />
              <div className="h-1 bg-foreground/10 w-2/5" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Atlas Brain
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Intelligent knowledge panel. Auto-generated context, verification points, and evidence checklists per question.
            </p>
          </motion.div>

          {/* Atlas Copilot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border-b md:border-b-0 md:border-r border-foreground/10 p-8 md:p-10 group"
          >
            {/* Minimal diagram: conversational flow lines */}
            <div className="mb-8 space-y-3">
              <div className="flex gap-2 items-center">
                <div className="h-3 w-3 bg-primary" />
                <div className="h-px bg-foreground/20 flex-1" />
              </div>
              <div className="flex gap-2 items-center pl-6">
                <div className="h-3 w-3 bg-foreground/30" />
                <div className="h-px bg-foreground/15 flex-1" />
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-3 w-3 bg-primary" />
                <div className="h-px bg-foreground/20 flex-1" />
              </div>
              <div className="flex gap-2 items-center pl-6">
                <div className="h-3 w-3 bg-foreground/30" />
                <div className="h-px bg-foreground/15 flex-1" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Atlas Copilot
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-guided assessment. Voice input, smart evidence capture, equipment recognition, and auto-generated findings.
            </p>
          </motion.div>

          {/* Cross-Audit Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 md:p-10 group"
          >
            {/* Minimal diagram: connected nodes */}
            <div className="mb-8 relative h-[52px]">
              <div className="absolute top-0 left-0 h-3 w-3 bg-foreground/60" />
              <div className="absolute top-0 left-[30%] h-3 w-3 bg-foreground/40" />
              <div className="absolute top-0 right-[20%] h-3 w-3 bg-foreground/20" />
              <div className="absolute top-0 left-[12%] h-px w-[18%] bg-foreground/15 translate-y-[6px]" />
              <div className="absolute top-0 left-[38%] h-px w-[22%] bg-foreground/15 translate-y-[6px]" />
              <div className="absolute bottom-0 left-[10%] h-3 w-3 bg-primary/60" />
              <div className="absolute bottom-0 left-[45%] h-3 w-3 bg-primary/40" />
              <div className="absolute bottom-0 right-[10%] h-3 w-3 bg-primary/20" />
              <div className="absolute left-[6px] top-3 h-[calc(100%-24px)] w-px bg-foreground/10" />
              <div className="absolute left-[calc(45%+6px)] top-3 h-[calc(100%-24px)] w-px bg-foreground/10" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Cross-Audit Intelligence
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pattern recognition across audits. Industry benchmarking, predictive insights, continuous learning.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <Link
            to="/features"
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
          >
            <span>Explore all features</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AtlasAISection;
