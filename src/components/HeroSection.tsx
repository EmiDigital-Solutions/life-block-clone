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
    bgColor: "bg-navy-deep"
  },
  { 
    image: auditorAsian, 
    location: "Asia", 
    region: "East Asia Pacific",
    bgColor: "bg-project-blue"
  },
  { 
    image: auditorAfrican, 
    location: "Africa", 
    region: "Sub-Saharan",
    bgColor: "bg-project-teal"
  },
  { 
    image: auditorLatin, 
    location: "Americas", 
    region: "North & South",
    bgColor: "bg-navy-light"
  },
  { 
    image: auditorMiddleEast, 
    location: "Middle East", 
    region: "Gulf Region",
    bgColor: "bg-project-brown"
  },
  { 
    image: auditorSouthAsian, 
    location: "South Asia", 
    region: "Indian Subcontinent",
    bgColor: "bg-accent"
  },
];

const HeroSection = () => {
  const [isFanned, setIsFanned] = useState(false);
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

  // Calculate card positions for fan effect
  const getCardStyle = (index: number) => {
    const totalCards = visibleAuditors.length;
    const centerIndex = (totalCards - 1) / 2;
    const offset = index - centerIndex;
    
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
        // Desktop: Vertical fan spread (bottom to top, like a hand fan)
        return {
          x: offset * 80, // Horizontal spread
          y: Math.abs(offset) * -40, // Cards lift up as they spread
          rotateY: offset * -8,
          rotateZ: offset * 8, // More dramatic tilt for fan effect
          scale: 1,
          opacity: 1,
          zIndex: totalCards - Math.abs(offset),
        };
      }
    } else {
      return {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 0.98,
        opacity: index === 0 ? 1 : 0,
        zIndex: totalCards - index,
      };
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-black to-black opacity-90"></div>

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
              <span>Global Network · Local Expertise</span>
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
                      className="absolute"
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
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Card */}
                      <div
                        className={`relative w-56 h-72 rounded-2xl overflow-hidden ${auditor.bgColor} border border-border`}
                        style={{
                          boxShadow: `
                            0 20px 40px -10px rgba(0, 0, 0, 0.4),
                            0 10px 20px -5px rgba(0, 0, 0, 0.3)
                          `,
                        }}
                      >
                        {/* Auditor Image */}
                        <div className="absolute inset-0 flex items-center justify-center pt-6">
                          <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-white/10">
                            <img
                              src={auditor.image}
                              alt={`Professional auditor from ${auditor.location}`}
                              className="w-full h-full object-cover"
                            />
                            {/* Subtle Glow */}
                            <div 
                              className="absolute inset-0 rounded-full pointer-events-none"
                              style={{
                                background: "radial-gradient(circle at 30% 30%, rgba(0, 217, 255, 0.15) 0%, transparent 60%)",
                              }}
                            />
                          </div>
                        </div>

                        {/* Location Badge */}
                        <div className="absolute bottom-5 left-0 right-0 flex justify-center px-4">
                          <div className="bg-cyan-400/10 backdrop-blur-sm border border-cyan-400/20 rounded-full px-5 py-2 w-full">
                            <p className="text-cyan-400 font-sans font-semibold text-sm text-center">
                              {auditor.location}
                            </p>
                            <p className="text-white/60 font-sans text-xs text-center">
                              {auditor.region}
                            </p>
                          </div>
                        </div>

                        {/* Subtle Edge Highlight */}
                        <div 
                          className="absolute inset-0 pointer-events-none rounded-2xl"
                          style={{
                            background: "linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, transparent 50%)",
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
            Certified Auditors From Every Continent
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-sans text-cyan-400/90 mt-6"
          >
            Global Auditors. Local Expertise. Everywhere.
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/70 font-sans max-w-2xl mx-auto"
          >
            Your local expert from our worldwide network of certified professionals, 
            ready to deliver excellence across construction, safety, and compliance audits.
          </motion.p>
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
