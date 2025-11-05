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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* LEFT SIDE - 40% - Featured Screenshot as BACKGROUND with Timeline OVERLAY */}
          <div className="lg:col-span-2 relative min-h-[600px] lg:min-h-[800px]">
            {/* LAYER 1: Large Featured Screenshot - BACKGROUND */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[0]}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6">
                    <span className="text-6xl sm:text-7xl font-bold text-white">
                      {currentStep.number}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-3xl sm:text-4xl mb-4">
                    {currentStep.screenshots[0].label}
                  </h4>
                  <p className="text-white/80 text-lg sm:text-xl max-w-md">
                    {currentStep.screenshots[0].desc}
                  </p>
                </div>

                <div 
                  className="absolute inset-0 pointer-events-none rounded-3xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* LAYER 2: Timeline and Header - OVERLAY on top of featured screenshot */}
            <div className="absolute inset-0 flex flex-col p-6 lg:p-8 pointer-events-none">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-2 mb-8 pointer-events-auto"
              >
                <p className="text-sm font-medium text-white/90 tracking-wider uppercase backdrop-blur-sm bg-black/20 inline-block px-3 py-1 rounded">
                  The Process
                </p>
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    How It Works
                  </h2>
                  <div className="flex-1 h-0.5 bg-white/30" />
                </div>
              </motion.div>

              {/* Vertical Timeline - OVERLAY */}
              <div className="relative flex flex-col gap-0 pointer-events-auto">
                {/* Connecting Line */}
                <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-white/20">
                  <motion.div
                    className="w-full bg-white"
                    initial={{ height: 0 }}
                    animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>

                {/* Timeline Steps */}
                {steps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPast = index < activeStep;

                  return (
                    <button
                      key={step.number}
                      onClick={() => handleStepClick(index)}
                      className="relative flex items-start gap-4 py-4 group text-left"
                      aria-label={`Go to step ${index + 1}: ${step.label}`}
                    >
                      {/* Dot */}
                      <div
                        className={`relative z-10 w-3 h-3 rounded-full flex-shrink-0 mt-1 transition-all duration-300 ${
                          isActive
                            ? "bg-white scale-150 shadow-lg shadow-white/50"
                            : isPast
                            ? "bg-white"
                            : "bg-white/30 group-hover:bg-white/50"
                        }`}
                      />

                      {/* Step Content with Background */}
                      <div className="flex-1 min-w-0 backdrop-blur-sm bg-black/20 rounded-lg px-3 py-2">
                        <h4
                          className={`text-sm sm:text-base font-bold mb-1 transition-all duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-white/60 group-hover:text-white/80"
                          }`}
                        >
                          {step.label}
                        </h4>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs sm:text-sm text-white/80 leading-relaxed pr-4"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - 60% - Carousel + Navigation */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
            {/* Active Step Title */}
            <AnimatePresence mode="wait">
              <motion.h3
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
              >
                {currentStep.title}
              </motion.h3>
            </AnimatePresence>

            {/* Carousel - Horizontal scroll of 4 screenshots */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {currentStep.screenshots.slice(0, 4).map((screenshot, index) => (
                    <motion.div
                      key={`${activeStep}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group relative flex-shrink-0 w-64 sm:w-72 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl cursor-pointer snap-start"
                      style={{
                        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 197, 94, 0.25)",
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[index]}`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                          <span className="text-lg sm:text-xl font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                        <h4 className="text-white font-bold text-sm sm:text-base mb-2">
                          {screenshot.label}
                        </h4>
                        <p className="text-white/70 text-xs sm:text-sm">
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
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeStep
                        ? "w-8 bg-white"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20"
                aria-label="Next step"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
              <Button
                variant="outline"
                size="lg"
                className="group bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
              >
                Try Free Search
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                className="group bg-white text-green-600 hover:bg-white/90"
              >
                Book Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
