import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useContentByType } from "@/hooks/useContentQuery";
import heroSphereImage from "@/assets/hero-particle-sphere.png";


const HeroSection = () => {
  const isMobile = useIsMobile();
  const [heroContent, setHeroContent] = useState({
    tagline: "2,000+ Auditors · 90+ Countries · AI-Powered",
    heading: "On-Site Supplier Audits in Days, Not Weeks",
    subtitle: "70% Cost Reduction · 80% Time Savings · Global Coverage",
    description: "Physical factory assessments (ISO, VDA, IATF) starting from €700. AI-powered intelligence with certified auditors across 90+ countries.",
    ctaText: "Experience a Connectimus Audit"
  });

  // Fetch hero content from CMS
  const { data: heroData } = useContentByType("hero_content");

  // Process hero content
  useEffect(() => {
    if (heroData && heroData.length > 0) {
      const mainHero = heroData[0];
      setHeroContent({
        tagline: mainHero.body?.tagline || heroContent.tagline,
        heading: mainHero.title || heroContent.heading,
        subtitle: mainHero.body?.subtitle || heroContent.subtitle,
        description: mainHero.body?.content || heroContent.description,
        ctaText: mainHero.body?.ctaText || heroContent.ctaText
      });
    }
  }, [heroData]);

  return (
    <section data-nav-theme="dark" className="relative min-h-screen flex flex-col overflow-hidden bg-black pb-24 sm:pb-28 lg:pb-0">
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 flex-1 flex items-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-24" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-6 xl:gap-20 2xl:gap-28 items-center">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col space-y-6 md:space-y-8 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <div className="flex items-center gap-4 text-white/60 text-sm font-sans">
                  <div className="h-px w-12 bg-cyan-400/40"></div>
                  <span>{heroContent.tagline}</span>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6"
              >
                {heroContent.heading}
              </motion.h1>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl lg:text-2xl font-medium text-cyan-400/90 leading-[1.4] mb-8"
              >
                {heroContent.subtitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg font-normal text-white/70 leading-[1.6] max-w-[600px] mb-12"
              >
                {heroContent.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex"
              >
                <button className="bg-white text-gray-900 px-7 py-3.5 rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
                  {heroContent.ctaText}
                </button>
              </motion.div>
            </div>

            {/* Right Column: Particle Sphere Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-center order-first lg:order-last"
            >
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
                <img 
                  src={heroSphereImage} 
                  alt="Particle Sphere Visualization" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Animated Company Names Band - White Background */}
      <div className="relative bottom-0 left-0 right-0 py-4 sm:py-5 lg:py-6 overflow-hidden bg-white border-t border-gray-200 z-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-3">
              <span className="text-xs sm:text-sm font-semibold text-gray-600">Trusted by Global Industry Leaders</span>
            </div>
            <div className="flex whitespace-nowrap">
              <motion.div
                animate={{ x: [0, -1920] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
                className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12"
              >
                {[...Array(3)].map((_, index) => (
                  <div key={`band1-${index}`} className="flex items-center gap-8 sm:gap-12">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">BMW</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">MERCEDES-BENZ</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">LINDE</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">BOSCH</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">SIEMENS</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">VOLKSWAGEN</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">AUDI</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">CONTINENTAL</span>
                  </div>
                ))}
              </motion.div>
              <motion.div
                animate={{ x: [0, -1920] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                  },
                }}
                className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12"
                aria-hidden="true"
              >
                {[...Array(3)].map((_, index) => (
                  <div key={`band2-${index}`} className="flex items-center gap-8 sm:gap-12">
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">BMW</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">MERCEDES-BENZ</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">LINDE</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">BOSCH</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">SIEMENS</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">VOLKSWAGEN</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">AUDI</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">CONTINENTAL</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default HeroSection;