import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const accentColor = "#0A7FA5";
const greenColor = "#6EA996";

const transformations = [
  {
    from: "Searching for auditors across time zones",
    to: "Instant access to 2,000+ certified auditors worldwide",
    icon: "globe"
  },
  {
    from: "Inconsistent audit quality between auditors",
    to: "AI-guided consistency across every single audit",
    icon: "quality"
  },
  {
    from: "Waiting weeks for audit reports",
    to: "Real-time dashboards and instant risk visibility",
    icon: "speed"
  },
  {
    from: "Drowning in email threads and versions",
    to: "One platform for all audit data and actions",
    icon: "clarity"
  },
  {
    from: "Adapting to rigid audit templates",
    to: "Flexible checklists that adapt to your process",
    icon: "control"
  },
  {
    from: "Flagged issues with no follow-through",
    to: "Automated corrective actions tracked to closure",
    icon: "action"
  }
];

const ResultsBenefitsSection = () => {
  return (
    <section className="bg-foreground py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: greenColor }}>
            Your Transformation
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background leading-tight max-w-3xl mx-auto">
            From frustration to full control
          </h2>
          <p className="text-background/60 text-lg mt-6 max-w-2xl mx-auto">
            See how YVOO transforms your supplier audit operations
          </p>
        </motion.div>

        {/* Transformation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-background/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-background/10 hover:border-background/20 transition-colors"
            >
              <div className="flex flex-col gap-4">
                {/* From state */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-background/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-background/40 text-xs font-medium">✕</span>
                  </div>
                  <p className="text-background/50 text-base line-through decoration-background/20">
                    {item.from}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center gap-2 pl-2">
                  <ArrowRight className="w-4 h-4" style={{ color: greenColor }} />
                </div>

                {/* To state */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: greenColor }}
                  >
                    <span className="text-foreground text-xs font-bold">✓</span>
                  </div>
                  <p className="text-background font-medium text-base">
                    {item.to}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-background/60 text-lg mb-6">
            Ready to transform your audit operations?
          </p>
          <button 
            className="px-8 py-4 rounded-full font-semibold text-foreground transition-all hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Start Your Transformation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsBenefitsSection;
