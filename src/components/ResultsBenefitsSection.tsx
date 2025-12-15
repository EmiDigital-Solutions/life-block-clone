import { motion } from "framer-motion";

// Custom SVG icons cloned from reference design

// Icon 1: Globe with checkmark (top-left)
const GlobalIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer circle - white */}
    <circle cx="40" cy="40" r="30" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
    {/* Globe meridian */}
    <ellipse cx="40" cy="40" rx="12" ry="30" stroke="#06D7F9" strokeWidth="2" fill="none" />
    {/* Horizontal lines */}
    <path d="M12 40H68" stroke="#06D7F9" strokeWidth="2" />
    <path d="M18 26H62" stroke="#06D7F9" strokeWidth="2" />
    <path d="M18 54H62" stroke="#06D7F9" strokeWidth="2" />
    {/* Checkmark in bottom right */}
    <path d="M52 50L58 56L68 44" stroke="#06D7F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Icon 2: Magnifying glass with document (top-center)
const QualityIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Magnifying glass circle */}
    <circle cx="32" cy="32" r="22" stroke="#06D7F9" strokeWidth="2.5" fill="none" />
    {/* Magnifying glass handle */}
    <path d="M48 48L64 64" stroke="#06D7F9" strokeWidth="3" strokeLinecap="round" />
    {/* Document inside magnifier */}
    <rect x="22" y="20" width="20" height="24" rx="2" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    {/* Document lines */}
    <path d="M26 28H38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 34H38" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 40H34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Small dots/indicators */}
    <circle cx="58" cy="20" r="3" fill="#06D7F9" />
    <circle cx="68" cy="28" r="2" fill="#06D7F9" />
    <circle cx="64" cy="38" r="2" fill="#06D7F9" />
  </svg>
);

// Icon 3: Dashboard/chart display (top-right)
const RealtimeIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mobile/tablet frame */}
    <rect x="16" y="4" width="48" height="72" rx="4" stroke="#06D7F9" strokeWidth="2.5" fill="none" />
    {/* Top bar */}
    <path d="M16 16H64" stroke="#06D7F9" strokeWidth="2" />
    {/* Chart line going up */}
    <path d="M24 56L36 44L48 52L60 28" stroke="#06D7F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Data points */}
    <circle cx="24" cy="56" r="3" fill="#06D7F9" />
    <circle cx="36" cy="44" r="3" fill="#06D7F9" />
    <circle cx="48" cy="52" r="3" fill="#06D7F9" />
    <circle cx="60" cy="28" r="3" fill="#06D7F9" />
    {/* Bottom data rows */}
    <rect x="24" y="62" width="16" height="3" rx="1" fill="#06D7F9" />
    <rect x="44" y="62" width="12" height="3" rx="1" fill="#06D7F9" />
    <rect x="24" y="68" width="12" height="3" rx="1" fill="#06D7F9" />
    <rect x="40" y="68" width="16" height="3" rx="1" fill="#06D7F9" />
  </svg>
);

// Icon 4: Email/Document distribution (bottom-left)
const EmailIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top document/envelope */}
    <rect x="20" y="0" width="40" height="32" rx="3" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
    {/* Envelope flap */}
    <path d="M20 8L40 22L60 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Horizontal lines in document */}
    <rect x="44" y="14" width="12" height="3" rx="1" fill="#06D7F9" />
    <rect x="44" y="20" width="12" height="3" rx="1" fill="#06D7F9" />
    {/* Vertical connecting line */}
    <rect x="38" y="32" width="4" height="16" fill="#06D7F9" />
    {/* Horizontal connector */}
    <rect x="10" y="44" width="60" height="4" rx="1" fill="#06D7F9" />
    {/* Three vertical lines down */}
    <rect x="18" y="48" width="4" height="10" fill="#06D7F9" />
    <rect x="38" y="48" width="4" height="10" fill="#06D7F9" />
    <rect x="58" y="48" width="4" height="10" fill="#06D7F9" />
    {/* Three document blocks at bottom */}
    <rect x="6" y="58" width="28" height="22" rx="3" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <rect x="26" y="58" width="28" height="22" rx="3" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <rect x="46" y="58" width="28" height="22" rx="3" stroke="#06D7F9" strokeWidth="2" fill="none" />
    {/* Lines in bottom blocks */}
    <rect x="12" y="66" width="16" height="3" rx="1" fill="#06D7F9" />
    <rect x="32" y="66" width="16" height="3" rx="1" fill="#06D7F9" />
    <rect x="52" y="66" width="16" height="3" rx="1" fill="#06D7F9" />
  </svg>
);

// Icon 5: Gear/cog (bottom-center)
const ControlIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer gear teeth */}
    <path 
      d="M40 8L44 8L48 4L52 8L56 8L60 12L60 16L64 20L64 24L68 28L68 32L72 36L72 40L72 44L68 48L68 52L64 56L64 60L60 64L56 72L52 72L48 76L44 72L40 72L36 72L32 76L28 72L24 72L20 64L16 60L16 56L12 52L12 48L8 44L8 40L8 36L12 32L12 28L16 24L16 20L20 16L20 12L24 8L28 8L32 4L36 8L40 8Z" 
      stroke="#06D7F9" 
      strokeWidth="2.5" 
      fill="none"
    />
    {/* Inner circle */}
    <circle cx="40" cy="40" r="14" stroke="#06D7F9" strokeWidth="2.5" fill="none" />
    {/* Center dot */}
    <circle cx="40" cy="40" r="4" fill="#06D7F9" />
  </svg>
);

// Icon 6: Document with arrow (bottom-right)
const ActionIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main document frame */}
    <rect x="8" y="4" width="44" height="72" rx="3" stroke="#06D7F9" strokeWidth="2.5" fill="none" />
    {/* Document header line */}
    <path d="M8 16H52" stroke="#06D7F9" strokeWidth="2" />
    {/* Content lines */}
    <rect x="16" y="24" width="28" height="3" rx="1" fill="#06D7F9" />
    <rect x="16" y="32" width="24" height="3" rx="1" fill="#06D7F9" />
    <rect x="16" y="40" width="20" height="3" rx="1" fill="#06D7F9" />
    <rect x="16" y="48" width="28" height="3" rx="1" fill="#06D7F9" />
    <rect x="16" y="56" width="16" height="3" rx="1" fill="#06D7F9" />
    <rect x="16" y="64" width="24" height="3" rx="1" fill="#06D7F9" />
    {/* Arrow pointing right */}
    <path d="M56 40H74" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    <path d="M66 32L76 40L66 48" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
