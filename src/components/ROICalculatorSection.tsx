import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ROICalculator from "./ROICalculator";

// Import category-specific images - precisely matched to each industry
import categoryAutomotive from "@/assets/category-automotive.jpg";
import categoryAerospace from "@/assets/category-aerospace.jpg";
import categoryMedical from "@/assets/category-medical-v2.jpg";
import categoryElectronics from "@/assets/category-electronics-v2.jpg";
import categoryChemical from "@/assets/category-chemical.jpg";
import categoryConstruction from "@/assets/category-construction.jpg";
import categoryEnvironmental from "@/assets/category-environmental-v2.jpg";
import categoryFood from "@/assets/category-food-v2.jpg";
import categorySafety from "@/assets/category-safety.jpg";
import categoryInfoSec from "@/assets/category-infosec.jpg";
import categoryRailway from "@/assets/category-railway.jpg";
import categoryPharmaceutical from "@/assets/category-pharmaceutical.jpg";
import categoryManufacturing from "@/assets/category-manufacturing.jpg";
import categorySocial from "@/assets/category-social-v2.jpg";
import categoryUniversal from "@/assets/category-universal.jpg";
import categoryEnergy from "@/assets/category-energy.jpg";
import categoryOilGas from "@/assets/category-oilgas.jpg";
import categoryCommonAudits from "@/assets/category-common-audits.jpg";

// Category to image mapping - 100% matched to each industry/topic
const categoryImages: Record<string, string> = {
  "Most Common Audits": categoryCommonAudits,
  "Universal": categoryUniversal,
  "Aerospace": categoryAerospace,
  "Automotive": categoryAutomotive,
  "Chemical": categoryChemical,
  "Construction": categoryConstruction,
  "Electronics": categoryElectronics,
  "Energy": categoryEnergy,
  "Environmental": categoryEnvironmental,
  "Food & Beverage": categoryFood,
  "General Manufacturing": categoryManufacturing,
  "Information Security": categoryInfoSec,
  "Medical Devices": categoryMedical,
  "Oil & Gas": categoryOilGas,
  "Pharmaceutical": categoryPharmaceutical,
  "Railway": categoryRailway,
  "Social Responsibility": categorySocial,
};

const ROICalculatorSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Universal");
  
  const categoryImage = categoryImages[selectedCategory] || categoryUniversal;

  return (
    <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Section Background Watermark */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
        >
          <img 
            src={categoryImage} 
            alt={selectedCategory}
            className="w-full h-full object-cover object-center"
            style={{ 
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            See Your Savings
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Calculate your potential cost and time savings with YVOO
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <ROICalculator onCategoryChange={setSelectedCategory} />
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
