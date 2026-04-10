import { Camera, FileText, Video, MapPin, Clock, Link2 } from "lucide-react";

const evidenceItems = [
  { id: 'EVD-001', type: 'photo', name: 'CNC Machine #2 — No calibration sticker', station: 5, ncr: 'NCR-0003', time: '09:14' },
  { id: 'EVD-002', type: 'photo', name: 'Bore ID measurement — Cpk data sheet', station: 7, ncr: 'NCR-0001', time: '10:32' },
  { id: 'EVD-003', type: 'measurement', name: 'CMM Report — Ø42H7 (50 parts)', station: 7, ncr: 'NCR-0001', time: '10:45' },
  { id: 'EVD-004', type: 'photo', name: 'Test fixture alignment offset', station: 7, ncr: 'NCR-0002', time: '10:52' },
  { id: 'EVD-005', type: 'video', name: 'CNC line overview — 10s clip', station: 5, ncr: null, time: '09:22' },
  { id: 'EVD-006', type: 'photo', name: 'Reception quality policy sign', station: 3, ncr: null, time: '08:45' },
  { id: 'EVD-007', type: 'document', name: 'ISO 9001 Certificate — MV Motors', station: 9, ncr: null, time: '11:30' },
  { id: 'EVD-008', type: 'photo', name: 'Incoming goods barcode scanner', station: 4, ncr: null, time: '09:02' },
  { id: 'EVD-009', type: 'photo', name: 'Packing line — VCI paper application', station: 8, ncr: null, time: '11:05' },
];

const typeIcon = {
  photo: Camera,
  measurement: FileText,
  video: Video,
  document: FileText,
};

export default function EvidenceVault() {
  return (
    <section id="station-14" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-[32px] font-semibold text-[#F5F6FA] tracking-tight leading-none">
          Evidence Vault
        </span>
        <span className="text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-white/[0.06] text-[#6B7085]">
          {evidenceItems.length} files
        </span>
      </div>

      {/* Masonry grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {evidenceItems.map((item) => {
          const Icon = typeIcon[item.type as keyof typeof typeIcon] || Camera;
          return (
            <div
              key={item.id}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden group hover:bg-white/[0.05] transition-all cursor-pointer"
            >
              {/* Photo placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-white/[0.04] to-white/[0.01] flex items-center justify-center relative">
                <Icon className="w-8 h-8 text-[#6B7085]/50" />
                {/* Station tag */}
                <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded bg-black/60 text-[#A1A5B7] font-mono">
                  Stn {String(item.station).padStart(2, '0')}
                </span>
                {item.ncr && (
                  <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded bg-[#F04464]/20 text-[#F04464] font-mono flex items-center gap-1">
                    <Link2 className="w-3 h-3" /> {item.ncr}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-[12px] text-[#F5F6FA] font-medium line-clamp-1">{item.name}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#6B7085]">
                  <span className="font-mono">{item.id}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
