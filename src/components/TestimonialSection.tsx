import { motion } from "framer-motion";
import christophPortrait from "@/assets/testimonial-christoph-seeholzer.jpg";
import PlatformDemoAnimation from "./PlatformDemoAnimation";

const TestimonialSection = () => {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="relative py-12 md:py-16 lg:py-20 pb-24 md:pb-36 lg:pb-44">
        {/* Small top badge */}
        <div className="container mx-auto px-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center px-4 py-2 bg-white backdrop-blur-sm rounded-full text-sm font-medium text-foreground shadow-sm">
              Order Audit in minutes
            </span>
          </motion.div>
        </div>

        {/* Platform Demo Animation - Floating card */}
        <div className="container mx-auto px-6 mb-20 md:mb-28 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div 
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.15), 0 30px 60px -30px rgba(0, 0, 0, 0.2)',
              }}
            >
              <PlatformDemoAnimation />
            </div>
          </motion.div>
        </div>

        {/* Headline and testimonial */}
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
      </div>
    </section>
  );
};

export default TestimonialSection;