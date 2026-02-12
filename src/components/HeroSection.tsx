import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ROICalculator from "./ROICalculator";

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
      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10 pt-20 md:pt-32 lg:pt-40 min-h-0">
        <div className="px-6 lg:px-12 xl:px-24 w-full max-w-7xl mx-auto">
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
              AI-Powered Supplier Verification
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
            >
              Verify Suppliers<br />
              in Days, Not Weeks
            </motion.h1>

            {/* Subtitle + CTA - right-offset on mobile like Archlet */}
            <div className="mt-8 md:mt-12 lg:mt-16 ml-[28%] md:ml-[30%] lg:ml-[50%] max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-foreground/60 text-base md:text-lg lg:text-xl mb-6 md:mb-8"
              >
                €15,000 → €700 per audit <span className="mx-3 text-foreground/30">|</span> Weeks → 3 days.<br />
                AI-powered audits with 99% accuracy.<br />
                So you never get burned by a bad supplier again.
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
                    <span className="sm:hidden">Get Audit Free</span>
                    <span className="hidden sm:inline">Get Your First Audit Free</span>
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
