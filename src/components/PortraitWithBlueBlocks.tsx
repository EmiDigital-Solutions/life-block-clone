import { motion } from "framer-motion";

interface PortraitWithBlueBlocksProps {
  src: string;
  alt: string;
  className?: string;
  variant?: "default" | "left" | "right" | "circle";
}

/**
 * Portrait image with Archlet-style Ion Blue geometric rectangular overlays.
 * Blocks are positioned to avoid overlapping the face/head area.
 */
const PortraitWithBlueBlocks = ({ 
  src, 
  alt, 
  className = "aspect-square",
  variant = "default"
}: PortraitWithBlueBlocksProps) => {
  const blockVariants = {
    default: (
      <>
        <div className="absolute top-[8%] right-0 w-[40%] h-[7%] bg-primary" />
        <div className="absolute bottom-[22%] right-[10%] w-[50%] h-[8%] bg-primary" />
        <div className="absolute bottom-[5%] left-0 w-[45%] h-[9%] bg-primary" />
      </>
    ),
    left: (
      <>
        <div className="absolute top-[6%] left-0 w-[35%] h-[7%] bg-primary" />
        <div className="absolute bottom-[18%] left-0 w-[45%] h-[8%] bg-primary" />
        <div className="absolute bottom-[4%] right-0 w-[40%] h-[9%] bg-primary" />
      </>
    ),
    right: (
      <>
        <div className="absolute top-[10%] right-0 w-[38%] h-[6%] bg-primary" />
        <div className="absolute bottom-[25%] right-0 w-[50%] h-[7%] bg-primary" />
        <div className="absolute bottom-[6%] left-[5%] w-[42%] h-[8%] bg-primary" />
      </>
    ),
    circle: (
      <>
        <div className="absolute top-[5%] right-[-5%] w-[35%] h-[8%] bg-primary" />
        <div className="absolute bottom-[15%] left-[-5%] w-[40%] h-[7%] bg-primary" />
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
