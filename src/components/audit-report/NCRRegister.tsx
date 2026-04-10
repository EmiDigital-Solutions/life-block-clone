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
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-[32px] font-semibold text-[#F5F6FA] tracking-tight leading-none">
          NCR Register
        </span>
        <span className="text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-[#F04464]/10 text-[#F04464]">
          {ncrs.length} Open
        </span>
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Station Health Radar */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium mb-4">Station Health Radar</h4>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="station" tick={{ fill: '#6B7085', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="score"
                stroke="#22D3EE"
                fill="url(#radarGradient)"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.6} />
                  <stop offset="50%" stopColor="#22D3EE" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22D3A5" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* NCR Severity Distribution */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
          <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium mb-4">NCR Severity Distribution</h4>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ncrSeverityData} layout="vertical" margin={{ left: 60 }}>
              <XAxis type="number" tick={{ fill: '#6B7085', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#A1A5B7', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
                {ncrSeverityData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority Matrix */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
        <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#6B7085] font-medium mb-4">Priority Matrix — Severity × Effort to Fix</h4>
        <div className="grid grid-cols-2 gap-[1px] bg-white/[0.06] rounded-xl overflow-hidden" style={{ aspectRatio: '2/1' }}>
          <div className="bg-[#0E1017] p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#6B7085] mb-2">High Severity · Low Effort</span>
            <span className="text-[13px] text-[#F04464] font-medium">Fix First</span>
            <div className="flex gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-[#F04464]" title="NCR-0001" />
            </div>
          </div>
          <div className="bg-[#0E1017] p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#6B7085] mb-2">High Severity · High Effort</span>
            <span className="text-[13px] text-[#FF7A59] font-medium">Plan & Escalate</span>
          </div>
          <div className="bg-[#0E1017] p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#6B7085] mb-2">Low Severity · Low Effort</span>
            <span className="text-[13px] text-[#22D3A5] font-medium">Quick Win</span>
            <div className="flex gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-[#FF7A59]" title="NCR-0002" />
              <span className="w-3 h-3 rounded-full bg-[#FF7A59]" title="NCR-0003" />
            </div>
          </div>
          <div className="bg-[#0E1017] p-4 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#6B7085] mb-2">Low Severity · High Effort</span>
            <span className="text-[13px] text-[#A1A5B7] font-medium">Monitor</span>
          </div>
        </div>
      </div>

      {/* Full NCR cards */}
      <div className="space-y-4">
        {ncrs.map(ncr => (
          <NCRCard key={ncr.id} ncr={ncr} />
        ))}
      </div>
    </section>
  );
}
