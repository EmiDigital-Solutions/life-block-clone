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
BMW Tier-2 has rejected 2 previous suppliers for document control gaps.
Based on 47 similar audits, issues appear in 73% of cases.`;

const AIGuidancePanel = ({ frame }: AIGuidancePanelProps) => {
  const typedContext = useTypewriter(aiContextText, frame >= 1, 25);
  const showPhoto = frame >= 3;
  const showTips = frame >= 2;

  return (
    <div className="h-full flex flex-col text-left" style={{ borderLeft: "1px solid #374151", borderRight: "1px solid #374151" }}>
      {/* Question header */}
      <div className="px-3 py-2" style={{ borderBottom: "1px solid #374151" }}>
        <div className="text-[10px] font-bold" style={{ color: "#FFFFFF" }}>
          4.2.3 Control of Documents
        </div>
        <div className="text-[8px] mt-0.5" style={{ color: "#6B7280" }}>
          IATF 16949:2016 Clause 4.2.3 • ISO 9001:2015 7.5.3
        </div>
      </div>

      {/* AI Context */}
      <div className="px-3 py-2 flex-1 overflow-hidden">
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-[9px]">🤖</span>
          <span className="text-[9px] font-semibold" style={{ color: "#2563EB" }}>AI CONTEXT</span>
        </div>
        <pre className="text-[8px] leading-relaxed whitespace-pre-wrap font-sans" style={{ color: "#D1D5DB" }}>
          {frame >= 1 ? typedContext : ""}
        </pre>

        {/* Client Focus */}
        <AnimatePresence>
          {frame >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[9px]">📊</span>
                <span className="text-[9px] font-semibold" style={{ color: "#F59E0B" }}>CLIENT FOCUS</span>
              </div>
              <div className="text-[8px] space-y-0.5" style={{ color: "#9CA3AF" }}>
                <div>BMW Priorities:</div>
                <div className="flex items-center gap-1">
                  <span style={{ color: "#EF4444" }}>●</span> 2.67% rejection rate
                </div>
                <div className="flex items-center gap-1">
                  <span style={{ color: "#F59E0B" }}>●</span> Process Cap. Required
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Photo Evidence */}
        <AnimatePresence>
          {showPhoto && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[9px]">📸</span>
                <span className="text-[9px] font-semibold" style={{ color: "#FFFFFF" }}>PHOTO</span>
                <span className="text-[8px]" style={{ color: "#6B7280" }}>2 min ago</span>
              </div>
              <div className="flex gap-1">
                <motion.div
                  className="w-10 h-8 rounded flex items-center justify-center text-[8px]"
                  style={{ backgroundColor: "#374151", border: "1px solid #4B5563" }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  🖼
                </motion.div>
                <div className="text-[8px] space-y-0.5" style={{ color: "#9CA3AF" }}>
                  <div style={{ color: "#10B981" }}>✓ Procedure posted</div>
                  <div style={{ color: "#EA580C" }}>→ Date not visible</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Tips */}
        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-2"
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[9px]">💡</span>
                <span className="text-[9px] font-semibold" style={{ color: "#FFFFFF" }}>AI TIPS</span>
              </div>
              <div className="text-[8px] space-y-0.5" style={{ color: "#9CA3AF" }}>
                <div>1. Check calibration — 78% correlation</div>
                <div>2. Verify training — 62% correlation</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom benchmark */}
      <div className="px-3 py-1.5" style={{ borderTop: "1px solid #374151" }}>
        <div className="flex items-center justify-between text-[8px]" style={{ color: "#6B7280" }}>
          <span>📊 BENCHMARK</span>
          <span>This: ~7.2 / Industry: 8.1</span>
        </div>
      </div>
    </div>
  );
};

export default AIGuidancePanel;
