import { motion, useInView, Easing } from "framer-motion";
import { useRef } from "react";

interface GeometricYDividerProps {
  className?: string;
  rotation?: number;
}

const GeometricYDivider = ({ className = "", rotation = 0 }: GeometricYDividerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const easeFunction: Easing = "easeOut";

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 0.8,
          ease: easeFunction,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  return (
    <div ref={ref} className={`flex justify-center items-center py-12 ${className}`}>
      <motion.svg
        viewBox="0 0 700 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[100px] h-[130px] md:w-[150px] md:h-[195px]"
        style={{
          opacity: 0.1,
          transform: `rotate(${rotation}deg)`,
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Top-left horizontal line with curve down */}
        <motion.path
          d="M 0 60 L 220 60 Q 380 60 450 200 L 520 380"
          stroke="#00D4FF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
        />
        
        {/* Top-right diagonal line */}
        <motion.path
          d="M 700 0 L 520 380"
          stroke="#00D4FF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
        />
        
        {/* Bottom-left branch with step pattern */}
        <motion.path
          d="M 520 380 L 520 480 L 420 480 L 420 580 L 320 580 L 320 900"
          stroke="#00D4FF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
        />
        
        {/* Bottom-right branch with step pattern */}
        <motion.path
          d="M 520 480 L 620 480 L 620 580 L 720 580 L 720 900"
          stroke="#00D4FF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
        />
      </motion.svg>
    </div>
  );
};

export default GeometricYDivider;
