import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ROICalculator from "./ROICalculator";

// Import category-specific images
import categoryAutomotive from "@/assets/category-automotive.jpg";
import categoryAerospace from "@/assets/category-aerospace.jpg";
import categoryMedical from "@/assets/category-medical.jpg";
import categoryElectronics from "@/assets/category-electronics.jpg";
import categoryChemical from "@/assets/category-chemical.jpg";
import categoryConstruction from "@/assets/category-construction.jpg";
import categoryEnvironmental from "@/assets/category-environmental.jpg";
import categoryFood from "@/assets/category-food.jpg";
import categorySafety from "@/assets/category-safety.jpg";
import categorySecurity from "@/assets/category-security.jpg";
import categoryRailway from "@/assets/category-railway.jpg";
import categoryPharmaceutical from "@/assets/category-pharmaceutical.jpg";
import categoryManufacturing from "@/assets/category-manufacturing.jpg";
import categorySocial from "@/assets/category-social.jpg";

// Category to image mapping - industry-specific images
const categoryImages: Record<string, string> = {
  "Most Common Audits": categoryManufacturing,
  "Universal": categoryManufacturing,
  "Aerospace": categoryAerospace,
  "Automotive": categoryAutomotive,
  "Chemical": categoryChemical,
  "Construction": categoryConstruction,
  "Electronics": categoryElectronics,
  "Energy": categoryChemical,
  "Environmental": categoryEnvironmental,
  "Food & Beverage": categoryFood,
  "General Manufacturing": categoryManufacturing,
  "Information Security": categorySecurity,
  "Medical Devices": categoryMedical,
  "Oil & Gas": categoryChemical,
  "Pharmaceutical": categoryPharmaceutical,
  "Railway": categoryRailway,
  "Social Responsibility": categorySocial,
};

const ROICalculatorSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Universal");
  
  const categoryImage = categoryImages[selectedCategory] || categoryManufacturing;

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
