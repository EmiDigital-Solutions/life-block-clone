import { motion } from "framer-motion";
import ROICalculator from "./ROICalculator";

const ROICalculatorSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#f5f5f5]">
      <div className="container mx-auto px-6">
        {/* Header - offmenu style mixed weight typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="font-semibold text-foreground">See your</span>{" "}
            <span className="text-muted-foreground font-normal">savings,</span>
            <br />
            <span className="text-muted-foreground font-normal">calculate your</span>{" "}
            <span className="font-semibold text-foreground">ROI.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl"
        >
          <ROICalculator />
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
