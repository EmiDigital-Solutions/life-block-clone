import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";

// Generate random particles
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 60, // Left 60% of screen
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color: Math.random() > 0.6 ? "primary" : "white",
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));
};

const HeroSection = () => {
  const particles = useMemo(() => generateParticles(150), []);

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
              opacity: [0, 0.8, 0.4, 0.8, 0],
              scale: [0.5, 1, 0.8, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}

        {/* Converging particle stream toward laser */}
        {Array.from({ length: 40 }, (_, i) => {
          const size = 2 + Math.random() * 2;
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
                x: Math.random() * 400 - 200,
                y: Math.random() * 200 - 100,
                opacity: 0,
              }}
              animate={{ 
                x: [null, 0],
                y: [null, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          );
        })}

        {/* Green Laser Beam */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 right-0 h-[3px]"
          style={{
            left: "55%",
            background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 20%, transparent 100%)",
            boxShadow: "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary)), 0 0 60px hsl(var(--primary))",
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "45%", opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />

        {/* Laser Glow Point */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: "55%",
            width: 12,
            height: 12,
            background: "hsl(var(--primary))",
            boxShadow: "0 0 30px 15px hsl(var(--primary) / 0.6), 0 0 60px 30px hsl(var(--primary) / 0.3)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: 1 }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse" },
            opacity: { duration: 0.5, delay: 0.5 }
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
