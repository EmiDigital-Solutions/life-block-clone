import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ROICalculator from "./ROICalculator";
import { useLanguage } from "@/contexts/LanguageContext";

const EmailComparisonSection = () => {
  const [isWithScanPro, setIsWithScanPro] = useState(false);
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);
  const [showROIModal, setShowROIModal] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isAutoSwitching) return;
    const interval = setInterval(() => setIsWithScanPro(prev => !prev), 5000);
    return () => clearInterval(interval);
  }, [isAutoSwitching]);

  const currentContent = isWithScanPro ? t.emailComparison.withContent : t.emailComparison.nightmareContent;

  return (
    <section data-nav-theme="light" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-foreground/30" />
              <span className="section-eyebrow">{t.emailComparison.eyebrow}</span>
            </div>
            <h2 className="section-headline text-foreground font-semibold">
              {isWithScanPro ? t.emailComparison.withRCA : t.emailComparison.theTraditional}
              <span className={`font-semibold ${isWithScanPro ? 'text-foreground' : 'text-destructive'}`}>
                 {isWithScanPro ? t.emailComparison.rcaLabel : t.emailComparison.traditionalLabel}
               </span>
            </h2>
          </motion.div>

          <div className="lg:col-span-2 lg:col-start-5 flex flex-col justify-end items-end gap-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isWithScanPro ? t.emailComparison.withSubtitle : t.emailComparison.traditionalSubtitle}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setIsAutoSwitching(false); setIsWithScanPro(!isWithScanPro); }}
                className={`relative w-16 h-8 transition-colors duration-300 ${isWithScanPro ? 'bg-secondary' : 'bg-destructive'}`}
                aria-label="Toggle comparison"
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 w-7 h-7 bg-white"
                  animate={{ x: isWithScanPro ? 32 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              <button
                onClick={() => setIsAutoSwitching(!isAutoSwitching)}
                className={`w-8 h-8 flex items-center justify-center transition-colors duration-300 ${
                  isAutoSwitching ? 'bg-foreground/10 text-foreground hover:bg-foreground/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                aria-label={isAutoSwitching ? 'Pause auto-switch' : 'Resume auto-switch'}
              >
                {isAutoSwitching ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            </div>
          </div>
        </div>

        <motion.div
          key={isWithScanPro ? 'with' : 'traditional'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {currentContent.map((item, index) => {
            const isResult = item.time === "The Result" || item.time === "Результат";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-10 transition-colors duration-300 ${
                  isResult
                    ? `md:col-span-2 lg:col-span-3 border ${isWithScanPro ? 'bg-secondary/5 border-secondary/10' : 'bg-destructive/5 border-destructive/10'}`
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <span className={`text-sm font-medium tracking-[0.15em] uppercase mb-3 block ${
                  isResult && isWithScanPro ? 'text-secondary' : isWithScanPro ? 'text-foreground/50' : 'text-destructive'
                }`}>
                  {item.time}
                </span>
                <h3 className={`font-semibold text-foreground mb-3 ${isResult ? 'text-xl md:text-2xl' : 'text-xl'}`}>{item.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {item.description.split('. ').filter(Boolean).map((sentence, i) => (
                    <span key={i}>{i > 0 && ' · '}{sentence.endsWith('.') ? sentence.slice(0, -1) : sentence}</span>
                  ))}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Dialog open={showROIModal} onOpenChange={setShowROIModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{t.hero.roiTitle}</DialogTitle>
          </DialogHeader>
          <ROICalculator />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EmailComparisonSection;
