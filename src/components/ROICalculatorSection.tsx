import { motion } from "framer-motion";
import ROICalculator from "./ROICalculator";

const ROICalculatorSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header - offmenu style mixed weight typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-headline text-foreground">
            Calculate your ROI
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <ROICalculator />
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
