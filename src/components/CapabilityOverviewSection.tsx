import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    phase: "Find",
    title: "Search Suppliers",
    description: "Type what you need. AI scans thousands of suppliers worldwide in seconds. No cold calls, no trade fairs, no guesswork. Free.",
    link: "/search-suppliers"
  },
  {
    phase: "Verify",
    title: "ScanPro+ Audit",
    description: "One click. Local certified auditor on-site in 48 hours. AI-guided audit. Verified report in 3 days. €700 flat. Done.",
    link: "/scanpro-plus"
  },
  {
    phase: "Decide",
    title: "Ground Intelligence",
    description: "Risk scores, evidence photos, equipment analysis—all in one dashboard. No more gut feeling. Just verified data.",
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
              The physics of why we're simply better.
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
                    <div className="absolute -left-8 md:-left-10 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                    <span className="text-xs font-mono tracking-[0.15em] uppercase text-primary mb-3 block">
                      {cap.phase}
                    </span>
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
    </section>
  );
};

export default CapabilityOverviewSection;
