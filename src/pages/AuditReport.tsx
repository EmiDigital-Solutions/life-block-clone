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
import { Menu, X, Sparkles, AlertTriangle, Clock, Search } from "lucide-react";
import VDA63ScoringTable from "@/components/audit-report/VDA63ScoringTable";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [askAtlasInput, setAskAtlasInput] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [reviewedStations, setReviewedStations] = useState<Set<number>>(new Set());
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

  return (
    <>
    <Navigation />
    {/* Outer app shell — Premium Enterprise SaaS */}
    <div className={cn("h-[100dvh] flex flex-col text-foreground pt-16", depth === 'executive' && 'insights-dark')} style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Window title bar */}
      <div className="h-8 flex items-center px-3 border-b flex-shrink-0" style={{ background: depth === 'executive' ? 'hsl(210,20%,4%,0.82)' : 'hsl(220,14%,96%)', borderColor: depth === 'executive' ? 'hsl(0,0%,100%,0.06)' : 'hsl(220,13%,89%)' }}>
        <span className="text-[10px] font-medium" style={{ color: depth === 'executive' ? 'hsl(215,6%,45%)' : 'hsl(220,10%,40%)' }}>
          SCANPRO+ Audit Report — {reportMeta.supplier} · {reportMeta.po} · {allNCRs.length} NCRs
        </span>
        <div className="ml-auto flex gap-1">
          {(['Report', 'Evidence', 'CAPA'] as const).map((label, i) => (
            <button
              key={i}
              className={cn(
                "px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider transition-colors cursor-pointer",
                i === 0 ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'
              )}
              style={i !== 0 ? { background: depth === 'executive' ? 'hsl(214,18%,8%)' : 'hsl(220,14%,90%)' } : undefined}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content area — three-column layout */}
      <div className="flex-1 flex overflow-hidden bg-background">
        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10 w-[280px]" style={{ background: 'hsl(0,0%,97%)' }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid hsl(0,0%,90%)' }}>
                <span className="text-[13px] font-semibold text-foreground">Document Outline</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1"><X className="w-4 h-4 text-white/50" /></button>
              </div>
              <ReportSidebar activeStation={activeStation} onStationClick={scrollToStation} onScrollToId={scrollToId} />
            </div>
          </div>
        )}

        {/* Desktop sidebar — dark panel */}
        {!isMobile && (
          <ReportSidebar
            activeStation={activeStation}
            onStationClick={scrollToStation}
            onScrollToId={scrollToId}
            className="w-[220px] xl:w-[260px] shrink-0"
          />
        )}

        {/* Center content */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Verdict color band */}
          <div className={cn(
            "h-[2px] transition-all duration-300",
            scrolledPastHero ? "opacity-100" : "opacity-0"
          )} style={{ background: verdictBandColor }} />

          {/* Toolbar — matches SupplierDatabaseDemo toolbar */}
          <div className={cn(
            "sticky top-0 z-40 transition-all duration-300",
            scrolledPastHero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          )} style={{ background: depth === 'executive' ? 'hsl(210,20%,4%,0.82)' : 'hsl(220,14%,96%)', borderBottom: depth === 'executive' ? '1px solid hsl(0,0%,100%,0.06)' : '1px solid hsl(220,13%,89%)', backdropFilter: depth === 'executive' ? 'blur(20px)' : undefined }}>
            <div className="flex items-center justify-between px-3 h-10">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-muted transition-colors">
                    <Menu className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">yvoo+</span>
                <span className="text-[10px] text-muted-foreground">SCANPRO+ · ATLAS AI</span>
                <span className="text-[10px] text-border">|</span>
                <span className="text-[11px] font-medium text-foreground">{reportMeta.supplier}</span>
                <span className="text-[10px] font-semibold text-warning ml-1">{reportMeta.verdictLabel}</span>
                <span className="text-[10px] text-muted-foreground">· {allNCRs.length} NCRs</span>

                {/* Station heatmap strip */}
                <div className="hidden md:flex items-center gap-2 ml-2 pl-2 border-l border-border">
                  <StationHeatmap activeStation={activeStation} onStationClick={scrollToStation} />
                </div>

                {/* Breadcrumb progress */}
                <div className="hidden lg:flex items-center gap-1.5 ml-2 pl-2 border-l border-border">
                  <span className="text-[10px] font-mono tabular-nums text-muted-foreground">
                    Reviewed {reviewedStations.size}/{totalStations}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Reading progress + time */}
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-[10px] font-mono tabular-nums text-muted-foreground">{readingProgress}%</span>
                  <span className="text-[10px] flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {readingTimeEstimates[depth]}
                  </span>
                </div>

                {/* Jump to worst */}
                {worstStation && (
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => scrollToStation(worstStation.index)}
                          className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-semibold text-destructive uppercase tracking-wider cursor-pointer"
                          style={{ background: 'hsl(0, 48%, 46%, 0.12)' }}
                        >
                          <AlertTriangle className="w-3 h-3" />
                          Worst
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-[11px]">
                        Jump to {worstStation.name} — lowest scoring station
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {/* Depth toggle — matches SupplierDatabaseDemo filter buttons */}
                <div className="flex gap-px">
                  {(['executive', 'standard', 'full'] as DepthLevel[]).map(d => (
                    <button
                      key={d}
                      onClick={() => setDepth(d)}
                      className={cn(
                        "px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider transition-colors cursor-pointer",
                        depth === d ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {depthLabels[d]}
                    </button>
                  ))}
                </div>
                <button className="hidden md:block px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider cursor-pointer bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
                  Export pdf
                </button>
                <button
                  onClick={() => setInspectorOpen(!inspectorOpen)}
                  className="px-3 py-1 text-[9px] font-semibold text-white bg-primary uppercase tracking-wider cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  Sign off ({allNCRs.filter(n => n.status === 'open').length})
                </button>
              </div>
            </div>
            {/* Reading progress bar */}
            <div className="h-[2px] bg-border">
              <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readingProgress}%` }} />
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 flex overflow-hidden">
            <div ref={contentRef} className="flex-1 overflow-y-auto">
              <div className={cn("mx-auto", depth === 'executive' ? "max-w-[1100px] px-4 md:px-6" : "max-w-[960px] px-4 md:px-8")}>
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
                    {/* VDA 6.3 structured document flow */}
                    <AuditScopeSection depth={depth} />
                    <VDA63ScoringTable />

                    <section className="py-2">
                      <KPIBand kpis={kpis} depth={depth} />
                    </section>

                    <AnomalyCallouts depth={depth} />

                    <div className="space-y-3 mt-4 pb-16">
                      {/* §3–§9 Station findings */}
                      {displayStations.map((station) => (
                        <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                      ))}

                      {/* §10 NCR Register */}
                      <NCRRegister ncrs={allNCRs} depth={depth} />

                      {/* §11 Appendices */}
                      <FindingSankeyDiagram depth="executive" />
                      <CostWaterfallChart depth="executive" />
                      <OEEGaugeCluster depth="executive" />
                    </div>
                  </>
                ) : (
                  <>
                    <AtlasRiskScore depth={depth} />

                    <section className="py-16 md:py-24">
                      <KPIBand kpis={kpis} depth={depth} />
                    </section>

                    <ExecutiveRadarCharts depth={depth} />
                    <AuditScopeSection depth={depth} />
                    <AnomalyCallouts depth={depth} />

                    <div className="pb-16 space-y-16 md:space-y-24 mt-16">
                      {displayStations.map((station) => (
                        <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                      ))}
                      <NCRRegister ncrs={allNCRs} depth={depth} />
                      <FindingSankeyDiagram />
                      <CostWaterfallChart />
                      <CAPAGantt />
                      <AtlasIntelligence />
                      <div id="machine-park">
                        <OEEGaugeCluster />
                        <div className="mt-16">
                          <MachineParkIntelligence />
                        </div>
                      </div>
                      <DelayForecast />
                      <RecommendationSection />
                      <EvidenceVault />
                    </div>
                  </>
                )}

                {/* Ask Atlas — toolbar style */}
                <div className="sticky bottom-4 z-30 mb-8">
                  <div className="max-w-[640px] mx-auto flex items-center gap-2 px-3 py-2 bg-card border border-border shadow-sm">
                    <Sparkles className="w-4 h-4 text-primary shrink-0" />
                    <input
                      value={askAtlasInput}
                      onChange={e => setAskAtlasInput(e.target.value)}
                      placeholder="Ask Atlas about this audit..."
                      className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground outline-none"
                    />
                    <button className="px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider bg-primary text-white cursor-pointer hover:bg-primary/90 transition-colors">
                      Ask
                    </button>
                  </div>
                </div>
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
    </>
  );
}