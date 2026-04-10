import { cn } from "@/lib/utils";
import type { VerdictType } from "@/data/auditReportData";
import { iatfProcessScores, iatfWeightedScore } from "@/data/auditReportData";

const verdictStyle: Record<VerdictType, { color: string; accent: string; bg: string }> = {
  go: { color: 'text-[#6EA996]', accent: '#6EA996', bg: 'bg-[#6EA996]/5' },
  conditional: { color: 'text-[#E39B5C]', accent: '#E39B5C', bg: 'bg-[#E39B5C]/5' },
  hold: { color: 'text-[#AD3D3D]', accent: '#AD3D3D', bg: 'bg-[#AD3D3D]/5' },
  nogo: { color: 'text-[#AD3D3D]', accent: '#AD3D3D', bg: 'bg-[#AD3D3D]/10' },
};

function MiniProcessBar({ label, score }: { label: string; score: number }) {
  const color = score >= 80 ? '#6EA996' : score >= 60 ? '#E39B5C' : '#AD3D3D';
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-[#7B8E80] w-8 text-right font-mono tabular-nums">{score}</span>
      <div className="flex-1 h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-[10px] text-[#7B8E80] w-6">{label}</span>
    </div>
  );
}

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

export default function ReportHero({ verdict, verdictLabel, heroReason, supplier, po, auditor, date, location, onDecide, onWalk }: ReportHeroProps) {
  const style = verdictStyle[verdict];

  return (
    <section id="station-1" className="min-h-[100dvh] flex flex-col items-center justify-center relative px-6 scroll-mt-20">
      <div className="text-center relative z-10 max-w-3xl">
        {/* Section marker */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">// 01</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0A7FA5]" />
          <span className="text-[12px] font-medium tracking-[0.1em] text-[#7B8E80]">Verdict Summary</span>
        </div>

        {/* Standard badges */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {['ISO 9001:2015', 'IATF 16949:2016', 'VDA 6.3', 'TÜV SÜD'].map(badge => (
            <span key={badge} className="text-[10px] px-3 py-1.5 rounded-full border border-[#E5E7EB] text-[#7B8E80] font-medium tracking-wider uppercase">
              {badge}
            </span>
          ))}
        </div>

        {/* Verdict */}
        <h1 className={cn("text-[52px] md:text-[72px] font-light tracking-[-0.03em] leading-none", style.color)}>
          {verdictLabel}
        </h1>

        <p className="text-[18px] md:text-[20px] text-[#7B8E80] mt-4 font-light">
          {supplier} · {po}
        </p>

        <p className="text-[16px] text-[#1A1A1A] mt-3 font-medium max-w-lg mx-auto leading-relaxed">
          {heroReason}
        </p>

        {/* IATF score */}
        <div className="mt-10 max-w-md mx-auto">
          <div className="rounded-xl border border-[#E5E7EB] bg-[#F5F5F5] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#7B8E80] font-semibold">IATF 16949 Process Score</span>
              <span className="text-[22px] font-light tabular-nums" style={{ color: style.accent }}>
                {Math.round(iatfWeightedScore)}%
              </span>
            </div>
            <div className="space-y-1.5">
              {iatfProcessScores.map(p => (
                <MiniProcessBar key={p.process} label={p.process.split(' — ')[0]} score={p.score} />
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={onDecide}
            className="px-8 py-3.5 rounded-lg text-[14px] font-medium text-white bg-[#0A7FA5] hover:bg-[#087A9E] transition-colors"
          >
            Decide now →
          </button>
          <button
            onClick={onWalk}
            className="px-8 py-3.5 rounded-lg text-[14px] font-medium text-[#7B8E80] border border-[#E5E7EB] hover:bg-[#F5F5F5] transition-colors"
          >
            Walk the factory ↓
          </button>
        </div>

        {/* Audit details */}
        <div className="mt-10 space-y-1">
          <p className="text-[13px] text-[#7B8E80]">
            Auditor: {auditor} · {date} · {location}
          </p>
          <p className="text-[12px] text-[#C0C0C0]">
            ISO 9001:2015 / IATF 16949:2016 · Surveillance Audit · TÜV SÜD certified
          </p>
        </div>
      </div>
    </section>
  );
}
