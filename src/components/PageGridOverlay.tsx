/**
 * Reusable 6-column background grid overlay — Archlet style
 * Used on every page for consistent visual alignment.
 */
const PageGridOverlay = () => (
  <div className="fixed inset-0 z-[2] pointer-events-none" aria-hidden="true">
    <div className="mx-auto max-w-[1400px] h-full px-8">
      <div className="relative h-full">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-foreground/[0.07]"
            style={{ left: `${(i / 6) * 100}%` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default PageGridOverlay;
