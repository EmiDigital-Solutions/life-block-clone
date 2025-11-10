import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useContentByType } from "@/hooks/useContentQuery";
import heroImage from "@/assets/hero-industrial-aerial.jpg";

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState({
    tagline: "Solution",
    heading: "On-Site Supplier Audits in Days, Not Weeks",
    subtitle: "Every aspect of supply chain due diligence. One simple solution.",
    description: "Physical factory assessments (ISO, VDA, IATF) starting from €700. AI-powered intelligence with certified auditors across 90+ countries. 70% cost reduction and 80% time savings with global coverage.",
    ctaText: "Talk to an expert"
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
    <section data-nav-theme="dark" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Industrial supply chain facilities aerial view" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="w-full max-w-5xl mx-auto text-center">
          
          {/* Solution Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block text-sm font-semibold text-white/80 uppercase tracking-wider">
              {heroContent.tagline}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8"
          >
            {heroContent.heading}
          </motion.h1>

          {/* Bold Subtitle */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-[1.3] mb-8 max-w-3xl mx-auto"
          >
            {heroContent.subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-12"
          >
            {heroContent.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="bg-[#C9FF00] text-gray-900 px-8 py-4 rounded-md font-bold text-base sm:text-lg transition-all duration-300 hover:bg-[#B8EF00] hover:scale-105 shadow-xl">
              {heroContent.ctaText}
            </button>
          </motion.div>

        </div>
      </div>

      {/* Company Logos Section */}
      <div className="relative z-20 bg-white py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-sm sm:text-base font-semibold text-gray-700">
              ESG due diligence software for the world's largest supply chains:
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
            <span className="text-base sm:text-lg font-bold text-gray-800">BMW</span>
            <span className="text-base sm:text-lg font-bold text-gray-800">MERCEDES-BENZ</span>
            <span className="text-base sm:text-lg font-bold text-gray-800">LINDE</span>
            <span className="text-base sm:text-lg font-bold text-gray-800">BOSCH</span>
            <span className="text-base sm:text-lg font-bold text-gray-800">SIEMENS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;