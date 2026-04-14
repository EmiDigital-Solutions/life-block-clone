import { cn } from "@/lib/utils";
import type { NCR, DepthLevel } from "@/data/auditReportData";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import NCRCard from "./NCRCard";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface NCRRegisterProps {
  ncrs: NCR[];
  depth?: DepthLevel;
}

export default function NCRRegister({ ncrs, depth = 'standard' }: NCRRegisterProps) {
  const { radarData, ncrSeverityData } = useAuditReportContext();
  const majorCount = ncrs.filter(n => n.severity === 'major').length;

  // Build priority matrix with actual NCR positions
  const ncrPositions = ncrs.map((ncr, i) => {
    const isMajor = ncr.severity === 'major';
    const effort = ncr.recommendedAction.length > 100 ? 'high' : 'low';
    return {
      id: ncr.id,
      severity: ncr.severity,
      quadrant: `${isMajor ? 'high' : 'low'}-${effort}`,
      label: ncr.id,
    };
  });

  const quadrants = [
    { key: 'high-low', label: 'High Severity · Low Effort', action: 'Fix First', color: 'hsl(0, 48%, 46%)', position: 'top-left' },
    { key: 'high-high', label: 'High Severity · High Effort', action: 'Plan & Escalate', color: 'hsl(24, 72%, 63%)', position: 'top-right' },
    { key: 'low-low', label: 'Low Severity · Low Effort', action: 'Quick Win', color: 'hsl(155, 24%, 55%)', position: 'bottom-left' },
    { key: 'low-high', label: 'Low Severity · High Effort', action: 'Monitor', color: 'hsl(0,0%,50%)', position: 'bottom-right' },
  ];

  if (depth === 'executive') {
    return (
      <section id="station-10" className="scroll-mt-20">
        <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border/40">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              <span className="text-[15px] font-semibold text-foreground">NCR Register</span>
            </div>
            <span className="text-[14px] text-muted-foreground">{ncrs.length} NCRs · {majorCount} Major</span>
          </div>
          <div className="divide-y divide-border/20">
            <div className="grid grid-cols-12 gap-2 px-5 py-2 text-[13px] font-medium text-muted-foreground border-b border-border/30">
              <div className="col-span-2">NCR ID</div>
              <div className="col-span-4">Title</div>
              <div className="col-span-2">Station</div>
              <div className="col-span-1">Severity</div>
              <div className="col-span-1">Clause</div>
              <div className="col-span-2">Status</div>
            </div>
            {ncrs.map(ncr => {
              const sevColor = ncr.severity === 'major' ? 'text-destructive' : 'text-warning';
              return (
                <div key={ncr.id} className="grid grid-cols-12 gap-2 px-5 py-2.5 items-center text-[14px]">
                  <div className="col-span-2 font-mono font-medium text-foreground">{ncr.id}</div>
                  <div className="col-span-4 text-foreground truncate">{ncr.title}</div>
                  <div className="col-span-2 text-muted-foreground">{ncr.station}</div>
                  <div className={cn("col-span-1 font-medium text-[13px]", sevColor)}>{ncr.severity}</div>
                  <div className="col-span-1 font-mono text-[13px] text-primary">{ncr.isoClause}</div>
                  <div className="col-span-2">
                    <span className={cn("text-[12px] font-medium px-2 py-0.5 rounded-md", ncr.status === 'open' ? 'bg-destructive/8 text-destructive' : 'bg-accent/8 text-accent')}>
                      {ncr.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="station-10" className="scroll-mt-20 py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-destructive" />
        <span className="text-[13px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">NCR Register</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {ncrs.length} open NCRs — {majorCount} major requiring immediate action
      </h2>

      <div className="grid md:grid-cols-2 gap-px bg-border">
        {/* Radar */}
        <div className="p-6 bg-card">
          <h4 className="text-[13px] uppercase tracking-[0.12em] font-semibold mb-4 text-muted-foreground">Station Health Radar</h4>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="station" tick={{ fill: 'hsl(0,0%,40%)', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={2.5} dot={{ r: 3, fill: 'hsl(var(--primary))' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Severity breakdown */}
        <div className="p-6 bg-card">
          <h4 className="text-[13px] uppercase tracking-[0.12em] font-semibold mb-4 text-muted-foreground">Severity Distribution</h4>
          <div className="space-y-4 mt-8">
            {ncrSeverityData.map(entry => {
              const maxCount = Math.max(...ncrSeverityData.map(e => e.count));
              const pct = (entry.count / maxCount) * 100;
              return (
                <div key={entry.name} className="flex items-center gap-4">
                  <span className="text-[15px] font-medium w-[100px] shrink-0 text-foreground">{entry.name}</span>
                  <div className="flex-1 h-5 relative bg-muted">
                    <div className="absolute top-0 h-full" style={{ width: `${pct}%`, background: entry.color, opacity: 0.7 }} />
                  </div>
                  <span className="text-[16px] font-mono font-bold w-[30px] text-right" style={{ color: entry.color }}>{entry.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Priority Matrix with actual NCR dots */}
      <div className="p-6 bg-card shadow-sm">
        <h4 className="text-[13px] uppercase tracking-[0.12em] font-semibold mb-4 text-muted-foreground">Priority Matrix — Severity × Effort</h4>
        <div className="grid grid-cols-2 gap-px bg-border" style={{ aspectRatio: '2.5/1' }}>
          {quadrants.map(q => {
            const items = ncrPositions.filter(n => n.quadrant === q.key);
            return (
              <div key={q.key} className="p-5 flex flex-col items-center justify-center bg-card">
                <span className="text-[12px] uppercase tracking-wider mb-3 text-muted-foreground">{q.label}</span>
                <span className="text-[14px] font-bold mb-3" style={{ color: q.color }}>{q.action}</span>
                {items.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {items.map(item => (
                      <span
                        key={item.id}
                        className="text-[12px] font-mono font-bold px-2 py-1"
                        style={{ background: `${q.color}12`, color: q.color, border: `1px solid ${q.color}30` }}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                )}
                {items.length === 0 && (
                  <span className="text-[12px] text-muted-foreground">—</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {ncrs.map(ncr => <NCRCard key={ncr.id} ncr={ncr} />)}
      </div>
    </section>
  );
}