import { useState } from "react";
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  FileText,
  FileImage,
  Upload,
  Camera,
  Send,
  Mic,
  Volume2,
  MonitorSmartphone,
  Image,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ─── Types ─── */
interface CheckItem {
  id: string;
  label: string;
  status: "pass" | "fail" | "pending" | "high_risk";
  children?: CheckItem[];
}

interface EvidenceFile {
  name: string;
  type: "pdf" | "image";
  verified: boolean;
}

/* ─── Data ─── */
const checklist: CheckItem[] = [
  {
    id: "4",
    label: "4. INJECTION MOLDING PROCESS",
    status: "pending",
    children: [
      { id: "4.1", label: "4.1 Machine Park & Clamping Force", status: "pass" },
      {
        id: "4.2",
        label: "4.2 Dashboard Air Vent Production",
        status: "pending",
        children: [
          { id: "4.2.1", label: "4.2.1 Mold Condition & Maintenance Log", status: "pending" },
          { id: "4.2.2", label: "4.2.2 Cavity Pressure Monitoring", status: "pass" },
          { id: "4.2.3", label: "4.2.3 Dimensional Stability (Cpk)", status: "high_risk" },
        ],
      },
    ],
  },
];

const evidenceFiles: EvidenceFile[] = [
  { name: "molding_cell_overview.j...", type: "image", verified: true },
  { name: "cpk_report_air_vent.pdf", type: "pdf", verified: true },
  { name: "cavity_pressure_chart.jpg", type: "image", verified: true },
  { name: "color_delta_e_report.pdf", type: "pdf", verified: true },
  { name: "pp_t20_material_cert.pdf", type: "pdf", verified: true },
];

/* ─── Sub-components ─── */

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "pass") return <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />;
  if (status === "high_risk")
    return (
      <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded flex-shrink-0">
        HIGH RISK
      </span>
    );
  return <div className="h-4 w-4 rounded border border-slate-500 flex-shrink-0" />;
};

