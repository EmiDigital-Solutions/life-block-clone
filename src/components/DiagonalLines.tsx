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
      {/* SVG container for diagonal lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Line 1 - Top right to center left */}
        <motion.line
          x1="1200"
          y1="-100"
          x2="200"
          y2="900"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
        
        {/* Line 2 - Top right to bottom left (main crossing line) */}
        <motion.line
          x1="1600"
          y1="-50"
          x2="400"
          y2="1200"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
        />
        
        {/* Line 3 - Center to bottom right */}
        <motion.line
          x1="600"
          y1="400"
          x2="1800"
          y2="1100"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.6, delay: 0.7, ease: "easeOut" }}
        />
        
        {/* Line 4 - Subtle accent line */}
        <motion.line
          x1="100"
          y1="600"
          x2="1000"
          y2="100"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};

export default DiagonalLines;
