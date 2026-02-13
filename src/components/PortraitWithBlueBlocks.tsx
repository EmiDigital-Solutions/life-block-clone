import { motion } from "framer-motion";

interface PortraitWithBlueBlocksProps {
  src: string;
  alt: string;
  className?: string;
  variant?: "default" | "left" | "right";
}

/**
 * Portrait with Archlet-style checkerboard staircase overlay.
 * Reference: strict grid of squares forming a stepped diagonal band
 * along bottom-right and top-left edges. Squares overflow outside image.
 */
const PortraitWithBlueBlocks = ({ 
  src, 
  alt, 
  className = "aspect-square",
  variant = "default"
}: PortraitWithBlueBlocksProps) => {
  const S = 8; // square size as % of container

  const Square = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute bg-primary" style={{ width: `${S}%`, height: `${S}%`, ...style }} />
  );

  // Bottom-right staircase: checkerboard band stepping up from right to left
  // Like reference: horizontal row of squares at bottom, stepping up diagonally
  const bottomRightStaircase: React.CSSProperties[] = [
    // Bottom row (extends outside right edge)
    { bottom: `${-S}%`, right: `${0}%` },
    { bottom: `${-S}%`, right: `${S * 2}%` },
    // Row 1 - at bottom edge
    { bottom: `${0}%`, right: `${-S}%` },
    { bottom: `${0}%`, right: `${S}%` },
    { bottom: `${0}%`, right: `${S * 3}%` },
    { bottom: `${0}%`, right: `${S * 5}%` },
    // Row 2 - one step up
    { bottom: `${S}%`, right: `${0}%` },
    { bottom: `${S}%`, right: `${S * 2}%` },
    { bottom: `${S}%`, right: `${S * 4}%` },
    // Row 3 - two steps up (fewer squares, dissolving)
    { bottom: `${S * 2}%`, right: `${S}%` },
    { bottom: `${S * 2}%`, right: `${S * 3}%` },
    // Row 4 - three steps up (single squares)
    { bottom: `${S * 3}%`, right: `${0}%` },
    { bottom: `${S * 3}%`, right: `${S * 2}%` },
    // Row 5
    { bottom: `${S * 4}%`, right: `${S}%` },
  ];

  // Top-left staircase: mirror of bottom-right
  const topLeftStaircase: React.CSSProperties[] = [
    // Top row (extends outside)
    { top: `${-S}%`, left: `${0}%` },
    { top: `${-S}%`, left: `${S * 2}%` },
    // Row 1
    { top: `${0}%`, left: `${-S}%` },
    { top: `${0}%`, left: `${S}%` },
    { top: `${0}%`, left: `${S * 3}%` },
    // Row 2
    { top: `${S}%`, left: `${0}%` },
    { top: `${S}%`, left: `${S * 2}%` },
    // Row 3
    { top: `${S * 2}%`, left: `${S}%` },
    { top: `${S * 2}%`, left: `${S * 3}%` },
    // Row 4
    { top: `${S * 3}%`, left: `${0}%` },
  ];

  // Flipped variants for "left" orientation
  const bottomLeftStaircase: React.CSSProperties[] = bottomRightStaircase.map(s => {
    const mapped: React.CSSProperties = {};
    if (s.bottom !== undefined) mapped.bottom = s.bottom;
    if (s.right !== undefined) mapped.left = s.right;
    return mapped;
  });

  const topRightStaircase: React.CSSProperties[] = topLeftStaircase.map(s => {
    const mapped: React.CSSProperties = {};
    if (s.top !== undefined) mapped.top = s.top;
    if (s.left !== undefined) mapped.right = s.left;
    return mapped;
  });

  const clusterMap: Record<string, React.CSSProperties[][]> = {
    default: [bottomRightStaircase, topLeftStaircase],
    right: [bottomRightStaircase, topLeftStaircase],
    left: [bottomLeftStaircase, topRightStaircase],
  };

  const clusters = clusterMap[variant] || clusterMap.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-visible ${className}`}
    >
      <img 
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale"
      />
      {clusters.map((cluster, ci) =>
        cluster.map((style, si) => (
          <Square key={`${ci}-${si}`} style={style} />
        ))
      )}
    </motion.div>
  );
};

export default PortraitWithBlueBlocks;
