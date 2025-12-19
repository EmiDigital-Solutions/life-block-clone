import { motion } from "framer-motion";
import christophPortrait from "@/assets/testimonial-christoph-seeholzer.jpg";
import PlatformDemoAnimation from "./PlatformDemoAnimation";

const TestimonialSection = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Platform Demo Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            <PlatformDemoAnimation />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-left w-full"
          >
            <h2 className="section-headline text-foreground mb-32 md:mb-40">
              Built for <span className="inline-block px-4 py-1 bg-foreground skew-x-[-12deg]"><span className="inline-block skew-x-[12deg] text-background font-medium">high-performance</span></span>
              <br />B2B Supply Chains
            </h2>

            {/* Testimonial */}
            <div className="space-y-4 max-w-2xl">
              <p className="section-headline-sm text-primary">
                ScanPro
              </p>
              <p className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight text-gray-900">
                "It's a game changer"
              </p>
              <div className="flex items-center gap-5 pt-4">
                <img 
                  src={christophPortrait} 
                  alt="Christoph Seeholzer" 
                  className="w-20 h-20 rounded-full object-cover"
                />
                <p className="text-base md:text-lg text-gray-600 font-normal">
                  Christoph Seeholzer, Director Linde
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decorative circles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
