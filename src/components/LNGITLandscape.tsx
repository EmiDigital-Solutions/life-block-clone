import { motion } from "framer-motion";

/**
 * CEIP IT System Architecture
 * Croatian Government Project — Ministry of Economy & Sustainability
 * Global 24/7 AI Platform for partner discovery, audit ordering, reports & inspections
 */

interface SystemNode {
  id: string;
  label: string;
  sublabel: string;
  category: "platform" | "client" | "ai" | "ai-agent" | "gov" | "data" | "integration" | "output";
  x: number;
  y: number;
}

interface DataFlow {
  from: string;
  to: string;
  label: string;
  bidirectional?: boolean;
  animGroup?: number;
}

const systems: SystemNode[] = [
  // Global Client Access Layer (top row)
  { id: "client-eu", label: "EU Clients", sublabel: "Germany · France · Italy · Austria", category: "client", x: 18, y: 6 },
  { id: "client-mena", label: "MENA & Asia Clients", sublabel: "UAE · Saudi Arabia · Japan · Korea", category: "client", x: 50, y: 6 },
  { id: "client-americas", label: "Americas Clients", sublabel: "USA · Canada · Brazil · Mexico", category: "client", x: 82, y: 6 },

  // 24/7 Access Gateway
  { id: "api-gateway", label: "24/7 Secure Gateway", sublabel: "REST API · SSO · Multi-language · Global CDN", category: "integration", x: 50, y: 20 },

  // Croatian Government (left column)
  { id: "gov-ministry", label: "Ministry of Economy", sublabel: "Republic of Croatia · Sustainability Dept.", category: "gov", x: 10, y: 44 },
  { id: "fina-registry", label: "FINA Business Registry", sublabel: "162,000+ Croatian Enterprises · Financial Data", category: "gov", x: 10, y: 60 },

  // AI Agents (flanking center)
  { id: "agent-matchmaking", label: "Partner Matchmaking", sublabel: "AI Supplier Search · Capability Scoring", category: "ai-agent", x: 30, y: 34 },
  { id: "agent-audit", label: "Audit Orchestrator", sublabel: "Order Audits · Schedule · Assign Auditors", category: "ai-agent", x: 70, y: 34 },

  // CEIP AI Platform — Center
  { id: "ceip-ai", label: "CEIP AI Platform", sublabel: "Central Intelligence · Zagreb, Croatia", category: "ai", x: 50, y: 48 },

  // AI Agents (lower flanking)
  { id: "agent-report", label: "Report Generator", sublabel: "VDA 6.3 · IATF 16949 · ISO 9001 Reports", category: "ai-agent", x: 30, y: 62 },
  { id: "agent-inspection", label: "Inspection Manager", sublabel: "ScanPro+ · Field Ops · Evidence Collection", category: "ai-agent", x: 70, y: 62 },

  // Output & Deliverables (right column)
  { id: "client-portal", label: "Client Portal", sublabel: "Dashboards · Track Orders · Download Reports", category: "output", x: 86, y: 44 },
  { id: "compliance-engine", label: "Compliance Engine", sublabel: "EU Standards · ISO · ASME · API · PED", category: "output", x: 86, y: 60 },

  // Data & Intelligence Layer (bottom row)
  { id: "supplier-db", label: "Supplier Database", sublabel: "Digital Twins · Certifications · Capability Maps", category: "data", x: 25, y: 82 },
  { id: "auditor-network", label: "Auditor Network", sublabel: "Certified Auditors · Global Coverage · VDA/IATF", category: "data", x: 50, y: 86 },
  { id: "evidence-vault", label: "Evidence Vault", sublabel: "Photos · Documents · Blockchain Timestamps", category: "data", x: 75, y: 82 },
];

