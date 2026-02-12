import { motion } from "framer-motion";

interface ChecklistPanelProps {
  frame: number;
}

const checklistItems = [
  { id: "4.1", label: "General Req.", status: "done" },
  { id: "4.1.1", label: "Process", status: "done", sub: true },
  { id: "4.2", label: "Documentation", status: "active", section: true },
  { id: "4.2.1", label: "General", status: "done", sub: true },
  { id: "4.2.2", label: "Manual", status: "done", sub: true },
  { id: "4.2.3", label: "Control", status: "current", sub: true },
  { id: "4.2.4", label: "Records", status: "pending", sub: true },
  { id: "5.1", label: "Commitment", status: "pending" },
];

const ChecklistPanel = ({ frame }: ChecklistPanelProps) => {
  return (
    <div className="h-full flex flex-col text-left" style={{ minWidth: 0 }}>
      {/* Header */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm">📋</span>
          <span className="text-xs font-semibold text-foreground">Audit Checklist</span>
        </div>
        <div className="text-[10px] md:text-xs space-y-0.5 text-muted-foreground">
          <div>Supplier: <span className="text-foreground/90 font-medium">Precision Parts GmbH</span></div>
          <div>Standard: <span className="text-foreground/90 font-medium">IATF 16949</span></div>
        </div>
        {/* Progress bar */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "hsl(var(--muted))" }}>
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: frame >= 4 ? "52%" : "45%" }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <span className="text-[10px] md:text-xs font-semibold text-primary">
            {frame >= 4 ? "52%" : "45%"}
          </span>
        </div>
      </div>

      {/* Checklist items */}
      <div className="flex-1 overflow-hidden px-2 py-2">
        {checklistItems.map((item) => (
          <motion.div
            key={item.id}
            className="flex items-center gap-1.5 py-1 px-2 rounded text-[10px] md:text-xs"
            style={{
              paddingLeft: item.sub ? "20px" : "8px",
              backgroundColor: item.status === "current" ? "hsl(var(--primary) / 0.1)" : "transparent",
              color: item.status === "done"
                ? "hsl(var(--muted-foreground))"
                : item.status === "current"
                  ? "hsl(var(--foreground))"
                  : "hsl(var(--muted-foreground) / 0.7)",
            }}
            animate={item.status === "current" && frame >= 0 ? {
              backgroundColor: ["hsl(var(--primary) / 0.05)", "hsl(var(--primary) / 0.15)", "hsl(var(--primary) / 0.05)"],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-4 text-center">
              {item.status === "done" ? (
                <span style={{ color: "hsl(var(--accent))" }}>✓</span>
              ) : item.status === "current" ? (
                <span className="text-primary">→</span>
              ) : "○"}
            </span>
            <span className={item.section ? "font-semibold" : ""}>
              {item.id} {item.label}
            </span>
            {item.status === "current" && (
              <span className="ml-auto text-[9px] md:text-[10px] px-1.5 py-0.5 rounded font-semibold bg-destructive text-destructive-foreground">
                HIGH
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistPanel;
