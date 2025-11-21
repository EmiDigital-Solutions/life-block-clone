import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useContentByType } from "@/hooks/useContentQuery";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20">
        {/* Centered Content */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight text-gray-900"
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
            className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <button className="group inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 text-base">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-900 px-8 py-4 rounded-full font-medium hover:border-gray-900 transition-all duration-300 text-base">
              View Pricing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-12 left-0 right-0"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 mb-6">
              Trusted by world's most exciting brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-40">
              {[
                "Siemens",
                "Bosch",
                "Schneider",
                "ABB",
                "Honeywell",
                "Emerson",
              ].map((company, idx) => (
                <span
                  key={idx}
                  className="text-sm sm:text-base font-medium text-gray-900 tracking-wide"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
