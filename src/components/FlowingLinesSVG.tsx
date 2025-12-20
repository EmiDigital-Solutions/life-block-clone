import { motion } from "framer-motion";

interface FlowingLinesSVGProps {
  strokeWidth?: number;
  className?: string;
}

const FlowingLinesSVG = ({ strokeWidth = 0.5, className = "" }: FlowingLinesSVGProps) => {
  // Generate flowing curve paths
  const generatePath = (yOffset: number, amplitude: number, frequency: number) => {
    let path = `M -100 ${yOffset}`;
    for (let x = -100; x <= 1200; x += 10) {
      const y = yOffset + Math.sin((x + frequency) * 0.008) * amplitude + Math.sin((x + frequency * 0.5) * 0.015) * (amplitude * 0.5);
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  const lines = [
    { yOffset: 200, amplitude: 80, frequency: 0, delay: 0 },
    { yOffset: 250, amplitude: 100, frequency: 200, delay: 0.2 },
    { yOffset: 300, amplitude: 120, frequency: 400, delay: 0.4 },
    { yOffset: 350, amplitude: 90, frequency: 600, delay: 0.6 },
    { yOffset: 400, amplitude: 110, frequency: 800, delay: 0.8 },
    { yOffset: 450, amplitude: 130, frequency: 1000, delay: 1.0 },
    { yOffset: 500, amplitude: 85, frequency: 1200, delay: 1.2 },
    { yOffset: 550, amplitude: 105, frequency: 1400, delay: 1.4 },
    { yOffset: 600, amplitude: 95, frequency: 1600, delay: 1.6 },
    { yOffset: 650, amplitude: 115, frequency: 1800, delay: 1.8 },
    { yOffset: 700, amplitude: 125, frequency: 2000, delay: 2.0 },
    { yOffset: 750, amplitude: 75, frequency: 2200, delay: 2.2 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
        style={{ transform: 'translateY(20%)' }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#22c55e" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#22c55e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="lineGradientDim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {lines.map((line, index) => (
          <motion.path
            key={index}
            d={generatePath(line.yOffset, line.amplitude, line.frequency)}
            fill="none"
            stroke={index % 2 === 0 ? "url(#lineGradient)" : "url(#lineGradientDim)"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1,
              x: [0, -50, 0],
            }}
            transition={{
              pathLength: { duration: 2, delay: line.delay, ease: "easeOut" },
              opacity: { duration: 1, delay: line.delay },
              x: { duration: 8, delay: line.delay + 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}
      </svg>
      
      {/* Gradient overlay to blend into black top */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: 'linear-gradient(to bottom, #0a0a0a 0%, #0a0a0a 15%, transparent 45%)' 
        }}
      />
    </div>
  );
};

export default FlowingLinesSVG;
