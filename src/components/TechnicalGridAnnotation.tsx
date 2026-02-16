import { motion } from "framer-motion";

interface TechnicalGridAnnotationProps {
  /** Layout variant for different section transitions */
  variant?: "hero-transition" | "mid-section" | "bottom-section";
  className?: string;
}

/**
 * Subtle technical drawing-inspired grid annotations
 * placed at strategic section transitions.
 * Hidden on mobile for cleanliness.
 */
const TechnicalGridAnnotation = ({ variant = "hero-transition", className = "" }: TechnicalGridAnnotationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`hidden md:block relative w-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div className="mx-auto max-w-[1400px] px-8 relative">
        {variant === "hero-transition" && <HeroTransitionAnnotation />}
        {variant === "mid-section" && <MidSectionAnnotation />}
        {variant === "bottom-section" && <BottomSectionAnnotation />}
      </div>
    </motion.div>
  );
};

/** Arrow tip marker definition reused across SVGs */
const ArrowMarkers = () => (
  <defs>
    <marker
      id="arrow-end"
      markerWidth="3"
      markerHeight="3"
      refX="1.5"
      refY="1.5"
      orient="auto"
    >
      <path d="M0,0 L3,1.5 L0,3" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </marker>
    <marker
      id="arrow-start"
      markerWidth="3"
      markerHeight="3"
      refX="1.5"
      refY="1.5"
      orient="auto-start-reverse"
    >
      <path d="M3,0 L0,1.5 L3,3" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </marker>
  </defs>
);

const DimensionLabel = ({ x, y, text }: { x: number; y: number; text: string }) => (
  <text
    x={x}
    y={y}
    className="fill-foreground/[0.07]"
    style={{
      fontFamily: "'Space Mono', 'DM Mono', 'IBM Plex Mono', monospace",
      fontSize: "10px",
      letterSpacing: "0.05em",
    }}
  >
    {text}
  </text>
);

const HeroTransitionAnnotation = () => (
  <svg
    className="w-full text-foreground/[0.08]"
    viewBox="0 0 1400 40"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
  >
    <ArrowMarkers />
    {/* Horizontal dimension line — left side */}
    <line
      x1="0" y1="20" x2="460" y2="20"
      stroke="currentColor" strokeWidth="0.5"
      markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)"
    />
    <DimensionLabel x={200} y={15} text="1400" />

    {/* Small vertical tick marks */}
    <line x1="0" y1="14" x2="0" y2="26" stroke="currentColor" strokeWidth="0.5" />
    <line x1="460" y1="14" x2="460" y2="26" stroke="currentColor" strokeWidth="0.5" />

    {/* Right-side short annotation */}
    <line
      x1="940" y1="20" x2="1400" y2="20"
      stroke="currentColor" strokeWidth="0.5"
      markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)"
    />
    <line x1="940" y1="14" x2="940" y2="26" stroke="currentColor" strokeWidth="0.5" />
    <line x1="1400" y1="14" x2="1400" y2="26" stroke="currentColor" strokeWidth="0.5" />
    <DimensionLabel x={1140} y={15} text="460" />
  </svg>
);

const MidSectionAnnotation = () => (
  <svg
    className="w-full text-foreground/[0.08]"
    viewBox="0 0 1400 60"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
  >
    <ArrowMarkers />
    {/* Vertical dimension line — left edge */}
    <line
      x1="20" y1="0" x2="20" y2="60"
      stroke="currentColor" strokeWidth="0.5"
      markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)"
    />
    <line x1="14" y1="0" x2="26" y2="0" stroke="currentColor" strokeWidth="0.5" />
    <line x1="14" y1="60" x2="26" y2="60" stroke="currentColor" strokeWidth="0.5" />
    <DimensionLabel x={28} y={34} text="800" />

    {/* Center crosshair */}
    <line x1="690" y1="25" x2="710" y2="25" stroke="currentColor" strokeWidth="0.5" />
    <line x1="700" y1="15" x2="700" y2="35" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="700" cy="25" r="6" stroke="currentColor" strokeWidth="0.5" fill="none" />

    {/* Right-side short horizontal */}
    <line
      x1="1200" y1="30" x2="1400" y2="30"
      stroke="currentColor" strokeWidth="0.5"
      markerEnd="url(#arrow-end)"
    />
    <DimensionLabel x={1280} y={25} text="200" />
  </svg>
);

const BottomSectionAnnotation = () => (
  <svg
    className="w-full text-foreground/[0.08]"
    viewBox="0 0 1400 30"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
  >
    <ArrowMarkers />
    {/* Full-width dimension line */}
    <line
      x1="0" y1="15" x2="1400" y2="15"
      stroke="currentColor" strokeWidth="0.5"
      markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)"
    />
    <line x1="0" y1="9" x2="0" y2="21" stroke="currentColor" strokeWidth="0.5" />
    <line x1="466" y1="9" x2="466" y2="21" stroke="currentColor" strokeWidth="0.5" />
    <line x1="933" y1="9" x2="933" y2="21" stroke="currentColor" strokeWidth="0.5" />
    <line x1="1400" y1="9" x2="1400" y2="21" stroke="currentColor" strokeWidth="0.5" />

    <DimensionLabel x={210} y={10} text="466" />
    <DimensionLabel x={680} y={10} text="467" />
    <DimensionLabel x={1150} y={10} text="467" />
  </svg>
);

export default TechnicalGridAnnotation;
