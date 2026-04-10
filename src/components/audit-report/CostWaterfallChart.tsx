import { useAuditReportContext } from "@/contexts/AuditReportContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, CartesianGrid } from "recharts";

export default function CostWaterfallChart() {
  const { costImpactData } = useAuditReportContext();

  // Build waterfall data
  let runningTotal = 0;
  const waterfallData = costImpactData.map(item => {
    const start = runningTotal;
    runningTotal += item.currentExposure;
    return {
      name: item.category.split(' — ')[0],
      value: item.currentExposure / 1000,
      mitigated: item.mitigatedCost / 1000,
      start: start / 1000,
      fill: item.currentExposure > 100000 ? '#AD3D3D' : '#E39B5C',
    };
  });

  const totalExposure = costImpactData.reduce((a, c) => a + c.currentExposure, 0);
  const totalMitigated = costImpactData.reduce((a, c) => a + c.mitigatedCost, 0);

  const chartData = costImpactData.map(item => ({
    name: item.category.split(' — ')[0].substring(0, 18),
    exposure: Math.round(item.currentExposure / 1000),
    mitigated: Math.round(item.mitigatedCost / 1000),
    net: Math.round((item.currentExposure - item.mitigatedCost) / 1000),
    confidence: item.confidence,
  }));

  return (
    <section className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">// COST</span>
        <span className="w-1.5 h-1.5 bg-[#0A7FA5]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">Cost Exposure Waterfall</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <h2 className="text-[28px] font-light text-[#0A0A0A] tracking-tight leading-none">
        Cost Exposure Analysis
      </h2>

      <div className="border border-[#E5E7EB] bg-white p-6">
        <div className="flex items-center gap-6 mb-6 pb-4 border-b border-[#E5E7EB]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">Total Exposure</span>
            <div className="text-[24px] font-bold text-[#AD3D3D] font-mono tabular-nums">€{Math.round(totalExposure / 1000)}K</div>
          </div>
          <div className="w-px h-10 bg-[#E5E7EB]" />
          <div>
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">After Mitigation</span>
            <div className="text-[24px] font-bold text-[#6EA996] font-mono tabular-nums">€{Math.round(totalMitigated / 1000)}K</div>
          </div>
          <div className="w-px h-10 bg-[#E5E7EB]" />
          <div>
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#7B8E80] font-semibold">Savings</span>
            <div className="text-[24px] font-bold text-[#0A7FA5] font-mono tabular-nums">€{Math.round((totalExposure - totalMitigated) / 1000)}K</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#7B8E80', fontSize: 10 }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" height={60} />
            <YAxis tick={{ fill: '#7B8E80', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}K`} />
            <Tooltip
              formatter={(value: number, name: string) => [`€${value}K`, name === 'exposure' ? 'At Risk' : 'After Mitigation']}
              contentStyle={{ fontSize: 12, border: '1px solid #E5E7EB', borderRadius: 0 }}
            />
            <Bar dataKey="exposure" fill="#AD3D3D" opacity={0.7} name="At Risk" />
            <Bar dataKey="mitigated" fill="#6EA996" name="After Mitigation" />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 space-y-2">
          {costImpactData.map(item => (
            <div key={item.category} className="flex items-center gap-3 py-2 border-b border-[#F5F5F5] last:border-0">
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-medium text-[#0A0A0A]">{item.category}</span>
                <p className="text-[11px] text-[#7B8E80] truncate">{item.driver.substring(0, 80)}...</p>
              </div>
              <div className="flex items-center gap-4 shrink-0 text-right">
                <div>
                  <div className="text-[13px] font-mono font-bold text-[#AD3D3D] tabular-nums">€{(item.currentExposure / 1000).toFixed(0)}K</div>
                  <div className="text-[9px] text-[#C0C0C0]">at risk</div>
                </div>
                <span className="text-[11px] text-[#C0C0C0]">→</span>
                <div>
                  <div className="text-[13px] font-mono font-bold text-[#6EA996] tabular-nums">€{(item.mitigatedCost / 1000).toFixed(0)}K</div>
                  <div className="text-[9px] text-[#C0C0C0]">mitigated</div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#F5F5F5] text-[#7B8E80]">{item.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
