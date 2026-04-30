import { ReactNode, useLayoutEffect, useRef, useState } from "react";

interface ResponsiveDemoFrameProps {
  children: ReactNode;
  /** Logical (desktop) width the demo was designed at. Default 1280 */
  designWidth?: number;
  /** Logical (desktop) height the demo was designed at. Default 800.
   *  Required for demos using absolute positioning (most dashboards). */
  designHeight?: number;
  /** Optional override for tablet (768–1023px). Defaults to designWidth */
  tabletDesignWidth?: number;
  /** Disable touch interactions on scaled versions (recommended). Default true */
  disableInteraction?: boolean;
  className?: string;
  /** @deprecated kept for backward compatibility — no longer used. */
  mobileScale?: number;
  /** @deprecated kept for backward compatibility — no longer used. */
  tabletScale?: number;
  /** @deprecated kept for backward compatibility — no longer used. */
  minHeight?: number;
}

/**
 * Renders children inside a fixed designWidth × designHeight box,
 * then CSS-scales the whole box to fit the available viewport width.
 *
 * Using an explicit designHeight is the only reliable way to size
 * demos that contain absolutely-positioned children (which never
 * contribute to a parent's measured height).
 */
const ScaledBox = ({
  designWidth,
  designHeight,
  disableInteraction,
  children,
}: {
  designWidth: number;
  designHeight: number;
  disableInteraction: boolean;
  children: ReactNode;
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!outerRef.current) return;
    const outer = outerRef.current;
    const update = () => {
      const w = outer.clientWidth;
      if (w > 0) setScale(Math.min(1, w / designWidth));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    return () => ro.disconnect();
  }, [designWidth]);

  const interactionClass = disableInteraction ? "pointer-events-none select-none" : "";

  return (
    <div
      ref={outerRef}
      className="overflow-hidden w-full"
      style={{ height: `${designHeight * scale}px` }}
    >
      <div
        className={interactionClass}
        style={{
          width: `${designWidth}px`,
          height: `${designHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Responsive wrapper for dense desktop demo components.
 *
 * Mobile  (<768px):     Rendered at designWidth × designHeight, CSS-scaled
 * Tablet  (768–1023px): Same, optionally overridden via tabletDesignWidth
 * Desktop (≥1024px):    Untouched, exactly as designed
 */
export const ResponsiveDemoFrame = ({
  children,
  designWidth = 1280,
  designHeight = 800,
  tabletDesignWidth,
  disableInteraction = true,
  className = "",
}: ResponsiveDemoFrameProps) => {
  const tabletWidth = tabletDesignWidth ?? designWidth;
  return (
    <div className={className}>
      <div className="md:hidden">
        <ScaledBox
          designWidth={designWidth}
          designHeight={designHeight}
          disableInteraction={disableInteraction}
        >
          {children}
        </ScaledBox>
      </div>
      <div className="hidden md:block lg:hidden">
        <ScaledBox
          designWidth={tabletWidth}
          designHeight={designHeight}
          disableInteraction={disableInteraction}
        >
          {children}
        </ScaledBox>
      </div>
      <div className="hidden h-full lg:block">{children}</div>
    </div>
  );
};

export default ResponsiveDemoFrame;
