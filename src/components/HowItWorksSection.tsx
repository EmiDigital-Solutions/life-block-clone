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
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Section Header - offmenu style mixed weight typography */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-headline text-foreground">
            How it works
          </h2>
        </motion.div>

        {/* Steps Grid - offmenu style cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              {/* Step Number */}
              <div className="text-5xl font-black text-foreground/15 mb-6">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section - dark offmenu style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#1a1a1a] rounded-[32px] p-12 lg:p-16"
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
                <p className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm font-medium">
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
            className="text-center mt-12 pt-12 border-t border-white/10"
          >
            <h3 className="text-2xl md:text-3xl text-white mb-6">
              <span className="font-semibold">Ready</span>{" "}
              <span className="font-normal text-white/60">to transform your supplier audits?</span>
            </h3>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-foreground font-medium rounded-full hover:bg-white/90 transition-all duration-300">
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
