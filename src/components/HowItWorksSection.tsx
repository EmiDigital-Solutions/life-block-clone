import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Search Suppliers",
    description: "Find qualified manufacturers in minutes using our free AI-powered search across 3 global databases",
  },
  {
    number: 2,
    title: "Select Auditor",
    description: "Browse 2,000+ certified auditors worldwide. See credentials, ratings, availability, and transparent pricing before booking",
  },
  {
    number: 3,
    title: "On-Site Audit",
    description: "Local expert conducts standardized audit using AI-guided checklist. Track live progress and see photos in real-time",
  },
  {
    number: 4,
    title: "Get Report",
    description: "Receive comprehensive scored report within 24-48 hours with photo evidence, findings, and corrective action plan",
  },
];

const screenshotPlaceholders = [
  { gradient: "from-blue-600 via-blue-700 to-blue-800", label: "Screenshot 1" },
  { gradient: "from-green-600 via-green-700 to-green-800", label: "Screenshot 2" },
  { gradient: "from-purple-600 via-purple-700 to-purple-800", label: "Screenshot 3" },
  { gradient: "from-pink-600 via-pink-700 to-pink-800", label: "Screenshot 4" },
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

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  };

  return (
    <section
      data-nav-theme="green"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-24 py-12 sm:py-16 lg:py-20"
      style={{ background: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))" }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
          {/* LEFT SIDE - Vertical Timeline (40%) */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-0">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-2">
                How It Works
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-medium">
                From supplier search to certified audit in 4 simple steps
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/20">
                <motion.div
                  className="w-full bg-white"
                  initial={{ height: 0 }}
                  animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Steps */}
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const isPast = index < activeStep;

                return (
                  <motion.button
                    key={step.number}
                    onClick={() => handleStepClick(index)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative w-full text-left pl-16 pr-4 py-6 sm:py-8 group"
                  >
                    {/* Step Number Circle */}
                    <div
                      className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        isActive || isPast
                          ? "bg-white text-green-600 scale-110"
                          : "bg-white/20 text-white/60 group-hover:bg-white/30"
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className={`transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"}`}>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                        {step.title}
                      </h4>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-sm sm:text-base text-white/80 leading-relaxed"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE - Screenshot Gallery (60%) */}
          <div className="lg:col-span-3 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl"
              >
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {screenshotPlaceholders.map((placeholder, index) => (
                    <motion.div
                      key={`${activeStep}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)"
                      }}
                    >
                      {/* Placeholder Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${placeholder.gradient}`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>

                      {/* Placeholder Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                          <span className="text-2xl font-bold text-white">
                            {activeStep + 1}.{index + 1}
                          </span>
                        </div>
                        <p className="text-white font-medium text-sm sm:text-base">
                          {placeholder.label}
                        </p>
                        <p className="text-white/70 text-xs sm:text-sm mt-2">
                          Software Screenshot
                        </p>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />

                      {/* Edge Highlight */}
                      <div 
                        className="absolute inset-0 pointer-events-none rounded-3xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mt-8">
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
          </div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 sm:mt-20 space-y-6"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Ready to get started?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="group min-w-[200px] bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              Try Free Search
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              className="group min-w-[200px] bg-white text-green-600 hover:bg-white/90"
            >
              Book 30-Min Demo
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
