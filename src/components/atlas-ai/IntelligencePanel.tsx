import { motion, AnimatePresence } from "framer-motion";

interface IntelligencePanelProps {
  frame: number;
}

const IntelligencePanel = ({ frame }: IntelligencePanelProps) => {
  const showFindings = frame >= 4;

  return (
    <div className="h-full flex flex-col text-left">
      {/* Header */}
      <div className="px-3 py-2" style={{ borderBottom: "1px solid #374151" }}>
        <div className="flex items-center gap-1">
          <span className="text-[9px]">🎯</span>
          <span className="text-[10px] font-semibold" style={{ color: "#FFFFFF" }}>INTELLIGENCE</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3 py-2">
        {/* Priority Pattern */}
        <div className="mb-2">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-[8px] px-1 rounded" style={{ backgroundColor: "#DC2626", color: "#FFF" }}>PRIORITY</span>
          </div>
          <div className="text-[8px]" style={{ color: "#9CA3AF" }}>
            <div className="mb-0.5" style={{ color: "#D1D5DB" }}>Pattern detected:</div>
            <div>Doc issues correlate:</div>
          </div>
        </div>

        {/* Correlation bars */}
        <div className="space-y-1.5 mb-3">
          {[
            { label: "Calibration", pct: 78, color: "#EF4444" },
            { label: "Training", pct: 62, color: "#F59E0B" },
          ].map((item, i) => (
            <motion.div key={item.label}>
              <div className="flex justify-between text-[8px] mb-0.5" style={{ color: "#9CA3AF" }}>
                <span>• {item.label}</span>
                <span>{item.pct}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#374151" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 1, delay: i * 0.3 + 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-[8px] mb-2" style={{ color: "#2563EB" }}>→ Check proactively</div>

        {/* Risk ranking */}
        <div className="space-y-0.5 mb-3">
          {[
            { n: 1, label: "Documentation", color: "#EF4444" },
            { n: 2, label: "Calibration", color: "#EF4444" },
          ].map((r) => (
            <div key={r.n} className="flex items-center gap-1 text-[8px]">
              <span style={{ color: r.color }}>●</span>
              <span style={{ color: "#D1D5DB" }}>{r.n}. {r.label}</span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="space-y-0.5 text-[8px]" style={{ color: "#6B7280" }}>
          <div>Overall: <span style={{ color: "#F59E0B" }}>45%</span></div>
          <div>Elapsed: 2h 15m</div>
        </div>

        {/* Findings */}
        <AnimatePresence>
          {showFindings && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 pt-2"
              style={{ borderTop: "1px solid #374151" }}
            >
              <div className="text-[9px] font-semibold mb-1" style={{ color: "#FFFFFF" }}>Findings:</div>
              {[
                { label: "Major NC: 1", color: "#EF4444" },
                { label: "Minor NC: 3", color: "#F59E0B" },
                { label: "Observations: 2", color: "#6B7280" },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-1 text-[8px]"
                >
                  <span style={{ color: f.color }}>•</span>
                  <span style={{ color: "#9CA3AF" }}>{f.label}</span>
                </motion.div>
              ))}
              <div className="mt-1 text-[8px]" style={{ color: "#10B981" }}>
                Likely: Approved with conditions
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntelligencePanel;
