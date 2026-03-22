import { motion } from "framer-motion";

interface PortraitWithBlocksProps {
  src: string;
  alt: string;
  className?: string;
  variant?: "default" | "left" | "right";
}

/**
 * Portrait image with Croatian šahovnica-style scattered square blocks overlay.
 * Alternates red and white squares like the Croatian coat of arms.
 * Blocks are positioned to avoid overlapping the face/head area.
 */
const PortraitWithBlueBlocks = ({ 
  src, 
  alt, 
  className = "aspect-square",
  variant = "default"
}: PortraitWithBlocksProps) => {
  // Square size as percentage of container
  const sq = "w-[8%] aspect-square";

  const blockVariants = {
    default: (
      <>
        {/* Bottom-left cluster — checkerboard red/white */}
        <div className={`absolute bottom-[4%] left-[2%] ${sq} bg-primary`} />
        <div className={`absolute bottom-[4%] left-[11%] ${sq} bg-white border border-primary/30`} />
        <div className={`absolute bottom-[13%] left-[2%] ${sq} bg-white border border-primary/30`} />
        <div className={`absolute bottom-[13%] left-[20%] ${sq} bg-primary`} />
        <div className={`absolute bottom-[22%] left-[11%] ${sq} bg-primary`} />
        {/* Top-right cluster */}
        <div className={`absolute top-[6%] right-[3%] ${sq} bg-primary`} />
        <div className={`absolute top-[6%] right-[12%] ${sq} bg-white border border-primary/30`} />
        <div className={`absolute top-[15%] right-[3%] ${sq} bg-white border border-primary/30`} />
      </>
    ),
    left: (
      <>
        {/* Bottom-right cluster — checkerboard */}
        <div className={`absolute bottom-[4%] right-[2%] ${sq} bg-primary`} />
        <div className={`absolute bottom-[4%] right-[11%] ${sq} bg-white border border-primary/30`} />
        <div className={`absolute bottom-[13%] right-[2%] ${sq} bg-white border border-primary/30`} />
        <div className={`absolute bottom-[13%] right-[20%] ${sq} bg-primary`} />
        <div className={`absolute bottom-[22%] right-[11%] ${sq} bg-primary`} />
        {/* Top-left cluster */}
        <div className={`absolute top-[6%] left-[3%] ${sq} bg-white border border-primary/30`} />
        <div className={`absolute top-[6%] left-[12%] ${sq} bg-primary`} />
        <div className={`absolute top-[15%] left-[3%] ${sq} bg-primary`} />
      </>
    ),
    right: (
      <>
        {/* Bottom-left cluster */}
        <div className={`absolute bottom-[4%] left-[2%] ${sq} bg-primary`} />
        <div className={`absolute bottom-[4%] left-[11%] ${sq} bg-primary`} />
        <div className={`absolute bottom-[13%] left-[2%] ${sq} bg-primary`} />
        {/* Top-right scattered */}
        <div className={`absolute top-[4%] right-[2%] ${sq} bg-primary`} />
        <div className={`absolute top-[13%] right-[11%] ${sq} bg-primary`} />
        <div className={`absolute top-[4%] right-[11%] ${sq} bg-primary`} />
        <div className={`absolute top-[13%] right-[2%] ${sq} bg-primary`} />
      </>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden bg-muted ${className}`}
    >
      <img 
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale"
      />
      {blockVariants[variant]}
    </motion.div>
  );
};

export default PortraitWithBlueBlocks;
