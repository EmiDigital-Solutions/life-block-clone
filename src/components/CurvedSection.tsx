import React from "react";
import { cn } from "@/lib/utils";

interface CurvedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "gradient-teal" | "gradient-blue";
  curvePosition?: "bottom" | "top" | "both" | "none";
  curveIntensity?: "subtle" | "medium" | "large";
}

export const CurvedSection: React.FC<CurvedSectionProps> = ({
  children,
  className,
  variant = "light",
  curvePosition = "bottom",
  curveIntensity = "large",
}) => {
  const variants = {
    light: "bg-background",
    dark: "bg-[hsl(220,30%,15%)]",
    "gradient-teal": "bg-gradient-to-br from-[hsl(173,80%,40%)] to-[hsl(173,70%,50%)]",
    "gradient-blue": "bg-gradient-to-br from-[hsl(217,91%,60%)] to-[hsl(217,80%,70%)]",
  };

  const curveHeights = {
    subtle: "60px",
    medium: "100px",
    large: "150px",
  };

  const curveHeight = curveHeights[curveIntensity];

  return (
    <div className={cn("relative", className)}>
      {/* Top Curve */}
      {(curvePosition === "top" || curvePosition === "both") && (
        <div 
          className="absolute top-0 left-0 right-0 w-full overflow-hidden pointer-events-none"
          style={{ height: curveHeight, transform: "translateY(-99%)" }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full"
            style={{ height: curveHeight }}
          >
            <path
              d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
              className={cn(variants[variant])}
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className={cn("relative", variants[variant])}>
        {children}
      </div>

      {/* Bottom Curve */}
      {(curvePosition === "bottom" || curvePosition === "both") && (
        <div 
          className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none"
          style={{ height: curveHeight, transform: "translateY(99%)" }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute top-0 w-full"
            style={{ height: curveHeight }}
          >
            <path
              d="M0,120 C300,20 900,20 1200,120 L1200,0 L0,0 Z"
              className={cn(variants[variant])}
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
