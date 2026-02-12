import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AIGuidancePanelProps {
  frame: number;
}

const useTypewriter = (text: string, active: boolean, speed = 30) => {
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

const aiContextText = `HIGH PRIORITY for this client
BMW Tier-2 rejected 2 suppliers for document control gaps.
Based on 47 similar audits, issues appear in 73% of cases.`;

// Sound wave bars for voice
const SoundWave = ({ active }: { active: boolean }) => (
  <div className="flex items-center gap-[2px] h-5">
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        className="w-[2px] rounded-full bg-primary"
        animate={active ? {
          height: [3, 10 + Math.random() * 8, 4, 14 + Math.random() * 4, 3],
        } : { height: 3 }}
        transition={{ duration: 0.6, repeat: active ? Infinity : 0, delay: i * 0.08, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const AIGuidancePanel = ({ frame }: AIGuidancePanelProps) => {
  const typedContext = useTypewriter(aiContextText, frame >= 2, 25);
  const showPhoto = frame >= 3;
  const showTips = frame >= 3;

  return (
    <div className="h-full flex flex-col text-left" style={{ borderLeft: "1px solid hsl(var(--border))", borderRight: "1px solid hsl(var(--border))" }}>
      {/* Question header */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="text-xs md:text-sm font-bold text-foreground">
          4.2.3 Control of Documents
        </div>
        <div className="text-[10px] md:text-xs mt-1 text-muted-foreground">
          IATF 16949:2016 Clause 4.2.3 • ISO 9001:2015 7.5.3
        </div>
      </div>

      {/* Voice guidance section */}
      <div className="px-4 py-2" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <AnimatePresence mode="wait">
          {frame === 0 && (
            <motion.div key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-3">
              <motion.span className="text-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                🎤
              </motion.span>
              <SoundWave active />
              <motion.span className="text-xs font-medium text-primary"
                animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                Listening...
              </motion.span>
            </motion.div>
          )}
          {frame === 1 && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-3">
              <span className="text-lg">🤖</span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} className="w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </div>
              <span className="text-xs font-medium text-muted-foreground">Analyzing 47 similar audits...</span>
            </motion.div>
          )}
          {frame >= 2 && (
            <motion.div key="speaking" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-3">
              <motion.span className="text-lg" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                🔊
              </motion.span>
              <SoundWave active={frame === 2} />
              <span className="text-xs font-medium" style={{ color: "hsl(var(--accent))" }}>
                {frame === 2 ? "Speaking guidance..." : "Guidance complete"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Context */}
      <div className="px-4 py-3 flex-1 overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-xs">🤖</span>
          <span className="text-[11px] md:text-xs font-semibold text-primary">AI CONTEXT</span>
        </div>
        <pre className="text-[10px] md:text-xs leading-relaxed whitespace-pre-wrap font-sans text-foreground/80">
          {frame >= 2 ? typedContext : ""}
        </pre>

        {/* Client Focus */}
        <AnimatePresence>
          {frame >= 2 && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs">📊</span>
                <span className="text-[11px] md:text-xs font-semibold" style={{ color: "hsl(var(--warning))" }}>CLIENT FOCUS</span>
              </div>
              <div className="text-[10px] md:text-xs space-y-1 text-muted-foreground">
                <div className="font-medium text-foreground/90">BMW Priorities:</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-destructive">●</span> 2.67% rejection rate
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ color: "hsl(var(--warning))" }}>●</span> Process Capability Required
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photo Evidence */}
        <AnimatePresence>
          {showPhoto && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs">📸</span>
                <span className="text-[11px] md:text-xs font-semibold text-foreground">PHOTO</span>
                <span className="text-[10px] text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex gap-2">
                <motion.div className="w-12 h-10 rounded flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--muted))", border: "1px solid hsl(var(--border))" }}
                  initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                  🖼
                </motion.div>
                <div className="text-[10px] md:text-xs space-y-0.5">
                  <div style={{ color: "hsl(var(--accent))" }}>✓ Procedure posted</div>
                  <div className="text-primary">→ Date not visible</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Tips */}
        <AnimatePresence>
          {showTips && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs">💡</span>
                <span className="text-[11px] md:text-xs font-semibold text-foreground">AI TIPS</span>
              </div>
              <div className="text-[10px] md:text-xs space-y-1 text-muted-foreground">
                <div>1. Check calibration — <span className="text-destructive font-medium">78%</span> correlation</div>
                <div>2. Verify training — <span style={{ color: "hsl(var(--warning))" }} className="font-medium">62%</span> correlation</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom benchmark */}
      <div className="px-4 py-2" style={{ borderTop: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground">
          <span>📊 BENCHMARK</span>
          <span>This: <span className="text-primary font-medium">~7.2</span> / Industry: 8.1</span>
        </div>
      </div>
    </div>
  );
};

export default AIGuidancePanel;
