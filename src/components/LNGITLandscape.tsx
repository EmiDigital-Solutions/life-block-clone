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
  scenario?: string;
  animGroup?: number;
}

const systems: SystemNode[] = [
  // Global Client Access Layer (top)
  { id: "client-eu", label: "EU Clients", sublabel: "Germany · France · Italy · Austria", category: "client", x: 14, y: 8 },
  { id: "client-mena", label: "MENA & Asia Clients", sublabel: "UAE · Saudi Arabia · Japan · Korea", category: "client", x: 50, y: 6 },
  { id: "client-americas", label: "Americas Clients", sublabel: "USA · Canada · Brazil · Mexico", category: "client", x: 86, y: 8 },

  // 24/7 Access Gateway
  { id: "api-gateway", label: "24/7 Secure Gateway", sublabel: "REST API · SSO · Multi-language · Global CDN", category: "integration", x: 50, y: 22 },

  // CEIP AI Platform — Center
  { id: "ceip-ai", label: "CEIP AI Platform", sublabel: "Central Intelligence · Zagreb, Croatia", category: "ai", x: 50, y: 46 },

  // AI Agents (surrounding the center)
  { id: "agent-matchmaking", label: "Partner Matchmaking", sublabel: "AI Supplier Search · Capability Scoring", category: "ai-agent", x: 30, y: 34 },
  { id: "agent-audit", label: "Audit Orchestrator", sublabel: "Order Audits · Schedule · Assign Auditors", category: "ai-agent", x: 70, y: 34 },
  { id: "agent-report", label: "Report Generator", sublabel: "VDA 6.3 · IATF 16949 · ISO 9001 Reports", category: "ai-agent", x: 30, y: 60 },
  { id: "agent-inspection", label: "Inspection Manager", sublabel: "ScanPro+ · Field Ops · Evidence Collection", category: "ai-agent", x: 70, y: 60 },

  // Croatian Government & Data Sources (left)
  { id: "gov-ministry", label: "Ministry of Economy", sublabel: "Republic of Croatia · Sustainability Dept.", category: "gov", x: 10, y: 42 },
  { id: "fina-registry", label: "FINA Business Registry", sublabel: "135,000+ Croatian Enterprises · Financial Data", category: "gov", x: 10, y: 62 },

  // Data & Intelligence Layer (bottom)
  { id: "supplier-db", label: "Supplier Database", sublabel: "Digital Twins · Certifications · Capability Maps", category: "data", x: 30, y: 80 },
  { id: "auditor-network", label: "Auditor Network", sublabel: "Certified Auditors · Global Coverage · VDA/IATF", category: "data", x: 50, y: 88 },
  { id: "evidence-vault", label: "Evidence Vault", sublabel: "Photos · Documents · Blockchain Timestamps", category: "data", x: 70, y: 80 },

  // Output & Deliverables (right)
  { id: "client-portal", label: "Client Portal", sublabel: "Dashboards · Track Orders · Download Reports", category: "output", x: 88, y: 48 },
  { id: "compliance-engine", label: "Compliance Engine", sublabel: "EU Standards · ISO · ASME · API · PED", category: "output", x: 88, y: 66 },
];

const dataFlows: DataFlow[] = [
  // Global clients → Gateway
  { from: "client-eu", to: "api-gateway", label: "HTTPS / SSO", scenario: "BMW logs in", animGroup: 0 },
  { from: "client-mena", to: "api-gateway", label: "HTTPS / SSO", scenario: "ADNOC request", animGroup: 0.3 },
  { from: "client-americas", to: "api-gateway", label: "HTTPS / SSO", scenario: "GM inquiry", animGroup: 0.6 },

  // Gateway → Platform
  { from: "api-gateway", to: "ceip-ai", label: "Authenticated Requests", bidirectional: true, scenario: "Session verified", animGroup: 1.5 },

  // Platform → AI Agents
  { from: "ceip-ai", to: "agent-matchmaking", label: "", bidirectional: true, animGroup: 2.5 },
  { from: "ceip-ai", to: "agent-audit", label: "", bidirectional: true, animGroup: 2.5 },
  { from: "ceip-ai", to: "agent-report", label: "", bidirectional: true, animGroup: 2.5 },
  { from: "ceip-ai", to: "agent-inspection", label: "", bidirectional: true, animGroup: 2.5 },

  // Government feeds
  { from: "gov-ministry", to: "ceip-ai", label: "Policy & Funding", scenario: "EU funds approved", animGroup: 3 },
  { from: "fina-registry", to: "supplier-db", label: "Enterprise Data", scenario: "135k records synced", animGroup: 3.5 },

  // Data layer connections
  { from: "agent-matchmaking", to: "supplier-db", label: "Search & Match", bidirectional: true, scenario: "Top 5 matches found", animGroup: 4 },
  { from: "agent-audit", to: "auditor-network", label: "Assign Auditors", bidirectional: true, scenario: "Auditor dispatched", animGroup: 4.5 },
  { from: "agent-inspection", to: "evidence-vault", label: "Store Evidence", bidirectional: true, scenario: "42 photos uploaded", animGroup: 5 },
  { from: "agent-report", to: "evidence-vault", label: "Pull Evidence", scenario: "Report compiled", animGroup: 5.5 },

  // Output flows
  { from: "ceip-ai", to: "client-portal", label: "Results & Reports", bidirectional: true, scenario: "Report delivered", animGroup: 6 },
  { from: "agent-report", to: "compliance-engine", label: "Standards Check", bidirectional: true, scenario: "VDA 6.3 passed", animGroup: 6.5 },
  { from: "compliance-engine", to: "client-portal", label: "Certificates", scenario: "Certificate issued", animGroup: 7 },
];

