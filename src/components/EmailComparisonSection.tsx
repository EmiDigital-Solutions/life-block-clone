import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ROICalculator from "./ROICalculator";

const EmailComparisonSection = () => {
  const [isWithScanPro, setIsWithScanPro] = useState(false);
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);
  const [showROIModal, setShowROIModal] = useState(false);

  useEffect(() => {
    if (!isAutoSwitching) return;
    const interval = setInterval(() => setIsWithScanPro(prev => !prev), 5000);
    return () => clearInterval(interval);
  }, [isAutoSwitching]);

  const withScanProContent = [
    { title: "€700 flat—budget secured", description: "Finance approves instantly. No surprises." },
    { title: "Auditor on-site in 48h", description: "Your supplier issues don't wait—neither should you." },
    { title: "1-3 day structured audit", description: "Minimal disruption to your team and supplier." },
    { title: "Report in 24h, not weeks", description: "Make decisions while the context is fresh." },
    { title: "Every audit, same standard", description: "AI ensures consistency your QM team can trust." },
    { title: "AI equipment intelligence", description: "Machine conditions documented automatically." },
  ];

  const traditionalContent = [
    { title: "€15K-€25K per audit", description: "Budget fights, travel expenses, hotel costs." },
    { title: "2-3 weeks just to start", description: "Your quality engineer's calendar is full." },
    { title: "3-5 days on-site", description: "Your engineer away from their real work." },
    { title: "Report? Maybe in 10 days", description: "By then, everyone forgot the details." },
    { title: "Quality depends on who's sent", description: "Junior auditor today, expert tomorrow." },
    { title: "Photos? What photos?", description: "Documentation gaps that hurt you later." },
  ];

  const currentContent = isWithScanPro ? withScanProContent : traditionalContent;

  return (
    <section data-nav-theme="light" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        
        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-headline">
              <span className="text-foreground">{isWithScanPro ? 'With' : 'The Old'}</span>{" "}
              <span className={isWithScanPro ? 'text-primary' : 'text-destructive'}>
                {isWithScanPro ? 'ScanPro+' : 'Way'}
              </span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setIsAutoSwitching(false); setIsWithScanPro(!isWithScanPro); }}
              className={`relative w-16 h-8 transition-colors duration-300 ${isWithScanPro ? 'bg-primary' : 'bg-destructive'}`}
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
                isAutoSwitching ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-label={isAutoSwitching ? 'Pause auto-switch' : 'Resume auto-switch'}
            >
              {isAutoSwitching ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {isWithScanPro 
            ? "What procurement directors, quality managers, and CFOs see when they switch."
            : "The hidden cost of 'we've always done it this way.'"}
        </p>

        <motion.div
          key={isWithScanPro ? 'with' : 'traditional'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {currentContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-muted p-10 hover:bg-muted/80 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ROI Calculator Modal */}
      <Dialog open={showROIModal} onOpenChange={setShowROIModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Calculate Your ROI</DialogTitle>
          </DialogHeader>
          <ROICalculator />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EmailComparisonSection;
