import { useRef, useState, useEffect } from "react";
import React from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ROICalculator from "@/components/ROICalculator";
import HeroROICalculator from "@/components/HeroROICalculator";
import Earth3D from "@/components/Earth3D";
import BusinessImpactChart from "@/components/charts/BusinessImpactChart";
import ROITimelineChart from "@/components/charts/ROITimelineChart";
import TimeEfficiencyChart from "@/components/charts/TimeEfficiencyChart";
import InfiniteScrollingGallery from "@/components/InfiniteScrollingGallery";
import { ComplianceModal } from "@/components/ComplianceModal";
import { IndustryUseCaseModal, IndustryUseCase } from "@/components/IndustryUseCaseModal";
import { ArrowRight, Check, CheckCircle2, AlertTriangle, Target, Zap, Camera, BarChart3, Shield, TrendingUp, Globe, Link as LinkIcon, DollarSign, Calendar, CheckCheck, Search, Eye, Car, Plane, Pill, Factory, Rocket, Mail, Phone, MessageCircle, Clock, X, Mouse, UserCheck, Star, FileCheck, Lock, Award, CircleCheck, Building2, Leaf, ShieldCheck } from "lucide-react";
import industryAutomotive from "@/assets/industry-automotive.jpg";
import industryAerospace from "@/assets/industry-aerospace.jpg";
import industryMedical from "@/assets/industry-medical.jpg";
import industryElectronics from "@/assets/industry-electronics.jpg";
import industryCryogenicValve from "@/assets/industry-cryogenic-valve.jpg";
import { PixelIcon } from "@/components/PixelIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import scanProDashboard from "@/assets/scanpro-ai-dashboard.jpg";
import aiAudit from "@/assets/ai-audit-inspection.jpg";
import aiCopilot from "@/assets/ai-copilot-analysis.jpg";
import aiInspector from "@/assets/ai-inspector-tech.jpg";
import riskScoring from "@/assets/risk-scoring-ai.jpg";
import liveTracking from "@/assets/live-tracking-dashboard.jpg";
import oneClickDispatch from "@/assets/one-click-dispatch.jpg";
import factoryHero from "@/assets/factory-hero-background.jpg";
import scanProHeroBackground from "@/assets/scanpro-hero-background.jpg";
import digitalWorkflowTeam from "@/assets/digital-workflow-team.jpg";
import aboutSustainability from "@/assets/about-sustainability.jpg";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorMapPin from "@/assets/auditor-map-pin.png";
import scanProHeroAuditor from "@/assets/scanpro-hero-auditor.png";
import worldMapGlobe from "@/assets/world-map-globe.png";
import dottedWorldMap from "@/assets/dotted-world-map.png";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import auditorFemaleAsian from "@/assets/auditor-female-asian.jpg";
import { useContentByType, getMediaPublicUrl } from "@/hooks/useContentQuery";
import { supabase } from "@/integrations/supabase/client";

