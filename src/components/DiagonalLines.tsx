import { motion } from "framer-motion";

interface DiagonalLinesProps {
  className?: string;
  lineColor?: string;
  animated?: boolean;
}

const DiagonalLines = ({ 
  className = "", 
  lineColor = "hsl(var(--primary))",
  animated = true 
}: DiagonalLinesProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* SVG container for YVOO Y-shaped lines */}
      <svg
        className="absolute"
        style={{ 
          right: '-5%',
          top: '10%',
          width: '70%',
          height: '100%'
        }}
        viewBox="0 0 800 900"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Left branch of Y - diagonal from top-left going to center */}
        <motion.path
          d="M 0 0 L 400 450"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />
        
        {/* Right branch of Y - diagonal from top-right going to center */}
        <motion.path
          d="M 600 0 L 400 450"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        />
        
        {/* Stem of Y - goes down, then right, then diagonal down-right */}
        <motion.path
          d="M 400 450 L 400 600 L 550 600 L 800 850"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.8, delay: 0.7, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};

export default DiagonalLines;
