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
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">// 10</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted-foreground">NCR Register</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none">
          NCR Register
        </h2>
        <span className="text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-destructive/10 text-destructive">
          {ncrs.length} Open
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className=" border border-border bg-white p-6">
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-4">Station Health Radar</h4>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="station" tick={{ fill: '#7B8E80', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="#0A7FA5" fill="#0A7FA5" fillOpacity={0.08} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className=" border border-border bg-white p-6">
          <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-4">NCR Severity Distribution</h4>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ncrSeverityData} layout="vertical" margin={{ left: 60 }}>
              <XAxis type="number" tick={{ fill: '#7B8E80', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#1A1A1A', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                {ncrSeverityData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className=" border border-border bg-white p-6">
        <h4 className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-4">Priority Matrix — Severity × Effort to Fix</h4>
        <div className="grid grid-cols-2 gap-px bg-border  overflow-hidden" style={{ aspectRatio: '2/1' }}>
          <div className="bg-white p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">High Severity · Low Effort</span>
            <span className="text-[13px] text-destructive font-medium">Fix First</span>
            <div className="flex gap-2 mt-2"><span className="w-3 h-3 rounded-full bg-[#AD3D3D]" /></div>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">High Severity · High Effort</span>
            <span className="text-[13px] text-warning font-medium">Plan & Escalate</span>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Low Severity · Low Effort</span>
            <span className="text-[13px] text-accent font-medium">Quick Win</span>
            <div className="flex gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-[#E39B5C]" />
              <span className="w-3 h-3 rounded-full bg-[#E39B5C]" />
            </div>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Low Severity · High Effort</span>
            <span className="text-[13px] text-muted-foreground font-medium">Monitor</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {ncrs.map(ncr => <NCRCard key={ncr.id} ncr={ncr} />)}
      </div>
    </section>
  );
}
