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
      {/* SVG container for Y-shaped union lines */}
      <svg
        className="absolute w-full h-full"
        style={{ 
          right: '-10%',
          top: '-10%',
          width: '120%',
          height: '120%'
        }}
        viewBox="0 0 1400 1200"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {/* Curved arc at top left */}
        <motion.path
          d="M 0 100 L 200 100 Q 600 100 700 500"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
        />
        
        {/* Left branch of Y - curved from top-right going down */}
        <motion.path
          d="M 1100 0 Q 900 300 700 600"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.6, delay: 0.5, ease: "easeOut" }}
        />
        
        {/* Right branch of Y - diagonal line from top right */}
        <motion.path
          d="M 1400 0 L 1100 400 Q 900 650 750 650"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
        />
        
        {/* Bottom stem of Y - angular connection going down-right */}
        <motion.path
          d="M 700 600 L 750 650 L 750 850 L 900 850 Q 1100 850 1200 1000 L 1400 1200"
          stroke={lineColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.9, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};

export default DiagonalLines;
