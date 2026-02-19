import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    phase: "Search",
    title: "Find Suppliers",
    description: "Describe what you need. AI finds matching suppliers by capability, certification, and capacity — worldwide, in seconds",
    highlight: "Free",
    cta: "Try Supplier Search",
    link: "/search-suppliers"
  },
  {
    phase: "Verify",
    title: "On-Site Audit",
    description: "Local certified auditor on-site in 72 hours. AI-guided checklists, photo evidence, standardized scoring. From €700",
    cta: "Learn more",
    link: "/scanpro-plus"
  },
  {
    phase: "Improve",
    title: "Reports & CAPA",
    description: "Decision-ready reports in 24h. Corrective actions auto-generated, tracked, and verified until close-out. Full traceability",
    cta: "Learn more",
    link: "/ground-intelligence"
  }
];

const CapabilityOverviewSection = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-20 md:pt-28 lg:pt-32 pb-6 md:pb-8">
       <div className="mx-auto max-w-[1400px] px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
             <h2 className="section-headline text-foreground max-w-4xl">
               Three core capabilities. One platform.
             </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-0 border-t border-foreground/10">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="lg:col-span-2 border-b md:border-b-0 md:border-r border-foreground/10 last:border-r-0"
              >
                <Link
                  to={cap.link}
                  className="group block h-full p-8 md:p-10 hover:bg-secondary/20 transition-colors"
                >
                  <div className="relative">
                    <div className="absolute -left-8 md:-left-10 top-0 bottom-0 w-1 bg-foreground scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                    <span className="text-sm font-medium tracking-[0.15em] uppercase text-foreground/50 mb-3 block">
                      {cap.phase}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                      {cap.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {cap.description}
                    {cap.highlight && (
                      <span className="inline-block ml-1.5 px-2.5 py-0.5 bg-foreground/10 text-foreground text-xs font-bold tracking-wide uppercase rounded-sm">
                        {cap.highlight}
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-2 text-foreground font-medium group-hover:text-foreground/70 transition-colors">
                    <span className="text-sm">{cap.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default CapabilityOverviewSection;
