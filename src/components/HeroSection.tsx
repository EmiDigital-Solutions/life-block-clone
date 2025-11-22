import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useContentByType } from "@/hooks/useContentQuery";
import heroCharacter from "@/assets/hero-character.png";
import { PixelIcon } from "./PixelIcon";

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState({
    tagline: "2,000+ Auditors · 90+ Countries · AI-Powered",
    heading: "On-Site Supplier Audits in Days, Not Weeks",
    subtitle: "Physical factory assessments starting from €700",
  });

  const { data: heroData } = useContentByType("hero_content");

  useEffect(() => {
    if (heroData && heroData.length > 0) {
      const mainHero = heroData[0];
      setHeroContent({
        tagline: mainHero.body?.tagline || heroContent.tagline,
        heading: mainHero.title || heroContent.heading,
        subtitle: mainHero.body?.subtitle || heroContent.subtitle,
      });
    }
  }, [heroData]);

  return (
    <section 
      data-nav-theme="light"
      className="relative min-h-screen flex flex-col bg-gray-50"
    >
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-4 sm:pb-8">
        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
          
          {/* Character Image - Right on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start order-1 lg:order-2 -mt-4 sm:-mt-8 lg:-mt-0"
          >
            <img 
              src={heroCharacter} 
              alt="3D Character" 
              className="w-full max-w-[280px] sm:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
            />
          </motion.div>

          {/* Text Content - Left on Desktop */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight text-gray-900"
            >
              {heroContent.heading.split(' ').slice(0, -3).join(' ')}{' '}
              <span className="text-primary">
                {heroContent.heading.split(' ').slice(-3).join(' ')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl lg:text-2xl text-gray-600 max-w-3xl lg:max-w-none"
            >
              {heroContent.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-6 sm:gap-8 justify-center lg:justify-start items-center lg:items-start pt-2 sm:pt-4"
            >
              <button className="group inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 text-sm sm:text-base">
                Order Audit
                <PixelIcon 
                  name="arrow-right" 
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" 
                  color="white"
                />
              </button>
              
              {/* Auditor Certifications */}
              <p className="text-xs sm:text-sm text-gray-600 text-center lg:text-left leading-relaxed">
                Our auditor network includes professionals certified by:{" "}
                <span className="font-medium text-gray-900">TÜV SÜD</span>
                {" • "}
                <span className="font-medium text-gray-900">Bureau Veritas</span>
                {" • "}
                <span className="font-medium text-gray-900">SGS</span>
                {" • "}
                <span className="font-medium text-gray-900">DNV</span>
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scrolling Client Band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="bg-white border-t border-gray-200 py-6 overflow-hidden mt-auto"
      >
          <p className="text-center text-sm text-gray-500 mb-4">
            Trusted by world's most exciting brands
          </p>
          <div className="relative flex">
            <motion.div
              className="flex gap-12 whitespace-nowrap"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-12 items-center">
                  {[
                    "Siemens",
                    "Bosch",
                    "Schneider Electric",
                    "ABB",
                    "Honeywell",
                    "Emerson",
                    "Rockwell Automation",
                    "Mitsubishi Electric",
                  ].map((company, idx) => (
                    <span
                      key={idx}
                      className="text-base font-medium text-gray-400 tracking-wide"
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
