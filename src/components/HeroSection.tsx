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
      data-nav-theme="dark"
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
              opacity: [0.15, 1, 0.2, 0.9, 0.15],
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
                  : "bg-white"
              }`}
            />
          </motion.div>
        ))}

        {/* Dense cluster at convergence point - Mixed particles */}
        {Array.from({ length: 200 }, (_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 30;
          const size = 2 + Math.random() * 4;
          const delay = Math.random() * 3;
          const isBlue = Math.random() > 0.5;
          return (
            <motion.div
              key={`cluster-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `calc(55% + ${Math.cos(angle) * radius}px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              }}
              animate={{
                opacity: [0.3, 1, 0.4, 0.95, 0.3],
              }}
              transition={{
                duration: 1 + Math.random() * 1,
                delay: delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <div className={`w-full h-full rounded-full ${isBlue ? "bg-primary" : "bg-white"}`} />
            </motion.div>
          );
        })}

        {/* Red particles pushed away backwards from focal point */}
        {Array.from({ length: 120 }, (_, i) => {
          const angle = Math.PI + (Math.random() - 0.5) * Math.PI * 0.9;
          const startRadius = 15;
          const endRadius = 100 + Math.random() * 80;
          const size = 2 + Math.random() * 4;
          const duration = 1.5 + Math.random() * 2;
          const delay = Math.random() * 4;
          
          return (
            <motion.div
              key={`red-${i}`}
              className="absolute rounded-full bg-destructive"
              style={{
                width: size,
                height: size,
              }}
              initial={{
                left: `calc(55% + ${Math.cos(angle) * startRadius}px)`,
                top: `calc(50% + ${Math.sin(angle) * startRadius}px)`,
                opacity: 0,
              }}
              animate={{
                left: [
                  `calc(55% + ${Math.cos(angle) * startRadius}px)`,
                  `calc(55% + ${Math.cos(angle) * endRadius}px)`,
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


        {/* Laser beam with label */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0" style={{ left: "55%" }}>
          {/* Approved Suppliers label */}
          <motion.span
            className="absolute -top-7 left-[11vw] text-sm font-medium tracking-wider uppercase text-white/60 whitespace-nowrap"
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
          {/* AI Processing Focal Point Animation */}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: "55%" }}
          >
            {/* Outer rotating ring */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/30"
              style={{ width: 60, height: 60 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {/* Ring segments */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary" />
            </motion.div>
            
            {/* Middle counter-rotating ring */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/40"
              style={{ width: 40, height: 40 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary" />
            </motion.div>
            
            {/* Inner pulsing core */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
              style={{ width: 18, height: 18 }}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Core glow */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 18,
                height: 18,
                background: "#0A7FA5",
                boxShadow: "0 0 30px 18px rgba(10, 127, 165, 0.4), 0 0 60px 30px rgba(10, 127, 165, 0.2)",
              }}
            />
            
            {/* Scanning lines */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{ rotate: [0, 180] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent"
              animate={{ rotate: [90, 270] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
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
              className="text-white/60 text-sm tracking-widest uppercase mb-6"
            >
              AI-Powered Intelligence Platform
            </motion.p>

            {/* Main Headline - Archlet Style, 2 rows */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-white max-w-5xl"
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
                className="text-white/60 text-lg lg:text-xl mb-8"
              >
                The Future of AI-Driven Supplier Search & Audit
              </motion.p>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white/60 text-base lg:text-lg mb-8"
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
        className="bg-white/5 backdrop-blur-sm py-8 overflow-hidden mt-auto relative z-10 border-t border-white/10"
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