const categoryColors: Record<SystemNode["category"], { bg: string; border: string; text: string }> = {
  platform:    { bg: "bg-[hsl(190,60%,10%)]",   border: "border-[hsl(190,80%,50%)]",  text: "text-[hsl(190,90%,80%)]" },
  client:      { bg: "bg-[hsl(220,60%,12%)]",    border: "border-[hsl(220,70%,55%)]",  text: "text-[hsl(220,80%,75%)]" },
  ai:          { bg: "bg-[hsl(190,60%,10%)]",    border: "border-[hsl(190,80%,50%)]",  text: "text-[hsl(190,90%,80%)]" },
  "ai-agent":  { bg: "bg-[hsl(190,50%,8%)]",     border: "border-[hsl(190,60%,40%)]",  text: "text-[hsl(190,70%,70%)]" },
  gov:         { bg: "bg-[hsl(0,50%,12%)]",      border: "border-[hsl(0,60%,50%)]",    text: "text-[hsl(0,70%,72%)]" },
  data:        { bg: "bg-[hsl(160,50%,10%)]",    border: "border-[hsl(160,60%,45%)]",  text: "text-[hsl(160,70%,70%)]" },
  integration: { bg: "bg-[hsl(240,50%,12%)]",    border: "border-[hsl(240,60%,55%)]",  text: "text-[hsl(240,70%,75%)]" },
  output:      { bg: "bg-[hsl(270,50%,12%)]",    border: "border-[hsl(270,60%,55%)]",  text: "text-[hsl(270,70%,75%)]" },
};

const categoryLabels: { category: SystemNode["category"]; label: string; dotColor: string }[] = [
  { category: "client", label: "Global Clients", dotColor: "bg-[hsl(220,70%,55%)]" },
  { category: "integration", label: "24/7 Gateway", dotColor: "bg-[hsl(240,60%,55%)]" },
  { category: "ai", label: "CEIP AI Core", dotColor: "bg-[hsl(190,80%,50%)]" },
  { category: "ai-agent", label: "AI Agents", dotColor: "bg-[hsl(190,60%,40%)]" },
  { category: "gov", label: "Croatian Government", dotColor: "bg-[hsl(0,60%,50%)]" },
  { category: "data", label: "Data & Network", dotColor: "bg-[hsl(160,60%,45%)]" },
  { category: "output", label: "Client Deliverables", dotColor: "bg-[hsl(270,60%,55%)]" },
];

