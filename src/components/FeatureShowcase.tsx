import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FeatureShowcase = () => {
  return (
    <section className="py-32 md:py-40 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-navy-deep">
      <div className="container mx-auto max-w-7xl">
        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-32"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
            Supply Chain Intelligence.
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
            YVOO simplifies supplier quality management across global networks into focused, actionable insights for your business.
          </p>

          <Button 
            size="lg"
            className="text-base px-10 py-6 font-semibold bg-accent text-navy-deep hover:bg-accent/90 rounded-full h-auto"
          >
            Request a Demo
          </Button>
        </motion.div>

        {/* Company Logos Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <p className="text-gray-400 text-base md:text-lg">
            Intelligence, enabling quality assurance for global supply chains.
          </p>
        </motion.div>

        {/* Scrolling Logo Band */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative overflow-hidden"
        >
          <div className="flex animate-marquee">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-16 px-8 flex-shrink-0">
                <div className="text-gray-500 font-bold text-2xl tracking-wider opacity-60">HILTI</div>
                <div className="text-gray-500 font-bold text-2xl tracking-wider opacity-60">ENDRESS+HAUSER</div>
                <div className="text-gray-500 font-bold text-2xl tracking-wider opacity-60">LUFTHANSA</div>
                <div className="text-gray-500 font-bold text-2xl tracking-wider opacity-60">KÄRCHER</div>
                <div className="text-gray-500 font-bold text-2xl tracking-wider opacity-60">VOLKSWAGEN</div>
                <div className="text-gray-500 font-bold text-2xl tracking-wider opacity-60">AUDI</div>
                <div className="text-gray-500 font-bold text-2xl tracking-wider opacity-60">FERRARI</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
