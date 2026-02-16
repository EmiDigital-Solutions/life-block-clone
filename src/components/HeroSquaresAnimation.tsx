import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Animated Ion Blue squares that morph between three formations:
 * 1. Cluster (initial grid)
 * 2. Checkmark (accepted)
 * 3. Magnifying glass (search)
 *
 * Placed in the upper-right corner of hero sections.
 */

const SQUARE_SIZE = 28;
const GAP = 6;
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
  // Person / Auditor: head (1) + body (torso + arms + legs)
  person: [
    // Head
    { x: UNIT * 2.5, y: 0 },
    // Shoulders
    { x: UNIT * 1.5, y: UNIT },
    { x: UNIT * 2.5, y: UNIT },
    { x: UNIT * 3.5, y: UNIT },
    // Torso
    { x: UNIT * 2.5, y: UNIT * 2 },
    // Arms
    { x: UNIT * 1, y: UNIT * 2 },
    { x: UNIT * 4, y: UNIT * 2 },
    // Legs + feet
    { x: UNIT * 2, y: UNIT * 3 },
    { x: UNIT * 3, y: UNIT * 3 },
    { x: UNIT * 2, y: UNIT * 4 },
    { x: UNIT * 3, y: UNIT * 4 },
  ],
  // Atlas AI Copilot — filled screen/tablet shape
  atlasAI: [
    // Top row (screen top)
    { x: UNIT * 1.5, y: 0 },
    { x: UNIT * 2.5, y: 0 },
    { x: UNIT * 3.5, y: 0 },
    // Second row
    { x: UNIT * 1.5, y: UNIT },
    { x: UNIT * 2.5, y: UNIT },
    { x: UNIT * 3.5, y: UNIT },
    // Third row
    { x: UNIT * 1.5, y: UNIT * 2 },
    { x: UNIT * 2.5, y: UNIT * 2 },
    { x: UNIT * 3.5, y: UNIT * 2 },
    // Stand/base
    { x: UNIT * 2.5, y: UNIT * 3 },
    // Hidden
    { x: UNIT * 2.5, y: UNIT * 4, opacity: 0 },
  ],
  // Checkmark shape
  checkmark: [
    { x: UNIT * 0.5, y: UNIT * 1.5 },
    { x: UNIT * 1, y: UNIT * 2 },
    { x: UNIT * 1.5, y: UNIT * 2.5 },
    { x: UNIT * 2, y: UNIT * 2 },
    { x: UNIT * 2.5, y: UNIT * 1.5 },
    { x: UNIT * 3, y: UNIT },
    { x: UNIT * 3.5, y: UNIT * 0.5 },
    { x: UNIT * 4, y: 0 },
    { x: UNIT * 1.5, y: UNIT * 2.5, opacity: 0 },
    { x: UNIT * 2, y: UNIT * 2, opacity: 0 },
    { x: UNIT * 2.5, y: UNIT * 1.5, opacity: 0 },
  ],
};

type Formation = keyof typeof formations;
const formationOrder: Formation[] = ["triangle", "person", "atlasAI", "checkmark"];
const formationLabels: Record<Formation, string> = {
  triangle: "Unlimited Capacity",
  person: "Local Auditors",
  atlasAI: "Atlas Copilot",
  checkmark: "Verified Supplier",
};

// Calculate max visible Y (ignoring opacity:0 squares) + SQUARE_SIZE for bottom edge
const formationBottoms: Record<Formation, number> = Object.fromEntries(
  Object.entries(formations).map(([key, squares]) => {
    const maxY = Math.max(...squares.filter(s => (s as any).opacity === undefined).map(s => s.y));
    return [key, maxY + SQUARE_SIZE];
  })
) as Record<Formation, number>;

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
        {activeFormation?.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary"
            style={{
              width: SQUARE_SIZE,
              height: SQUARE_SIZE,
            }}
            animate={{
              x: pos.x,
              y: pos.y,
              opacity: (pos as any).opacity !== undefined ? (pos as any).opacity : 1,
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
            className="absolute text-primary font-mono text-xs md:text-sm tracking-widest uppercase text-center w-full"
            style={{ top: formationBottoms[formationOrder[currentFormation]] + 12, left: 0 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
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
