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

          {/* Desktop: Image top, 2-column grid below | Mobile: Image then stacked cards */}
          <div className="flex flex-col items-center">
            {/* Portrait Image */}
            <div className="relative flex justify-center items-center mb-8 lg:mb-12">
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
                  className={`w-full h-auto object-contain mx-auto ${
                    activeRole === "buyer" ? "max-w-[280px] sm:max-w-[360px] lg:max-w-[420px]" : "max-w-[240px] sm:max-w-[320px] lg:max-w-[380px]"
                  }`}
                  style={activeRole === "buyer" ? { filter: "grayscale(100%) contrast(1.1)" } : {}}
                />
              </motion.div>
            </div>

            {/* Pain Point Cards */}
            <motion.div 
              key={`cards-${activeRole}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl px-4"
            >
              {/* Mobile: Stacked cards */}
              <div className="lg:hidden space-y-3">
                {currentContent.painPoints.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm border border-gray-100"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <rect x="8" y="0" width="4" height="4" fill="black"/>
                        <rect x="12" y="4" width="4" height="4" fill="black"/>
                        <rect x="16" y="8" width="4" height="4" fill="black"/>
                        <rect x="12" y="12" width="4" height="4" fill="black"/>
                        <rect x="8" y="16" width="4" height="4" fill="black"/>
                        <rect x="0" y="8" width="16" height="4" fill="black"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item.textFull}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: Clean 2-column grid */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-4">
                {currentContent.painPoints.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-white rounded-xl p-5 flex items-start gap-4 border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <rect x="8" y="0" width="4" height="4" fill="black"/>
                        <rect x="12" y="4" width="4" height="4" fill="black"/>
                        <rect x="16" y="8" width="4" height="4" fill="black"/>
                        <rect x="12" y="12" width="4" height="4" fill="black"/>
                        <rect x="8" y="16" width="4" height="4" fill="black"/>
                        <rect x="0" y="8" width="16" height="4" fill="black"/>
                      </svg>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {item.textFull}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuyerPainPointsSection;
