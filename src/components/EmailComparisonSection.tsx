import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmailComparisonSection = () => {
  const [isWithScanPro, setIsWithScanPro] = useState(false);
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);

  useEffect(() => {
    if (!isAutoSwitching) return;
    const interval = setInterval(() => {
      setIsWithScanPro(prev => !prev);
    }, 5000);
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
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-headline">
              <span className="text-foreground">{isWithScanPro ? 'With' : 'Traditional'}</span>{" "}
              <span className={isWithScanPro ? 'text-primary' : 'text-destructive'}>
                {isWithScanPro ? 'ScanPro+' : 'Providers'}
              </span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-3">
            {/* Toggle Switch */}
            <button
              onClick={() => {
                setIsAutoSwitching(false);
                setIsWithScanPro(!isWithScanPro);
              }}
              className={`relative w-16 h-8 transition-colors duration-300 ${
                isWithScanPro ? 'bg-primary' : 'bg-destructive'
              }`}
              aria-label="Toggle comparison"
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-7 h-7 bg-white"
                animate={{ x: isWithScanPro ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoSwitching(!isAutoSwitching)}
              className={`w-8 h-8 flex items-center justify-center transition-colors duration-300 ${
                isAutoSwitching 
                  ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-label={isAutoSwitching ? 'Pause auto-switch' : 'Resume auto-switch'}
            >
              {isAutoSwitching ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {isWithScanPro 
            ? "What procurement directors, quality managers, and CFOs see when they switch."
            : "The hidden cost of 'we've always done it this way.'"}
        </p>

        {/* Grid */}
        <motion.div
          key={isWithScanPro ? 'with' : 'traditional'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {currentContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#ebebeb] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1a1a1a] p-12 md:p-16 lg:p-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Experience the €700 Difference
          </h2>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 h-auto"
              onClick={() => window.open("https://calendly.com/yvoo", "_blank")}
            >
              Claim Your Free Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <p className="text-white/60 text-sm mt-6 max-w-lg mx-auto">
            Limited: First 10 customers get complete supplier audit free + money-back guarantee. 6 spots remaining.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailComparisonSection;
