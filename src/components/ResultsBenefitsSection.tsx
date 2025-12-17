import { motion } from "framer-motion";

// Minimalist outline icons using brand colors
const accentColor = "#0A7FA5"; // CTA Blue-Teal
const secondaryColor = "#6EA996"; // Hero Green

// Icon 1: Globe with checkmark
const GlobalIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="20" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <ellipse cx="28" cy="28" rx="8" ry="20" stroke={accentColor} strokeWidth="1.5" fill="none" />
    <path d="M10 28H46" stroke={accentColor} strokeWidth="1.5" />
    <path d="M14 18H42" stroke={accentColor} strokeWidth="1.5" />
    <path d="M14 38H42" stroke={accentColor} strokeWidth="1.5" />
    <path d="M38 36L42 40L50 32" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icon 2: Magnifying glass with chart
const QualityIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="24" r="16" stroke={accentColor} strokeWidth="1.5" fill="none" />
    <path d="M34 36L46 48" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 30L18 24L24 28L32 18" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icon 3: Dashboard display
const RealtimeIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="40" height="48" rx="3" stroke={accentColor} strokeWidth="1.5" fill="none" />
    <path d="M8 12H48" stroke={accentColor} strokeWidth="1.5" />
    <path d="M16 36L24 28L32 34L42 20" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="36" r="2" fill={secondaryColor} />
    <circle cx="24" cy="28" r="2" fill={secondaryColor} />
    <circle cx="32" cy="34" r="2" fill={secondaryColor} />
    <circle cx="42" cy="20" r="2" fill={secondaryColor} />
  </svg>
);

// Icon 4: Document distribution
const EmailIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="4" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M14 8L28 18L42 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 24V32" stroke={accentColor} strokeWidth="1.5" />
    <path d="M12 32H44" stroke={accentColor} strokeWidth="1.5" />
    <path d="M16 32V38" stroke={accentColor} strokeWidth="1.5" />
    <path d="M28 32V38" stroke={accentColor} strokeWidth="1.5" />
    <path d="M40 32V38" stroke={accentColor} strokeWidth="1.5" />
    <rect x="6" y="38" width="16" height="14" rx="2" stroke={accentColor} strokeWidth="1.5" fill="none" />
    <rect x="20" y="38" width="16" height="14" rx="2" stroke={accentColor} strokeWidth="1.5" fill="none" />
    <rect x="34" y="38" width="16" height="14" rx="2" stroke={accentColor} strokeWidth="1.5" fill="none" />
  </svg>
);

// Icon 5: Gear/settings
const ControlIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="8" stroke={accentColor} strokeWidth="1.5" fill="none" />
    <path d="M28 4V10M28 46V52M4 28H10M46 28H52M11 11L15 15M41 41L45 45M11 45L15 41M41 15L45 11" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="28" cy="28" r="16" stroke={accentColor} strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
  </svg>
);

// Icon 6: Document with arrow
const ActionIcon = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="32" height="48" rx="2" stroke={accentColor} strokeWidth="1.5" fill="none" />
    <path d="M4 12H36" stroke={accentColor} strokeWidth="1.5" />
    <path d="M10 20H30" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 28H26" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 36H22" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M40 28H52" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" />
    <path d="M46 22L54 28L46 34" stroke={secondaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const benefits = [
  {
    Icon: GlobalIcon,
    title: "Instant access to global audit capacity",
    description: "Your suppliers are worldwide - now your audit capability is too."
  },
  {
    Icon: QualityIcon,
    title: "Consistent audit quality, every time",
    description: "Our AI guides every auditor step by step, ensuring high-quality results."
  },
  {
    Icon: RealtimeIcon,
    title: "Real-time insight into supplier risk",
    description: "Dashboards show you exactly where the gaps and risks are - instantly."
  },
  {
    Icon: EmailIcon,
    title: "Eliminate email chaos",
    description: "All your audit data, documents, and actions live in one secure platform."
  },
  {
    Icon: ControlIcon,
    title: "Stay in control with flexible checklists",
    description: "Use your own audit templates or industry standards - YVOO adapts to you."
  },
  {
    Icon: ActionIcon,
    title: "Turn findings into action",
    description: "YVOO links findings to corrective actions - and tracks them to closure."
  }
];

const ResultsBenefitsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header - offmenu style mixed weight typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="section-headline text-foreground">
            Transform your supply chain
          </h2>
        </motion.div>

        {/* Benefits Grid - offmenu style cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-[#ebebeb] rounded-[28px] p-8 hover:bg-[#e3e3e3] transition-colors duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-6 text-foreground">
                <benefit.Icon />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsBenefitsSection;
