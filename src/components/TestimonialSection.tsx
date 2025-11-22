import { motion } from "framer-motion";
import InteractiveSoftwareDemo from "./InteractiveSoftwareDemo";

const TestimonialSection = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[hsl(210,30%,72%)] to-[hsl(160,25%,72%)]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Interactive Software Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            <InteractiveSoftwareDemo />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-left max-w-4xl space-y-16"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1]">
              Built for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-[hsl(160,25%,72%)] text-black px-8 py-2 rounded-2xl transform rotate-[-1deg] inline-block font-bold">
                  mighty
                </span>
              </span>
              <span className="block">B2B Supply Chains</span>
            </h2>

            {/* Testimonial */}
            <div className="space-y-4">
              <p className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-black">
                <span className="font-bold">ScanPro</span>, it's a Game Changer
              </p>
              <p className="text-xl md:text-2xl text-black/80 font-normal">
                Christoph Seeholzer, Former Linde
              </p>
            </div>
          </motion.div>

          {/* Decorative circles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
