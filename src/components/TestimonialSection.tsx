import { motion } from "framer-motion";
import christophPortrait from "@/assets/testimonial-christoph-seeholzer.jpg";

const TestimonialSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Headline with highlighted word */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.1] text-foreground">
                <span className="block">Built for</span>
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">high‑performance</span>
                  <span 
                    className="absolute inset-0 -inset-x-2 -inset-y-1 -skew-x-3 rounded-lg bg-accent"
                    style={{ zIndex: 0 }}
                  />
                </span>
                <span className="block whitespace-nowrap">B2B Supply Chains.</span>
              </h2>
            </motion.div>

            {/* Right: Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pt-4"
            >
              {/* Brand logo placeholder */}
              <p className="text-xl md:text-2xl font-semibold text-primary mb-4">
                ScanPro+
              </p>
              
              {/* Quote */}
              <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-6">
                "It's a game changer"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={christophPortrait} 
                  alt="Christoph Seeholzer" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-border"
                />
                <p className="text-base text-muted-foreground">
                  Christoph Seeholzer, Director Linde
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;