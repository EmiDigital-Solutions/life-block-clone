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
  // Triangle: pyramid shape pointing up
  triangle: [
    { x: UNIT * 1.5, y: 0 },
    { x: UNIT, y: UNIT },
    { x: UNIT * 2, y: UNIT },
    { x: UNIT * 0.5, y: UNIT * 2 },
    { x: UNIT * 1.5, y: UNIT * 2 },
    { x: UNIT * 2.5, y: UNIT * 2 },
    { x: 0, y: UNIT * 3 },
    { x: UNIT * 3, y: UNIT * 3 },
  ],
  // Checkmark shape
  checkmark: [
    { x: -UNIT * 0.5, y: UNIT * 1.5 },
    { x: 0, y: UNIT * 2 },
    { x: UNIT * 0.5, y: UNIT * 2.5 },
    { x: UNIT * 1, y: UNIT * 2 },
    { x: UNIT * 1.5, y: UNIT * 1.5 },
    { x: UNIT * 2, y: UNIT },
    { x: UNIT * 2.5, y: UNIT * 0.5 },
    { x: UNIT * 3, y: 0 },
  ],
  // Magnifying glass: circle + handle
  magnifyingGlass: [
    { x: UNIT * 0.5, y: 0 },
    { x: UNIT * 1.5, y: 0 },
    { x: 0, y: UNIT },
    { x: UNIT * 2, y: UNIT },
    { x: UNIT * 0.5, y: UNIT * 2 },
    { x: UNIT * 1.5, y: UNIT * 2 },
    { x: UNIT * 2.5, y: UNIT * 2.5 },
    { x: UNIT * 3, y: UNIT * 3 },
  ],
};

type Formation = keyof typeof formations;
const formationOrder: Formation[] = ["triangle", "checkmark", "magnifyingGlass"];

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
      className={`absolute pointer-events-none z-[5] ${className}`}
      aria-hidden="true"
    >
      <div className="relative" style={{ width: UNIT * 4, height: UNIT * 4 }}>
        {activeFormation.map((pos, i) => (
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
              opacity: 1,
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
      </div>
    </div>
  );
};

export default HeroSquaresAnimation;
