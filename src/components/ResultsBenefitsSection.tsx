import { motion } from "framer-motion";

// Custom SVG icons matching the reference design
const GlobalIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="28" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <ellipse cx="40" cy="40" rx="14" ry="28" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <path d="M12 40H68" stroke="#06D7F9" strokeWidth="2" />
    <path d="M18 25H62" stroke="#06D7F9" strokeWidth="2" />
    <path d="M18 55H62" stroke="#06D7F9" strokeWidth="2" />
    <circle cx="58" cy="58" r="12" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <path d="M54 58L58 62L66 54" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QualityIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="12" width="48" height="56" rx="4" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <path d="M26 28H54" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 40H54" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 52H42" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" />
    <circle cx="56" cy="56" r="14" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <path d="M56 48V56L62 62" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RealtimeIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="16" width="60" height="48" rx="4" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <path d="M10 28H70" stroke="#06D7F9" strokeWidth="2" />
    <path d="M22 42L32 52L44 36L56 48" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="22" cy="42" r="3" fill="#06D7F9" />
    <circle cx="32" cy="52" r="3" fill="#06D7F9" />
    <circle cx="44" cy="36" r="3" fill="#06D7F9" />
    <circle cx="56" cy="48" r="3" fill="#06D7F9" />
  </svg>
);

const EmailIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="20" width="56" height="40" rx="4" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    <path d="M12 24L40 44L68 24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="44" y="48" width="24" height="20" rx="2" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <circle cx="50" cy="58" r="2" fill="#06D7F9" />
    <circle cx="56" cy="58" r="2" fill="#06D7F9" />
    <circle cx="62" cy="58" r="2" fill="#06D7F9" />
    <circle cx="50" cy="64" r="2" fill="#06D7F9" />
    <circle cx="56" cy="64" r="2" fill="#06D7F9" />
    <circle cx="62" cy="64" r="2" fill="#06D7F9" />
  </svg>
);

const ControlIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="24" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <path d="M40 24V40L52 52" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="40" cy="40" r="4" fill="#06D7F9" />
    <path d="M28 16L32 24" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" />
    <path d="M52 16L48 24" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" />
    <rect x="32" y="8" width="16" height="8" rx="2" stroke="#06D7F9" strokeWidth="2" fill="none" />
  </svg>
);

const ActionIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="12" width="32" height="40" rx="4" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <path d="M20 24H36" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 32H36" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 40H28" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 36H68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M58 28L68 36L58 44" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="48" y="52" width="20" height="16" rx="2" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <path d="M52 60H64" stroke="#06D7F9" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const benefits = [
  {
    Icon: GlobalIcon,
    title: "You gain instant access to global audit capacity",
    description: "Your suppliers are worldwide - now your audit capability is too. With YVOO's certified global auditor network, you can scale fast, without delay."
  },
  {
    Icon: QualityIcon,
    title: "You ensure consistent audit quality, every time",
    description: "No more relying on individual experience. Our AI guides every auditor step by step, ensuring consistent, high-quality results - wherever they are."
  },
  {
    Icon: RealtimeIcon,
    title: "You get real-time insight into supplier risk",
    description: "Stop guessing. Our dashboards show you exactly where the gaps and risks are - across every audit, instantly."
  },
  {
    Icon: EmailIcon,
    title: "You eliminate email chaos and version confusion",
    description: "All your audit data, documents, and actions live in one secure platform - easy to access, easy to manage."
  },
  {
    Icon: ControlIcon,
    title: "You stay in control with flexible checklists",
    description: "Use your own audit templates or industry standards - YVOO adapts to your process, not the other way around."
  },
  {
    Icon: ActionIcon,
    title: "You turn findings into action, automatically",
    description: "No more flagged issues with no follow-up. YVOO links findings to root causes and corrective actions - and tracks them to closure."
  }
];

const ResultsBenefitsSection = () => {
  return (
    <section className="bg-black py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white leading-tight max-w-[500px] mb-16 md:mb-20"
        >
          Benefits of a Global Auditor Network and AI-Powered Supplier Audit Solution
        </motion.h2>

        {/* Benefits Grid - Square Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#131D2A] rounded-[30px] p-8 aspect-square flex flex-col"
            >
              {/* Icon */}
              <div className="w-20 h-20 mb-6">
                <benefit.Icon />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="text-[#06D7F9] text-xl md:text-2xl font-bold leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-white text-base md:text-lg leading-relaxed opacity-90">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsBenefitsSection;
