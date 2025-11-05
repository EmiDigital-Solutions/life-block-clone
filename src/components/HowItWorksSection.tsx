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
          {/* LEFT SIDE - 40% - Timeline + Featured Screenshot */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <p className="text-sm font-medium text-white/80 tracking-wider uppercase">The Process</p>
              <div className="flex items-center gap-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  How It Works
                </h2>
                <div className="flex-1 h-0.5 bg-white/30" />
              </div>
            </motion.div>

            {/* Vertical Timeline */}
            <div className="relative flex flex-row lg:flex-col gap-6 lg:gap-0">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute left-[5px] top-0 bottom-0 w-0.5 bg-white/20">
                <motion.div
                  className="w-full bg-white"
                  initial={{ height: 0 }}
                  animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* Mobile horizontal line */}
              <div className="lg:hidden absolute top-[5px] left-0 right-0 h-0.5 bg-white/20">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* Timeline Dots */}
              <div className="flex flex-row lg:flex-col gap-6 lg:gap-8">
                {steps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isPast = index < activeStep;

                  return (
                    <button
                      key={step.number}
                      onClick={() => handleStepClick(index)}
                      className="relative flex items-center gap-4 group"
                      aria-label={`Go to step ${index + 1}: ${step.label}`}
                    >
                      {/* Dot */}
                      <div
                        className={`relative z-10 w-3 h-3 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-white scale-150 shadow-lg shadow-white/50"
                            : isPast
                            ? "bg-white"
                            : "bg-white/30 group-hover:bg-white/50"
                        }`}
                      />

                      {/* Step Label - Desktop Only */}
                      <span
                        className={`hidden lg:block text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "text-white font-bold"
                            : "text-white/60 group-hover:text-white/80"
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Screenshot + Step Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Step Title with Line */}
                <div className="flex items-center gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {currentStep.label}
                  </h3>
                  <div className="flex-1 h-0.5 bg-white/30" />
                </div>

                {/* Featured Screenshot */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[0]}`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-4xl font-bold text-white">
                        {currentStep.number}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-xl mb-2">
                      Featured: {currentStep.screenshots[0].label}
                    </h4>
                    <p className="text-white/80 text-sm">
                      {currentStep.screenshots[0].desc}
                    </p>
                  </div>

                  <div 
                    className="absolute inset-0 pointer-events-none rounded-3xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                    }}
                  />
                </motion.div>

                {/* Description */}
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {currentStep.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE - 60% - Screenshots Grid + Navigation */}
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

            {/* Screenshots Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-4 sm:gap-6"
              >
                {currentStep.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={`${activeStep}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)",
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[index]}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                        <span className="text-lg sm:text-2xl font-bold text-white">
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
                      className="absolute inset-0 pointer-events-none rounded-3xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

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
