import { motion } from "framer-motion";
import dualEngineEcosystem from "@/assets/dual-engine-ecosystem.png";

const DualEngineSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-headline text-foreground">
            From Vague Ideas to Verified Reality in Days
          </h2>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <img 
            src={dualEngineEcosystem} 
            alt="The YVOO Dual-Engine Ecosystem showing FIND (SearchPro+) and VERIFY (ScanPro+) engines connected at Ground Truth"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DualEngineSection;
