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
import { Menu, X, Sparkles, AlertTriangle, Clock, Search, FileText, Download, BarChart3, ListChecks, BookOpen, Volume2, TrendingUp, Zap, ChevronRight } from "lucide-react";
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
  go: 'hsl(155, 24%, 55%)',
  conditional: 'hsl(24, 72%, 63%)',
  hold: 'hsl(0, 48%, 46%)',
  nogo: 'hsl(0, 48%, 46%)',
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
          setDepth(prev => prev === 'executive' ? 'standard' : prev === 'standard' ? 'full' : 'executive');
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
    <div className="h-[100dvh] flex flex-col text-foreground pt-16 font-sans bg-background">

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10 w-[280px] bg-card">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
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

          {/* ━━━ STICKY HEADER — Two-tier clean design ━━━ */}
          <div className={cn(
            "sticky top-0 z-40 transition-all duration-300 bg-card border-b border-border",
            scrolledPastHero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          )}>
            {/* Row 1: Identity + Verdict + Core Actions */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-border/40">
              <div className="flex items-center gap-4">
                {isMobile && (
                  <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-muted rounded-md transition-colors">
                    <Menu className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-bold uppercase tracking-wider text-primary">SCANPRO+</span>
                  <ChevronRight className="w-3.5 h-3.5 text-border" />
                  <span className="text-[15px] font-semibold text-foreground">{reportMeta.supplier}</span>
                </div>
                <div className="flex items-center gap-2 ml-1">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-wide",
                    reportMeta.verdict === 'go' && "bg-accent/15 text-accent",
                    reportMeta.verdict === 'conditional' && "bg-warning/15 text-warning",
                    (reportMeta.verdict === 'hold' || reportMeta.verdict === 'nogo') && "bg-destructive/15 text-destructive",
                  )}>
                    {reportMeta.verdictLabel}
                  </span>
                  <span className="text-[13px] text-muted-foreground font-medium">{allNCRs.length} NCRs</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Reading progress */}
                <div className="hidden lg:flex items-center gap-3 text-[13px] text-muted-foreground">
                  <span className="font-mono tabular-nums">{readingProgress}%</span>
                  <span className="text-border">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {readingTimeEstimates[depth]}
                  </span>
                  <span className="text-border">·</span>
                  <span className="font-mono tabular-nums">{reviewedStations.size}/{totalStations} stations</span>
                </div>

                {/* Sign off CTA */}
                <button
                  onClick={() => setInspectorOpen(!inspectorOpen)}
                  className="px-4 py-2 text-[13px] font-semibold text-primary-foreground bg-primary rounded-md uppercase tracking-wider cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  Sign off {openNCRs > 0 && `(${openNCRs})`}
                </button>
              </div>
            </div>

            {/* Row 2: Tools + Depth + Navigation */}
            <div className="flex items-center justify-between px-5 h-11">
              <div className="flex items-center gap-1">
                {/* Depth toggle */}
                <div className="flex rounded-md overflow-hidden border border-border mr-3">
                  {(['executive', 'standard', 'full'] as DepthLevel[]).map(d => (
                    <button
                      key={d}
                      onClick={() => setDepth(d)}
                      className={cn(
                        "px-3 py-1.5 text-[12px] font-medium uppercase tracking-wide transition-colors cursor-pointer",
                        depth === d ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {depthLabels[d]}
                    </button>
                  ))}
                </div>

                {/* Station heatmap */}
                <div className="hidden md:flex items-center gap-2 px-3 border-l border-border">
                  <StationHeatmap activeStation={activeStation} onStationClick={scrollToStation} />
                </div>

                {/* Jump to worst */}
                {worstStation && (
                  <button
                    onClick={() => scrollToStation(worstStation.index)}
                    className="flex items-center gap-1.5 px-3 py-1.5 ml-2 text-[12px] font-semibold text-destructive rounded-md cursor-pointer bg-destructive/8 hover:bg-destructive/15 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Jump to worst
                  </button>
                )}
              </div>

              {/* Tool buttons — clean icon + label */}
              <div className="hidden md:flex items-center gap-1">
                {[
                  { icon: Zap, label: 'Decision', action: () => setDashboardOpen(true), highlight: true },
                  { icon: FileText, label: 'Brief', action: () => setBriefOpen(true) },
                  { icon: ListChecks, label: 'Actions', action: () => setChecklistOpen(true) },
                  { icon: TrendingUp, label: 'Trend', action: () => setTrendOpen(true) },
                  { icon: BookOpen, label: 'Guide', action: () => setGuideOpen(true) },
                  { icon: Download, label: 'Export', action: () => {} },
                ].map(({ icon: Icon, label, action, highlight }) => (
                  <button
                    key={label}
                    onClick={action}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors cursor-pointer",
                      highlight
                        ? "bg-warning/10 text-warning hover:bg-warning/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
                <VoiceBriefing />
              </div>
            </div>

            {/* Reading progress bar */}
            <div className="h-[2px] bg-border/50">
              <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readingProgress}%` }} />
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
                  <>
                    {/* §0 Document Control */}
                    <div className="space-y-3 mt-4">
                      <DocumentControlHeader />
                      <NormativeReferences />
                    </div>

                    {/* §1 Audit Scope & VDA Scoring */}
                    <AuditScopeSection depth={depth} />
                    <VDA63ScoringTable />

                    <section className="py-2">
                      <KPIBand kpis={kpis} depth={depth} />
                    </section>

                    <AnomalyCallouts depth={depth} />

                    {/* §2 CSR Compliance */}
                    <CSRComplianceMapping depth="executive" />

                    <div className="space-y-3 mt-4 pb-16">
                      {/* §3–§9 Station findings */}
                      {displayStations.map((station) => (
                        <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                      ))}

                      {/* §10 NCR Register */}
                      <div id="station-10">
                        <NCRRegister ncrs={allNCRs} depth={depth} />
                      </div>

                      {/* §11 Evidence Traceability */}
                      <div id="evidence-matrix">
                        <EvidenceTraceabilityMatrix depth="executive" />
                      </div>

                      {/* §12 CSR Compliance */}
                      <div id="csr-mapping">
                        <CSRComplianceMapping depth="executive" />
                      </div>

                      {/* §13 Appendices */}
                      <div id="station-11">
                        <FindingSankeyDiagram depth="executive" />
                      </div>
                      <CostWaterfallChart depth="executive" />
                      <OEEGaugeCluster depth="executive" />

                      {/* §14 CAPA */}
                      <div id="station-12">
                        <CAPAGantt />
                      </div>

                      {/* §15 Delay Forecast */}
                      <div id="station-13">
                        <DelayForecast />
                      </div>

                      {/* §16 Approval & Sign-Off */}
                      <div id="signatures">
                        <DigitalSignatureBlock />
                      </div>

                      {/* §17 Revision — handled by DocumentControlHeader */}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-12">
                      <AtlasRiskScore depth={depth} />
                    </div>

                    {/* ── Section Divider ── */}
                    <div className="my-14 md:my-20 border-t border-border/60" />

                    <section className="py-8 md:py-12">
                      <KPIBand kpis={kpis} depth={depth} />
                    </section>

                    {/* ── Section Divider ── */}
                    <div className="my-14 md:my-20 border-t border-border/60" />

                    <ExecutiveRadarCharts depth={depth} />

                    {/* ── Section Divider ── */}
                    <div className="my-14 md:my-20 border-t border-border/60" />

                    <AuditScopeSection depth={depth} />

                    <div className="mt-10">
                      <AnomalyCallouts depth={depth} />
                    </div>

                    {/* ── Section Divider ── */}
                    <div className="my-14 md:my-20 border-t border-border/60" />

                    <div className="pb-24 space-y-16 md:space-y-24">
                      {displayStations.map((station) => (
                        <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                      ))}

                      {/* ── Section Divider ── */}
                      <div className="border-t border-border/60" />

                      <NCRRegister ncrs={allNCRs} depth={depth} />

                      <div className="border-t border-border/60" />

                      <EvidenceTraceabilityMatrix depth={depth} />

                      <div className="border-t border-border/60" />

                      <CSRComplianceMapping depth={depth} />

                      <div className="border-t border-border/60" />

                      <FindingSankeyDiagram />
                      <CostWaterfallChart />

                      <div className="border-t border-border/60" />

                      <CAPAGantt />
                      <AtlasIntelligence />

                      <div className="border-t border-border/60" />

                      <div id="machine-park">
                        <OEEGaugeCluster />
                        <div className="mt-16">
                          <MachineParkIntelligence />
                        </div>
                      </div>

                      <div className="border-t border-border/60" />

                      <DelayForecast />
                      <RecommendationSection />
                      <EvidenceVault />

                      <div className="border-t border-border/60" />

                      <DigitalSignatureBlock />
                    </div>
                  </>
                )}

                {/* Ask Atlas — Live AI Copilot */}
                <AskAtlasBar activeStation={activeStation} />
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
    </>
  );
}