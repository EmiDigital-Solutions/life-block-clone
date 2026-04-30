import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

/**
 * Canonical KPI band — bold figures, count-up from 0 on view.
 */
const kpis = [
  { value: 72, suffix: "h", label: "Expert dispatch window" },
  { value: 3, suffix: "days", label: "Signed AKCP report" },
  { value: 5, suffix: "+", label: "Expert profiles" },
  { value: 100, suffix: "%", label: "Evidence chain captured" },
];

function CountUp({
  to,
  inView,
  duration = 5,
  hold = 3,
  rewind = 2,
  pauseAtZero = 0.6,
}: {
  to: number;
  inView: boolean;
  duration?: number;
  hold?: number;
  rewind?: number;
  pauseAtZero?: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let stopped = false;
    let controls: ReturnType<typeof animate> | null = null;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const runUp = () => {
      if (stopped) return;
      controls = animate(0, to, {
        duration,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => setVal(Math.round(v)),
        onComplete: () => {
          timeout = setTimeout(runDown, hold * 1000);
        },
      });
    };

    const runDown = () => {
      if (stopped) return;
      controls = animate(to, 0, {
        duration: rewind,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (v) => setVal(Math.round(v)),
        onComplete: () => {
          timeout = setTimeout(runUp, pauseAtZero * 1000);
        },
      });
    };

    runUp();

    return () => {
      stopped = true;
      controls?.stop();
      if (timeout) clearTimeout(timeout);
    };
  }, [inView, to, duration, hold, rewind, pauseAtZero]);
  return <>{val}</>;
}

export default function HeadlineKpiBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <section ref={ref} data-nav-theme="light" className="bg-muted">
      <div className="mx-auto max-w-[1400px] px-8 py-16 md:py-24">
        {/* Header — 12-col split (Auditors vocabulary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="section-eyebrow">The numbers</span>
            </div>
            <h2 className="section-headline text-foreground">
              AKCP ScanPro+ in figures
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 lg:col-start-8 flex flex-col justify-end"
          >
            <p className="text-lg text-muted-foreground">
              The operating metrics AKCP members need for bilateral partner qualification, project readiness and claims-safe evidence.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="bg-background p-8 md:p-10"
            >
              <div className="border-t border-foreground/20 pt-6">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.03em] text-foreground leading-none tabular-nums">
                    <CountUp to={k.value} inView={inView} />
                  </span>
                  <span className="text-base md:text-xl font-mono text-primary">
                    {k.suffix}
                  </span>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {k.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
