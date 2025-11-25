import { motion } from "framer-motion";
import { useState } from "react";
import buyerImage from "@/assets/supplier-portrait-hero.png";
import qualityImage from "@/assets/quality-hero-green.png";

const BuyerPainPointsSection = () => {
  const [activeRole, setActiveRole] = useState<"buyer" | "quality">("buyer");

  const buyerContent = {
    image: buyerImage,
    imageAlt: "Buyer professional considering opportunities",
    painPoints: [
      {
        text: "Screening 200+ suppliers to find the right one",
        textFull: "Screening 200+ suppliers to find the right one"
      },
      {
        text: "Analyzing 50+ criteria & justifying €25K investments",
        textFull: "Analyzing 50+ criteria & justifying €25K investments"
      },
      {
        text: "Planning annual audits & fighting for budget allocation",
        textFull: "Planning annual audits & fighting for budget allocation"
      },
      {
        text: "Aligning 5+ calendars for single audit dates",
        textFull: "Aligning 5+ calendars for single audit dates"
      },
      {
        text: "Planning, booking & traveling for manual audits",
        textFull: "Planning, booking & traveling for manual audits"
      },
      {
        text: "Chasing audit reports weeks after audit completion",
        textFull: "Chasing audit reports weeks after audit completion"
      },
      {
        text: "Following up NCs/OFIs & managing",
        textFull: "Following up NCs/OFIs & managing"
      }
    ]
  };

  const qualityContent = {
    image: qualityImage,
    imageAlt: "Quality professional reviewing standards",
    painPoints: [
      {
        text: "Searching for available auditors to cover assignments",
        textFull: "Searching for available auditors to cover assignments"
      },
      {
        text: "Turning down ad-hoc requests due to staffing gaps",
        textFull: "Turning down ad-hoc requests due to staffing gaps"
      },
      {
        text: "Creating standardized reports from manual notes",
        textFull: "Creating standardized reports from manual notes"
      },
      {
        text: "Reaching suppliers in remote Asian/African markets",
        textFull: "Reaching suppliers in remote Asian/African markets"
      },
      {
        text: "Coordinating logistics with email & spreadsheets",
        textFull: "Coordinating logistics with email & spreadsheets"
      },
      {
        text: "Following up findings manually across systems",
        textFull: "Following up findings manually across systems"
      },
      {
        text: "Employing auditors permanently",
        textFull: "Employing auditors permanently"
      }
    ]
  };

  const currentContent = activeRole === "buyer" ? buyerContent : qualityContent;

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12 sm:space-y-16"
        >
          {/* Role Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-0 p-1 rounded-full border-2 border-[#A8B8CA]">
              <button 
                onClick={() => setActiveRole("buyer")}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  activeRole === "buyer" 
                    ? "bg-gradient-to-r from-[#A8B8CA] to-[#A8C5B8] text-white shadow-sm" 
                    : "text-gray-900 hover:bg-gray-50"
                }`}
              >
                Buyer
              </button>
              <button 
                onClick={() => setActiveRole("quality")}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  activeRole === "quality" 
                    ? "bg-gradient-to-r from-[#A8B8CA] to-[#A8C5B8] text-white shadow-sm" 
                    : "text-gray-900 hover:bg-gray-50"
                }`}
              >
                Quality
              </button>
            </div>
          </div>

          {/* Headline with orange underline emphasis */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center leading-tight px-4">
            Imagine if you{" "}
            <span className="relative inline-block">
              didn't
              <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-3 bg-[#FF8B6B] opacity-50 -z-10"></span>
            </span>
            {" "}have to spend time...
          </h2>

          {/* Image with soft glowing gradient background and overlapping cards */}
          <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-[800px] lg:min-h-[1000px]">
            {/* Container for image and gradient - centered */}
            <div className="relative flex justify-center items-center lg:absolute lg:top-1/2 lg:-translate-y-1/2 mb-[-60px] sm:mb-[-80px] lg:mb-0 z-10">
              {/* Soft glowing gradient background with concentric colored rings - equal spacing */}
              <div 
                className="absolute w-[620px] h-[620px] sm:w-[920px] sm:h-[920px] md:w-[980px] md:h-[980px] rounded-full z-0"
                style={{ 
                  background: "radial-gradient(circle, rgba(168, 197, 184, 0.1) 0%, rgba(168, 197, 184, 0.08) 50%, rgba(168, 197, 184, 0) 100%)"
                }}
              ></div>
              <div 
                className="absolute w-[580px] h-[580px] sm:w-[880px] sm:h-[880px] md:w-[920px] md:h-[920px] rounded-full z-0"
                style={{ 
                  background: "radial-gradient(circle, rgba(168, 184, 202, 0.15) 0%, rgba(168, 184, 202, 0.1) 50%, rgba(168, 184, 202, 0) 100%)"
                }}
              ></div>
              <div 
                className="absolute w-[520px] h-[520px] sm:w-[820px] sm:h-[820px] md:w-[860px] md:h-[860px] rounded-full z-0"
                style={{ 
                  background: "radial-gradient(circle, rgba(168, 184, 202, 0.2) 0%, rgba(168, 184, 202, 0.15) 50%, rgba(168, 184, 202, 0) 100%)"
                }}
              ></div>
              <div 
                className="absolute w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px] rounded-full z-0"
                style={{ 
                  background: "radial-gradient(circle, rgba(168, 184, 202, 0.4) 0%, rgba(200, 200, 200, 0.3) 30%, rgba(168, 197, 184, 0.2) 60%, rgba(168, 184, 202, 0.1) 80%, rgba(168, 184, 202, 0) 100%)"
                }}
              ></div>

              {/* Photo overlay - natural rectangular shape */}
              <motion.div 
                key={activeRole}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <img 
                  src={currentContent.image} 
                  alt={currentContent.imageAlt} 
                  className="max-w-[90vw] sm:max-w-[450px] w-full h-auto object-contain mx-auto rounded-2xl"
                  style={activeRole === "buyer" ? { filter: "grayscale(100%) contrast(1.1)" } : {}}
                />
              </motion.div>
            </div>

            {/* Pain Point Cards - stacked on mobile, scattered around image on desktop */}
            <motion.div 
              key={`cards-${activeRole}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-20 w-full px-4 lg:absolute lg:inset-0 lg:px-0"
            >
              {/* Mobile: Stacked cards */}
              <div className="lg:hidden space-y-2 sm:space-y-3 md:space-y-4 max-w-2xl w-full mx-auto">
                {currentContent.painPoints.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 flex items-start gap-2 sm:gap-3 md:gap-4 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5 md:w-6 md:h-6">
                        <rect x="8" y="0" width="4" height="4" fill="black"/>
                        <rect x="12" y="4" width="4" height="4" fill="black"/>
                        <rect x="16" y="8" width="4" height="4" fill="black"/>
                        <rect x="12" y="12" width="4" height="4" fill="black"/>
                        <rect x="8" y="16" width="4" height="4" fill="black"/>
                        <rect x="0" y="8" width="16" height="4" fill="black"/>
                      </svg>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      {item.textFull}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: Scattered cards around image */}
              <div className="hidden lg:block">
                {currentContent.painPoints.map((item, index) => {
                  const positions = [
                    { top: '38%', left: '2%' },       // Top left - moved down
                    { top: '38%', right: '2%' },      // Top right - moved down
                    { top: '50%', left: '0%', transform: 'translateY(-50%)' },       // Middle left - centered
                    { top: '50%', right: '0%', transform: 'translateY(-50%)' },      // Middle right - centered
                    { top: '62%', left: '2%' },       // Lower left - moved up
                    { top: '62%', right: '2%' },      // Lower right - moved up
                    { bottom: '12%', left: 'calc(50% - 173px)' } // Bottom center - moved up
                  ];

                  const position = positions[index] || positions[0];

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute bg-white rounded-2xl p-6 flex items-start gap-4 shadow-xl hover:shadow-2xl transition-all border border-gray-100 max-w-[360px] w-[360px]"
                      style={{
                        ...position,
                        transform: position.transform || 'none'
                      }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <rect x="8" y="0" width="4" height="4" fill="black"/>
                          <rect x="12" y="4" width="4" height="4" fill="black"/>
                          <rect x="16" y="8" width="4" height="4" fill="black"/>
                          <rect x="12" y="12" width="4" height="4" fill="black"/>
                          <rect x="8" y="16" width="4" height="4" fill="black"/>
                          <rect x="0" y="8" width="16" height="4" fill="black"/>
                        </svg>
                      </div>
                      <p className="text-base text-gray-700 leading-snug line-clamp-2">
                        {item.textFull}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuyerPainPointsSection;
