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

  // Auto-advance to next step when 4th carousel card is reached
  useEffect(() => {
    if (!carouselApi || !isMobile) return;

    const handleSelect = () => {
      const selectedIndex = carouselApi.selectedScrollSnap();
      // When user reaches the 4th card (index 3), advance to next step
      if (selectedIndex === 3) {
        setTimeout(() => {
          handleNext();
        }, 500); // Small delay for smooth transition
      }
    };

    carouselApi.on("select", handleSelect);
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi, isMobile, handleNext]);

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
              className="text-3xl font-bold text-white drop-shadow-lg mb-3 text-center"
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

          {/* Stacked 3D Cards Container - Mobile */}
          <div className="relative w-full max-w-sm h-[450px] mb-6 mx-auto">
            <AnimatePresence mode="popLayout">
              {currentStep.screenshots.map((screenshot, index) => {
                // Calculate stacking order and rotation
                const zIndex = 4 - index;
                const rotations = [2, -3, 1, -2];
                const rotation = rotations[index];
                const offsetY = index * 6;
                const offsetX = index * 3;
                const scale = 1 - index * 0.03;
                const opacity = 1 - index * 0.15;

                return (
                  <motion.div
                    key={`${activeStep}-mobile-card-${index}`}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8,
                      y: 50,
                      rotateZ: rotation * 2
                    }}
                    animate={{ 
                      opacity: opacity,
                      scale: scale,
                      y: offsetY,
                      x: offsetX,
                      rotateZ: rotation,
                      filter: index > 0 ? "blur(1px)" : "blur(0px)"
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8,
                      y: -50
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0"
                    style={{
                      zIndex: zIndex,
                      perspective: "1000px",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <div 
                      className="relative w-full h-full rounded-3xl overflow-hidden"
                      style={{
                        background: stepBackgroundColors[index],
                        boxShadow: index === 0 
                          ? "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(34, 197, 94, 0.3)"
                          : "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      {screenshot.imageUrl ? (
                        <>
                          <img
                            src={screenshot.imageUrl}
                            alt={screenshot.label}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50" />
                        </div>
                      )}

                      {/* Glass-morphism edge */}
                      <div className="absolute inset-0 rounded-3xl border border-white/10" />

                      {/* Glow effect */}
                      {index === 0 && (
                        <div className="absolute inset-0 rounded-3xl opacity-50" 
                          style={{
                            background: "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.15), transparent 70%)"
                          }}
                        />
                      )}

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="space-y-2">
                          <h4 className="text-white font-bold text-lg leading-tight">
                            {screenshot.label}
                          </h4>
                          <p className="text-white/80 text-sm leading-snug">
                            {screenshot.desc}
                          </p>
                          {index === 0 && (
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mt-3">
                              <span className="text-xs font-semibold text-white">Active</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
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

          {/* LAYER 2: Timeline - Horizontal on mobile, Vertical on desktop */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 lg:top-12 lg:left-12 pointer-events-none z-10">
            <div className="relative flex lg:flex-col flex-row gap-0">
              {/* Timeline Steps */}
              {processedSteps.map((step, index) => {
                const isActive = activeStep === index;
                const isPast = index < activeStep;
                const isLast = index === processedSteps.length - 1;

                return (
                  <motion.div
                    key={step.number}
                    className="relative flex lg:flex-row flex-col items-start lg:items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.4 }}
                  >
                    <div className="flex lg:flex-row flex-col items-center lg:items-center">
                      {/* Circle */}
                      <motion.button
                        onClick={() => handleStepClick(index)}
                        className="relative z-10 group pointer-events-auto"
                        aria-label={`Go to step ${index + 1}: ${step.label}`}
                      >
                        <motion.div
                          className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl"
                          style={{
                            background: isActive || isPast ? "hsl(var(--content-accent))" : "rgba(255, 255, 255, 0.2)",
                          }}
                          animate={{
                            scale: isActive ? 1.15 : 1,
                            boxShadow: isActive
                              ? "0 25px 50px -10px hsla(142, 76%, 45%, 0.7), 0 0 40px hsla(142, 76%, 45%, 0.5)"
                              : isPast
                              ? "0 10px 20px -5px hsla(142, 76%, 45%, 0.3)"
                              : "0 5px 10px -3px rgba(0, 0, 0, 0.1)",
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <span
                            className="text-base md:text-lg lg:text-xl font-black transition-colors duration-300"
                            style={{
                              color: isActive || isPast ? "white" : "rgba(255, 255, 255, 0.5)"
                            }}
                          >
                            {step.number}
                          </span>
                        </motion.div>
                      </motion.button>

                      {/* Step Label - Only show for active step */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 pointer-events-none hidden lg:block"
                          >
                            <p className="text-white text-lg font-semibold whitespace-nowrap">
                              {step.label}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Connecting Line - Vertical only on desktop */}
                    {!isLast && (
                      <div className="lg:w-[3px] lg:h-24 w-[3px] h-16 ml-[22px] md:ml-[26px] lg:ml-0 lg:my-2 my-1 relative rounded-full overflow-hidden" style={{ background: "rgba(255, 255, 255, 0.15)" }}>
                        <motion.div
                          className="w-full h-full rounded-full"
                          style={{ 
                            background: "hsl(var(--content-accent))",
                            boxShadow: "0 0 20px hsla(142, 76%, 45%, 0.6)"
                          }}
                          initial={{ height: "0%" }}
                          animate={{ 
                            height: isPast ? "100%" : "0%"
                          }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                      </div>
                    )}
                  </motion.div>
                );
              })}
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
              className="text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg mb-6 md:mb-8 lg:mb-12 text-center text-white"
            >
              {currentStep.title}
            </motion.h3>
          </AnimatePresence>

          {/* Stacked 3D Cards Container */}
          <div className="relative w-full max-w-md h-[500px] md:h-[600px] mb-8 md:mb-12">
            <AnimatePresence mode="popLayout">
              {currentStep.screenshots.map((screenshot, index) => {
                // Calculate stacking order and rotation
                const zIndex = 4 - index;
                const rotations = [2, -3, 1, -2];
                const rotation = rotations[index];
                const offsetY = index * 8;
                const offsetX = index * 4;
                const scale = 1 - index * 0.03;
                const opacity = 1 - index * 0.15;

                return (
                  <motion.div
                    key={`${activeStep}-card-${index}`}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8,
                      y: 50,
                      rotateZ: rotation * 2
                    }}
                    animate={{ 
                      opacity: opacity,
                      scale: scale,
                      y: offsetY,
                      x: offsetX,
                      rotateZ: rotation,
                      filter: index > 0 ? "blur(1px)" : "blur(0px)"
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8,
                      y: -50
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: "easeOut"
                    }}
                    whileHover={index === 0 ? { 
                      scale: 1.05, 
                      y: -10,
                      rotateZ: 0,
                      transition: { duration: 0.3 }
                    } : {}}
                    className="absolute inset-0 cursor-pointer"
                    style={{
                      zIndex: zIndex,
                      perspective: "1000px",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <div 
                      className="relative w-full h-full rounded-3xl overflow-hidden"
                      style={{
                        background: stepBackgroundColors[index],
                        boxShadow: index === 0 
                          ? "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(34, 197, 94, 0.3)"
                          : "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      {/* Display actual uploaded image or use gradient background */}
                      {screenshot.imageUrl ? (
                        <>
                          <img
                            src={screenshot.imageUrl}
                            alt={screenshot.label}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50" />
                          <div className="absolute inset-0 backdrop-blur-[0.5px]" />
                        </div>
                      )}

                      {/* Glass-morphism edge */}
                      <div className="absolute inset-0 rounded-3xl border border-white/10" />

                      {/* Glow effect */}
                      {index === 0 && (
                        <div className="absolute inset-0 rounded-3xl opacity-50" 
                          style={{
                            background: "radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.15), transparent 70%)"
                          }}
                        />
                      )}

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <div className="space-y-3">
                          <h4 className="text-white font-bold text-2xl leading-tight">
                            {screenshot.label}
                          </h4>
                          <p className="text-white/80 text-base font-medium leading-snug">
                            {screenshot.desc}
                          </p>
                          {index === 0 && (
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mt-4">
                              <span className="text-sm font-semibold text-white">Active</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
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