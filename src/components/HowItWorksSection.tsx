import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useContentByType, getMediaPublicUrl } from "@/hooks/useContentQuery";
import { supabase } from "@/integrations/supabase/client";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Fallback data in case CMS content is not available
const fallbackSteps = [
  {
    number: 1,
    label: "Search Suppliers",
    title: "Find Your Suppliers",
    description: "Use free AI-powered search to find qualified manufacturers across 3 global databases in minutes",
    screenshots: [
      { label: "Search Interface", desc: "AI-powered query input", imageUrl: null },
      { label: "Results List", desc: "Supplier matches with scores", imageUrl: null },
      { label: "Supplier Profile", desc: "Detailed view with certifications", imageUrl: null },
      { label: "Book Audit CTA", desc: "One-click audit booking", imageUrl: null },
    ],
  },
  {
    number: 2,
    label: "Select Auditor",
    title: "Choose Your Expert",
    description: "Browse 2,000+ certified auditors. See credentials, ratings, availability, and transparent pricing from €700",
    screenshots: [
      { label: "Auditor Map", desc: "Interactive global coverage", imageUrl: null },
      { label: "Auditor Profile", desc: "Credentials and ratings", imageUrl: null },
      { label: "Availability", desc: "Real-time calendar", imageUrl: null },
      { label: "Booking Confirmed", desc: "Instant confirmation", imageUrl: null },
    ],
  },
  {
    number: 3,
    label: "On-Site Audit",
    title: "Audit in Progress",
    description: "Local expert conducts standardized audit using AI guidance. Track real-time progress and see photos as they're uploaded",
    screenshots: [
      { label: "Mobile Checklist", desc: "AI-guided inspection", imageUrl: null },
      { label: "Equipment Recognition", desc: "Smart photo analysis", imageUrl: null },
      { label: "Photo Gallery", desc: "Real-time evidence", imageUrl: null },
      { label: "Live Dashboard", desc: "Progress tracking", imageUrl: null },
    ],
  },
  {
    number: 4,
    label: "Get Report",
    title: "Actionable Intelligence",
    description: "Receive comprehensive scored report within 24-48 hours with photo evidence and corrective action plan",
    screenshots: [
      { label: "Report Overview", desc: "Scored dashboard", imageUrl: null },
      { label: "Detailed Findings", desc: "Photo-linked insights", imageUrl: null },
      { label: "Comparison Chart", desc: "Multi-supplier analysis", imageUrl: null },
      { label: "Action Tracker", desc: "Corrective tasks", imageUrl: null },
    ],
  },
];

const screenshotGradients = [
  "from-blue-600 via-blue-700 to-blue-800",
  "from-green-600 via-green-700 to-green-800",
  "from-gray-800 via-gray-900 to-black",
  "from-blue-500 via-green-600 to-teal-700",
];

const stepBackgroundColors = [
  "linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))", // Blue
  "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))", // Green
  "linear-gradient(135deg, rgb(71, 85, 105), rgb(51, 65, 85), rgb(30, 41, 59))", // Slate
  "linear-gradient(135deg, rgb(20, 184, 166), rgb(13, 148, 136), rgb(15, 118, 110))", // Teal
];

