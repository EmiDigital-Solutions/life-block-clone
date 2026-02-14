import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
    newWay: "Your auditor works hand-in-hand with Atlas AI — equipment is auto-recognized, evidence photos are linked to findings in real time, maturity scores are benchmarked against industry data. Every observation is structured, traceable, and verified on the spot.",
    highlight: "Expert judgment + AI verification, together",
  },
  {
    day: "Day 3",
    label: "Intelligence",
    title: "Verified intelligence, not a PDF. Plus CAPA tracking built in.",
    oldWay: "Wait 6–10 weeks for a subjective PDF. No risk scores, no benchmarks, no corrective action plan. Import manually into your QMS. Then start guessing what to do next.",
    newWay: "Within 24 hours: a complete audit intelligence package — risk-scored findings, photo-verified evidence, supplier maturity benchmarks, and a structured CAPA plan with assigned actions, deadlines, and automatic follow-up tracking.",
    highlight: "From audit to action — in 24 hours",
  },
];

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

  const active = timeline[activeTab];

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
            <div className="w-16 h-px bg-primary" />
            <span className="section-eyebrow">
              the difference
            </span>
          </div>
          <h2 className="section-headline text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] tracking-tight max-w-3xl">
            Clipboard vs.{" "}
            <span className="font-medium">Atlas AI</span>
          </h2>
        </motion.div>

        {/* Two-column layout: Tabs + Image */}
        <div className="grid lg:grid-cols-[1fr,340px] gap-12 lg:gap-16 items-start">
          {/* Left: Tabs + Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Tab Bar */}
            <div className="flex items-center border-b border-border mb-8">
              <div className="flex flex-1">
                {timeline.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabClick(index)}
                    className={`relative px-5 py-3.5 transition-colors duration-200 ${
                      activeTab === index
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground/70"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium tracking-wide ${
                        activeTab === index ? "text-primary" : "text-muted-foreground/50"
                      }`}>
                        {item.day}
                      </span>
                      <span className="hidden sm:inline text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                    {activeTab === index && (
                      <motion.div
                        layoutId="auditTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-muted-foreground/50 hover:text-foreground transition-colors"
                aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Title + Highlight */}
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-foreground leading-snug mb-2">
                    {active.title}
                  </h3>
                  <span className="section-eyebrow-primary">
                    {active.highlight}
                  </span>
                </div>

                {/* Old vs New — equal height cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Old Way */}
                  <div className="p-5 bg-muted/30 border border-border/50 flex flex-col">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-5 h-5 bg-muted flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                        Traditional
                      </span>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed flex-1">
                      {active.oldWay}
                    </p>
                  </div>

                  {/* New Way */}
                  <div className="p-5 bg-primary/[0.03] border border-primary/10 flex flex-col">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-5 h-5 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium tracking-wider text-primary uppercase">
                        With Atlas AI
                      </span>
                    </div>
                    <p className="text-base text-foreground leading-relaxed font-medium flex-1">
                      {active.newWay}
                    </p>
                  </div>
                </div>
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
            <div className="relative">
              <img
                src={auditorTimelineHero}
                alt="Quality assurance professional with AI technology"
                className="w-full max-h-[380px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-transparent" />
            </div>
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
              <span className="font-mono tracking-wide lowercase font-medium">see the difference live</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditDifferenceSection;
