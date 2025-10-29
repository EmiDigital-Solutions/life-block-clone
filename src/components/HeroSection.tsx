import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";

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

const HeroSection = () => {
  const [isFanned, setIsFanned] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  // Mobile shows 3 cards, desktop shows all 6
  const visibleAuditors = isMobile ? auditors.slice(0, 3) : auditors;

  useEffect(() => {
    const cycle = () => {
      // Fan out - slower for mobile
      setTimeout(() => setIsFanned(true), isMobile ? 2000 : 1500);
      // Fan in - much longer display time
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

  // Calculate card positions for fan effect
  const getCardStyle = (index: number) => {
    const totalCards = visibleAuditors.length;
    const centerIndex = (totalCards - 1) / 2;
    // Adjust index based on activeIndex for rotation effect
    const adjustedIndex = (index - activeIndex + totalCards) % totalCards;
    const offset = adjustedIndex - centerIndex;
    
    if (isFanned) {
      if (isMobile) {
        // Mobile: Gentle horizontal spread (3 cards like a hand)
        return {
          x: offset * 110,
          y: Math.abs(offset) * -20, // Slight lift
          rotateY: offset * -8,
          rotateZ: offset * 6,
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      } else {
        // Desktop: Fan from bottom-right corner up to center
        // Cards spread from lower-right position to their final position
        return {
          x: offset * 85, // Horizontal spread
          y: Math.abs(offset) * -45, // Cards lift up as they spread
          rotateY: offset * -8,
          rotateZ: offset * 8, // Tilt for fan effect
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      }
    } else {
      // Stacked state - Desktop starts from bottom-right corner
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

  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Orb Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Main animated orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.3) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Secondary orb */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Tertiary orb */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(34, 211, 238, 0.3) 0%, rgba(14, 165, 233, 0.2) 50%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <div className="flex items-center gap-4 text-white/60 text-sm font-sans mb-8">
              <div className="h-px w-16 bg-cyan-400/40"></div>
              <span>2,000+ Auditors · 90+ Countries · AI-Powered</span>
              <div className="h-px w-16 bg-cyan-400/40"></div>
            </div>
          </motion.div>

          {/* Card Fan Animation */}
          <div className="relative flex justify-center items-center min-h-[500px]">
            <div 
              className="relative w-full max-w-4xl"
              style={{ perspective: "1500px" }}
            >
              {/* Atmospheric Glow */}
              <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
              
              {/* Cards Container */}
              <div className="relative h-[400px] flex items-center justify-center">
                {visibleAuditors.map((auditor, index) => {
                  const style = getCardStyle(index);
                  
                  return (
                    <motion.div
                      key={auditor.location}
                      className="absolute cursor-pointer"
                      onClick={handleCardClick}
                      initial={false}
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
                        delay: isFanned ? index * (isMobile ? 0.25 : 0.12) : (visibleAuditors.length - index) * 0.08,
                        ease: [0.33, 1, 0.68, 1],
                        type: "tween",
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        willChange: "transform, opacity",
                      }}
                      whileHover={{ scale: isFanned ? 1.05 : 1 }}
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
          </div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight max-w-4xl mx-auto"
          >
            On-Site Supplier Audits in Days, Not Weeks
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-sans text-cyan-400/90 mt-6"
          >
            70% Cost Reduction · 80% Time Savings · Global Coverage
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/70 font-sans max-w-2xl mx-auto"
          >
            Physical factory assessments (ISO, VDA, IATF) starting from €700. 
            AI-powered intelligence with certified auditors across 90+ countries.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <button className="bg-cyan-400 hover:bg-cyan-500 text-black px-8 py-4 rounded-full font-sans font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
              Request 30-Minute Demo
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 text-background"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
