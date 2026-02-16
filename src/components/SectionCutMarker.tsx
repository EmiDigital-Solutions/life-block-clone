/**
 * ISO section cut marker — renders "A—A" or "B—B" style labels
 * used in technical drawings to indicate where a cross-section is taken.
 * Renders as a full-width line with labels at both ends, snapped to grid.
 */

interface SectionCutMarkerProps {
  /** Section label, e.g. "A" renders as "A—A" */
  section?: string;
  /** Start grid line (0–6) */
  from?: number;
  /** End grid line (0–6) */
  to?: number;
  className?: string;
}

const SectionCutMarker = ({
  section = "A",
  from = 0,
  to = 6,
  className = "",
}: SectionCutMarkerProps) => {
  const leftPct = (from / 6) * 100;
  const widthPct = ((to - from) / 6) * 100;

  return (
    <div className={`relative w-full h-6 ${className}`} aria-hidden="true">
      <div
        className="absolute flex items-center text-foreground/[0.10]"
        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
      >
        {/* Left label circle */}
        <div className="flex-shrink-0 w-5 h-5 border border-current flex items-center justify-center">
          <span className="font-mono text-[8px] font-bold select-none tracking-wider">
            {section}
          </span>
        </div>

        {/* Dashed center line — alternating dash pattern like ISO cut lines */}
        <div className="flex-1 mx-1.5 relative">
          <div
            className="w-full h-px"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, currentColor 0, currentColor 12px, transparent 12px, transparent 16px, currentColor 16px, currentColor 20px, transparent 20px, transparent 24px)`,
            }}
          />
        </div>

        {/* Right label circle */}
        <div className="flex-shrink-0 w-5 h-5 border border-current flex items-center justify-center">
          <span className="font-mono text-[8px] font-bold select-none tracking-wider">
            {section}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionCutMarker;
