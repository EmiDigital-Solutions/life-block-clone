import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ROICalculator from "./ROICalculator";

// Import category images
import industryAutomotive from "@/assets/industry-automotive.jpg";
import industryAerospace from "@/assets/industry-aerospace.jpg";
import industryMedical from "@/assets/industry-medical.jpg";
import industryElectronics from "@/assets/industry-electronics.jpg";
import industryCryogenicValve from "@/assets/industry-cryogenic-valve.jpg";
import factoryHero from "@/assets/factory-hero-background.jpg";

// Category to image mapping
const categoryImages: Record<string, string> = {
  "Most Common Audits": factoryHero,
  "Universal": factoryHero,
  "Aerospace": industryAerospace,
  "Automotive": industryAutomotive,
  "Chemical": industryCryogenicValve,
  "Construction": factoryHero,
  "Electronics": industryElectronics,
  "Energy": industryCryogenicValve,
  "Environmental": factoryHero,
  "Food & Beverage": factoryHero,
  "General Manufacturing": factoryHero,
  "Information Security": industryElectronics,
  "Medical Devices": industryMedical,
  "Oil & Gas": industryCryogenicValve,
  "Pharmaceutical": industryMedical,
  "Railway": industryAutomotive,
  "Social Responsibility": factoryHero,
};

const ROICalculatorSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Universal");
  
  const categoryImage = categoryImages[selectedCategory] || factoryHero;

  return (
    <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Section Background Watermark */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.06, scale: 1 }}
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
