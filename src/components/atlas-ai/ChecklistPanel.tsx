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
      <div className="px-3 py-2" style={{ borderBottom: "1px solid #374151" }}>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-xs">📋</span>
          <span className="text-[10px] font-semibold" style={{ color: "#FFFFFF" }}>Audit Checklist</span>
        </div>
        <div className="text-[9px] space-y-0.5" style={{ color: "#9CA3AF" }}>
          <div>Supplier: Precision Parts GmbH</div>
          <div>Standard: IATF 16949</div>
        </div>
        {/* Progress bar */}
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#374151" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#2563EB" }}
              animate={{ width: frame >= 4 ? "52%" : "45%" }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <span className="text-[9px] font-medium" style={{ color: "#9CA3AF" }}>
            {frame >= 4 ? "52%" : "45%"}
          </span>
        </div>
      </div>

      {/* Checklist items */}
      <div className="flex-1 overflow-hidden px-1 py-1">
        {checklistItems.map((item, i) => (
          <motion.div
            key={item.id}
            className="flex items-center gap-1 py-[3px] px-2 rounded text-[9px]"
            style={{
              paddingLeft: item.sub ? "16px" : "8px",
              backgroundColor: item.status === "current" ? "rgba(37, 99, 235, 0.15)" : "transparent",
              color: item.status === "done" ? "#6B7280" : item.status === "current" ? "#FFFFFF" : "#9CA3AF",
            }}
            animate={item.status === "current" && frame >= 0 ? {
              backgroundColor: ["rgba(37, 99, 235, 0.1)", "rgba(37, 99, 235, 0.2)", "rgba(37, 99, 235, 0.1)"],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-3 text-center">
              {item.status === "done" ? "✓" : item.status === "current" ? "→" : "○"}
            </span>
            <span className={item.section ? "font-semibold" : ""}>
              {item.id} {item.label}
            </span>
            {item.status === "current" && (
              <span className="ml-auto text-[8px] px-1 rounded" style={{ backgroundColor: "#DC2626", color: "#FFF" }}>
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
