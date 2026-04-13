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
import { Menu, X, Sparkles, AlertTriangle, Clock, Download, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/Navigation";

const depthLabels: Record<DepthLevel, string> = {
  executive: 'Executive',
  standard: 'Standard',
  full: 'Full Detail',
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
  const [inspectorOpen, setInspectorOpen] = useState(false);
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
      setScrolledPastHero(container.scrollTop > window.innerHeight * 0.5);
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
        case 'ArrowDown': case 'j':
          e.preventDefault(); scrollToStation(Math.min(activeStation + 1, 14)); break;
        case 'ArrowUp': case 'k':
          e.preventDefault(); scrollToStation(Math.max(activeStation - 1, 1)); break;
        case 'd': case 'D':
          e.preventDefault();
          setDepth(prev => prev === 'executive' ? 'standard' : prev === 'standard' ? 'full' : 'executive');
          break;
        case 'n': case 'N':
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
    <div className="h-[100dvh] flex flex-col text-foreground pt-16" style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* ── Top bar — dark premium shell ─────────────────────── */}
      <div className="h-12 flex items-center px-5 flex-shrink-0" style={{ background: 'hsl(220, 20%, 10%)', borderBottom: '1px solid hsl(220, 14%, 18%)' }}>
        <div className="flex items-center gap-4">
          {isMobile && (
            <button onClick={() => setSidebarOpen(true)} className="p-1.5">
              <Menu className="w-5 h-5 text-white/60" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary flex items-center justify-center">
              <span className="text-white text-[8px] font-black tracking-tight">Y+</span>
            </div>
            <span className="text-[13px] font-semibold text-white/90">ScanPro+</span>
          </div>
          <div className="h-5 w-px bg-white/10" />
          <span className="text-[13px] text-white/70">{reportMeta.supplier}</span>
          <span className="text-[11px] px-2 py-0.5 font-semibold uppercase tracking-wider" style={{
            background: `${verdictBandColor}20`,
            color: verdictBandColor,
          }}>
            {reportMeta.verdictLabel}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Station health strip */}
          <div className="hidden lg:flex items-center gap-1">
            <StationHeatmap activeStation={activeStation} onStationClick={scrollToStation} />
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[12px] text-white/50">
            <span className="font-mono tabular-nums">{readingProgress}%</span>
          </div>

          {/* Depth toggle */}
          <div className="flex" style={{ border: '1px solid hsl(220, 14%, 22%)' }}>
            {(['executive', 'standard', 'full'] as DepthLevel[]).map(d => (
              <button
                key={d}
                onClick={() => setDepth(d)}
                className={cn(
                  "px-3 py-1.5 text-[11px] font-medium transition-colors cursor-pointer",
                  depth === d
                    ? "bg-primary text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
              >
                {depthLabels[d]}
              </button>
            ))}
          </div>

          <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white/90 transition-colors cursor-pointer" style={{ border: '1px solid hsl(220, 14%, 22%)' }}>
            <Download className="w-3.5 h-3.5" />
            Export
          </button>

          {worstStation && (
            <button
              onClick={() => scrollToStation(worstStation.index)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold cursor-pointer transition-colors"
              style={{ background: 'hsl(0, 48%, 46%, 0.2)', color: 'hsl(0, 48%, 55%)', border: '1px solid hsl(0, 48%, 46%, 0.3)' }}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Jump to critical
            </button>
          )}

          <button
            onClick={() => setInspectorOpen(!inspectorOpen)}
            className="px-4 py-1.5 text-[11px] font-semibold text-white bg-primary cursor-pointer hover:bg-primary/90 transition-colors"
          >
            Sign off · {openNCRs} open
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <div className="h-[2px] flex-shrink-0" style={{ background: 'hsl(220, 14%, 15%)' }}>
        <div className="h-full bg-primary transition-all duration-200 ease-out" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* ── Main layout ─────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden" style={{ background: 'hsl(220, 14%, 96%)' }}>

        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10 w-[300px]" style={{ background: 'hsl(220, 18%, 13%)' }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid hsl(220, 14%, 20%)' }}>
                <span className="text-[14px] font-semibold text-white/90">Report outline</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1"><X className="w-5 h-5 text-white/40" /></button>
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
            className="w-[260px] xl:w-[280px] shrink-0"
          />
        )}

        {/* Center document area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex overflow-hidden">
            <div ref={contentRef} className="flex-1 overflow-y-auto">
              {/* White document canvas with generous padding */}
              <div className="max-w-[880px] mx-auto px-6 md:px-12 lg:px-16">

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

                <AtlasRiskScore />

                <section className="py-12 md:py-16">
                  <KPIBand kpis={kpis} />
                </section>

                <ExecutiveRadarCharts />

                <AuditScopeSection />

                <AnomalyCallouts />

                {/* ── Process findings ─────────────────────── */}
                <div className="mt-16 mb-8">
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'hsl(0,0%,45%)' }}>Process Audit Findings</h2>
                    <div className="flex-1 h-px" style={{ background: 'hsl(0,0%,85%)' }} />
                    <span className="text-[12px] font-medium" style={{ color: 'hsl(0,0%,55%)' }}>{displayStations.length} stations · {reviewedStations.size} reviewed</span>
                  </div>
                </div>

                <div className="space-y-12 md:space-y-16 pb-16">
                  {displayStations.map((station) => (
                    <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                  ))}

                  {/* ── Back matter ─────────────────────── */}
                  <div className="pt-8">
                    <div className="flex items-center gap-4 mb-10">
                      <h2 className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'hsl(0,0%,45%)' }}>Analysis & Actions</h2>
                      <div className="flex-1 h-px" style={{ background: 'hsl(0,0%,85%)' }} />
                    </div>
                  </div>

                  <NCRRegister ncrs={allNCRs} />
                  <FindingSankeyDiagram />
                  <CostWaterfallChart />
                  <CAPAGantt />
                  <AtlasIntelligence />

                  <div id="machine-park">
                    <OEEGaugeCluster />
                    <div className="mt-12">
                      <MachineParkIntelligence />
                    </div>
                  </div>

                  <DelayForecast />
                  <RecommendationSection />
                  <EvidenceVault />
                </div>

                {/* Ask Atlas — floating bar */}
                <div className="sticky bottom-6 z-30 mb-10">
                  <div className="max-w-[600px] mx-auto flex items-center gap-3 px-4 py-3 shadow-lg" style={{ background: 'hsl(220, 18%, 13%)', border: '1px solid hsl(220, 14%, 22%)' }}>
                    <Sparkles className="w-4 h-4 text-primary shrink-0" />
                    <input
                      value={askAtlasInput}
                      onChange={e => setAskAtlasInput(e.target.value)}
                      placeholder="Ask Atlas AI about this audit..."
                      className="flex-1 bg-transparent text-[13px] text-white/90 placeholder:text-white/30 outline-none"
                    />
                    <button className="px-4 py-1.5 text-[11px] font-semibold bg-primary text-white cursor-pointer hover:bg-primary/90 transition-colors">
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