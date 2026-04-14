/**
 * AtlasTooltip — AI-powered contextual tooltip
 * Hover any metric/score/finding → Atlas explains what it means,
 * why it matters, and how it compares to benchmarks.
 */

import { useState, useRef, useEffect, type ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface AtlasTooltipProps {
  children: ReactNode;
  metric: string;
  value: string;
  insight: string;
  benchmark?: string;
  recommendation?: string;
  severity?: 'info' | 'warning' | 'critical';
  className?: string;
}

const severityConfig = {
  info: { border: 'border-primary/30', accent: 'text-primary', bg: 'bg-primary/5', dot: 'bg-primary' },
  warning: { border: 'border-warning/30', accent: 'text-warning', bg: 'bg-warning/5', dot: 'bg-warning' },
  critical: { border: 'border-destructive/30', accent: 'text-destructive', bg: 'bg-destructive/5', dot: 'bg-destructive' },
};

export default function AtlasTooltip({
  children,
  metric,
  value,
  insight,
  benchmark,
  recommendation,
  severity = 'info',
  className,
}: AtlasTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const cfg = severityConfig[severity];

  useEffect(() => {
    if (visible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition(rect.top < 320 ? 'bottom' : 'top');
    }
  }, [visible]);

  const show = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), 350);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), 200);
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className || ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Subtle AI indicator dot */}
      <div className="relative">
        {children}
        <div className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${cfg.dot} opacity-60`} />
      </div>

      {/* Tooltip panel */}
      {visible && (
        <div
          ref={tooltipRef}
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={hide}
          className={`absolute z-[100] w-[320px] ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 -translate-x-1/2 
            bg-card border ${cfg.border} shadow-lg shadow-foreground/5 rounded-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150`}
        >
          {/* Header */}
          <div className={`flex items-center gap-2 px-3 py-2 ${cfg.bg} border-b border-border/30`}>
            <Sparkles className={`w-3.5 h-3.5 ${cfg.accent}`} />
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Atlas Intelligence</span>
          </div>

          <div className="px-3 py-2.5 space-y-2.5">
            {/* Metric + value */}
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] text-muted-foreground">{metric}</span>
              <span className={`text-[15px] font-bold font-mono tabular-nums ${cfg.accent}`}>{value}</span>
            </div>

            {/* AI insight */}
            <p className="text-[13px] text-foreground/85 leading-relaxed">{insight}</p>

            {/* Benchmark comparison */}
            {benchmark && (
              <div className="flex items-start gap-2 px-2.5 py-2 bg-muted/50 rounded">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5 shrink-0 w-[65px]">Benchmark</span>
                <span className="text-[12px] text-foreground/75 leading-snug">{benchmark}</span>
              </div>
            )}

            {/* Recommendation */}
            {recommendation && (
              <div className="flex items-start gap-2 px-2.5 py-2 bg-primary/5 rounded">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary mt-0.5 shrink-0 w-[65px]">Action</span>
                <span className="text-[12px] text-foreground/75 leading-snug">{recommendation}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-3 py-1.5 bg-muted/30 border-t border-border/20">
            <span className="text-[10px] text-muted-foreground">AI-generated insight · Ask Atlas for more detail</span>
          </div>
        </div>
      )}
    </div>
  );
}
