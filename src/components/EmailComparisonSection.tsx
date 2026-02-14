import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

const nightmareContent = [
  { week: "Week 1–2", title: "Budget approval battles", description: "Three rounds of sign-offs. Finance wants quotes. Procurement wants justification." },
  { week: "Week 3–4", title: "Find an available auditor", description: "Your quality engineer is booked. External firms need 4-week lead time." },
  { week: "Week 5", title: "Coordinate with supplier", description: "Back-and-forth emails. Time zones. Production schedules. Someone's on vacation." },
  { week: "Week 6", title: "Book flights and hotels", description: "Travel policy reviews. Expense pre-approvals. All for one factory visit." },
  { week: "Week 7–8", title: "Travel, conduct the audit", description: "Your engineer away from their real work. Jet-lagged. One auditor with a clipboard." },
  { week: "Week 9–10", title: "Wait for the report", description: "By now everyone forgot the details. Inconsistent, incomplete, too late to act on." },
];

const yvooContent = [
  { week: "Minute 1", title: "Upload your supplier list", description: "CSV, ERP export, or just type a name. No budget approval needed at €700." },
  { week: "Hour 1", title: "AI matches local auditor", description: "Atlas finds the best certified auditor already near your supplier. No flights." },
  { week: "Day 1", title: "Auditor on-site", description: "On the factory floor within 48 hours. No calendar Tetris. No coordination." },
  { week: "Day 2–3", title: "AI-guided audit", description: "Atlas AI standardizes every check. Computer vision documents equipment conditions." },
  { week: "Day 3", title: "Verified report delivered", description: "AI-standardized findings, evidence photos, equipment analysis. While context is fresh." },
  { week: "Done", title: "€700. Zero emails sent.", description: "No travel, no coordination, no politics. Click 'Next supplier' and repeat." },
];

const EmailComparisonSection = () => {
  const [isYvoo, setIsYvoo] = useState(false);
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);

  useEffect(() => {
    if (!isAutoSwitching) return;
    const interval = setInterval(() => setIsYvoo(prev => !prev), 5000);
    return () => clearInterval(interval);
  }, [isAutoSwitching]);

  const currentContent = isYvoo ? yvooContent : nightmareContent;

  return (
    <section data-nav-theme="light" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">

        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-headline">
              <span className="text-foreground">{isYvoo ? 'With' : 'The'}</span>{" "}
              <span className={isYvoo ? 'text-primary' : 'text-destructive'}>
                {isYvoo ? 'YVOO' : 'Nightmare'}
              </span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setIsAutoSwitching(false); setIsYvoo(!isYvoo); }}
              className={`relative w-16 h-8 transition-colors duration-300 ${isYvoo ? 'bg-primary' : 'bg-destructive'}`}
              aria-label="Toggle comparison"
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-7 h-7 bg-white"
                animate={{ x: isYvoo ? 32 : 0 }}
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
          {isYvoo
            ? "Upload → 3 days → Verified. No coordination required."
            : "10 weeks. 50+ emails. €13,000 all-in. And that's if nothing goes wrong."}
        </p>

        <motion.div
          key={isYvoo ? 'yvoo' : 'nightmare'}
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
              className="bg-muted p-8 md:p-10"
            >
              <p className={`text-xs font-mono tracking-widest uppercase mb-3 ${isYvoo ? 'text-primary' : 'text-destructive/70'}`}>
                {item.week}
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EmailComparisonSection;
