import { motion } from "framer-motion";
import { Search, Clock, FileX, AlertTriangle } from "lucide-react";

const painPoints = [
  {
    icon: Search,
    metric: "Weeks",
    title: "Finding the right supplier",
    description: "Trade fairs, cold calls, outdated databases. You spend weeks searching before you even know if a supplier can deliver what you need.",
  },
  {
    icon: Clock,
    metric: "3–6 months",
    title: "Qualification takes too long",
    description: "Collecting certificates, checking capacity, validating references. By the time you qualify a supplier, the project timeline is already at risk.",
  },
  {
    icon: FileX,
    metric: "Scattered",
    title: "Audit data lives in silos",
    description: "Reports in email, photos on phones, findings in spreadsheets. No single source of truth. Every audit starts from zero.",
  },
  {
    icon: AlertTriangle,
    metric: "0%",
    title: "Follow-up that never happens",
    description: "Corrective actions assigned but never tracked. No close-out verification. The same defects appear again in the next audit.",
  },
];

const PainPointsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-foreground/50">
              The Problem
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[0.95] text-foreground">
            Why supplier management<br />is still broken
          </h2>
          <p className="text-lg text-foreground/50 mt-6">
            From search to close-out — every step is manual, slow, and disconnected. That is why most companies only manage a fraction of their supply chain risk.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-0 border-t border-foreground/10">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="p-8 md:p-10 border-b border-r border-foreground/10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r"
            >
              <point.icon className="w-5 h-5 text-destructive mb-4" />
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-[-0.02em]">
                {point.metric}
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-foreground/50 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
