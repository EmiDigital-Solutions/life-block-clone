import { motion, animate, useMotionValue, useTransform } from "framer-motion";
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
  const particleRotate = useTransform(wheelRotate, (v) => -v);

  useEffect(() => {
    const controls = animate(wheelRotate, 360, {
      duration: durationSeconds,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [durationSeconds, wheelRotate]);

  const particles = useMemo(() => {
    const out: Array<{ id: string; x: number; y: number }> = [];

    for (let spoke = 0; spoke < spokes; spoke++) {
      const angle = (spoke / spokes) * Math.PI * 2;
      for (let p = 0; p < particlesPerSpoke; p++) {
        const radius = innerRadius + p * particleSpacing;
        const x = Math.sin(angle) * radius;
        const y = -Math.cos(angle) * radius;
        out.push({ id: `${spoke}-${p}`, x, y });
      }
    }

    return out;
  }, [innerRadius, particleSpacing, particlesPerSpoke, spokes]);

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size, rotate: wheelRotate }}
    >
      {particles.map((pt) => (
        <motion.div
          key={pt.id}
          className="absolute"
          style={{
            width: particleSize,
            height: particleSize,
            backgroundColor: "hsl(var(--primary-foreground))",
            left: "50%",
            top: "50%",
            x: pt.x - particleSize / 2,
            y: pt.y - particleSize / 2,
            rotate: particleRotate,
            opacity: 1,
          }}
        />
      ))}
    </motion.div>
  );
}
