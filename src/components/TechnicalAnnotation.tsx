/**
 * Technical drawing-inspired dimension line snapped to the 6-column grid.
 * ISO / DIN blueprint aesthetic — barely visible, rewards close inspection.
 *
 * Grid columns (7 lines): 0%, 16.67%, 33.33%, 50%, 66.67%, 83.33%, 100%
 */

interface TechnicalAnnotationProps {
  /** Measurement label in mm, e.g. "1200" — DIN standard */
  label?: string;
  /** Start grid line (0–6) */
  from?: number;
  /** End grid line (0–6) */
  to?: number;
  /** Optional className override */
  className?: string;
}

const ArrowTip = ({ direction = "right" }: { direction?: "left" | "right" }) => (
  <svg
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    className={`flex-shrink-0 ${direction === "left" ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path d="M0 0 L6 5 L0 10" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

const TechnicalAnnotation = ({
  label = "1200",
  from = 0,
  to = 6,
  className = "",
}: TechnicalAnnotationProps) => {
  const leftPct = (from / 6) * 100;
  const widthPct = ((to - from) / 6) * 100;

  return (
    <div
      className={`relative w-full ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
      >
        <div className="flex items-center gap-0 text-foreground/[0.12]">
          {/* Left tick + arrow + line */}
          <div className="relative flex-shrink-0">
            <div className="absolute left-[2px] top-1/2 -translate-y-1/2 w-px h-2.5 bg-current" />
            <ArrowTip direction="left" />
          </div>
          <div className="flex-1 h-px bg-current" />

          {/* Label — DIN style */}
          <span className="px-2 font-mono text-[9px] tracking-[0.15em] select-none whitespace-nowrap">
            {label}
          </span>

          {/* Line + arrow + right tick */}
          <div className="flex-1 h-px bg-current" />
          <div className="relative flex-shrink-0">
            <div className="absolute right-[2px] top-1/2 -translate-y-1/2 w-px h-2.5 bg-current" />
            <ArrowTip direction="right" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalAnnotation;
