import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    gradient: "from-pink-500 via-rose-500 to-fuchsia-600"
  },
  { 
    image: auditorAsian, 
    location: "Asia", 
    region: "East Asia Pacific",
    gradient: "from-purple-500 via-violet-500 to-blue-600"
  },
  { 
    image: auditorAfrican, 
    location: "Africa", 
    region: "Sub-Saharan",
    gradient: "from-red-500 via-orange-500 to-amber-600"
  },
  { 
    image: auditorLatin, 
    location: "Americas", 
    region: "North & South",
    gradient: "from-green-500 via-emerald-500 to-teal-600"
  },
  { 
    image: auditorMiddleEast, 
    location: "Middle East", 
    region: "Gulf Region",
    gradient: "from-yellow-500 via-amber-500 to-orange-600"
  },
  { 
    image: auditorSouthAsian, 
    location: "South Asia", 
    region: "Indian Subcontinent",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600"
  },
];

const HeroSection = () => {
  const [isFanned, setIsFanned] = useState(false);

  useEffect(() => {
    const cycle = () => {
      // Fan out
      setTimeout(() => setIsFanned(true), 1000);
      // Fan in
      setTimeout(() => setIsFanned(false), 8000);
    };

    cycle();
    const interval = setInterval(cycle, 10000);

    return () => clearInterval(interval);
  }, []);

  // Calculate card positions for fan effect
  const getCardStyle = (index: number) => {
    const totalCards = auditors.length;
    const centerIndex = (totalCards - 1) / 2;
    const offset = index - centerIndex;
    
    if (isFanned) {
      return {
        x: offset * 180, // Horizontal spread
        rotateY: offset * -12, // 3D rotation
        rotateZ: offset * 8, // Card tilt
        scale: 1,
        zIndex: totalCards - Math.abs(offset),
      };
    } else {
      return {
        x: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: index === 0 ? 1 : 0.95,
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
          <div className="relative flex justify-center items-center min-h-[600px]">
            <div 
              className="relative w-full max-w-5xl"
              style={{ perspective: "2000px" }}
            >
              {/* Atmospheric Glow */}
              <div className="absolute inset-0 blur-3xl bg-cyan-400/10 scale-150 -z-10"></div>
              
              {/* Cards Container */}
              <div className="relative h-[500px] flex items-center justify-center">
                {auditors.map((auditor, index) => {
                  const style = getCardStyle(index);
                  
                  return (
                    <motion.div
                      key={auditor.location}
                      className="absolute"
                      initial={false}
                      animate={{
                        x: style.x,
                        rotateY: style.rotateY,
                        rotateZ: style.rotateZ,
                        scale: style.scale,
                        zIndex: style.zIndex,
                      }}
                      transition={{
                        duration: 1.2,
                        delay: isFanned ? index * 0.1 : (auditors.length - index) * 0.08,
                        ease: [0.34, 1.56, 0.64, 1], // Spring-like easing
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Card */}
                      <div
                        className={`relative w-72 h-96 rounded-3xl overflow-hidden bg-gradient-to-br ${auditor.gradient}`}
                        style={{
                          boxShadow: `
                            0 30px 60px -15px rgba(0, 0, 0, 0.5),
                            0 15px 30px -10px rgba(0, 0, 0, 0.3),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1)
                          `,
                        }}
                      >
                        {/* Auditor Image */}
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/20">
                            <img
                              src={auditor.image}
                              alt={`Professional auditor from ${auditor.location}`}
                              className="w-full h-full object-cover"
                            />
                            {/* Subtle Glow */}
                            <div 
                              className="absolute inset-0 rounded-full pointer-events-none"
                              style={{
                                background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)",
                                mixBlendMode: "overlay"
                              }}
                            />
                          </div>
                        </div>

                        {/* Location Badge */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
                            <p className="text-gray-900 font-sans font-bold text-sm">
                              {auditor.location}
                            </p>
                            <p className="text-gray-600 font-sans text-xs text-center">
                              {auditor.region}
                            </p>
                          </div>
                        </div>

                        {/* Card Shine Effect */}
                        <div 
                          className="absolute inset-0 pointer-events-none"
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
