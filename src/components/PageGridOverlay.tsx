/**
 * Reusable 6-column background grid overlay — Archlet style
 * Used on every page for consistent visual alignment.
 */
const PageGridOverlay = () => (
  <div className="fixed inset-0 z-[2] pointer-events-none" aria-hidden="true">
    <div className="mx-auto max-w-[1400px] h-full px-8">
      <div className="relative h-full">
        {/* Mobile: 4 columns (5 lines) */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`m-${i}`}
            className="absolute top-0 bottom-0 w-px bg-foreground/[0.07] md:hidden"
            style={{ left: `${(i / 4) * 100}%` }}
          />
        ))}
        {/* Desktop: 6 columns (7 lines) */}
        {[...Array(7)].map((_, i) => (
          <div
            key={`d-${i}`}
            className="absolute top-0 bottom-0 w-px bg-foreground/[0.07] hidden md:block"
            style={{ left: `${(i / 6) * 100}%` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default PageGridOverlay;
