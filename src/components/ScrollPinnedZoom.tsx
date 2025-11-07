import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollPinnedZoomProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
}

const ScrollPinnedZoom = ({ imageSrc, imageAlt, children }: ScrollPinnedZoomProps) => {
  // Reference to the OUTER section (250vh tall)
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through the OUTER section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Image width zooms from 30% to 100% as user scrolls through the 250vh section
  const imageWidth = useTransform(scrollYProgress, [0, 1], ["30%", "100%"]);
  
  // Overlay fades out as zoom progresses
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.4, 0.2]);
  
  // Text fades in during final part of zoom
  const textOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <section 
      ref={sectionRef}
      className="relative h-[250vh]"
    >
      {/* Sticky container - STAYS PINNED in viewport while outer section scrolls */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Image zooms from 30% to 100% while staying centered */}
        <motion.img 
          src={imageSrc}
          alt={imageAlt}
          className="object-cover"
          style={{ 
            width: imageWidth,
            maxHeight: '100vh'
          }}
        />
        
        {/* Dark overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Text content fades in during zoom */}
        <motion.div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-12"
          style={{ opacity: textOpacity }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollPinnedZoom;
