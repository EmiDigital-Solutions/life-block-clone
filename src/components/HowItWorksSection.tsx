import { motion } from "framer-motion";
import { FileCheck, MousePointerClick, Users, ClipboardCheck, BarChart3 } from "lucide-react";
import { PixelIcon } from "./PixelIcon";

const steps = [
  {
    number: "01",
    title: "Submit request",
    description: "One click from your dashboard or ERP. Specify supplier, standard, and timeline. That's it.",
    icon: MousePointerClick,
  },
  {
    number: "02",
    title: "We assign locally",
    description: "Our AI matches a certified auditor near your supplier—no travel costs, no waiting.",
    icon: Users,
  },
  {
    number: "03",
    title: "Watch it happen",
    description: "Real-time updates during the audit. Chat directly with the auditor. Know exactly what's happening.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Report delivered",
    description: "Complete digital report in 24h—findings, photos, scores, action items. Ready for your QMS.",
    icon: BarChart3,
  },
];

const stats = [
  { value: "60%", label: "Lower audit costs" },
  { value: "48h", label: "Auditor on-site" },
  { value: "24h", label: "Report delivery" },
  { value: "€0", label: "Travel costs" },
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
            From request to report in 4 steps
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
              <span className="font-semibold">Your competitors already switched.</span>{" "}
              <span className="font-normal text-white/60">When will you?</span>
            </h3>
            <a 
              href="https://calendly.com/yvoo/demo-yvoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-foreground font-medium rounded-full hover:bg-white/90 transition-all duration-300"
            >
              Book a Demo
              <PixelIcon name="arrow-right" className="w-5 h-5" color="currentColor" />
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
