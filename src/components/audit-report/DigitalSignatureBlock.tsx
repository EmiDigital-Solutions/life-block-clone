/**
 * Digital Signature Block — VDA 6.3 / IATF 16949 formal sign-off
 * Three-step approval: Auditor → QA Manager → Management
 */

import { CheckCircle2, Clock, Lock } from "lucide-react";

interface SignatureEntry {
  role: string;
  name: string;
  qualification: string;
  status: 'signed' | 'pending' | 'locked';
  date?: string;
  signatureHash?: string;
}

const signatures: SignatureEntry[] = [
  {
    role: 'Lead Auditor',
    name: 'I. Petrović',
    qualification: 'IRCA Lead Auditor #A21849 · VDA 6.3 Licensed',
    status: 'signed',
    date: '2025-03-15 18:30 CET',
    signatureHash: 'SHA256:a4f2…e8c1',
  },
  {
    role: 'QA Review',
    name: 'M. Kovačević',
    qualification: 'VDA 6.3 Auditor · DGQ Quality Manager',
    status: 'pending',
  },
  {
    role: 'Management Approval',
    name: 'Pending Assignment',
    qualification: 'BMW SQE or Authorized Representative',
    status: 'locked',
  },
];

export default function DigitalSignatureBlock() {
  return (
    <div className="bg-card rounded-lg border border-border/60 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border/40">
        <Lock className="w-4 h-4 text-primary" />
        <span className="text-[15px] font-semibold text-foreground">Approval & Sign-Off</span>
        <span className="ml-auto text-[12px] text-muted-foreground">
          1 of 3 signatures completed
        </span>
      </div>

      <div className="divide-y divide-border/30">
        {signatures.map((sig, i) => {
          const stepNum = i + 1;
          return (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              {/* Step indicator */}
              <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${
                sig.status === 'signed' ? 'bg-accent/15' : sig.status === 'pending' ? 'bg-warning/15' : 'bg-muted'
              }`}>
                {sig.status === 'signed' ? (
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                ) : sig.status === 'pending' ? (
                  <Clock className="w-4 h-4 text-warning" />
                ) : (
                  <Lock className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Step {stepNum}</span>
                  <span className="text-[13px] font-semibold text-foreground">{sig.role}</span>
                </div>
                <div className="text-[14px] text-foreground mt-0.5">{sig.name}</div>
                <div className="text-[12px] text-muted-foreground">{sig.qualification}</div>
              </div>

              {/* Status */}
              <div className="text-right shrink-0">
                {sig.status === 'signed' ? (
                  <>
                    <div className="text-[12px] font-bold text-accent">Signed</div>
                    <div className="text-[11px] text-muted-foreground">{sig.date}</div>
                    <div className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">{sig.signatureHash}</div>
                  </>
                ) : sig.status === 'pending' ? (
                  <div className="text-[12px] font-bold text-warning">Awaiting Signature</div>
                ) : (
                  <div className="text-[12px] text-muted-foreground">Locked — requires Step {stepNum - 1}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="px-5 py-2.5 bg-muted/30 border-t border-border/40">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          This document requires three-level approval per IATF 16949 §7.5.3. Digital signatures are timestamped
          and cryptographically hashed. The report is finalized and locked for distribution upon completion of all
          three signatures. Unsigned reports are marked "DRAFT — Not for Distribution."
        </p>
      </div>
    </div>
  );
}
