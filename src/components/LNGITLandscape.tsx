import { motion } from "framer-motion";

/**
 * IT Landscape Architecture — Full Lifecycle EPC Solution
 * Realistic enterprise integration map with RCA AI at the center
 */

interface SystemNode {
  id: string;
  label: string;
  sublabel: string;
  category: "erp" | "engineering" | "field" | "ai" | "analytics" | "compliance" | "document" | "integration" | "ai-agent";
  x: number;
  y: number;
}

interface DataFlow {
  from: string;
  to: string;
  label: string;
  bidirectional?: boolean;
}

const systems: SystemNode[] = [
  // ERP Layer (top-left)
  { id: "erp", label: "Numen / 1C ERP", sublabel: "Purchase Orders · Contracts · Cost Control", category: "erp", x: 12, y: 10 },
  { id: "procurement", label: "Procurement Module", sublabel: "Vendor Management · RFQ · PO Tracking", category: "erp", x: 12, y: 26 },

  // Engineering Data Backbone (top-right)
  { id: "eng-backbone", label: "Engineering Data Backbone", sublabel: "AVEVA E3D · SmartPlant · PDMS", category: "engineering", x: 80, y: 8 },
  { id: "doc-mgmt", label: "EDMS / Aconex", sublabel: "Drawing Register · Transmittals · RFIs", category: "document", x: 84, y: 24 },
  { id: "3d-model", label: "3D Model Repository", sublabel: "Navisworks · Review · Clash Detection", category: "engineering", x: 68, y: 20 },

  // RCA AI Center
  { id: "rca-ai", label: "RCA AI Platform", sublabel: "Central Intelligence Layer", category: "ai", x: 47, y: 46 },

  // AI Agents (surrounding the center)
  { id: "agent-inspection", label: "Inspection Agent", sublabel: "ITP Execution · NCR Generation · Checklist AI", category: "ai-agent", x: 34, y: 34 },
  { id: "agent-claims", label: "Claims Agent", sublabel: "Fault Attribution · FIDIC Clauses · LD Calc", category: "ai-agent", x: 60, y: 34 },
  { id: "agent-cv", label: "CV Analysis Agent", sublabel: "RT Film · Weld Quality · Coating Thickness", category: "ai-agent", x: 34, y: 60 },
  { id: "agent-forecast", label: "Forecast Agent", sublabel: "Monte Carlo · Cost Prediction · Schedule Risk", category: "ai-agent", x: 60, y: 60 },

  // Field Systems (bottom-left)
  { id: "field-app", label: "Field Inspection App", sublabel: "ScanPro+ · Tablet · Offline Sync", category: "field", x: 8, y: 58 },
  { id: "iot-sensors", label: "IoT & Sensors", sublabel: "Weld Heat Input · NDT Crawlers · GPS", category: "field", x: 8, y: 76 },
  { id: "cv-engine", label: "Computer Vision Engine", sublabel: "RT Film AI · Defect Classification", category: "field", x: 26, y: 80 },

  // Analytics & Reporting (bottom-right)
  { id: "bi-dashboard", label: "BI & Dashboards", sublabel: "Real-time KPIs · Project Health", category: "analytics", x: 74, y: 74 },
  { id: "schedule", label: "Scheduling Engine", sublabel: "Primavera P6 · Critical Path · Delay Attribution", category: "analytics", x: 90, y: 54 },

  // Compliance (right side)
  { id: "compliance", label: "Compliance Gateway", sublabel: "ASME · API · EN · ISO 3834 · PED", category: "compliance", x: 90, y: 38 },

  // Integration Layer (left middle)
  { id: "api-gateway", label: "API Gateway / ESB", sublabel: "REST · OPC-UA · MQTT · Kafka", category: "integration", x: 26, y: 44 },

  // Supplier Portal
  { id: "supplier-portal", label: "Supplier Portal", sublabel: "Claims · Change Requests · Evidence", category: "integration", x: 50, y: 88 },
];

const dataFlows: DataFlow[] = [
  { from: "erp", to: "api-gateway", label: "PO / Cost Data", bidirectional: true },
  { from: "procurement", to: "api-gateway", label: "Vendor Status" },
  { from: "api-gateway", to: "rca-ai", label: "Unified Data Bus", bidirectional: true },
  { from: "eng-backbone", to: "rca-ai", label: "Design Data / P&ID" },
  { from: "doc-mgmt", to: "rca-ai", label: "ITP / Drawings", bidirectional: true },
  { from: "3d-model", to: "rca-ai", label: "3D Geometry + Clash" },
  { from: "field-app", to: "agent-inspection", label: "Inspection Reports", bidirectional: true },
  { from: "iot-sensors", to: "cv-engine", label: "Sensor Streams" },
  { from: "cv-engine", to: "agent-cv", label: "AI Findings" },
  { from: "agent-inspection", to: "rca-ai", label: "", bidirectional: true },
  { from: "agent-claims", to: "rca-ai", label: "", bidirectional: true },
  { from: "agent-cv", to: "rca-ai", label: "", bidirectional: true },
  { from: "agent-forecast", to: "rca-ai", label: "", bidirectional: true },
  { from: "rca-ai", to: "bi-dashboard", label: "Analytics Feed" },
  { from: "agent-forecast", to: "schedule", label: "Delay Attribution", bidirectional: true },
  { from: "rca-ai", to: "compliance", label: "Code Validation", bidirectional: true },
  { from: "agent-claims", to: "supplier-portal", label: "Claims & CO", bidirectional: true },
  { from: "schedule", to: "erp", label: "Cost Forecast" },
];

