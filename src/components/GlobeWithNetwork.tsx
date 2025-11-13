import { motion } from "framer-motion";
import Earth3D from "@/components/Earth3D";

const GlobeWithNetwork = () => {
  return (
    <div className="relative w-[500px] h-[500px]">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 50%, transparent 70%)',
        filter: 'blur(30px)',
        transform: 'scale(1.1)'
      }} />
      
      {/* Network Grid Background */}
      <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="globe-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34, 197, 94, 0.3)" strokeWidth="0.5"/>
            </pattern>
            <radialGradient id="globe-fadeGradient">
              <stop offset="0%" stopColor="white" stopOpacity="1"/>
              <stop offset="70%" stopColor="white" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            <mask id="globe-circleMask">
              <circle cx="250" cy="250" r="250" fill="url(#globe-fadeGradient)"/>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#globe-grid)" mask="url(#globe-circleMask)"/>
        </svg>
      </div>

      {/* Main Globe Container */}
      <div className="absolute inset-[50px] rounded-full border-2 border-green-500/20 backdrop-blur-sm" style={{
        background: 'radial-gradient(circle at 35% 35%, rgba(34, 197, 94, 0.08) 0%, rgba(22, 163, 74, 0.12) 40%, rgba(21, 128, 61, 0.15) 100%)',
        boxShadow: `
          0 0 60px rgba(34, 197, 94, 0.2),
          inset 0 0 60px rgba(34, 197, 94, 0.05),
          0 0 100px rgba(74, 222, 128, 0.15)
        `
      }}>
        <Earth3D width="100%" height="100%" showPins={true} />
      </div>

      {/* Rotating Network Lines */}
      <svg className="absolute inset-0 pointer-events-none" width="500" height="500">
        <defs>
          <linearGradient id="globe-greenLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#4ADE80" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#16A34A" stopOpacity="0.6"/>
          </linearGradient>
          <filter id="globe-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Network Connection Lines */}
        {[
          { x1: 100, y1: 150, x2: 200, y2: 100 },
          { x1: 200, y1: 100, x2: 350, y2: 120 },
          { x1: 350, y1: 120, x2: 400, y2: 200 },
          { x1: 150, y1: 300, x2: 250, y2: 250 },
          { x1: 250, y1: 250, x2: 350, y2: 300 },
          { x1: 120, y1: 400, x2: 250, y2: 380 },
          { x1: 250, y1: 380, x2: 380, y2: 390 }
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#globe-greenLineGradient)"
            strokeWidth="2"
            filter="url(#globe-glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.5
            }}
          />
        ))}

        {/* Connection Nodes */}
        {[
          { cx: 100, cy: 150 }, { cx: 200, cy: 100 }, { cx: 350, cy: 120 },
          { cx: 400, cy: 200 }, { cx: 150, cy: 300 }, { cx: 250, cy: 250 },
          { cx: 350, cy: 300 }, { cx: 120, cy: 400 }, { cx: 380, cy: 390 }
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="#22C55E"
            filter="url(#globe-glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.15,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1
            }}
          />
        ))}
      </svg>

      {/* Subtle Pulse Effect */}
      <motion.div
        className="absolute inset-[50px] rounded-full border border-green-400/30"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default GlobeWithNetwork;