import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Search",
    description: "Find your suppliers through AI-powered search across global databases.",
  },
  {
    number: "02",
    title: "Select",
    description: "Choose from 2,000+ certified auditors with transparent pricing.",
  },
  {
    number: "03",
    title: "Audit",
    description: "Track real-time progress as local experts conduct on-site inspections.",
  },
  {
    number: "04",
    title: "Report",
    description: "Receive comprehensive scored reports within 24-48 hours.",
  },
];

export const HowItWorksSection = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      data-nav-theme="light"
      className="relative bg-white py-32 px-6 sm:px-8 lg:px-16"
    >
      {/* Minimalist Header */}
      <div className="max-w-7xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-gray-400 font-light">
            Process
          </p>
          <h2 className="text-7xl sm:text-8xl lg:text-9xl font-light tracking-tight text-gray-900">
            How It Works
          </h2>
        </motion.div>
      </div>

      {/* Steps Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              className="group relative"
            >
              {/* Number */}
              <div className="mb-8">
                <motion.span
                  className="text-8xl sm:text-9xl font-light text-gray-200 group-hover:text-[#A8C5B8] group-hover:font-bold transition-all duration-500 group-hover:drop-shadow-lg"
                  animate={hoveredStep === index ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.number}
                </motion.span>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-900">
                  {step.title}
                </h3>
                
                <div className="relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "4rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    className="h-px bg-gray-900 mb-6"
                  />
                  
                  <p className="text-lg leading-relaxed text-gray-600 font-light max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Hover Effect Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={hoveredStep === index ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 left-0 h-0.5 bg-[#A8C5B8] origin-left"
                style={{ width: '100%' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-7xl mx-auto mt-32 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-3 px-12 py-5 bg-white border border-gray-900 text-gray-900 text-sm tracking-wider uppercase font-light rounded-none hover:bg-gray-900 hover:text-white transition-all duration-300"
        >
          Start Now
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Subtle Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>
    </section>
  );
};