// Desktop Technology Section with Scroll Effect - Auditor Network Only
const DesktopFeaturesSection = ({ auditors, scrollToSection }: { auditors: any[], scrollToSection: (id: string) => void }) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([0, 1]);
  const [hidingCards, setHidingCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  // Professional sequential card animation - Always keep 2 cards visible
  useEffect(() => {
    if (!isInView) {
      setVisibleCards([0, 1]); // Keep first 2 cards visible
      setHidingCards([]);
      return;
    }

    const totalCards = 7; // Updated to 7 cards
    const showDelay = 1200; // Slower, more professional timing
    const displayTime = 4000; // How long all cards stay visible
    const hideDelay = 800;

    // Initialize with first 2 cards visible
    setVisibleCards([0, 1]);

    const runSequence = () => {
      // Show remaining cards one by one (starting from card 2)
      for (let i = 2; i < totalCards; i++) {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, i]);
        }, (i - 2) * showDelay);
      }

      // After display time, hide cards one by one, but keep first 2
      setTimeout(() => {
        for (let i = totalCards - 1; i >= 2; i--) {
          setTimeout(() => {
            setHidingCards(prev => [...prev, i]);
          }, (totalCards - 1 - i) * hideDelay);
        }

        // Clear hiding cards and reset to show first 2
        setTimeout(() => {
          setVisibleCards([0, 1]);
          setHidingCards([]);
        }, (totalCards - 2) * hideDelay + 500);
      }, (totalCards - 2) * showDelay + displayTime);
    };

    // Initial run
    setTimeout(runSequence, 1000);

    // Repeat the sequence
    const cycleTime = ((totalCards - 2) * showDelay) + displayTime + ((totalCards - 2) * hideDelay) + 2000;
    const interval = setInterval(runSequence, cycleTime);

    return () => clearInterval(interval);
  }, [isInView]);

  const handleCardClick = (index: number) => {
    // Remove from hiding list and add to visible if not already visible
    setHidingCards(prev => prev.filter(i => i !== index));
    if (!visibleCards.includes(index)) {
      setVisibleCards(prev => [...prev, index]);
    }
  };

  return (
    <section 
      ref={sectionRef}
      data-nav-theme="light"
      className="relative py-12 sm:py-16 md:py-20 bg-white"
    >
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 md:px-8" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        
        {/* Auditor Network Section - Horizontal Layout */}
        <div className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
          
          {/* Modern 3D Globe with Enhanced Effects */}
          <motion.div 
            className="absolute flex items-center justify-center pointer-events-none" 
            style={{ 
              zIndex: 0,
              width: '100%',
              height: '100%',
              top: '20%',
              left: 0,
              right: 0,
              bottom: '-20%'
            }}
          >
            {/* Globe with gradient and depth */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Glow effect behind globe */}
              <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(168, 197, 184, 0.1) 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main dotted map with reduced opacity */}
              <motion.div
                className="absolute w-full h-full"
                style={{ 
                  background: `url(${dottedWorldMap}) center center / contain no-repeat`,
                  opacity: 0.35,
                }}
                animate={{ 
                  rotateY: [0, 5, 0, -5, 0],
                  scale: [1, 1.02, 1, 1.02, 1]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Animated connection lines overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.2 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
                    <stop offset="50%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                
                {/* Animated pulse lines across globe */}
                {[...Array(6)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1="20%"
                    y1={`${20 + i * 12}%`}
                    x2="80%"
                    y2={`${25 + i * 12}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Auditor Cards - Professional Sequential Animation */}
          <AnimatePresence>
            {[
              { 
                name: "Sarah Chen", 
                title: "Lead Auditor VDA 6.3",
                location: "Shanghai, China",
                continent: "Asia",
                region: "East Asia",
                availability: "Available Now",
                rating: 4.9,
                image: auditorFemaleAsian,
                top: "38%", 
                left: "78%", 
              },
              { 
                name: "Marcus Silva", 
                title: "ISO 9001 Specialist",
                location: "São Paulo, Brazil",
                continent: "South America",
                region: "Latin America",
                availability: "Available in 24h",
                rating: 4.8,
                image: auditorLatin,
                top: "70%", 
                left: "34%", 
              },
              { 
                name: "Anna Schmidt", 
                title: "Lead Auditor IATF 16949",
                location: "Berlin, Germany",
                continent: "Europe",
                region: "Central Europe",
                availability: "Available Now",
                rating: 5.0,
                image: auditorFemaleEuropean,
                top: "12%", 
                left: "54%", 
              },
              { 
                name: "James Wilson", 
                title: "Quality Systems Expert",
                location: "Chicago, USA",
                continent: "North America",
                region: "United States",
                availability: "Available in 48h",
                rating: 4.7,
                image: auditorEuropean,
                top: "68%", 
                left: "18%", 
              },
              { 
                name: "Omar Hassan", 
                title: "Lead Auditor ISO 14001",
                location: "Dubai, UAE",
                continent: "Middle East",
                region: "Gulf Region",
                availability: "Available Now",
                rating: 4.9,
                image: auditorMiddleEast,
                top: "30%", 
                left: "60%", 
              },
              { 
                name: "Priya Sharma", 
                title: "Automotive QA Specialist",
                location: "Mumbai, India",
                continent: "Asia",
                region: "South Asia",
                availability: "Available in 24h",
                rating: 4.8,
                image: auditorSouthAsian,
                top: "46%", 
                left: "70%", 
              },
              { 
                name: "Kwame Mensah", 
                title: "Lead Auditor ISO 9001",
                location: "Lagos, Nigeria",
                continent: "Africa",
                region: "West Africa",
                availability: "Available Now",
                rating: 4.9,
                image: auditorAfrican,
                top: "56%", 
                left: "48%", 
              },
            ].map((auditor, index) => {
              const isVisible = visibleCards.includes(index);
              const isHiding = hidingCards.includes(index);
              const shouldShow = isVisible && !isHiding;
              
              return shouldShow ? (
                <motion.div
                  key={auditor.name}
                  className="absolute z-20 cursor-pointer"
                  style={{ top: auditor.top, left: auditor.left }}
                  initial={{ 
                    scale: 0, 
                    opacity: 0, 
                    y: 40,
                    rotateX: -15 
                  }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    y: 0,
                    rotateX: 0
                  }}
                  exit={{ 
                    scale: 0.8, 
                    opacity: 0, 
                    y: -20,
                    rotateX: 15,
                    transition: {
                      duration: 0.6,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => handleCardClick(index)}
                >
                <motion.div 
                    className="bg-[#ebebeb] rounded-xl overflow-hidden w-[140px]"
                    whileHover={{
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <div className="relative h-[120px] overflow-hidden">
                      <motion.img 
                        src={auditor.image} 
                        alt={auditor.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute top-1.5 right-1.5">
                        <motion.span 
                          className={`px-1.5 py-0.5 rounded-full text-[8px] font-semibold ${
                            auditor.availability === "Available Now" 
                              ? "bg-green-500 text-white" 
                              : "bg-yellow-500 text-white"
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          {auditor.availability}
                        </motion.span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-[#ebebeb]">
                      <h4 className="font-bold text-xs text-foreground mb-0.5 leading-tight">{auditor.name}</h4>
                      <p className="text-[9px] text-muted-foreground mb-1.5 leading-tight">{auditor.title}</p>
                      <p className="text-[9px] text-muted-foreground mb-1.5">{auditor.location}</p>
                      <div className="flex items-center gap-1">
                        <PixelIcon name="star" className="w-3 h-3" />
                        <span className="text-[9px] font-semibold text-foreground">{auditor.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null;
            })}
          </AnimatePresence>

            <div className="relative z-30">

            {/* Left Column: Text Content */}
            <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-left max-w-2xl bg-background/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">ScanPro+</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="section-headline text-foreground max-w-xl"
              >
                Global On-Demand Auditor Network
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                Certified auditors in 90+ countries. On-site within 48 hours. €700 flat rate.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="text-left mb-4"
              >
                <p className="text-base font-semibold text-foreground mb-2">
                  Our auditor network includes professionals certified by:
                </p>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                  <span className="text-sm">TÜV SÜD</span>
                  <span className="text-border">•</span>
                  <span className="text-sm">Bureau Veritas</span>
                  <span className="text-border">•</span>
                  <span className="text-sm">SGS</span>
                  <span className="text-border">•</span>
                  <span className="text-sm">DNV</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <button className="bg-primary text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-primary/90 flex items-center gap-2 sm:gap-3 group">
                  <span>Learn more</span>
                  <PixelIcon name="arrow-right" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
};

// Map Location Marker Component with Tooltip
const MapLocationMarker = ({ 
  name, 
  availability, 
  left, 
  top, 
  delay 
}: { 
  name: string; 
  availability: string; 
  left: string; 
  top: string; 
  delay: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, type: "spring" }}
      className="absolute cursor-pointer group z-20"
      style={{ left, top, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulsing ring animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary"
        animate={{
          scale: [1, 2.2, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width: '32px', height: '32px', left: '-16px', top: '-16px' }}
      />
      
      {/* Main marker dot */}
      <motion.div
        className="w-5 h-5 rounded-full bg-primary border-3 border-white shadow-xl relative z-10"
        whileHover={{ scale: 1.4 }}
        transition={{ duration: 0.2 }}
        style={{
          boxShadow: '0 4px 12px hsl(var(--primary) / 0.6)'
        }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 pointer-events-none z-30"
          >
            <div className="bg-[#1a1a1a] text-white px-5 py-3 rounded-xl shadow-2xl min-w-[180px] border border-white/10">
              <p className="font-bold text-sm whitespace-nowrap">{name}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs text-white/60 font-medium">{availability}</p>
              </div>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#1a1a1a]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Mobile Features Section - Auditor Network Only
const MobileFeaturesSection = ({ auditors }: { auditors: any[] }) => {
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleAuditors = auditors.slice(0, 3);

  useEffect(() => {
    const cycle = () => {
      setTimeout(() => setIsFanned(true), 2000);
      setTimeout(() => setIsFanned(false), 12000);
    };

    cycle();
    const interval = setInterval(cycle, 16000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = () => {
    setActiveIndex((prev) => (prev + 1) % auditors.slice(0, 3).length);
  };

  const getCardStyle = (index: number, totalCards: number) => {
    const centerIndex = (totalCards - 1) / 2;
    const adjustedIndex = (index - activeIndex + totalCards) % totalCards;
    const offset = adjustedIndex - centerIndex;
    
    if (isFanned) {
      return {
        x: offset * 110,
        y: Math.abs(offset) * -20,
        rotateY: offset * -8,
        rotateZ: offset * 6,
        scale: 1,
        opacity: 1,
        zIndex: totalCards - Math.abs(offset),
      };
    } else {
      return {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 0.98,
        opacity: adjustedIndex === 0 ? 1 : 0,
        zIndex: totalCards - adjustedIndex,
      };
    }
  };

  return (
    <section
      id="auditor-network"
      data-nav-theme="light"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 pb-20 sm:pb-24 md:pb-32 overflow-visible"
      style={{ background: "transparent" }}
    >
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 md:px-8" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        {/* Auditor Network Section - Horizontal Layout */}
        <div className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
          
          {/* Dotted World Map Background - HIGHLY VISIBLE */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none" 
            style={{ 
              zIndex: 0,
              background: `url(${dottedWorldMap}) center center / contain no-repeat`,
              opacity: 0.4,
              width: '100%',
              height: '100%'
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 sm:gap-10 md:gap-12 xl:gap-20 2xl:gap-28 items-center relative z-10">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">01 Feature</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="section-headline text-foreground max-w-xl"
              >
                Global On-Demand Auditor Network
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                Certified auditors in 90+ countries. On-site within 48 hours. €700 flat rate.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
              <button className="bg-white border-2 border-primary text-primary px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-primary hover:text-white flex items-center gap-2 sm:gap-3 group">
                  <span>Learn more</span>
                  <PixelIcon name="arrow-right" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </motion.div>
            </div>

            {/* Right Column: Auditor Cards Animation */}
            <div className="flex justify-start">
              <div 
                className="relative w-full max-w-md"
                style={{ perspective: "2000px" }}
              >
                <div className="relative h-[450px] flex items-center justify-start pl-8">
                  {visibleAuditors.map((auditor, auditorIndex) => {
                    const style = getCardStyle(auditorIndex, visibleAuditors.length);
                    
                    return (
                      <motion.div
                        key={auditor.location + auditor.region}
                        className="absolute cursor-pointer"
                        onClick={handleCardClick}
                        initial={false}
                        whileHover={{ scale: isFanned ? 1.05 : 1 }}
                        animate={{
                          x: style.x,
                          y: style.y,
                          rotateY: style.rotateY,
                          rotateZ: style.rotateZ,
                          scale: style.scale,
                          opacity: style.opacity,
                          zIndex: style.zIndex,
                        }}
                        transition={{
                          duration: 2.5,
                          delay: isFanned ? auditorIndex * 0.25 : (visibleAuditors.length - auditorIndex) * 0.08,
                          ease: [0.33, 1, 0.68, 1],
                          type: "tween",
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          willChange: "transform, opacity",
                        }}
                      >
                        <div
                          className={`relative w-[220px] h-[280px] sm:w-[260px] sm:h-[320px] lg:w-[105px] lg:h-[135px] xl:w-[300px] xl:h-[390px] 2xl:w-[360px] 2xl:h-[460px] 3xl:w-[400px] 3xl:h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${auditor.gradient}`}
                          style={{
                            boxShadow: `
                              0 25px 50px -12px rgba(0, 0, 0, 0.5),
                              0 0 30px rgba(236, 72, 153, 0.2)
                            `,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          
                          <div className="absolute inset-0 flex items-center justify-center pt-6 sm:pt-8 lg:pt-3 xl:pt-9 2xl:pt-11 3xl:pt-14">
                            <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] lg:w-[90px] lg:h-[90px] xl:w-[185px] xl:h-[185px] 2xl:w-[215px] 2xl:h-[215px] 3xl:w-[240px] 3xl:h-[240px] rounded-full overflow-hidden border-2 border-white/10">
                              <img
                                src={auditor.image}
                                alt={`Professional auditor from ${auditor.location}`}
                                className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                              />
                              <div 
                                className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
                                style={{
                                  background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                                }}
                              />
                            </div>
                          </div>

                          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-2 xl:bottom-7 2xl:bottom-9 3xl:bottom-14 left-0 right-0 flex justify-center px-4 sm:px-6 lg:px-2">
                            <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-6 lg:px-2 xl:px-8 2xl:px-10 py-2 sm:py-3 lg:py-1 xl:py-3.5 2xl:py-4 w-full">
                              <p className="text-white font-sans font-bold text-sm sm:text-base lg:text-[9px] xl:text-lg 2xl:text-2xl 3xl:text-3xl text-center">
                                {auditor.location}
                              </p>
                              <p className="text-white/80 font-sans text-xs sm:text-sm lg:text-[8px] xl:text-base 2xl:text-xl 3xl:text-2xl text-center">
                                {auditor.region}
                              </p>
                            </div>
                          </div>

                          <div 
                            className="absolute inset-0 pointer-events-none rounded-3xl"
                            style={{
                              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// Compliance Standards Grid with Modal
const ComplianceStandardsGrid = () => {
  const [selectedStandard, setSelectedStandard] = useState<any>(null);

  const standards = [
    {
      name: "ISO 9001",
      iconName: "trophy",
      description: "Quality Management System",
      details:
        "ISO 9001 is the international standard for quality management systems (QMS). It helps organizations ensure they meet customer and regulatory requirements while continuously improving processes and efficiency.",
      whyItMatters:
        "For procurement teams, ISO 9001 is the baseline proof that a supplier can run stable, repeatable processes and deliver consistent quality at scale.",
      services: [
        "On-site and remote ISO 9001 supplier audits",
        "Gap analysis against your internal quality requirements",
        "Verification of process documentation and KPIs",
        "Follow-up audits to confirm corrective actions",
      ],
      benefits: [
        {
          iconName: "checkbox-on",
          title: "Lower quality risk",
          description: "Reduce defects and rework by validating core quality controls before awarding business.",
        },
        {
          iconName: "analytics",
          title: "Comparable suppliers",
          description: "Standardized reports make it easy to compare suppliers across regions and categories.",
        },
        {
          iconName: "clock",
          title: "Faster approvals",
          description: "Shorten onboarding cycles with clear, audit-ready evidence for your stakeholders.",
        },
      ],
    },
    {
      name: "IATF 16949",
      iconName: "car",
      description: "Automotive Quality Standard",
      details:
        "IATF 16949 defines quality management system requirements for the automotive industry. It emphasizes defect prevention, reduction of variation and waste in the supply chain, and continuous improvement.",
      whyItMatters:
        "For automotive buyers, IATF 16949 is a non-negotiable requirement when qualifying critical component suppliers.",
      services: [
        "IATF 16949 readiness and surveillance audits",
        "Process walk-throughs on production lines and logistics",
        "Verification of control plans, PFMEAs and traceability",
        "Audits of tier‑2 and tier‑3 sub-suppliers where needed",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "OEM-ready evidence",
          description: "Provide audit documentation that satisfies OEM quality and launch teams.",
        },
        {
          iconName: "zap",
          title: "Issue detection early",
          description: "Identify systemic risks before SOP and avoid line-stops or recalls.",
        },
        {
          iconName: "factory",
          title: "Global coverage",
          description: "Verify automotive suppliers in established and emerging markets with one playbook.",
        },
      ],
    },
    {
      name: "AS9100",
      iconName: "plane",
      description: "Aerospace Quality Standard",
      details:
        "AS9100 is the quality management standard specifically written for the aerospace industry. It ensures high reliability, safety, and quality in aviation, space, and defense manufacturing.",
      whyItMatters:
        "Aerospace programs depend on extremely low failure rates; AS9100 audits provide confidence in suppliers handling critical components.",
      services: [
        "On-site AS9100 supplier and sub-tier audits",
        "Assessment of special processes and qualification records",
        "Review of configuration, change and document control",
        "Follow-up audits to track closure of major findings",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Safety assurance",
          description: "Strengthen safety cases with independent verification of supplier controls.",
        },
        {
          iconName: "target",
          title: "Program stability",
          description: "Reduce risk of delivery or quality disruption on long-running aerospace programs.",
        },
        {
          iconName: "globe",
          title: "Global sourcing",
          description: "Confidently source aerospace parts from new geographies with consistent audits.",
        },
      ],
    },
    {
      name: "ISO 14001",
      iconName: "leaf",
      description: "Environmental Management",
      details:
        "ISO 14001 provides a framework for environmental management systems. It helps organizations minimize their environmental impact, comply with regulations, and achieve sustainability goals.",
      whyItMatters:
        "Sustainability targets increasingly flow into supplier contracts; ISO 14001 audits show how suppliers manage emissions, waste and compliance.",
      services: [
        "Verification of environmental management systems on-site",
        "Assessment of waste, emissions and energy controls",
        "Review of legal compliance and reporting obligations",
        "ESG-focused supplier risk assessments",
      ],
      benefits: [
        {
          iconName: "leaf",
          title: "ESG alignment",
          description: "Connect supplier selection with your corporate sustainability and ESG goals.",
        },
        {
          iconName: "shield",
          title: "Regulatory confidence",
          description: "Reduce the risk of non-compliance fines through independent checks.",
        },
        {
          iconName: "analytics",
          title: "Comparable metrics",
          description: "Standardized findings make it easier to benchmark suppliers on sustainability.",
        },
      ],
    },
    {
      name: "GMP",
      iconName: "heart",
      description: "Good Manufacturing Practice",
      details:
        "GMP ensures products are consistently produced and controlled according to quality standards. It is critical for pharmaceutical, food, and medical device industries to ensure product safety and efficacy.",
      whyItMatters:
        "For regulated industries, GMP failures can immediately translate into patient, consumer and brand risk.",
      services: [
        "On-site GMP compliance audits for pharma, biotech and food",
        "Review of batch records, validations and cleanroom controls",
        "Verification of training records and SOP adherence",
        "Audit support before authority or customer inspections",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Patient safety",
          description: "Validate that critical controls work in practice, not just on paper.",
        },
        {
          iconName: "file",
          title: "Audit-ready files",
          description: "Generate structured documentation for regulatory and customer audits.",
        },
        {
          iconName: "clock",
          title: "Faster approvals",
          description: "Support faster tech transfers and supplier changes with clear evidence.",
        },
      ],
    },
    {
      name: "API Q1",
      iconName: "building",
      description: "Petroleum Quality Standard",
      details:
        "API Q1 is a quality management system specification for manufacturing organizations in the petroleum and natural gas industry, ensuring product integrity and safety throughout the supply chain.",
      whyItMatters:
        "Energy and oil and gas projects depend on reliable equipment; API Q1 audits help avoid critical failures in the field.",
      services: [
        "Supplier qualification audits for API Q1 facilities",
        "Verification of material traceability and welding procedures",
        "Review of design, testing and calibration controls",
        "Re-audits focused on closure of high-risk findings",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Field reliability",
          description: "Reduce unplanned downtime and HSE incidents on critical projects.",
        },
        {
          iconName: "globe",
          title: "Global qualification",
          description: "Qualify suppliers in key oil and gas hubs using one consistent standard.",
        },
        {
          iconName: "analytics",
          title: "Supplier rankings",
          description: "Compare manufacturers with clear, objective scoring frameworks.",
        },
      ],
    },
    {
      name: "SQF",
      iconName: "cutlery",
      description: "Safe Quality Food",
      details:
        "SQF (Safe Quality Food) is a rigorous food safety and quality management certification recognized by retailers and foodservice providers worldwide.",
      whyItMatters:
        "Food retailers and restaurants require SQF certification to list products; audits protect against recalls, contamination and supply disruption.",
      services: [
        "SQF readiness assessments and certification audits",
        "HACCP plan review and on-site verification",
        "Food safety culture evaluations",
        "Post-audit corrective action support",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Brand protection",
          description: "Reduce recall risk and demonstrate due diligence to customers.",
        },
        {
          iconName: "target",
          title: "Retailer acceptance",
          description: "Meet stringent listing requirements for major grocery and foodservice buyers.",
        },
        {
          iconName: "analytics",
          title: "Supply chain visibility",
          description: "Monitor ingredient and co-packer quality across multiple sites.",
        },
      ],
    },
    {
      name: "VDA 6.3",
      iconName: "car",
      description: "Process Audit Standard",
      details:
        "VDA 6.3 is a process audit standard developed by the German Association of the Automotive Industry (VDA) to evaluate the maturity and effectiveness of production processes in automotive supply chains.",
      whyItMatters:
        "German OEMs and tier‑1s require VDA 6.3 scores before awarding new business; strong results accelerate nominations and SOPs.",
      services: [
        "Full VDA 6.3 process audits with scoring",
        "Pre-audit gap analysis and improvement planning",
        "Verification of corrective actions from previous audits",
        "Training on VDA 6.3 requirements for supplier teams",
      ],
      benefits: [
        {
          iconName: "target",
          title: "OEM nomination",
          description: "Improve VDA scores to meet thresholds for new project awards.",
        },
        {
          iconName: "analytics",
          title: "Benchmark comparison",
          description: "Compare process maturity across plants and suppliers objectively.",
        },
        {
          iconName: "zap",
          title: "Continuous improvement",
          description: "Use structured findings to drive focused process optimization.",
        },
      ],
    },
    {
      name: "TS16949",
      iconName: "car",
      description: "Technical Specification",
      details:
        "TS16949 was the predecessor to IATF 16949 and remains referenced in legacy contracts. It established core automotive quality system requirements still relevant during transitions.",
      whyItMatters:
        "Older contracts and some markets still reference TS16949; audits clarify how legacy requirements map to current standards.",
      services: [
        "Legacy TS16949 verification and transition support",
        "Comparison audits mapping TS16949 to IATF 16949",
        "Documentation reviews for contract compliance",
        "Supplier development plans for standard upgrades",
      ],
      benefits: [
        {
          iconName: "file",
          title: "Contract clarity",
          description: "Clarify how historic TS16949 approvals map to current standards.",
        },
        {
          iconName: "analytics",
          title: "Portfolio harmonization",
          description: "Unify expectations across plants, regions and legacy contracts.",
        },
        {
          iconName: "shield",
          title: "Reduced ambiguity",
          description: "Avoid misunderstandings between OEM, tier‑1 and suppliers.",
        },
      ],
    },
    {
      name: "GDPR",
      iconName: "lock",
      description: "Data Protection Regulation",
      details:
        "GDPR is the EU data protection law that ensures personal data privacy and security. It mandates strict requirements for data collection, processing and storage.",
      whyItMatters:
        "Procurement increasingly works with SaaS and data processors; GDPR compliance is essential to avoid fines and reputational damage.",
      services: [
        "Vendor GDPR due diligence and documentation review",
        "Verification of technical and organizational measures (TOMs)",
        "Assessment of data processing agreements and sub-processors",
        "Follow-up reviews after major platform or scope changes",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Lower legal risk",
          description: "Independent verification reduces exposure to regulatory findings.",
        },
        {
          iconName: "lock",
          title: "Data trust",
          description: "Ensure critical supplier platforms handle customer and employee data correctly.",
        },
        {
          iconName: "analytics",
          title: "Clear accountability",
          description: "Document who is responsible for which part of the data flow.",
        },
      ],
    },
    {
      name: "SOC 2",
      iconName: "shield",
      description: "Security & Compliance",
      details:
        "SOC 2 is an auditing standard for service organizations that store customer data in the cloud. It ensures proper security, availability, processing integrity, confidentiality and privacy controls.",
      whyItMatters:
        "When you outsource critical processes to SaaS or managed services, SOC 2 reports give insight into how they manage risk.",
      services: [
        "Supplier SOC 2 report reviews and interpretation",
        "On-site or remote validation of key controls where needed",
        "Mapping SOC 2 findings to your internal risk framework",
        "Continuous monitoring plans for high-impact vendors",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Security assurance",
          description: "Validate that cloud and IT suppliers protect your data appropriately.",
        },
        {
          iconName: "analytics",
          title: "Actionable insight",
          description: "Translate technical reports into clear procurement recommendations.",
        },
        {
          iconName: "clock",
          title: "Faster sign-offs",
          description: "Give risk and IT stakeholders the evidence they need more quickly.",
        },
      ],
    },
    {
      name: "FDA",
      iconName: "building",
      description: "FDA Compliance",
      details:
        "FDA compliance ensures products meet US Food and Drug Administration regulations for safety, efficacy and quality. It is critical for pharmaceutical, medical device and food industries.",
      whyItMatters:
        "Selling into the US market requires confidence that suppliers can pass FDA inspections and maintain compliant operations.",
      services: [
        "Pre-FDA inspection readiness audits for suppliers",
        "Verification of quality systems, validation and documentation",
        "Review of change control, complaints and CAPA processes",
        "Follow-up audits after warning letters or major findings",
      ],
      benefits: [
        {
          iconName: "shield",
          title: "Market access",
          description: "Support safe entry or expansion in highly regulated US markets.",
        },
        {
          iconName: "file",
          title: "Inspection files",
          description: "Create structured, re-usable evidence packs for authorities and customers.",
        },
        {
          iconName: "clock",
          title: "Reduced disruption",
          description: "Limit operational impact when issues are identified and corrected early.",
        },
      ],
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {standards.map((standard, idx) => {
          return (
            <motion.button
              key={standard.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedStandard(standard)}
              className="group bg-[#ebebeb] rounded-[28px] p-6 hover:bg-[#e3e3e3] transition-colors duration-300 cursor-pointer w-full text-left"
            >
              {/* Icon - pixel art style */}
              <div className="w-12 h-12 mb-4">
                <PixelIcon name={standard.iconName} className="w-12 h-12" />
              </div>

              {/* Standard name */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {standard.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {standard.description}
              </p>

              {/* Click indicator */}
              <div className="text-xs font-medium text-primary flex items-center gap-1">
                Learn more
                <PixelIcon name="arrow-right" className="w-3 h-3" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Modal */}
      <ComplianceModal 
        standard={selectedStandard} 
        onClose={() => setSelectedStandard(null)} 
      />
    </>
  );
};

// Industry Use Cases Grid with Modal
const IndustryUseCasesGrid = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<IndustryUseCase | null>(null);

  const useCases: IndustryUseCase[] = [
    {
      image: industryAutomotive,
      title: "Automotive: PPAP Validation & Tool Audits",
      useCase: "Qualify a new Tier-2 supplier for precision parts in days, not weeks.",
      solutions: [
        "Complete First Article Inspection with automatic document creation",
        "Supplier development according to IATF 16949",
        "Automatic release process with ERP integration",
        "VDA 6.3 compliant process assessment"
      ],
      result: "Result: Qualification in 3 days instead of 3 weeks, complete PPAP documentation digitally available."
    },
    {
      image: industryAerospace,
      title: "Aerospace: AS9100 Compliance & Critical Process Validation",
      useCase: "Validate welding processes at suppliers of critical aircraft components.",
      solutions: [
        "Welding process qualification with complete documentation",
        "Material tracking and certificate tracking",
        "AS9100-compliant reporting",
        "Critical process parameter monitoring"
      ]
    },
    {
      image: industryMedical,
      title: "Pharma: GMP Audits & Clean Room Assessments",
      useCase: "GMP audit of an API manufacturer before contract signing.",
      solutions: [
        "Sterilization process validation with FDA-compliant documentation",
        "Clean Room assessment with automatic classification",
        "Change Control and deviation management",
        "Validation processes fully documented"
      ]
    },
    {
      image: industryCryogenicValve,
      title: "Chemical & Process Industry: REACH Compliance & Process Safety",
      useCase: "Safety assessment of chemical plants with comprehensive risk evaluation.",
      solutions: [
        "Plant safety inspection with automatic risk assessment",
        "Environmental audits and REACH compliance check",
        "Action tracking with deadline monitoring",
        "Process safety according to COMAH/Seveso"
      ]
    }
  ];

  return (
    <section 
      data-nav-theme="light" 
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="section-headline text-foreground max-w-2xl">
            Industry specific use cases
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {useCases.map((industry, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedUseCase(industry)}
              className="group bg-[#ebebeb] rounded-[28px] overflow-hidden hover:bg-[#e3e3e3] transition-all duration-300 cursor-pointer text-left flex flex-col h-full"
            >
              {/* Image - Unified size with consistent fill */}
              <div className="relative overflow-hidden aspect-square flex-shrink-0 bg-white rounded-t-[28px]">
                <img 
                  src={industry.image} 
                  alt={industry.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content - Flex grow for equal heights */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight line-clamp-2">
                  {industry.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{industry.useCase}</p>
                
                <ul className="space-y-1.5 mb-4 flex-grow">
                  {industry.solutions.slice(0, 3).map((item, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Click indicator - Always at bottom */}
                <div className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-2 border-t border-foreground/10">
                  View details
                  <PixelIcon name="arrow-right" className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <IndustryUseCaseModal 
        useCase={selectedUseCase} 
        onClose={() => setSelectedUseCase(null)} 
      />
    </section>
  );
};

// Challenge Toggle Section
const ChallengeToggleSection = () => {
  const [isWithScanPro, setIsWithScanPro] = useState(false);

  const withScanProContent = [
    {
      icon: "checkbox-on",
      title: "Fixed Price from €700",
      description: "Transparent pricing with no hidden costs"
    },
    {
      icon: "zap",
      title: "Same-Day / Next-Day",
      description: "Ultra-fast deployment within 24 hours"
    },
    {
      icon: "calendar",
      title: "1-3 Days Structured",
      description: "Efficient on-site audits with AI workflows"
    },
    {
      icon: "analytics",
      title: "Real-time + Report in 24h",
      description: "Live insights with next-day documentation"
    },
    {
      icon: "checkbox-on",
      title: "100% Standardized",
      description: "AI-supported consistency across all audits"
    },
    {
      icon: "camera",
      title: "AI Computer Vision",
      description: "Advanced equipment recognition"
    },
  ];

  const traditionalContent = [
    {
      icon: "coin",
      title: "€15,000 - €25,000",
      description: "Unpredictable costs with hidden fees"
    },
    {
      icon: "clock",
      title: "2-3 Weeks Lead Time",
      description: "Long delays before audit starts"
    },
    {
      icon: "close",
      title: "3-5 Days On-site",
      description: "Extended audit disrupts operations"
    },
    {
      icon: "alert",
      title: "5-10 Days After Audit",
      description: "Delayed reporting slows decisions"
    },
    {
      icon: "close",
      title: "Depends on Auditor",
      description: "Quality varies between auditors"
    },
    {
      icon: "alert",
      title: "Manual, Often Incomplete",
      description: "Missing photos and documentation gaps"
    },
  ];

  const currentContent = isWithScanPro ? withScanProContent : traditionalContent;

  return (
    <section 
      data-nav-theme="light"
      className="py-24 md:py-32 bg-white"
      id="challenge"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-headline">
              <span className="text-foreground">{isWithScanPro ? 'With' : 'Traditional'}</span>{" "}
              <span className={isWithScanPro ? 'text-primary' : 'text-destructive'}>
                {isWithScanPro ? 'ScanPro+' : 'Providers'}
              </span>
            </h2>
          </motion.div>

          {/* Toggle Switch */}
          <button
            onClick={() => setIsWithScanPro(!isWithScanPro)}
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
              isWithScanPro ? 'bg-primary' : 'bg-destructive'
            }`}
            aria-label="Toggle comparison"
          >
            <motion.div
              className="absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full"
              animate={{ x: isWithScanPro ? 32 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          {isWithScanPro 
            ? "Experience transparent pricing, rapid deployment, and AI-powered standardization."
            : "Traditional audits: unpredictable costs, long delays, and inconsistent quality."}
        </p>

        {/* Grid - Homepage Card Style */}
        <motion.div
          key={isWithScanPro ? 'with' : 'traditional'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {currentContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
                <PixelIcon 
                  name={item.icon} 
                  className="w-6 h-6"
                  color={isWithScanPro ? 'hsl(var(--primary))' : 'hsl(0, 84%, 60%)'}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

const fallbackAuditors = [
  { image: auditorEuropean, location: "Europe", region: "Central Europe", gradient: "from-gray-700 via-gray-800 to-gray-900", gender: "male" },
  { image: auditorAsian, location: "Asia", region: "East Asia Pacific", gradient: "from-accent via-secondary to-secondary", gender: "male" },
  { image: auditorLatin, location: "Americas", region: "North & South", gradient: "from-gray-700 via-gray-800 to-gray-900", gender: "male" },
  { image: auditorMiddleEast, location: "Middle East", region: "Gulf Region", gradient: "from-accent via-secondary to-secondary", gender: "male" },
  { image: auditorFemaleEuropean, location: "Europe", region: "Western Europe", gradient: "from-gray-800 via-gray-900 to-black", gender: "female" },
  { image: auditorFemaleAsian, location: "Asia", region: "Southeast Asia", gradient: "from-gray-800 via-gray-900 to-black", gender: "female" },
];

// How Does YVOO Work Carousel - Card Design with Original Visuals
const HowItWorksCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      number: "01",
      title: "Place an Audit Request with 1 Click",
      description: "Easily schedule a supplier audit through YVOO's platform or integrate it with your ERP system. With just a click, you can request an audit, making the process hassle-free.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8">
          {/* 3D Earth */}
          <div className="relative w-full max-w-[180px] sm:max-w-[350px] md:max-w-[450px] h-[140px] sm:h-[280px] md:h-[360px]">
            <Earth3D width="100%" height="100%" showPins={false} />
            
            {/* Green Location Marker */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute"
              style={{ top: '30%', left: '70%' }}
            >
              <div className="w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-primary border-2 border-white shadow-lg" />
              <div className="absolute inset-0 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-primary animate-ping opacity-40" />
            </motion.div>
            
            {/* 1-Click Button */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute"
              style={{ top: '32%', left: '73%' }}
            >
              <div className="bg-primary text-primary-foreground px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full flex items-center gap-1 sm:gap-2 shadow-xl">
                <PixelIcon name="cursor" className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-[10px] sm:text-sm md:text-base lg:text-lg whitespace-nowrap">1-Click</span>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      number: "02",
      title: "Auto-Dispatch to Local Auditors",
      description: "YVOO automatically assigns certified auditors from our global network to your supplier location. Geo-locator technology ensures local expertise, ensuring accurate results.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8">
          <div className="relative w-full max-w-[180px] sm:max-w-[350px] md:max-w-[450px] h-[140px] sm:h-[280px] md:h-[360px]">
            <Earth3D width="100%" height="100%" showPins={true} />
          </div>
        </div>
      )
    },
    {
      number: "03",
      title: "Monitor Audits in Real-Time",
      description: "Stay updated with real-time tracking of your audit process. Communicate directly with auditors for transparency and receive notifications for key audit milestones.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8">
          {/* Chat Interface */}
          <div className="bg-[#ebebeb] rounded-xl sm:rounded-[28px] p-4 sm:p-6 md:p-8 w-full max-w-[200px] sm:max-w-[320px] md:max-w-[380px] h-[200px] sm:h-[320px] md:h-[400px] relative z-10 flex flex-col justify-center gap-4">
            {/* User Message */}
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <PixelIcon name="message" className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="bg-primary text-primary-foreground px-3 py-2 sm:px-4 sm:py-3 rounded-2xl rounded-tl-none flex-1">
                <p className="text-xs sm:text-sm font-bold mb-2">You</p>
                <div className="space-y-2">
                  <motion.div 
                    animate={{ width: ["0%", "80%", "80%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                    className="h-2 sm:h-3 bg-primary-foreground/50 rounded"
                  />
                  <motion.div 
                    animate={{ width: ["0%", "100%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.8, 1], delay: 0.2 }}
                    className="h-2 sm:h-3 bg-primary-foreground/50 rounded"
                  />
                </div>
              </div>
            </div>
            
            {/* Auditor Message */}
            <div className="flex items-start gap-2 sm:gap-3 justify-end">
              <div className="bg-primary/80 text-primary-foreground px-3 py-2 sm:px-4 sm:py-3 rounded-2xl rounded-tr-none flex-1">
                <p className="text-xs sm:text-sm font-bold mb-2">Auditor</p>
                <div className="space-y-2">
                  <motion.div 
                    animate={{ width: ["0%", "90%", "90%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1], delay: 0.5 }}
                    className="h-2 sm:h-3 bg-primary-foreground/50 rounded"
                  />
                  <motion.div 
                    animate={{ width: ["0%", "100%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.8, 1], delay: 0.7 }}
                    className="h-2 sm:h-3 bg-primary-foreground/50 rounded"
                  />
                </div>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary/60 flex items-center justify-center flex-shrink-0">
                <PixelIcon name="user" className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
            
            {/* Status Icons */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <PixelIcon name="checkbox-on" className="w-5 h-5 sm:w-7 sm:h-7" color="hsl(var(--primary))" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/60 flex items-center justify-center"
              >
                <PixelIcon name="message" className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: "04",
      title: "Receive Complete Reports",
      description: "Get comprehensive audit reports with AI-powered insights, photographic evidence, and actionable recommendations delivered within 24 hours of audit completion.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-6 md:p-8">
          <div className="bg-[#ebebeb] rounded-xl sm:rounded-[28px] p-4 sm:p-6 md:p-8 w-full max-w-[200px] sm:max-w-[320px] md:max-w-[380px] h-[200px] sm:h-[320px] md:h-[400px] flex flex-col justify-center gap-3">
            {/* Report Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center justify-center">
                  <PixelIcon name="analytics" className="w-10 h-10 sm:w-14 sm:h-14" color="hsl(var(--primary))" />
                </div>
                <div className="flex items-center justify-center">
                  <PixelIcon name="checkbox-on" className="w-12 h-12 sm:w-18 sm:h-18" color="hsl(var(--primary))" />
                </div>
              </div>
              
              {/* Report Lines */}
              <div className="space-y-2">
                <div className="h-2 sm:h-3 bg-border rounded w-full"></div>
                <div className="h-2 sm:h-3 bg-border rounded w-5/6"></div>
                <div className="h-2 sm:h-3 bg-border rounded w-4/6"></div>
              </div>
            </motion.div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-primary/10 rounded-xl p-3 sm:p-4 text-center"
              >
                <div className="text-2xl sm:text-3xl font-black text-primary mb-2">95%</div>
                <div className="h-1 bg-border rounded mx-auto w-12"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-primary/5 rounded-xl p-3 sm:p-4 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary/80 mb-2">A+</div>
                <div className="h-1 bg-border rounded mx-auto w-12"></div>
              </motion.div>
            </div>
            
            {/* Chart Bars */}
            <div className="flex items-end gap-2 h-12 sm:h-20 mb-3">
              {[60, 80, 95, 70].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className={`rounded-t flex-1 ${
                    i % 2 === 0 ? 'bg-primary' : 'bg-primary/60'
                  }`}
                ></motion.div>
              ))}
            </div>
            
            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-primary text-primary-foreground px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-center font-bold flex items-center justify-center gap-2 sm:gap-3"
            >
              <PixelIcon name="shield" className="w-4 h-4 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base">Report Ready</span>
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  // Touch swipe handlers
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextStep();
    }
    if (touchStart - touchEnd < -75) {
      prevStep();
    }
  };

  return (
    <section 
      data-nav-theme="light"
      className="relative py-12 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Homepage Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="section-headline text-foreground">
            How does YVOO work
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mt-4">
            Four simple steps to transform your supplier audit process
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            className="overflow-x-hidden overflow-y-visible pb-0 sm:pb-20 md:pb-24"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div 
              className="flex transition-transform duration-500 ease-out"
              animate={{ x: `-${currentStep * 100}%` }}
            >
              {steps.map((step, index) => (
                <div key={index} className="w-full flex-shrink-0 px-0 md:px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-visible mx-auto max-w-6xl h-[480px] sm:h-auto"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center overflow-visible h-full">
                      {/* Left Side - Visual */}
                      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-l-2xl sm:rounded-l-3xl p-3 sm:p-8 md:p-8 min-h-[200px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-visible">
                        {step.visual}
                        
                        <div className="absolute top-1 sm:top-4 left-1 sm:left-4 text-[40px] sm:text-[80px] font-bold text-[#A8C5B8]/10 leading-none">
                          {step.number}
                        </div>
                      </div>

                      {/* Right Side - Content */}
                      <div className="p-4 sm:p-8 md:p-12">
                        <span className="inline-block px-2 sm:px-4 py-0.5 sm:py-1.5 bg-[#A8C5B8]/20 text-[#A8C5B8] rounded-full text-[10px] sm:text-sm font-black mb-2 sm:mb-4 md:mb-6 shadow-sm">
                          Step {step.number}
                        </span>
                        
                        <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 md:mb-6 leading-tight">
                          {step.title}
                        </h3>
                        
                        <p className="text-xs sm:text-base md:text-lg text-gray-600 leading-snug sm:leading-relaxed mb-3 sm:mb-6 md:mb-8">
                          {step.description}
                        </p>

                        <p className="text-xs sm:text-base text-gray-700">
                          {index === 0 && "Quick integration with ERP systems"}
                          {index === 1 && "Global network of certified auditors"}
                          {index === 2 && "Direct communication channel"}
                          {index === 3 && "AI-powered insights and analytics"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-10 md:mt-12">
            <button
              onClick={prevStep}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ebebeb] hover:bg-[#e3e3e3] transition-all hover:scale-110 flex items-center justify-center text-foreground"
              aria-label="Previous step"
            >
              <PixelIcon name="arrow-right" className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                >
                  <div className={`transition-all ${
                    index === currentStep
                      ? 'w-10 sm:w-12 h-2.5 sm:h-3 bg-primary rounded-full'
                      : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-border rounded-full hover:bg-primary/50'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#ebebeb] hover:bg-[#e3e3e3] transition-all hover:scale-110 flex items-center justify-center text-foreground"
              aria-label="Next step"
            >
              <PixelIcon name="arrow-right" className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScanProPlus = () => {
  const isMobile = useIsMobile();
  const [auditors, setAuditors] = useState(fallbackAuditors);
  
  // Fetch auditor cards from CMS
  const { data: auditorCards } = useContentByType("auditor_card");
  
  // Process auditor cards
  useEffect(() => {
    const processAuditorCards = async () => {
      if (!auditorCards || auditorCards.length === 0) {
        setAuditors(fallbackAuditors);
        return;
      }

      const processedAuditors = await Promise.all(
        auditorCards.map(async (card, index) => {
          let imageUrl = fallbackAuditors[index]?.image;
          
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
              console.error("Error fetching auditor image:", error);
            }
          }

          return {
            image: imageUrl,
            location: card.title || fallbackAuditors[index]?.location || "Location",
            region: card.body?.content || fallbackAuditors[index]?.region || "Region",
            gradient: fallbackAuditors[index % fallbackAuditors.length].gradient,
            gender: fallbackAuditors[index % fallbackAuditors.length].gender
          };
        })
      );

      setAuditors(processedAuditors.length > 0 ? processedAuditors : fallbackAuditors);
    };

    processAuditorCards();
  }, [auditorCards]);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const features = [
    {
      label: "Flexible Templates",
      title: "Create custom frameworks per industry, standard or customer requirement.",
      image: scanProDashboard,
    },
    {
      label: "AI Guidance",
      title: "Contextual hints during audits to ensure completeness and objectivity.",
      image: aiCopilot,
    },
    {
      label: "Equipment Intelligence",
      title: "Identify machines and assets from photos; assess condition and compliance.",
      image: aiInspector,
    },
    {
      label: "Dynamic Scoring",
      title: "Configurable weightings and 1–5 scoring for transparent results.",
      image: riskScoring,
    },
    {
      label: "Evidence Handling",
      title: "Auto-categorize photos & files (quality, safety, environment) for traceability.",
      image: aiAudit,
    },
    {
      label: "Real-Time Progress",
      title: "Live milestones and alerts during audits for fast course-corrections.",
      image: liveTracking,
    },
    {
      label: "Predictive Risk Scoring",
      title: "Anticipate issues from historical patterns and equipment signals.",
      image: riskScoring,
    },
    {
      label: "Corrective Action Tracking",
      title: "Monitor improvements with reminders and due-dates.",
      image: oneClickDispatch,
    },
    {
      label: "Integrations",
      title: "ERP/QMS connectors (SAP, Oracle, Dynamics, Trackwise, MasterControl, ETQ).",
      image: scanProDashboard,
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Dark Background like ensun.io */}
      <section
        data-nav-theme="hero"
        className="relative min-h-screen flex flex-col overflow-hidden bg-[#0A0A0A]"
        id="hero"
      >

        {/* Main Content - Centered like ensun.io */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 pt-24 lg:pt-32 pb-8">
            
            {/* Two Column Layout - ensun.io style */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Column - Content */}
              <div className="text-left">
                
                {/* Main Heading - ensun.io style with line breaks */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight mb-8 font-semibold"
                >
                  <span className="text-primary">Supplier Audits</span>
                  <br />
                  <span className="text-white">in days, not weeks.</span>
                </motion.h1>

                {/* Vertical checkmark list - ensun.io style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col gap-3 mb-10"
                >
                  {[
                    "On-site audits from €700",
                    "2,000+ certified auditors",
                    "90+ countries covered"
                  ].map((text, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/80">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-base font-medium">{text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <button 
                    onClick={() => scrollToSection('cta')}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 text-base text-foreground bg-primary hover:bg-primary/90"
                  >
                    Get Started
                  </button>
                </motion.div>
              </div>

              {/* Right Column - Hero Image with Ellipse Clip (About Us style) */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden lg:block relative"
              >
                <div 
                  className="relative h-[500px] xl:h-[550px] overflow-hidden rounded-2xl"
                  style={{ clipPath: 'ellipse(100% 100% at 100% 50%)' }}
                >
                  <img 
                    src={scanProHeroAuditor} 
                    alt="Professional auditor in factory" 
                    className="w-full h-full object-cover object-center brightness-95"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0A7FA5]/20 pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </section>

      {/* ROI Calculator - Visible on Mobile */}
      <div className="lg:hidden px-4 sm:px-6 py-6 sm:py-8 bg-white">
        <HeroROICalculator />
      </div>

      {/* Challenge & Solution - Toggle Section */}
      <ChallengeToggleSection />

      {/* Auditor Network Section */}
      {isMobile ? <MobileFeaturesSection auditors={auditors} /> : <DesktopFeaturesSection auditors={auditors} scrollToSection={scrollToSection} />}

      {/* Capabilities Section */}
      <section 
        data-nav-theme="light" 
        className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-white"
        id="capabilities"
      >
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 px-4 sm:px-6 lg:px-12 xl:px-24"
          >
            <h2 className="section-headline text-foreground max-w-2xl mb-2">
              Capabilities that modernize supplier audits
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              Nine AI-driven features for consistent, actionable outcomes.
            </p>
          </motion.div>

          <InfiniteScrollingGallery />
        </div>
      </section>

      {/* How Does YVOO Work Carousel */}
      <HowItWorksCarousel />


      {/* Results Section - Homepage Style */}
      <section 
        data-nav-theme="light" 
        className="py-24 md:py-32 bg-white"
        id="results"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <h2 className="section-headline text-foreground max-w-2xl">
              Business impact, measured results
            </h2>
          </motion.div>

          {/* Stats Section - Dark Homepage Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#1a1a1a] rounded-[32px] p-12 lg:p-16 mb-12"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                { value: '60%', label: 'Cost Reduction' },
                { value: '70%', label: 'Time Savings' },
                { value: '96%', label: 'Price Transparency' },
                { value: '48h', label: 'Rapid Deployment' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chart Grid - Homepage Card Style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            
            {/* Cost Comparison Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">Cost Comparison</h3>
              <p className="text-muted-foreground text-base mb-6">Traditional vs ScanPro+ per audit</p>
              
              <BusinessImpactChart />
            </motion.div>

            {/* ROI Timeline Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">Cumulative Savings</h3>
              <p className="text-muted-foreground text-base mb-6">12-month projection (20 audits/year)</p>
              
              <ROITimelineChart />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
          >
            <h3 className="text-xl font-semibold text-foreground mb-3">Time-to-Audit Comparison</h3>
            <p className="text-muted-foreground text-base mb-6">End-to-end audit process duration</p>
            
            <TimeEfficiencyChart />
          </motion.div>

        </div>
      </section>

      {/* Industry Use Cases - Homepage Style */}
      <IndustryUseCasesGrid />

      {/* Compliance Standards - Homepage Style */}
      <section 
        data-nav-theme="light" 
        className="py-24 md:py-32 bg-white"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <h2 className="section-headline text-foreground max-w-2xl mb-6">
              Compliance & supported standards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              YVOO ScanPro+ meets the highest international quality and safety standards. 
              Your audits are legally secure and comply with all industry-specific requirements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-base font-medium text-foreground mb-3">
              Our auditor network includes professionals certified by:
            </p>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span>TÜV SÜD</span>
              <span className="text-border">•</span>
              <span>Bureau Veritas</span>
              <span className="text-border">•</span>
              <span>SGS</span>
              <span className="text-border">•</span>
              <span>DNV</span>
            </div>
          </motion.div>
          
          <ComplianceStandardsGrid />
        </div>
      </section>

      {/* Global Network - Homepage Style */}
      <section 
        data-nav-theme="light" 
        className="py-24 md:py-32 bg-background"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <h2 className="section-headline text-foreground max-w-2xl">
              Global network & integration
            </h2>
          </motion.div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {/* ERP Integration Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">ERP Integration</h3>
              <div className="space-y-4">
                {[
                  { title: 'SAP Integration', desc: 'Supplier Evaluation & Release' },
                  { title: 'Oracle', desc: 'Seamless ERP connectivity' },
                  { title: 'Microsoft Dynamics', desc: 'Full system integration' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <PixelIcon name="arrow-right" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Global Network Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">Global Network</h3>
              <div className="space-y-4">
                {[
                  { title: 'On-Demand Availability', desc: 'Same-Day audits worldwide' },
                  { title: 'Smart Matching', desc: 'Optimal auditor selection' },
                  { title: 'Quality Assured', desc: 'Rating system & tracking' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <PixelIcon name="arrow-right" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Dark Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#1a1a1a] rounded-[32px] p-12 lg:p-16"
          >
            <h3 className="text-2xl md:text-3xl text-white mb-4">
              <span className="font-semibold">Available</span>{" "}
              <span className="font-normal text-white/60">in 47 Countries</span>
            </h3>
            <p className="text-white/60 text-lg mb-8 max-w-2xl">
              Need an audit in Shanghai? Book directly a local, ISO-certified auditor with experience in your industry – available within 24 hours.
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-foreground font-medium rounded-full hover:bg-white/90 transition-all duration-300">
              Find Your Auditor Now
              <PixelIcon name="arrow-right" className="w-5 h-5" color="currentColor" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Homepage Style */}
      <section 
        data-nav-theme="light" 
        className="py-24 md:py-32 bg-background"
        id="cta"
      >
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Mixed weight heading */}
            <h2 className="section-headline text-foreground mb-6 max-w-2xl mx-auto">
              Ready to transform your supplier audits?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              Join leading companies from Automotive, Aerospace, and Pharma who already trust YVOO ScanPro+.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium inline-flex items-center gap-2">
                Order Audit
                <PixelIcon name="arrow-right" className="w-4 h-4" />
              </button>
              <button 
                className="border border-border text-foreground hover:bg-muted rounded-full px-8 py-6 text-base font-medium"
                onClick={() => window.open('https://calendly.com/yvoo/demo-yvoo', '_blank')}
              >
                Book a Demo
              </button>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 pt-8 border-t border-border"
            >
              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <span>No setup fees</span>
                <span>Pay per audit</span>
                <span>24/7 Support</span>
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ScanProPlus;
