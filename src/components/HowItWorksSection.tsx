import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Search Suppliers",
    description: "Find qualified manufacturers in minutes using our free AI-powered search across 3 global databases",
    screenshots: [
      { label: "Search Interface", desc: "AI-powered query search" },
      { label: "AI Results", desc: "Smart match scores & details" },
      { label: "Supplier Profile", desc: "Certifications & ratings" },
      { label: "Audit Integration", desc: "Book audit instantly" },
    ],
  },
  {
    number: 2,
    title: "Select Auditor",
    description: "Browse 2,000+ certified auditors worldwide. See credentials, ratings, availability, and transparent pricing before booking",
    screenshots: [
      { label: "Auditor Map", desc: "Interactive availability map" },
      { label: "Auditor Profile", desc: "Credentials & ratings" },
      { label: "Availability Calendar", desc: "Real-time booking slots" },
      { label: "Booking Confirmation", desc: "Instant confirmation" },
    ],
  },
  {
    number: 3,
    title: "On-Site Audit",
    description: "Local expert conducts standardized audit using AI-guided checklist. Track live progress and see photos in real-time",
    screenshots: [
      { label: "Mobile Checklist", desc: "AI-guided progress tracking" },
      { label: "Equipment Recognition", desc: "Smart photo analysis" },
      { label: "Photo Evidence", desc: "Auto-categorized uploads" },
      { label: "Live Dashboard", desc: "Real-time GPS tracking" },
    ],
  },
  {
    number: 4,
    title: "Get Report",
    description: "Receive comprehensive scored report within 24-48 hours with photo evidence, findings, and corrective action plan",
    screenshots: [
      { label: "Report Overview", desc: "Scored dashboard & metrics" },
      { label: "Findings Detail", desc: "Photo-linked insights" },
      { label: "Comparison Chart", desc: "Multi-supplier analysis" },
      { label: "Action Tracker", desc: "Task & deadline management" },
    ],
  },
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
      data-nav-theme="light"
      className="relative py-24 px-6 md:px-12 lg:px-24"
      style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How <span className="text-green-600">YVOO</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From supplier search to certified audit in 4 simple steps
          </p>
        </motion.div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* LEFT SIDE - Vertical Timeline (40%) */}
          <div className="lg:col-span-2 space-y-1">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isPast = index < activeStep;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200">
                      <motion.div
                        className="w-full bg-green-600"
                        initial={{ height: 0 }}
                        animate={{ height: isPast || isActive ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}

                  {/* Step Card */}
                  <button
                    onClick={() => handleStepClick(index)}
                    className={`relative w-full text-left p-6 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-green-50 border-2 border-green-600 shadow-lg"
                        : "bg-white border-2 border-transparent hover:border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number Circle */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                          isActive
                            ? "bg-green-600 text-white scale-110"
                            : isPast
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isPast && !isActive ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          step.number
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3
                            className={`text-xl font-bold transition-colors ${
                              isActive ? "text-green-600" : "text-gray-900"
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p
                          className={`text-sm leading-relaxed transition-colors ${
                            isActive ? "text-gray-700" : "text-gray-600"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT SIDE - Screenshot Gallery (60%) */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {steps[activeStep].screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {/* Placeholder Screenshot */}
                    <div className="aspect-[4/3] flex flex-col items-center justify-center p-8 bg-white/50">
                      <div className="text-center space-y-3">
                        <div className="w-16 h-16 mx-auto bg-green-100 rounded-xl flex items-center justify-center mb-4">
                          <span className="text-2xl font-bold text-green-600">
                            {steps[activeStep].number}.{index + 1}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {screenshot.label}
                        </h4>
                        <p className="text-sm text-gray-600">{screenshot.desc}</p>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-600/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeStep
                      ? "w-8 bg-green-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
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
          className="text-center mt-20 space-y-6"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ready to get started?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="group min-w-[200px]"
            >
              Try Free Search
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              className="group min-w-[200px] bg-green-600 hover:bg-green-700"
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
