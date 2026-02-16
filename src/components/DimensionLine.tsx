/**
 * DIN-style dimension line showing a value transition: "15.000 → 700"
 * Used at benefit/results sections to visualize cost or time reduction.
 * Snaps to the 6-column grid (lines 0–6).
 */

interface DimensionLineProps {
  /** Start value, e.g. "15.000" */
  from: string;
  /** End value, e.g. "700" */
  to: string;
  /** Unit suffix, e.g. "€" or "h" */
  unit?: string;
  /** Start grid line (0–6) */
  gridFrom?: number;
  /** End grid line (0–6) */
  gridTo?: number;
  className?: string;
}

const DimensionLine = ({
  from,
  to,
  unit = "€",
  gridFrom = 0,
  gridTo = 6,
  className = "",
}: DimensionLineProps) => {
  const leftPct = (gridFrom / 6) * 100;
  const widthPct = ((gridTo - gridFrom) / 6) * 100;

  return (
    <div className={`relative w-full h-6 ${className}`} aria-hidden="true">
      <div
        className="absolute flex items-center text-foreground/[0.12]"
        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
      >
        {/* Start value */}
        <span className="font-mono text-[9px] tracking-[0.1em] whitespace-nowrap select-none mr-1">
          {from}{unit}
        </span>

        {/* Left tick */}
        <div className="relative flex-shrink-0 w-px h-3 bg-current" />

        {/* Line with arrow */}
        <div className="flex-1 relative h-px bg-current mx-0.5">
          {/* Arrow in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="font-mono text-[8px] tracking-wider select-none bg-background px-1.5">
              →
            </span>
          </div>
        </div>

        {/* Right tick */}
        <div className="relative flex-shrink-0 w-px h-3 bg-current" />

        {/* End value */}
        <span className="font-mono text-[9px] tracking-[0.1em] whitespace-nowrap select-none ml-1">
          {to}{unit}
        </span>
      </div>
    </div>
  );
};

export default DimensionLine;
