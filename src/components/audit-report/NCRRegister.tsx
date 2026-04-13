import { cn } from "@/lib/utils";
import type { NCR } from "@/data/auditReportData";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
import NCRCard from "./NCRCard";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from "recharts";

interface NCRRegisterProps {
  ncrs: NCR[];
}

export default function NCRRegister({ ncrs }: NCRRegisterProps) {
  const { radarData, ncrSeverityData } = useAuditReportContext();

  return (
    <section id="station-10" className="scroll-mt-20 space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em]" style={{ color: 'hsl(0,0%,50%)' }}>// 10</span>
        <span className="w-1.5 h-1.5 bg-primary" />
        <span className="text-[12px] font-medium tracking-[0.1em]" style={{ color: 'hsl(0,0%,50%)' }}>NCR Register</span>
        <div className="flex-1 h-px" style={{ background: 'hsl(0,0%,78%)' }} />
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none">
          NCR Register
        </h2>
        <span className="text-[11px] px-2.5 py-1 uppercase tracking-wider font-semibold text-destructive" style={{ background: 'hsl(0, 48%, 46%, 0.1)' }}>
          {ncrs.length} Open
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6" style={{ background: 'hsla(0,0%,100%,0.7)', border: '1px solid hsl(0,0%,80%)' }}>
          <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4" style={{ color: 'hsl(0,0%,50%)' }}>Station Health Radar</h4>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(0,0%,80%)" />
              <PolarAngleAxis dataKey="station" tick={{ fill: 'hsl(0,0%,45%)', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="hsl(195, 89%, 34%)" fill="hsl(195, 89%, 34%)" fillOpacity={0.08} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6" style={{ background: 'hsla(0,0%,100%,0.7)', border: '1px solid hsl(0,0%,80%)' }}>
          <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4" style={{ color: 'hsl(0,0%,50%)' }}>NCR Severity Distribution</h4>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ncrSeverityData} layout="vertical" margin={{ left: 60 }}>
              <XAxis type="number" tick={{ fill: 'hsl(0,0%,45%)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(0,0%,30%)', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Bar dataKey="count" radius={[0, 0, 0, 0]} barSize={20}>
                {ncrSeverityData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6" style={{ background: 'hsla(0,0%,100%,0.7)', border: '1px solid hsl(0,0%,80%)' }}>
        <h4 className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4" style={{ color: 'hsl(0,0%,50%)' }}>Priority Matrix — Severity × Effort to Fix</h4>
        <div className="grid grid-cols-2 gap-px overflow-hidden" style={{ background: 'hsl(0,0%,80%)', aspectRatio: '2/1' }}>
          <div className="p-4 flex flex-col items-center justify-center" style={{ background: 'hsla(0,0%,100%,0.8)' }}>
            <span className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'hsl(0,0%,50%)' }}>High Severity · Low Effort</span>
            <span className="text-[13px] text-destructive font-medium">Fix First</span>
            <div className="flex gap-2 mt-2"><span className="w-3 h-3 bg-destructive" /></div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center" style={{ background: 'hsla(0,0%,100%,0.8)' }}>
            <span className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'hsl(0,0%,50%)' }}>High Severity · High Effort</span>
            <span className="text-[13px] text-warning font-medium">Plan & Escalate</span>
          </div>
          <div className="p-4 flex flex-col items-center justify-center" style={{ background: 'hsla(0,0%,100%,0.8)' }}>
            <span className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'hsl(0,0%,50%)' }}>Low Severity · Low Effort</span>
            <span className="text-[13px] text-accent font-medium">Quick Win</span>
            <div className="flex gap-2 mt-2">
              <span className="w-3 h-3 bg-warning" />
              <span className="w-3 h-3 bg-warning" />
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center" style={{ background: 'hsla(0,0%,100%,0.8)' }}>
            <span className="text-[10px] uppercase tracking-wider mb-2" style={{ color: 'hsl(0,0%,50%)' }}>Low Severity · High Effort</span>
            <span className="text-[13px] font-medium" style={{ color: 'hsl(0,0%,50%)' }}>Monitor</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {ncrs.map(ncr => <NCRCard key={ncr.id} ncr={ncr} />)}
      </div>
    </section>
  );
}