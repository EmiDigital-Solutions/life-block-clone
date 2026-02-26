import { useLanguage } from "@/contexts/LanguageContext";
import PageSEO from "@/components/PageSEO";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { 
  Shield, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, 
  Minus, FileText, MapPin, Users, Package, Clock, Bot, 
  BarChart3, Layers, Eye, Lock, Zap, ArrowRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "improving" || trend === "улучшается") return <TrendingUp className="w-3.5 h-3.5 text-accent" />;
  if (trend === "worsening" || trend === "ухудшается") return <TrendingDown className="w-3.5 h-3.5 text-destructive" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

const ScoreBar = ({ score, max = 5 }: { score: number; max?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <div key={i} className={`h-2 w-5 rounded-sm ${i < score ? 'bg-primary' : 'bg-border'}`} />
    ))}
  </div>
);

const StatusChip = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    "Fulfilled": "bg-accent/20 text-accent",
    "Выполнено": "bg-accent/20 text-accent",
    "Partial": "bg-warning/20 text-warning",
    "Частично": "bg-warning/20 text-warning",
    "Not fulfilled": "bg-destructive/20 text-destructive",
    "Не выполнено": "bg-destructive/20 text-destructive",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide ${colors[status] || 'bg-muted text-muted-foreground'}`}>
      {status}
    </span>
  );
};

const SectionWrapper = ({ children, dark = false, id }: { children: React.ReactNode; dark?: boolean; id?: string }) => (
  <section id={id} className={`py-16 md:py-24 ${dark ? 'bg-foreground text-background' : ''}`}>
    <div className="mx-auto max-w-[1200px] px-4 md:px-8">
      {children}
    </div>
  </section>
);

const SupplierDigitalTwin = () => {
  const { t } = useLanguage();
  const s = t.supplierDigitalTwin;

  return (
    <div className="min-h-screen relative bg-background">
      <PageSEO title={s.pageTitle} description={s.pageDescription} canonical="/supplier-digital-twin" />
      <Navigation />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center bg-foreground text-background pt-24 pb-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-6">
              {s.heroEyebrow}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] mb-6">
              {s.heroHeadline1}<br />
              <span className="text-primary">{s.heroHeadline2}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-background/70 max-w-[680px] leading-relaxed">
              {s.heroSubheadline}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SCENE 1 — Problem */}
      <SectionWrapper id="scene-1">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3">Scene 01</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene1.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-[640px] mb-10">{s.scene1.copy}</motion.p>

          <motion.div variants={fadeUp} className="relative border border-border rounded-lg p-6 md:p-8 bg-muted/30 max-w-[600px]">
            {/* Static profile mock */}
            <div className="space-y-3 text-sm">
              {Object.entries(s.scene1.profileFields).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground capitalize">{key}</span>
                  <span className="font-medium text-foreground">{val}</span>
                </div>
              ))}
            </div>
            {/* Overlay issues */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] rounded-lg flex flex-wrap items-center justify-center gap-2 p-6">
              {s.scene1.overlays.map((o, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold border border-destructive/20">
                  {o}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-6">
            {s.scene1.chips.map((c, i) => (
              <span key={i} className="px-3 py-1 rounded bg-muted text-muted-foreground text-xs font-medium">{c}</span>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 2 — RCA Approach */}
      <SectionWrapper dark id="scene-2">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-3">Scene 02</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene2.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-background/60 max-w-[640px] mb-10">{s.scene2.copy}</motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {s.scene2.layers.map((layer, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border border-background/10 rounded-lg p-4 text-center hover:border-primary/40 transition-colors"
              >
                <Layers className="w-5 h-5 text-primary mx-auto mb-2" />
                <span className="text-sm font-semibold">{layer}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold">{s.scene2.label}</span>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 3 — Twin Cockpit */}
      <SectionWrapper id="scene-3">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3">Scene 03</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene3.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-[640px] mb-10">{s.scene3.copy}</motion.p>

          <motion.div variants={fadeUp} className="border border-border rounded-lg p-6 md:p-8 bg-muted/20">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono uppercase">Fit Score</p>
                <p className="text-4xl font-black text-primary">{s.scene3.fitScore}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono uppercase">Risk</p>
                <p className="text-xl font-bold">{s.scene3.riskScore}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono uppercase">Confidence</p>
                <p className="text-xl font-bold text-accent">{s.scene3.confidenceIndex}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono uppercase">Verification</p>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-accent" />
                  <p className="text-sm font-semibold">{s.scene3.verificationStatus}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono uppercase">Trend</p>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <p className="text-sm font-semibold">{s.scene3.trend}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono uppercase">Recommendation</p>
                <p className="text-sm font-bold px-3 py-1 rounded-full bg-warning/15 text-warning inline-block">{s.scene3.recommendation}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {s.scene3.callouts.map((c, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded bg-primary/10 text-primary font-medium">{c}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 4 — Identity Twin */}
      <SectionWrapper dark id="scene-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-3">Scene 04</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene4.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-background/60 max-w-[640px] mb-8">{s.scene4.copy}</motion.p>
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {s.scene4.fields.map((f, i) => {
              const icons = [MapPin, Users, Package, Users, Package, FileText];
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className="border border-background/10 rounded-lg p-4 flex items-start gap-3">
                  <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              );
            })}
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs text-background/40 mt-6 font-mono">{s.scene4.overlay}</motion.p>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 5 — Operational Twin */}
      <SectionWrapper id="scene-5">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3">Scene 05</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene5.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-[640px] mb-10">{s.scene5.copy}</motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {s.scene5.metrics.map((m, i) => (
              <div key={i} className="border border-border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                  <p className="text-lg font-bold">{m.value}</p>
                </div>
                <TrendIcon trend={m.trend} />
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-6">
            {s.scene5.overlays.map((o, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded bg-accent/10 text-accent font-medium">{o}</span>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 6 — Evidence Vault */}
      <SectionWrapper dark id="scene-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-3">Scene 06</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene6.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-background/60 max-w-[640px] mb-10">{s.scene6.copy}</motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            {s.scene6.badges.map((b, i) => {
              const colors = ["bg-muted text-muted-foreground", "bg-primary/20 text-primary", "bg-accent/20 text-accent", "bg-warning/20 text-warning"];
              const icons = [FileText, CheckCircle, Shield, Bot];
              const Icon = icons[i];
              return (
                <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${colors[i]} text-sm font-semibold`}>
                  <Icon className="w-4 h-4" />
                  {b}
                </div>
              );
            })}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {s.scene6.callouts.map((c, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded bg-background/10 text-background/70 font-medium">{c}</span>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 7 — Capability DNA */}
      <SectionWrapper id="scene-7">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3">Scene 07</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene7.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-[640px] mb-10">{s.scene7.copy}</motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {s.scene7.capabilities.map((c, i) => (
              <div key={i} className="border border-border rounded-lg p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1.5">{c.name}</p>
                  <ScoreBar score={c.score} />
                </div>
                <span className="text-[11px] font-mono text-muted-foreground ml-4">{c.confidence}</span>
              </div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs text-muted-foreground mt-6 font-mono">{s.scene7.overlay}</motion.p>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 8 — Dynamic Risk */}
      <SectionWrapper dark id="scene-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-3">Scene 08</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene8.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-background/60 max-w-[640px] mb-10">{s.scene8.copy}</motion.p>

          <motion.div variants={fadeUp} className="space-y-2">
            {s.scene8.categories.map((c, i) => (
              <div key={i} className="flex items-center justify-between border border-background/10 rounded-lg px-4 py-3">
                <span className="text-sm font-medium">{c.name}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    c.score === "Low" || c.score === "Низкий" ? "bg-accent/20 text-accent" :
                    c.score === "Medium" || c.score === "Средний" ? "bg-warning/20 text-warning" :
                    "bg-destructive/20 text-destructive"
                  }`}>{c.score}</span>
                  <TrendIcon trend={c.trend} />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-6">
            {s.scene8.callouts.map((c, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded bg-background/10 text-background/70 font-medium">{c}</span>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 9 — Compliance */}
      <SectionWrapper id="scene-9">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3">Scene 09</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene9.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-[640px] mb-10">{s.scene9.copy}</motion.p>

          <motion.div variants={fadeUp} className="border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 gap-0 bg-muted/50 px-4 py-2.5 text-xs font-mono uppercase text-muted-foreground">
              <span>Standard</span>
              <span>Status</span>
              <span>Expiry</span>
            </div>
            {s.scene9.standards.map((st, i) => (
              <div key={i} className="grid grid-cols-3 gap-0 px-4 py-3 border-t border-border items-center">
                <span className="text-sm font-semibold">{st.name}</span>
                <StatusChip status={st.status} />
                <span className="text-xs text-muted-foreground font-mono">{st.expiry}</span>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs text-muted-foreground mt-4 font-mono">{s.scene9.overlay}</motion.p>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 10 — NCR/CAPA */}
      <SectionWrapper dark id="scene-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-3">Scene 10</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene10.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-background/60 max-w-[640px] mb-10">{s.scene10.copy}</motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {s.scene10.metrics.map((m, i) => (
              <div key={i} className="border border-background/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-black text-primary mb-1">{m.value}</p>
                <p className="text-xs text-background/50">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 11 — Timeline */}
      <SectionWrapper id="scene-11">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3">Scene 11</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene11.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-[640px] mb-10">{s.scene11.copy}</motion.p>

          <motion.div variants={fadeUp} className="relative border-l-2 border-primary/30 pl-6 space-y-6">
            {s.scene11.events.map((e, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary" />
                <p className="text-xs font-mono text-muted-foreground mb-0.5">{e.date}</p>
                <p className="text-sm font-semibold">{e.event}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 12 — AI Copilot */}
      <SectionWrapper dark id="scene-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-3">Scene 12</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene12.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-background/60 max-w-[640px] mb-10">{s.scene12.copy}</motion.p>

          <motion.div variants={fadeUp} className="border border-background/10 rounded-lg p-6 max-w-[600px]">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold">RCA AI Copilot</span>
            </div>
            <div className="space-y-3">
              {s.scene12.prompts.map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-primary mt-1 shrink-0" />
                  <span className="text-sm text-background/70">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-6">
            {s.scene12.callouts.map((c, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded bg-background/10 text-background/70 font-medium">{c}</span>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 13 — Fit Simulator */}
      <SectionWrapper id="scene-13">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3">Scene 13</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene13.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-[640px] mb-10">{s.scene13.copy}</motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fit bars */}
            <div className="space-y-4">
              {s.scene13.fitCategories.map((fc, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{fc.name}</span>
                    <span className="font-mono text-muted-foreground">{fc.score}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${fc.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Summary card */}
            <div className="border border-border rounded-lg p-6 bg-muted/20">
              <p className="text-xs font-mono uppercase text-muted-foreground mb-2">Overall Fit</p>
              <p className="text-5xl font-black text-primary mb-4">{s.scene13.overallFit}</p>
              <p className="text-sm font-bold px-3 py-1.5 rounded-full bg-warning/15 text-warning inline-block mb-4">{s.scene13.recommendation}</p>
              <div className="space-y-1.5">
                {s.scene13.gaps.map((g, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-3.5 h-3.5 text-warning mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 14 — Comparison */}
      <SectionWrapper dark id="scene-14">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-mono tracking-[0.2em] uppercase text-primary mb-3">Scene 14</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight mb-4">{s.scene14.title}</motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-background/60 max-w-[640px] mb-10">{s.scene14.copy}</motion.p>

          <motion.div variants={fadeUp} className="border border-background/10 rounded-lg overflow-hidden">
            <div className="grid grid-cols-3 gap-0 bg-background/5 px-4 py-3">
              <span className="text-xs font-mono text-background/40">Dimension</span>
              <span className="text-sm font-bold text-center">{s.scene14.supplierA}</span>
              <span className="text-sm font-bold text-center">{s.scene14.supplierB}</span>
            </div>
            {s.scene14.dimensions.map((d, i) => {
              const scoresA = [92, 78, 95, 85, 88];
              const scoresB = [84, 82, 70, 90, 75];
              return (
                <div key={i} className="grid grid-cols-3 gap-0 px-4 py-3 border-t border-background/10 items-center">
                  <span className="text-sm">{d}</span>
                  <div className="flex justify-center">
                    <span className={`text-xs font-mono font-bold ${scoresA[i] > scoresB[i] ? 'text-accent' : 'text-background/60'}`}>{scoresA[i]}%</span>
                  </div>
                  <div className="flex justify-center">
                    <span className={`text-xs font-mono font-bold ${scoresB[i] > scoresA[i] ? 'text-accent' : 'text-background/60'}`}>{scoresB[i]}%</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* SCENE 15 — Closing */}
      <section className="py-24 md:py-32 bg-foreground text-background" id="scene-15">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              {s.scene15.closingHeadline}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-background/60 max-w-[640px] mx-auto mb-10">
              {s.scene15.closingSubheadline}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/lng-inspection" className="px-8 py-3.5 bg-primary text-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors text-sm">
                {s.scene15.ctaPrimary}
              </a>
              <a href="/ground-intelligence" className="px-8 py-3.5 border border-background/20 text-background font-bold rounded-lg hover:border-background/40 transition-colors text-sm">
                {s.scene15.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SupplierDigitalTwin;
