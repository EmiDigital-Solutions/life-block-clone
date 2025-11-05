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
  "from-purple-600 via-purple-700 to-purple-800",
  "from-pink-600 via-pink-700 to-pink-800",
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
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-24 py-12 sm:py-16 lg:py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))" }}
    >
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 animate-pulse" style={{ animationDuration: "15s" }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* LEFT SIDE - 40% - Large Background Image with Timeline Overlay */}
          <div className="lg:col-span-2 relative min-h-[700px] lg:min-h-[85vh]">
            {/* LAYER 1: Large Background Screenshot - Full Height */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 50px rgba(255, 255, 255, 0.15)",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[activeStep]}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white/15 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8">
                    <span className="text-7xl sm:text-8xl font-bold text-white">
                      {currentStep.number}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-4xl sm:text-5xl mb-4">
                    {currentStep.screenshots[0].label}
                  </h4>
                  <p className="text-white/90 text-xl sm:text-2xl max-w-lg">
                    {currentStep.screenshots[0].desc}
                  </p>
                </div>

                <div 
                  className="absolute inset-0 pointer-events-none rounded-3xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* LAYER 2: Timeline Overlay - Top Left Corner */}
            <div className="absolute top-0 left-0 p-8 lg:p-10 pointer-events-none z-10">
              {/* Vertical Timeline */}
              <div className="relative flex flex-col gap-0">
                {/* Connecting Line */}
                <div className="absolute left-[18px] top-[18px] bottom-0 w-0.5 bg-white/30">
                  <motion.div
                    className="w-full bg-white shadow-lg shadow-white/50"
                    initial={{ height: 0 }}
                    animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>

                {/* Timeline Steps - Numbered Circles */}
                {steps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPast = index < activeStep;

                  return (
                    <button
                      key={step.number}
                      onClick={() => handleStepClick(index)}
                      className="relative flex items-center gap-0 mb-12 group text-left pointer-events-auto"
                      aria-label={`Go to step ${index + 1}: ${step.label}`}
                    >
                      {/* Numbered Circle */}
                      <div
                        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 border-2 ${
                          isActive
                            ? "bg-white border-white scale-110 shadow-xl shadow-white/50"
                            : isPast
                            ? "bg-white/90 border-white"
                            : "bg-white/20 border-white/40 backdrop-blur-sm group-hover:bg-white/30 group-hover:border-white/60"
                        }`}
                      >
                        <span
                          className={`text-sm font-bold transition-colors ${
                            isActive || isPast ? "text-green-600" : "text-white"
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LAYER 3: Section Header - Bottom Left */}
            <div className="absolute bottom-0 left-0 p-8 lg:p-10 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <p className="text-xs font-semibold text-white/70 tracking-widest uppercase">
                  The Process
                </p>
                <div className="flex items-center gap-4">
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                    How It Works
                  </h2>
                  <div className="h-1 w-24 bg-white/40" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE - 60% - Large Featured Card + Row of Small Cards */}
          <div className="lg:col-span-3 flex flex-col justify-between py-8 lg:py-12 space-y-8">
            {/* Active Step Title */}
            <AnimatePresence mode="wait">
              <motion.h3
                key={activeStep}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
              >
                {currentStep.title}
              </motion.h3>
            </AnimatePresence>

            {/* Large Featured Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`featured-${activeStep}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[0]}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-white font-bold text-3xl mb-3">
                    {currentStep.screenshots[0].label}
                  </h4>
                  <p className="text-white/80 text-lg max-w-md">
                    {currentStep.screenshots[0].desc}
                  </p>
                </div>

                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300" />

                <div 
                  className="absolute inset-0 pointer-events-none rounded-3xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Row of 3 Small Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`row-${activeStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-3 gap-4"
              >
                {currentStep.screenshots.slice(1, 4).map((screenshot, index) => (
                  <motion.div
                    key={`${activeStep}-${index + 1}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                    style={{
                      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 197, 94, 0.2)",
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[index + 1]}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                        <span className="text-lg font-bold text-white">
                          {index + 2}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-2">
                        {screenshot.label}
                      </h4>
                      <p className="text-white/70 text-xs">
                        {screenshot.desc}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-200" />

                    <div 
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Row: Navigation + CTAs */}
            <div className="flex items-center justify-between pt-4">
              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30"
                  aria-label="Next step"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* CTAs - Text Links */}
              <div className="flex items-center gap-6">
                <button className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                  Try Free Search
                </button>
                <button className="text-white hover:text-white/90 text-sm font-bold transition-colors">
                  Book Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
