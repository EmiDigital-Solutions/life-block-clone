import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    phase: "Find",
    title: "Search Suppliers",
    description: "Type what you need. AI scans thousands of suppliers worldwide in seconds. No cold calls, no trade fairs, no guesswork",
    highlight: "Free",
    cta: "Start Free Supplier Discovery",
    link: "/search-suppliers"
  },
  {
    phase: "Verify",
    title: "ScanPro+ Audit",
    description: "One click. Local certified auditor on-site in 48 hours. AI-guided audit. Verified report in 3 days. €700 flat. Done",
    cta: "Learn more",
    link: "/scanpro-plus"
  },
  {
    phase: "Decide",
    title: "Ground Intelligence",
    description: "Risk scores, evidence photos, equipment analysis—all in one dashboard. No more gut feeling. Just verified data",
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
               Find. Verify. Decide. One platform.
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
