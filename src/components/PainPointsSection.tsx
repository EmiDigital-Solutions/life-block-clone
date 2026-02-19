import { motion } from "framer-motion";
import { Clock, DollarSign, AlertTriangle, Users } from "lucide-react";

const painPoints = [
  {
    icon: Clock,
    metric: "10+ weeks",
    title: "Time to complete one audit",
    description: "Scheduling, travel coordination, supplier availability, report writing. One audit takes 10 weeks minimum — and you have hundreds of suppliers to verify.",
  },
  {
    icon: DollarSign,
    metric: "€15,000+",
    title: "Cost per traditional audit",
    description: "International flights, hotels, per diems, consultant day rates. Two auditors for one week on-site. Finance questions every single request.",
  },
  {
    icon: Users,
    metric: "10–12",
    title: "Audits per year maximum",
    description: "Your quality team has limited capacity. You can audit 10–12 suppliers per year. The other 90+ suppliers? Unverified risk in your supply chain.",
  },
  {
    icon: AlertTriangle,
    metric: "No standard",
    title: "Inconsistent audit quality",
    description: "Different auditors, different checklists, different scoring. Results depend on who shows up. Impossible to compare suppliers objectively.",
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
            Why traditional audits<br />do not scale
          </h2>
          <p className="text-lg text-foreground/50 mt-6">
            Most companies can only audit a fraction of their suppliers. The rest stays unverified — a risk nobody talks about.
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
