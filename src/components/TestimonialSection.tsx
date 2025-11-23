import { motion } from "framer-motion";

const TestimonialSection = () => {
  return (
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Video Mockup Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20 md:mb-32"
          >
            <div className="relative bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-100">
              {/* Browser Chrome */}
              <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded px-3 py-1 text-xs text-gray-400">
                    connectimus.com/platform
                  </div>
                </div>
              </div>
              
              {/* Video/Screenshot Area */}
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                <div className="text-center space-y-3 p-8">
                  <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-xs text-gray-400 font-medium tracking-wide">PLATFORM DEMO</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-end">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.15] tracking-tight">
                Built for{" "}
                <span className="text-[hsl(160,25%,72%)]">mighty</span>
                <span className="block mt-2">B2B Supply Chains</span>
              </h2>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
                  ScanPro
                </p>
                <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-black">
                  "It's a game changer"
                </p>
              </div>
              <p className="text-sm text-gray-500 font-normal">
                Christoph Seeholzer, Director Linde
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
