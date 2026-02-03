import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AILoadingSpinnerProps {
  statuses: string[];
  size?: "sm" | "md" | "lg";
  interval?: number;
  className?: string;
}

// Brand colors for the spinner bars
const barColors = [
  "#0A7FA5", // YVOO Blue
  "#6EA996", // Hero Green
  "#E39B5C", // Amber Soft
  "#1391BF", // Lighter Blue
  "#AD3D3D", // Audit Red
  "#B2CDBC", // Mint Light
  "#ACC5D9", // BlueGrey Light
  "#87CEAB", // Light Green
];

export function AILoadingSpinner({ 
  statuses, 
  size = "md", 
  interval = 2000,
  className = "" 
}: AILoadingSpinnerProps) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  
  const sizeConfig = {
    sm: { diameter: 80, barWidth: 4, barHeight: 16, fontSize: "text-xs" },
    md: { diameter: 120, barWidth: 5, barHeight: 22, fontSize: "text-sm" },
    lg: { diameter: 160, barWidth: 6, barHeight: 28, fontSize: "text-base" },
  };
  
  const config = sizeConfig[size];
  const numberOfBars = 32;
  const radius = config.diameter / 2 - config.barHeight / 2 - 5;
  
  // Cycle through statuses
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatusIndex((prev) => (prev + 1) % statuses.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [statuses.length, interval]);
  
  // Generate bar positions
  const bars = Array.from({ length: numberOfBars }, (_, i) => {
    const angle = (i / numberOfBars) * 360;
    const radians = (angle * Math.PI) / 180;
    
    // Determine if this bar should be colored (random pattern)
    const isColored = [0, 3, 5, 8, 12, 15, 19, 23, 27, 30].includes(i);
    const colorIndex = Math.floor(Math.random() * barColors.length);
    
    return {
      id: i,
      angle,
      x: Math.sin(radians) * radius,
      y: -Math.cos(radians) * radius,
      isColored,
      color: isColored ? barColors[i % barColors.length] : "#E5E7EB",
    };
  });

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Spinner */}
      <div 
        className="relative"
        style={{ width: config.diameter, height: config.diameter }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {bars.map((bar) => (
            <motion.div
              key={bar.id}
              className="absolute rounded-full"
              style={{
                width: config.barWidth,
                height: config.barHeight,
                backgroundColor: bar.color,
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${bar.x}px, ${bar.y}px) rotate(${bar.angle}deg)`,
                opacity: bar.isColored ? 1 : 0.4,
              }}
              animate={bar.isColored ? {
                opacity: [0.7, 1, 0.7],
                scale: [0.95, 1.05, 0.95],
              } : {}}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </motion.div>
        
        {/* Center glow */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(10, 127, 165, 0.05) 0%, transparent 70%)",
          }}
        />
      </div>
      
      {/* Status Text */}
      <motion.div
        key={currentStatusIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`${config.fontSize} font-medium text-gray-900`}
      >
        {statuses[currentStatusIndex]}
      </motion.div>
    </div>
  );
}

// Standalone version for dark backgrounds
export function AILoadingSpinnerDark({ 
  statuses, 
  size = "md", 
  interval = 2000,
  className = "" 
}: AILoadingSpinnerProps) {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  
  const sizeConfig = {
    sm: { diameter: 80, barWidth: 4, barHeight: 16, fontSize: "text-xs" },
    md: { diameter: 120, barWidth: 5, barHeight: 22, fontSize: "text-sm" },
    lg: { diameter: 160, barWidth: 6, barHeight: 28, fontSize: "text-base" },
  };
  
  const config = sizeConfig[size];
  const numberOfBars = 32;
  const radius = config.diameter / 2 - config.barHeight / 2 - 5;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatusIndex((prev) => (prev + 1) % statuses.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [statuses.length, interval]);
  
  const bars = Array.from({ length: numberOfBars }, (_, i) => {
    const angle = (i / numberOfBars) * 360;
    const radians = (angle * Math.PI) / 180;
    const isColored = [0, 3, 5, 8, 12, 15, 19, 23, 27, 30].includes(i);
    
    return {
      id: i,
      angle,
      x: Math.sin(radians) * radius,
      y: -Math.cos(radians) * radius,
      isColored,
      color: isColored ? barColors[i % barColors.length] : "rgba(255,255,255,0.15)",
    };
  });

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div 
        className="relative"
        style={{ width: config.diameter, height: config.diameter }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {bars.map((bar) => (
            <motion.div
              key={bar.id}
              className="absolute rounded-full"
              style={{
                width: config.barWidth,
                height: config.barHeight,
                backgroundColor: bar.color,
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${bar.x}px, ${bar.y}px) rotate(${bar.angle}deg)`,
                opacity: bar.isColored ? 1 : 0.3,
              }}
              animate={bar.isColored ? {
                opacity: [0.7, 1, 0.7],
                scale: [0.95, 1.05, 0.95],
              } : {}}
              transition={{
                duration: 1.5 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 0.5,
              }}
            />
          ))}
        </motion.div>
      </div>
      
      <motion.div
        key={currentStatusIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`${config.fontSize} font-medium text-white`}
      >
        {statuses[currentStatusIndex]}
      </motion.div>
    </div>
  );
}

export default AILoadingSpinner;
