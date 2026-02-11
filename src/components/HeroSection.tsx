import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";


// Generate static funnel-shaped particles (wide on left, converging to right)
const generateFunnelParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    // X position: 0% to 60% (left side to laser point)
    const xProgress = Math.random();
    const x = xProgress * 60;
    
    // Y spread: wide on left (0), narrow at laser point (1)
    const maxYSpread = 50 - (xProgress * 42);
    const yOffset = (Math.random() - 0.5) * 2 * maxYSpread;
    const y = 50 + yOffset;
    
    // Larger particles, varying size based on position
    const baseSize = 2 + Math.random() * 4;
    const size = xProgress > 0.7 ? baseSize * 0.7 : baseSize;
    
    // More green particles throughout - higher probability
    const isGreen = xProgress > 0.3 ? Math.random() > 0.2 : Math.random() > 0.4;
    
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
  const particles = useMemo(() => generateFunnelParticles(1200), []);

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
      className="relative min-h-screen flex flex-col overflow-hidden bg-hero-background"
    >
      {/* Static Particle Background - Funnel Shape */}
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
            }}
            animate={{ 
              opacity: [0.3, 1, 0.4, 0.9, 0.3],
            }}
            transition={{
              duration: 1.5 + Math.random() * 1.5,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <div 
              className={`w-full h-full rounded-full ${
                particle.isGreen 
                  ? "bg-primary" 
                  : "bg-foreground"
              }`}
            />
          </motion.div>
        ))}

        {/* AI Iris Wheel at Focal Point - positioned at convergence */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center z-10"
          style={{ left: "60%", width: 800, height: 800 }}
        >
          {/* Outer glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: 1100,
              height: 1100,
              background: "radial-gradient(circle, rgba(10, 150, 200, 0.25) 0%, transparent 70%)",
            }}
          />
          
          {/* Rotating particle wheel */}
          <motion.div
            className="absolute"
            style={{ width: 800, height: 800 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 48 }, (_, spoke) => {
              const angle = (spoke / 48) * 360;
              const radians = (angle * Math.PI) / 180;
              
              const brandColors = {
                blue: "#0EAAD8",
                amber: "#F5A623",
                green: "#3DC88E",
                red: "#E04545",
              };
              
              let spokeColor: string;
              if (spoke === 12) spokeColor = brandColors.red;
              else if (spoke === 24) spokeColor = brandColors.green;
              else if (spoke === 36) spokeColor = brandColors.amber;
              else spokeColor = brandColors.blue;
              
              return Array.from({ length: 5 }, (_, p) => {
                const innerRadius = 168;
                const particleSpacing = 24;
                const radius = innerRadius + p * particleSpacing;
                const particleSize = 14 + (4 - p) * 2;
                
                const x = Math.sin(radians) * radius;
                const y = -Math.cos(radians) * radius;
                
                return (
                  <div
                    key={`${spoke}-${p}`}
                    className="absolute rounded-full"
                    style={{
                      width: particleSize,
                      height: particleSize,
                      backgroundColor: spokeColor,
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      opacity: 1 - p * 0.1,
                    }}
                  />
                );
              });
            })}
          </motion.div>
          
          {/* Center point */}
            <div
              className="absolute rounded-full"
              style={{
                width: 22,
                height: 22,
              background: "radial-gradient(circle, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.8) 100%)",
              boxShadow: "inset 0 0 30px rgba(14, 170, 216, 0.4)",
            }}
          />
        </div>

        {/* Red particles pushed away backwards from focal point */}
        {Array.from({ length: 120 }, (_, i) => {
          const angle = Math.PI + (Math.random() - 0.5) * Math.PI * 0.9;
          const startRadius = 30;
          const endRadius = 200 + Math.random() * 160;
          const size = 3 + Math.random() * 5;
          const duration = 6 + Math.random() * 5;
          const delay = Math.random() * 6;
          
          return (
            <motion.div
              key={`red-${i}`}
              className="absolute rounded-full bg-destructive"
              style={{
                width: size,
                height: size,
              }}
              initial={{
                left: `calc(60% + ${Math.cos(angle) * startRadius}px)`,
                top: `calc(50% + ${Math.sin(angle) * startRadius}px)`,
                opacity: 0,
              }}
              animate={{
                left: [
                  `calc(60% + ${Math.cos(angle) * startRadius}px)`,
                  `calc(60% + ${Math.cos(angle) * endRadius}px)`,
                ],
                top: [
                  `calc(50% + ${Math.sin(angle) * startRadius}px)`,
                  `calc(50% + ${Math.sin(angle) * endRadius}px)`,
                ],
                opacity: [0, 1, 0.8, 0],
                scale: [0.5, 1, 0.8, 0.3],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeOut",
              }}
            />
          );
        })}

        {/* Green particles passing through the wheel to the laser line */}
        {Array.from({ length: 30 }, (_, i) => {
          const startX = 60;
          const endX = 75 + Math.random() * 20; // End along the laser line
          const yOffset = (Math.random() - 0.5) * 12;
          const size = 4 + Math.random() * 4;
          const duration = 8 + Math.random() * 4; // Very slow, smooth flow
          const delay = Math.random() * 8;
          
          return (
            <motion.div
              key={`through-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: '#6EA996',
              }}
              initial={{
                left: `${startX}%`,
                top: `calc(50% + ${yOffset}px)`,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                left: [`${startX}%`, `${endX}%`],
                opacity: [0, 1, 1, 0.8, 0],
                scale: [0.5, 1.2, 1, 0.8, 0.3],
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeOut",
              }}
            />
          );
        })}

        <div className="absolute top-1/2 -translate-y-1/2 right-0" style={{ left: "60%" }}>
          {/* Approved Suppliers label */}
          <motion.span
            className="absolute -top-7 left-[11vw] text-sm font-medium tracking-wider uppercase text-foreground/60 whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Approved Suppliers
          </motion.span>
          
          {/* The laser beam */}
          <motion.div
            className="h-[3px] w-full"
            style={{
              background: "linear-gradient(90deg, #0A7FA5 0%, #0A7FA5 10%, #6EA996 20%, #6EA996 85%, transparent 100%)",
              boxShadow: "0 0 20px rgba(110, 169, 150, 0.5), 0 0 40px rgba(110, 169, 150, 0.3)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "45vw", opacity: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />
        </div>
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
              className="text-foreground/60 text-sm tracking-widest uppercase mb-6"
            >
              AI-Powered Intelligence Platform
            </motion.p>

            {/* Main Headline */}
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
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-foreground/60 text-lg lg:text-xl mb-8"
              >
                The Future of AI-Driven Supplier Search & Audit
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-foreground/60 text-base lg:text-lg mb-8"
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
        className="bg-foreground/5 py-8 overflow-hidden mt-auto relative z-10 border-t border-foreground/10"
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
