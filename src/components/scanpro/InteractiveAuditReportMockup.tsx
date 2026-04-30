import { useState } from "react";

/**
 * Interactive ScanPro+ audit report mockup — built with the CEIP design system.
 * Squared UI, semantic tokens, Ion Blue accents, Sage Green status.
 */

type TabId = "overview" | "ncr" | "capa" | "machines";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "ncr", label: "NCR Register" },
  { id: "capa", label: "CAPA Timeline" },
  { id: "machines", label: "Machine Park" },
];

const stations = [
  "ok", "ok", "ok", "ok", "ok", "ok", "ok",
  "warn", "ok", "ok", "warn", "crit", "ok", "ok",
] as const;

const ncrRows = [
  {
    sev: "crit", label: "Critical", clause: "ISO 9001 §8.5.1", owner: "M. Kovač", due: "12 Nov 2024", status: "Open",
    aiFix: "Re-qualify CMM with traceable artifact · update PPAP §3 evidence",
    confidence: 94, fixDays: 14, investment: "High",
  },
  {
    sev: "warn", label: "Major", clause: "VDA 6.3 P6.4", owner: "L. Horvat", due: "18 Nov 2024", status: "In progress",
    aiFix: "Add SPC chart on op. 40 · trigger CAPA on Cpk < 1.33",
    confidence: 88, fixDays: 21, investment: "Medium",
  },
  {
    sev: "ok", label: "Minor", clause: "ISO 9001 §7.1.5", owner: "A. Babić", due: "02 Dec 2024", status: "Closed",
    aiFix: "Verified — calibration record digitised in EvidenceVault",
    confidence: 99, fixDays: 2, investment: "Low",
  },
];

const capaTasks = [
  { name: "Calibrate CMM",     start: 0, span: 3, aiDue: "W44", confidence: 92 },
  { name: "Update SPC plan",   start: 2, span: 4, aiDue: "W46", confidence: 85 },
  { name: "Operator retrain",  start: 4, span: 3, aiDue: "W47", confidence: 78 },
];

const machines = [
  { name: "DMG MORI CTX 450",     model: "CTX 450",       oee: 87, trend: "ok",   risk: 12, ttf: "> 90 d", action: "Monitor" },
  { name: "Trumpf TruLaser 3030", model: "TruLaser 3030", oee: 82, trend: "warn", risk: 47, ttf: "32 d",   action: "Schedule service" },
  { name: "Heller H 5000",        model: "H 5000",        oee: 91, trend: "ok",   risk: 8,  ttf: "> 90 d", action: "Monitor" },
  { name: "Schuler MSE 250",      model: "MSE 250",       oee: 78, trend: "warn", risk: 61, ttf: "18 d",   action: "Order spindle" },
];

const sevColor = {
  ok: "bg-[hsl(155_22%_56%)]",
  warn: "bg-[hsl(38_78%_57%)]",
  crit: "bg-[hsl(0_62%_53%)]",
} as const;

export default function InteractiveAuditReportMockup() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="w-full bg-background border border-border font-sans select-none">
      {/* macOS-style window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[hsl(0_62%_53%)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[hsl(38_78%_57%)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[hsl(155_22%_56%)]" />
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground truncate">
          CEIP · ScanPro+ · AD Plastik · Solin Plant · VDA 6.3 / ISO 9001
        </div>
        <div className="w-12" />
      </div>

      {/* Tab strip */}
      <div className="flex border-b border-border bg-background overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-3 font-mono text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors border-r border-border ${
              activeTab === t.id
                ? "bg-background text-foreground border-b-2 border-b-primary -mb-px"
                : "bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
        <div className="flex-1 border-b border-border" />
      </div>

      {/* Body */}
      <div className="p-5 md:p-7 bg-background min-h-[480px]">
        {activeTab === "overview" && <OverviewPanel />}
        {activeTab === "ncr" && <NcrPanel />}
        {activeTab === "capa" && <CapaPanel />}
        {activeTab === "machines" && <MachinesPanel />}
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-border bg-muted/30 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>14 stations · 3 NCR · CAPA assigned · OEE avg 84.5%</span>
        <span>Lead auditor: Dr. I. Novak · Verified 08 Nov 2024</span>
      </div>
    </div>
  );
}

/* ───────────────── Panels ───────────────── */

function AtlasBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 text-primary font-mono text-[9px] uppercase tracking-wider border border-primary/30">
      <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
      Atlas AI
    </span>
  );
}

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-muted">
        <div className="h-full bg-primary" style={{ width: `${value}%` }} />
      </div>
      <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{value}%</span>
    </div>
  );
}

function OverviewPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      {/* Atlas AI prediction banner */}
      <div className="md:col-span-12 border border-primary/40 bg-primary/[0.04] p-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-3">
            <AtlasBadge />
            <div>
              <div className="text-sm text-foreground font-medium">
                Predicted: 2 NCRs likely to escalate within 14 days if CAPA on station 12 is not started.
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                Model: Atlas v3.2 · Trained on 18,400 audits · Updated 4 h ago
              </div>
            </div>
          </div>
          <div className="w-44">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Confidence</div>
            <ConfidenceBar value={92} />
          </div>
        </div>
      </div>

      {/* Risk score */}
      <div className="md:col-span-4 border border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Atlas Risk Score
          </div>
          <AtlasBadge />
        </div>
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-6xl font-light text-foreground tracking-[-0.03em] tabular-nums">18</span>
          <span className="text-xl text-muted-foreground tabular-nums">/ 100</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
          ↓ 6 pts vs. last quarter (predicted)
        </div>
        <span className="inline-block px-2 py-0.5 bg-[hsl(155_22%_56%)] text-white font-mono text-[10px] uppercase tracking-wider">
          Low
        </span>
      </div>

      {/* Heatmap */}
      <div className="md:col-span-8 border border-border p-5">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-4">
          Station heatmap — 14 process stations
        </div>
        <div className="flex flex-wrap gap-1.5">
          {stations.map((s, i) => (
            <div key={i} className={`w-7 h-7 ${sevColor[s]}`} title={`Station ${i + 1}`} />
          ))}
        </div>
        <div className="flex gap-5 mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[hsl(155_22%_56%)]" /> OK 11</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[hsl(38_78%_57%)]" /> Warning 2</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[hsl(0_62%_53%)]" /> Critical 1</span>
        </div>
      </div>

      {/* Forecast */}
      <div className="md:col-span-12 border border-border p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            90-day risk forecast — predictive model
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span className="w-3 h-px bg-foreground" /> Actual
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span className="w-3 h-px bg-primary" /> Predicted
            </span>
            <AtlasBadge />
          </div>
        </div>
        <RiskForecastChart />
      </div>
    </div>
  );
}

function RiskForecastChart() {
  const actual = [38, 34, 30, 27];
  const predicted = [27, 25, 22, 20, 18, 17, 16, 15, 14];
  const upper = predicted.map(v => v + 5);
  const lower = predicted.map(v => Math.max(v - 5, 0));
  const max = 45;
  const w = 480;
  const h = 160;
  const step = w / 11;
  const xy = (i: number, v: number) => `${i * step},${h - 10 - (v / max) * (h - 20)}`;

  const bandTop = upper.map((v, i) => xy(i + 3, v));
  const bandBottom = [...lower].reverse().map((v, idx) => xy(predicted.length - 1 - idx + 3, v));
  const bandPoints = [...bandTop, ...bandBottom].join(" ");

  return (
    <div className="relative h-44">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line key={i} x1="0" x2={w} y1={10 + p * (h - 20)} y2={10 + p * (h - 20)} stroke="hsl(var(--border))" strokeWidth="0.5" />
        ))}
        <polygon points={bandPoints} fill="hsl(var(--primary))" fillOpacity="0.12" />
        <polyline
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
          points={actual.map((v, i) => xy(i, v)).join(" ")}
        />
        <polyline
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="4 3"
          points={predicted.map((v, i) => xy(i + 3, v)).join(" ")}
        />
        {predicted.map((v, i) => (
          <circle key={i} cx={(i + 3) * step} cy={h - 10 - (v / max) * (h - 20)} r="2.5" fill="hsl(var(--primary))" />
        ))}
        <line x1={3 * step} x2={3 * step} y1="5" y2={h - 5} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
        <text x={3 * step + 4} y="14" fill="hsl(var(--muted-foreground))" style={{ font: "9px ui-monospace, monospace", letterSpacing: "0.1em" }}>TODAY</text>
      </svg>
      <div className="flex justify-between mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        <span>−4w</span><span>−2w</span><span>Now</span><span>+4w</span><span>+8w</span><span>+12w</span>
      </div>
    </div>
  );
}

