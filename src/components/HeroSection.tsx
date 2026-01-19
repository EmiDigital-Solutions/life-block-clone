import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useContentByType } from "@/hooks/useContentQuery";
import { Button } from "@/components/ui/button";

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
      {/* Full-screen Image Carousel Background */}
      <div className="absolute inset-0 z-0">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
      </div>

      {/* Main Content - Archlet Style: Centered vertically, left-aligned */}
      <div className="flex-1 flex items-center relative z-10 pt-32 lg:pt-40">
        <div className="px-6 lg:px-12 xl:px-24 w-full max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
            {/* Eyebrow Text - Archlet Style */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/50 text-sm tracking-widest uppercase mb-6"
            >
              AI-Powered Supplier Audits
            </motion.p>

            {/* Main Headline - Archlet Style, 2 rows only */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.03em] leading-[0.95] text-white max-w-5xl"
            >
              Supplier Audits<br />
              in Days, Not Weeks.
            </motion.h1>

            {/* Subtitle + CTA Container - Right aligned below headline like Archlet */}
            <div className="mt-12 lg:mt-16 lg:ml-[50%] max-w-xl">
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white/70 text-lg lg:text-xl mb-8"
              >
                The all-in-one platform that makes supplier qualification faster and more transparent with certified auditors worldwide.
              </motion.p>

              {/* CTA Button + Urgency Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Button asChild size="lg">
                    <a 
                      href="https://calendly.com/yvoo/demo-yvoo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Request a demo
                    </a>
                  </Button>
                </div>
                
                {/* Urgency Counter - Below CTA */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-sm text-white/60">
                    47 audits booked this week
                  </span>
                </div>
              </motion.div>

              {/* Certification Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8"
              >
                <p className="text-white/50 text-sm mb-3">Auditors certified by:</p>
                <div className="flex flex-wrap gap-2">
                  {["TÜV SÜD", "Bureau Veritas", "SGS", "DNV"].map((badge) => (
                    <span
                      key={badge}
                      className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 backdrop-blur-sm border border-white/20"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
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