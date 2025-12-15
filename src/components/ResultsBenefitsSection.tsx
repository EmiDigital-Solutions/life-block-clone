import { motion } from "framer-motion";
import { Globe, Shield, BarChart3, Mail, Zap, Settings } from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "You gain instant access to global audit capacity",
    description: "Your suppliers are worldwide - now your audit capability is too. With YVOO's certified global auditor network, you can scale fast, without delay."
  },
  {
    icon: Shield,
    title: "You ensure consistent audit quality, every time",
    description: "No more relying on individual experience. Our AI guides every auditor step by step, ensuring consistent, high-quality results - wherever they are."
  },
  {
    icon: BarChart3,
    title: "You get real-time insight into supplier risk",
    description: "Stop guessing. Our dashboards show you exactly where the gaps and risks are - across every audit, instantly."
  },
  {
    icon: Mail,
    title: "You eliminate email chaos and version confusion",
    description: "All your audit data, documents, and actions live in one secure platform - easy to access, easy to manage."
  },
  {
    icon: Settings,
    title: "You stay in control with flexible checklists",
    description: "Use your own audit templates or industry standards - YVOO adapts to your process, not the other way around."
  },
  {
    icon: Zap,
    title: "You turn findings into action, automatically",
    description: "No more flagged issues with no follow-up. YVOO links findings to root causes and corrective actions - and tracks them to closure."
  }
];

const ResultsBenefitsSection = () => {
  return (
    <section className="bg-black py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-tight max-w-[673px] mb-16 md:mb-20"
        >
          Benefits of a Global Auditor Network and AI-Powered Supplier Audit Solution
        </motion.h2>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#131D2A] rounded-[30px] p-8 md:p-10 flex flex-col"
            >
              {/* Icon */}
              <div className="w-20 h-20 mb-6 flex items-center justify-center">
                <benefit.icon className="w-16 h-16 text-[#06D7F9]" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6">
                <h3 className="text-[#06D7F9] text-2xl md:text-[30px] font-bold leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-white text-lg md:text-xl leading-7">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsBenefitsSection;
