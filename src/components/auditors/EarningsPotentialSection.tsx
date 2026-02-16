import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Check, X, MapPin, Clock, CreditCard, FileCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const EarningsPotentialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const paymentSteps = [
    {
      icon: FileCheck,
      title: "Submit report",
      description: "Upload your completed audit report to the platform",
      time: "Automatic",
    },
    {
      icon: Clock,
      title: "AI validates",
      description: "Instant quality check — no manual client approval needed",
      time: "< 1 minute",
    },
    {
      icon: CreditCard,
      title: "Payment released",
      description: "Funds are auto-released to your bank account",
      time: "Immediate",
    },
    {
      icon: Zap,
      title: "Paid same day",
      description: "Money in your account the same business day",
      time: "Same day",
    },
  ];

  const exampleAudits = [
    { standard: "ISO 9001", type: "Quality Management", location: "Shenzhen, China", fee: "$680", currency: "USD", distance: "15 km from auditor's home", duration: "2 days" },
    { standard: "VDA 6.3", type: "Process Audit", location: "Pune, India", fee: "$520", currency: "USD", distance: "22 km from auditor's home", duration: "2 days" },
    { standard: "IATF 16949", type: "Automotive QMS", location: "Wrocław, Poland", fee: "€1,150", currency: "EUR", distance: "8 km from auditor's home", duration: "3 days" },
    { standard: "AS9100 Rev D", type: "Aerospace QMS", location: "Detroit, USA", fee: "$1,400", currency: "USD", distance: "30 km from auditor's home", duration: "3 days" },
  ];

  return (
    <>
      {/* Payment Process Section — Dark, premium */}
      <section ref={ref} data-nav-theme="light" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">
                Payment Process
              </span>
            </div>
            <h2 className="section-headline text-foreground">
              Simple. Transparent. Immediate
            </h2>
          </motion.div>

          {/* Payment Flow — Visual Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {paymentSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                className="relative"
              >
                {/* Step number */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 border border-primary/40 bg-white flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  {idx < 3 && (
                    <div className="hidden lg:block flex-1 h-px bg-border" />
                  )}
                </div>

                {/* Step content */}
                <h4 className="text-foreground font-medium text-sm mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm mb-3">{step.description}</p>
                <span className="text-primary text-xs font-medium">{step.time}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8 border-t border-border"
          >
            <p className="text-xl md:text-2xl font-medium text-foreground">
              No invoicing. No waiting. No uncertainty.
            </p>
            <div className="hidden sm:block flex-1" />
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Report submitted → Payment released
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real Opportunities Section */}
      <RealOpportunitiesSection audits={exampleAudits} />
    </>
  );
};

const RealOpportunitiesSection = ({ audits }: { audits: { standard: string; type: string; location: string; fee: string; currency: string; distance: string; duration: string }[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} data-nav-theme="light" className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="section-eyebrow">
              Opportunities
            </span>
          </div>
          <h2 className="section-headline text-foreground">
            Real assignments. Real fees
          </h2>
        </motion.div>

        {/* Audit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {audits.map((audit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-muted p-6 border-t-2 border-primary/30 hover:border-primary transition-colors duration-300 group"
            >
              {/* Standard badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium tracking-[0.15em] text-primary uppercase">{audit.standard}</span>
                <span className="text-xs text-muted-foreground">{audit.duration}</span>
              </div>

              {/* Type */}
              <p className="text-sm text-muted-foreground mb-3">{audit.type}</p>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-foreground text-sm font-medium mb-5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{audit.location}</span>
              </div>

              {/* Fee */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-2xl md:text-3xl font-semibold text-foreground">{audit.fee}</p>
                <p className="text-xs text-muted-foreground mt-1">{audit.distance}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground/60 mb-10"
        >
          Examples based on recent assignments. Fees vary by standard, complexity, and region.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Button asChild size="lg" variant="outline">
            <a href="#">
              See available opportunities
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EarningsPotentialSection;
