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
    { time: "Day 1", title: "One message", description: "Tell us: supplier name, country, your requirements. Done. No emails. No time zone coordination. No department approvals. No calendar checking. Just one message." },
    { time: "Day 1", title: "Fixed transparent pricing", description: "Clear pricing. No surprise costs. No flights. No hotels. No per diems. No travel budget battles. Certified local auditor already in the supplier's region. Finance approves instantly. 60% lower cost than traditional firms." },
    { time: "Day 2", title: "Auditor ready", description: "Certified IATF/ISO auditor matched and mobilized in 3 days. No waiting for your quality team's availability. No capacity constraints. No supplier rescheduling. Professional auditor ready to deploy." },
    { time: "Day 3", title: "Senior certified auditor on-site", description: "IATF 16949 / ISO 9001 / VDA 6.3 certified professional. AI-powered documentation tools. Standardized checklists. Equipment photos. Process analysis. Compliance verification. No junior auditors. No clipboards. No guesswork." },
    { time: "Day 7", title: "Complete report delivered", description: "Comprehensive verification report. AI-standardized format. Consistent data structure. No 2–4 weeks of manual typing. No lost context. No forgotten details. Everything documented, everything traceable." },
    { time: "Day 7", title: "AI-verified documentation", description: "Equipment photos with timestamps. Process verification videos. Compliance evidence. Full traceability. Everything you need for customer audits. No gaps. No missing evidence. No incomplete notes. Complete professional documentation." },
    { time: "The Result", title: "7 days total. 60% lower cost. Local auditors, no travel.", description: "You can audit 100 suppliers in parallel. Zero unverified risk. Full visibility." },
  ];

  const nightmareContent = [
    { time: "Week 1", title: "50+ emails just to start", description: "Coordination chaos across time zones, departments, and suppliers. Quality schedules auditors. Procurement chases approvals. Supplier confirms facility access. Everyone's calendar is full." },
    { time: "Week 2–3", title: "Travel budget battle", description: "International flights. Hotels. Per diems. Two senior auditors for 10 days on-site. Finance wants justification. \"Why can't we use local contractors?\" Three weeks of approvals." },
    { time: "Week 4–6", title: "Calendar Tetris", description: "Your quality engineer's calendar is full until Q3. The supplier postpones because their production manager is on vacation. Reschedule. Repeat. Six weeks gone." },
    { time: "Week 7–8", title: "Finally on-site", description: "Junior auditor sent instead. No AI documentation. No standardized checklist. Just a clipboard and a camera. Misses critical process weaknesses." },
    { time: "Week 9", title: "Report? Maybe next week", description: "Quality team spends 2–4 weeks typing findings. No standardization. By then, everyone forgot the details. Context is gone. Procurement still waiting to onboard supplier." },
    { time: "Week 10", title: "Documentation gaps", description: "Equipment photos? What photos? Missing evidence that haunts you in customer audits. No traceability. No process verification. Just incomplete notes." },
    { time: "The Result", title: "10 weeks minimum. Expensive international travel.", description: "You can afford 10–12 audits per year. The other 90 suppliers? Unverified risk." },
  ];

  const currentContent = isWithScanPro ? withYVOOContent : nightmareContent;

  return (
    <section data-nav-theme="light" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-foreground/30" />
              <span className="section-eyebrow">
                The old way
              </span>
            </div>
            <h2 className="section-headline text-foreground font-semibold">
              {isWithScanPro ? 'With ' : 'The '}
              <span className={`font-semibold ${isWithScanPro ? 'text-foreground' : 'text-destructive'}`}>
                {isWithScanPro ? 'YVOO' : 'Nightmare'}
              </span>
            </h2>
          </motion.div>

          <div className="lg:col-span-2 lg:col-start-5 flex flex-col justify-end items-end gap-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {isWithScanPro 
                ? "Upload → 3 days → Verified. No coordination required."
                : "50+ emails. 10 weeks. €15K minimum. Sound familiar?"}
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
            const isResult = item.time === "The Result";
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
                <ul className="text-muted-foreground text-base space-y-1.5 mt-1">
                  {item.description.split('. ').filter(Boolean).map((sentence, i, arr) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`mt-2 w-1.5 h-1.5 shrink-0 ${isWithScanPro ? 'bg-secondary' : 'bg-destructive'}`} />
                      <span>{sentence.endsWith('.') ? sentence : `${sentence}.`}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
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
