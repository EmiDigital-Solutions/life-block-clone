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

  return (
    <section id="station-10" className="scroll-mt-20 space-y-8">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-5" style={{ background: 'hsl(0, 48%, 46%)' }} />
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'hsl(0,0%,50%)' }}>NCR Register</span>
      </div>

      <h2 className="text-[32px] font-bold text-foreground tracking-[-0.02em] leading-tight">
        {ncrs.length} open NCRs — {majorCount} major requiring immediate action
      </h2>

      <div className="grid md:grid-cols-2 gap-px" style={{ background: 'hsl(0,0%,85%)' }}>
        {/* Radar */}
        <div className="p-6" style={{ background: 'hsl(0,0%,100%)' }}>
          <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4" style={{ color: 'hsl(0,0%,50%)' }}>Station Health Radar</h4>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(0,0%,88%)" />
              <PolarAngleAxis dataKey="station" tick={{ fill: 'hsl(0,0%,40%)', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="hsl(195, 89%, 34%)" fill="hsl(195, 89%, 34%)" fillOpacity={0.1} strokeWidth={2.5} dot={{ r: 3, fill: 'hsl(195, 89%, 34%)' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Severity breakdown as simple horizontal bars */}
        <div className="p-6" style={{ background: 'hsl(0,0%,100%)' }}>
          <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4" style={{ color: 'hsl(0,0%,50%)' }}>Severity Distribution</h4>
          <div className="space-y-4 mt-8">
            {ncrSeverityData.map(entry => {
              const maxCount = Math.max(...ncrSeverityData.map(e => e.count));
              const pct = (entry.count / maxCount) * 100;
              return (
                <div key={entry.name} className="flex items-center gap-4">
                  <span className="text-[13px] font-medium w-[100px] shrink-0 text-foreground">{entry.name}</span>
                  <div className="flex-1 h-5 relative" style={{ background: 'hsl(0,0%,93%)' }}>
                    <div className="absolute top-0 h-full" style={{ width: `${pct}%`, background: entry.color, opacity: 0.7 }} />
                  </div>
                  <span className="text-[16px] font-mono font-bold w-[30px] text-right" style={{ color: entry.color }}>{entry.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Priority Matrix */}
      <div className="p-6" style={{ background: 'hsl(0,0%,100%)', border: '1px solid hsl(0,0%,85%)' }}>
        <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4" style={{ color: 'hsl(0,0%,50%)' }}>Priority Matrix — Severity × Effort</h4>
        <div className="grid grid-cols-2 gap-px" style={{ background: 'hsl(0,0%,85%)', aspectRatio: '2.5/1' }}>
          {[
            { label: 'High Severity · Low Effort', action: 'Fix First', color: 'hsl(0, 48%, 46%)' },
            { label: 'High Severity · High Effort', action: 'Plan & Escalate', color: 'hsl(24, 72%, 63%)' },
            { label: 'Low Severity · Low Effort', action: 'Quick Win', color: 'hsl(155, 24%, 55%)' },
            { label: 'Low Severity · High Effort', action: 'Monitor', color: 'hsl(0,0%,50%)' },
          ].map(q => (
            <div key={q.label} className="p-5 flex flex-col items-center justify-center" style={{ background: 'hsl(0,0%,100%)' }}>
              <span className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'hsl(0,0%,55%)' }}>{q.label}</span>
              <span className="text-[14px] font-bold" style={{ color: q.color }}>{q.action}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {ncrs.map(ncr => <NCRCard key={ncr.id} ncr={ncr} />)}
      </div>
    </section>
  );
}
