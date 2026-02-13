import { motion } from "framer-motion";

interface PortraitWithBlueBlocksProps {
  src: string;
  alt: string;
  className?: string;
  variant?: "default" | "left" | "right";
}

/**
 * Portrait image with Archlet-style scattered checkerboard square overlay.
 * Matches reference: diagonal grid of small squares, some filled with primary color,
 * creating a pixel-mosaic dissolve effect at edges. Squares avoid face/head area.
 */
const PortraitWithBlueBlocks = ({ 
  src, 
  alt, 
  className = "aspect-square",
  variant = "default"
}: PortraitWithBlueBlocksProps) => {
  // Each square is ~6% of container width, gap between = ~6% (checkerboard spacing)
  const s = 6; // square size %
  const g = s; // gap = same as size for checkerboard

  // Generate a checkerboard grid of squares at given origin, with some cells filled
  // Pattern mimics the reference: diagonal dissolve from corner
  const renderSquareCluster = (
    originX: number, 
    originY: number, 
    pattern: boolean[][], 
    anchorRight = false,
    anchorBottom = false
  ) => {
    const squares: JSX.Element[] = [];
    pattern.forEach((row, rowIdx) => {
      row.forEach((filled, colIdx) => {
        if (!filled) return;
        const x = originX + colIdx * g;
        const y = originY + rowIdx * g;
        const style: React.CSSProperties = {
          position: 'absolute',
          width: `${s}%`,
          aspectRatio: '1',
        };
        if (anchorRight) {
          style.right = `${x}%`;
        } else {
          style.left = `${x}%`;
        }
        if (anchorBottom) {
          style.bottom = `${y}%`;
        } else {
          style.top = `${y}%`;
        }
        squares.push(
          <div key={`${rowIdx}-${colIdx}`} className="bg-primary" style={style} />
        );
      });
    });
    return squares;
  };

  // Checkerboard dissolve patterns (true = filled square)
  // Mimics the reference diagonal pixel scatter
  const bottomLeftPattern = [
    [false, true,  false, false, false],
    [true,  false, true,  false, false],
    [false, true,  false, true,  false],
    [true,  false, true,  false, true ],
    [false, true,  false, true,  false],
  ];

  const topRightPattern = [
    [false, true,  false, true ],
    [true,  false, true,  false],
    [false, true,  false, false],
    [true,  false, false, false],
  ];

  const bottomRightPattern = [
    [false, false, false, true ],
    [false, false, true,  false],
    [false, true,  false, true ],
    [true,  false, true,  false],
    [false, true,  false, true ],
  ];

  const topLeftPattern = [
    [true,  false, true,  false],
    [false, true,  false, false],
    [true,  false, false, false],
  ];

  const variants: Record<string, JSX.Element[]> = {
    default: [
      ...renderSquareCluster(0, 0, bottomLeftPattern, false, true),
      ...renderSquareCluster(0, 0, topRightPattern, true, false),
    ],
    left: [
      ...renderSquareCluster(0, 0, bottomRightPattern, true, true),
      ...renderSquareCluster(0, 0, topLeftPattern, false, false),
    ],
    right: [
      ...renderSquareCluster(0, 0, bottomLeftPattern, false, true),
      ...renderSquareCluster(0, 0, topRightPattern, true, false),
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-visible bg-muted ${className}`}
    >
      <img 
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale"
      />
      {variants[variant]}
    </motion.div>
  );
};

export default PortraitWithBlueBlocks;
