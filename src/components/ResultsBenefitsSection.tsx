import { motion } from "framer-motion";

// Custom SVG icons matching the exact CSS design specifications

// Global Icon - Globe with checkmark
const GlobalIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer circle - white */}
    <circle cx="40" cy="40" r="32" stroke="#FFFFFF" strokeWidth="2" fill="none" />
    {/* Inner globe lines - cyan */}
    <circle cx="40" cy="40" r="24" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <ellipse cx="40" cy="40" rx="12" ry="24" stroke="#06D7F9" strokeWidth="2" fill="none" />
    <path d="M16 40H64" stroke="#06D7F9" strokeWidth="2" />
    <path d="M20 28H60" stroke="#06D7F9" strokeWidth="2" />
    <path d="M20 52H60" stroke="#06D7F9" strokeWidth="2" />
    {/* Checkmark badge */}
    <circle cx="62" cy="62" r="14" fill="#06D7F9" />
    <path d="M55 62L60 67L70 57" stroke="#131D2A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Quality Icon - Document with clock/timer (checklist verification)
const QualityIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main document shape - cyan */}
    <path d="M8 8C8 4 11 0 16 0H52L72 20V72C72 76 69 80 64 80H16C11 80 8 76 8 72V8Z" fill="#06D7F9" />
    {/* Folded corner */}
    <path d="M52 0V16C52 18 54 20 56 20H72" fill="#06D7F9" />
    <path d="M52 0L72 20" stroke="#131D2A" strokeWidth="1" />
    {/* White content area with lines */}
    <rect x="18" y="14" width="44" height="32" rx="2" fill="#FFFFFF" />
    <rect x="24" y="22" width="32" height="3" rx="1" fill="#06D7F9" />
    <rect x="24" y="30" width="24" height="3" rx="1" fill="#06D7F9" />
    <rect x="24" y="38" width="28" height="3" rx="1" fill="#06D7F9" />
    {/* Checkmarks */}
    <circle cx="56" cy="56" r="16" fill="#FFFFFF" />
    <path d="M48 56L54 62L66 50" stroke="#06D7F9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Realtime Icon - Dashboard with chart lines
const RealtimeIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left sidebar - white */}
    <rect x="0" y="0" width="28" height="80" rx="4" fill="#FFFFFF" />
    {/* Sidebar elements */}
    <rect x="6" y="8" width="16" height="4" rx="1" fill="#06D7F9" />
    <rect x="6" y="18" width="12" height="3" rx="1" fill="#131D2A" />
    <rect x="6" y="26" width="14" height="3" rx="1" fill="#131D2A" />
    {/* Main chart area - cyan */}
    <rect x="32" y="0" width="48" height="80" rx="4" fill="#06D7F9" />
    {/* Chart line graph */}
    <path d="M40 55L50 40L60 50L70 30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Data points */}
    <circle cx="40" cy="55" r="4" fill="#FFFFFF" />
    <circle cx="50" cy="40" r="4" fill="#FFFFFF" />
    <circle cx="60" cy="50" r="4" fill="#FFFFFF" />
    <circle cx="70" cy="30" r="4" fill="#FFFFFF" />
    {/* Grid lines */}
    <path d="M40 65H70" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
    <path d="M40 55H70" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
    <path d="M40 45H70" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
    {/* Data bars at bottom */}
    <rect x="42" y="68" width="6" height="6" rx="1" fill="#FFFFFF" />
    <rect x="52" y="68" width="6" height="6" rx="1" fill="#FFFFFF" />
    <rect x="62" y="68" width="6" height="6" rx="1" fill="#FFFFFF" />
  </svg>
);

// Control Icon - Gear/cog with settings
const ControlIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer gear shape - cyan */}
    <path d="M40 0L48 8H56V16L64 24V32L72 40L64 48V56L56 64V72H48L40 80L32 72H24V64L16 56V48L8 40L16 32V24L24 16V8H32L40 0Z" fill="#06D7F9" />
    {/* Inner circle - white */}
    <circle cx="40" cy="40" r="18" fill="#FFFFFF" />
    {/* Center dot */}
    <circle cx="40" cy="40" r="6" fill="#06D7F9" />
    {/* Gear teeth details */}
    <rect x="36" y="2" width="8" height="12" rx="2" fill="#06D7F9" />
    <rect x="36" y="66" width="8" height="12" rx="2" fill="#06D7F9" />
    <rect x="2" y="36" width="12" height="8" rx="2" fill="#06D7F9" />
    <rect x="66" y="36" width="12" height="8" rx="2" fill="#06D7F9" />
  </svg>
);

// Action Icon - Document with arrow (workflow)
const ActionIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left document - cyan */}
    <rect x="0" y="0" width="48" height="64" rx="4" fill="#06D7F9" />
    {/* Document lines */}
    <rect x="8" y="12" width="32" height="4" rx="1" fill="#FFFFFF" />
    <rect x="8" y="22" width="24" height="4" rx="1" fill="#FFFFFF" />
    <rect x="8" y="32" width="28" height="4" rx="1" fill="#FFFFFF" />
    <rect x="8" y="42" width="20" height="4" rx="1" fill="#FFFFFF" />
    <rect x="8" y="52" width="16" height="4" rx="1" fill="#FFFFFF" />
    {/* Arrow - white */}
    <path d="M52 32H72" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    <path d="M64 24L74 32L64 40" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    {/* Right target/result - cyan */}
    <rect x="56" y="48" width="24" height="32" rx="4" fill="#06D7F9" />
    <rect x="62" y="56" width="12" height="3" rx="1" fill="#FFFFFF" />
    <rect x="62" y="64" width="10" height="3" rx="1" fill="#FFFFFF" />
    <rect x="62" y="72" width="8" height="3" rx="1" fill="#FFFFFF" />
  </svg>
);

// Email Icon - Email with document distribution
const EmailIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* White envelope at top */}
    <rect x="13" y="0" width="54" height="43" rx="3" fill="#FFFFFF" />
    <path d="M13 8L40 28L67 8" stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Horizontal bars on envelope */}
    <rect x="44" y="24" width="16" height="4" rx="1" fill="#06D7F9" />
    <rect x="44" y="32" width="16" height="4" rx="1" fill="#06D7F9" />
    {/* Top bar */}
    <rect x="21" y="0" width="37" height="10" rx="2" fill="#06D7F9" />
    {/* Connecting vertical line */}
    <rect x="38" y="40" width="4" height="22" fill="#06D7F9" />
    {/* Horizontal connecting bar */}
    <rect x="8" y="51" width="64" height="12" rx="2" fill="#06D7F9" />
    {/* Three document blocks at bottom */}
    <rect x="0" y="58" width="21" height="22" rx="3" fill="#06D7F9" />
    <rect x="29" y="58" width="21" height="22" rx="3" fill="#06D7F9" />
    <rect x="59" y="58" width="21" height="22" rx="3" fill="#06D7F9" />
    {/* Small bars on document blocks */}
    <rect x="7" y="67" width="14" height="4" rx="1" fill="#131D2A" />
    <rect x="36" y="67" width="14" height="4" rx="1" fill="#131D2A" />
    <rect x="66" y="67" width="14" height="4" rx="1" fill="#131D2A" />
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