function NcrPanel() {
  return (
    <div className="border border-border">
      <div className="px-5 py-3 border-b border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        NCR Register · 3 findings
      </div>
      <div className="grid grid-cols-12 gap-2 px-5 py-2.5 border-b border-border bg-muted/30 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <div className="col-span-2">Severity</div>
        <div className="col-span-3">ISO Clause</div>
        <div className="col-span-3">Owner</div>
        <div className="col-span-2">Due date</div>
        <div className="col-span-2">Status</div>
      </div>
      {ncrRows.map((r, i) => (
        <div key={i} className="px-5 py-3 border-b border-border last:border-b-0 text-sm hover:bg-muted/20 transition-colors">
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-2 flex items-center gap-2">
              <span className={`w-2 h-2 ${sevColor[r.sev as keyof typeof sevColor]}`} />
              <span className="text-foreground">{r.label}</span>
            </div>
            <div className="col-span-3 font-mono text-xs text-foreground">{r.clause}</div>
            <div className="col-span-3 text-foreground">{r.owner}</div>
            <div className="col-span-2 font-mono text-xs text-muted-foreground">{r.due}</div>
            <div className="col-span-2 font-mono text-xs text-muted-foreground">{r.status}</div>
          </div>
          <div className="mt-2 pl-4 border-l-2 border-primary/40">
            <div className="flex items-start gap-3 flex-wrap">
              <AtlasBadge />
              <div className="flex-1 min-w-[200px]">
                <div className="text-xs text-foreground/80">
                  <span className="font-mono uppercase tracking-wider text-muted-foreground mr-2">Suggested fix:</span>
                  {r.aiFix}
                </div>
              </div>
              <div className="w-32">
                <ConfidenceBar value={r.confidence} />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  Est. fix duration
                </div>
                <div className="font-mono text-xs text-foreground tabular-nums">
                  {r.fixDays} {r.fixDays === 1 ? "day" : "days"}
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  Supplier investment
                </div>
                <div className="font-mono text-xs text-foreground tabular-nums">
                  {r.investment}
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  Source
                </div>
                <div className="font-mono text-xs text-primary">
                  Atlas v3.2 · benchmark
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CapaPanel() {
  const weeks = ["W42", "W43", "W44", "W45", "W46", "W47", "W48"];
  return (
    <div className="border border-border p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          CAPA Timeline · AI-recommended schedule
        </div>
        <AtlasBadge />
      </div>
      <div className="grid grid-cols-[200px_1fr_120px] gap-x-4">
        <div />
        <div className="grid grid-cols-7 gap-px font-mono text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-3">
          {weeks.map(w => <div key={w} className="text-center">{w}</div>)}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-3">
          AI confidence
        </div>
        {capaTasks.map((t, i) => (
          <div key={i} className="contents">
            <div className="text-sm text-foreground py-3 border-b border-border">
              {t.name}
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                Predicted due {t.aiDue}
              </div>
            </div>
            <div className="relative h-12 border-b border-border py-2">
              <div className="absolute inset-y-2 inset-x-0 grid grid-cols-7">
                {weeks.map((_, j) => <div key={j} className="border-l border-border first:border-l-0" />)}
              </div>
              <div
                className="absolute top-2 bottom-2 bg-primary"
                style={{
                  left: `${(t.start / 7) * 100}%`,
                  width: `${(t.span / 7) * 100}%`,
                }}
              />
            </div>
            <div className="flex items-center border-b border-border">
              <ConfidenceBar value={t.confidence} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MachinesPanel() {
  return (
    <div className="border border-border">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Machine-park intelligence · Predictive failure forecast
        </div>
        <AtlasBadge />
      </div>
      {machines.map((m, i) => (
        <div key={i} className="grid grid-cols-12 gap-4 items-center px-5 py-4 border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
          <div className="col-span-3">
            <div className="text-sm text-foreground">{m.name}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
              Model: {m.model}
            </div>
          </div>
          <div className="col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">OEE</div>
            <div className="text-2xl font-light text-foreground tabular-nums">{m.oee}<span className="text-base text-muted-foreground">%</span></div>
          </div>
          <div className="col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Failure risk · 90 d</div>
            <ConfidenceBar value={m.risk} />
          </div>
          <div className="col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Predicted TTF</div>
            <div className={`text-sm tabular-nums ${m.trend === "warn" ? "text-[hsl(38_78%_45%)]" : "text-foreground"}`}>{m.ttf}</div>
          </div>
          <div className="col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">AI action</div>
            <div className="font-mono text-xs text-primary">{m.action}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
