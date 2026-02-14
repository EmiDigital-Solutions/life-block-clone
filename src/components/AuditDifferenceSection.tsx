import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import auditorTimelineHero from "@/assets/auditor-timeline-hero.png";

const timeline = [
  {
    day: "Day 1",
    label: "Scoping",
    title: "Your audit is scoped by intelligence, not guesswork",
    oldWay: "Call agencies. Wait for quotes. Hope the auditor understands your industry. No context, no preparation — just a generic checklist.",
    newWay: "Atlas AI builds a tailored audit framework from your supplier's profile, industry risks, and applicable standards. Your auditor arrives with deep context — knowing exactly what to verify, what to challenge, and where risks hide.",
    highlight: "AI-prepared, industry-specific scope",
  },
  {
    day: "Day 2",
    label: "Execution",
    title: "Auditor + Atlas AI: precision on the shop floor",
    oldWay: "One person with a clipboard and subjective judgment. Photos lost on a phone. Findings written from memory hours later. No standardization, no traceability.",
    newWay: "Your auditor works hand-in-hand with Atlas AI — equipment is auto-recognized, evidence photos are linked to findings in real time, maturity scores are benchmarked against industry data. Every observation is structured, traceable, and verified on the spot. Human expertise amplified by machine precision.",
    highlight: "Expert judgment + AI verification, together",
  },
  {
    day: "Day 3",
    label: "Intelligence",
    title: "Verified intelligence, not a PDF. Plus CAPA tracking built in.",
    oldWay: "Wait 6–10 weeks for a subjective PDF. No risk scores, no benchmarks, no corrective action plan. Import manually into your QMS. Then start guessing what to do next.",
    newWay: "Within 24 hours: a complete audit intelligence package — risk-scored findings, photo-verified evidence, supplier maturity benchmarks, and a structured CAPA plan with assigned actions, deadlines, and automatic follow-up tracking. Your team sees verified data, makes confident decisions, and tracks corrective actions to closure — all in one place.",
    highlight: "From audit to action — in 24 hours",
  },
];

const StickyVisual = ({ isInView }: { isInView: boolean }) => {
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.98]);

  return (
    <motion.div
      ref={imageRef}
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="hidden lg:block sticky top-32"
    >
      <div className="relative">
        <motion.div className="relative overflow-hidden" style={{ y, scale }}>
          <img
            src={auditorTimelineHero}
            alt="Quality assurance professional with AI technology"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </motion.div>

        {/* Corner accents — squared style */}
        <motion.div
          className="absolute -top-3 -right-3 w-20 h-20 border-2 border-primary/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-3 -left-3 w-14 h-14 bg-primary/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const AuditDifferenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceTab = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % timeline.length);
  }, []);

  useEffect(() => {
    if (isPlaying && isInView) {
      intervalRef.current = setInterval(advanceTab, 5000);
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

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="py-10 md:py-14 bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-8 md:mb-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-primary" />
            <span className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              The Difference
            </span>
          </div>
          <h2 className="section-headline text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] tracking-tight max-w-4xl">
            Auditors with Clipboard vs.<br />
            <span className="font-medium">Auditors + YVOO Atlas AI</span>
          </h2>
        </motion.div>

        {/* Content Grid: Tabs + Image */}
        <div className="grid lg:grid-cols-[1fr,380px] gap-12 lg:gap-16 items-start">
          {/* Tabs — Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Tab Headers */}
            <div className="flex items-center gap-2 mb-8 border-b border-border">
              <div className="flex gap-2 flex-1">
                {timeline.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabClick(index)}
                    className={`relative flex items-center gap-3 px-5 py-4 text-left transition-colors duration-300 ${
                      activeTab === index
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground/70"
                    }`}
                  >
                    <span className={`text-xs font-bold tracking-wider uppercase ${
                      activeTab === index ? "text-primary" : "text-muted-foreground/60"
                    }`}>
                      {item.day}
                    </span>
                    <span className="hidden sm:inline text-sm font-medium">
                      {item.label}
                    </span>
                    {activeTab === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
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
              >
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-medium text-foreground leading-tight">
                    {timeline[activeTab].title}
                  </h3>
                  <div className="mt-2 inline-block px-3 py-1 bg-primary/5 border border-primary/10">
                    <span className="text-xs font-semibold text-primary tracking-wide">
                      {timeline[activeTab].highlight}
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Old Way */}
                  <div className="flex items-start gap-4 p-5 bg-muted/30 border border-border/50">
                    <div className="flex-shrink-0 w-7 h-7 bg-muted flex items-center justify-center mt-0.5">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2 block">
                        Traditional Audit
                      </span>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {timeline[activeTab].oldWay}
                      </p>
                    </div>
                  </div>

                  {/* New Way */}
                  <div className="flex items-start gap-4 p-5 bg-primary/[0.03] border border-primary/10">
                    <div className="flex-shrink-0 w-7 h-7 bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary tracking-wider uppercase mb-2 block">
                        With YVOO Atlas AI
                      </span>
                      <p className="text-foreground text-base leading-relaxed font-medium">
                        {timeline[activeTab].newWay}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Image — Right Side */}
          <StickyVisual isInView={isInView} />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <Button asChild size="lg">
            <a
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
            >
              See the difference live
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditDifferenceSection;
