import { motion } from "framer-motion";

interface DiagonalLinesProps {
  className?: string;
  lineColor?: string;
  animated?: boolean;
}

/**
 * HV Capital-style line overlay, but with the exact Y-shape taken from the YVOO logo.
 * We reuse the Y paths from src/assets/logo-new.svg and render them as strokes.
 */
const DiagonalLines = ({
  className = "",
  lineColor = "hsl(var(--primary))",
  animated = true,
}: DiagonalLinesProps) => {
  const common = {
    stroke: lineColor,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  const initial = animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.45 };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/*
        Big outline "Y" anchored to the right side, matching the logo geometry.
        The viewBox is the same as the logo (130 x 42).
      */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 130 42"
        preserveAspectRatio="xMaxYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          right: "-8%",
          top: "0%",
          width: "135%",
          height: "120%",
        }}
      >
        <g transform="translate(22 -6) scale(3.8)">
          {/* Y from logo-new.svg rendered as stroke outlines */}
          <motion.path
            d="M19.9866 30.464L17.1507 21.145C15.4234 15.4838 10.2157 11.6128 4.31185 11.6128H0V17.0542H3.59643C6.90928 17.0542 9.8483 19.174 10.9053 22.3212L14.3213 32.4738H20.4958V30.4705H19.9866V30.464Z"
            {...common}
            initial={initial}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 1.4, delay: 0.25, ease: "easeOut" }}
          />
          <motion.path
            d="M22.9187 42L33.0119 11.6455H25.9415L20.1988 30.4903L19.7992 31.6277L17.002 40.029L22.9187 42Z"
            {...common}
            initial={initial}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 1.6, delay: 0.35, ease: "easeOut" }}
          />
        </g>
      </svg>

      {/* Thin diagonal accent lines crossing like the reference page */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 72 -10 L 12 60"
          {...common}
          initial={initial}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 1.3, delay: 0.15, ease: "easeOut" }}
        />
        <motion.path
          d="M 112 10 L 42 90"
          {...common}
          initial={initial}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 1.5, delay: 0.25, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};

export default DiagonalLines;

