import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Pause } from "lucide-react";
import christophPortrait from "@/assets/testimonial-christoph-seeholzer.jpg";
import PlatformDemoAnimation from "./PlatformDemoAnimation";

const TestimonialSection = () => {
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="relative py-12 md:py-16 lg:py-20 pb-24 md:pb-36 lg:pb-44">
        {/* Section Headline */}
        <div className="container mx-auto px-6 mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-headline text-center text-foreground"
          >
            Watch Complexity Disappear
          </motion.h2>
        </div>

        {/* Platform Demo Animation - Larger floating card with play button */}
        <div className="container mx-auto px-6 mb-20 md:mb-28 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              style={{
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.15), 0 30px 60px -30px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => setIsDemoPlaying(true)}
            >
              {/* Demo content */}
              <div className={`transition-opacity duration-500 ${isDemoPlaying ? 'opacity-100' : 'opacity-100'}`}>
                <PlatformDemoAnimation />
              </div>

              {/* Play/Pause button overlay */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transition-colors ${
                  isDemoPlaying ? 'bg-transparent opacity-0 hover:opacity-100 hover:bg-black/10' : 'bg-black/20 group-hover:bg-black/30'
                }`}
              >
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-2xl flex items-center justify-center transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDemoPlaying(!isDemoPlaying);
                  }}
                >
                  {isDemoPlaying ? (
                    <Pause className="w-8 h-8 md:w-10 md:h-10 text-foreground" fill="currentColor" />
                  ) : (
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-foreground ml-1" fill="currentColor" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Headline and testimonial */}
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left: Headline with highlighted word */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.1] text-foreground">
                  <span className="block">Built for</span>
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10">high‑performance</span>
                    <span 
                      className="absolute inset-0 -inset-x-2 -inset-y-1 -skew-x-3 rounded-lg bg-accent"
                      style={{ zIndex: 0 }}
                    />
                  </span>
                  <span className="block whitespace-nowrap">B2B Supply Chains.</span>
                </h2>
              </motion.div>

              {/* Right: Testimonial */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:pt-4"
              >
                {/* Brand logo placeholder */}
                <p className="text-xl md:text-2xl font-semibold text-primary mb-4">
                  ScanPro+
                </p>
                
                {/* Quote */}
                <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
                  "It's a game changer"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <img 
                    src={christophPortrait} 
                    alt="Christoph Seeholzer" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  />
                  <p className="text-base text-muted-foreground">
                    Christoph Seeholzer, Director Linde
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;