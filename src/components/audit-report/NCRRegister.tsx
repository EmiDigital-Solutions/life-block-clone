import { cn } from "@/lib/utils";
import type { NCR } from "@/data/auditReportData";
import NCRCard from "./NCRCard";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { radarData, ncrSeverityData } from "@/data/auditReportData";

interface NCRRegisterProps {
  ncrs: NCR[];
}

export default function NCRRegister({ ncrs }: NCRRegisterProps) {
  return (
    <section id="station-10" className="scroll-mt-20 space-y-8">
      {/* Section marker */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#9CA3AF]">// 10</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#9CA3AF]">NCR Register</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-[32px] font-light text-[#111827] tracking-tight leading-none">
          NCR Register
        </h2>
        <span className="text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-[#FEF2F2] text-[#EF4444]">
          {ncrs.length} Open
        </span>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
          <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium mb-4">Station Health Radar</h4>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="station" tick={{ fill: '#6B7280', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="#0052FF" fill="#0052FF" fillOpacity={0.08} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
          <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium mb-4">NCR Severity Distribution</h4>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ncrSeverityData} layout="vertical" margin={{ left: 60 }}>
              <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                {ncrSeverityData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority Matrix */}
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
        <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium mb-4">Priority Matrix — Severity × Effort to Fix</h4>
        <div className="grid grid-cols-2 gap-px bg-[#E5E7EB] rounded-xl overflow-hidden" style={{ aspectRatio: '2/1' }}>
          <div className="bg-white p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-2">High Severity · Low Effort</span>
            <span className="text-[13px] text-[#EF4444] font-medium">Fix First</span>
            <div className="flex gap-2 mt-2"><span className="w-3 h-3 rounded-full bg-[#EF4444]" /></div>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-2">High Severity · High Effort</span>
            <span className="text-[13px] text-[#F97316] font-medium">Plan & Escalate</span>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-2">Low Severity · Low Effort</span>
            <span className="text-[13px] text-[#10B981] font-medium">Quick Win</span>
            <div className="flex gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-[#F97316]" />
              <span className="w-3 h-3 rounded-full bg-[#F97316]" />
            </div>
          </div>
          <div className="bg-white p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-2">Low Severity · High Effort</span>
            <span className="text-[13px] text-[#6B7280] font-medium">Monitor</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {ncrs.map(ncr => <NCRCard key={ncr.id} ncr={ncr} />)}
      </div>
    </section>
  );
}
