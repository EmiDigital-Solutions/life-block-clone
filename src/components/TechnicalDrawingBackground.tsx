import React from "react";

interface TechnicalDrawingBackgroundProps {
  opacity?: number;
  className?: string;
  strokeColor?: string;
}

const TechnicalDrawingBackground: React.FC<TechnicalDrawingBackgroundProps> = ({
  opacity = 0.12,
  className = "",
  strokeColor = "currentColor",
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 1920 1080"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Frame - Outer Border with Corner Brackets */}
        <g stroke="currentColor" className="text-foreground">
          {/* Outer frame lines */}
          <rect x="60" y="40" width="1800" height="1000" strokeWidth="0.8" strokeDasharray="none" />
          <rect x="80" y="60" width="1760" height="960" strokeWidth="0.5" strokeDasharray="4 2" />
          
          {/* Corner Detail Brackets - Top Left */}
          <path d="M60 40 L60 100 M60 40 L120 40" strokeWidth="1.2" />
          <path d="M80 60 L80 90 M80 60 L110 60" strokeWidth="0.8" />
          <circle cx="70" cy="50" r="3" strokeWidth="0.6" />
          
          {/* Corner Detail Brackets - Top Right */}
          <path d="M1860 40 L1860 100 M1860 40 L1800 40" strokeWidth="1.2" />
          <path d="M1840 60 L1840 90 M1840 60 L1810 60" strokeWidth="0.8" />
          <circle cx="1850" cy="50" r="3" strokeWidth="0.6" />
          
          {/* Corner Detail Brackets - Bottom Left */}
          <path d="M60 1040 L60 980 M60 1040 L120 1040" strokeWidth="1.2" />
          <path d="M80 1020 L80 990 M80 1020 L110 1020" strokeWidth="0.8" />
          <circle cx="70" cy="1030" r="3" strokeWidth="0.6" />
          
          {/* Corner Detail Brackets - Bottom Right */}
          <path d="M1860 1040 L1860 980 M1860 1040 L1800 1040" strokeWidth="1.2" />
          <path d="M1840 1020 L1840 990 M1840 1020 L1810 1020" strokeWidth="0.8" />
          <circle cx="1850" cy="1030" r="3" strokeWidth="0.6" />
        </g>

        {/* Center Axis Lines - Symmetric */}
        <g stroke="currentColor" className="text-foreground">
          {/* Vertical center axis */}
          <line x1="960" y1="40" x2="960" y2="180" strokeWidth="0.6" strokeDasharray="8 4" />
          <line x1="960" y1="900" x2="960" y2="1040" strokeWidth="0.6" strokeDasharray="8 4" />
          
          {/* Horizontal center axis */}
          <line x1="60" y1="540" x2="200" y2="540" strokeWidth="0.6" strokeDasharray="8 4" />
          <line x1="1720" y1="540" x2="1860" y2="540" strokeWidth="0.6" strokeDasharray="8 4" />
          
          {/* Center crosshair */}
          <circle cx="960" cy="540" r="12" strokeWidth="0.5" />
          <circle cx="960" cy="540" r="6" strokeWidth="0.4" />
          <line x1="940" y1="540" x2="980" y2="540" strokeWidth="0.5" />
          <line x1="960" y1="520" x2="960" y2="560" strokeWidth="0.5" />
        </g>

        {/* Dimension Lines - Left Side (Automotive Style) */}
        <g stroke="currentColor" className="text-foreground">
          <line x1="40" y1="120" x2="40" y2="960" strokeWidth="0.7" />
          {/* Top arrow */}
          <path d="M40 120 L35 135 M40 120 L45 135" strokeWidth="0.7" />
          {/* Bottom arrow */}
          <path d="M40 960 L35 945 M40 960 L45 945" strokeWidth="0.7" />
          {/* Tick marks */}
          <line x1="35" y1="120" x2="50" y2="120" strokeWidth="0.7" />
          <line x1="35" y1="960" x2="50" y2="960" strokeWidth="0.7" />
          {/* Mid reference ticks */}
          <line x1="35" y1="540" x2="50" y2="540" strokeWidth="0.5" />
          <line x1="38" y1="330" x2="47" y2="330" strokeWidth="0.4" />
          <line x1="38" y1="750" x2="47" y2="750" strokeWidth="0.4" />
        </g>

        {/* Dimension Lines - Right Side (Mirror) */}
        <g stroke="currentColor" className="text-foreground">
          <line x1="1880" y1="120" x2="1880" y2="960" strokeWidth="0.7" />
          <path d="M1880 120 L1875 135 M1880 120 L1885 135" strokeWidth="0.7" />
          <path d="M1880 960 L1875 945 M1880 960 L1885 945" strokeWidth="0.7" />
          <line x1="1870" y1="120" x2="1890" y2="120" strokeWidth="0.7" />
          <line x1="1870" y1="960" x2="1890" y2="960" strokeWidth="0.7" />
          <line x1="1870" y1="540" x2="1890" y2="540" strokeWidth="0.5" />
          <line x1="1873" y1="330" x2="1887" y2="330" strokeWidth="0.4" />
          <line x1="1873" y1="750" x2="1887" y2="750" strokeWidth="0.4" />
        </g>

        {/* Dimension Lines - Top */}
        <g stroke="currentColor" className="text-foreground">
          <line x1="160" y1="20" x2="1760" y2="20" strokeWidth="0.7" />
          <path d="M160 20 L175 15 M160 20 L175 25" strokeWidth="0.7" />
          <path d="M1760 20 L1745 15 M1760 20 L1745 25" strokeWidth="0.7" />
          <line x1="160" y1="15" x2="160" y2="30" strokeWidth="0.7" />
          <line x1="1760" y1="15" x2="1760" y2="30" strokeWidth="0.7" />
          <line x1="960" y1="15" x2="960" y2="30" strokeWidth="0.5" />
          <line x1="560" y1="17" x2="560" y2="28" strokeWidth="0.4" />
          <line x1="1360" y1="17" x2="1360" y2="28" strokeWidth="0.4" />
        </g>

        {/* Dimension Lines - Bottom */}
        <g stroke="currentColor" className="text-foreground">
          <line x1="160" y1="1060" x2="1760" y2="1060" strokeWidth="0.7" />
          <path d="M160 1060 L175 1055 M160 1060 L175 1065" strokeWidth="0.7" />
          <path d="M1760 1060 L1745 1055 M1760 1060 L1745 1065" strokeWidth="0.7" />
          <line x1="160" y1="1050" x2="160" y2="1070" strokeWidth="0.7" />
          <line x1="1760" y1="1050" x2="1760" y2="1070" strokeWidth="0.7" />
          <line x1="960" y1="1050" x2="960" y2="1070" strokeWidth="0.5" />
        </g>

        {/* Reference Grid Points - Symmetric */}
        <g stroke="currentColor" className="text-foreground">
          {/* Top row reference circles */}
          <circle cx="240" cy="120" r="5" strokeWidth="0.5" />
          <circle cx="240" cy="120" r="2" strokeWidth="0.4" />
          <circle cx="480" cy="120" r="5" strokeWidth="0.5" />
          <circle cx="720" cy="120" r="5" strokeWidth="0.5" />
          <circle cx="1200" cy="120" r="5" strokeWidth="0.5" />
          <circle cx="1440" cy="120" r="5" strokeWidth="0.5" />
          <circle cx="1680" cy="120" r="5" strokeWidth="0.5" />
          <circle cx="1680" cy="120" r="2" strokeWidth="0.4" />
          
          {/* Bottom row reference circles */}
          <circle cx="240" cy="960" r="5" strokeWidth="0.5" />
          <circle cx="240" cy="960" r="2" strokeWidth="0.4" />
          <circle cx="480" cy="960" r="5" strokeWidth="0.5" />
          <circle cx="720" cy="960" r="5" strokeWidth="0.5" />
          <circle cx="1200" cy="960" r="5" strokeWidth="0.5" />
          <circle cx="1440" cy="960" r="5" strokeWidth="0.5" />
          <circle cx="1680" cy="960" r="5" strokeWidth="0.5" />
          <circle cx="1680" cy="960" r="2" strokeWidth="0.4" />
        </g>

        {/* Diagonal Construction Lines - Symmetric */}
        <g stroke="currentColor" className="text-foreground">
          {/* Top left diagonal */}
          <line x1="60" y1="40" x2="300" y2="280" strokeWidth="0.4" strokeDasharray="6 3" />
          <line x1="60" y1="140" x2="200" y2="280" strokeWidth="0.3" strokeDasharray="4 4" />
          
          {/* Top right diagonal - mirrored */}
          <line x1="1860" y1="40" x2="1620" y2="280" strokeWidth="0.4" strokeDasharray="6 3" />
          <line x1="1860" y1="140" x2="1720" y2="280" strokeWidth="0.3" strokeDasharray="4 4" />
          
          {/* Bottom left diagonal */}
          <line x1="60" y1="1040" x2="300" y2="800" strokeWidth="0.4" strokeDasharray="6 3" />
          <line x1="60" y1="940" x2="200" y2="800" strokeWidth="0.3" strokeDasharray="4 4" />
          
          {/* Bottom right diagonal - mirrored */}
          <line x1="1860" y1="1040" x2="1620" y2="800" strokeWidth="0.4" strokeDasharray="6 3" />
          <line x1="1860" y1="940" x2="1720" y2="800" strokeWidth="0.3" strokeDasharray="4 4" />
        </g>

        {/* Section Divider Lines */}
        <g stroke="currentColor" className="text-foreground">
          {/* Horizontal section markers */}
          <line x1="100" y1="300" x2="180" y2="300" strokeWidth="0.5" />
          <line x1="1740" y1="300" x2="1820" y2="300" strokeWidth="0.5" />
          
          <line x1="100" y1="780" x2="180" y2="780" strokeWidth="0.5" />
          <line x1="1740" y1="780" x2="1820" y2="780" strokeWidth="0.5" />
        </g>

        {/* Technical Cross Markers - Symmetric */}
        <g stroke="currentColor" className="text-foreground">
          {/* Upper crosses */}
          <g>
            <line x1="180" y1="200" x2="200" y2="220" strokeWidth="0.5" />
            <line x1="200" y1="200" x2="180" y2="220" strokeWidth="0.5" />
          </g>
          <g>
            <line x1="1720" y1="200" x2="1740" y2="220" strokeWidth="0.5" />
            <line x1="1740" y1="200" x2="1720" y2="220" strokeWidth="0.5" />
          </g>
          
          {/* Lower crosses */}
          <g>
            <line x1="180" y1="860" x2="200" y2="880" strokeWidth="0.5" />
            <line x1="200" y1="860" x2="180" y2="880" strokeWidth="0.5" />
          </g>
          <g>
            <line x1="1720" y1="860" x2="1740" y2="880" strokeWidth="0.5" />
            <line x1="1740" y1="860" x2="1720" y2="880" strokeWidth="0.5" />
          </g>
        </g>

        {/* Registration Marks - Like automotive blueprints */}
        <g stroke="currentColor" className="text-foreground">
          {/* Top center registration */}
          <circle cx="960" cy="80" r="8" strokeWidth="0.6" />
          <line x1="952" y1="80" x2="968" y2="80" strokeWidth="0.5" />
          <line x1="960" y1="72" x2="960" y2="88" strokeWidth="0.5" />
          
          {/* Bottom center registration */}
          <circle cx="960" cy="1000" r="8" strokeWidth="0.6" />
          <line x1="952" y1="1000" x2="968" y2="1000" strokeWidth="0.5" />
          <line x1="960" y1="992" x2="960" y2="1008" strokeWidth="0.5" />
          
          {/* Left center registration */}
          <circle cx="120" cy="540" r="8" strokeWidth="0.6" />
          <line x1="112" y1="540" x2="128" y2="540" strokeWidth="0.5" />
          <line x1="120" y1="532" x2="120" y2="548" strokeWidth="0.5" />
          
          {/* Right center registration */}
          <circle cx="1800" cy="540" r="8" strokeWidth="0.6" />
          <line x1="1792" y1="540" x2="1808" y2="540" strokeWidth="0.5" />
          <line x1="1800" y1="532" x2="1800" y2="548" strokeWidth="0.5" />
        </g>

        {/* Grid tick marks along edges - evenly spaced */}
        <g stroke="currentColor" className="text-foreground" strokeWidth="0.4">
          {[...Array(17)].map((_, i) => (
            <React.Fragment key={`grid-tick-${i}`}>
              {/* Top edge ticks */}
              <line x1={160 + i * 100} y1="40" x2={160 + i * 100} y2="48" />
              {/* Bottom edge ticks */}
              <line x1={160 + i * 100} y1="1032" x2={160 + i * 100} y2="1040" />
            </React.Fragment>
          ))}
          {[...Array(9)].map((_, i) => (
            <React.Fragment key={`grid-tick-v-${i}`}>
              {/* Left edge ticks */}
              <line x1="60" y1={140 + i * 100} x2="68" y2={140 + i * 100} />
              {/* Right edge ticks */}
              <line x1="1852" y1={140 + i * 100} x2="1860" y2={140 + i * 100} />
            </React.Fragment>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default TechnicalDrawingBackground;
