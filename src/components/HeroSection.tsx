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
              className="text-sm text-foreground/50 font-mono tracking-wide mb-4 md:mb-6"
            >
              supplier intelligence platform — find · verify · decide
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
            >
              On-site satisfying audits<br />
              in days, not weeks.
            </motion.h1>

            {/* Subtitle + CTA - right-offset on mobile like Archlet */}
            <div className="mt-8 md:mt-12 lg:mt-16 ml-[28%] md:ml-[30%] lg:ml-[50%] max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-foreground/60 text-base md:text-lg lg:text-xl mb-6 md:mb-8"
              >
                Local certified auditors, guided by Atlas AI, on-site in days — not weeks. Quality no internal team can match. Zero coordination. Just click and verify.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="w-full sm:w-auto text-lg">
                  <a
                    href="https://calendly.com/yvoo/demo-yvoo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sm:hidden">See the Future</span>
                    <span className="hidden sm:inline">See the Future of Audits</span>
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg" onClick={() => setShowROIModal(true)}>
                  <span className="sm:hidden">Calculate ROI</span>
                  <span className="hidden sm:inline">Calculate Your ROI</span>
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