export const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [processedSteps, setProcessedSteps] = useState(fallbackSteps);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const isMobile = useIsMobile();

  // Fetch feature cards from CMS
  const { data: featureCards, isLoading } = useContentByType("feature_card");

  // Process CMS data into steps format
  useEffect(() => {
    const processStepsData = async () => {
      if (!featureCards || featureCards.length === 0) {
        setProcessedSteps(fallbackSteps);
        return;
      }

      // Group feature cards by their order_index (which represents the step number)
      const stepGroups = featureCards.reduce((acc, card) => {
        const stepIndex = Math.floor(card.order_index / 10); // Use order_index to group: 0-9 = step 0, 10-19 = step 1, etc.
        if (!acc[stepIndex]) {
          acc[stepIndex] = [];
        }
        acc[stepIndex].push(card);
        return acc;
      }, {} as Record<number, typeof featureCards>);

      // Fetch media for all cards
      const stepsWithMedia = await Promise.all(
        Object.entries(stepGroups).map(async ([stepIndexStr, cards]) => {
          const stepIndex = parseInt(stepIndexStr);
          const fallbackStep = fallbackSteps[stepIndex] || fallbackSteps[0];

          // Fetch media for each card in this step
          const screenshotsWithMedia = await Promise.all(
            cards.map(async (card) => {
              let imageUrl = null;
              if (card.body?.imageId) {
                try {
                  const { data: media } = await supabase
                    .from("media")
                    .select("storage_path")
                    .eq("id", card.body.imageId)
                    .single();

                  if (media) {
                    imageUrl = getMediaPublicUrl(media.storage_path);
                  }
                } catch (error) {
                  console.error("Error fetching media:", error);
                }
              }

              return {
                label: card.title,
                desc: card.body?.content || card.body?.description || "",
                imageUrl,
              };
            })
          );

          return {
            number: stepIndex + 1,
            label: fallbackStep.label,
            title: fallbackStep.title,
            description: fallbackStep.description,
            screenshots: screenshotsWithMedia,
          };
        })
      );

      // Sort by step number and fill in any missing steps with fallbacks
      const completeSteps = fallbackSteps.map((fallback, index) => {
        const cmsStep = stepsWithMedia.find(s => s.number === index + 1);
        return cmsStep || fallback;
      });

      setProcessedSteps(completeSteps);
    };

    processStepsData();
  }, [featureCards]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processedSteps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, processedSteps.length]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveStep((prev) => (prev - 1 + processedSteps.length) % processedSteps.length);
    setIsAutoPlaying(false);
  }, [processedSteps.length]);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % processedSteps.length);
    setIsAutoPlaying(false);
  }, [processedSteps.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  // Removed auto-advance carousel logic for mobile

  const currentStep = processedSteps[activeStep];

  // Mobile combined layout
  if (isMobile) {
    return (
      <section
        data-nav-theme="green"
        className="relative min-h-screen flex items-stretch px-0 py-0 overflow-hidden transition-all duration-700"
        style={{ background: "hsl(var(--process-bg))" }}
      >
        {/* Background animation */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 animate-pulse" style={{ animationDuration: "15s" }} />
        </div>

        <div className="w-full relative z-10 flex flex-col py-8 px-4">
          {/* Step Number Badge - Top Center */}
          <motion.div
            key={`step-badge-${activeStep}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div 
                className="w-20 h-20 rounded-full shadow-2xl flex items-center justify-center ring-4"
                style={{ 
                  background: "hsl(var(--content-accent))",
                  boxShadow: "0 25px 50px -10px hsla(142, 76%, 45%, 0.7), 0 0 40px hsla(142, 76%, 45%, 0.5)",
                  borderColor: "hsla(142, 76%, 45%, 0.3)"
                }}
              >
                <span className="text-4xl font-black text-white">
                  {currentStep.number}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-4 border-black flex items-center justify-center shadow-xl">
                <span className="text-sm font-bold text-gray-900">{processedSteps.length}</span>
              </div>
            </div>
          </motion.div>

          {/* Section Label */}
          <motion.p
            key={`label-${activeStep}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base font-semibold text-white tracking-wide text-center mb-2"
          >
            {currentStep.label}
          </motion.p>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={`title-${activeStep}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white drop-shadow-lg mb-2 text-center"
            >
              {currentStep.title}
            </motion.h3>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white/90 text-sm text-center mb-6 px-2"
            >
              {currentStep.description}
            </motion.p>
          </AnimatePresence>

          {/* 4 Cards Grid - Mobile */}
          <div className="w-full max-w-4xl mx-auto mb-6 grid grid-cols-2 gap-3">
            {currentStep.screenshots.map((screenshot, index) => (
              <motion.div
                key={`${activeStep}-mobile-card-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-[180px]"
              >
                <div 
                  className={`relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br ${screenshotGradients[index]}`}
                  style={{
                    boxShadow: `
                      0 25px 50px -12px rgba(0, 0, 0, 0.5),
                      0 0 30px rgba(34, 197, 94, 0.2)
                    `,
                  }}
                >
                  {screenshot.imageUrl ? (
                    <>
                      <img
                        src={screenshot.imageUrl}
                        alt={screenshot.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  )}

                  <div className="absolute bottom-2 left-0 right-0 flex justify-center px-2">
                    <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 w-full">
                      <p className="text-white font-bold text-xs text-center">
                        {screenshot.label}
                      </p>
                      <p className="text-white/80 text-[10px] text-center">
                        {screenshot.desc}
                      </p>
                    </div>
                  </div>

                  <div 
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {processedSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === activeStep
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/40"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30 backdrop-blur-sm"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex flex-col gap-2 flex-1">
              <button 
                className="w-full px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                style={{ 
                  background: "hsl(var(--content-accent))",
                  color: "white"
                }}
              >
                Try Free Search
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                className="w-full px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                style={{ 
                  background: "hsl(var(--content-accent))",
                  color: "white"
                }}
              >
                Book Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30 backdrop-blur-sm"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Desktop layout
  return (
    <section
      data-nav-theme="green"
      className="relative h-[85vh] flex items-stretch px-0 py-0 overflow-hidden"
      style={{ background: "hsl(var(--content-bg))" }}
    >
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 animate-pulse" style={{ animationDuration: "15s" }} />
      </div>

      <div className="w-full relative z-10 flex flex-col lg:flex-row">
        {/* LEFT SIDE - Timeline - Full width on mobile, 40% on desktop */}
        <div 
          className="w-full lg:w-2/5 relative min-h-[40vh] lg:min-h-0"
          style={{ background: "hsl(var(--process-bg))" }}
        >
          {/* LAYER 1: Background Screenshot */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* LAYER 2: Timeline - Vertical */}
          <div className="absolute top-12 left-12 pointer-events-none z-10">
            <div className="relative">
              {/* Vertical Line - Behind circles, perfectly centered through all 4 circles */}
              <div 
                className="absolute w-0.5 z-0"
                style={{
                  left: '39.75px', // Perfectly centered (40px - 0.25px for 0.5px width)
                  top: '30px', // Center of first circle (60px / 2)
                  height: `${(processedSteps.length - 1) * (120 + 60)}px`, // 3 gaps (120px) + 3 circles (60px) = 540px total
                  background: 'rgba(255, 255, 255, 0.6)', // Higher contrast
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.25)',
                }}
              />

              {/* Timeline Steps */}
              <div className="relative flex flex-col" style={{ gap: '120px' }}>
                {processedSteps.map((step, index) => {
                  const isActive = activeStep === index;

                  return (
                    <div key={step.number} className="relative flex items-center">
                      {/* Circle */}
                      <motion.button
                        onClick={() => handleStepClick(index)}
                        className="relative pointer-events-auto flex-shrink-0"
                        aria-label={`Go to step ${index + 1}: ${step.label}`}
                      >
                        <motion.div
                          className="rounded-full flex items-center justify-center transition-all duration-200"
                          style={{
                            width: isActive ? '80px' : '60px',
                            height: isActive ? '80px' : '60px',
                            background: isActive ? '#10b981' : '#4b5563',
                            zIndex: 10,
                          }}
                          animate={{
                            boxShadow: isActive
                              ? "0 0 40px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.4)"
                              : "none",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-white font-bold text-xl">
                            {step.number}
                          </span>
                        </motion.div>
                      </motion.button>

                      {/* Text - Right of circle, 24px gap */}
                      <div className="ml-6 pointer-events-none">
                        <motion.h4
                          className="font-bold transition-all duration-200"
                          style={{
                            color: isActive ? '#ffffff' : '#6b7280',
                            fontSize: isActive ? '20px' : '18px',
                            fontWeight: isActive ? 'bold' : 'normal',
                          }}
                        >
                          {step.label}
                        </motion.h4>
                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-sm mt-1"
                              style={{
                                color: '#9ca3af',
                                maxWidth: '300px',
                              }}
                            >
                              {step.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* LAYER 3: Title */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 lg:bottom-6 lg:left-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2 md:space-y-4"
            >
              <div className="flex items-center gap-3 md:gap-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl whitespace-nowrap">
                  How It Works
                </h2>
                <div className="h-1 w-16 md:w-24 lg:w-32 rounded-full" style={{ background: "hsl(var(--content-accent))" }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - Content Area with Stacked Cards - Full width on mobile, 60% on desktop */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center items-center py-8 px-4 md:py-10 md:px-8 lg:py-12 lg:px-16 relative">
          {/* Active Step Title */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={activeStep}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg mb-6 text-center text-white"
            >
              {currentStep.title}
            </motion.h3>
          </AnimatePresence>

          {/* 4 Cards Grid - Desktop */}
          <div className="w-full max-w-5xl mx-auto mb-8 md:mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {currentStep.screenshots.map((screenshot, index) => (
              <motion.div
                key={`${activeStep}-desktop-card-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="h-[200px] md:h-[280px]"
              >
                <div 
                  className={`relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br ${screenshotGradients[index]}`}
                  style={{
                    boxShadow: `
                      0 25px 50px -12px rgba(0, 0, 0, 0.5),
                      0 0 30px rgba(34, 197, 94, 0.2)
                    `,
                  }}
                >
                  {screenshot.imageUrl ? (
                    <>
                      <img
                        src={screenshot.imageUrl}
                        alt={screenshot.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  )}

                  <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center px-2 md:px-3">
                    <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-3 md:px-4 py-1 md:py-1.5 w-full">
                      <p className="text-white font-bold text-xs md:text-sm text-center">
                        {screenshot.label}
                      </p>
                      <p className="text-white/80 text-[10px] md:text-xs text-center">
                        {screenshot.desc}
                      </p>
                    </div>
                  </div>

                  <div 
                    className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: Navigation + CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-2xl">
            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevious}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 text-white"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 text-white"
                aria-label="Next step"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* CTAs - Stack on mobile, side-by-side on larger screens */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
              <button 
                className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                style={{
                  background: "hsl(var(--content-accent))",
                  color: "white"
                }}
              >
                Try Free Search
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                style={{
                  background: "hsl(var(--content-accent))",
                  color: "white"
                }}
              >
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