const dataFlows: DataFlow[] = [
  { from: "client-eu", to: "api-gateway", label: "HTTPS / SSO", animGroup: 0 },
  { from: "client-mena", to: "api-gateway", label: "HTTPS / SSO", animGroup: 0.3 },
  { from: "client-americas", to: "api-gateway", label: "HTTPS / SSO", animGroup: 0.6 },
  { from: "api-gateway", to: "ceip-ai", label: "Authenticated Requests", bidirectional: true, animGroup: 1.5 },
  { from: "ceip-ai", to: "agent-matchmaking", label: "", bidirectional: true, animGroup: 2.5 },
  { from: "ceip-ai", to: "agent-audit", label: "", bidirectional: true, animGroup: 2.5 },
  { from: "ceip-ai", to: "agent-report", label: "", bidirectional: true, animGroup: 2.5 },
  { from: "ceip-ai", to: "agent-inspection", label: "", bidirectional: true, animGroup: 2.5 },
  { from: "gov-ministry", to: "ceip-ai", label: "Policy & Funding", animGroup: 3 },
  { from: "fina-registry", to: "supplier-db", label: "Enterprise Data", animGroup: 3.5 },
  { from: "agent-matchmaking", to: "supplier-db", label: "Search & Match", bidirectional: true, animGroup: 4 },
  { from: "agent-audit", to: "auditor-network", label: "Assign Auditors", bidirectional: true, animGroup: 4.5 },
  { from: "agent-inspection", to: "evidence-vault", label: "Store Evidence", bidirectional: true, animGroup: 5 },
  { from: "agent-report", to: "evidence-vault", label: "Pull Evidence", animGroup: 5.5 },
  { from: "ceip-ai", to: "client-portal", label: "Results & Reports", bidirectional: true, animGroup: 6 },
  { from: "agent-report", to: "compliance-engine", label: "Standards Check", bidirectional: true, animGroup: 6.5 },
  { from: "compliance-engine", to: "client-portal", label: "Certificates", animGroup: 7 },
];

/* Project palette: Primary #0A7FA5 = hsl(195, 88%, 34%) */
const categoryColors: Record<SystemNode["category"], { bg: string; border: string; text: string }> = {
  platform:    { bg: "bg-[hsl(195,40%,8%)]",    border: "border-primary",                text: "text-primary" },
  client:      { bg: "bg-[hsl(195,30%,10%)]",    border: "border-primary/60",              text: "text-primary/80" },
  ai:          { bg: "bg-[hsl(195,40%,8%)]",     border: "border-primary",                text: "text-primary" },
  "ai-agent":  { bg: "bg-[hsl(195,30%,6%)]",     border: "border-primary/50",              text: "text-primary/70" },
  gov:         { bg: "bg-[hsl(195,10%,10%)]",     border: "border-[hsl(0,55%,50%)]",       text: "text-[hsl(0,60%,72%)]" },
  data:        { bg: "bg-[hsl(170,25%,8%)]",      border: "border-[hsl(170,50%,40%)]",     text: "text-[hsl(170,55%,65%)]" },
  integration: { bg: "bg-[hsl(210,30%,10%)]",     border: "border-[hsl(210,55%,55%)]",     text: "text-[hsl(210,60%,72%)]" },
  output:      { bg: "bg-[hsl(195,25%,10%)]",     border: "border-primary/40",              text: "text-primary/75" },
};

const categoryLabels: { category: SystemNode["category"]; label: string; dotColor: string }[] = [
  { category: "client", label: "Global Clients", dotColor: "bg-primary/60" },
  { category: "integration", label: "24/7 Gateway", dotColor: "bg-[hsl(210,55%,55%)]" },
  { category: "ai", label: "CEIP AI Core", dotColor: "bg-primary" },
  { category: "ai-agent", label: "AI Agents", dotColor: "bg-primary/50" },
  { category: "gov", label: "Croatian Government", dotColor: "bg-[hsl(0,55%,50%)]" },
  { category: "data", label: "Data & Network", dotColor: "bg-[hsl(170,50%,40%)]" },
  { category: "output", label: "Client Deliverables", dotColor: "bg-primary/40" },
];