const FlowDot = ({ pathId, delay, duration = 3 }: { pathId: string; delay: number; duration?: number }) => (
  <>
    <circle r="3.5" fill="hsl(190, 80%, 55%)" filter="url(#dot-glow)">
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
            <span className="text-xs font-mono text-white/70 tracking-wider uppercase">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Scenario Label */}
      <div className="flex items-center gap-3">
        <div className="relative w-2.5 h-2.5">
          <div className="absolute inset-0 rounded-full bg-[hsl(190,80%,50%)] animate-ping opacity-60" />
          <div className="absolute inset-0 rounded-full bg-[hsl(190,80%,55%)]" />
        </div>
        <span className="text-xs font-mono text-white/50 tracking-wider uppercase">
          Live Scenario — Global client finds partner → Orders audit → Receives VDA 6.3 report → 24/7 access
        </span>
      </div>

      {/* Government Badge */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-[hsl(0,50%,30%)] bg-[hsl(0,40%,8%)]">
        <div className="w-6 h-6 rounded-full bg-[hsl(0,60%,45%)] flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-white">HR</span>
        </div>
        <span className="text-xs text-white/70 font-mono">
          Croatian Government Project — Ministry of Economy and Sustainable Development — EU Co-funded
        </span>
      </div>

      {/* Main Landscape */}
      <div className="relative w-full aspect-[16/10] min-h-[520px] md:min-h-[700px] rounded-xl border border-white/10"
        style={{
          background: 'linear-gradient(160deg, hsl(220, 20%, 7%), hsl(220, 15%, 4%), hsl(220, 20%, 8%))',
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
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none"
          style={{
            left: '50%', top: '46%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(190, 80%, 35%) 0%, transparent 65%)'
          }}
        />

        {/* Data flow lines + animated dots */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow-end" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.35)" />
            </marker>
            <marker id="arrow-start" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse">
              <polygon points="8 0, 0 3, 8 6" fill="rgba(255,255,255,0.35)" />
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
                  stroke="rgba(255,255,255,0.18)"
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
                  <text x={cx} y={cy - 7} fill="rgba(255,255,255,0.45)" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">
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
              className={`absolute z-10 ${isCenter ? 'w-[200px] md:w-[250px]' : isAgent ? 'w-[150px] md:w-[180px]' : 'w-[140px] md:w-[175px]'}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className={`
                ${colors.bg} ${colors.border} border backdrop-blur-md rounded-lg
                ${isCenter ? 'p-4 md:p-5 border-2 shadow-[0_0_30px_rgba(0,200,220,0.15)]' : isAgent ? 'p-3 md:p-3.5 border-dashed' : 'p-2.5 md:p-3'}
                transition-all hover:scale-105
              `}>
                {isCenter && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[hsl(190,80%,40%)] rounded-full">
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.15em]">CEIP Core</span>
                  </div>
                )}
                {isAgent && (
                  <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-[hsl(190,50%,25%)] border border-[hsl(190,60%,40%)] rounded">
                    <span className="text-[8px] font-bold text-[hsl(190,70%,70%)] uppercase tracking-[0.15em]">AI Agent</span>
                  </div>
                )}
                {node.category === "gov" && (
                  <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-[hsl(0,50%,25%)] border border-[hsl(0,60%,45%)] rounded">
                    <span className="text-[8px] font-bold text-[hsl(0,70%,72%)] uppercase tracking-[0.15em]">Gov</span>
                  </div>
                )}
                <div className={`${isCenter ? 'text-sm md:text-base' : 'text-[11px] md:text-xs'} font-bold ${colors.text} leading-tight ${isAgent || node.category === "gov" ? 'mt-1' : ''}`}>
                  {node.label}
                </div>
                <div className={`${isCenter ? 'text-[11px] md:text-xs' : 'text-[9px] md:text-[10px]'} text-white/55 mt-1 leading-tight`}>
                  {node.sublabel}
                </div>
                {isCenter && (
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    {["Find Partners", "Order Audits", "View Reports", "Track Inspections", "AI Matchmaking", "24/7 Access"].map(mod => (
                      <div key={mod} className="text-[8px] md:text-[9px] text-[hsl(190,80%,65%)] bg-[hsl(190,60%,15%)] border border-[hsl(190,50%,30%)] rounded px-1.5 py-0.5 text-center font-mono">
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
        <div className="absolute top-3 left-4 text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase">Global Client Access Zone</div>
        <div className="absolute top-3 right-4 text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase">24/7 Gateway</div>
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase">Croatian Gov & Data Zone</div>
        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase">Deliverables Zone</div>
      </div>

      {/* Key Integration Points */}
      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {[
          { title: "Global 24/7 Access", desc: "Clients worldwide connect via secure SSO gateway. Multi-language support, global CDN ensures sub-second response times from any continent." },
          { title: "AI Partner Matchmaking", desc: "CEIP AI searches 135,000+ Croatian enterprises from FINA registry, scores capabilities, certifications, and capacity to find the perfect supplier match." },
          { title: "Audit & Inspection Orders", desc: "Clients order VDA 6.3, IATF 16949, or ISO 9001 audits directly. AI assigns certified auditors, schedules on-site visits, and manages the full workflow." },
          { title: "Croatian Gov Integration", desc: "Co-funded by the Ministry of Economy and Sustainable Development. Connected to FINA business registry for verified Croatian enterprise data and financial transparency." },
        ].map((point, i) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-5 border border-white/15 rounded-xl bg-white/[0.04]"
          >
            <div className="w-8 h-1 bg-[hsl(190,60%,40%)] rounded-full mb-4" />
            <h4 className="text-sm font-bold text-white mb-2 font-mono">{point.title}</h4>
            <p className="text-xs text-white/55 leading-relaxed">{point.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LNGITLandscape;
