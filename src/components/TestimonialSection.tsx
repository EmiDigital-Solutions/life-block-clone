import { motion } from "framer-motion";

const TestimonialSection = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[hsl(210,30%,72%)] to-[hsl(160,25%,72%)]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Video Mockup Window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-24"
          >
            <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded px-3 py-1 text-xs text-gray-500">
                    connectimus.com/platform
                  </div>
                </div>
              </div>
              
              {/* Video/Screenshot Area */}
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[hsl(160,25%,72%)] to-[hsl(210,30%,72%)] rounded-2xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Platform Demo Video</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Built for{" "}
              <span className="block mt-2">
                Mighty{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-[hsl(160,25%,72%)] text-black px-6 py-2 rounded-xl transform -rotate-1 inline-block">
                    B2B Supply
                  </span>
                </span>
              </span>
              <span className="block mt-2">Chains</span>
            </h2>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-3xl mx-auto pt-8"
            >
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light italic leading-relaxed">
                "ScanPro Its a game changer"
              </blockquote>
              <p className="mt-6 text-base md:text-lg text-white/70 font-normal">
                Christoph Seeholzer, Former Linde Engineering
              </p>
            </motion.div>
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
