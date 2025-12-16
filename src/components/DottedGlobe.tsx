import { motion } from "framer-motion";

type DottedGlobeProps = {
  badge: string;
  showMarker?: boolean;
};

export function DottedGlobe({ badge, showMarker = true }: DottedGlobeProps) {
  // Deterministic dot field (no Math.random) so it renders consistently.
  const rows = 22;
  const cols = 34;
  const dots: Array<{ x: number; y: number; r: number; o: number }> = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = 10 + col * 5.3;
      const y = 12 + row * 7.6;

      // Sphere mask
      const cx = 100;
      const cy = 100;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 82) continue;

      // Faux landmasses: deterministic noise function
      const n =
        Math.sin(x * 0.11) +
        Math.cos(y * 0.13) +
        Math.sin((x + y) * 0.07) +
        Math.cos((x - y) * 0.05);

      // Bias toward continents in upper-left and lower-right (similar to reference composition)
      const bias1 = Math.exp(-((x - 70) ** 2 + (y - 60) ** 2) / 1800);
      const bias2 = Math.exp(-((x - 115) ** 2 + (y - 135) ** 2) / 2200);
      const land = n + bias1 * 1.25 + bias2 * 0.9;

      if (land < 1.05) continue;

      const o = 0.75 + (1 - dist / 90) * 0.25;
      const r = 1.2 + (1 - dist / 90) * 0.9;

      dots.push({ x, y, r, o });
    }
  }

  return (
    <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px]">
      {/* Globe */}
      <div
        className="absolute inset-0 rounded-full bg-foreground overflow-hidden"
        style={{
          boxShadow: "inset -18px -18px 34px hsl(var(--foreground) / 0.35)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          {/* subtle top-left highlight */}
          <defs>
            <radialGradient id="globeGlow" cx="30%" cy="25%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="0.18" />
              <stop offset="55%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="100" fill="url(#globeGlow)" />

          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill="white"
              opacity={d.o}
            />
          ))}
        </svg>
      </div>

      {/* Marker */}
      {showMarker && (
        <motion.div
          className="absolute"
          style={{ top: "38%", left: "68%" }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <div className="relative">
            <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-secondary ring-2 ring-background" />
            <div className="absolute inset-0 rounded-full bg-secondary opacity-30 animate-ping" />
          </div>
        </motion.div>
      )}

      {/* Badge */}
      <div className="absolute top-1/2 right-[-18px] sm:right-[-28px] -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-full bg-secondary text-background px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold shadow-lg"
        >
          {badge}
        </motion.div>
      </div>
    </div>
  );
}
