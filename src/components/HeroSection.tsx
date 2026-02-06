import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";

// Generate static funnel-shaped particles (wide on left, converging to right)
const generateFunnelParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    // X position: 0% to 55% (left side to laser point)
    const xProgress = Math.random();
    const x = xProgress * 55;
    
    // Y spread: wide on left (0), narrow at laser point (1)
    const maxYSpread = 50 - (xProgress * 42);
    const yOffset = (Math.random() - 0.5) * 2 * maxYSpread;
    const y = 50 + yOffset;
    
    // Larger particles, varying size based on position
    const baseSize = 2 + Math.random() * 4;
    const size = xProgress > 0.7 ? baseSize * 0.7 : baseSize;
    
    // More green particles near the laser
    const isGreen = xProgress > 0.5 ? Math.random() > 0.4 : Math.random() > 0.7;
    
    // Higher opacity for visibility
    const opacity = 0.5 + Math.random() * 0.5;
    
    return {
      id: i,
      x,
      y,
      size,
      isGreen,
      opacity,
      delay: Math.random() * 4,
    };
  });
};

const HeroSection = () => {
  const particles = useMemo(() => generateFunnelParticles(600), []);

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
      data-nav-theme="light"
      className="relative min-h-screen flex flex-col overflow-hidden bg-background"
    >
      {/* Static Particle Background - Funnel Shape (Light Theme) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.isGreen 
                ? "hsl(var(--primary))" 
                : "#0A0A0A",
            }}
            animate={{ 
              opacity: [0.15, 1, 0.2, 0.9, 0.15],
            }}
            transition={{
              duration: 1.5 + Math.random() * 1.5,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Dense cluster at convergence point */}
        {Array.from({ length: 150 }, (_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 25;
          const size = 1.5 + Math.random() * 3;
          const delay = Math.random() * 3;
          return (
            <motion.div
              key={`cluster-${i}`}
              className="absolute rounded-full bg-primary"
              style={{
                width: size,
                height: size,
                left: `calc(55% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              }}
              animate={{
                opacity: [0.2, 1, 0.3, 0.95, 0.2],
              }}
              transition={{
                duration: 1 + Math.random() * 1,
                delay: delay,
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
            boxShadow: "0 0 15px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.3)",
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "45%", opacity: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        />

        {/* Laser Glow Point */}
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: "55%",
            width: 14,
            height: 14,
            background: "hsl(var(--primary))",
            boxShadow: "0 0 25px 15px hsl(var(--primary) / 0.4), 0 0 50px 25px hsl(var(--primary) / 0.2)",
          }}
        />
      </div>

      {/* Main Content - Archlet Style */}
      <div className="flex-1 flex items-center relative z-10 pt-32 lg:pt-40">
        <div className="px-6 lg:px-12 xl:px-24 w-full max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
            {/* Eyebrow Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-sm tracking-widest uppercase mb-6"
            >
              AI-Powered Intelligence Platform
            </motion.p>

            {/* Main Headline - Archlet Style, 2 rows */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground max-w-5xl"
            >
              Supplier Intelligence<br />
              Platform
            </motion.h1>

            {/* Subtitle + CTA Container - Right aligned below headline */}
            <div className="mt-12 lg:mt-16 lg:ml-[50%] max-w-xl">
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-muted-foreground text-lg lg:text-xl mb-8"
              >
                The Future of AI-Driven Supplier Search & Audit
              </motion.p>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-muted-foreground text-base lg:text-lg mb-8"
              >
                Always <span className="text-primary font-medium">Ground Truth</span>. Verifiable data for critical business decisions.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Client Band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="bg-foreground/5 backdrop-blur-sm py-8 overflow-hidden mt-auto relative z-10 border-t border-foreground/10"
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
                    className="text-xl font-semibold text-foreground/40 tracking-wide hover:text-foreground/60 transition-colors"
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
