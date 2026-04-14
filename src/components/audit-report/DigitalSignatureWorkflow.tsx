import { useState } from "react";
import { CheckCircle2, Circle, Clock, User, Fingerprint } from "lucide-react";
const SW = 1.5;

interface SignatureStep {
  role: string;
  name: string;
  status: 'completed' | 'pending' | 'waiting';
  timestamp?: string;
  hash?: string;
}

const signatureSteps: SignatureStep[] = [
  { role: 'Lead Auditor', name: 'Marko Tomić, IRCA Lead', status: 'completed', timestamp: '2025-01-15 14:32 CET', hash: '0x7a3f…e91b' },
  { role: 'Client QA Manager', name: 'Pending Assignment', status: 'pending' },
  { role: 'Management Approval', name: 'Pending Assignment', status: 'waiting' },
];

const statusIcon = { completed: CheckCircle2, pending: Clock, waiting: Circle };
const statusColor = { completed: 'text-accent', pending: 'text-warning', waiting: 'text-grey-mid' };

export default function DigitalSignatureWorkflow() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <Fingerprint className="w-4 h-4 text-primary" />
        <h3 className="text-[14px] font-semibold text-foreground">Digital Signature & Approval</h3>
        <span className="text-[12px] px-2 py-0.5 bg-warning/10 text-warning font-semibold uppercase tracking-wider">1 of 3 signed</span>
      </div>

      <div className="bg-card shadow-sm">
        {signatureSteps.map((step, i) => {
          const Icon = statusIcon[step.status];
          return (
            <div key={i} className="flex items-start gap-4 p-4 border-b border-border/40 last:border-b-0">
              <div className="flex flex-col items-center gap-1 pt-0.5">
                <Icon className={`w-5 h-5 ${statusColor[step.status]}`} />
                {i < signatureSteps.length - 1 && <div className="w-px h-8 bg-border" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[13px] uppercase tracking-[0.1em] text-muted-foreground font-semibold">{step.role}</span>
                    <p className="text-[15px] text-foreground mt-0.5">{step.name}</p>
                  </div>
                  {step.status === 'pending' && (
                    <button className="px-3 py-1.5 text-[13px] font-medium text-primary border-none hover:bg-primary/5 transition-colors">
                      Request Signature
                    </button>
                  )}
                </div>
                {step.timestamp && (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[12px] font-mono text-muted-foreground">{step.timestamp}</span>
                    {step.hash && (
                      <span className="text-[12px] font-mono text-grey-mid flex items-center gap-1">
                        <Shield className="w-3 h-3" /> {step.hash}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-[13px] text-primary hover:underline"
      >
        {expanded ? 'Hide audit trail' : 'View full audit trail →'}
      </button>

      {expanded && (
        <div className="border-none p-4 space-y-2">
          <p className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground font-semibold mb-3">Immutable Audit Trail</p>
          {[
            { time: '2025-01-15 14:32', action: 'Report signed by Lead Auditor', hash: '0x7a3f…e91b' },
            { time: '2025-01-15 14:30', action: 'All stations reviewed and marked complete', hash: '0x4b2c…f73d' },
            { time: '2025-01-15 09:00', action: 'Audit report generated from live audit data', hash: '0x1e8a…d45c' },
          ].map((entry, i) => (
            <div key={i} className="flex items-center gap-3 text-[13px]">
              <span className="font-mono text-grey-mid w-[140px] shrink-0">{entry.time}</span>
              <span className="text-foreground flex-1">{entry.action}</span>
              <span className="font-mono text-grey-mid">{entry.hash}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
