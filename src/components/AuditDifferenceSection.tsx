import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import aiTabletInspection from "@/assets/ai-tablet-inspection-bw-blue.jpg";

const phases = [
  {
    id: "01",
    phase: "Before arrival",
    title: "Your auditor arrives knowing more than your own team.",
    points: [
      "Atlas AI analyzes your supplier's certifications, past audit history, industry benchmarks, and applicable standards — before anyone boards a plane.",
      "A tailored audit framework is generated: risk-weighted focus areas, equipment-specific checkpoints, and compliance gaps identified from public and proprietary data sources.",
      "Your auditor receives a structured briefing — not a generic checklist, but a precision-engineered assessment plan built for this specific supplier, this specific scope.",
    ],
    accent: "Every audit starts with more preparation than most audits ever get.",
  },
  {
    id: "02",
    phase: "On the shop floor",
    title: "Human expertise, amplified by machine precision.",
    points: [
      "Atlas AI recognizes equipment models in real time — CNC machines, CMMs, testing rigs — and cross-references calibration records, maintenance logs, and capability data automatically.",
      "Evidence photos are linked to findings the moment they're captured. No lost images. No ambiguity. Every observation is geo-tagged, timestamped, and traceable.",
      "Maturity scoring runs live against industry benchmarks. Your auditor sees exactly where this supplier stands relative to peers — not based on opinion, but on data from thousands of assessments.",
    ],
    accent: "Audit depth that would normally require a team of three, delivered by one expert with Atlas.",
  },
  {
    id: "03",
    phase: "Within 24 hours",
    title: "A complete audit intelligence package. Not a PDF.",
    points: [
      "Risk-scored findings with photo-verified evidence, supplier maturity benchmarks, and clear severity classifications — structured for immediate decision-making.",
      "A CAPA plan is generated automatically: corrective actions assigned, deadlines set, responsibilities defined. Your team doesn't interpret findings — they act on them.",
      "Follow-up tracking is built in. Automated reminders, evidence re-verification, and close-out confirmation — so no finding ever gets lost in a spreadsheet.",
    ],
    accent: "From audit to action — with full traceability, zero manual effort.",
  },
];

const AuditDifferenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceTab = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % phases.length);
  }, []);

  useEffect(() => {
    if (isPlaying && isInView) {
      intervalRef.current = setInterval(advanceTab, 7000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isInView, advanceTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const active = phases[activeTab];

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="py-16 md:py-24 bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-px bg-foreground/30" />
            <span className="section-eyebrow">
              How an Atlas audit works
            </span>
          </div>
          <h2 className="section-headline text-foreground max-w-4xl">
            Computer vision AI that sees everything
          </h2>
        </motion.div>

        {/* Two-column layout: Content + Image */}
        <div className="grid lg:grid-cols-[1fr,380px] gap-12 lg:gap-16 items-start">
          {/* Left: Tabs + Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Tab Bar — stronger visual presence */}
            <div className="flex items-center gap-1 mb-10">
              <div className="flex gap-1 flex-1">
                {phases.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabClick(index)}
                    className={`relative flex items-center gap-3 px-5 py-3.5 transition-all duration-300 ${
                      activeTab === index
                        ? "bg-foreground text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`font-mono text-xs tracking-wider ${
                      activeTab === index ? "text-white/50" : "text-muted-foreground/40"
                    }`}>
                      {item.id}
                    </span>
                    <span className="text-sm font-medium tracking-wide">
                      {item.phase}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-muted-foreground/40 hover:text-foreground transition-colors"
                aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-medium text-foreground leading-snug max-w-2xl">
                  {active.title}
                </h3>

                {/* Detail points */}
                <div className="space-y-5">
                  {active.points.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-6 h-px bg-primary mt-3" />
                      <p className="text-base text-foreground/70 leading-relaxed">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Accent line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="text-base font-medium text-foreground border-l-2 border-primary pl-5 max-w-xl"
                >
                  {active.accent}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block sticky top-32"
          >
            <img
              src={aiTabletInspection}
              alt="Auditor using AI-powered tablet for equipment inspection"
              className="w-full max-h-[480px] object-cover object-top"
            />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <Button asChild size="lg">
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="font-mono tracking-wide lowercase font-medium">see it in action</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditDifferenceSection;
