import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "60%", label: "Lower audit costs" },
  { value: "48h", label: "Auditor on-site" },
  { value: "24h", label: "Report delivery" },
  { value: "€0", label: "Travel costs" },
];

const FinalCTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Dark card container */}
          <div className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 pb-10 border-b border-white/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA content */}
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-medium text-white mb-6">
                Your competitors already switched.{" "}
                <span className="text-[#0A7FA5]">When will you?</span>
              </h2>

              <a
                href="https://calendly.com/yvoo/demo-yvoo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0A7FA5] text-white hover:bg-[#0A7FA5]/90 rounded-full px-6 py-3 text-sm font-medium transition-colors"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