const categoryColors: Record<SystemNode["category"], { bg: string; border: string; text: string }> = {
  erp:         { bg: "bg-[hsl(220,60%,12%)]",  border: "border-[hsl(220,70%,55%)]",  text: "text-[hsl(220,80%,75%)]" },
  engineering: { bg: "bg-[hsl(160,50%,10%)]",   border: "border-[hsl(160,60%,45%)]",  text: "text-[hsl(160,70%,70%)]" },
  field:       { bg: "bg-[hsl(35,60%,12%)]",    border: "border-[hsl(35,70%,50%)]",   text: "text-[hsl(35,80%,72%)]" },
  ai:          { bg: "bg-[hsl(190,60%,10%)]",   border: "border-[hsl(190,80%,50%)]",  text: "text-[hsl(190,90%,80%)]" },
  "ai-agent":  { bg: "bg-[hsl(190,50%,8%)]",    border: "border-[hsl(190,60%,40%)]",  text: "text-[hsl(190,70%,70%)]" },
  analytics:   { bg: "bg-[hsl(270,50%,12%)]",   border: "border-[hsl(270,60%,55%)]",  text: "text-[hsl(270,70%,75%)]" },
  compliance:  { bg: "bg-[hsl(0,50%,12%)]",     border: "border-[hsl(0,60%,50%)]",    text: "text-[hsl(0,70%,72%)]" },
  document:    { bg: "bg-[hsl(220,15%,15%)]",   border: "border-[hsl(220,20%,45%)]",  text: "text-[hsl(220,25%,72%)]" },
  integration: { bg: "bg-[hsl(240,50%,12%)]",   border: "border-[hsl(240,60%,55%)]",  text: "text-[hsl(240,70%,75%)]" },
};

const categoryLabels: { category: SystemNode["category"]; label: string; dotColor: string }[] = [
  { category: "erp", label: "ERP / Finance", dotColor: "bg-[hsl(220,70%,55%)]" },
  { category: "engineering", label: "Engineering", dotColor: "bg-[hsl(160,60%,45%)]" },
  { category: "field", label: "Field / IoT", dotColor: "bg-[hsl(35,70%,50%)]" },
  { category: "ai", label: "RCA AI Core", dotColor: "bg-[hsl(190,80%,50%)]" },
  { category: "ai-agent", label: "AI Agents", dotColor: "bg-[hsl(190,60%,40%)]" },
  { category: "analytics", label: "Analytics", dotColor: "bg-[hsl(270,60%,55%)]" },
  { category: "compliance", label: "Compliance", dotColor: "bg-[hsl(0,60%,50%)]" },
  { category: "integration", label: "Integration", dotColor: "bg-[hsl(240,60%,55%)]" },
];

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

      {/* Main Landscape */}
      <div className="relative w-full aspect-[16/10] min-h-[520px] md:min-h-[680px] rounded-xl overflow-hidden border border-white/10"
        style={{ background: 'linear-gradient(160deg, hsl(220, 20%, 7%), hsl(220, 15%, 4%), hsl(220, 20%, 8%))' }}>

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" aria-hidden="true">
          <defs>
            <pattern id="landscape-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#landscape-grid)" />
        </svg>

        {/* Radial glow behind RCA AI */}
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            left: '47%', top: '46%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(190, 80%, 35%) 0%, transparent 65%)'
          }}
        />

        {/* Data flow lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow-end" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.35)" />
            </marker>
            <marker id="arrow-start" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse">
              <polygon points="8 0, 0 3, 8 6" fill="rgba(255,255,255,0.35)" />
            </marker>
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

            return (
              <g key={`flow-${i}`}>
                <motion.path
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
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.15em]">Core Engine</span>
                  </div>
                )}
                {isAgent && (
                  <div className="absolute -top-2.5 left-3 px-2 py-0.5 bg-[hsl(190,50%,25%)] border border-[hsl(190,60%,40%)] rounded">
                    <span className="text-[8px] font-bold text-[hsl(190,70%,70%)] uppercase tracking-[0.15em]">AI Agent</span>
                  </div>
                )}
                <div className={`${isCenter ? 'text-sm md:text-base' : 'text-[11px] md:text-xs'} font-bold ${colors.text} leading-tight ${isAgent ? 'mt-1' : ''}`}>
                  {node.label}
                </div>
                <div className={`${isCenter ? 'text-[11px] md:text-xs' : 'text-[9px] md:text-[10px]'} text-white/55 mt-1 leading-tight`}>
                  {node.sublabel}
                </div>
                {isCenter && (
                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    {["Inspection AI", "Claims Engine", "CV Analysis", "Risk Scoring", "Delay Attribution", "Change Orders"].map(mod => (
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
        <div className="absolute top-3 left-4 text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase">ERP & Finance Zone</div>
        <div className="absolute top-3 right-4 text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase">Engineering Zone</div>
        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase">Field Operations Zone</div>
        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase">Analytics Zone</div>
      </div>

      {/* Key Integration Points — no emoji icons */}
      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {[
          { title: "ERP ↔ RCA AI", desc: "Numen/1C pushes PO data, contracts and cost baselines. RCA returns claim amounts, penalty forecasts, and change order costs for automatic booking." },
          { title: "Engineering ↔ RCA AI", desc: "AVEVA/SmartPlant feeds design data, P&IDs, isometrics. 3D model clash data triggers inspection priority re-ranking in real time." },
          { title: "Field ↔ AI Agents", desc: "ScanPro+ tablets sync with the Inspection Agent. IoT sensors stream to the CV Analysis Agent. All findings feed back to the central AI platform." },
          { title: "AI Agents ↔ Output", desc: "Claims Agent generates FIDIC-based notices. Forecast Agent runs Monte Carlo simulations. All agents report to central RCA AI for unified decision-making." },
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
