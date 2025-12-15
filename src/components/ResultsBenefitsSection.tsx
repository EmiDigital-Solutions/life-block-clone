import { motion } from "framer-motion";

const accentColor = "#0A7FA5";
const greenColor = "#6EA996";

const transformations = [
  {
    from: "Searching for auditors across time zones",
    to: "Instant access to certified auditors worldwide"
  },
  {
    from: "Inconsistent audit quality between auditors",
    to: "AI-guided consistency across every audit"
  },
  {
    from: "Waiting weeks for audit reports",
    to: "Real-time dashboards and instant visibility"
  },
  {
    from: "Drowning in email threads and versions",
    to: "One platform for all data and actions"
  },
  {
    from: "Adapting to rigid audit templates",
    to: "Flexible checklists that adapt to you"
  },
  {
    from: "Flagged issues with no follow-through",
    to: "Automated actions tracked to closure"
  }
];

const ResultsBenefitsSection = () => {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            From frustration to full control
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl">
            See how your audit operations transform with YVOO
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Before Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Today</span>
            </div>
            <div className="space-y-6">
              {transformations.map((item, index) => (
                <motion.div
                  key={`from-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-muted-foreground/40 text-lg mt-0.5">—</span>
                  <p className="text-muted-foreground text-lg">
                    {item.from}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* After Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: greenColor }} />
              <span className="text-sm font-medium uppercase tracking-wide" style={{ color: greenColor }}>With YVOO</span>
            </div>
            <div className="space-y-6">
              {transformations.map((item, index) => (
                <motion.div
                  key={`to-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-lg mt-0.5" style={{ color: greenColor }}>→</span>
                  <p className="text-foreground text-lg font-medium">
                    {item.to}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-16 border-t border-border"
        >
          <button 
            className="px-8 py-4 rounded-full font-medium text-white transition-all hover:opacity-90"
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
