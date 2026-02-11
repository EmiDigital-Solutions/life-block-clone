import { motion, animate, useMotionValue } from "framer-motion";
import { useEffect, useMemo } from "react";

type IrisWheelProps = {
  /** Overall wheel diameter in px */
  size?: number;
  /** Seconds per full rotation */
  durationSeconds?: number;
  spokes?: number;
  particlesPerSpoke?: number;
  /** First ring radius in px */
  innerRadius?: number;
  /** Radial spacing between particles on a spoke */
  particleSpacing?: number;
  /** Square size in px */
  particleSize?: number;
  /** Optional className for positioning wrapper */
  className?: string;
};

type WheelStyle = React.CSSProperties & {
  ["--wheel-rot"]?: number;
};

export default function IrisWheel({
  size = 800,
  durationSeconds = 30,
  spokes = 48,
  particlesPerSpoke = 8,
  innerRadius = 140,
  particleSpacing = 20,
  particleSize = 14,
  className,
}: IrisWheelProps) {
  const wheelRotate = useMotionValue(0);

  useEffect(() => {
    // Animate a shared numeric motion value (degrees) so we can reuse it in CSS var math
    const controls = animate(wheelRotate, [0, 360], {
      duration: durationSeconds,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [durationSeconds, wheelRotate]);

  const effectiveSpacing = Math.max(particleSpacing, particleSize + 6);

  const particles = useMemo(() => {
    const out: Array<{ id: string; x: number; y: number }> = [];

    for (let spoke = 0; spoke < spokes; spoke++) {
      const angle = (spoke / spokes) * Math.PI * 2;
      for (let p = 0; p < particlesPerSpoke; p++) {
        const radius = innerRadius + p * effectiveSpacing;
        const x = Math.sin(angle) * radius;
        const y = -Math.cos(angle) * radius;
        out.push({ id: `${spoke}-${p}`, x, y });
      }
    }

    return out;
  }, [effectiveSpacing, innerRadius, particlesPerSpoke, spokes]);

  return (
    <motion.div
      className={className}
      style={{
        width: size,
        height: size,
        rotate: wheelRotate,
        ["--wheel-rot" as any]: wheelRotate,
      } as unknown as React.CSSProperties}
    >
      {particles.map((pt) => (
        <div
          key={pt.id}
          className="absolute"
          style={{
            width: particleSize,
            height: particleSize,
            backgroundColor: "hsl(var(--iris-particle))",
            left: "50%",
            top: "50%",
            // IMPORTANT: counter-rotate using the SAME CSS variable as the wheel.
            // This guarantees squares stay axis-aligned (never become diamonds).
            transform: `translate(-50%, -50%) translate(${pt.x}px, ${pt.y}px) rotate(calc(var(--wheel-rot) * -1deg))`,
            opacity: 1,
          }}
        />
      ))}
    </motion.div>
  );
}

