import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    label: "Search Suppliers",
    title: "Find Your Suppliers",
    description: "Use free AI-powered search to find qualified manufacturers across 3 global databases in minutes",
    screenshots: [
      { label: "Search Interface", desc: "AI-powered query input" },
      { label: "Results List", desc: "Supplier matches with scores" },
      { label: "Supplier Profile", desc: "Detailed view with certifications" },
      { label: "Book Audit CTA", desc: "One-click audit booking" },
    ],
  },
  {
    number: 2,
    label: "Select Auditor",
    title: "Choose Your Expert",
    description: "Browse 2,000+ certified auditors. See credentials, ratings, availability, and transparent pricing from €700",
    screenshots: [
      { label: "Auditor Map", desc: "Interactive global coverage" },
      { label: "Auditor Profile", desc: "Credentials and ratings" },
      { label: "Availability", desc: "Real-time calendar" },
      { label: "Booking Confirmed", desc: "Instant confirmation" },
    ],
  },
  {
    number: 3,
    label: "On-Site Audit",
    title: "Audit in Progress",
    description: "Local expert conducts standardized audit using AI guidance. Track real-time progress and see photos as they're uploaded",
    screenshots: [
      { label: "Mobile Checklist", desc: "AI-guided inspection" },
      { label: "Equipment Recognition", desc: "Smart photo analysis" },
      { label: "Photo Gallery", desc: "Real-time evidence" },
      { label: "Live Dashboard", desc: "Progress tracking" },
    ],
  },
  {
    number: 4,
    label: "Get Report",
    title: "Actionable Intelligence",
    description: "Receive comprehensive scored report within 24-48 hours with photo evidence and corrective action plan",
    screenshots: [
      { label: "Report Overview", desc: "Scored dashboard" },
      { label: "Detailed Findings", desc: "Photo-linked insights" },
      { label: "Comparison Chart", desc: "Multi-supplier analysis" },
      { label: "Action Tracker", desc: "Corrective tasks" },
    ],
  },
];

const screenshotGradients = [
  "from-blue-600 via-blue-700 to-blue-800",
  "from-green-600 via-green-700 to-green-800",
  "from-gray-800 via-gray-900 to-black",
  "from-blue-500 via-green-600 to-teal-700",
];

export const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
    setIsAutoPlaying(false);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % steps.length);
    setIsAutoPlaying(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  const currentStep = steps[activeStep];

  return (
    <section
      data-nav-theme="green"
      className="relative h-[85vh] flex items-stretch px-0 py-0 overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))" }}
    >
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 animate-pulse" style={{ animationDuration: "15s" }} />
      </div>

      <div className="w-full relative z-10 flex">
        {/* LEFT SIDE - 40% - Full-bleed Background Image with Timeline Overlay */}
        <div className="w-2/5 relative">
          {/* LAYER 1: Background Screenshot - CLEAN, NO CENTER CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[activeStep]}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* LAYER 2: Timeline Overlay - Improved Animation */}
          <div className="absolute top-12 left-12 pointer-events-none z-10">
            <div className="relative flex flex-col">
              {/* Connecting Line - Extended to reach step 4 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[40px] w-[2px] h-[540px] bg-white/30">
                <motion.div
                  className="w-full bg-white shadow-md"
                  initial={{ height: 0 }}
                  animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>

              {/* Timeline Steps - Circles with Smaller Numbers */}
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const isPast = index < activeStep;
                const isFuture = index > activeStep;

                return (
                  <motion.button
                    key={step.number}
                    onClick={() => handleStepClick(index)}
                    className="relative flex flex-col items-center mb-28 group pointer-events-auto"
                    aria-label={`Go to step ${index + 1}: ${step.label}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.4 }}
                  >
                    {/* Circle with Smaller Number (25% reduction) */}
                    <motion.div
                      className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isActive || isPast
                          ? "bg-white shadow-2xl"
                          : "bg-white/40 shadow-md"
                      }`}
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        boxShadow: isActive
                          ? "0 20px 40px -10px rgba(34, 197, 94, 0.5), 0 0 30px rgba(255, 255, 255, 0.4)"
                          : isPast
                          ? "0 10px 20px -5px rgba(0, 0, 0, 0.2)"
                          : "0 5px 10px -3px rgba(0, 0, 0, 0.1)",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <span
                        className={`text-2xl font-bold transition-colors duration-300 ${
                          isActive || isPast
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step.number}
                      </span>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* LAYER 3: Section Label and Title - Bottom Left */}
          <div className="absolute bottom-12 left-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-sm font-medium text-white/80 tracking-widest uppercase">
                The Process
              </p>
              <div className="flex items-center gap-6">
                <h2 className="text-7xl font-bold text-white drop-shadow-2xl whitespace-nowrap">
                  How It Works
                </h2>
                <div className="h-1 w-32 bg-white/50" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - 60% - Content Area */}
        <div className="w-3/5 flex flex-col justify-center py-12 px-16">
          {/* Active Step Title */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={activeStep}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-5xl font-bold text-white drop-shadow-lg mb-12 text-center"
            >
              {currentStep.title}
            </motion.h3>
          </AnimatePresence>

          {/* Row of 4 Cards - Centered */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`row-${activeStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-4 gap-6 mb-12"
            >
              {currentStep.screenshots.map((screenshot, index) => (
                <motion.div
                  key={`${activeStep}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                  style={{
                    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.2)",
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[index]}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                    <h4 className="text-white font-bold text-sm mb-1">
                      {screenshot.label}
                    </h4>
                    <p className="text-white/70 text-xs">
                      {screenshot.desc}
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-200" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Row: Navigation + CTAs */}
          <div className="flex items-center justify-between">
            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30"
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* CTAs - Standard White Rounded Buttons */}
            <div className="flex items-center gap-4">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-white/95 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                Try Free Search
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-white/95 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                Book Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
