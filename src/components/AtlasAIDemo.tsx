import { useEffect, useState, useRef, useCallback } from "react";
import ChecklistPanel from "./atlas-ai/ChecklistPanel";
import AIGuidancePanel from "./atlas-ai/AIGuidancePanel";
import IntelligencePanel from "./atlas-ai/IntelligencePanel";

const AtlasAIDemo = () => {
  const [frame, setFrame] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const frameDurations = [2500, 3000, 3500, 3000, 3000];

  const advanceFrame = useCallback(() => {
    if (isPaused || prefersReducedMotion.current) return;
    setFrame((prev) => (prev + 1) % 5);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion.current) return;
    timerRef.current = setTimeout(advanceFrame, frameDurations[frame]);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [frame, isPaused, advanceFrame]);

  return (
    <div className="relative w-full" role="img" aria-label="Animated demonstration of YVOO Auditor Interface with AI-powered 3-panel layout">
      {/* Pause button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center text-xs bg-card/50 text-muted-foreground hover:bg-card/80 transition-colors"
        aria-label={isPaused ? "Play animation" : "Pause animation"}
      >
        {isPaused ? "▶" : "❚❚"}
      </button>

      {/* Main container */}
      <div
        className="w-full rounded-2xl overflow-hidden border border-border bg-card"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 md:px-5 py-2.5 bg-foreground/[0.03]" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--warning))" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "hsl(var(--accent))" }} />
            </div>
            <span className="text-xs font-semibold text-foreground">YVOO Auditor Interface</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground hidden md:inline">IATF 16949 Audit</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted">
              <span className="text-[10px] font-medium" style={{ color: "hsl(var(--accent))" }}>● Live</span>
            </div>
          </div>
        </div>

        {/* 3-Panel Layout */}
        <div className="flex h-[calc(100%-38px)]">
          {/* Left Panel - Checklist */}
          <div className="hidden md:block bg-card" style={{ width: "24%" }}>
            <ChecklistPanel frame={frame} />
          </div>

          {/* Middle Panel - AI Guidance */}
          <div className="flex-1 bg-card">
            <AIGuidancePanel frame={frame} />
          </div>

          {/* Right Panel - Intelligence */}
          <div className="hidden md:block bg-card" style={{ width: "26%" }}>
            <IntelligencePanel frame={frame} />
          </div>
        </div>
      </div>

      {/* Frame indicator */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {["Voice Input", "Analyzing", "AI Guidance", "Evidence", "Summary"].map((label, i) => (
          <button
            key={i}
            onClick={() => setFrame(i)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full transition-all text-[10px]"
            style={{
              backgroundColor: i === frame ? "hsl(var(--primary) / 0.1)" : "transparent",
              color: i === frame ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
              fontWeight: i === frame ? 600 : 400,
            }}
            aria-label={`Go to frame: ${label}`}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{
              backgroundColor: i === frame ? "hsl(var(--primary))" : "hsl(var(--border))",
            }} />
            <span className="hidden md:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AtlasAIDemo;
