import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { reportMeta, kpis, stations, allNCRs, costImpactData } from "@/data/auditReportData";
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
import { Menu, X, Sparkles, AlertTriangle, Clock } from "lucide-react";
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
  go: '#6EA996',
  conditional: '#E39B5C',
  hold: '#AD3D3D',
  nogo: '#AD3D3D',
};

export default function AuditReport() {
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

  // Find worst station
  const worstStation = stations.find(s => s.health === 'red' && s.index >= 2 && s.index <= 9)
    || stations.find(s => s.health === 'amber' && s.index >= 2 && s.index <= 9);

  // Find next NCR station from current position
  const nextNCRStation = useMemo(() => {
    const stationsWithNCRs = stations.filter(s => s.ncrs.length > 0 && s.index > activeStation);
    return stationsWithNCRs[0] || stations.find(s => s.ncrs.length > 0);
  }, [activeStation]);

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
          // Track reviewed stations
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

  // Keyboard navigation
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

  const verdictBandColor = verdictColors[reportMeta.verdict] || '#E39B5C';

  return (
    <>
    <Navigation />
    <div className="h-[100dvh] flex bg-white text-[#0A0A0A] pt-16" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 w-[280px] bg-white border-r border-[#E5E7EB]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
              <span className="text-[13px] font-semibold text-[#0A0A0A]">Document Outline</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1"><X className="w-4 h-4 text-[#C0C0C0]" /></button>
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
          className="w-[260px] xl:w-[280px] shrink-0 border-r border-[#E5E7EB] bg-white"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Verdict color band */}
        <div className={cn(
          "h-[2px] transition-all duration-300",
          scrolledPastHero ? "opacity-100" : "opacity-0"
        )} style={{ background: verdictBandColor }} />

        {/* Top document bar */}
        <div className={cn(
          "sticky top-0 z-40 bg-[#0A0A0A] transition-all duration-300",
          scrolledPastHero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}>
          <div className="flex items-center justify-between px-4 md:px-6 h-12">
            <div className="flex items-center gap-4">
              {isMobile && (
                <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-[#1A1A1A]">
                  <Menu className="w-4 h-4 text-[#C0C0C0]" />
                </button>
              )}
              <span className="text-[11px] font-semibold text-[#6EA996] tracking-wider">yvoo+</span>
              <span className="text-[11px] text-[#7B8E80]">SCANPRO+ · ATLAS AI</span>
              <span className="text-[11px] text-[#C0C0C0]">/</span>
              <span className="text-[12px] text-[#F5F5F5] font-medium">{reportMeta.supplier}</span>
              <span className="text-[11px] font-medium text-[#E39B5C] ml-2">{reportMeta.verdictLabel}</span>
              <span className="text-[11px] text-[#7B8E80]">· {allNCRs.length} NCRs</span>

              {/* Station heatmap strip */}
              <div className="hidden md:flex items-center gap-2 ml-2 pl-2 border-l border-[#1A1A1A]">
                <StationHeatmap activeStation={activeStation} onStationClick={scrollToStation} />
              </div>

              {/* Breadcrumb progress */}
              <div className="hidden lg:flex items-center gap-1.5 ml-2 pl-2 border-l border-[#1A1A1A]">
                <span className="text-[10px] font-mono text-[#7B8E80] tabular-nums">
                  Reviewed {reviewedStations.size}/{totalStations}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Reading progress + time */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#7B8E80] tabular-nums">{readingProgress}%</span>
                <span className="text-[10px] text-[#7B8E80] flex items-center gap-1">
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
                        className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold text-[#AD3D3D] bg-[#AD3D3D]/10 hover:bg-[#AD3D3D]/20 transition-colors uppercase tracking-wider"
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

              <div className="flex items-center border border-[#1A1A1A] overflow-hidden">
                {(['executive', 'standard', 'full'] as DepthLevel[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setDepth(d)}
                    className={cn(
                      "px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors",
                      depth === d ? "bg-[#0A7FA5] text-white" : "text-[#7B8E80] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]"
                    )}
                  >
                    {depthLabels[d]}
                  </button>
                ))}
              </div>
              <button className="hidden md:block px-3 py-1.5 text-[11px] font-medium text-[#F5F5F5] border border-[#7B8E80] hover:bg-[#1A1A1A] transition-colors">
                Export pdf
              </button>
              <button className="hidden lg:block px-3 py-1.5 text-[11px] font-medium text-[#F5F5F5] border border-[#7B8E80] hover:bg-[#1A1A1A] transition-colors">
                Print
              </button>
              <button
                onClick={() => setInspectorOpen(!inspectorOpen)}
                className="px-4 py-1.5 text-[11px] font-semibold text-[#0A0A0A] bg-[#6EA996] hover:bg-[#5E9B87] transition-colors"
              >
                Sign off ({allNCRs.filter(n => n.status === 'open').length})
              </button>
            </div>
          </div>
          {/* Reading progress bar */}
          <div className="h-[2px] bg-[#1A1A1A]">
            <div className="h-full bg-[#0A7FA5] transition-all duration-150" style={{ width: `${readingProgress}%` }} />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 flex overflow-hidden">
          <div ref={contentRef} className="flex-1 overflow-y-auto bg-white">
            <div className="max-w-[960px] mx-auto px-4 md:px-8">
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
              />

              {/* Atlas Risk Score */}
              <AtlasRiskScore />

              <section className="py-16 md:py-24">
                <KPIBand kpis={kpis} />
              </section>

              <ExecutiveRadarCharts />

              <AuditScopeSection />

              {/* Anomaly callouts */}
              <AnomalyCallouts />

              <div className="space-y-16 md:space-y-24 pb-16 mt-16">
                {displayStations.map((station) => (
                  <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                ))}
                <NCRRegister ncrs={allNCRs} />
                
                {/* Cost waterfall chart */}
                <CostWaterfallChart />

                {/* CAPA Gantt Timeline */}
                <CAPAGantt />

                <AtlasIntelligence />
                <div id="machine-park">
                  <MachineParkIntelligence />
                </div>
                <DelayForecast />
                <RecommendationSection />
                <EvidenceVault />
              </div>

              {/* Ask Atlas */}
              <div className="sticky bottom-4 z-30 mb-8">
                <div className="max-w-[640px] mx-auto flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] bg-white/95 backdrop-blur-sm shadow-lg">
                  <Sparkles className="w-4 h-4 text-[#0A7FA5] shrink-0" />
                  <input
                    value={askAtlasInput}
                    onChange={e => setAskAtlasInput(e.target.value)}
                    placeholder="Ask Atlas about this audit..."
                    className="flex-1 bg-transparent text-[14px] text-[#0A0A0A] placeholder:text-[#C0C0C0] outline-none"
                  />
                  <button className="px-3 py-1 text-[12px] font-medium text-[#0A7FA5] hover:bg-[#0A7FA5]/5 transition-colors">
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
    </>
  );
}
