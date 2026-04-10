import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { reportMeta, kpis, stations, allNCRs } from "@/data/auditReportData";
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
import SectionInspector from "@/components/audit-report/SectionInspector";
import { Menu, X, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const depthLabels: Record<DepthLevel, string> = {
  executive: 'Executive',
  standard: 'Standard',
  full: 'Full',
};

export default function AuditReport() {
  const [activeStation, setActiveStation] = useState(1);
  const [depth, setDepth] = useState<DepthLevel>('standard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [askAtlasInput, setAskAtlasInput] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    const handleScroll = () => {
      setScrolledPastHero(container.scrollTop > window.innerHeight * 0.6);
      const stationEls = container.querySelectorAll('[id^="station-"]');
      let current = 1;
      stationEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          current = parseInt(el.id.replace('station-', ''));
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

  useEffect(() => {
    if (isMobile) setInspectorOpen(false);
  }, [isMobile]);

  return (
    <div className="h-[100dvh] flex bg-white text-[#0A0A0A]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 w-[280px] bg-white border-r border-[#E5E7EB]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
              <span className="text-[13px] font-semibold text-[#0A0A0A]">Document Outline</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1"><X className="w-4 h-4 text-[#C0C0C0]" /></button>
            </div>
            <ReportSidebar activeStation={activeStation} onStationClick={scrollToStation} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
        <ReportSidebar
          activeStation={activeStation}
          onStationClick={scrollToStation}
          className="w-[260px] xl:w-[280px] shrink-0 border-r border-[#E5E7EB] bg-white"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top document bar — dark, matching reference image-8 */}
        <div className={cn(
          "sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 h-12 border-b border-[#1A1A1A] bg-[#0A0A0A] transition-all duration-300",
          scrolledPastHero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}>
          <div className="flex items-center gap-4">
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-[#1A1A1A]">
                <Menu className="w-4 h-4 text-[#C0C0C0]" />
              </button>
            )}
            <span className="text-[11px] font-semibold text-[#6EA996] tracking-wider">yvoo+</span>
            <span className="text-[11px] text-[#7B8E80]">SCANPRO+ · ATLAS AI</span>
            <span className="text-[11px] text-[#C0C0C0]">/</span>
            <span className="text-[12px] text-[#F5F5F5] font-medium">{reportMeta.supplier}</span>
            <span className="text-[11px] font-medium text-[#E39B5C] ml-2">{reportMeta.verdictLabel}</span>
            <span className="text-[11px] text-[#7B8E80]">· {allNCRs.length} NCRs</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-md border border-[#1A1A1A] overflow-hidden">
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
            <button
              className="px-3 py-1.5 rounded-md text-[11px] font-medium text-[#F5F5F5] border border-[#7B8E80] hover:bg-[#1A1A1A] transition-colors"
            >
              Export pdf
            </button>
            <button
              className="px-3 py-1.5 rounded-md text-[11px] font-medium text-[#F5F5F5] border border-[#7B8E80] hover:bg-[#1A1A1A] transition-colors"
            >
              Print
            </button>
            <button
              onClick={() => setInspectorOpen(!inspectorOpen)}
              className="px-4 py-1.5 rounded-md text-[11px] font-semibold text-[#0A0A0A] bg-[#6EA996] hover:bg-[#5E9B87] transition-colors"
            >
              Sign off ({allNCRs.filter(n => n.status === 'open').length})
            </button>
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

              <section className="py-16 md:py-24">
                <KPIBand kpis={kpis} />
              </section>

              <div className="space-y-16 md:space-y-24 pb-16">
                {stations.filter(s => s.index >= 2 && s.index <= 9).map((station) => (
                  <StationCard key={station.index} station={station} depth={depth} totalStations={14} />
                ))}
                <NCRRegister ncrs={allNCRs} />
                <AtlasIntelligence />
                <DelayForecast />
                <RecommendationSection />
                <EvidenceVault />
              </div>

              {/* Ask Atlas */}
              <div className="sticky bottom-4 z-30 mb-8">
                <div className="max-w-[640px] mx-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[#E5E7EB] bg-white/95 backdrop-blur-sm shadow-lg">
                  <Sparkles className="w-4 h-4 text-[#0A7FA5] shrink-0" />
                  <input
                    value={askAtlasInput}
                    onChange={e => setAskAtlasInput(e.target.value)}
                    placeholder="Ask Atlas about this audit..."
                    className="flex-1 bg-transparent text-[14px] text-[#0A0A0A] placeholder:text-[#C0C0C0] outline-none"
                  />
                  <button className="px-3 py-1 rounded-lg text-[12px] font-medium text-[#0A7FA5] hover:bg-[#0A7FA5]/5 transition-colors">
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
  );
}
