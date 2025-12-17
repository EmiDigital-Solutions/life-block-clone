import { motion } from "framer-motion";
import { useState } from "react";
import buyerImage from "@/assets/supplier-portrait-hero.png";
import qualityImage from "@/assets/quality-hero-green.png";

const BuyerPainPointsSection = () => {
  const [activeRole, setActiveRole] = useState<"buyer" | "quality">("buyer");

  const buyerContent = {
    image: buyerImage,
    imageAlt: "Procurement professional considering opportunities",
    painPoints: [
      {
        text: "Screening 200+ suppliers just to find one qualified option",
        textFull: "Screening 200+ suppliers just to find one qualified option"
      },
      {
        text: "Justifying €15K-25K audit costs to finance every quarter",
        textFull: "Justifying €15K-25K audit costs to finance every quarter"
      },
      {
        text: "Waiting 3 weeks for your quality engineer's calendar to clear",
        textFull: "Waiting 3 weeks for your quality engineer's calendar to clear"
      },
      {
        text: "Booking flights, hotels, visas for one-day factory visits",
        textFull: "Booking flights, hotels, visas for one-day factory visits"
      },
      {
        text: "Chasing audit reports weeks after your team returned",
        textFull: "Chasing audit reports weeks after your team returned"
      },
      {
        text: "Explaining to leadership why supplier issues weren't caught earlier",
        textFull: "Explaining to leadership why supplier issues weren't caught earlier"
      }
    ]
  };

  const qualityContent = {
    image: qualityImage,
    imageAlt: "Quality manager reviewing supplier data",
    painPoints: [
      {
        text: "Hiring permanent auditors who sit idle between audits",
        textFull: "Hiring permanent auditors who sit idle between audits"
      },
      {
        text: "Turning down urgent audit requests because no one's available",
        textFull: "Turning down urgent audit requests because no one's available"
      },
      {
        text: "Standardizing reports when every auditor has their own style",
        textFull: "Standardizing reports when every auditor has their own style"
      },
      {
        text: "Reaching suppliers in Vietnam, India, Mexico without local presence",
        textFull: "Reaching suppliers in Vietnam, India, Mexico without local presence"
      },
      {
        text: "Managing logistics across email threads and Excel trackers",
        textFull: "Managing logistics across email threads and Excel trackers"
      },
      {
        text: "Following up on corrective actions scattered across systems",
        textFull: "Following up on corrective actions scattered across systems"
      }
    ]
  };

  const currentContent = activeRole === "buyer" ? buyerContent : qualityContent;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Role Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-0 p-1 rounded-full border-2 border-gray-300 bg-white">
              <button 
                onClick={() => setActiveRole("buyer")}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  activeRole === "buyer" 
                    ? "bg-gray-900 text-white shadow-sm" 
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                Buyer
              </button>
              <button 
                onClick={() => setActiveRole("quality")}
                className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  activeRole === "quality" 
                    ? "bg-gray-900 text-white shadow-sm" 
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                Quality
              </button>
            </div>
          </div>

          {/* Headline - transformation focused */}
          <h2 className="section-headline text-foreground text-center px-4">
            What if you never had to deal with...
          </h2>

          {/* Image with soft glowing gradient background and overlapping cards */}
          <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-[800px] lg:min-h-[800px]">
            {/* Container for image and gradient - centered */}
            <div className="relative flex justify-center items-center lg:absolute lg:top-1/2 lg:-translate-y-1/2 mb-[-60px] sm:mb-[-80px] lg:mb-0 z-10">
              {/* Subtle grey background */}
              <div 
                className="absolute w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] md:w-[760px] md:h-[760px] z-0"
                style={{ 
                  background: "linear-gradient(180deg, rgba(128, 128, 128, 0.08) 0%, rgba(128, 128, 128, 0.02) 100%)"
                }}
              ></div>

              {/* Photo overlay */}
              <motion.div 
                key={activeRole}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
                style={activeRole === "quality" ? { marginLeft: '-60px' } : {}}
              >
                <img 
                  src={currentContent.image} 
                  alt={currentContent.imageAlt} 
                  className={`w-full h-auto object-contain mx-auto ${
                    activeRole === "buyer" ? "max-w-[90vw] sm:max-w-[540px]" : "max-w-[90vw] sm:max-w-[459px]"
                  }`}
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
                    { top: '32%', left: '2%' },       // Top left
                    { top: '32%', right: '2%' },      // Top right
                    { top: '50%', left: '0%', transform: 'translateY(-50%)' },       // Middle left - centered
                    { top: '50%', right: '0%', transform: 'translateY(-50%)' },      // Middle right - centered
                    { top: '68%', left: '2%' },       // Lower left
                    { top: '68%', right: '2%' }       // Lower right
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
