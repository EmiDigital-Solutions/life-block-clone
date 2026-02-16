/**
 * ISO/DIN tolerance notation for quality metrics.
 * Renders values like "99.7 ±0.02 %" in technical drawing style.
 * Snaps to a specific grid column position.
 */

interface ToleranceNotationProps {
  /** Nominal value, e.g. "99.7" */
  nominal: string;
  /** Tolerance value, e.g. "0.02" */
  tolerance: string;
  /** Unit, e.g. "%" or "mm" */
  unit?: string;
  /** Optional label above, e.g. "Audit Quality" */
  label?: string;
  /** Grid column to anchor at (0–6) */
  gridColumn?: number;
  className?: string;
}

const ToleranceNotation = ({
  nominal,
  tolerance,
  unit = "%",
  label,
  gridColumn = 0,
  className = "",
}: ToleranceNotationProps) => {
  const leftPct = (gridColumn / 6) * 100;

  return (
    <div className={`relative w-full h-8 ${className}`} aria-hidden="true">
      <div
        className="absolute flex flex-col items-start text-foreground/[0.15]"
        style={{ left: `${leftPct}%` }}
      >
        {/* Optional label */}
        {label && (
          <span className="font-mono text-[7px] tracking-[0.2em] uppercase select-none mb-0.5">
            {label}
          </span>
        )}

        {/* Value with tolerance */}
        <div className="flex items-baseline gap-0">
          <span className="font-mono text-[11px] font-medium select-none tracking-tight">
            {nominal}
          </span>
          <span className="font-mono text-[8px] select-none relative -top-[3px] ml-0.5">
            ±{tolerance}
          </span>
          <span className="font-mono text-[9px] select-none ml-0.5">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToleranceNotation;
