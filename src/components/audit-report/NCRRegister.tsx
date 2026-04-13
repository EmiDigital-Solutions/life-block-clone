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
    <section id="station-10" className="scroll-mt-20">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-3 h-3" style={{ background: 'hsl(0, 48%, 46%)' }} />
        <h2 className="text-[22px] md:text-[26px] font-semibold text-foreground tracking-tight leading-none">NCR Register</h2>
        <span className="text-[12px] font-semibold px-3 py-1 text-destructive" style={{ background: 'hsl(0, 48%, 46%, 0.06)' }}>
          {ncrs.length} open
        </span>
        <div className="flex-1 h-px" style={{ background: 'hsl(0,0%,88%)' }} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-px mb-8" style={{ background: 'hsl(0,0%,88%)' }}>
        <div className="bg-white p-8">
          <h4 className="text-[12px] font-medium tracking-wide uppercase mb-4" style={{ color: 'hsl(0,0%,55%)' }}>Station Health Radar</h4>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(0,0%,88%)" />
              <PolarAngleAxis dataKey="station" tick={{ fill: 'hsl(0,0%,40%)', fontSize: 13 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="hsl(195, 89%, 34%)" fill="hsl(195, 89%, 34%)" fillOpacity={0.06} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8">
          <h4 className="text-[12px] font-medium tracking-wide uppercase mb-4" style={{ color: 'hsl(0,0%,55%)' }}>NCR Severity Distribution</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ncrSeverityData} layout="vertical" margin={{ left: 70 }}>
              <XAxis type="number" tick={{ fill: 'hsl(0,0%,45%)', fontSize: 13 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(0,0%,30%)', fontSize: 13 }} axisLine={false} tickLine={false} width={70} />
              <Bar dataKey="count" radius={[0, 0, 0, 0]} barSize={24}>
                {ncrSeverityData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NCR Cards */}
      <div className="space-y-5">
        {ncrs.map(ncr => <NCRCard key={ncr.id} ncr={ncr} />)}
      </div>
    </section>
  );
}