import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Brain, Sparkles, Zap, Search, Target, Network, Workflow, Clock, CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import illustrationAiCopilot from "@/assets/illustration-ai-copilot.jpg";
import illustrationRiskScoring from "@/assets/illustration-risk-scoring.jpg";
import illustrationRealtimeAlerts from "@/assets/illustration-realtime-alerts.jpg";
import illustrationSupplierSearch from "@/assets/illustration-supplier-search.jpg";
import illustrationTripleSource from "@/assets/illustration-triple-source.jpg";
import illustrationSmartMatch from "@/assets/illustration-smart-match.jpg";
import illustrationOneClick from "@/assets/illustration-one-click.jpg";
import illustrationLiveTracking from "@/assets/illustration-live-tracking.jpg";
import illustrationErpSync from "@/assets/illustration-erp-sync.jpg";

const auditors = [
  { 
    image: auditorEuropean, 
    location: "Europe", 
    region: "Central Europe",
    gradient: "from-blue-600 via-blue-700 to-blue-800"
  },
  { 
    image: auditorAsian, 
    location: "Asia", 
    region: "East Asia Pacific",
    gradient: "from-green-600 via-green-700 to-green-800"
  },
  { 
    image: auditorAfrican, 
    location: "Africa", 
    region: "Sub-Saharan",
    gradient: "from-gray-800 via-gray-900 to-black"
  },
  { 
    image: auditorLatin, 
    location: "Americas", 
    region: "North & South",
    gradient: "from-blue-600 via-blue-700 to-blue-800"
  },
  { 
    image: auditorMiddleEast, 
    location: "Middle East", 
    region: "Gulf Region",
    gradient: "from-green-600 via-green-700 to-green-800"
  },
  { 
    image: auditorSouthAsian, 
    location: "South Asia", 
    region: "Indian Subcontinent",
    gradient: "from-gray-800 via-gray-900 to-black"
  },
];

const featurePhotos = {
  ai: [
    { image: illustrationAiCopilot, label: "AI Co-Pilot", sublabel: "Smart Analysis", gradient: "from-blue-600 via-blue-700 to-blue-800" },
    { image: illustrationRiskScoring, label: "Risk Scoring", sublabel: "Predictive AI", gradient: "from-green-600 via-green-700 to-green-800" },
    { image: illustrationRealtimeAlerts, label: "Real-Time", sublabel: "Instant Alerts", gradient: "from-gray-800 via-gray-900 to-black" },
  ],
  supplier: [
    { image: illustrationSupplierSearch, label: "SearchPro+", sublabel: "AI Discovery", gradient: "from-blue-600 via-blue-700 to-blue-800" },
    { image: illustrationTripleSource, label: "Triple Source", sublabel: "Verified Data", gradient: "from-green-600 via-green-700 to-green-800" },
    { image: illustrationSmartMatch, label: "Smart Match", sublabel: "Best Suppliers", gradient: "from-gray-800 via-gray-900 to-black" },
  ],
  workflow: [
    { image: illustrationOneClick, label: "One Click", sublabel: "Auto Dispatch", gradient: "from-blue-600 via-blue-700 to-blue-800" },
    { image: illustrationLiveTracking, label: "Real-Time", sublabel: "Live Tracking", gradient: "from-green-600 via-green-700 to-green-800" },
    { image: illustrationErpSync, label: "ERP Sync", sublabel: "Full Integration", gradient: "from-gray-800 via-gray-900 to-black" },
  ],
};

