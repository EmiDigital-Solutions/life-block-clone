import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useContentByType } from "@/hooks/useContentQuery";
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
      className="relative min-h-screen flex flex-col overflow-hidden bg-white"
    >
      {/* Video Background Container */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scale(1.1)', objectPosition: 'center center' }}
        >
          <source src="/videos/auditors-hero-background.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-start relative z-10">
        <div className="pl-6 lg:pl-12 xl:pl-16 pr-6 pt-24 lg:pt-32 pb-8">
          
          {/* Offmenu-style Content Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl lg:max-w-2xl"
          >
            {/* Frosted Glass Card */}
            <div className="bg-[#ebebeb]/90 backdrop-blur-xl rounded-[32px] p-8 sm:p-10 lg:p-14">
              
              {/* Tagline Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  {heroContent.tagline}
                </span>
              </motion.div>

              {/* Main Heading - Offmenu mixed weight style */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-[68px] font-extrabold leading-[1.1] tracking-[-0.02em] mb-6"
              >
                <span className="text-foreground">On-Site Supplier</span>
                <br />
                <span className="text-foreground">Audits in</span>{" "}
                <span className="text-primary">Days,</span>
                <br />
                <span className="text-foreground">Not Weeks.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-xl"
              >
                {heroContent.subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center mb-8"
              >
                <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 text-base shadow-lg text-white bg-foreground hover:bg-foreground/90">
                  Order Audit
                  <PixelIcon 
                    name="arrow-right" 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    color="currentColor"
                  />
                </button>
                <button className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-medium transition-all duration-300 text-base text-foreground hover:bg-white/50">
                  How it works
                  <PixelIcon 
                    name="arrow-right" 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    color="currentColor"
                  />
                </button>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="pt-6 border-t border-gray-300/50"
              >
                <p className="text-sm text-muted-foreground mb-3">
                  Auditors certified by:
                </p>
                <div className="flex flex-wrap gap-3">
                  {["TÜV SÜD", "Bureau Veritas", "SGS", "DNV"].map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scrolling Client Band - Offmenu style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="bg-white py-8 overflow-hidden mt-auto relative z-10"
      >
        <div className="container mx-auto px-6 mb-4">
          <p className="text-sm text-muted-foreground font-medium">
            Trusted by leading enterprises
          </p>
        </div>
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
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-16 items-center">
                {companies.map((company, idx) => (
                  <span
                    key={idx}
                    className="text-xl font-semibold text-gray-300 tracking-wide hover:text-gray-500 transition-colors"
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