const FlowDot = ({ pathId, delay, duration = 3 }: { pathId: string; delay: number; duration?: number }) => (
  <>
    <circle r="3.5" fill="hsl(195, 88%, 34%)" filter="url(#dot-glow)">
      <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
        <mpath xlinkHref={`#${pathId}`} />
      </animateMotion>
    </circle>
    <circle r="1.5" fill="white" opacity="0.9">
      <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
        <mpath xlinkHref={`#${pathId}`} />
      </animateMotion>
    </circle>
  </>
);

const LNGITLandscape = () => {
  return (
    <div className="space-y-8">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4">
        {categoryLabels.map((c) => (
          <div key={c.category} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${c.dotColor}`} />
            <span className="text-xs font-mono text-foreground/50 tracking-wider uppercase">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Scenario Label */}
      <div className="flex items-center gap-3">
        <div className="relative w-2.5 h-2.5">
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
          <div className="absolute inset-0 rounded-full bg-primary" />
        </div>
        <span className="text-xs font-mono text-foreground/40 tracking-wider uppercase">
          Live Scenario — Global client finds partner → Orders audit → Receives VDA 6.3 report → 24/7 access
        </span>
      </div>

      {/* Government Badge */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-[hsl(0,50%,30%)] bg-[hsl(0,40%,8%)]">
        <div className="w-6 h-6 rounded-full bg-[hsl(0,55%,45%)] flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-white">HR</span>
        </div>
        <span className="text-xs text-foreground/60 font-mono">
          Croatian Government Project — Ministry of Economy and Sustainable Development — EU Co-funded
        </span>
      </div>

      {/* Key Numbers Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { value: "162,000+", label: "Croatian Enterprises" },
          { value: "24/7", label: "Global Access" },
          { value: "48h", label: "On-site Audit" },
          { value: "5", label: "AI Agents" },
        ].map((stat) => (
          <div key={stat.label} className="text-center py-4 px-3 rounded-lg border border-primary/20 bg-primary/5">
            <div className="text-2xl md:text-3xl font-black text-primary tracking-tight">{stat.value}</div>
            <div className="text-[10px] md:text-xs font-mono text-foreground/50 uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main Landscape */}
      <div className="relative w-full aspect-[16/10] min-h-[600px] md:min-h-[800px] rounded-xl border border-foreground/10"
        style={{
          background: 'linear-gradient(160deg, hsl(195, 15%, 5%), hsl(195, 10%, 3%), hsl(195, 15%, 6%))',
          overflow: 'visible',
        }}>

        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] overflow-visible" aria-hidden="true">
          <defs>
            <pattern id="landscape-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#landscape-grid)" />
        </svg>

        {/* Radial glow behind CEIP AI */}
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{
            left: '50%', top: '48%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(195, 88%, 34%) 0%, transparent 65%)'
          }}
        />

        {/* Data flow lines + animated dots */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow-end" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.3)" />
            </marker>
            <marker id="arrow-start" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse">
              <polygon points="8 0, 0 3, 8 6" fill="rgba(255,255,255,0.3)" />
            </marker>
            <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {dataFlows.map((flow, i) => {
            const fromNode = systems.find(s => s.id === flow.from)!;
            const toNode = systems.find(s => s.id === flow.to)!;
            const x1 = fromNode.x * 10;
            const y1 = fromNode.y * 6.25;
            const x2 = toNode.x * 10;
            const y2 = toNode.y * 6.25;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const cx = mx - dy * 0.12;
            const cy = my + dx * 0.12;
            const pathId = `flow-path-${i}`;

            return (
              <g key={`flow-${i}`}>
                <motion.path
                  id={pathId}
                  d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  markerEnd="url(#arrow-end)"
                  markerStart={flow.bidirectional ? "url(#arrow-start)" : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.06 }}
                />
                {flow.label && (
                  <text x={cx} y={cy - 7} fill="rgba(255,255,255,0.65)" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="700">
                    {flow.label}
                  </text>
                )}
                <FlowDot pathId={pathId} delay={(flow.animGroup ?? i * 0.5) + 1.5} duration={2.5 + Math.random() * 1.5} />
              </g>
            );
          })}
        </svg>

        {/* System Nodes */}
        {systems.map((node, i) => {
          const colors = categoryColors[node.category];
          const isCenter = node.category === "ai";
          const isAgent = node.category === "ai-agent";
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
              className={`absolute z-10 ${isCenter ? 'w-[240px] md:w-[300px]' : isAgent ? 'w-[170px] md:w-[210px]' : 'w-[160px] md:w-[200px]'}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className={`
                ${colors.bg} ${colors.border} border backdrop-blur-md rounded-lg
                ${isCenter ? 'p-4 md:p-5 border-2 shadow-[0_0_30px_hsl(195_88%_34%/0.15)]' : isAgent ? 'p-3 md:p-3.5 border-dashed' : 'p-2.5 md:p-3'}
                transition-all hover:scale-105
              `}>
                {isCenter && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full">
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.15em]">CEIP Core</span>
                  </div>
                )}
                {isAgent && (
                  <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-primary/20 border border-primary/40 rounded">
                    <span className="text-[8px] font-bold text-primary/80 uppercase tracking-[0.15em]">AI Agent</span>
                  </div>
                )}
                {node.category === "gov" && (
                  <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-[hsl(0,40%,20%)] border border-[hsl(0,55%,45%)] rounded">
                    <span className="text-[8px] font-bold text-[hsl(0,60%,72%)] uppercase tracking-[0.15em]">Gov</span>
                  </div>
                )}
                <div className={`${isCenter ? 'text-base md:text-lg' : 'text-xs md:text-sm'} font-bold ${colors.text} leading-tight ${isAgent || node.category === "gov" ? 'mt-1' : ''}`}>
                  {node.label}
                </div>
                <div className={`${isCenter ? 'text-xs md:text-sm' : 'text-[11px] md:text-xs'} text-foreground/70 mt-1 leading-tight`}>
                  {node.sublabel}
                </div>
                {isCenter && (
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    {["Find Partners", "Order Audits", "View Reports", "Track Inspections", "AI Matchmaking", "24/7 Access"].map(mod => (
                      <div key={mod} className="text-[10px] md:text-xs text-primary bg-primary/10 border border-primary/25 rounded px-2 py-1 text-center font-mono">
                        {mod}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Zone labels */}
        <div className="absolute top-3 left-4 text-[10px] font-mono text-foreground/20 tracking-[0.3em] uppercase">Global Client Access Zone</div>
        <div className="absolute top-3 right-4 text-[10px] font-mono text-foreground/20 tracking-[0.3em] uppercase">24/7 Gateway</div>
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-foreground/20 tracking-[0.3em] uppercase">Croatian Gov & Data Zone</div>
        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-foreground/20 tracking-[0.3em] uppercase">Deliverables Zone</div>
      </div>

      {/* Key Integration Points */}
      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {[
          { title: "Global 24/7 Access", desc: "Clients worldwide connect via secure SSO gateway. Multi-language support, global CDN ensures sub-second response times from any continent." },
          { title: "AI Partner Matchmaking", desc: "CEIP AI searches 162,000+ Croatian enterprises from FINA registry, scores capabilities, certifications, and capacity to find the perfect supplier match." },
          { title: "Audit & Inspection Orders", desc: "Clients order VDA 6.3, IATF 16949, or ISO 9001 audits directly. AI assigns certified auditors, schedules on-site visits, and manages the full workflow." },
          { title: "Croatian Gov Integration", desc: "Co-funded by the Ministry of Economy and Sustainable Development. Connected to FINA business registry for verified Croatian enterprise data and financial transparency." },
        ].map((point, i) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-5 border border-foreground/10 rounded-xl bg-foreground/[0.03]"
          >
            <div className="w-8 h-1 bg-primary rounded-full mb-4" />
            <h4 className="text-sm font-bold text-foreground mb-2 font-mono">{point.title}</h4>
            <p className="text-xs text-foreground/50 leading-relaxed">{point.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LNGITLandscape;
