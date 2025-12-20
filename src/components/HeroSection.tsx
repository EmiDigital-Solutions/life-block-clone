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
          
          {/* Simple Headline Layout */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl lg:max-w-3xl"
          >
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground shadow-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                2,000+ Auditors · 90+ Countries · AI-Powered
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="section-headline text-foreground mb-6"
              style={{ textShadow: '0 2px 20px rgba(255,255,255,0.8)' }}
            >
              On-Site Supplier Audits
              <br />
              in Days, Not Weeks.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-foreground mb-8"
            >
              Physical factory assessments starting from €700
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <a 
                href="https://calendly.com/yvoo/demo-yvoo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold transition-all duration-300 text-base text-white bg-[#0A7FA5] hover:bg-[#0A7FA5]/90"
              >
                Order Audit
              </a>
              <a 
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-4 py-4 font-medium text-foreground hover:text-foreground/70 transition-colors"
              >
                How it works
                <span className="text-lg">→</span>
              </a>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-sm text-foreground mb-3">
                Auditors certified by:
              </p>
              <div className="flex flex-wrap gap-2">
                {["TÜV SÜD", "Bureau Veritas", "SGS", "DNV"].map((cert, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground border border-border/50 shadow-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
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
