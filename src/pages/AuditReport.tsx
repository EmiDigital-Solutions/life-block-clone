import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuditReport } from "@/hooks/useAuditReport";
import { AuditReportProvider, useAuditReportContext } from "@/contexts/AuditReportContext";
import type { DepthLevel } from "@/data/auditReportData";
import ReportSidebar from "@/components/audit-report/ReportSidebar";
import ReportHero from "@/components/audit-report/ReportHero";
import KPIBand from "@/components/audit-report/KPIBand";
import StationCard from "@/components/audit-report/StationCard";
import NCRRegister from "@/components/audit-report/NCRRegister";
import DelayForecast from "@/components/audit-report/DelayForecast";
import AtlasIntelligence from "@/components/audit-report/AtlasIntelligence";
import RecommendationSection from "@/components/audit-report/RecommendationSection";
import EvidenceVault from "@/components/audit-report/EvidenceVault";
import FindingSankeyDiagram from "@/components/audit-report/FindingSankeyDiagram";
import OEEGaugeCluster from "@/components/audit-report/OEEGaugeCluster";
import AuditScopeSection from "@/components/audit-report/AuditScopeSection";
import ExecutiveRadarCharts from "@/components/audit-report/ExecutiveRadarCharts";
import MachineParkIntelligence from "@/components/audit-report/MachineParkIntelligence";
import SectionInspector from "@/components/audit-report/SectionInspector";
import AtlasRiskScore from "@/components/audit-report/AtlasRiskScore";
import AnomalyCallouts from "@/components/audit-report/AnomalyCallouts";
import CostWaterfallChart from "@/components/audit-report/CostWaterfallChart";
import CAPAGantt from "@/components/audit-report/CAPAGantt";
import StationHeatmap from "@/components/audit-report/StationHeatmap";
import { Menu, X, AlertTriangle, Clock, FileDown, LayoutDashboard, ClipboardList, FileBarChart, BookOpenCheck, TrendingUp, ChevronRight, Sun, Moon, Share2, User } from "lucide-react";

const SW = 1.5;
import VDA63ScoringTable from "@/components/audit-report/VDA63ScoringTable";
import DocumentControlHeader from "@/components/audit-report/DocumentControlHeader";
import NormativeReferences from "@/components/audit-report/NormativeReferences";
import EvidenceTraceabilityMatrix from "@/components/audit-report/EvidenceTraceabilityMatrix";
import CSRComplianceMapping from "@/components/audit-report/CSRComplianceMapping";
import DigitalSignatureBlock from "@/components/audit-report/DigitalSignatureBlock";
import AskAtlasBar from "@/components/audit-report/AskAtlasBar";
import TrafficLightDashboard from "@/components/audit-report/TrafficLightDashboard";
import ActionChecklist from "@/components/audit-report/ActionChecklist";
import ProcurementBrief from "@/components/audit-report/ProcurementBrief";
import SmartReadingGuide from "@/components/audit-report/SmartReadingGuide";
import TrendComparison from "@/components/audit-report/TrendComparison";
import PFMEADrilldown from "@/components/audit-report/PFMEADrilldown";
import VoiceBriefing from "@/components/audit-report/VoiceBriefing";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { NCR } from "@/data/auditReportData";

const depthLabels: Record<DepthLevel, string> = {
  executive: 'Executive',
  standard: 'Standard',
  full: 'Full',
};

const readingTimeEstimates: Record<DepthLevel, string> = {
  executive: '~4 min',
  standard: '~12 min',
  full: '~28 min',
};

const verdictColors: Record<string, string> = {
  go: 'var(--ar-pass)',
  conditional: 'var(--ar-warn)',
  hold: 'var(--ar-fail)',
  nogo: 'var(--ar-fail)',
};

export default function AuditReport() {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('id');
  const { data: reportData, isLoading } = useAuditReport(reportId);

  return (
    <AuditReportProvider data={reportData} isLoading={isLoading}>
      <AuditReportInner />
    </AuditReportProvider>
  );
}

