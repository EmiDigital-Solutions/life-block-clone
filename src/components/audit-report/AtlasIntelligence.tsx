import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useAuditReportContext } from "@/contexts/AuditReportContext";
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
const trendColor = { improving: 'hsl(155, 24%, 55%)', declining: 'hsl(0, 48%, 46%)', stable: 'hsl(135, 8%, 52%)' };
const severityColor = { critical: 'hsl(0, 48%, 46%)', high: 'hsl(24, 72%, 63%)', medium: 'hsl(24, 72%, 63%)', low: 'hsl(135, 8%, 52%)' };
const statusColor = { safe: 'hsl(155, 24%, 55%)', warning: 'hsl(24, 72%, 63%)', critical: 'hsl(0, 48%, 46%)' };

export default function AtlasIntelligence() {
  const {
    costImpactData, qualityTrajectoryData, qualityTrajectoryMitigated,
    innovationSignals, crossCorrelations, supplierRiskSignals, scenarioOutcomes,
    iatfProcessScores, iatfWeightedScore,
  } = useAuditReportContext();
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
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[14px] font-medium tracking-[0.1em] text-muted-foreground">// 11</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-[14px] font-medium tracking-[0.1em] text-muted-foreground">Atlas Intelligence</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none">Atlas Intelligence</h2>
        <span className="text-[13px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-primary/10 text-primary">
          <Sparkles className="w-3 h-3 inline mr-1" />AI
        </span>
      </div>

      <p className="text-[14px] text-muted-foreground max-w-[640px] leading-relaxed">
        Cross-domain correlations invisible to human auditors — connecting calibration patterns,
        financial exposure, quality trajectories, and innovation gaps.
      </p>

      {/* Tab bar */}
      <div className="flex items-center gap-1 p-1  bg-muted border-none overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2  text-[14px] font-medium whitespace-nowrap transition-all",
              activeTab === tab.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
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
            <div className=" border-none bg-destructive/5 p-5">
              <span className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">Total Exposure</span>
              <p className="text-[32px] font-light text-destructive leading-none mt-2 tabular-nums">€{(totalExposure / 1000).toFixed(0)}K</p>
              <span className="text-[14px] text-muted-foreground mt-1 block">if no action taken</span>
            </div>
            <div className=" border-none bg-accent/5 p-5">
              <span className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">After Mitigation</span>
              <p className="text-[32px] font-light text-accent leading-none mt-2 tabular-nums">€{(totalMitigated / 1000).toFixed(0)}K</p>
              <span className="text-[14px] text-muted-foreground mt-1 block">with full remediation</span>
            </div>
            <div className=" bg-card shadow-sm p-5">
              <span className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">ROI of Action</span>
              <p className="text-[32px] font-light text-foreground leading-none mt-2 tabular-nums">{((1 - totalMitigated / totalExposure) * 100).toFixed(0)}%</p>
              <span className="text-[14px] text-muted-foreground mt-1 block">cost reduction achievable</span>
            </div>
          </div>

          <div className=" bg-card shadow-sm p-6 space-y-4">
            <h4 className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">Cost Exposure by Category</h4>
            {costImpactData.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-foreground font-medium">{item.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[15px] font-mono text-destructive">€{item.currentExposure.toLocaleString()}</span>
                    <span className="text-[13px] text-grey-mid">→</span>
                    <span className="text-[15px] font-mono text-accent">€{item.mitigatedCost.toLocaleString()}</span>
                    <span className="text-[12px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{item.confidence}%</span>
                  </div>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-destructive/15" style={{ width: `${(item.currentExposure / totalExposure) * 100}%` }} />
                  <div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${(item.mitigatedCost / totalExposure) * 100}%` }} />
                </div>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{item.driver}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUALITY */}
      {activeTab === 'quality' && (
        <div className="space-y-4">
          <div className=" bg-card shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">DPPM Forecast — 12 Month</h4>
                <p className="text-[14px] text-muted-foreground mt-1">BMW target: 50 DPPM (red line)</p>
              </div>
              <button
                onClick={() => setShowMitigated(!showMitigated)}
                className={cn(
                  "px-3 py-1.5  text-[13px] font-medium transition-all border",
                  showMitigated ? "border-accent text-accent bg-accent/5" : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {showMitigated ? '✓ With remediation' : 'Show mitigated'}
              </button>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trajectoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(135, 8%, 52%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(135, 8%, 52%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0px', fontSize: '13px', color: 'hsl(var(--foreground))' }} />
                <Area type="monotone" dataKey="upperBound" stroke="none" fill="hsl(195, 89%, 34%)" fillOpacity={0.04} />
                <Area type="monotone" dataKey="lowerBound" stroke="none" fill="#fff" fillOpacity={1} />
                <Area type="monotone" dataKey="predicted" stroke="hsl(195, 89%, 34%)" strokeWidth={2} fill="hsl(195, 89%, 34%)" fillOpacity={0.06} strokeDasharray="6 3" />
                <Area type="monotone" dataKey="actual" stroke="hsl(var(--foreground))" strokeWidth={2} fill="none" dot={{ r: 4, fill: 'hsl(var(--foreground))' }} connectNulls={false} />
                <Area type="monotone" dataKey={() => 50} stroke="hsl(0, 48%, 46%)" strokeWidth={1} strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-4 text-[14px] text-muted-foreground">
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-foreground rounded-full inline-block" /> Actual</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-primary rounded-full inline-block" /> Predicted</span>
              <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-destructive rounded-full inline-block" /> BMW Target (50)</span>
            </div>
          </div>

          <div className=" bg-card shadow-sm p-6">
            <h4 className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-4">Supplier Risk Signals</h4>
            <div className="space-y-2">
              {supplierRiskSignals.map((signal, i) => (
                <div key={i} className="flex items-center gap-3 p-3  bg-muted/40">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: statusColor[signal.status] }} />
                  <span className="text-[15px] text-foreground font-medium flex-1 min-w-0">{signal.signal}</span>
                  <span className="text-[15px] font-mono tabular-nums shrink-0" style={{ color: statusColor[signal.status] }}>{signal.value}</span>
                  <span className="text-[13px] text-muted-foreground shrink-0">/ {signal.threshold}</span>
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
            <div className=" bg-card shadow-sm p-6">
              <h4 className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-4">Innovation Radar vs. Tier-2</h4>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={innovationSignals.map(s => ({ dimension: s.dimension.replace(/\s/g, '\n'), score: s.score, benchmark: s.benchmark }))}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: 'hsl(135, 8%, 52%)', fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="benchmark" stroke="hsl(0, 0%, 75%)" fill="none" strokeWidth={1} strokeDasharray="4 4" />
                  <Radar dataKey="score" stroke="hsl(195, 89%, 34%)" fill="hsl(195, 89%, 34%)" fillOpacity={0.08} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-2 text-[14px] text-muted-foreground">
                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-primary rounded-full inline-block" /> MV Motors</span>
                <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-grey-mid rounded-full inline-block" /> Tier-2 Median</span>
              </div>
            </div>

            <div className=" bg-card shadow-sm p-6 space-y-3">
              <h4 className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-2">Innovation Signals</h4>
              {innovationSignals.map((signal, i) => {
                const TIcon = trendIcon[signal.trend];
                return (
                  <div key={i} className="p-3  bg-muted/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[15px] text-foreground font-medium">{signal.dimension}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-mono tabular-nums" style={{ color: signal.score >= signal.benchmark ? 'hsl(155, 24%, 55%)' : 'hsl(24, 72%, 63%)' }}>{signal.score}</span>
                        <span className="text-[14px] text-muted-foreground">/ {signal.benchmark}</span>
                        <TIcon className="w-3.5 h-3.5" style={{ color: trendColor[signal.trend] }} />
                      </div>
                    </div>
                    <div className="relative h-1.5 bg-border rounded-full overflow-hidden mb-2">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-primary/40" style={{ width: `${signal.score}%` }} />
                      <div className="absolute top-0 bottom-0 w-px bg-muted-foreground" style={{ left: `${signal.benchmark}%` }} />
                    </div>
                    <p className="text-[14px] text-muted-foreground leading-relaxed">{signal.insight}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className=" bg-card shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[13px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">IATF 16949 Process Audit Scores</h4>
              <span className="text-[14px] font-mono tabular-nums text-warning">Weighted: {Math.round(iatfWeightedScore)}%</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={iatfProcessScores} margin={{ left: 120 }} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(135, 8%, 52%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="process" tick={{ fill: 'hsl(var(--charcoal))', fontSize: 12 }} axisLine={false} tickLine={false} width={120} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16}>
                  {iatfProcessScores.map((entry, index) => (
                    <Cell key={index} fill={entry.score >= 80 ? 'hsl(155, 24%, 55%)' : entry.score >= 60 ? 'hsl(24, 72%, 63%)' : 'hsl(0, 48%, 46%)'} />
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
          <div className="border-none bg-secondary/10 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-[15px] font-semibold text-foreground">What Atlas sees that humans don't</span>
            </div>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Atlas cross-referenced 847 data points across all stations, historical audit data (5 prior audits),
              supplier financials, BMW quality gateway submissions, and regional industry benchmarks to identify
              6 hidden patterns. Items marked with <Eye className="w-3 h-3 inline text-primary" /> were not flagged by the auditor.
            </p>
          </div>

          {crossCorrelations.map((cc) => (
            <div
              key={cc.id}
              className={cn(
                " border p-5 transition-all cursor-pointer bg-white",
                cc.severity === 'critical' ? "border-destructive/30" :
                cc.severity === 'high' ? "border-warning/30" :
                "border-border"
              )}
              onClick={() => setExpandedCorrelation(expandedCorrelation === cc.id ? null : cc.id)}
            >
              <div className="flex items-start gap-3">
                {!cc.humanVisible && <Eye className="w-4 h-4 text-primary mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[14px] font-medium text-foreground">{cc.title}</span>
                    <span className="text-[12px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                      style={{ background: `${severityColor[cc.severity]}15`, color: severityColor[cc.severity] }}>
                      {cc.severity}
                    </span>
                    <span className="text-[13px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{cc.confidence}% conf.</span>
                  </div>
                  {expandedCorrelation === cc.id && (
                    <div className="mt-3 space-y-3">
                      <p className="text-[15px] text-muted-foreground leading-relaxed">{cc.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link2 className="w-3 h-3 text-muted-foreground" />
                        {cc.connectedFindings.map(f => (
                          <span key={f} className="text-[13px] font-mono px-2 py-0.5 rounded bg-muted text-charcoal">{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {expandedCorrelation === cc.id ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SCENARIOS */}
      {activeTab === 'scenarios' && (
        <div className="space-y-4">
          <p className="text-[15px] text-muted-foreground leading-relaxed">What happens under each decision path — cost, delivery, and quality modeled simultaneously.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {scenarioOutcomes.map((sc, i) => {
              const isRecommended = sc.scenario === 'Full Remediation';
              return (
                <div key={i} className={cn(
                  " border p-5 space-y-4 bg-white",
                  isRecommended ? "border-accent/30 bg-accent/5" : "border-border"
                )}>
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-medium text-foreground">{sc.scenario}</span>
                    {isRecommended && (
                      <span className="text-[12px] px-2 py-0.5 rounded-full bg-accent/15 text-accent font-semibold uppercase tracking-wider">Recommended</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[12px] uppercase tracking-wider text-muted-foreground font-semibold">Delay</span>
                      <p className="text-[24px] font-mono font-light tabular-nums text-foreground">+{sc.deliveryDelay}d</p>
                    </div>
                    <div>
                      <span className="text-[12px] uppercase tracking-wider text-muted-foreground font-semibold">Cost</span>
                      <p className="text-[24px] font-mono font-light tabular-nums" style={{ color: sc.costImpact > 200000 ? 'hsl(0, 48%, 46%)' : sc.costImpact > 100000 ? 'hsl(24, 72%, 63%)' : 'hsl(155, 24%, 55%)' }}>
                        €{(sc.costImpact / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{sc.qualityRisk}</p>
                  <p className="text-[14px] font-medium" style={{ color: isRecommended ? 'hsl(155, 24%, 55%)' : 'hsl(135, 8%, 52%)' }}>{sc.recommendation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
