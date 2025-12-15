import { motion } from "framer-motion";
import ROICalculator from "./ROICalculator";

const ROICalculatorSection = () => {
  return (
    <section className="py-24 md:py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            See Your Savings
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
          <ROICalculator />
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
