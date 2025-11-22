// Pixel Art Icon component using pixelarticons library
// https://pixelarticons.com/

interface PixelIconProps {
  name: string;
  className?: string;
  color?: string;
}

// Mapping from Lucide icon names to pixelarticons names
const iconMapping: Record<string, string> = {
  // Basic shapes and symbols
  "check": "check",
  "check-circle": "checkbox-on",
  "checkCircle2": "checkbox-on",
  "x": "close",
  "close": "close",
  
  // Arrows and navigation
  "arrow-right": "arrow-right",
  "arrowRight": "arrow-right",
  "arrow-left": "arrow-left",
  "arrowLeft": "arrow-left",
  "chevron-right": "chevron-right",
  "chevronRight": "chevron-right",
  "chevron-left": "chevron-left",
  "chevronLeft": "chevron-left",
  "chevron-down": "chevron-down",
  "chevronDown": "chevron-down",
  
  // Communication
  "mail": "mail",
  "phone": "phone",
  "message-circle": "message",
  "messageCircle": "message",
  "message": "message",
  
  // Time and calendar
  "clock": "clock",
  "calendar": "calendar",
  
  // Business and office
  "briefcase": "briefcase",
  "file-text": "note",
  "fileText": "note",
  "folder": "folder",
  
  // Technology
  "cpu": "cpu",
  "hard-drive": "server",
  "server": "server",
  "zap": "zap",
  "bolt": "zap",
  
  // Maps and location
  "globe": "globe",
  "map-pin": "pin",
  "mapPin": "pin",
  
  // Shopping and commerce
  "shopping-cart": "cart",
  "shoppingCart": "cart",
  "dollar-sign": "coin",
  "dollarSign": "coin",
  
  // Users and people
  "user": "user",
  "users": "users",
  "user-check": "user",
  "userCheck": "user",
  
  // Media and content
  "camera": "camera",
  "image": "image",
  "eye": "eye",
  
  // Actions
  "search": "search",
  "save": "save",
  "edit": "edit",
  "trash": "trash",
  "upload": "upload",
  "download": "download",
  
  // UI Elements
  "menu": "menu",
  "settings": "sliders",
  "sliders": "sliders",
  
  // Status and indicators
  "star": "star",
  "award": "trophy",
  "trophy": "trophy",
  "shield": "shield",
  "lock": "lock",
  "alert-triangle": "alert",
  "alertTriangle": "alert",
  
  // Charts and analytics
  "trending-up": "trending-up",
  "trendingUp": "trending-up",
  "trending-down": "trending-down",
  "trendingDown": "trending-down",
  "bar-chart": "analytics",
  "barChart3": "analytics",
  "barChart": "analytics",
  
  // Misc
  "target": "target",
  "sparkles": "star",
  "lightbulb": "lightbulb",
  "package": "gift",
  "rocket": "rocket",
  "mouse": "cursor",
  "link": "link",
  "linkIcon": "link",
  
  // Industry specific - using generic icons
  "car": "car",
  "plane": "rocket",
  "factory": "building",
  "pill": "heart",
  "building2": "building",
  "building": "building",
  "leaf": "leaf",
  "shieldCheck": "shield",
  "checkCheck": "check",
  "messageSquare": "message",
  "checkbox-on": "check",
  "heart": "heart",
  
  // Additional mappings
  "brain": "zap",
  "workflow": "layers",
  "network": "layers",
  "cog": "settings",
  "gauge": "sliders",
  "listChecks": "list",
  "plug": "link",
  "circleCheck": "check",
  
  // Compliance standards specific mappings
  "iso": "shield",
  "as": "rocket",
  "vda": "settings",
};

export const PixelIcon = ({ name, className = "w-16 h-16", color = "currentColor" }: PixelIconProps) => {
  // Convert name to lowercase and replace camelCase with dash-case
  const normalizedName = name.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
  
  // Get the mapped icon name or use the normalized name
  const iconName = iconMapping[name] || iconMapping[normalizedName] || "box";
  
  return (
    <img
      src={`https://unpkg.com/pixelarticons@1.8.1/svg/${iconName}.svg`}
      alt={name}
      className={className}
      style={{ 
        filter: color !== "currentColor" ? `invert(${color === "white" ? "100%" : "0%"})` : undefined,
        imageRendering: 'pixelated',
        objectFit: 'contain'
      }}
      onError={(e) => {
        console.error(`Failed to load pixelarticon: ${iconName}`);
        // Fallback to a default icon
        e.currentTarget.src = `https://unpkg.com/pixelarticons@1.8.1/svg/box.svg`;
      }}
    />
  );
};

export default PixelIcon;
