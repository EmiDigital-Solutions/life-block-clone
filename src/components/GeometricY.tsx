import { motion, Easing } from "framer-motion";

interface GeometricYProps {
  className?: string;
  opacity?: number;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "hero" | "divider" | "footer";
  rotation?: number;
  animated?: boolean;
  color?: string;
}

const GeometricY = ({
  className = "",
  opacity = 0.2,
  size = "lg",
  variant = "hero",
  rotation = 0,
  animated = true,
  color = "#00D4FF",
}: GeometricYProps) => {
  const sizeMap = {
    sm: { width: 200, height: 250 },
    md: { width: 400, height: 500 },
    lg: { width: 600, height: 750 },
    xl: { width: 800, height: 1000 },
  };

  const { width, height } = sizeMap[size];
  const strokeWidth = variant === "hero" ? 2 : 1.5;

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
          duration: 1.2,
          ease: easeFunction,
        },
        opacity: {
          duration: 0.3,
        },
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.svg
      viewBox="0 0 700 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width,
        height,
        opacity,
        transform: `rotate(${rotation}deg)`,
      }}
      initial={animated ? "hidden" : "visible"}
      animate="visible"
      variants={containerVariants}
    >
      {/* Top-left horizontal line with curve down */}
      <motion.path
        d="M 0 60 L 220 60 Q 380 60 450 200 L 520 380"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={animated ? pathVariants : undefined}
      />
      
      {/* Top-right diagonal line */}
      <motion.path
        d="M 700 0 L 520 380"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={animated ? pathVariants : undefined}
      />
      
      {/* Bottom-left branch with step pattern */}
      <motion.path
        d="M 520 380 L 520 480 L 420 480 L 420 580 L 320 580 L 320 900"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={animated ? pathVariants : undefined}
      />
      
      {/* Bottom-right branch with step pattern */}
      <motion.path
        d="M 520 480 L 620 480 L 620 580 L 720 580 L 720 900"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={animated ? pathVariants : undefined}
      />
    </motion.svg>
  );
};

export default GeometricY;