const ChecklistNode = ({
  item,
  depth = 0,
  selected,
  onSelect,
}: {
  item: CheckItem;
  depth?: number;
  selected: string;
  onSelect: (id: string) => void;
}) => {
  const [open, setOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selected === item.id;

  return (
    <div>
      <button
        onClick={() => {
          onSelect(item.id);
          if (hasChildren) setOpen(!open);
        }}
        className={`w-full flex items-center gap-2 py-1.5 px-2 rounded text-left text-[13px] transition-colors ${
          isSelected ? "bg-slate-700/60 text-white" : "text-slate-300 hover:bg-slate-700/30"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="h-3 w-3 flex-shrink-0 text-slate-400" />
          ) : (
            <ChevronRight className="h-3 w-3 flex-shrink-0 text-slate-400" />
          )
        ) : (
          <span className="w-3" />
        )}
        <StatusIcon status={item.status} />
        <span className={`truncate ${item.status === "high_risk" ? "font-semibold text-white" : ""}`}>
          {item.label}
        </span>
      </button>
      {open && hasChildren && item.children!.map((child) => (
        <ChecklistNode key={child.id} item={child} depth={depth + 1} selected={selected} onSelect={onSelect} />
      ))}
    </div>
  );
};

/* ─── Main Component ─── */
const AtlasLiveAudit = () => {
  const [selectedCheck, setSelectedCheck] = useState("4.2.3");
  const [aiScore, setAiScore] = useState(3);
  const [userScore, setUserScore] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [copilotListening, setCopilotListening] = useState(false);

  return (
    <div className="h-screen w-full bg-[hsl(200,15%,10%)] text-slate-200 flex flex-col overflow-hidden">
      {/* ─── Top Bar ─── */}
      <header className="h-12 flex items-center justify-between px-5 border-b border-slate-700/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs font-medium tracking-wider text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE AUDIT
          </span>
        </div>
        <h1 className="text-sm font-semibold text-slate-100 hidden md:block">
          Atlas AI · AD Plastik — BMW Interior Trim Audit
        </h1>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          Progress 45%
          <div className="w-24 h-2 rounded-full bg-slate-700 overflow-hidden">
            <div className="h-full w-[45%] bg-emerald-500 rounded-full" />
          </div>
        </div>
      </header>

      {/* ─── Three-column body ─── */}
      <div className="flex flex-1 min-h-0">
        {/* ─── LEFT: Checklist + Evidence ─── */}
        <aside className="w-[260px] border-r border-slate-700/50 flex flex-col flex-shrink-0 overflow-hidden">
          {/* Checklist */}
          <div className="flex-1 overflow-y-auto p-3">
            <h2 className="text-[11px] font-bold tracking-wider text-slate-400 mb-1">CHECKLIST</h2>
            <p className="text-[11px] text-slate-500 mb-3">Injection Molding · AD Plastik d.d., Solin</p>
            {checklist.map((item) => (
              <ChecklistNode key={item.id} item={item} selected={selectedCheck} onSelect={setSelectedCheck} />
            ))}
          </div>

          {/* Evidence */}
          <div className="border-t border-slate-700/50 p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[11px] font-bold tracking-wider text-slate-400">EVIDENCE</h2>
              <span className="text-[11px] text-slate-500">5 / 5 ✓</span>
            </div>
            <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
              {evidenceFiles.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px] text-slate-300">
                  {f.type === "image" ? (
                    <FileImage className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <FileText className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
                  )}
                  <span className="truncate">{f.name}</span>
                  {f.verified && (
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400">
                      ✓ Verified
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-8 text-[11px] border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700"
              >
                <Camera className="h-3 w-3 mr-1" /> Capture
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-8 text-[11px] border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700"
              >
                <Upload className="h-3 w-3 mr-1" /> Upload
              </Button>
            </div>
          </div>
        </aside>

        {/* ─── CENTER: Question + Assessment ─── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-2xl mx-auto w-full">
            {/* Question header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold tracking-wider text-slate-400">QUESTION</span>
                <div className="flex gap-1.5">
                  <button className="h-8 w-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center">
                    <Volume2 className="h-4 w-4 text-slate-300" />
                  </button>
                  <button className="h-8 w-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center">
                    <MonitorSmartphone className="h-4 w-4 text-slate-300" />
                  </button>
                  <button className="h-8 w-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center">
                    <Mic className="h-4 w-4 text-slate-300" />
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-white leading-relaxed">
                Does the injection molding process for BMW air vent assemblies meet Cpk ≥ 1.67 and color ΔE {"<"} 0.5
                per IATF 16949?
              </h2>
            </div>

            {/* Risk indicators */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[13px]">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-slate-300">Color shift on aged mold inserts (58%)</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-slate-300">Clip force out-of-spec on cavity 3-4 (44%)</span>
              </div>
            </div>

            {/* Maturity Assessment */}
            <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700/50">
              <h3 className="text-[11px] font-bold tracking-wider text-slate-400 mb-4">MATURITY ASSESSMENT</h3>

              {/* AI suggestion */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-bold tracking-wider text-slate-400">ATLAS AI SUGGESTS</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      className={`h-10 w-12 rounded-md text-sm font-semibold transition-colors ${
                        n === aiScore
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="text-[12px] text-slate-500 mt-2">
                  Level 3 — Process capable but Cpk below BMW threshold on critical dimensions
                </p>
              </div>

              {/* User assessment */}
              <div>
                <h4 className="text-[11px] font-bold tracking-wider text-slate-400 mb-3">YOUR ASSESSMENT</h4>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setUserScore(n)}
                      className={`h-10 w-12 rounded-md text-sm font-semibold transition-colors ${
                        n === userScore
                          ? "bg-primary text-primary-foreground"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat input */}
          <div className="mt-auto p-4 border-t border-slate-700/50">
            <div className="max-w-2xl mx-auto flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask Atlas AI or add findings..."
                  className="bg-slate-800 border-slate-600 text-slate-200 placeholder:text-slate-500 pr-10 h-10"
                />
              </div>
              <Button size="icon" className="h-10 w-10 bg-emerald-600 hover:bg-emerald-500">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>

        {/* ─── RIGHT: Copilot + Benchmark ─── */}
        <aside className="w-[240px] border-l border-slate-700/50 flex flex-col flex-shrink-0 overflow-y-auto p-4 space-y-5">
          {/* Copilot */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-slate-200 mb-4">Atlas Copilot</h3>
            <button
              onClick={() => setCopilotListening(!copilotListening)}
              className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center transition-colors ${
                copilotListening
                  ? "bg-emerald-600 ring-4 ring-emerald-600/30"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              <Mic className="h-6 w-6 text-white" />
            </button>
            <p className="text-[11px] text-slate-500 mt-2">Tap to speak</p>
          </div>

          {/* Benchmark */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-[11px] font-bold tracking-wider text-slate-400 mb-3">BENCHMARK</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-slate-300">AD Plastik</span>
                  <span className="font-semibold text-slate-200">6.4/10</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[64%] bg-primary rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-slate-300">BMW Tier-1 avg</span>
                  <span className="font-semibold text-slate-200">8.1/10</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full w-[81%] bg-primary rounded-full" />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-amber-400 mt-3">
              Hold — mold rework required before run-at-rate
            </p>
          </div>

          {/* AI Finding */}
          <div className="bg-slate-800/60 rounded-lg p-4 border border-amber-600/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[12px] font-bold text-amber-400">AI Finding</span>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>
            <p className="text-[12px] text-slate-300 leading-relaxed">
              Cavity 3 shows 62K shots since last insert service — BMW limit is 50K. Clip retention force Cpk
              dropped to 1.42. Color masterbatch lot 2024-11 shows ΔE 0.72. Recommend mold insert replacement
              and masterbatch qualification before BMW run-at-rate approval.
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-8 text-[11px] border-emerald-600 text-emerald-400 bg-transparent hover:bg-emerald-600/20"
              >
                ACCEPT
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-8 text-[11px] border-slate-600 text-slate-400 bg-transparent hover:bg-slate-700"
              >
                DISMISS
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AtlasLiveAudit;
