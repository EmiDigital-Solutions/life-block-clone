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
              className="text-sm md:text-base text-foreground/50 font-mono tracking-wide mb-4 md:mb-6"
            >
              On-demand supplier verification
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

            {/* Value Props + CTAs - right-offset Archlet style */}
            <div className="mt-8 md:mt-12 lg:mt-16 ml-[28%] md:ml-[30%] lg:ml-[50%] max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-2 mb-6 md:mb-8"
              >
                <div className="relative pl-8">
                  {/* Vertical DIN dimension line */}
                  <div className="absolute left-0 top-1 bottom-1 flex flex-col items-center text-foreground/[0.15]" aria-hidden="true">
                    {/* Top tick + arrow */}
                    <div className="w-3 h-px bg-current" />
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="flex-shrink-0 -mt-px">
                      <path d="M0 5 L4 0 L8 5" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    </svg>
                    {/* Vertical line */}
                    <div className="flex-1 w-px bg-current" />
                    {/* Label */}
                    <span className="font-mono text-[8px] tracking-[0.15em] select-none whitespace-nowrap py-1 -rotate-90 origin-center">
                      210
                    </span>
                    {/* Vertical line */}
                    <div className="flex-1 w-px bg-current" />
                    {/* Bottom arrow + tick */}
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="flex-shrink-0 -mb-px">
                      <path d="M0 0 L4 5 L8 0" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    </svg>
                    <div className="w-3 h-px bg-current" />
                  </div>

                  {[
                    { bold: "72-hour mobilization", rest: "any country, any industry" },
                    { bold: "60% lower cost, 70% faster", rest: "than traditional audit programs" },
                    { bold: "New supplier base in weeks", rest: "not years. Unlimited audits running simultaneously" },
                    { bold: "Your checklists, AI-enhanced", rest: "your templates & requirements, elevated with AI" },
                    { bold: "Maximum objectivity", rest: "AI-guided execution eliminates bias" },
                    { bold: "On-site verified intelligence", rest: "real supplier data with predictive insights" },
                    { bold: "AI-driven CAPA & close-out", rest: "every finding tracked, escalated, and resolved digitally" },
                  ].map((item, i) => (
                    <p key={i} className="text-sm md:text-base text-foreground/60 whitespace-nowrap">
                      <span className="font-semibold text-foreground">{item.bold}</span> — {item.rest}
                    </p>
                  ))}
                </div>
                <p className="text-sm md:text-base whitespace-nowrap flex items-baseline gap-2.5 mt-3">
                  <span className="font-mono text-xs text-primary/60">{String(8).padStart(2, '0')}</span>
                  <span><span className="font-semibold text-primary">Fast-mover advantage</span> — get 30% off your first audit · <a href="https://calendly.com/yvoo/demo-yvoo" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80 font-semibold">Book Now →</a></span>
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
