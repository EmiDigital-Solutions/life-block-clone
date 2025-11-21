// Pixel Art Icon component using pixelarticons library
// https://pixelarticons.com/

interface PixelIconProps {
  name: string;
  className?: string;
  color?: string;
}

export const PixelIcon = ({ name, className = "w-16 h-16", color = "currentColor" }: PixelIconProps) => {
  return (
    <img
      src={`https://unpkg.com/pixelarticons@1.8.1/svg/${name}.svg`}
      alt={name}
      className={className}
      style={{ 
        filter: color !== "currentColor" ? `invert(${color === "white" ? "100%" : "0%"})` : undefined,
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default PixelIcon;
