import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ParticleGlobe } from "./ParticleGlobe";

const HeroSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-black to-black opacity-90"></div>

      {/* 3D Particle Globe - Right Side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px]">
            <ParticleGlobe />
          </div>
        </div>
        {/* Sparkle effects */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-75"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Left Side Content */}
          <div className="lg:w-1/2">
            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <div className="flex items-center gap-4 text-white/60 text-sm font-sans mb-8">
                <div className="h-px w-16 bg-cyan-400/40"></div>
                <span>2,000+ Auditors · 90+ Countries · AI-Powered</span>
                <div className="h-px w-16 bg-cyan-400/40"></div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-serif text-white leading-tight"
            >
              <span className="text-cyan-400">On-Site Supplier</span>
              <br />
              Evaluations in Days,{" "}
              <span className="text-white">Not Weeks</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/70 font-sans mt-8 max-w-xl"
            >
              Physical factory assessments (ISO, VDA, IATF, etc.) from €700.
              <br />
              Get actionable intelligence powered by AI and our global auditor network—not desk audits.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12"
            >
              <button className="bg-cyan-400 hover:bg-cyan-500 text-black px-10 py-5 rounded-full font-sans font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl shadow-cyan-400/20 uppercase tracking-wide">
                Exclusive Opportunity for New Clients!
              </button>
              <p className="text-white/60 text-sm mt-4">
                Benefit from a 50% introductory discount on your first ScanPro+ supplier evaluation
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 mt-12"
            >
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Your standards, your requirements</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Certified auditors</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>OEM-grade quality</span>
              </div>
            </motion.div>
          </div>
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
