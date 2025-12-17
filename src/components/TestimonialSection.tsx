import { motion } from "framer-motion";

const TestimonialSection = () => {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-white">
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
              <div className="bg-gray-50 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded px-3 py-1 text-xs text-gray-500 border border-gray-200">
                    yvoo.com/platform
                  </div>
                </div>
              </div>
              
              {/* Video/Screenshot Area */}
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-primary">
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
            className="text-left w-full"
          >
            <h2 className="section-headline text-foreground mb-32 md:mb-40">
              Built for <span className="inline-block px-4 py-1 bg-primary text-white rounded-xl -rotate-2">mighty</span>
              <br />B2B Supply Chains
            </h2>

            {/* Testimonial */}
            <div className="space-y-4 max-w-2xl">
              <p className="text-4xl md:text-5xl lg:text-6xl font-black text-primary">
                ScanPro
              </p>
              <p className="text-5xl md:text-6xl lg:text-7xl font-medium leading-tight text-gray-900">
                "It's a game changer"
              </p>
              <p className="text-base md:text-lg text-gray-600 font-normal pt-2">
                Christoph Seeholzer, Director Linde
              </p>
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
