import { Camera, FileText, Video, Clock, Link2 } from "lucide-react";

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

const typeIcon = { photo: Camera, measurement: FileText, video: Video, document: FileText };

export default function EvidenceVault() {
  return (
    <section id="station-14" className="scroll-mt-20 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[14px] font-medium tracking-[0.1em] text-muted-foreground">// 14</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-[14px] font-medium tracking-[0.1em] text-muted-foreground">Evidence Vault</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-[28px] font-light text-foreground tracking-tight leading-none">Evidence Vault</h2>
        <span className="text-[13px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold bg-muted text-muted-foreground">
          {evidenceItems.length} files
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {evidenceItems.map((item) => {
          const Icon = typeIcon[item.type as keyof typeof typeIcon] || Camera;
          return (
            <div key={item.id} className=" bg-card shadow-sm overflow-hidden group hover:shadow-md transition-all cursor-pointer">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center relative">
                <Icon className="w-8 h-8 text-grey-mid" />
                <span className="absolute bottom-2 left-2 text-[12px] px-2 py-0.5 rounded bg-white/80 text-muted-foreground font-mono border border-border">
                  Stn {String(item.station).padStart(2, '0')}
                </span>
                {item.ncr && (
                  <span className="absolute top-2 right-2 text-[12px] px-2 py-0.5 rounded bg-destructive/10 text-destructive font-mono flex items-center gap-1 border-none">
                    <Link2 className="w-3 h-3" /> {item.ncr}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-[14px] text-foreground font-medium line-clamp-1">{item.name}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[13px] text-muted-foreground">
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
