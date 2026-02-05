import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";

// Generate random particles with density gradient (more on left)
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    // Create density gradient - more particles on left (0-60%), fewer on right
    const densityFactor = Math.random();
    const xPosition = Math.pow(densityFactor, 1.5) * 65; // Skews more to left
    
    return {
      id: i,
      x: xPosition,
      y: Math.random() * 100,
      size: Math.random() * 3.5 + 0.5,
      color: Math.random() > 0.7 ? "primary" : "white",
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 3,
      opacity: Math.random() * 0.6 + 0.3,
    };
  });
};

const HeroSection = () => {
  const particles = useMemo(() => generateParticles(280), []);

  const companies = [
    "Siemens",
    "Bosch",
    "Schneider Electric",
    "ABB",
    "Honeywell",
    "Emerson",
    "Rockwell Automation",
    "Mitsubishi Electric",
  ];

  return (
    <section 
      data-nav-theme="white"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#0A0A0A]"
    >
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              particle.color === "primary" 
                ? "bg-primary" 
                : "bg-white/80"
            }`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, particle.opacity, particle.opacity * 0.6, 0],
              scale: [0.3, 1, 0.9, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Converging particle stream toward laser */}
        {Array.from({ length: 80 }, (_, i) => {
          const size = 1 + Math.random() * 3;
          return (
            <motion.div
              key={`stream-${i}`}
              className="absolute rounded-full bg-primary"
              style={{
                width: size,
                height: size,
                left: "55%",
                top: "50%",
              }}
              initial={{ 
                x: Math.random() * 600 - 300,
                y: Math.random() * 300 - 150,
                opacity: 0,
              }}
              animate={{ 
                x: [null, 0],
                y: [null, 0],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Green Laser Beam */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 right-0 h-[2px]"
          style={{
            left: "55%",
            background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 30%, transparent 100%)",
            boxShadow: "0 0 25px hsl(var(--primary)), 0 0 50px hsl(var(--primary)), 0 0 80px hsl(var(--primary))",
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "45%", opacity: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        />

        {/* Laser Glow Point */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: "55%",
            width: 14,
            height: 14,
            background: "hsl(var(--primary))",
            boxShadow: "0 0 35px 20px hsl(var(--primary) / 0.5), 0 0 70px 35px hsl(var(--primary) / 0.25)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 1, 1] }}
          transition={{ 
            scale: { duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            opacity: { duration: 0.4, delay: 0.3 }
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center relative z-10 pt-32 lg:pt-40">
        <div className="px-6 lg:px-12 xl:px-24 w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-20"
            >
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.95] text-white"
              >
                YVOO<br />
                Intelligence<br />
                Platform
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/60 text-xl lg:text-2xl mt-8 max-w-lg"
              >
                The Future of AI-Driven<br />
                Supplier Search & Audit
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10"
              >
                <Button asChild size="lg">
                  <a 
                    href="https://calendly.com/yvoo/demo-yvoo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request a demo
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Tagline */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="hidden lg:block lg:pl-20"
            >
              <p className="text-white/70 text-lg lg:text-xl leading-relaxed">
                Always <span className="text-primary font-medium">Ground Truth</span>. Verifiable data<br />
                for critical business decisions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scrolling Client Band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="bg-black/40 backdrop-blur-sm py-8 overflow-hidden mt-auto relative z-10 border-t border-white/10"
      >
        <div className="relative flex">
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-16 items-center">
                {companies.map((company, idx) => (
                  <span
                    key={idx}
                    className="text-xl font-semibold text-white/40 tracking-wide hover:text-white/60 transition-colors"
                  >
                    {company}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
