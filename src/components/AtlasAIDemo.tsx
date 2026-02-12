import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CYCLE_DURATION = 15000;

// Typewriter hook
const useTypewriter = (text: string, active: boolean, speed = 40) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return displayed;
};

// Sound wave bars
const SoundWave = ({ active }: { active: boolean }) => (
  <div className="flex items-center gap-[3px] h-6">
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full"
        style={{ backgroundColor: "#2563EB" }}
        animate={active ? {
          height: [4, 12 + Math.random() * 12, 6, 18 + Math.random() * 6, 4],
        } : { height: 4 }}
        transition={{
          duration: 0.6,
          repeat: active ? Infinity : 0,
          delay: i * 0.08,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Processing dots
const ProcessingDots = () => (
  <div className="flex items-center gap-1.5">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: "#2563EB" }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
);

const AtlasAIDemo = () => {
  const [frame, setFrame] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const frameDurations = [3000, 3000, 5000, 2000, 2000]; // 15s total

  const advanceFrame = useCallback(() => {
    if (isPaused || prefersReducedMotion.current) return;
    setFrame((prev) => (prev + 1) % 5);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion.current) return;
    timerRef.current = setTimeout(advanceFrame, frameDurations[frame]);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [frame, isPaused, advanceFrame]);

  // AI response typewriter
  const aiLines = [
    "⚠️ AI Finding:",
    "Check pressure gauge",
    "on adjacent unit.",
    "",
    "Last inspection: 45 days ago",
    "Standard requires: 30 days",
    "Severity: MINOR",
  ];
  const fullAiText = aiLines.join("\n");
  const typedText = useTypewriter(fullAiText, frame === 2, 35);

  // Evidence states
  const showEvidence = frame >= 3;
  const showSuccess = frame >= 4;

  return (
    <div className="relative w-full" role="img" aria-label="Animated demonstration of Atlas AI voice-guided auditing">
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
        className="w-full rounded-2xl md:rounded-2xl rounded-xl overflow-hidden"
        style={{
          backgroundColor: "rgba(31, 41, 55, 0.85)",
          aspectRatio: "16/9",
          boxShadow: "0 25px 70px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3" style={{ backgroundColor: "#111827" }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#EF4444" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#10B981" }} />
            </div>
            <span className="text-sm font-semibold ml-3" style={{ color: "#FFFFFF" }}>Auditor View</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: "#374151" }}>
            <span className="text-xs" style={{ color: "#9CA3AF" }}>Atlas AI</span>
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#10B981" }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col md:flex-row h-[calc(100%-44px)]">
          {/* Left panel – Question area */}
          <div className="flex-1 p-4 md:p-8 flex flex-col justify-between">
            <div>
              {/* Question label */}
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>
                Section 3 — Fire Safety
              </span>
              <h3 className="mt-2 text-sm md:text-base font-semibold leading-snug" style={{ color: "#FFFFFF" }}>
                Is the fire suppression system compliant with local regulations?
              </h3>

              {/* Answer buttons */}
              <div className="flex gap-2 mt-4">
                {[
                  { label: "YES", bg: "#2563EB" },
                  { label: "NO", bg: "#EA580C" },
                  { label: "N/A", bg: "#374151" },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    className="px-4 py-1.5 rounded text-xs font-semibold"
                    style={{ backgroundColor: btn.bg, color: "#FFFFFF" }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Evidence section */}
            <AnimatePresence>
              {showEvidence && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>
                    Evidence Upload
                  </span>
                  <div className="flex items-center gap-3 mt-2">
                    <motion.div
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer"
                      style={{ backgroundColor: "#374151", color: "#FFFFFF", border: "1px solid #4B5563" }}
                      animate={!showSuccess ? { boxShadow: ["0 0 0px rgba(234,88,12,0)", "0 0 14px rgba(234,88,12,0.5)", "0 0 0px rgba(234,88,12,0)"] } : {}}
                      transition={{ duration: 1.5, repeat: showSuccess ? 0 : Infinity }}
                    >
                      📷 Take Photo
                    </motion.div>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "#374151" }}
                      >
                        <span style={{ color: "#6B7280" }}>🖼</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Success state */}
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 space-y-1"
                    >
                      {["Evidence captured", "Minor NC created", "Linked to standard requirement"].map((t, i) => (
                        <motion.div
                          key={t}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.25 }}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span style={{ color: "#10B981" }}>✓</span>
                          <span style={{ color: "#9CA3AF" }}>{t}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right panel – Atlas Copilot */}
          <div
            className="w-full md:w-[280px] lg:w-[320px] p-4 md:p-5 flex flex-col"
            style={{ backgroundColor: "#111827", borderLeft: "3px solid #EA580C" }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid #374151" }}>
              <motion.span
                className="text-lg"
                animate={frame === 0 ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1.2, repeat: frame === 0 ? Infinity : 0 }}
              >
                🎤
              </motion.span>
              <span className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>Copilot</span>
            </div>

            {/* Frame 0: Listening */}
            {frame === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center flex-1 gap-3">
                <SoundWave active />
                <motion.span
                  className="text-xs font-medium"
                  style={{ color: "#2563EB" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Listening...
                </motion.span>
              </motion.div>
            )}

            {/* Frame 1: Processing */}
            {frame === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center flex-1 gap-3">
                <ProcessingDots />
                <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>Analyzing...</span>
              </motion.div>
            )}

            {/* Frame 2+: AI Response */}
            {frame >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 rounded-lg p-3"
                style={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  boxShadow: frame === 2 ? "0 0 16px rgba(234,88,12,0.25)" : "none",
                }}
              >
                <pre
                  className="text-xs leading-relaxed whitespace-pre-wrap font-sans"
                  style={{ color: "#E5E7EB" }}
                >
                  {frame === 2 ? typedText : fullAiText}
                </pre>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtlasAIDemo;
