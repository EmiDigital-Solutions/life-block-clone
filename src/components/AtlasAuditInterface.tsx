import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ChevronRight, Check, Circle, AlertTriangle,
  Camera, Upload, Mic, Send, Image, Keyboard,
  Volume2
} from "lucide-react";

/* ── Types ── */
interface ChecklistItem {
  id: string;
  label: string;
  status: "done" | "active" | "pending";
  risk?: "HIGH" | "MEDIUM";
  children?: ChecklistItem[];
}

interface EvidenceFile {
  name: string;
  verified: boolean;
}

/* ── Checklist Data ── */
const checklist: ChecklistItem[] = [
  {
    id: "5",
    label: "5. CRYOGENIC TESTING",
    status: "active",
    children: [
      { id: "5.1", label: "5.1 Test Field Layout & Safety", status: "done" },
      {
        id: "5.2",
        label: "5.2 LN₂ Performance Testing",
        status: "active",
        children: [
          { id: "5.2.1", label: "5.2.1 Boil-off Rate Measurement", status: "done" },
          { id: "5.2.2", label: "5.2.2 Vacuum Insulation Check", status: "done" },
          { id: "5.2.3", label: "5.2.3 Thermal Cycling Results", status: "active", risk: "HIGH" },
          { id: "5.2.4", label: "5.2.4 Sensor Calibration", status: "pending" },
        ],
      },
    ],
  },
  {
    id: "6",
    label: "6. MATERIAL CERTIFICATION",
    status: "pending",
  },
];

const evidenceFiles: EvidenceFile[] = [
  { name: "test_field_overview.jpg", verified: true },
  { name: "boiloff_rate_report.pdf", verified: true },
  { name: "vacuum_gauge_reading...", verified: true },
  { name: "thermal_cycle_log.pdf", verified: true },
  { name: "sensor_calibration_cert....", verified: true },
];

const flaggedIssues = [
  { num: 1, label: "Boil-off Compliance", color: "text-red-400" },
  { num: 2, label: "Vacuum Integrity", color: "text-orange-400" },
  { num: 3, label: "Sensor Accuracy", color: "text-yellow-400" },
];

/* ── Sub-components ── */

const StatusIcon = ({ status, risk }: { status: string; risk?: string }) => {
  if (status === "done")
    return (
      <div className="w-5 h-5 rounded-sm bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3 text-emerald-400" />
      </div>
    );
  if (status === "active")
    return (
      <div className={`w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 ${risk === "HIGH" ? "bg-red-500/20" : "bg-primary/20"}`}>
        <Circle className={`w-3 h-3 ${risk === "HIGH" ? "text-red-400 fill-red-400" : "text-primary fill-primary"}`} />
      </div>
    );
  return <div className="w-5 h-5 rounded-sm border border-white/10 flex-shrink-0" />;
};

