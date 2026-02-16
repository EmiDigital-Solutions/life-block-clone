/**
 * Technical drawing-inspired dimension line with arrow tips.
 * ISO blueprint aesthetic — barely visible, rewards close inspection.
 */

interface TechnicalAnnotationProps {
  /** Measurement label, e.g. "1200" or "Ø 800" */
  label?: string;
  /** Horizontal alignment: full width or partial */
  variant?: "full" | "left" | "right" | "center";
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
  variant = "full",
  className = "",
}: TechnicalAnnotationProps) => {
  const widthClass =
    variant === "full"
      ? "w-full"
      : variant === "center"
      ? "w-1/2 mx-auto"
      : variant === "left"
      ? "w-1/3"
      : "w-1/3 ml-auto";

  return (
    <div
      className={`relative ${widthClass} ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-0 text-foreground/[0.12]">
        {/* Left arrow + line */}
        <ArrowTip direction="left" />
        <div className="flex-1 h-px bg-current" />

        {/* Label */}
        <span className="px-3 font-mono text-[9px] tracking-[0.2em] uppercase select-none whitespace-nowrap">
          {label}
        </span>

        {/* Line + right arrow */}
        <div className="flex-1 h-px bg-current" />
        <ArrowTip direction="right" />
      </div>

      {/* Small perpendicular ticks at ends */}
      <div className="absolute left-[3px] top-1/2 -translate-y-1/2 w-px h-2 bg-current text-foreground/[0.12]" />
      <div className="absolute right-[3px] top-1/2 -translate-y-1/2 w-px h-2 bg-current text-foreground/[0.12]" />
    </div>
  );
};

export default TechnicalAnnotation;
