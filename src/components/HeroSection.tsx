import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ROICalculator from "./ROICalculator";
import HeroSquaresAnimation from "./HeroSquaresAnimation";

const marqueeItems = [
  { label: "LNG Liquefaction", standard: "API 620" },
  { label: "Gas Processing", standard: "ASME B31.3" },
  { label: "Cryogenic Systems", standard: "EN 13445" },
  { label: "Pressure Vessels", standard: "ASME Sec VIII" },
  { label: "Rotating Equipment", standard: "API 617/618" },
  { label: "Storage Tanks", standard: "API 650" },
  { label: "Piping Systems", standard: "ASME B31.3" },
  { label: "Fire & Gas", standard: "IEC 61511" },
  { label: "Electrical", standard: "IECEx/ATEX" },
  { label: "Coatings", standard: "NACE/ISO 12944" },
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm md:text-base text-foreground/50 font-mono tracking-[0.25em] uppercase mb-4 md:mb-6"
            >
              Search · Qualify · Audit · Report · Improve — one platform
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
            >
               From supplier search<br />
               to verified quality
            </motion.h1>

            {/* Value Props + CTAs - snapped to 4th grid line (50%) */}
            <div className="mt-8 md:mt-12 lg:mt-16 ml-[50%] relative">
              {/* DIN label above the dimension line */}
              <span className="absolute -left-14 -top-6 font-mono text-[9px] tracking-[0.2em] text-foreground/[0.12] select-none" aria-hidden="true">
                DIN EN ISO
              </span>

              {/* Surface roughness symbol (Ra) */}
              <div className="absolute -right-4 md:right-0 -top-8 text-foreground/[0.12]" aria-hidden="true">
                <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
                  <path d="M0 24 L6 24 L10 8 L14 24 L18 24" stroke="currentColor" strokeWidth="0.8" fill="none" />
                  <line x1="6" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="0.5" />
                  <text x="20" y="18" fill="currentColor" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">Ra 1.6</text>
                </svg>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-5 mb-6 md:mb-8"
              >
                <div className="relative">
                  {/* Vertical DIN dimension line */}
                  <div className="absolute -left-5 top-0 bottom-0 flex flex-col items-center text-foreground/[0.12]" aria-hidden="true">
                    <div className="w-2.5 h-px bg-current" />
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" className="flex-shrink-0">
                      <path d="M0 5 L3.5 0 L7 5" stroke="currentColor" strokeWidth="0.7" fill="none" />
                    </svg>
                    <div className="flex-1 w-px bg-current" />
                    <span className="font-mono text-[7px] tracking-[0.15em] select-none whitespace-nowrap py-0.5 -rotate-90 origin-center">
                      210
                    </span>
                    <div className="flex-1 w-px bg-current" />
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" className="flex-shrink-0">
                      <path d="M0 0 L3.5 5 L7 0" stroke="currentColor" strokeWidth="0.7" fill="none" />
                    </svg>
                    <div className="w-2.5 h-px bg-current" />
                  </div>

                  <div className="space-y-2">
                  {[
                    { bold: "AI supplier search", rest: "find the right factory in seconds, not weeks" },
                    { bold: "Automated qualification", rest: "certificates, capacity, risk — verified before you contact" },
                    { bold: "On-site audit in 72h", rest: "local certified auditor, any country, any standard" },
                    { bold: "AI-powered reports", rest: "standardized, photo-verified, decision-ready in 24h" },
                    { bold: "CAPA tracking & close-out", rest: "every finding tracked until resolved" },
                    { bold: "Continuous monitoring", rest: "supplier performance visible across your entire base" },
                  ].map((item, i) => (
                    <p key={i} className="text-sm md:text-base text-foreground/60 whitespace-nowrap">
                      <span className="font-semibold text-foreground">{item.bold}</span> — {item.rest}
                    </p>
                  ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="w-full sm:w-auto text-lg" onClick={() => {
                  const demoSection = document.getElementById('platform-demo');
                  if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
                }}>
                  See Platform Demo →
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg" onClick={() => setShowROIModal(true)}>
                  Calculate Your Savings →
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Industry Band */}
      <div className="relative z-10 border-t border-foreground/10 overflow-hidden py-3 md:py-5 shrink-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-4 md:mx-10 text-xs md:text-base tracking-widest uppercase font-bold text-foreground/80"
            >
              {item.label}
              <span className="ml-1.5 font-normal text-foreground/40 normal-case tracking-normal text-[0.85em]">({item.standard})</span>
              <span className="ml-6 md:ml-10 text-foreground/20">·</span>
            </span>
          ))}
        </div>
      </div>
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