const projects = [
  {
    number: "01",
    title: "Global On-Demand Auditor Network",
    description: "Access 2,000+ certified auditors across 90+ countries. Same-day and next-day audits available with transparent fixed pricing from €700. Smart algorithms automatically match the optimal local auditor.",
    gradient: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))",
    showAuditors: true,
  },
  {
    number: "02",
    title: "ScanPro+ AI Intelligence Platform",
    description: "AI co-pilot ensures consistent audit quality regardless of location. Predictive risk scoring, real-time compliance alerts, and computer vision for automated equipment verification.",
    gradient: "linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39), rgb(0, 0, 0))",
    featureType: "ai",
  },
  {
    number: "03",
    title: "Supplier Discovery & Intelligence",
    description: "SearchPro+ AI converts procurement requirements into qualified supplier lists in minutes. Triple-source architecture with explainable AI recommendations for complete transparency.",
    gradient: "linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))",
    featureType: "supplier",
  },
  {
    number: "04",
    title: "Seamless Digital Workflow",
    description: "One-click audit requests with auto-dispatch to certified auditors. Real-time monitoring, instant comprehensive reports, and direct ERP integration for complete process automation.",
    gradient: "linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))",
    featureType: "workflow",
  },
];

const FullScreenProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mobile shows 3 cards, desktop shows all 6
  const visibleAuditors = isMobile ? auditors.slice(0, 3) : auditors;

  useEffect(() => {
    const cycle = () => {
      setTimeout(() => setIsFanned(true), isMobile ? 2000 : 1500);
      setTimeout(() => setIsFanned(false), isMobile ? 12000 : 9000);
    };

    cycle();
    const interval = setInterval(cycle, isMobile ? 16000 : 12000);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Handle card click to cycle to next card
  const handleCardClick = () => {
    setActiveIndex((prev) => (prev + 1) % visibleAuditors.length);
  };

  // Calculate card positions for fan effect (for auditors)
  const getCardStyle = (index: number, totalCards: number) => {
    const centerIndex = (totalCards - 1) / 2;
    // Adjust index based on activeIndex for rotation effect
    const adjustedIndex = (index - activeIndex + totalCards) % totalCards;
    const offset = adjustedIndex - centerIndex;
    
    if (isFanned) {
      if (isMobile) {
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
          x: offset * 85,
          y: Math.abs(offset) * -45,
          rotateY: offset * -8,
          rotateZ: offset * 8,
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      }
    } else {
      return {
        x: isMobile ? 0 : 180,
        y: isMobile ? 0 : 80,
        rotateY: 0,
        rotateZ: isMobile ? 0 : -25,
        scale: 0.98,
        opacity: adjustedIndex === 0 ? 1 : 0,
        zIndex: totalCards - adjustedIndex,
      };
    }
  };

  // Color interpolation for smooth transitions
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgb(22, 163, 74)",
      "rgb(17, 24, 39)",
      "rgb(29, 78, 216)",
      "rgb(22, 163, 74)",
      "rgb(22, 163, 74)",
    ]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative -mt-1"
    >
      {/* Smooth gradient transition from hero section */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, rgb(0, 0, 0) 0%, transparent 100%)'
        }}
      />
      
      {projects.map((project, index) => {
        // Determine nav theme based on project gradient
        let navTheme: 'dark' | 'green' | 'light' = 'dark';
        if (project.gradient.includes('rgb(34, 197, 94)')) {
          navTheme = 'green';
        } else if (project.gradient.includes('rgb(31, 41, 55)') || project.gradient.includes('rgb(37, 99, 235)')) {
          navTheme = 'dark';
        }

        return (
          <section
            key={index}
            data-nav-theme={navTheme}
            className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-20"
          >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
                className="text-white space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-sm font-sans tracking-wide font-medium">
                    {project.number} Feature
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold leading-tight tracking-tight">
                  {project.title}
                </h2>

                <p className="text-base md:text-lg font-sans leading-relaxed opacity-90 max-w-xl font-medium">
                  {project.description}
                </p>

                <button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300 tracking-wide">
                  Learn more
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Right: Auditor Cards or Feature Cards */}
              {project.showAuditors ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="flex justify-center lg:justify-end"
                >
                  <div 
                    className="relative w-full max-w-2xl"
                    style={{ perspective: "1500px" }}
                  >
                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
                    
                    {/* Cards Container */}
                    <div className="relative h-[400px] flex items-center justify-center">
                      {visibleAuditors.map((auditor, auditorIndex) => {
                        const style = getCardStyle(auditorIndex, visibleAuditors.length);
                        
                        return (
                          <motion.div
                            key={auditor.location}
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
                              duration: isMobile ? 2.5 : 1.8,
                              delay: isFanned ? auditorIndex * (isMobile ? 0.25 : 0.12) : (visibleAuditors.length - auditorIndex) * 0.08,
                              ease: [0.33, 1, 0.68, 1],
                              type: "tween",
                            }}
                            style={{
                              transformStyle: "preserve-3d",
                              willChange: "transform, opacity",
                            }}
                          >
                            {/* Card */}
                            <div
                              className={`relative w-56 h-72 rounded-3xl overflow-hidden bg-gradient-to-br ${auditor.gradient}`}
                              style={{
                                boxShadow: `
                                  0 25px 50px -12px rgba(0, 0, 0, 0.5),
                                  0 0 30px rgba(236, 72, 153, 0.2)
                                `,
                              }}
                            >
                              {/* Gradient Overlay for depth */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                              
                              {/* Auditor Image */}
                              <div className="absolute inset-0 flex items-center justify-center pt-6">
                                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-white/10">
                                  <img
                                    src={auditor.image}
                                    alt={`Professional auditor from ${auditor.location}`}
                                    className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                                  />
                                  {/* Dramatic colored lighting effect */}
                                  <div 
                                    className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
                                    style={{
                                      background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Location Badge */}
                              <div className="absolute bottom-5 left-0 right-0 flex justify-center px-4">
                                <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 w-full">
                                  <p className="text-white font-sans font-bold text-sm text-center">
                                    {auditor.location}
                                  </p>
                                  <p className="text-white/80 font-sans text-xs text-center">
                                    {auditor.region}
                                  </p>
                                </div>
                              </div>

                              {/* Edge Highlight */}
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
                </motion.div>
              ) : project.featureType ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="flex justify-center lg:justify-end"
                >
                  <div 
                    className="relative w-full max-w-2xl"
                    style={{ perspective: "1500px" }}
                  >
                    {/* Atmospheric Glow */}
                    <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
                    
                    {/* Cards Container */}
                    <div className="relative h-[400px] flex items-center justify-center">
                      {featurePhotos[project.featureType as keyof typeof featurePhotos].map((card, cardIndex) => {
                        const style = getCardStyle(cardIndex, 3);
                        
                        return (
                          <motion.div
                            key={card.label}
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
                              duration: isMobile ? 2.5 : 1.8,
                              delay: isFanned ? cardIndex * (isMobile ? 0.25 : 0.12) : (3 - cardIndex) * 0.08,
                              ease: [0.33, 1, 0.68, 1],
                              type: "tween",
                            }}
                            style={{
                              transformStyle: "preserve-3d",
                              willChange: "transform, opacity",
                            }}
                          >
                            {/* Card */}
                            <div
                              className={`relative w-56 h-72 rounded-3xl overflow-hidden bg-gradient-to-br ${card.gradient}`}
                              style={{
                                boxShadow: `
                                  0 25px 50px -12px rgba(0, 0, 0, 0.5),
                                  0 0 30px rgba(236, 72, 153, 0.2)
                                `,
                              }}
                            >
                              {/* Gradient Overlay for depth */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              
                              {/* Feature Photo */}
                              <img
                                src={card.image}
                                alt={`${card.label} feature visualization`}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                              {/* Label Badge */}
                              <div className="absolute bottom-5 left-0 right-0 flex justify-center px-4">
                                <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 w-full">
                                  <p className="text-white font-sans font-bold text-sm text-center">
                                    {card.label}
                                  </p>
                                  <p className="text-white/80 font-sans text-xs text-center">
                                    {card.sublabel}
                                  </p>
                                </div>
                              </div>

                              {/* Edge Highlight */}
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
                </motion.div>
              ) : null}
            </div>
          </div>
        </section>
        );
      })}
    </motion.div>
  );
};

export default FullScreenProjects;
