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

  const withYVOOContent = [
    { time: "Minute 1", title: "Upload your supplier list", description: "CSV, ERP export, or just type a name. No budget approval needed at €700." },
    { time: "Hour 1", title: "AI matches local auditor", description: "Atlas finds the best certified auditor already near your supplier. No flights." },
    { time: "Day 1", title: "Auditor on-site", description: "On the factory floor within 48 hours. No calendar Tetris. No coordination." },
    { time: "Day 2–3", title: "AI-guided audit", description: "Atlas AI standardizes every check. Computer vision documents equipment conditions." },
    { time: "Day 3", title: "Verified report delivered", description: "AI-standardized findings, evidence photos, equipment analysis. While context is fresh." },
    { time: "Done", title: "€700. Zero emails sent.", description: "No travel, no coordination, no politics. Click 'Next supplier' and repeat." },
  ];

  const nightmareContent = [
    { time: "Week 1", title: "50+ emails just to start", description: "Coordination chaos across time zones, departments, and suppliers." },
    { time: "Week 2–3", title: "€15K–€25K budget fight", description: "Flights, hotels, per diems. Finance wants justification. Again." },
    { time: "Week 4–6", title: "Calendar Tetris", description: "Your engineer's calendar is full. The supplier postpones. Repeat." },
    { time: "Week 7–8", title: "Finally on-site", description: "Junior auditor sent instead. No AI, no standards. Just a clipboard." },
    { time: "Week 9", title: "Report? Maybe next week", description: "By then, everyone forgot the details. Context is gone." },
    { time: "Week 10", title: "Documentation gaps", description: "Photos? What photos? Missing evidence that haunts you in customer audits." },
  ];

  const currentContent = isWithScanPro ? withYVOOContent : nightmareContent;

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
              <span className="text-foreground">{isWithScanPro ? 'With' : 'The'}</span>{" "}
              <span className={isWithScanPro ? 'text-primary' : 'text-destructive'}>
                {isWithScanPro ? 'YVOO' : 'Nightmare'}
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
            ? "Upload → 3 days → Verified. No coordination required."
            : "50+ emails. 10 weeks. €15K minimum. Sound familiar?"}
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
              <span className={`text-sm font-medium tracking-[0.15em] uppercase mb-3 block ${
                isWithScanPro ? 'text-primary' : 'text-destructive'
              }`}>
                {item.time}
              </span>
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
