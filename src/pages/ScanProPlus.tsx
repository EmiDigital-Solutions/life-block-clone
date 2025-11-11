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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, CheckCircle2, AlertTriangle, Target, Zap, Camera, BarChart3, Shield, TrendingUp, Globe, Link as LinkIcon, DollarSign, Calendar, CheckCheck, Search, Eye, Car, Plane, Pill, Factory, Rocket, Mail, Phone, MessageCircle, Clock, X, Mouse, UserCheck, Star, FileCheck, Lock, Award, CircleCheck, Building2, Leaf, ShieldCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import scanProDashboard from "@/assets/scanpro-ai-dashboard.jpg";
import aiAudit from "@/assets/ai-audit-inspection.jpg";
import aiCopilot from "@/assets/ai-copilot-analysis.jpg";
import aiInspector from "@/assets/ai-inspector-tech.jpg";
import riskScoring from "@/assets/risk-scoring-ai.jpg";
import liveTracking from "@/assets/live-tracking-dashboard.jpg";
import oneClickDispatch from "@/assets/one-click-dispatch.jpg";
import factoryHero from "@/assets/factory-hero-background.jpg";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorMapPin from "@/assets/auditor-map-pin.png";
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
      className="relative py-12 sm:py-16 md:py-20"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
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
                  background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)',
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
                    <stop offset="0%" style={{ stopColor: '#14B8A6', stopOpacity: 0 }} />
                    <stop offset="50%" style={{ stopColor: '#14B8A6', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#14B8A6', stopOpacity: 0 }} />
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
                    className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden w-[140px]"
                    whileHover={{
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
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
                    <div className="p-2.5 bg-white">
                      <h4 className="font-bold text-xs text-gray-900 mb-0.5 leading-tight">{auditor.name}</h4>
                      <p className="text-[9px] text-gray-500 mb-1.5 leading-tight">{auditor.title}</p>
                      <p className="text-[9px] text-gray-600 mb-1.5">{auditor.location}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[9px] font-semibold text-gray-900">{auditor.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null;
            })}
          </AnimatePresence>

          <div className="relative z-30">

            {/* Left Column: Text Content */}
            <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-left max-w-2xl bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">ScanPro+</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight break-words"
              >
                Global On-Demand<br /><span style={{ color: '#14B8A6' }}>Auditor Network</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
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
                <p className="text-base font-semibold text-gray-700 mb-2">
                  Our auditor network includes professionals certified by:
                </p>
                <div className="flex flex-wrap items-center gap-3 text-gray-600">
                  <span className="text-sm">TÜV SÜD</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm">Bureau Veritas</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm">SGS</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm">DNV</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <button className="bg-white border-2 border-gray-900 text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-gray-900 hover:text-white flex items-center gap-2 sm:gap-3 group">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
};

