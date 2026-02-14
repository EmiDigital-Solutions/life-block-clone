import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import AtlasAIDemoAnimation from "./AtlasAIDemoAnimation";

const AtlasAISection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="relative bg-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header — same pattern as Auditors technology section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12 md:mb-20"
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

        {/* Demo — 4 grid columns wide (4/6 of container) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full lg:w-[66.666%]"
        >
          <div className="overflow-hidden aspect-[16/10] w-full bg-white p-4 md:p-6">
            <AtlasAIDemoAnimation />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AtlasAISection;
