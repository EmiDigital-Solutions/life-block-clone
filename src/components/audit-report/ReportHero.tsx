import { cn } from "@/lib/utils";
import type { VerdictType } from "@/data/auditReportData";
import { iatfProcessScores, iatfWeightedScore } from "@/data/auditReportData";

const verdictStyle: Record<VerdictType, { color: string; glow: string; accent: string }> = {
  go: { color: 'text-[#22D3A5]', glow: 'shadow-[0_0_120px_rgba(34,211,165,0.15)]', accent: '#22D3A5' },
  conditional: { color: 'text-[#F5B544]', glow: 'shadow-[0_0_120px_rgba(245,181,68,0.15)]', accent: '#F5B544' },
  hold: { color: 'text-[#FF7A59]', glow: 'shadow-[0_0_120px_rgba(255,122,89,0.15)]', accent: '#FF7A59' },
  nogo: { color: 'text-[#F04464]', glow: 'shadow-[0_0_120px_rgba(240,68,100,0.15)]', accent: '#F04464' },
};

interface ReportHeroProps {
  verdict: VerdictType;
  verdictLabel: string;
  heroReason: string;
  supplier: string;
  po: string;
  auditor: string;
  date: string;
  location: string;
  onDecide: () => void;
  onWalk: () => void;
}

function MiniProcessBar({ label, score }: { label: string; score: number }) {
  const color = score >= 80 ? '#22D3A5' : score >= 60 ? '#F5B544' : '#F04464';
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-[#6B7085] w-8 text-right font-mono tabular-nums" style={{ fontFeatureSettings: "'tnum'" }}>{score}</span>
      <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-[9px] text-[#6B7085] w-6">{label}</span>
    </div>
  );
}

export default function ReportHero({ verdict, verdictLabel, heroReason, supplier, po, auditor, date, location, onDecide, onWalk }: ReportHeroProps) {
  const style = verdictStyle[verdict];

  return (
    <section id="station-1" className="min-h-[100dvh] flex flex-col items-center justify-center relative px-6 scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #6366F1 0%, #22D3EE 40%, #22D3A5 70%, transparent 100%)' }}
        />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className={cn("text-center relative z-10 max-w-3xl", style.glow)}>
        {/* Masthead */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#6B7085]">
            YVOO · ScanPro+ · Atlas AI Report
          </span>
        </div>

        {/* Standard badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-[10px] px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.04] text-[#A1A5B7] font-medium tracking-wider uppercase">
            ISO 9001:2015
          </span>
          <span className="text-[10px] px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.04] text-[#A1A5B7] font-medium tracking-wider uppercase">
            IATF 16949:2016
          </span>
          <span className="text-[10px] px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.04] text-[#A1A5B7] font-medium tracking-wider uppercase">
            TÜV SÜD Certified
          </span>
        </div>

        {/* Verdict */}
        <h1 className={cn("text-[56px] md:text-[72px] font-semibold tracking-[-0.02em] leading-none", style.color)}>
          {verdictLabel}
        </h1>

        {/* Supplier & PO */}
        <p className="text-[18px] md:text-[20px] text-[#A1A5B7] mt-4">
          {supplier} · {po}
        </p>

        {/* Hero reason */}
        <p className="text-[16px] text-[#F5F6FA] mt-3 font-medium">
          {heroReason}
        </p>

        {/* Quick IATF score strip */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#6B7085] font-medium">IATF 16949 Process Score</span>
              <span className="text-[18px] font-mono tabular-nums font-semibold" style={{ color: style.accent, fontFeatureSettings: "'tnum'" }}>
                {Math.round(iatfWeightedScore)}%
              </span>
            </div>
            <div className="space-y-1">
              {iatfProcessScores.map(p => (
                <MiniProcessBar key={p.process} label={p.process.split(' — ')[0]} score={p.score} />
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={onDecide}
            className="px-8 py-3.5 rounded-xl text-[14px] font-semibold text-white transition-all duration-300 hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6366F1 0%, #22D3EE 50%, #22D3A5 100%)' }}
          >
            Decide now →
          </button>
          <button
            onClick={onWalk}
            className="px-8 py-3.5 rounded-xl text-[14px] font-medium text-[#A1A5B7] border border-white/[0.12] hover:bg-white/[0.04] hover:text-[#F5F6FA] transition-all duration-200"
          >
            Walk the factory ↓
          </button>
        </div>

        {/* Audit details */}
        <div className="mt-10 space-y-1.5">
          <p className="text-[13px] text-[#6B7085]">
            Auditor: {auditor} · {date} · {location}
          </p>
          <p className="text-[12px] text-[#6B7085]/70">
            ISO 9001:2015 / IATF 16949:2016 · Surveillance Audit · TÜV SÜD certified
          </p>
        </div>
      </div>
    </section>
  );
}
