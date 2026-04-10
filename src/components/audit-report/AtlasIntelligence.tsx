import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  costImpactData, qualityTrajectoryData, qualityTrajectoryMitigated,
  innovationSignals, crossCorrelations, supplierRiskSignals, scenarioOutcomes,
  iatfProcessScores, iatfWeightedScore,
} from "@/data/auditReportData";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell,
  AreaChart, Area, CartesianGrid, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import {
  Sparkles, Brain, TrendingDown, TrendingUp, Minus,
  Eye, ChevronDown, ChevronRight,
  DollarSign, Shield, Lightbulb, Link2, Target,
} from "lucide-react";

const trendIcon = { improving: TrendingUp, declining: TrendingDown, stable: Minus };
const trendColor = { improving: '#10B981', declining: '#EF4444', stable: '#9CA3AF' };
const severityColor = { critical: '#EF4444', high: '#F97316', medium: '#F59E0B', low: '#6B7280' };
const statusColor = { safe: '#10B981', warning: '#F59E0B', critical: '#EF4444' };

export default function AtlasIntelligence() {
  const [showMitigated, setShowMitigated] = useState(false);
  const [expandedCorrelation, setExpandedCorrelation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cost' | 'quality' | 'innovation' | 'correlations' | 'scenarios'>('cost');

  const totalExposure = costImpactData.reduce((s, c) => s + c.currentExposure, 0);
  const totalMitigated = costImpactData.reduce((s, c) => s + c.mitigatedCost, 0);
  const trajectoryData = showMitigated ? qualityTrajectoryMitigated : qualityTrajectoryData;

  const tabs = [
    { id: 'cost' as const, label: 'Cost Impact', icon: DollarSign },
    { id: 'quality' as const, label: 'Quality', icon: Shield },
    { id: 'innovation' as const, label: 'Innovation', icon: Lightbulb },
    { id: 'correlations' as const, label: 'Patterns', icon: Brain },
    { id: 'scenarios' as const, label: 'Scenarios', icon: Target },
  ];

  return (
    <section id="station-11" className="scroll-mt-20 space-y-6">
      {/* Section marker */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#9CA3AF]">// 11</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF]" />
        <span className="text-[12px] font-medium tracking-[0.1em] text-[#9CA3AF]">Atlas Intelligence</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-[32px] font-light text-[#111827] tracking-tight leading-none">Atlas Intelligence</h2>
        <span className="text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-[#EBF0FF] text-[#0052FF]">
          <Sparkles className="w-3 h-3 inline mr-1" />AI
        </span>
      </div>

      <p className="text-[14px] text-[#6B7280] max-w-[640px]">
        Cross-domain correlations invisible to human auditors — connecting calibration patterns,
        financial exposure, quality trajectories, and innovation gaps.
      </p>

      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-[#F3F4F6] border border-[#E5E7EB] overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-[12px] font-medium whitespace-nowrap transition-all",
              activeTab === tab.id ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280] hover:text-[#111827]"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* COST */}
      {activeTab === 'cost' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-5">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium">Total Exposure</span>
              <p className="text-[36px] font-light text-[#EF4444] leading-none mt-2 tabular-nums">€{(totalExposure / 1000).toFixed(0)}K</p>
              <span className="text-[11px] text-[#6B7280] mt-1 block">if no action taken</span>
            </div>
            <div className="rounded-xl border border-[#6EE7B7] bg-[#ECFDF5] p-5">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium">After Mitigation</span>
              <p className="text-[36px] font-light text-[#10B981] leading-none mt-2 tabular-nums">€{(totalMitigated / 1000).toFixed(0)}K</p>
              <span className="text-[11px] text-[#6B7280] mt-1 block">with full remediation</span>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium">ROI of Action</span>
              <p className="text-[36px] font-light text-[#111827] leading-none mt-2 tabular-nums">{((1 - totalMitigated / totalExposure) * 100).toFixed(0)}%</p>
              <span className="text-[11px] text-[#6B7280] mt-1 block">cost reduction achievable</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium">Cost Exposure by Category</h4>
            {costImpactData.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#111827] font-medium">{item.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-mono text-[#EF4444]">€{item.currentExposure.toLocaleString()}</span>
                    <span className="text-[10px] text-[#D1D5DB]">→</span>
                    <span className="text-[12px] font-mono text-[#10B981]">€{item.mitigatedCost.toLocaleString()}</span>
                    <span className="text-[10px] font-mono text-[#9CA3AF] px-1.5 py-0.5 rounded bg-[#F3F4F6]">{item.confidence}%</span>
                  </div>
                </div>
                <div className="relative h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-[#EF4444]/20" style={{ width: `${(item.currentExposure / totalExposure) * 100}%` }} />
                  <div className="absolute inset-y-0 left-0 rounded-full bg-[#10B981]" style={{ width: `${(item.mitigatedCost / totalExposure) * 100}%` }} />
                </div>
                <p className="text-[11px] text-[#9CA3AF] leading-relaxed">{item.driver}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUALITY */}
      {activeTab === 'quality' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium">DPPM Forecast — 12 Month</h4>
                <p className="text-[12px] text-[#6B7280] mt-1">BMW target: 50 DPPM (red line)</p>
              </div>
              <button
                onClick={() => setShowMitigated(!showMitigated)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border",
                  showMitigated ? "border-[#10B981] text-[#10B981] bg-[#ECFDF5]" : "border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]"
                )}
              >
                {showMitigated ? '✓ With remediation' : 'Show mitigated'}
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trajectoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', color: '#111827' }} />
                <Area type="monotone" dataKey="upperBound" stroke="none" fill="#0052FF" fillOpacity={0.04} />
                <Area type="monotone" dataKey="lowerBound" stroke="none" fill="#fff" fillOpacity={1} />
                <Area type="monotone" dataKey="predicted" stroke="#0052FF" strokeWidth={2} fill="#0052FF" fillOpacity={0.06} strokeDasharray="6 3" />
                <Area type="monotone" dataKey="actual" stroke="#111827" strokeWidth={2} fill="none" dot={{ r: 4, fill: '#111827' }} connectNulls={false} />
                <Area type="monotone" dataKey={() => 50} stroke="#EF4444" strokeWidth={1} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-4 text-[11px] text-[#9CA3AF]">
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#111827] rounded-full inline-block" /> Actual</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#0052FF] rounded-full inline-block" /> Predicted</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#EF4444] rounded-full inline-block" /> BMW Target (50)</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium mb-4">Supplier Risk Signals</h4>
            <div className="space-y-2">
              {supplierRiskSignals.map((signal, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-[#E5E7EB] bg-[#FAFBFC]">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: statusColor[signal.status] }} />
                  <span className="text-[13px] text-[#111827] font-medium flex-1 min-w-0">{signal.signal}</span>
                  <span className="text-[14px] font-mono tabular-nums shrink-0" style={{ color: statusColor[signal.status] }}>{signal.value}</span>
                  <span className="text-[10px] text-[#9CA3AF] shrink-0">/ {signal.threshold}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INNOVATION */}
      {activeTab === 'innovation' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium mb-4">Innovation Radar vs. Tier-2</h4>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={innovationSignals.map(s => ({ dimension: s.dimension.replace(/\s/g, '\n'), score: s.score, benchmark: s.benchmark }))}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: '#6B7280', fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="benchmark" stroke="#D1D5DB" fill="none" strokeWidth={1} strokeDasharray="4 4" />
                  <Radar dataKey="score" stroke="#0052FF" fill="#0052FF" fillOpacity={0.08} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-2 text-[11px] text-[#9CA3AF]">
                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#0052FF] rounded-full inline-block" /> MV Motors</span>
                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-[#D1D5DB] rounded-full inline-block" /> Tier-2 Median</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 space-y-3">
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium mb-2">Innovation Signals</h4>
              {innovationSignals.map((signal, i) => {
                const TIcon = trendIcon[signal.trend];
                return (
                  <div key={i} className="p-3 rounded-lg border border-[#E5E7EB] bg-[#FAFBFC]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] text-[#111827] font-medium">{signal.dimension}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-mono tabular-nums" style={{ color: signal.score >= signal.benchmark ? '#10B981' : '#F59E0B' }}>{signal.score}</span>
                        <span className="text-[11px] text-[#9CA3AF]">/ {signal.benchmark}</span>
                        <TIcon className="w-3 h-3" style={{ color: trendColor[signal.trend] }} />
                      </div>
                    </div>
                    <div className="relative h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden mb-2">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-[#0052FF]/40" style={{ width: `${signal.score}%` }} />
                      <div className="absolute top-0 bottom-0 w-px bg-[#9CA3AF]" style={{ left: `${signal.benchmark}%` }} />
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] leading-relaxed">{signal.insight}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#9CA3AF] font-medium">IATF 16949 Process Audit Scores</h4>
              <span className="text-[14px] font-mono tabular-nums text-[#F59E0B]">Weighted: {Math.round(iatfWeightedScore)}%</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={iatfProcessScores} margin={{ left: 120 }} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="process" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} width={120} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={14}>
                  {iatfProcessScores.map((entry, index) => (
                    <Cell key={index} fill={entry.score >= 80 ? '#10B981' : entry.score >= 60 ? '#F59E0B' : '#EF4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* HIDDEN PATTERNS */}
      {activeTab === 'correlations' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#93C5FD] bg-[#EBF0FF] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-[#0052FF]" />
              <span className="text-[13px] font-medium text-[#111827]">What Atlas sees that humans don't</span>
            </div>
            <p className="text-[12px] text-[#6B7280] leading-relaxed">
              Atlas cross-referenced 847 data points across all stations, historical audit data (5 prior audits),
              supplier financials, BMW quality gateway submissions, and regional industry benchmarks to identify
              6 hidden patterns. Items marked with <Eye className="w-3 h-3 inline text-[#0052FF]" /> were not flagged by the auditor.
            </p>
          </div>

          {crossCorrelations.map((cc) => (
            <div
              key={cc.id}
              className={cn(
                "rounded-xl border p-5 transition-all cursor-pointer bg-white",
                cc.severity === 'critical' ? "border-[#FCA5A5]" :
                cc.severity === 'high' ? "border-[#FDBA74]" :
                "border-[#E5E7EB]"
              )}
              onClick={() => setExpandedCorrelation(expandedCorrelation === cc.id ? null : cc.id)}
            >
              <div className="flex items-start gap-3">
                {!cc.humanVisible && <Eye className="w-4 h-4 text-[#0052FF] mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[14px] font-medium text-[#111827]">{cc.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                      style={{ background: `${severityColor[cc.severity]}15`, color: severityColor[cc.severity] }}>
                      {cc.severity}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#9CA3AF]">{cc.confidence}% conf.</span>
                  </div>
                  {expandedCorrelation === cc.id && (
                    <div className="mt-3 space-y-3">
                      <p className="text-[13px] text-[#6B7280] leading-relaxed">{cc.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link2 className="w-3 h-3 text-[#9CA3AF]" />
                        {cc.connectedFindings.map(f => (
                          <span key={f} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280]">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {expandedCorrelation === cc.id ? <ChevronDown className="w-4 h-4 text-[#9CA3AF]" /> : <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SCENARIOS */}
      {activeTab === 'scenarios' && (
        <div className="space-y-4">
          <p className="text-[13px] text-[#6B7280]">What happens under each decision path — cost, delivery, and quality modeled simultaneously.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarioOutcomes.map((sc, i) => {
              const isRecommended = sc.scenario === 'Full Remediation';
              return (
                <div key={i} className={cn(
                  "rounded-xl border p-5 space-y-4 bg-white",
                  isRecommended ? "border-[#6EE7B7] bg-[#ECFDF5]" : "border-[#E5E7EB]"
                )}>
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-medium text-[#111827]">{sc.scenario}</span>
                    {isRecommended && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D1FAE5] text-[#10B981] font-semibold uppercase tracking-wider">Recommended</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Delay</span>
                      <p className="text-[24px] font-mono font-light tabular-nums text-[#111827]">+{sc.deliveryDelay}d</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF]">Cost</span>
                      <p className="text-[24px] font-mono font-light tabular-nums" style={{ color: sc.costImpact > 200000 ? '#EF4444' : sc.costImpact > 100000 ? '#F59E0B' : '#10B981' }}>
                        €{(sc.costImpact / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#6B7280] leading-relaxed">{sc.qualityRisk}</p>
                  <p className="text-[11px] font-medium" style={{ color: isRecommended ? '#10B981' : '#9CA3AF' }}>{sc.recommendation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
