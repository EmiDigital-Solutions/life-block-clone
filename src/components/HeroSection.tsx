import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useContentByType } from "@/hooks/useContentQuery";
import PlatformDemoAnimation from "./PlatformDemoAnimation";

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
      className="relative min-h-screen flex flex-col overflow-hidden bg-muted"
    >
      {/* Main Content - Split Screen */}
      <div className="flex-1 flex items-center relative z-10 pt-28 pb-8">
        <div className="w-full px-4 lg:px-8 lg:ml-4 xl:ml-8 2xl:ml-12">
          <div className="grid grid-cols-1 lg:grid-cols-[0.65fr_1.6fr] gap-8 lg:gap-10 items-center">
            
            {/* Left Column - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg relative z-20"
            >
              {/* Tagline Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-5"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-foreground shadow-sm border border-border">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  2,000+ Auditors · 90+ Countries · AI-Powered
                </span>
              </motion.div>

              {/* Main Heading - 2 lines max */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-medium tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-foreground mb-5"
              >
                <span className="block">On-Site Supplier Audits</span>
                <span className="block">in Days, Not Weeks.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base text-muted-foreground mb-6"
              >
                Physical factory assessments starting from €700
              </motion.p>

              {/* CTA with Pricing - text only for price, next to button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 mb-6"
              >
                <span className="text-base text-foreground font-medium">
                  Audit starts at €700
                </span>
                <a 
                  href="https://calendly.com/yvoo/demo-yvoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-base text-white bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-lg"
                >
                  Order YVOO Audit
                  <span>→</span>
                </a>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="text-sm text-muted-foreground mb-3">
                  Auditors certified by:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["TÜV SÜD", "Bureau Veritas", "SGS", "DNV"].map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-foreground border border-border shadow-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Demo Animation (Larger) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10 mt-10 lg:mt-0 lg:-mr-28 xl:-mr-44 2xl:-mr-56"
            >
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.2), 0 30px 60px -30px rgba(0, 0, 0, 0.25)',
                }}
              >
                <PlatformDemoAnimation />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scrolling Client Band */}
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