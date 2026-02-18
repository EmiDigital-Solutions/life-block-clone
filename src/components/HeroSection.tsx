import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ROICalculator from "./ROICalculator";
import HeroSquaresAnimation from "./HeroSquaresAnimation";

const marqueeItems = [
  "Built for high‑performance B2B Supply Chains",
  "Automotive",
  "Aerospace",
  "Medical Devices",
  "Pharma",
  "Electronics",
  "Energy",
  "Chemical",
  "Industrial Manufacturing",
  "Precision Engineering",
  "Defense",
  "Rail & Transport",
];

const HeroSection = () => {
  const [showROIModal, setShowROIModal] = useState(false);

  return (
    <>
    <section
      data-nav-theme="light"
      className="relative min-h-[100dvh] flex flex-col bg-white"
    >
      <HeroSquaresAnimation className="top-[100px] right-8 md:top-[91px] md:right-20 lg:top-[103px] lg:right-24" />
      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10 pt-[106px] md:pt-[154px] lg:pt-[186px] min-h-0">
        <div className="px-8 w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm md:text-base text-foreground/50 font-mono tracking-wide mb-4 md:mb-6"
              >
                On-demand supplier verification
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground"
              >
                On-site supplier<br />
                audits in days, not weeks
              </motion.h1>
            </motion.div>

            {/* Right: Value Props + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:pt-8"
            >
              <div className="space-y-0 mb-8">
                {[
                  { lead: "72-hour mobilization", detail: "Any country, any industry" },
                  { lead: "From €700 per audit", detail: "Not €15,000–25,000" },
                  { lead: "New supplier base in weeks", detail: "Enter new markets, qualify 100+ suppliers in parallel" },
                  { lead: "Your standards, AI-enhanced", detail: "We audit using your templates, elevated with AI" },
                  { lead: "Maximum objectivity", detail: "AI-guided execution eliminates bias" },
                  { lead: "On-site verified intelligence", detail: "Real supplier data, not questionnaires" },
                  { lead: "Automated follow-up & close-out", detail: "No finding ever dies in a spreadsheet" },
                ].map((item, i) => (
                  <div key={i} className="border-t border-foreground/10 py-3 md:py-4">
                    <p className="text-sm md:text-base font-semibold text-foreground leading-snug">{item.lead}</p>
                    <p className="text-xs md:text-sm text-foreground/50 mt-0.5">{item.detail}</p>
                  </div>
                ))}
                <div className="border-t border-foreground/10" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto text-lg" onClick={() => {
                  const demoSection = document.getElementById('platform-demo');
                  if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
                }}>
                  See Platform Demo →
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg" onClick={() => setShowROIModal(true)}>
                  Calculate Your Savings →
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scrolling Industry Band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 border-t border-foreground/10 overflow-hidden py-3 md:py-5 shrink-0"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`mx-4 md:mx-10 text-xs md:text-base tracking-widest uppercase ${
                item.startsWith("Built")
                  ? "font-bold text-foreground"
                  : "font-bold text-foreground/80"
              }`}
            >
              {item}
              <span className="ml-6 md:ml-10 text-foreground/20">·</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>

    {/* ROI Calculator Modal */}
    <Dialog open={showROIModal} onOpenChange={setShowROIModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Calculate Your ROI</DialogTitle>
        </DialogHeader>
        <ROICalculator />
      </DialogContent>
    </Dialog>
    </>
  );
};

export default HeroSection;
