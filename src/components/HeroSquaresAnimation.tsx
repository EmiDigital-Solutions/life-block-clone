import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Animated Croatian šahovnica (checkerboard) squares — red and white alternating.
 * 1. Cluster (initial grid)
 * 2. Checkmark (accepted)
 * 3. Magnifying glass (search)
 *
 * Placed in the upper-right corner of hero sections.
 */

const SQUARE_SIZE = 28;
const GAP = 3;
const UNIT = SQUARE_SIZE + GAP;

// Formation definitions — each square gets {x, y} offsets and opacity
const formations = {
  // Triangle: 45° pointing to upper-right corner
  triangle: [
    { x: UNIT * 4, y: 0 },
    { x: UNIT * 3, y: 0 },
    { x: UNIT * 4, y: UNIT },
    { x: UNIT * 2, y: 0 },
    { x: UNIT * 3, y: UNIT },
    { x: UNIT * 4, y: UNIT * 2 },
    { x: UNIT, y: 0 },
    { x: UNIT * 2, y: UNIT },
    { x: UNIT * 3, y: UNIT * 2 },
    { x: UNIT * 4, y: UNIT * 3 },
    { x: UNIT * 4, y: UNIT * 4, opacity: 0 },
  ],
  // Person / Auditor
  person: [
    { x: UNIT * 2.5, y: 0 },
    { x: UNIT * 1.5, y: UNIT },
    { x: UNIT * 2.5, y: UNIT },
    { x: UNIT * 3.5, y: UNIT },
    { x: UNIT * 2.5, y: UNIT * 2 },
    { x: UNIT * 1, y: UNIT * 2 },
    { x: UNIT * 4, y: UNIT * 2 },
    { x: UNIT * 2, y: UNIT * 3 },
    { x: UNIT * 3, y: UNIT * 3 },
    { x: UNIT * 2, y: UNIT * 4 },
    { x: UNIT * 3, y: UNIT * 4 },
  ],
  // Atlas AI Copilot
  atlasAI: [
    { x: UNIT * 0.5, y: UNIT * 3 },
    { x: UNIT * 0.75, y: UNIT * 2 },
    { x: UNIT * 1, y: UNIT },
    { x: UNIT * 1.25, y: 0 },
    { x: UNIT * 1.5, y: UNIT },
    { x: UNIT * 1.75, y: UNIT * 2 },
    { x: UNIT * 2, y: UNIT * 3 },
    { x: UNIT * 3.5, y: 0 },
    { x: UNIT * 3.5, y: UNIT },
    { x: UNIT * 3.5, y: UNIT * 2 },
    { x: UNIT * 3.5, y: UNIT * 3 },
  ],
  // Checkmark — diamonds
  checkmark: (() => {
    const D = (SQUARE_SIZE + 3) / Math.SQRT2;
    const vx = D * 2, vy = D * 4;
    return [
      { x: vx - D * 2, y: vy - D * 2, diamond: true },
      { x: vx - D, y: vy - D, diamond: true },
      { x: vx, y: vy, diamond: true },
      { x: vx + D, y: vy - D, diamond: true },
      { x: vx + D * 2, y: vy - D * 2, diamond: true },
      { x: vx + D * 3, y: vy - D * 3, diamond: true },
      { x: vx + D * 4, y: vy - D * 4, diamond: true },
      { x: vx + D, y: vy - D, opacity: 0 },
      { x: vx + D * 2, y: vy - D * 2, opacity: 0 },
      { x: vx + D * 3, y: vy - D * 3, opacity: 0 },
      { x: vx + D * 4, y: vy - D * 4, opacity: 0 },
    ];
  })(),

};

type Formation = keyof typeof formations;
const formationOrder: Formation[] = ["triangle", "person", "atlasAI", "checkmark"];
const formationLabels: Record<Formation, string> = {
  triangle: "High Speed",
  person: "Local Inspector",
  atlasAI: "Atlas Copilot",
  checkmark: "Verified Supplier",
};

// Calculate bottom Y and horizontal center for each formation (ignoring opacity:0 squares)
const formationMetrics: Record<Formation, { bottom: number; centerX: number }> = Object.fromEntries(
  Object.entries(formations).map(([key, squares]) => {
    const visible = squares.filter(s => (s as any).opacity === undefined);
    const maxY = Math.max(...visible.map(s => s.y));
    const minX = Math.min(...visible.map(s => s.x));
    const maxX = Math.max(...visible.map(s => s.x));
    return [key, { bottom: maxY + SQUARE_SIZE, centerX: (minX + maxX + SQUARE_SIZE) / 2 }];
  })
) as Record<Formation, { bottom: number; centerX: number }>;

interface HeroSquaresAnimationProps {
  className?: string;
}

const HeroSquaresAnimation = ({ className = "" }: HeroSquaresAnimationProps) => {
  const [currentFormation, setCurrentFormation] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFormation((prev) => (prev + 1) % formationOrder.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeFormation = formations[formationOrder[currentFormation]];

  return (
    <div
      className={`absolute pointer-events-none z-[5] origin-top-right scale-[0.55] md:scale-100 ${className}`}
      aria-hidden="true"
    >
      <div className="relative" style={{ width: UNIT * 5 + SQUARE_SIZE, height: UNIT * 5 + 32 }}>
        {activeFormation?.map((pos, i) => {
          // Checkerboard: color based on grid position (col + row) for proper red/white/red/white
          const col = Math.round(pos.x / UNIT);
          const row = Math.round(pos.y / UNIT);
          const isRed = (col + row) % 2 === 0;
          return (
          <motion.div
            key={i}
            className={`absolute ${isRed ? 'bg-destructive' : 'bg-white border border-destructive/30'}`}
            style={{
              width: SQUARE_SIZE,
              height: SQUARE_SIZE,
            }}
            animate={{
              x: pos.x,
              y: pos.y,
              opacity: (pos as any).opacity !== undefined ? (pos as any).opacity : 1,
              rotate: (pos as any).diamond ? 45 : 0,
            }}
            initial={false}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              mass: 0.8,
              delay: i * 0.04,
            }}
          />
        ))}
        <AnimatePresence mode="wait">
          <motion.p
            key={formationOrder[currentFormation]}
            className="absolute text-destructive font-mono text-xs md:text-sm tracking-widest uppercase whitespace-nowrap"
            style={{
              top: formationMetrics[formationOrder[currentFormation]].bottom + 12,
              left: formationMetrics[formationOrder[currentFormation]].centerX,
            }}
            initial={{ opacity: 0, y: 6, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -6, x: '-50%' }}
            transition={{ duration: 0.4 }}
          >
            {formationLabels[formationOrder[currentFormation]]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSquaresAnimation;
