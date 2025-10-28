import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";

const auditors = [
  { image: auditorEuropean, location: "Europe", region: "Central Europe" },
  { image: auditorAsian, location: "Asia", region: "East Asia Pacific" },
  { image: auditorAfrican, location: "Africa", region: "Sub-Saharan" },
  { image: auditorLatin, location: "Americas", region: "North & South" },
  { image: auditorMiddleEast, location: "Middle East", region: "Gulf Region" },
  { image: auditorSouthAsian, location: "South Asia", region: "Indian Subcontinent" },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % auditors.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

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

          {/* Professional Auditor Animation - 3D Floating Effect */}
          <div className="relative flex justify-center items-center min-h-[600px]">
            <div className="relative" style={{ perspective: "1200px" }}>
              {/* Atmospheric Glow - Back Layer */}
              <div className="absolute inset-0 blur-3xl bg-cyan-400/15 rounded-full scale-150 -z-10"></div>
              
              {/* Floating Shadow - Animated */}
              <motion.div
                animate={{
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.4, 0.2, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-1/2 -translate-x-1/2 w-64 h-16 md:w-80 md:h-20 rounded-full blur-3xl bg-black/60"
                style={{
                  top: "calc(100% + 40px)",
                  filter: "blur(40px)"
                }}
              />
              
              {/* 3D Floating Head Container */}
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotateY: [-2, 2, -2],
                  rotateX: [2, -2, 2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-80 h-80 md:w-[420px] md:h-[420px]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "perspective(1200px) rotateY(0deg) rotateX(0deg)"
                }}
              >
                {/* Main 3D Image Container */}
                <div 
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    boxShadow: `
                      0 40px 80px -20px rgba(0, 0, 0, 0.6),
                      0 20px 40px -10px rgba(0, 0, 0, 0.4),
                      0 10px 20px -5px rgba(0, 0, 0, 0.3),
                      inset 0 -20px 40px rgba(0, 0, 0, 0.2),
                      0 0 0 1px rgba(0, 217, 255, 0.3)
                    `,
                    transform: "translateZ(50px)"
                  }}
                >
                  {/* Auditor Images with Smooth Crossfade */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={auditors[currentIndex].image}
                      alt={`Professional auditor from ${auditors[currentIndex].location}`}
                      initial={{ 
                        opacity: 0,
                        scale: 1.1
                      }}
                      animate={{ 
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{ 
                        opacity: 0,
                        scale: 1.1
                      }}
                      transition={{ 
                        opacity: { duration: 2, ease: "easeInOut" },
                        scale: { 
                          duration: 2,
                          ease: "easeOut"
                        }
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        filter: "contrast(1.05) brightness(1.02)"
                      }}
                    />
                  </AnimatePresence>
                  
                  {/* Rim Light Effect - Cyan Edge Glow */}
                  <div 
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(0, 217, 255, 0.3) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(0, 217, 255, 0.15) 0%, transparent 50%)",
                      mixBlendMode: "screen"
                    }}
                  />
                  
                  {/* Edge Vignette for Depth */}
                  <div 
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)"
                    }}
                  />
                </div>
              </motion.div>

              {/* Location Label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`location-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                >
                  <div className="bg-cyan-400/10 backdrop-blur-sm border border-cyan-400/30 rounded-full px-8 py-3">
                    <p className="text-cyan-400 font-sans font-semibold text-lg">
                      {auditors[currentIndex].location}
                    </p>
                    <p className="text-white/70 font-sans text-sm">
                      {auditors[currentIndex].region}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
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
