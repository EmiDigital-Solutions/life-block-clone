import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const AuditDifferenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { t } = useLanguage();

  const phases = t.auditDifference.phases;

  const advanceTab = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % phases.length);
  }, [phases.length]);

  useEffect(() => {
    if (isPlaying && isInView) {
      intervalRef.current = setInterval(advanceTab, 7000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, isInView, advanceTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const active = phases[activeTab];

  return (
    <section ref={ref} data-nav-theme="light" className="py-16 md:py-24 bg-muted overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-px bg-foreground/30" />
            <span className="section-eyebrow">{t.auditDifference.eyebrow}</span>
          </div>
          <h2 className="section-headline text-foreground max-w-4xl">{t.auditDifference.headline}</h2>
          <p className="mt-4 text-lg md:text-xl text-foreground/60 max-w-3xl leading-relaxed">{t.auditDifference.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-10">
              <div className="flex gap-2 flex-1">
                {phases.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabClick(index)}
                    className={`relative flex items-center gap-3 px-5 py-3.5 transition-all duration-300 border backdrop-blur-md ${
                      activeTab === index
                        ? "bg-foreground/90 text-white border-foreground/20"
                        : "bg-white/60 text-muted-foreground hover:text-foreground hover:bg-white/80 border-white/40"
                    }`}
                  >
                    <span className={`font-mono text-xs tracking-wider ${activeTab === index ? "text-white/50" : "text-muted-foreground/40"}`}>{item.id}</span>
                    <span className="text-sm font-medium tracking-wide">{item.phase}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-muted-foreground/40 hover:text-foreground transition-colors backdrop-blur-md bg-white/60 border border-white/40"
                aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-8"
              >
                <h3 className="text-2xl md:text-3xl font-medium text-foreground leading-snug max-w-2xl">{active.title}</h3>
                <div className="space-y-5">
                  {active.points.map((point, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-px bg-primary mt-3" />
                      <p className="text-base text-foreground/70 leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} className="text-base font-medium text-foreground border-l-2 border-primary pl-5 max-w-xl">
                  {active.accent}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block sticky top-32"
          >
            <div className="relative">
              <img src={auditorEuropean} alt="Quality assurance professional conducting an Atlas AI-guided audit" className="w-full max-h-[480px] object-cover object-top" />
              <div className="absolute top-[5%] right-[4%] w-[10%] aspect-square bg-primary" />
              <div className="absolute top-[5%] right-[16%] w-[10%] aspect-square bg-primary" />
              <div className="absolute top-[17%] right-[4%] w-[10%] aspect-square bg-primary" />
              <div className="absolute bottom-[5%] right-0 w-[50%] h-[10%] bg-primary" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuditDifferenceSection;
