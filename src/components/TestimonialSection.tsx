import { motion } from "framer-motion";

const TestimonialSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-[hsl(var(--secondary-blue))] to-[hsl(var(--muted-green))]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Main Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 leading-tight">
            Built for{" "}
            <span className="block mt-2">
              procurement teams who need{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-white text-black px-4 py-1 rounded-lg transform -rotate-1">
                  reliable
                </span>
              </span>
            </span>
            <span className="block mt-2">supplier intelligence.</span>
          </h2>

          {/* Quote Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <blockquote className="space-y-6">
              <div className="flex justify-center mb-6">
                <svg
                  className="w-12 h-12 text-[hsl(var(--muted-green))]"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-relaxed">
                "Connectimus transformed how we verify suppliers. Real-time insights save us weeks."
              </p>
              <footer className="pt-6 border-t border-gray-200">
                <div className="flex flex-col items-center gap-2">
                  <cite className="not-italic font-semibold text-lg text-gray-900">
                    Sarah Chen
                  </cite>
                  <p className="text-gray-600">
                    Chief Procurement Officer, Global Manufacturing
                  </p>
                </div>
              </footer>
            </blockquote>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
