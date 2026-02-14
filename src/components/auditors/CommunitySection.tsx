import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { BookOpen, Users, Bell } from "lucide-react";

const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const items = [
    { icon: BookOpen, title: "Access exclusive training", desc: "Continuous professional development and certification support." },
    { icon: Users, title: "Learn from top auditors globally", desc: "Connect with peers across 47 countries and share best practices." },
    { icon: Bell, title: "Get standards updates first", desc: "Stay ahead with early access to regulatory and standards changes." },
  ];

  return (
    <section ref={ref} data-nav-theme="light" className="py-24 md:py-32 bg-white">
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
            <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Community
            </span>
          </div>
          <h2 className="section-headline text-foreground">
            More than a platform.
          </h2>
        </motion.div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              className="border-t-2 border-foreground/10 pt-6"
            >
              <item.icon className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Culture Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="max-w-2xl"
        >
          <p className="text-lg text-muted-foreground leading-relaxed italic">
            "We seek auditors who are curious, precise, and ethical. Join professionals who care about quality, not just paychecks."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
