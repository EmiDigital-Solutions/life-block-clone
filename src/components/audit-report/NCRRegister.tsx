import type { NCR } from "@/data/auditReportData";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import NCRCard from "./NCRCard";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface NCRRegisterProps {
  ncrs: NCR[];
}

export default function NCRRegister({ ncrs }: NCRRegisterProps) {
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

  return (
    <section id="station-10" className="scroll-mt-20 py-12 space-y-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-destructive" />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">NCR Register</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {ncrs.length} open NCRs — {majorCount} major requiring immediate action
      </h2>

      <div className="grid md:grid-cols-2 gap-px bg-border">
        {/* Radar */}
        <div className="p-6 bg-card">
          <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4 text-muted-foreground">Station Health Radar</h4>
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
          <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4 text-muted-foreground">Severity Distribution</h4>
          <div className="space-y-4 mt-8">
            {ncrSeverityData.map(entry => {
              const maxCount = Math.max(...ncrSeverityData.map(e => e.count));
              const pct = (entry.count / maxCount) * 100;
              return (
                <div key={entry.name} className="flex items-center gap-4">
                  <span className="text-[13px] font-medium w-[100px] shrink-0 text-foreground">{entry.name}</span>
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
      <div className="p-6 bg-card/60 backdrop-blur-sm">
        <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4 text-muted-foreground">Priority Matrix — Severity × Effort</h4>
        <div className="grid grid-cols-2 gap-px bg-border" style={{ aspectRatio: '2.5/1' }}>
          {quadrants.map(q => {
            const items = ncrPositions.filter(n => n.quadrant === q.key);
            return (
              <div key={q.key} className="p-5 flex flex-col items-center justify-center bg-card">
                <span className="text-[10px] uppercase tracking-wider mb-3 text-muted-foreground">{q.label}</span>
                <span className="text-[14px] font-bold mb-3" style={{ color: q.color }}>{q.action}</span>
                {items.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {items.map(item => (
                      <span
                        key={item.id}
                        className="text-[10px] font-mono font-bold px-2 py-1"
                        style={{ background: `${q.color}12`, color: q.color, border: `1px solid ${q.color}30` }}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                )}
                {items.length === 0 && (
                  <span className="text-[10px] text-muted-foreground">—</span>
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