// Desktop Capabilities Section with Scroll Effect
const DesktopCapabilitiesSection = ({ features }: { features: any[] }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const cardWidth = 340;
  const gap = 20;
  const numCards = features.length;
  const totalCardsWidth = (cardWidth * numCards) + (gap * (numCards - 1));
  const scrollDistance = -(totalCardsWidth - cardWidth - 50);
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scrollDistance]
  );

  return (
    <section 
      ref={sectionRef}
      data-nav-theme="light"
      className="relative h-auto lg:h-[120vh]"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
      id="capabilities"
    >
      <div className="lg:sticky top-0 h-auto lg:h-screen overflow-hidden flex flex-col justify-center py-8 sm:py-10 md:py-12">
        {/* Features Header */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6 px-4 flex-shrink-0">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 text-gray-900"
          >
            Capabilities that modernize supplier audits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto"
          >
            Nine AI-driven features for consistent, actionable outcomes.
          </motion.p>
        </div>

        <div className="flex-1 overflow-x-auto lg:overflow-hidden relative">
          <div className="h-full flex items-center">
            <motion.div 
              style={{ x }}
              className="flex gap-4 sm:gap-5 lg:gap-5 xl:gap-6 pl-4 sm:pl-6 md:pl-8 pr-4 sm:pr-6 md:pr-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-200px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px] h-[420px] sm:h-[450px] md:h-[480px] flex-shrink-0"
                >
                  {/* Clean white card matching reference */}
                  <div className="h-full bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden p-5 sm:p-6 md:p-8 flex flex-col">
                    
                    {/* Teal label */}
                    <div className="mb-4 flex-shrink-0">
                      <span className="text-[#14B8A6] text-sm font-semibold">
                        {feature.label}
                      </span>
                    </div>

                    {/* Bold title/description */}
                    <h3 className="text-gray-900 text-base sm:text-lg md:text-xl font-bold mb-5 sm:mb-6 md:mb-8 leading-tight flex-shrink-0 min-h-[100px] sm:min-h-[110px] md:min-h-[120px]">
                      {feature.title}
                    </h3>

                    {/* Large image with rounded corners */}
                    <div className="relative w-full flex-1 rounded-2xl overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
        className="absolute inset-0 rounded-full bg-[#14B8A6]"
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
        className="w-5 h-5 rounded-full bg-[#14B8A6] border-3 border-white shadow-xl relative z-10"
        whileHover={{ scale: 1.4 }}
        transition={{ duration: 0.2 }}
        style={{
          boxShadow: '0 4px 12px rgba(20, 184, 166, 0.6)'
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
            <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl min-w-[180px] border border-gray-700">
              <p className="font-bold text-sm whitespace-nowrap">{name}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                <p className="text-xs text-gray-300 font-medium">{availability}</p>
              </div>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gray-900" />
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
                <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">01 Feature</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight break-words"
              >
                Global On-Demand <span style={{ color: '#14B8A6' }} className="whitespace-nowrap">Auditor Network</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
              >
                Certified auditors in 90+ countries. On-site within 48 hours. €700 flat rate.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <button className="bg-white border-2 border-gray-900 text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-gray-900 hover:text-white flex items-center gap-2 sm:gap-3 group">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
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
      icon: Award,
      colorClass: "from-blue-600 to-blue-700",
      description: "Quality Management System",
      details: "ISO 9001 is the international standard for quality management systems (QMS). It helps organizations ensure they meet customer and regulatory requirements while continuously improving processes and efficiency."
    },
    {
      name: "IATF 16949",
      icon: Car,
      colorClass: "from-gray-700 to-gray-800",
      description: "Automotive Quality Standard",
      details: "IATF 16949 defines quality management system requirements for the automotive industry. It emphasizes defect prevention, reduction of variation and waste in the supply chain, and continuous improvement."
    },
    {
      name: "AS9100",
      icon: Plane,
      colorClass: "from-blue-500 to-blue-600",
      description: "Aerospace Quality Standard",
      details: "AS9100 is the quality management standard specifically written for the aerospace industry. It ensures high reliability, safety, and quality in aviation, space, and defense manufacturing."
    },
    {
      name: "ISO 14001",
      icon: Leaf,
      colorClass: "from-[#14B8A6] to-[#0D9488]",
      description: "Environmental Management",
      details: "ISO 14001 provides a framework for environmental management systems. It helps organizations minimize their environmental impact, comply with regulations, and achieve sustainability goals."
    },
    {
      name: "GMP",
      icon: Pill,
      colorClass: "from-gray-600 to-gray-700",
      description: "Good Manufacturing Practice",
      details: "GMP ensures products are consistently produced and controlled according to quality standards. Critical for pharmaceutical, food, and medical device industries to ensure product safety and efficacy."
    },
    {
      name: "API Q1",
      icon: Factory,
      colorClass: "from-blue-700 to-blue-800",
      description: "Petroleum Quality Standard",
      details: "API Q1 is a quality management system specification for manufacturing organizations in the petroleum and natural gas industry, ensuring product integrity and safety throughout the supply chain."
    },
    {
      name: "SQF",
      icon: CheckCircle2,
      colorClass: "from-[#14B8A6] to-[#0D9488]",
      description: "Food Safety Quality",
      details: "Safe Quality Food (SQF) is a rigorous food safety and quality program recognized by retailers and food service providers worldwide, ensuring products meet the highest safety standards."
    },
    {
      name: "VDA 6.3",
      icon: Target,
      colorClass: "from-gray-800 to-gray-900",
      description: "Automotive Process Audit",
      details: "VDA 6.3 is a process audit methodology developed by the German automotive industry. It evaluates process quality and identifies potential failures before they occur in production."
    },
    {
      name: "TS16949",
      icon: Car,
      colorClass: "from-blue-600 to-blue-700",
      description: "Technical Specification",
      details: "TS16949 (now IATF 16949) was the technical specification for quality management in the automotive supply chain, focusing on continuous improvement and defect prevention."
    },
    {
      name: "GDPR",
      icon: Lock,
      colorClass: "from-gray-700 to-gray-900",
      description: "Data Protection Regulation",
      details: "GDPR is the EU's comprehensive data protection law that ensures personal data privacy and security. It mandates strict requirements for data collection, processing, and storage."
    },
    {
      name: "SOC 2",
      icon: ShieldCheck,
      colorClass: "from-[#14B8A6] to-[#0D9488]",
      description: "Security & Compliance",
      details: "SOC 2 is an auditing standard for service organizations that store customer data in the cloud. It ensures proper security, availability, processing integrity, confidentiality, and privacy controls."
    },
    {
      name: "FDA",
      icon: Building2,
      colorClass: "from-blue-500 to-blue-700",
      description: "FDA Compliance",
      details: "FDA compliance ensures products meet US Food and Drug Administration regulations for safety, efficacy, and quality. Critical for pharmaceutical, medical device, and food industries."
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {standards.map((standard, idx) => {
          const Icon = standard.icon;
          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedStandard(standard)}
              className="group relative bg-white rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer aspect-square md:aspect-auto flex flex-col items-center justify-center"
            >
              {/* Icon with gradient background */}
              <div className={`mb-2 sm:mb-4 mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${standard.colorClass}`}>
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>

              {/* Standard name */}
              <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 text-center">
                {standard.name}
              </h3>

              {/* Description */}
              <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 text-center line-clamp-2">
                {standard.description}
              </p>

              {/* Click indicator */}
              <div className="text-[10px] sm:text-xs font-semibold text-[#14B8A6] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                Click to learn more
                <ArrowRight className="w-3 h-3" />
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-3xl border-2 border-[#14B8A6] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.button>
          );
        })}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedStandard} onOpenChange={() => setSelectedStandard(null)}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl">
          {selectedStandard && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${selectedStandard.colorClass}`}>
                    {React.createElement(selectedStandard.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      {selectedStandard.name}
                    </DialogTitle>
                    <p className="text-sm font-semibold text-[#14B8A6] mt-1">
                      {selectedStandard.description}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              <DialogDescription className="text-base text-gray-700 leading-relaxed">
                {selectedStandard.details}
              </DialogDescription>
              <div className="mt-6 p-4 bg-[#14B8A6]/5 rounded-xl border border-[#14B8A6]/20">
                <p className="text-sm text-gray-700">
                  <strong className="text-gray-900">✓ YVOO ScanPro+</strong> ensures full compliance with {selectedStandard.name} through our standardized audit processes, comprehensive documentation, and AI-powered verification systems.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};


// Mobile Capabilities Section
const MobileCapabilitiesSection = ({ features }: { features: any[] }) => {
  return (
    <section
      data-nav-theme="light"
      className="relative py-16 px-4 sm:px-6"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
      id="capabilities"
    >
      <div className="max-w-7xl mx-auto">
        {/* Features Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Capabilities that modernize supplier audits
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Nine AI-driven features for consistent, actionable outcomes.
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex gap-5 md:gap-6" style={{ width: 'max-content' }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-[300px] md:w-[320px] h-[420px] flex-shrink-0"
              >
                {/* Clean white card matching reference */}
                <div className="h-full bg-white rounded-3xl shadow-lg overflow-hidden p-6 flex flex-col">
                  
                  {/* Teal label */}
                  <div className="mb-3 flex-shrink-0">
                    <span className="text-[#14B8A6] text-sm font-semibold">
                      {feature.label}
                    </span>
                  </div>

                  {/* Bold title/description */}
                  <h3 className="text-gray-900 text-lg font-bold mb-6 leading-tight flex-shrink-0 min-h-[100px]">
                    {feature.title}
                  </h3>

                  {/* Large image with rounded corners */}
                  <div className="relative w-full flex-1 rounded-2xl overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// Challenge Toggle Section
const ChallengeToggleSection = () => {
  const [isWithScanPro, setIsWithScanPro] = useState(false); // Start with "Traditional" state
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const withScanProContent = [
    {
      icon: CheckCircle2,
      title: "Fixed Price from €700",
      description: "Transparent pricing with no hidden costs - know exactly what you pay before you commit"
    },
    {
      icon: Zap,
      title: "Same-Day / Next-Day",
      description: "Ultra-fast deployment with audits starting within 24 hours of your request"
    },
    {
      icon: Calendar,
      title: "1-3 Days Structured",
      description: "Efficient on-site audits with AI-powered workflows that respect quality standards"
    },
    {
      icon: BarChart3,
      title: "Real-time + Report in 24h",
      description: "Live insights during audit with complete documentation delivered within one day"
    },
    {
      icon: CheckCheck,
      title: "100% Standardized",
      description: "AI-supported consistency ensures every audit follows the same professional standards"
    },
    {
      icon: Camera,
      title: "AI Computer Vision",
      description: "Advanced equipment recognition with complete photographic documentation"
    },
  ];

  const traditionalContent = [
    {
      icon: DollarSign,
      title: "€15,000 - €25,000",
      description: "Unpredictable costs with quotes on request and hidden fees that inflate final price"
    },
    {
      icon: Clock,
      title: "2-3 Weeks Lead Time",
      description: "Long coordination delays mean critical supplier issues remain undiscovered for weeks"
    },
    {
      icon: X,
      title: "3-5 Days On-site",
      description: "Extended audit duration disrupts supplier operations and delays critical decisions"
    },
    {
      icon: AlertTriangle,
      title: "5-10 Days After Audit",
      description: "Delayed reporting means production issues continue while you wait for documentation"
    },
    {
      icon: X,
      title: "Depends on Auditor",
      description: "Quality varies between auditors making supplier comparisons unreliable"
    },
    {
      icon: AlertTriangle,
      title: "Manual, Often Incomplete",
      description: "Missing photos and incomplete documentation create gaps in evidence"
    },
  ];

  const currentContent = isWithScanPro ? withScanProContent : traditionalContent;

  return (
    <section 
      ref={ref}
      data-nav-theme="light"
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
      id="challenge"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-2 mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${isWithScanPro ? 'bg-gray-300' : 'bg-red-600'}`} />
            <div className={`w-3 h-3 rounded-full ${isWithScanPro ? 'bg-[#14B8A6]' : 'bg-gray-300'}`} />
          </div>
          <span className="text-sm font-semibold text-gray-600">The Challenge You Know</span>
        </motion.div>

        {/* Main Headline with Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
              {isWithScanPro ? 'With' : 'Traditional'}
            </h2>
            
            <motion.span
              key={isWithScanPro ? 'with' : 'traditional'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${
                isWithScanPro ? 'text-[#14B8A6]' : 'text-red-600'
              }`}
            >
              {isWithScanPro ? 'ScanPro+' : 'Providers'}
            </motion.span>

            {/* Toggle Switch */}
            <button
              onClick={() => setIsWithScanPro(!isWithScanPro)}
              className={`relative w-16 h-8 sm:w-20 sm:h-10 rounded-full transition-all duration-300 ${
                isWithScanPro ? 'bg-[#14B8A6]' : 'bg-gray-400'
              }`}
              aria-label="Toggle between ScanPro+ and Traditional Providers"
            >
              <motion.div
                className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg"
                animate={{ x: isWithScanPro ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              const element = document.getElementById('cta');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="pl-6 sm:pl-8 pr-2 sm:pr-3 py-2.5 sm:py-3 rounded-full font-semibold text-base sm:text-lg flex items-center gap-3 sm:gap-4 transition-all shadow-lg group"
            style={{ backgroundColor: '#2563EB', color: 'white' }}
          >
            <span>Get Started</span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" style={{ color: '#2563EB' }} />
            </div>
          </motion.button>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg text-gray-600 mb-10 sm:mb-12 md:mb-16 max-w-3xl lg:ml-auto"
        >
          {isWithScanPro 
            ? "Experience transparent pricing, rapid deployment, and AI-powered standardization with YVOO ScanPro+."
            : "Traditional supplier audits are inefficient and expensive with unpredictable costs, long delays, and inconsistent quality."}
        </motion.p>

        {/* Modern Card Grid - 3x2 Grid Layout */}
        <motion.div layout className="relative">
          <motion.div
            key={isWithScanPro ? 'with' : 'traditional'}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          >
            {currentContent.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={`${isWithScanPro ? 'with' : 'traditional'}-${item.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05, 
                    duration: 0.4
                  }}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all flex flex-col"
                >
                  {/* Top - Icon/Visual */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: index * 0.05 + 0.2,
                        duration: 0.5,
                        type: "spring"
                      }}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center ${
                        isWithScanPro ? 'bg-gradient-to-br from-[#14B8A6] to-[#0D9488]' : 'bg-gradient-to-br from-red-600 to-red-700'
                      }`}
                    >
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>
                  </div>

                  {/* Bottom - Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <span className={`inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold mb-3 sm:mb-4 self-start ${
                      isWithScanPro 
                        ? 'bg-[#14B8A6]/10 text-[#14B8A6]' 
                        : 'bg-red-600/10 text-red-600'
                    }`}>
                      {isWithScanPro ? 'ScanPro+' : 'Traditional'}
                    </span>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

const fallbackAuditors = [
  { image: auditorEuropean, location: "Europe", region: "Central Europe", gradient: "from-blue-600 via-blue-700 to-blue-800", gender: "male" },
  { image: auditorAsian, location: "Asia", region: "East Asia Pacific", gradient: "from-[#14B8A6] via-[#12A594] to-[#0F8775]", gender: "male" },
  { image: auditorLatin, location: "Americas", region: "North & South", gradient: "from-blue-600 via-blue-700 to-blue-800", gender: "male" },
  { image: auditorMiddleEast, location: "Middle East", region: "Gulf Region", gradient: "from-[#14B8A6] via-[#12A594] to-[#0F8775]", gender: "male" },
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
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* 3D Earth */}
          <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] h-[240px] sm:h-[280px] md:h-[360px]">
            <Earth3D width="100%" height="100%" showPins={false} />
            
            {/* Green Location Marker */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute"
              style={{ top: '30%', left: '70%' }}
            >
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#14B8A6] border-2 border-white shadow-lg" />
              <div className="absolute inset-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#14B8A6] animate-ping opacity-40" />
            </motion.div>
            
            {/* 1-Click Button */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute"
              style={{ top: '32%', left: '73%' }}
            >
              <div className="bg-[#14B8A6] text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full flex items-center gap-1 sm:gap-2 shadow-xl">
                <Mouse className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap">1-Click</span>
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
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] h-[240px] sm:h-[280px] md:h-[360px]">
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
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Background 3D Earth */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25">
            <div className="w-full max-w-[250px] sm:max-w-[320px] md:max-w-[405px] h-[200px] sm:h-[250px] md:h-[315px]">
              <Earth3D width="100%" height="100%" />
            </div>
          </div>
          
          {/* Chat Interface in foreground */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] relative z-10">
            {/* User Message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#14B8A6] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="bg-[#14B8A6] text-white px-4 py-3 rounded-2xl rounded-tl-none flex-1">
                <p className="text-xs font-bold mb-2">You</p>
                <div className="space-y-1.5">
                  <div className="h-2 bg-white/50 rounded w-24"></div>
                  <div className="h-2 bg-white/50 rounded w-32"></div>
                </div>
              </div>
            </motion.div>
            
            {/* Auditor Message */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3 mb-4 justify-end"
            >
              <div className="bg-[#0D9488] text-white px-4 py-3 rounded-2xl rounded-tr-none flex-1">
                <p className="text-xs font-bold mb-2">Auditor</p>
                <div className="space-y-1.5">
                  <div className="h-2 bg-white/50 rounded w-28"></div>
                  <div className="h-2 bg-white/50 rounded w-36"></div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#0D9488] flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
            </motion.div>
            
            {/* User Message 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-full bg-[#14B8A6] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="bg-[#14B8A6] text-white px-4 py-3 rounded-2xl rounded-tl-none">
                <p className="text-xs font-bold mb-2">You</p>
                <div className="h-2 bg-white/50 rounded w-20"></div>
              </div>
            </motion.div>
            
            {/* Status Icons */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-[#14B8A6]/20 flex items-center justify-center"
              >
                <CheckCircle2 className="w-6 h-6 text-[#14B8A6]" />
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-14 h-14 rounded-full bg-[#14B8A6] flex items-center justify-center shadow-lg"
              >
                <MessageCircle className="w-7 h-7 text-white" />
              </motion.div>
            </div>
          </div>
          
          {/* Floating Globe Icon */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-[10%] right-[5%] w-12 h-12 rounded-full bg-[#14B8A6] flex items-center justify-center shadow-xl border-4 border-white z-20"
          >
            <Globe className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      )
    },
    {
      number: "04",
      title: "Receive Complete Reports",
      description: "Get comprehensive audit reports with AI-powered insights, photographic evidence, and actionable recommendations delivered within 24 hours of audit completion.",
      visual: (
        <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-2xl w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px]">
            {/* Report Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-full bg-[#14B8A6] flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="w-16 h-16 rounded-full bg-[#14B8A6]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#14B8A6]" />
                </div>
              </div>
              
              {/* Report Lines */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
            </motion.div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#14B8A6]/10 rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-[#14B8A6] mb-2">95%</div>
                <div className="h-1 bg-gray-300 rounded mx-auto w-12"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0D9488]/10 rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-[#0D9488] mb-2">A+</div>
                <div className="h-1 bg-gray-300 rounded mx-auto w-12"></div>
              </motion.div>
            </div>
            
            {/* Chart Bars */}
            <div className="flex items-end gap-2 h-20 mb-6">
              {[60, 80, 95, 70].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className={`rounded-t flex-1 ${
                    i % 2 === 0 ? 'bg-[#14B8A6]' : 'bg-[#0D9488]'
                  }`}
                ></motion.div>
              ))}
            </div>
            
            {/* Download Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white px-6 py-3 rounded-xl text-center font-bold flex items-center justify-center gap-3 shadow-lg"
            >
              <Shield className="w-5 h-5" />
              <span className="text-base">Report Ready</span>
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

  return (
    <section 
      data-nav-theme="light"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12"
      style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></div>
            <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
            How does YVOO Work
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to transform your supplier audit process
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Display */}
          <div className="overflow-x-hidden overflow-y-visible pb-16 sm:pb-20 md:pb-24">
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
                    className="bg-white rounded-none sm:rounded-2xl md:rounded-3xl shadow-xl overflow-visible mx-auto max-w-6xl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center overflow-visible">
                      {/* Left Side - Visual */}
                      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 md:p-8 min-h-[350px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-visible">
                        {step.visual}
                        
                        {/* Decorative element */}
                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-[60px] sm:text-[80px] font-bold text-[#14B8A6]/10 leading-none">
                          {step.number}
                        </div>
                      </div>

                      {/* Right Side - Content */}
                      <div className="p-6 sm:p-8 md:p-12">
                        <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-[#14B8A6]/10 text-[#14B8A6] rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-6">
                          Step {step.number}
                        </span>
                        
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
                          {step.title}
                        </h3>
                        
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                          {step.description}
                        </p>

                        {/* Features list */}
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            index === 0 && "Quick integration with ERP systems",
                            index === 1 && "Global network of certified auditors",
                            index === 2 && "Direct communication channel",
                            index === 3 && "AI-powered insights and analytics"
                          ].filter(Boolean).map((feature, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="flex items-center gap-2 sm:gap-3"
                            >
                              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#14B8A6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#14B8A6]" />
                              </div>
                              <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
            {/* Arrow Buttons */}
            <button
              onClick={prevStep}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-gray-700 hover:text-[#14B8A6]"
              aria-label="Previous step"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
            </button>

            {/* Step Indicators */}
            <div className="flex items-center gap-2 sm:gap-3">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                >
                  <div className={`transition-all ${
                    index === currentStep
                      ? 'w-10 sm:w-12 h-2.5 sm:h-3 bg-[#14B8A6] rounded-full'
                      : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-300 rounded-full hover:bg-[#14B8A6]/50'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-gray-700 hover:text-[#14B8A6]"
              aria-label="Next step"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
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
      
      {/* Hero Section */}
      <section
        data-nav-theme="dark"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24 overflow-hidden bg-primary"
        id="hero"
      >

        <div className="relative z-10 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 sm:gap-8 lg:gap-6 xl:gap-20 2xl:gap-28 items-center">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-4 sm:mb-6"
              >
                <div className="flex items-center gap-3 sm:gap-4 text-white text-xs sm:text-sm font-sans">
                  <div className="h-px w-8 sm:w-12 bg-white"></div>
                  <span>ScanPro+ — AI-powered supplier audits</span>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-[-0.02em] mb-4 sm:mb-6"
              >
                Supplier Audits in Days, Not Weeks
              </motion.h1>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white leading-[1.4] mb-6 sm:mb-8"
              >
                70% Cost Reduction · 80% Time Savings · Global Coverage
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base sm:text-lg font-normal text-white leading-[1.6] max-w-[600px] mb-8 sm:mb-10 md:mb-12"
              >
                On-site supplier audits starting at €700 fixed price. AI-powered intelligence with certified auditors across 90+ countries. Complete assessments in 3 days with real-time reporting.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex"
              >
                <button 
                  onClick={() => scrollToSection('cta')}
                  className="bg-white text-gray-900 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl"
                >
                  Get Started
                </button>
              </motion.div>
            </div>

            {/* Right Column: ROI Calculator */}
            <div className="hidden lg:block">
              <HeroROICalculator />
            </div>

          </div>
        </div>
      </section>

      {/* ROI Calculator - Visible on Mobile */}
      <div className="lg:hidden px-4 sm:px-6 py-6 sm:py-8 bg-gray-50">
        <HeroROICalculator />
      </div>

      {/* Challenge & Solution - Toggle Section */}
      <ChallengeToggleSection />

      {/* Auditor Network Section */}
      {isMobile ? <MobileFeaturesSection auditors={auditors} /> : <DesktopFeaturesSection auditors={auditors} scrollToSection={scrollToSection} />}

      {/* Capabilities Section */}
      {isMobile ? <MobileCapabilitiesSection features={features} /> : <DesktopCapabilitiesSection features={features} />}

      {/* How Does YVOO Work Carousel */}
      <HowItWorksCarousel />


      {/* Results Section - Transparent Multi-Layer Glass-Morphism Design */}
      <section 
        data-nav-theme="dark" 
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        id="results"
      >
        {/* Background decorative layers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-white mb-3 sm:mb-4">
              Business <span style={{ color: '#2563EB' }}>Impact</span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Data-driven insights showing measurable ROI and operational improvements
            </p>
          </motion.div>

          {/* Multi-layer Transparent Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {[
              { value: 60, suffix: '%', label: 'Cost Reduction', color: '#14B8A6', delay: 0 },
              { value: 70, suffix: '%', label: 'Time Savings', color: '#2563EB', delay: 0.1 },
              { value: 96, suffix: '%', label: 'Price Transparency', color: '#14B8A6', delay: 0.2 },
              { value: 48, suffix: 'h', label: 'Rapid Deployment', color: '#2563EB', delay: 0.3 }
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: metric.delay, duration: 0.5 }}
                className="relative group"
              >
                {/* Outer glow layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                
                {/* Main glass card */}
                <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all shadow-2xl">
                  {/* Inner glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent rounded-xl sm:rounded-2xl" />
                  
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: metric.delay + 0.2, type: "spring", stiffness: 200 }}
                      className="text-4xl sm:text-5xl font-bold mb-2"
                      style={{ color: metric.color }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: metric.delay + 0.4 }}
                      >
                        {metric.value}{metric.suffix}
                      </motion.span>
                    </motion.div>
                    <p className="text-white/90 font-medium mb-3">{metric.label}</p>
                    
                    {/* Animated Progress Bar with glass effect */}
                    <div className="h-1.5 bg-white/5 backdrop-blur-sm rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.value}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: metric.delay + 0.5, duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full relative"
                        style={{ background: `linear-gradient(90deg, ${metric.color}, ${metric.color}dd)` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart Grid with Enhanced Glass-Morphism */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 mb-4 sm:mb-5 md:mb-6 lg:gap-7 xl:mb-8">
            
            {/* Cost Comparison Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
              
              {/* Main glass container */}
              <div className="relative bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl h-full">
                {/* Multi-layer gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/[0.03] via-transparent to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl" />
                
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">Cost Comparison</h3>
                  <p className="text-xs sm:text-sm md:text-base text-white/60 mb-3 sm:mb-4 md:mb-6">Traditional vs ScanPro+ per audit</p>
                  
                  <BusinessImpactChart />
                </div>
              </div>
            </motion.div>

            {/* ROI Timeline Chart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
              
              {/* Main glass container */}
              <div className="relative bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl h-full">
                {/* Multi-layer gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-tl from-teal-500/[0.03] via-transparent to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl" />
                
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">Cumulative Savings</h3>
                  <p className="text-xs sm:text-sm md:text-base text-white/60 mb-3 sm:mb-4 md:mb-6">12-month projection (20 audits/year)</p>
                  
                  <ROITimelineChart />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-width Time Efficiency Chart with Premium Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* Outer glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all" />
            
            {/* Main glass container */}
            <div className="relative bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl">
              {/* Multi-layer gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent rounded-xl sm:rounded-2xl md:rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/[0.02] via-transparent to-teal-500/[0.02] rounded-xl sm:rounded-2xl md:rounded-3xl" />
              
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">Time-to-Audit Comparison</h3>
                <p className="text-xs sm:text-sm md:text-base text-white/60 mb-3 sm:mb-4 md:mb-6">End-to-end audit process duration</p>
                
                <TimeEfficiencyChart />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Industry Use Cases - Light gradient */}
      <section 
        data-nav-theme="light" 
        className="relative py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 text-center"
          >
            Industry-Specific <span style={{ color: '#2563EB' }}>Use Cases</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center"
          >
            Tailored solutions for automotive, aerospace, pharma, and chemical industries
          </motion.p>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                Icon: Car,
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
                Icon: Plane,
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
                Icon: Pill,
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
                Icon: Factory,
                title: "Chemical & Process Industry: REACH Compliance & Process Safety",
                useCase: "Safety assessment of chemical plants with comprehensive risk evaluation.",
                solutions: [
                  "Plant safety inspection with automatic risk assessment",
                  "Environmental audits and REACH compliance check",
                  "Action tracking with deadline monitoring",
                  "Process safety according to COMAH/Seveso"
                ]
              }
            ].map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
                  {/* Left Side - Icon */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 sm:p-10 md:p-12 h-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] flex items-center justify-center">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center">
                      <industry.Icon className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 text-white" />
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="p-6 sm:p-8 md:p-12">
                    <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-[#2563EB]/10 text-[#2563EB] rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                      Industry Solution
                    </span>
                    
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                      {industry.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">{industry.useCase}</p>
                    
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">ScanPro+ Solution:</p>
                    <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      {industry.solutions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-700">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" style={{ color: '#14B8A6' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {industry.result && (
                      <div className="p-3 sm:p-4 rounded-lg" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}>
                        <p className="text-sm sm:text-base text-gray-900 font-semibold">{industry.result}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards - Modern Interactive Cards */}
      <section 
        data-nav-theme="light" 
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(249, 250, 251), rgb(243, 244, 246))" }}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: '#14B8A6' }} />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Compliance & Supported Standards
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-4">
              YVOO ScanPro+ meets the highest international quality and safety standards. 
              Your audits are legally secure and comply with all industry-specific requirements.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#14B8A6] mt-3 sm:mt-4">
              👆 Click on any standard to learn more
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10 mt-6 sm:mt-8"
          >
            <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
              Our auditor network includes professionals certified by:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-gray-600 px-4">
              <span className="text-sm sm:text-base">TÜV SÜD</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm sm:text-base">Bureau Veritas</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm sm:text-base">SGS</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm sm:text-base">DNV</span>
            </div>
          </motion.div>
          
          <ComplianceStandardsGrid />
        </div>
      </section>

      {/* Global Network - Light gradient with image */}
      <section 
        data-nav-theme="light" 
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))" }}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center"
          >
            Global <span style={{ color: '#2563EB' }}>Network</span> & Integration
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* ERP Integration Cards */}
            {[
              { icon: LinkIcon, title: 'SAP Integration', desc: 'Supplier Evaluation & Release', color: '#2563EB' },
              { icon: LinkIcon, title: 'Oracle', desc: 'Seamless ERP connectivity', color: '#2563EB' },
              { icon: LinkIcon, title: 'Microsoft Dynamics', desc: 'Full system integration', color: '#2563EB' },
              { icon: Globe, title: 'On-Demand Availability', desc: 'Same-Day audits worldwide', color: '#14B8A6' },
              { icon: UserCheck, title: 'Smart Matching', desc: 'Optimal auditor selection', color: '#14B8A6' },
              { icon: Star, title: 'Quality Assured', desc: 'Rating system & tracking', color: '#14B8A6' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex flex-col items-start">
                  <div 
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6"
                    style={{ 
                      background: idx < 3 
                        ? 'linear-gradient(135deg, #2563EB, #1e40af)' 
                        : 'linear-gradient(135deg, #14B8A6, #0D9488)'
                    }}
                  >
                    <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 p-6 sm:p-8 rounded-xl text-white" style={{ background: 'linear-gradient(to right, #2563EB, #60A5FA)' }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2 text-white">
              <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
              Available in 47 Countries
            </h3>
            <p className="text-base sm:text-lg text-white/90">
              Need an audit in Shanghai? Book directly a local, ISO-certified auditor with experience in your industry – available within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA - Dark gradient */}
      <section 
        data-nav-theme="dark" 
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-24"
        style={{ background: "linear-gradient(135deg, rgb(17, 24, 39), rgb(31, 41, 55), rgb(17, 24, 39))" }}
        id="cta"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5 sm:space-y-6 md:space-y-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-white">
              Ready for <span style={{ color: '#60A5FA' }}>the Future of Supplier Auditing?</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80">
              Join leading companies from Automotive, Aerospace, and Pharma who already trust YVOO ScanPro+.
            </p>

            <div className="space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 sm:p-6 rounded-xl text-left hover:bg-white/10 transition-all">
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#14B8A6' }} />
                  Schedule a Demo (30 minutes)
                </h4>
                <p className="text-sm sm:text-base text-white/80">Experience in a personal demo how YVOO ScanPro+ revolutionizes your supplier audits.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 sm:p-6 rounded-xl text-left hover:bg-white/10 transition-all">
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#14B8A6' }} />
                  Start Pilot Audit (2 weeks)
                </h4>
                <p className="text-sm sm:text-base text-white/80">Test the platform with a real supplier audit – without risk, with measurable results.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 sm:p-6 rounded-xl text-left hover:bg-white/10 transition-all">
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#14B8A6' }} />
                  Plan Integration
                </h4>
                <p className="text-sm sm:text-base text-white/80">Seamless integration into your existing Quality Management Systems and ERP landscape.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
              <a
                href="mailto:ibrandic@yvoo.io"
                className="w-full sm:w-auto bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-opacity-90 shadow-xl min-h-[48px] inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Demo
              </a>
              <a
                href="mailto:ibrandic@yvoo.io"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 min-h-[48px]"
              >
                <Rocket className="w-5 h-5" />
                Start Pilot Audit
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="pt-8 border-t border-white/20">
              <h3 className="text-2xl font-bold mb-4 text-white">Contact</h3>
              <p className="text-lg text-white/90">
                <strong>Ivo Brandic</strong>, CEO YVOO Technologies Ltd.<br />
                <span className="inline-flex items-center gap-2 mt-2">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:ibrandic@yvoo.io" className="hover:underline" style={{ color: '#60A5FA' }}>ibrandic@yvoo.io</a>
                </span><br />
                <span className="inline-flex items-center gap-2 mt-2">
                  <Phone className="w-5 h-5" />
                  +49 (0)152 03095799
                </span><br />
                <span className="inline-flex items-center gap-2 mt-2">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp | Google Meet
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ScanProPlus;
