import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ROICalculator from "./ROICalculator";
import HeroSquaresAnimation from "./HeroSquaresAnimation";

const marqueeItems = [
  { label: "Automotive", standard: "IATF 16949" },
  { label: "Aerospace", standard: "AS9100" },
  { label: "Medical Devices", standard: "ISO 13485" },
  { label: "Pharma", standard: "GMP / GDP" },
  { label: "Electronics", standard: "IPC / REACH" },
  { label: "Energy", standard: "ISO 50001" },
  { label: "Chemical", standard: "REACH / ISO 14001" },
  { label: "Industrial Manufacturing", standard: "ISO 9001" },
  { label: "Precision Engineering", standard: "VDA 6.3" },
  { label: "Defense", standard: "AQAP 2110" },
  { label: "Rail & Transport", standard: "IRIS / ISO 22163" },
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
              Supplier audits, reinvented
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
            >
              On-site supplier<br />
              audits in days, not weeks
            </motion.h1>

            {/* Value Props + CTAs - snapped to 4th grid line (50%) */}
            <div className="mt-8 md:mt-12 lg:mt-16 ml-[50%] relative">
              {/* DIN label above the dimension line */}
              <span className="absolute -left-14 -top-6 font-mono text-[9px] tracking-[0.2em] text-foreground/[0.12] select-none" aria-hidden="true">
                DIN EN ISO
              </span>

              {/* Surface roughness symbol (Ra) — positioned top-right of value props */}
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
                  {/* Vertical DIN dimension line — before the 4th grid line */}
                  <div className="absolute -left-5 top-0 bottom-0 flex flex-col items-center text-foreground/[0.12]" aria-hidden="true">
                    {/* Top tick + arrow */}
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
                    { bold: "72-hour mobilization", rest: "any country, any industry" },
                    { bold: "60% lower cost, 70% faster", rest: "than traditional audit programs" },
                    { bold: "New supplier base in weeks", rest: "not years. Unlimited audits running simultaneously" },
                    { bold: "Your checklists, AI-enhanced", rest: "your templates & requirements, elevated with AI" },
                    { bold: "Maximum objectivity", rest: "AI-driven, less subjectivity, more comparable results" },
                    { bold: "Verified facts, not claims", rest: "on-site data, risk alerts, predictions, decision-ready reports" },
                    { bold: "AI-driven CAPA & close-out", rest: "every finding tracked, escalated, and resolved digitally" },
                  ].map((item, i) => (
                    <p key={i} className="text-sm md:text-base text-foreground/60 whitespace-nowrap">
                      <span className="font-semibold text-foreground">{item.bold}</span> — {item.rest}
                    </p>
                  ))}
                  </div>
                </div>
                <p className="text-sm md:text-base whitespace-nowrap flex items-baseline mt-2">
                  <span><span className="font-semibold text-primary">Fast-mover advantage</span> — get 30% off your first audit · <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-primary hover:text-primary/80">Book Now →</a></span>
                </p>
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
              className="mx-4 md:mx-10 text-xs md:text-base tracking-widest uppercase font-bold text-foreground/80"
            >
              {item.label}
              <span className="ml-1.5 font-normal text-foreground/40 normal-case tracking-normal text-[0.85em]">({item.standard})</span>
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
