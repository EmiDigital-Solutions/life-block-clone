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
        className="relative min-h-screen flex items-stretch px-0 py-0 overflow-hidden transition-all duration-700 bg-black"
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
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl flex flex-col items-center justify-center ring-4 ring-primary/30">
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">Step</span>
                <span className="text-3xl font-black text-white">
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
            className="text-xs font-medium text-white/80 tracking-widest uppercase text-center mb-2"
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

          {/* Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`carousel-mobile-${activeStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex-1 flex items-center"
            >
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                setApi={setCarouselApi}
                className="w-full"
              >
                <CarouselContent className="-ml-2">
                  {currentStep.screenshots.map((screenshot, index) => (
                    <CarouselItem
                      key={`${activeStep}-${index}`}
                      className="pl-2 basis-[85%]"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.08 }}
                        className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-card to-card/80 border border-border/50"
                        style={{
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.15)",
                        }}
                      >
                        {screenshot.imageUrl ? (
                          <img
                            src={screenshot.imageUrl}
                            alt={screenshot.label}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[index]}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                          <h4 className="text-white font-bold text-sm mb-1">
                            {screenshot.label}
                          </h4>
                          <p className="text-white/70 text-xs">
                            {screenshot.desc}
                          </p>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
          </AnimatePresence>

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
              <button className="w-full px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-white/95 transition-all duration-200 shadow-lg flex items-center justify-center gap-2">
                Try Free Search
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-white/95 transition-all duration-200 shadow-lg flex items-center justify-center gap-2">
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
      style={{ background: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))" }}
    >
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 animate-pulse" style={{ animationDuration: "15s" }} />
      </div>

      <div className="w-full relative z-10 flex flex-col lg:flex-row">
        {/* LEFT SIDE - Timeline - Full width on mobile, 40% on desktop */}
        <div className="w-full lg:w-2/5 relative min-h-[40vh] lg:min-h-0">
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
              <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[activeStep]}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* LAYER 2: Timeline - Horizontal on mobile, Vertical on desktop */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 lg:top-12 lg:left-12 pointer-events-none z-10">
            <div className="relative flex lg:flex-col flex-row">
              {/* Timeline Steps */}
              {processedSteps.map((step, index) => {
                const isActive = activeStep === index;
                const isPast = index < activeStep;
                const isLast = index === processedSteps.length - 1;

                return (
                  <motion.div
                    key={step.number}
                    className="relative flex lg:flex-col flex-row items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.4 }}
                  >
                    {/* Circle */}
                    <motion.button
                      onClick={() => handleStepClick(index)}
                      className="relative z-10 group pointer-events-auto"
                      aria-label={`Go to step ${index + 1}: ${step.label}`}
                    >
                      <motion.div
                        className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
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
                          className={`text-sm md:text-base lg:text-lg font-bold transition-colors duration-300 ${
                            isActive || isPast
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {step.number}
                        </span>
                      </motion.div>
                    </motion.button>

                    {/* Connecting Line - Horizontal on mobile, Vertical on desktop */}
                    {!isLast && (
                      <div className="lg:w-[2px] lg:h-20 w-12 h-[2px] md:w-16 bg-white/30 relative">
                        <motion.div
                          className="lg:w-full lg:h-auto w-auto h-full bg-white"
                          initial={{ height: 0, width: 0 }}
                          animate={{ 
                            height: isPast || (isActive && index < activeStep) ? "100%" : "0%",
                            width: isPast || (isActive && index < activeStep) ? "100%" : "0%"
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

          {/* LAYER 3: Section Label and Title */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 lg:bottom-6 lg:left-12 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-2 md:space-y-4"
            >
              <p className="text-xs md:text-sm font-medium text-white/80 tracking-widest uppercase">
                The Process
              </p>
              <div className="flex items-center gap-3 md:gap-6">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl whitespace-nowrap">
                  How It Works
                </h2>
                <div className="h-1 w-16 md:w-24 lg:w-32 bg-white/50" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - Content Area - Full width on mobile, 60% on desktop */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center py-8 px-4 md:py-10 md:px-8 lg:py-12 lg:px-16">
          {/* Active Step Title */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={activeStep}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-6 md:mb-8 lg:mb-12 text-center"
            >
              {currentStep.title}
            </motion.h3>
          </AnimatePresence>

          {/* Grid of Cards - Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`carousel-${activeStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="mb-6 md:mb-8 lg:mb-12 px-2"
            >
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {currentStep.screenshots.map((screenshot, index) => (
                    <CarouselItem
                      key={`${activeStep}-${index}`}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{ scale: 1.05, y: -8 }}
                        className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl cursor-pointer h-full"
                        style={{
                          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.2)",
                        }}
                      >
                        {/* Display actual uploaded image or fallback to gradient */}
                        {screenshot.imageUrl ? (
                          <img
                            src={screenshot.imageUrl}
                            alt={screenshot.label}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${screenshotGradients[index]}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          </div>
                        )}

                        {/* Overlay gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-center">
                          <h4 className="text-white font-bold text-xs md:text-sm mb-1">
                            {screenshot.label}
                          </h4>
                          <p className="text-white/70 text-xs">
                            {screenshot.desc}
                          </p>
                        </div>

                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-200" />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Row: Navigation + CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevious}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/30"
                aria-label="Next step"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
            </div>

            {/* CTAs - Stack on mobile, side-by-side on larger screens */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-white text-gray-900 rounded-full text-sm md:text-base font-medium hover:bg-white/95 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Try Free Search
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-white text-gray-900 rounded-full text-sm md:text-base font-semibold hover:bg-white/95 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
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