function AuditReportInner() {
  const { reportMeta, stations, kpis, allNCRs } = useAuditReportContext();

  const [activeStation, setActiveStation] = useState(1);
  const [depth, setDepth] = useState<DepthLevel>('standard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  
  const [readingProgress, setReadingProgress] = useState(0);
  const [reviewedStations, setReviewedStations] = useState<Set<number>>(new Set());
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [trendOpen, setTrendOpen] = useState(false);
  const [pfmeaNCR, setPfmeaNCR] = useState<NCR | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('audit_theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('audit_theme', theme);
  }, [theme]);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const displayStations = stations.filter(s => s.index >= 2 && s.index <= 9);
  const totalStations = displayStations.length;

  const worstStation = stations.find(s => s.health === 'red' && s.index >= 2 && s.index <= 9)
    || stations.find(s => s.health === 'amber' && s.index >= 2 && s.index <= 9);

  const nextNCRStation = useMemo(() => {
    const stationsWithNCRs = stations.filter(s => s.ncrs.length > 0 && s.index > activeStation);
    return stationsWithNCRs[0] || stations.find(s => s.ncrs.length > 0);
  }, [activeStation, stations]);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    const handleScroll = () => {
      setScrolledPastHero(container.scrollTop > window.innerHeight * 0.6);
      const scrollHeight = container.scrollHeight - container.clientHeight;
      if (scrollHeight > 0) {
        setReadingProgress(Math.round((container.scrollTop / scrollHeight) * 100));
      }
      const stationEls = container.querySelectorAll('[id^="station-"]');
      let current = 1;
      stationEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          const idx = parseInt(el.id.replace('station-', ''));
          current = idx;
          if (idx >= 2 && idx <= 9) {
            setReviewedStations(prev => new Set([...prev, idx]));
          }
        }
      });
      setActiveStation(current);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStation = useCallback((index: number) => {
    const el = document.getElementById(`station-${index}`);
    el?.scrollIntoView({ behavior: 'smooth' });
    setSidebarOpen(false);
  }, []);

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault();
          scrollToStation(Math.min(activeStation + 1, 14));
          break;
        case 'ArrowUp':
        case 'k':
          e.preventDefault();
          scrollToStation(Math.max(activeStation - 1, 1));
          break;
        case 'd':
        case 'D':
          e.preventDefault();
          setDepth(prev => prev === 'executive' ? 'standard' : 'executive');
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          if (nextNCRStation) scrollToStation(nextNCRStation.index);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStation, scrollToStation, nextNCRStation]);

  useEffect(() => {
    if (isMobile) setInspectorOpen(false);
  }, [isMobile]);

  const verdictBandColor = verdictColors[reportMeta.verdict] || 'hsl(24, 72%, 63%)';

  const openNCRs = allNCRs.filter(n => n.status === 'open').length;

  return (
    <>
    <Navigation />
    <div className="audit-report h-[100dvh] flex flex-col font-sans pt-16" style={{ background: 'var(--ar-bg-page)', color: 'var(--ar-tx-1)' }}>

      {/* ━━━ FULL-WIDTH STICKY HEADER — Rows 1 & 2 ━━━ */}
      <div className="sticky top-16 z-40">
        {/* Row 1: Brand strip — dark */}
        <div className="ar-header flex items-center justify-between px-5 h-12">
          <div className="flex items-center gap-3">
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-md transition-colors">
                <Menu className="w-5 h-5 text-white/70" />
              </button>
            )}
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50" style={{ fontFamily: "'Space Mono', monospace" }}>YVOO+</span>
            <span className="text-white/20">›</span>
            <span className="text-[12px] text-white/60">Audits</span>
            <span className="text-white/20">›</span>
            <span className="text-[12px] text-white/60">2026 Q2</span>
            <span className="text-white/20">›</span>
            <span className="text-[12px] text-white/90 font-medium">{reportMeta.supplier}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              className="p-1.5 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-white/50" /> : <Sun className="w-4 h-4 text-white/50" />}
            </button>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white/60" />
            </div>
          </div>
        </div>

        {/* Row 2: Document control strip */}
        <div className="ar-header-2 flex items-center justify-between px-5 h-14">
          <div className="flex items-center gap-6">
            {[
              { label: 'Document', value: reportMeta.po || 'SCP-26-0412' },
              { label: 'Rev.', value: '1.0' },
              { label: 'Standard', value: reportMeta.standard || 'VDA 6.3 · ISO 9001' },
              { label: 'Supplier', value: reportMeta.supplier },
              { label: 'Customer', value: reportMeta.client || 'BMW AG' },
            ].map(cell => (
              <div key={cell.label} className="hidden md:flex flex-col">
                <span className="ar-mono-label" style={{ color: 'rgba(255,255,255,0.35)' }}>{cell.label}</span>
                <span className="text-[12px] text-white/85 font-medium mt-0.5">{cell.value}</span>
              </div>
            ))}
            <div className="flex flex-col">
              <span className="ar-mono-label" style={{ color: 'rgba(255,255,255,0.35)' }}>Verdict</span>
              <span className="text-[12px] font-semibold mt-0.5" style={{
                color: reportMeta.verdict === 'go' ? 'var(--ar-pass)' : reportMeta.verdict === 'conditional' ? 'var(--ar-warn)' : 'var(--ar-fail)'
              }}>
                {reportMeta.verdictLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {}}
              className="p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4 text-white/50" />
            </button>
            <button
              onClick={() => {}}
              className="p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              title="Export"
            >
              <FileDown className="w-4 h-4 text-white/50" />
            </button>
            <button
              onClick={() => setInspectorOpen(!inspectorOpen)}
              disabled={openNCRs === 0}
              className="px-4 py-1.5 text-[12px] font-semibold rounded-md cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'var(--ar-cta)',
                color: '#FFFFFF',
              }}
            >
              Sign off {openNCRs > 0 && `(${openNCRs})`}
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10 w-[280px] bg-card">
              <div className="flex items-center justify-between px-4 py-3 " style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                <span className="text-[15px] font-semibold text-foreground">Document Outline</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1"><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <ReportSidebar activeStation={activeStation} onStationClick={scrollToStation} onScrollToId={scrollToId} />
            </div>
          </div>
        )}

        {/* Desktop sidebar */}
        {!isMobile && (
          <ReportSidebar
            activeStation={activeStation}
            onStationClick={scrollToStation}
            onScrollToId={scrollToId}
            className="w-[240px] xl:w-[280px] shrink-0"
          />
        )}

        {/* Center content column */}
        <div className="flex-1 flex flex-col min-w-0 relative">

          {/* Row 3: Toolbar */}
          <div className="sticky top-[168px] z-30">
            <div className="flex items-center justify-between px-5 h-11" style={{ background: 'var(--ar-bg-surface)', borderBottom: '1px solid var(--ar-bd-hair)' }}>
              <div className="flex items-center gap-1">
                {/* Depth toggle */}
                <div className="flex rounded-md overflow-hidden mr-1" style={{ border: '1px solid var(--ar-bd-line)' }}>
                  {(['executive', 'standard'] as DepthLevel[]).map(d => (
                    <button
                      key={d}
                      onClick={() => setDepth(d)}
                      className="px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer"
                      style={{
                        background: depth === d ? 'var(--ar-cta)' : 'var(--ar-bg-surface)',
                        color: depth === d ? '#fff' : 'var(--ar-tx-3)',
                      }}
                    >
                      {depthLabels[d]}
                    </button>
                  ))}
                </div>
                <VoiceBriefing />

                {/* Station heatmap */}
                <div className="hidden md:flex items-center gap-2 px-3" style={{ borderLeft: '1px solid var(--ar-bd-hair)' }}>
                  <StationHeatmap activeStation={activeStation} onStationClick={scrollToStation} />
                </div>

                {/* Jump to red findings */}
                {worstStation && (
                  <button
                    onClick={() => scrollToStation(worstStation.index)}
                    className="flex items-center gap-1 px-2 py-1 ml-2 text-[12px] font-medium cursor-pointer transition-colors hover:underline"
                    style={{ color: 'var(--ar-fail)' }}
                  >
                    Jump to red findings →
                  </button>
                )}
              </div>

              {/* Tool buttons — grouped */}
              <div className="hidden md:flex items-center gap-1">
                {/* Primary: Decision */}
                <button
                  onClick={() => setDashboardOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors cursor-pointer"
                  style={{ background: 'var(--ar-cta)', color: '#fff' }}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Decision
                </button>

                {/* Secondary: text tabs */}
                {[
                  { label: 'Brief', action: () => setBriefOpen(true) },
                  { label: 'Actions', action: () => setChecklistOpen(true) },
                  { label: 'Trend', action: () => setTrendOpen(true) },
                  { label: 'Guide', action: () => setGuideOpen(true) },
                ].map(({ label, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="px-2.5 py-1.5 text-[12px] font-medium transition-colors cursor-pointer hover:underline"
                    style={{ color: 'var(--ar-tx-3)' }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading progress bar */}
            <div className="h-[2px]" style={{ background: 'var(--ar-bd-hair)' }}>
              <div className="h-full transition-all duration-150" style={{ width: `${readingProgress}%`, background: 'var(--ar-accent)' }} />
            </div>
          </div>

          {/* ━━━ SCROLLABLE CONTENT ━━━ */}
          <div className="flex-1 flex overflow-hidden">
            <div ref={contentRef} className="flex-1 overflow-y-auto scroll-smooth">
              <div className={cn(
                "mx-auto py-8",
                depth === 'executive' ? "max-w-[1100px] px-8 md:px-16 lg:px-20" : "max-w-[1000px] px-8 md:px-12 lg:px-16"
              )}>
                <ReportHero
                  verdict={reportMeta.verdict}
                  verdictLabel={reportMeta.verdictLabel}
                  heroReason={reportMeta.heroReason}
                  supplier={reportMeta.supplier}
                  po={reportMeta.po}
                  auditor={reportMeta.auditor}
                  date={reportMeta.date}
                  location={reportMeta.location}
                  onDecide={() => setInspectorOpen(true)}
                  onWalk={() => scrollToStation(2)}
                  depth={depth}
                />

                {depth === 'executive' ? (
                  <div className="space-y-20 md:space-y-24">
                    {/* §0 Document Control */}
                    <section className="space-y-10">
                      <DocumentControlHeader />
                      <NormativeReferences />
                    </section>

                    {/* §1 Audit Scope */}
                    <section>
                      <div className="mb-8 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§1</span>
                        <h2 className="ar-h2">Audit Scope & VDA Scoring</h2>
                        <p className="ar-lede">Assessment framework, process element definitions, and weighted scoring methodology</p>
                      </div>
                      <div className="space-y-10">
                        <AuditScopeSection depth={depth} />
                        <VDA63ScoringTable />
                      </div>
                    </section>

                    {/* §2 Key Performance Indicators */}
                    <section>
                      <div className="mb-8 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§2</span>
                        <h2 className="ar-h2">Key Performance Indicators</h2>
                        <p className="ar-lede">Quantitative metrics derived from station audits and NCR analysis</p>
                      </div>
                      <KPIBand kpis={kpis} depth={depth} />
                      <div className="mt-10">
                        <AnomalyCallouts depth={depth} />
                      </div>
                    </section>

                    {/* §3 CSR Compliance */}
                    <section>
                      <div className="mb-8 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§3</span>
                        <h2 className="ar-h2">CSR Compliance Mapping</h2>
                        <p className="ar-lede">Customer-specific requirements traceability and conformance status</p>
                      </div>
                      <CSRComplianceMapping depth="executive" />
                    </section>

                    {/* §4 Process Audit Findings */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§4 – §11</span>
                        <h2 className="ar-h2">Process Audit Findings</h2>
                        <p className="ar-lede">{displayStations.length} stations audited per VDA 6.3 process element structure</p>
                      </div>
                      <div className="space-y-14">
                        {displayStations.map((station) => (
                          <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                        ))}
                      </div>
                    </section>

                    {/* §12 NCR Register */}
                    <section id="station-10">
                      <div className="mb-8 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§12</span>
                        <h2 className="ar-h2">Non-Conformance Register</h2>
                        <p className="ar-lede">Complete NCR listing with severity, ownership, and resolution status</p>
                      </div>
                      <NCRRegister ncrs={allNCRs} depth={depth} />
                    </section>

                    {/* §13 Evidence Traceability */}
                    <section id="evidence-matrix">
                      <div className="mb-8 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§13</span>
                        <h2 className="ar-h2">Evidence Traceability</h2>
                        <p className="ar-lede">Audit trail linking findings to photographic, documentary, and measurement evidence</p>
                      </div>
                      <EvidenceTraceabilityMatrix depth="executive" />
                    </section>

                    {/* §14 Analytics & Appendices */}
                    <section id="station-11">
                      <div className="mb-8 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§14</span>
                        <h2 className="ar-h2">Analytics & Cost Analysis</h2>
                        <p className="ar-lede">Resolution pipeline, cost waterfall, and operational efficiency metrics</p>
                      </div>
                      <div className="space-y-14">
                        <FindingSankeyDiagram depth="executive" />
                        <CostWaterfallChart depth="executive" />
                        <OEEGaugeCluster depth="executive" />
                      </div>
                    </section>

                    {/* §15 CAPA Timeline */}
                    <section id="station-12">
                      <div className="mb-8 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§15</span>
                        <h2 className="ar-h2">CAPA Action Plan</h2>
                        <p className="ar-lede">Corrective and preventive action timeline with ownership tracking</p>
                      </div>
                      <CAPAGantt />
                    </section>

                    {/* §16 Delay Forecast */}
                    <section id="station-13">
                      <div className="mb-8 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§16</span>
                        <h2 className="ar-h2">Delay & Risk Forecast</h2>
                        <p className="ar-lede">Predictive analysis of delivery timeline risks and mitigation scenarios</p>
                      </div>
                      <DelayForecast />
                    </section>

                    {/* §17 Approval & Sign-Off */}
                    <section id="signatures" className="pb-24">
                      <div className="mb-8 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <span className="ar-eyebrow">§17</span>
                        <h2 className="ar-h2">Approval & Digital Sign-Off</h2>
                        <p className="ar-lede">Multi-party approval workflow with digital signature verification</p>
                      </div>
                      <DigitalSignatureBlock />
                    </section>
                  </div>
                ) : (
                  <div className="space-y-20 md:space-y-28">
                    {/* Risk Score */}
                    <section>
                      <AtlasRiskScore depth={depth} />
                    </section>

                    {/* KPIs */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Key Performance Indicators</h2>
                        <p className="ar-lede">Quantitative metrics from station audits and NCR analysis</p>
                      </div>
                      <KPIBand kpis={kpis} depth={depth} />
                    </section>

                    {/* Radar Charts */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Gap Analysis</h2>
                        <p className="ar-lede">Manufacturing capability and commercial readiness assessment</p>
                      </div>
                      <ExecutiveRadarCharts depth={depth} />
                    </section>

                    {/* Scope */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Audit Scope</h2>
                        <p className="ar-lede">Assessment boundaries, standards applied, and sampling methodology</p>
                      </div>
                      <AuditScopeSection depth={depth} />
                      <div className="mt-12">
                        <AnomalyCallouts depth={depth} />
                      </div>
                    </section>

                    {/* Station Findings */}
                    <section>
                      <div className="mb-12 pb-4 " style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Process Audit Findings</h2>
                        <p className="ar-lede">{displayStations.length} stations · VDA 6.3 process element scoring</p>
                      </div>
                      <div className="space-y-16 md:space-y-20">
                        {displayStations.map((station) => (
                          <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                        ))}
                      </div>
                    </section>

                    {/* NCR Register */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Non-Conformance Register</h2>
                        <p className="ar-lede">Complete NCR listing with severity classification and resolution tracking</p>
                      </div>
                      <NCRRegister ncrs={allNCRs} depth={depth} />
                    </section>

                    {/* Evidence */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Evidence Traceability</h2>
                        <p className="ar-lede">Finding-to-evidence chain with photographic and documentary references</p>
                      </div>
                      <EvidenceTraceabilityMatrix depth={depth} />
                    </section>

                    {/* CSR Compliance */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">CSR Compliance</h2>
                        <p className="ar-lede">Customer-specific requirements mapping and conformance assessment</p>
                      </div>
                      <CSRComplianceMapping depth={depth} />
                    </section>

                    {/* Analytics */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Analytics & Cost Analysis</h2>
                        <p className="ar-lede">Resolution pipeline, cost exposure waterfall, and financial risk quantification</p>
                      </div>
                      <div className="space-y-16">
                        <FindingSankeyDiagram />
                        <CostWaterfallChart />
                      </div>
                    </section>

                    {/* CAPA & Intelligence */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">CAPA & Atlas Intelligence</h2>
                        <p className="ar-lede">Corrective actions, AI-powered risk scoring, and predictive analytics</p>
                      </div>
                      <div className="space-y-16">
                        <CAPAGantt />
                        <AtlasIntelligence />
                      </div>
                    </section>

                    {/* Machine Park */}
                    <section id="machine-park">
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Machine Park Intelligence</h2>
                        <p className="ar-lede">Equipment capability, OEE analysis, and maintenance posture</p>
                      </div>
                      <div className="space-y-16">
                        <OEEGaugeCluster />
                        <MachineParkIntelligence />
                      </div>
                    </section>

                    {/* Forecast & Recommendations */}
                    <section>
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Risk Forecast & Recommendations</h2>
                        <p className="ar-lede">Delivery timeline predictions, expert recommendations, and evidence vault</p>
                      </div>
                      <div className="space-y-16">
                        <DelayForecast />
                        <RecommendationSection />
                        <EvidenceVault />
                      </div>
                    </section>

                    {/* Sign-Off */}
                    <section className="pb-24">
                      <div className="mb-10 pb-4" style={{ borderBottom: "1px solid var(--ar-bd-hair)" }}>
                        <h2 className="ar-h2">Approval & Digital Sign-Off</h2>
                        <p className="ar-lede">Multi-party approval workflow with digital signature verification</p>
                      </div>
                      <DigitalSignatureBlock />
                    </section>
                  </div>
                )}

                {/* Ask Atlas FAB rendered outside content flow */}
              </div>
            </div>

            {!isMobile && (
              <SectionInspector
                activeStation={activeStation}
                isOpen={inspectorOpen}
                onClose={() => setInspectorOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Modals */}
    <TrafficLightDashboard open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
    <ActionChecklist open={checklistOpen} onClose={() => setChecklistOpen(false)} />
    <ProcurementBrief open={briefOpen} onClose={() => setBriefOpen(false)} />
    <SmartReadingGuide open={guideOpen} onClose={() => setGuideOpen(false)} onScrollToId={scrollToId} />
    <TrendComparison open={trendOpen} onClose={() => setTrendOpen(false)} />
    <PFMEADrilldown ncr={pfmeaNCR} onClose={() => setPfmeaNCR(null)} />
    <AskAtlasBar activeStation={activeStation} />
    </>
  );
}