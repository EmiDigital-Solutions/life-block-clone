import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useContentByType } from "@/hooks/useContentQuery";

// Import auditor images for hero carousel background
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorMaleNorthAmerica from "@/assets/auditor-male-north-america.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState({
    tagline: "AI Computer Vision",
    heading: "Supplier Audits in days, not weeks.",
    subtitle: "",
  });

  const { data: heroData } = useContentByType("hero_content");

  const [activeIndex, setActiveIndex] = useState(0);

  // Hero carousel images matching Auditors page
  const heroImages = [
    { src: auditorEuropean, alt: 'VDA 6.3 Lead Auditor - Germany', role: 'VDA 6.3 Lead Auditor', location: 'Germany' },
    { src: auditorAsian, alt: 'ISO 9001 Specialist - Japan', role: 'ISO 9001 Specialist', location: 'Japan' },
    { src: auditorMaleNorthAmerica, alt: 'ABS & DNV-GL Auditor - USA', role: 'ABS & DNV-GL Auditor', location: 'USA' },
    { src: auditorMiddleEast, alt: 'API & ISO 29001 Auditor - UAE', role: 'API & ISO 29001 Auditor', location: 'UAE' },
    { src: auditorLatin, alt: 'IATF 16949 Specialist - Mexico', role: 'IATF 16949 Specialist', location: 'Mexico' },
    { src: auditorSouthAsian, alt: 'AS9100 Lead Auditor - India', role: 'AS9100 Lead Auditor', location: 'India' },
    { src: auditorAfrican, alt: 'Mining & Energy Auditor - South Africa', role: 'Mining & Energy Auditor', location: 'South Africa' },
    { src: auditorFemaleEuropean, alt: 'Pharmaceutical GMP Auditor - Switzerland', role: 'Pharmaceutical GMP Auditor', location: 'Switzerland' },
  ];

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Image Carousel Background - 60% height */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] z-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === activeIndex ? 1 : 0,
              scale: index === activeIndex ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Main Content - Bottom Left Corner */}
      <div className="flex-1 flex items-end relative z-10 pb-12 lg:pb-16">
        <div className="px-6 lg:px-12 xl:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
            {/* Single Line Headline - Big Font */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-bold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white"
            >
              On-Site Supplier Audits in Days, Not Weeks.
            </motion.h1>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 lg:mt-10"
            >
              <a 
                href="https://calendly.com/yvoo/demo-yvoo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 text-lg text-white bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
              >
                Order YVOO Audit — from €700
                <span>→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Client Band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
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