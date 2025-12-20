import { motion } from "framer-motion";
import christophPortrait from "@/assets/testimonial-christoph-seeholzer.jpg";
import PlatformDemoAnimation from "./PlatformDemoAnimation";

const TestimonialSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Purple gradient background - midfunnel style */}
      <div 
        className="relative py-20 md:py-32 lg:py-40 pb-24 md:pb-36 lg:pb-44"
        style={{
          background: 'linear-gradient(135deg, #7C6BF0 0%, #8B7CF7 30%, #9D8EFA 60%, #AFA0FC 100%)',
        }}
      >
        {/* Diagonal lines pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.1) 20px,
              rgba(255,255,255,0.1) 21px
            )`,
          }}
        />

        {/* Small top badge */}
        <div className="container mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
              <span className="text-yellow-300">⚡</span>
              Get started in minutes
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
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.3), 0 30px 60px -30px rgba(0, 0, 0, 0.4)',
              }}
            >
              <PlatformDemoAnimation />
            </div>
          </motion.div>
        </div>

        {/* Headline and testimonial - Inside purple section */}
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: Headline with highlighted word */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] text-white">
                  Built for
                  <br />
                  <span className="relative inline-block">
                    <span className="relative z-10">high-performance</span>
                    <span 
                      className="absolute inset-0 -inset-x-2 -inset-y-1 -skew-x-3 rounded-lg"
                      style={{ 
                        background: 'linear-gradient(90deg, #D4FF00 0%, #BFFF00 100%)',
                        zIndex: 0,
                      }}
                    />
                  </span>
                  <br />
                  B2B Supply Chains.
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
                <p className="text-xl md:text-2xl font-semibold text-white/90 mb-4">
                  ScanPro+
                </p>
                
                {/* Quote */}
                <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white mb-6">
                  "It's a game changer"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <img 
                    src={christophPortrait} 
                    alt="Christoph Seeholzer" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                  />
                  <p className="text-base text-white/80">
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