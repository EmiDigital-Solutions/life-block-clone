import { motion } from "framer-motion";
import { FileCheck, MousePointerClick, Users, ClipboardCheck, BarChart3 } from "lucide-react";
import { PixelIcon } from "./PixelIcon";

const steps = [
  {
    number: "01",
    title: "Request Audit",
    description: "Submit your audit request with supplier details. Our AI generates a customized framework based on your requirements.",
    icon: MousePointerClick,
  },
  {
    number: "02",
    title: "Auditor Assignment",
    description: "We match you with a certified auditor from our global network based on location, expertise, and availability.",
    icon: Users,
  },
  {
    number: "03",
    title: "On-Site Evaluation",
    description: "Your assigned auditor conducts a thorough on-site assessment using our AI-guided digital checklist.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Digital Report",
    description: "Receive your comprehensive audit report within 24 hours, complete with findings, photos, and action items.",
    icon: BarChart3,
  },
];

const stats = [
  { value: "2,000+", label: "Certified Auditors" },
  { value: "90+", label: "Countries" },
  { value: "48h", label: "Average Response" },
  { value: "€700", label: "Starting Price" },
];

export const HowItWorksSection = () => {
  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            From audit request to certified report in 4 simple steps
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line - hidden on last item */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-60px)] h-px">
                  <div className="w-full h-full border-t-2 border-dashed border-gray-300" />
                </div>
              )}

              <div className="bg-white rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Step Number */}
                <div className="text-5xl font-black text-primary/20 mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 rounded-3xl p-12 lg:p-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12 pt-12 border-t border-gray-700"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ready to transform your supplier audits?
            </h3>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
              Find Your Auditor Now
              <PixelIcon name="arrow-right" className="w-5 h-5" color="currentColor" />
            </button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
