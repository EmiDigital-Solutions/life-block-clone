import { motion } from "framer-motion";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

// Generate funnel-shaped particles (wide on left, converging to right)
const generateFunnelParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    // X position: 0% to 55% (left side to laser point)
    const xProgress = Math.random(); // 0 to 1
    const x = xProgress * 55;
    
    // Y spread: wide on left (0), narrow at laser point (1)
    // Creates funnel shape - vertical spread decreases as x increases
    const maxYSpread = 50 - (xProgress * 40); // 50% spread at left, 10% at right
    const yOffset = (Math.random() - 0.5) * 2 * maxYSpread;
    const y = 50 + yOffset; // Center at 50%
    
    // Density: more particles cluster near the convergence point
    const densityBoost = xProgress > 0.6 ? 1.5 : 1;
    
    return {
      id: i,
      x,
      y,
      size: Math.random() * 3 + 0.5,
      color: Math.random() > 0.65 ? "primary" : "white",
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
      opacity: (0.3 + Math.random() * 0.5) * densityBoost,
    };
  });
};

// Generate streaming particles that flow toward the laser
const generateStreamParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    // Start position in funnel area
    const startX = Math.random() * 40; // Start from left 40%
    const startYSpread = 50 - (startX / 40) * 35;
    const startYOffset = (Math.random() - 0.5) * 2 * startYSpread;
    
    return {
      id: i,
      startX: startX,
      startY: 50 + startYOffset,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 3,
    };
  });
};

const HeroSection = () => {
  const funnelParticles = useMemo(() => generateFunnelParticles(320), []);
  const streamParticles = useMemo(() => generateStreamParticles(60), []);

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
      {/* Particle Background - Funnel Shape */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Static funnel particles with subtle pulsing */}
        {funnelParticles.map((particle) => (
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
              opacity: [0, particle.opacity, particle.opacity * 0.7, particle.opacity, 0],
              scale: [0.5, 1, 0.9, 1, 0.5],
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

        {/* Flowing stream particles - move from funnel toward laser */}
        {streamParticles.map((particle) => (
          <motion.div
            key={`stream-${particle.id}`}
            className="absolute rounded-full bg-primary"
            style={{
              width: particle.size,
              height: particle.size,
            }}
            initial={{ 
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{ 
              left: ["", "55%"],
              top: ["", "50%"],
              opacity: [0, 0.8, 0.9, 0],
              scale: [0.5, 1, 1.2, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeIn",
            }}
          />
        ))}

        {/* Dense convergence cluster at laser origin */}
        {Array.from({ length: 100 }, (_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 8;
          return (
            <motion.div
              key={`cluster-${i}`}
              className="absolute rounded-full bg-primary"
              style={{
                width: 1 + Math.random() * 2,
                height: 1 + Math.random() * 2,
                left: `calc(55% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.3, 0.9, 0.5, 0.9, 0.3],
                scale: [0.8, 1.2, 1, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
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
            width: 16,
            height: 16,
            background: "hsl(var(--primary))",
            boxShadow: "0 0 40px 25px hsl(var(--primary) / 0.5), 0 0 80px 40px hsl(var(--primary) / 0.25)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 1, 1] }}
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
