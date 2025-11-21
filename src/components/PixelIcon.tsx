import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface PixelIconProps extends Omit<LucideProps, 'ref'> {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

/**
 * PixelIcon - Wraps any Lucide icon and applies a pixelated/8-bit retro style
 * Usage: <PixelIcon icon={Camera} size={24} className="text-blue-500" />
 */
export const PixelIcon = ({ icon: Icon, className = "", ...props }: PixelIconProps) => {
  return (
    <Icon
      {...props}
      className={`pixel-icon ${className}`}
      style={{
        imageRendering: 'pixelated',
        filter: 'contrast(1) brightness(1)',
        strokeWidth: 3,
        ...props.style
      }}
    />
  );
};
