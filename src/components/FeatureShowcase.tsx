import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import laptopMockup from "@/assets/laptop-mockup.png";

const FeatureShowcase = () => {
  return (
    <section className="py-20 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#2a2d35] min-h-screen flex items-center">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-[#4A9EFF]">Supplier Intelligence:</span>
              <br />
              <span className="text-white">for future-ready</span>
              <br />
              <span className="text-white">supply chains</span>
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-base md:text-lg leading-relaxed">
                Efficient, future-ready supply chains are key to your business' long-term success.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                That's why YVOO not only provides concrete ROI today: it scales long into the future. Our platform uses AI and predictive analytics to provide real-time insights on supplier risk, helping you create cost-effective supply chains that turn exposure into opportunity.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed font-medium text-white">
                Take the right risks. Eliminate the wrong ones.
              </p>
            </div>

            <div className="pt-2">
              <Button 
                size="lg"
                className="text-base px-10 py-6 font-semibold bg-accent text-navy-deep hover:bg-accent/90 rounded-full h-auto"
              >
                Request a demo
              </Button>
            </div>
          </motion.div>

          {/* Right Laptop Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img 
              src={laptopMockup} 
              alt="YVOO supplier intelligence dashboard with risk analytics and portfolio classifications"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