const ChecklistNode = ({
  item,
  depth = 0,
  activeId,
  onSelect,
}: {
  item: ChecklistItem;
  depth?: number;
  activeId: string;
  onSelect: (id: string) => void;
}) => {
  const [open, setOpen] = useState(item.status !== "pending");
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeId === item.id;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) setOpen(!open);
          onSelect(item.id);
        }}
        className={`w-full flex items-center gap-2 py-2 px-2 text-left transition-colors rounded-sm ${
          isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
          )
        ) : (
          <span className="w-3.5 flex-shrink-0" />
        )}
        <StatusIcon status={item.status} risk={item.risk} />
        <span className={`text-[13px] leading-snug ${isActive ? "text-white font-semibold" : item.status === "pending" ? "text-white/30" : "text-white/70"}`}>
          {item.label}
        </span>
      </button>
      {item.risk === "HIGH" && (
        <div className="ml-[52px]" style={{ marginLeft: `${depth * 16 + 52}px` }}>
          <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-red-500/20 text-red-400 px-2 py-0.5 rounded-sm">
            HIGH RISK
          </span>
        </div>
      )}
      {hasChildren && open && (
        <div>
          {item.children!.map((child) => (
            <ChecklistNode key={child.id} item={child} depth={depth + 1} activeId={activeId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

const ScoreButton = ({
  value,
  selected,
  onClick,
  variant = "default",
}: {
  value: number;
  selected: boolean;
  onClick: () => void;
  variant?: "default" | "ai";
}) => (
  <button
    onClick={onClick}
    className={`w-12 h-10 text-sm font-semibold transition-all rounded-sm ${
      selected
        ? variant === "ai"
          ? "bg-primary text-white shadow-lg shadow-primary/30"
          : "bg-white text-[hsl(210,20%,12%)] shadow-lg"
        : "bg-white/[0.06] text-white/40 hover:bg-white/[0.1] hover:text-white/70 border border-white/[0.06]"
    }`}
  >
    {value}
  </button>
);

/* ── Main Component ── */
const AtlasAuditInterface = () => {
  const [activeCheckpoint, setActiveCheckpoint] = useState("5.2.3");
  const [aiScore] = useState(3);
  const [auditorScore, setAuditorScore] = useState(2);
  const [findingsNote, setFindingsNote] = useState(
    "Boil-off at 0.18%/day confirmed on-site. Vacuum jacket shows pressure rise. Recommend re-evacuation before acceptance..."
  );
  const scoreDelta = auditorScore - aiScore;

  return (
    <div className="w-full bg-[hsl(210,20%,12%)] rounded-lg overflow-hidden border border-white/[0.06] shadow-2xl">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[hsl(210,22%,10%)]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[13px] text-white/50 font-medium tracking-wide uppercase">Live Audit</span>
        </div>
        <div className="text-[13px] text-white/80 font-medium tracking-wide">
          Atlas AI · Cryogenic Test Field Audit
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-white/50">Progress 45%</span>
          <div className="w-24 h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full w-[45%] bg-primary rounded-full" />
          </div>
        </div>
      </div>

      {/* ── 3 columns ── */}
      <div className="flex min-h-[620px]">
        {/* ═══ LEFT COLUMN: Checklist + Evidence ═══ */}
        <div className="w-[280px] flex-shrink-0 border-r border-white/[0.06] flex flex-col bg-[hsl(210,22%,10%)]">
          {/* Checklist header */}
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-xs font-bold text-white/90 tracking-wider uppercase">Checklist</h3>
            <p className="text-[11px] text-white/30 mt-0.5">Cryogenic Test Field · LNG Storage</p>
          </div>

          {/* Checklist tree */}
          <div className="flex-1 overflow-y-auto px-1 pb-2 scrollbar-thin">
            {checklist.map((item) => (
              <ChecklistNode key={item.id} item={item} activeId={activeCheckpoint} onSelect={setActiveCheckpoint} />
            ))}
          </div>

          {/* Evidence */}
          <div className="border-t border-white/[0.06] px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white/80 tracking-wider uppercase">Evidence</span>
              <span className="text-xs text-primary font-semibold">5 / 5 ✓</span>
            </div>
            <div className="space-y-1.5">
              {evidenceFiles.map((f) => (
                <div key={f.name} className="flex items-center gap-2 py-1.5 px-2 bg-white/[0.03] rounded-sm">
                  <Image className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                  <span className="text-[11px] text-white/50 truncate flex-1">{f.name}</span>
                  {f.verified && (
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 flex-shrink-0">
                      <Check className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-white/10 rounded-sm text-white/40 hover:text-white/70 hover:border-white/20 transition-colors text-[11px]">
                <Camera className="w-3.5 h-3.5" />
                Capture
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-white/10 rounded-sm text-white/40 hover:text-white/70 hover:border-white/20 transition-colors text-[11px]">
                <Upload className="w-3.5 h-3.5" />
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* ═══ CENTER COLUMN: Question + Scoring ═══ */}
        <div className="flex-1 flex flex-col">
          {/* Question area */}
          <div className="flex-1 px-6 py-5 overflow-y-auto">
            {/* Top toolbar */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-bold text-white/40 tracking-wider uppercase">Question</span>
              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-white/[0.04] text-white/30 hover:text-white/60 transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-white/[0.04] text-white/30 hover:text-white/60 transition-colors">
                  <Keyboard className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-white/[0.04] text-white/30 hover:text-white/60 transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question text */}
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug mb-10 max-w-xl">
              Does the cryogenic test field demonstrate compliant boil-off rates and vacuum integrity per EN 13458?
            </h2>

            {/* AI Suggestion */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[11px] font-bold text-white/50 tracking-wider uppercase">Atlas AI Suggests</span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <ScoreButton key={v} value={v} selected={v === aiScore} onClick={() => {}} variant="ai" />
                ))}
              </div>
              <p className="text-[12px] text-white/30 mt-2">
                Level 3 — Test field operational but boil-off exceeds specification limits
              </p>
            </div>

            {/* Auditor Assessment */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[12px] font-bold text-white/80 tracking-wide uppercase">Your Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <ScoreButton key={v} value={v} selected={v === auditorScore} onClick={() => setAuditorScore(v)} />
                ))}
                {scoreDelta !== 0 && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`ml-2 text-xs font-bold px-2 py-1 rounded-sm ${
                      scoreDelta < 0 ? "bg-red-500/15 text-red-400" : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    Override {scoreDelta > 0 ? "+" : ""}
                    {scoreDelta}
                  </motion.span>
                )}
              </div>
            </div>

            {/* Findings note */}
            <div className="mb-6">
              <textarea
                value={findingsNote}
                onChange={(e) => setFindingsNote(e.target.value)}
                rows={3}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-sm px-4 py-3 text-[13px] text-white/50 placeholder:text-white/20 resize-none focus:outline-none focus:border-primary/40 transition-colors"
                placeholder="Add your findings or observations..."
              />
            </div>

            {/* Submit button — full width, visually dominant */}
            <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-base tracking-wide rounded-sm transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
              Submit & Next →
            </button>
          </div>

          {/* Bottom input bar with mic */}
          <div className="border-t border-white/[0.06] px-4 py-3 flex items-center gap-3 bg-[hsl(210,22%,10%)]">
            <button className="w-9 h-9 flex items-center justify-center rounded-sm bg-white/[0.04] text-white/30 hover:text-white/60 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Ask Atlas AI or add findings..."
              className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-sm px-4 py-2.5 text-[13px] text-white/60 placeholder:text-white/20 focus:outline-none focus:border-primary/30 transition-colors"
            />
            <button className="w-9 h-9 flex items-center justify-center rounded-sm bg-primary text-white hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ═══ RIGHT COLUMN: Atlas Copilot ═══ */}
        <div className="w-[260px] flex-shrink-0 border-l border-white/[0.06] flex flex-col bg-[hsl(210,22%,10%)]">
          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-bold text-white/90 tracking-wide">Atlas Copilot</h3>
          </div>

          {/* Flagged Issues (moved to top from mic area) */}
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <div className="space-y-2">
              {flaggedIssues.map((issue) => (
                <div key={issue.num} className="flex items-center gap-2.5">
                  <span className={`w-5 h-5 flex items-center justify-center text-[11px] font-bold rounded-sm bg-white/[0.06] ${issue.color}`}>
                    {issue.num}
                  </span>
                  <span className="text-[13px] text-white/60">{issue.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmark */}
          <div className="px-4 py-4 border-b border-white/[0.06]">
            <h4 className="text-[11px] font-bold text-white/50 tracking-wider uppercase mb-3">Benchmark</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-white/50">This supplier</span>
                  <span className="text-[13px] font-bold text-white/80">5.8/10</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full w-[58%] bg-primary rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] text-white/50">Industry avg</span>
                  <span className="text-[13px] font-bold text-white/80">7.2/10</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-white/20 rounded-full" />
                </div>
              </div>
              <p className="text-[10px] text-white/25 mt-1">Based on 47 suppliers · Q1 2025</p>
              <p className="text-[11px] font-semibold text-red-400 mt-1">Hold — corrective action required</p>
            </div>
          </div>

          {/* AI Finding */}
          <div className="px-4 py-4 flex-1">
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-sm p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[13px] font-bold text-white/80">AI Finding</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-[12px] text-white/40 leading-relaxed">
                Vacuum jacket pressure 8.5 mbar — exceeds 5 mbar acceptance limit. Boil-off rate 0.18%/day vs. 0.12% spec. Recommend full re-evacuation and helium leak test before client witness.
              </p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 text-[12px] font-semibold text-primary border border-primary/30 rounded-sm hover:bg-primary/10 transition-colors">
                  ACCEPT
                </button>
                <button className="flex-1 py-2 text-[12px] font-semibold text-white/40 border border-white/10 rounded-sm hover:text-white/60 hover:border-white/20 transition-colors">
                  DISMISS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtlasAuditInterface;
