import { motion, AnimatePresence } from "framer-motion";

interface IntelligencePanelProps {
  frame: number;
}

const IntelligencePanel = ({ frame }: IntelligencePanelProps) => {
  const showFindings = frame >= 4;

  return (
    <div className="h-full flex flex-col text-left">
      {/* Header */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🎯</span>
          <span className="text-xs font-semibold text-foreground">INTELLIGENCE</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 py-3">
        {/* Priority Pattern */}
        <div className="mb-3">
          <div className="mb-1.5">
            <span className="text-[10px] md:text-[11px] px-2 py-0.5 rounded font-semibold bg-destructive text-destructive-foreground">
              PRIORITY
            </span>
          </div>
          <div className="text-[10px] md:text-xs text-muted-foreground">
            <div className="mb-0.5 text-foreground/90 font-medium">Pattern detected:</div>
            <div>Doc issues correlate with:</div>
          </div>
        </div>

        {/* Correlation bars */}
        <div className="space-y-2 mb-4">
          {[
            { label: "Calibration", pct: 78, color: "hsl(var(--destructive))" },
            { label: "Training", pct: 62, color: "hsl(var(--warning))" },
          ].map((item, i) => (
            <div key={item.label}>
              <div className="flex justify-between text-[10px] md:text-xs mb-1 text-muted-foreground">
                <span>• {item.label}</span>
                <span className="font-semibold" style={{ color: item.color }}>{item.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "hsl(var(--muted))" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 1, delay: i * 0.3 + 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-[10px] md:text-xs mb-3 text-primary font-medium">→ Check proactively</div>

        {/* Risk ranking */}
        <div className="space-y-1 mb-3">
          {[
            { n: 1, label: "Documentation", color: "hsl(var(--destructive))" },
            { n: 2, label: "Calibration", color: "hsl(var(--destructive))" },
          ].map((r) => (
            <div key={r.n} className="flex items-center gap-1.5 text-[10px] md:text-xs">
              <span style={{ color: r.color }}>●</span>
              <span className="text-foreground/80">{r.n}. {r.label}</span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="space-y-1 text-[10px] md:text-xs text-muted-foreground">
          <div>Overall: <span style={{ color: "hsl(var(--warning))" }} className="font-semibold">45%</span></div>
          <div>Elapsed: 2h 15m</div>
        </div>

        {/* Findings */}
        <AnimatePresence>
          {showFindings && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-3"
              style={{ borderTop: "1px solid hsl(var(--border))" }}
            >
              <div className="text-xs font-semibold mb-1.5 text-foreground">Findings:</div>
              {[
                { label: "Major NC: 1", color: "hsl(var(--destructive))" },
                { label: "Minor NC: 3", color: "hsl(var(--warning))" },
                { label: "Observations: 2", color: "hsl(var(--muted-foreground))" },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-1.5 text-[10px] md:text-xs"
                >
                  <span style={{ color: f.color }}>•</span>
                  <span className="text-muted-foreground">{f.label}</span>
                </motion.div>
              ))}
              <div className="mt-1.5 text-[10px] md:text-xs font-medium" style={{ color: "hsl(var(--accent))" }}>
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
