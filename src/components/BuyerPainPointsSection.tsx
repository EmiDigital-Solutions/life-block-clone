import { motion } from "framer-motion";
import { useState } from "react";
import buyerImage from "@/assets/buyer-hero-green.png";
import qualityImage from "@/assets/quality-hero-green.png";

const BuyerPainPointsSection = () => {
  const [activeRole, setActiveRole] = useState<"buyer" | "quality">("buyer");

  const buyerContent = {
    image: buyerImage,
    imageAlt: "Buyer professional considering opportunities",
    painPoints: [
      {
        text: "Finding suppliers, collecting RFI data & references",
        textFull: "Finding suppliers, collecting RFI data & references"
      },
      {
        text: "Analyzing supplier fit & building audit business cases",
        textFull: "Analyzing supplier fit & building audit business cases"
      },
      {
        text: "Creating annual audit plans & competing for resources",
        textFull: "Creating annual audit plans & competing for resources"
      },
      {
        text: "Coordinating suppliers, auditors, travel & stakeholder briefings",
        textFull: "Coordinating suppliers, auditors, travel & stakeholder briefings"
      },
      {
        text: "Conducting on-site audits & training auditors",
        textFull: "Conducting on-site audits & training auditors"
      },
      {
        text: "Aligning reports, tracking findings",
        textFull: "Aligning reports, tracking findings"
      }
    ]
  };

  const qualityContent = {
    image: qualityImage,
    imageAlt: "Quality professional reviewing standards",
    painPoints: [
      {
        text: "Managing high audit demand",
        textFull: "Managing overwhelming demand for supplier audits across multiple locations and time zones."
      },
      {
        text: "Dealing with travel budgets",
        textFull: "Dealing with limited travel budgets while audit requirements continue to grow exponentially."
      },
      {
        text: "Scheduling long business trips",
        textFull: "Scheduling exhausting long-distance business trips that disrupt work-life balance and team productivity."
      },
      {
        text: "Conducting manual audits",
        textFull: "Conducting time-intensive manual audits with inconsistent documentation and quality standards."
      },
      {
        text: "Creating detailed reports",
        textFull: "Creating detailed audit reports manually, spending days on documentation instead of analysis."
      },
      {
        text: "Maintaining audit consistency",
        textFull: "Maintaining consistent audit quality and standards when using different auditors across regions."
      }
    ]
  };

  const currentContent = activeRole === "buyer" ? buyerContent : qualityContent;

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
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
          <div className="relative flex flex-col items-center">
            {/* Container for image and gradient */}
            <div className="relative flex justify-center items-center mb-[-60px] sm:mb-[-80px] z-10">
              {/* Soft glowing gradient background */}
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
                  style={{ filter: "brightness(0.75) saturate(0.5) hue-rotate(-15deg)" }}
                />
              </motion.div>
            </div>

            {/* Pain Point Cards - overlapping the gradient */}
            <motion.div 
              key={`cards-${activeRole}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-20 space-y-2 sm:space-y-3 md:space-y-4 max-w-2xl w-full px-4"
            >
              {currentContent.painPoints.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 flex items-start gap-2 sm:gap-3 md:gap-4 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  {/* 8-bit pixel arrow */}
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
                    <span className="md:hidden">{item.text}</span>
                    <span className="hidden md:inline">{item.textFull}</span>
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuyerPainPointsSection;
