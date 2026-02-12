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

  // 5 frames, 15s total
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
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center text-xs"
        style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#9CA3AF" }}
        aria-label={isPaused ? "Play animation" : "Pause animation"}
      >
        {isPaused ? "▶" : "❚❚"}
      </button>

      {/* Main container */}
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#111827",
          aspectRatio: "16/9",
          boxShadow: "0 25px 70px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-3 md:px-5 py-2" style={{ backgroundColor: "#0D1117", borderBottom: "1px solid #1F2937" }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EF4444" }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10B981" }} />
            </div>
            <span className="text-[10px] font-semibold ml-2" style={{ color: "#FFFFFF" }}>YVOO Auditor Interface</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px]" style={{ color: "#6B7280" }}>IATF 16949 Audit</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: "#1F2937" }}>
              <span className="text-[9px]" style={{ color: "#10B981" }}>● Live</span>
            </div>
          </div>
        </div>

        {/* 3-Panel Layout */}
        <div className="flex h-[calc(100%-32px)]">
          {/* Left Panel - Checklist */}
          <div className="hidden md:block" style={{ width: "22%", backgroundColor: "#111827" }}>
            <ChecklistPanel frame={frame} />
          </div>

          {/* Middle Panel - AI Guidance */}
          <div style={{ flex: 1, backgroundColor: "#1A1F2E" }}>
            <AIGuidancePanel frame={frame} />
          </div>

          {/* Right Panel - Intelligence */}
          <div className="hidden md:block" style={{ width: "25%", backgroundColor: "#111827" }}>
            <IntelligencePanel frame={frame} />
          </div>
        </div>
      </div>

      {/* Frame indicator */}
      <div className="flex justify-center gap-1.5 mt-3">
        {frameDurations.map((_, i) => (
          <button
            key={i}
            onClick={() => setFrame(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: i === frame ? "#2563EB" : "#374151",
              transform: i === frame ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`Go to frame ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AtlasAIDemo;
