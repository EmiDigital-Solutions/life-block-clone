import { useState } from "react";
import { MessageSquare, AtSign, Check, Clock, User } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  timestamp: string;
  resolved: boolean;
  mentions: string[];
  stationRef?: string;
}

const sampleComments: Comment[] = [
  {
    id: 'c1', author: 'Marko Tomić', role: 'Lead Auditor',
    text: '@sarah.mueller Please review the calibration records for CMM at Station 6. The last documented calibration was 14 months ago.',
    timestamp: '2h ago', resolved: false, mentions: ['sarah.mueller'], stationRef: 'Station 6 — Testing & QC'
  },
  {
    id: 'c2', author: 'Sarah Müller', role: 'Client QA',
    text: 'Confirmed — calibration overdue. Supplier has been notified. New cert expected by Jan 28.',
    timestamp: '45m ago', resolved: false, mentions: []
  },
  {
    id: 'c3', author: 'Ivan Kovač', role: 'Procurement',
    text: '@marko.tomic Can we still proceed with Lot A shipment while NCR-0003 is open?',
    timestamp: '20m ago', resolved: false, mentions: ['marko.tomic'], stationRef: 'NCR-0003'
  },
];

export default function CommentingAnnotation() {
  const [newComment, setNewComment] = useState('');
  const unresolved = sampleComments.filter(c => !c.resolved).length;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-4 h-4 text-primary" />
        <h3 className="text-[14px] font-semibold text-foreground">Discussion & Annotations</h3>
        <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary font-semibold">{unresolved} unresolved</span>
      </div>

      <div className="bg-card shadow-sm divide-y divide-border/40">
        {sampleComments.map((comment) => (
          <div key={comment.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/10 flex items-center justify-center">
                  <User className="w-3 h-3 text-primary" />
                </div>
                <span className="text-[12px] font-semibold text-foreground">{comment.author}</span>
                <span className="text-[10px] text-muted-foreground">{comment.role}</span>
                <span className="text-[10px] text-grey-mid">· {comment.timestamp}</span>
              </div>
              {!comment.resolved && (
                <button className="flex items-center gap-1 px-2 py-1 text-[10px] text-accent hover:bg-accent/5 transition-colors">
                  <Check className="w-3 h-3" /> Resolve
                </button>
              )}
            </div>
            {comment.stationRef && (
              <span className="inline-block text-[10px] px-2 py-0.5 bg-muted text-muted-foreground font-mono">{comment.stationRef}</span>
            )}
            <p className="text-[13px] text-foreground leading-relaxed">
              {comment.text.split(/(@\w+\.\w+)/g).map((part, i) =>
                part.startsWith('@') ? (
                  <span key={i} className="text-primary font-medium">{part}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>
          </div>
        ))}
      </div>

      {/* New comment input */}
      <div className="flex items-center gap-2 bg-card shadow-sm p-3">
        <AtSign className="w-4 h-4 text-grey-mid shrink-0" />
        <input
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment... Use @name to mention"
          className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-grey-mid outline-none"
        />
        <button className="px-3 py-1.5 text-[11px] font-medium text-white bg-primary hover:bg-primary/90 transition-colors">
          Post
        </button>
      </div>
    </section>
  );
}
