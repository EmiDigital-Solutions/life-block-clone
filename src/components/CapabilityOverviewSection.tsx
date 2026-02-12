import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    title: "Search Suppliers",
    description: "AI-powered discovery to find and qualify the right suppliers in minutes, not months.",
    link: "/search-suppliers"
  },
  {
    title: "ScanPro+",
    description: "On-site audits with certified local auditors. No flights, no delays, consistent quality.",
    link: "/scanpro-plus"
  },
  {
    title: "Ground Intelligence",
    description: "Real-time supplier monitoring, risk scoring, and corrective action tracking.",
    link: "/ground-intelligence"
  }
];

const CapabilityOverviewSection = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-20 md:pt-28 lg:pt-32 pb-6 md:pb-8">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="section-headline text-foreground max-w-3xl">
              One place from search to verified partnership
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-foreground/10">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0"
              >
                <Link
                  to={cap.link}
                  className="group block h-full p-8 md:p-10 hover:bg-secondary/20 transition-colors"
                >
                  <div className="relative">
                    <div className="absolute -left-8 md:-left-10 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                      {cap.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {cap.description}
                  </p>
                  <div className="flex items-center gap-2 text-foreground font-medium group-hover:text-primary transition-colors">
                    <span className="text-sm">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilityOverviewSection;
