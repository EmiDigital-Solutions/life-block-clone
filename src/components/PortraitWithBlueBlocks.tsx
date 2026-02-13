import { motion } from "framer-motion";

interface PortraitWithBlueBlocksProps {
  src: string;
  alt: string;
  className?: string;
  variant?: "default" | "left" | "right";
}

/**
 * Portrait image with Archlet-style scattered checkerboard square overlay.
 * Exact clone of reference: diagonal checkerboard grid of small squares,
 * forming triangular dissolve clusters at two opposite corners.
 * Squares overflow outside the image boundary.
 */
const PortraitWithBlueBlocks = ({ 
  src, 
  alt, 
  className = "aspect-square",
  variant = "default"
}: PortraitWithBlueBlocksProps) => {
  // Square size as % of container
  const S = 7;
  // Step = size (no visible gap, checkerboard pattern creates gaps)
  const STEP = S;

  // Helper: render a single square at grid coordinates
  // Grid origin is a corner; row/col are grid indices
  // Checkerboard: only render if (row+col) is even
  const Square = ({ style }: { style: React.CSSProperties }) => (
    <div 
      className="absolute bg-primary" 
      style={{ width: `${S}%`, height: `${S}%`, ...style }} 
    />
  );

  // Bottom-left cluster: triangular dissolve
  // Squares anchored from bottom-left, some overflow outside (negative values)
  // Triangle shape: more squares near corner, fewer toward center
  const bottomLeftSquares = [
    // Row 0 (bottommost, partially outside)
    { bottom: `${-STEP}%`, left: `${0}%` },
    { bottom: `${-STEP}%`, left: `${STEP * 2}%` },
    // Row 1
    { bottom: `${0}%`, left: `${-STEP}%` },
    { bottom: `${0}%`, left: `${STEP}%` },
    { bottom: `${0}%`, left: `${STEP * 3}%` },
    // Row 2
    { bottom: `${STEP}%`, left: `${0}%` },
    { bottom: `${STEP}%`, left: `${STEP * 2}%` },
    { bottom: `${STEP}%`, left: `${STEP * 4}%` },
    // Row 3
    { bottom: `${STEP * 2}%`, left: `${-STEP}%` },
    { bottom: `${STEP * 2}%`, left: `${STEP}%` },
    { bottom: `${STEP * 2}%`, left: `${STEP * 3}%` },
    // Row 4
    { bottom: `${STEP * 3}%`, left: `${0}%` },
    { bottom: `${STEP * 3}%`, left: `${STEP * 2}%` },
    // Row 5
    { bottom: `${STEP * 4}%`, left: `${STEP}%` },
    // Row 6 (topmost of cluster, single square)
    { bottom: `${STEP * 5}%`, left: `${0}%` },
  ];

  // Top-right cluster: triangular dissolve (mirror of bottom-left)
  const topRightSquares = [
    // Row 0 (topmost, partially outside)
    { top: `${-STEP}%`, right: `${0}%` },
    { top: `${-STEP}%`, right: `${STEP * 2}%` },
    // Row 1
    { top: `${0}%`, right: `${-STEP}%` },
    { top: `${0}%`, right: `${STEP}%` },
    { top: `${0}%`, right: `${STEP * 3}%` },
    // Row 2
    { top: `${STEP}%`, right: `${0}%` },
    { top: `${STEP}%`, right: `${STEP * 2}%` },
    { top: `${STEP}%`, right: `${STEP * 4}%` },
    // Row 3
    { top: `${STEP * 2}%`, right: `${-STEP}%` },
    { top: `${STEP * 2}%`, right: `${STEP}%` },
    { top: `${STEP * 2}%`, right: `${STEP * 3}%` },
    // Row 4
    { top: `${STEP * 3}%`, right: `${0}%` },
    { top: `${STEP * 3}%`, right: `${STEP * 2}%` },
    // Row 5
    { top: `${STEP * 4}%`, right: `${STEP}%` },
    // Row 6
    { top: `${STEP * 5}%`, right: `${0}%` },
  ];

  // Variant: left = bottom-right + top-left (mirrored)
  const bottomRightSquares = bottomLeftSquares.map((s, i) => {
    const mapped: React.CSSProperties = {};
    if ('bottom' in s) mapped.bottom = s.bottom;
    if ('left' in s) mapped.right = s.left; // flip left→right
    return mapped;
  });

  const topLeftSquares = topRightSquares.map((s) => {
    const mapped: React.CSSProperties = {};
    if ('top' in s) mapped.top = s.top;
    if ('right' in s) mapped.left = s.right; // flip right→left
    return mapped;
  });

  const clusterMap: Record<string, React.CSSProperties[][]> = {
    default: [bottomLeftSquares, topRightSquares],
    right: [bottomLeftSquares, topRightSquares],
    left: [bottomRightSquares, topLeftSquares],
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
