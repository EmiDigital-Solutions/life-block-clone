import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useContentByType } from "@/hooks/useContentQuery";
import { PixelIcon } from "./PixelIcon";

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState({
    tagline: "AI Computer Vision",
    heading: "Supplier Audits in days, not weeks.",
    subtitle: "",
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
      data-nav-theme="black"
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
                  AI Computer Vision
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-8"
              >
                <span className="text-foreground">Supplier Audits</span>
                <br />
                <span className="text-foreground">in days, not</span>
                <br />
                <span className="text-foreground">weeks.</span>
              </motion.h1>

              {/* Bullet Points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-3 mb-8"
              >
                {[
                  "On-site audits from €700",
                  "2,000+ certified auditors",
                  "90+ countries covered"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-muted-foreground">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base lg:text-lg">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <a 
                  href="https://calendly.com/yvoo/demo-yvoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all duration-300 text-base shadow-lg text-white bg-primary hover:bg-primary/90"
                >
                  Get Started
                </a>
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
