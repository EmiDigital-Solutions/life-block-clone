import { motion } from "framer-motion";

/**
 * IT Landscape Architecture — Full Lifecycle EPC Solution
 * Realistic enterprise integration map with RCA AI at the center
 */

interface SystemNode {
  id: string;
  label: string;
  sublabel: string;
  category: "erp" | "engineering" | "field" | "ai" | "analytics" | "compliance" | "document" | "integration";
  x: number; // % from left
  y: number; // % from top
}

interface DataFlow {
  from: string;
  to: string;
  label: string;
  bidirectional?: boolean;
}

const systems: SystemNode[] = [
  // ERP Layer (top-left)
  { id: "erp", label: "Numen / 1C ERP", sublabel: "Purchase Orders · Contracts · Cost Control", category: "erp", x: 12, y: 12 },
  { id: "procurement", label: "Procurement Module", sublabel: "Vendor Management · RFQ · PO Tracking", category: "erp", x: 12, y: 30 },

  // Engineering Data Backbone (top-right)
  { id: "eng-backbone", label: "Engineering Data Backbone", sublabel: "AVEVA E3D · SmartPlant · PDMS", category: "engineering", x: 78, y: 8 },
  { id: "doc-mgmt", label: "EDMS / Aconex", sublabel: "Drawing Register · Transmittals · RFIs", category: "document", x: 82, y: 26 },
  { id: "3d-model", label: "3D Model Repository", sublabel: "Navisworks · Review · Clash Detection", category: "engineering", x: 68, y: 22 },

  // RCA AI Center
  { id: "rca-ai", label: "RCA AI Platform", sublabel: "Inspection · Claims · Analytics · CV", category: "ai", x: 47, y: 48 },

  // Field Systems (bottom-left)
  { id: "field-app", label: "Field Inspection App", sublabel: "ScanPro+ · Tablet · Offline Sync", category: "field", x: 8, y: 62 },
  { id: "iot-sensors", label: "IoT & Sensors", sublabel: "Weld Heat Input · NDT Crawlers · GPS", category: "field", x: 8, y: 80 },
  { id: "cv-engine", label: "Computer Vision", sublabel: "RT Film AI · Weld Quality · Coating", category: "field", x: 28, y: 78 },

  // Analytics & Reporting (bottom-right)
  { id: "bi-dashboard", label: "BI & Dashboards", sublabel: "Power BI · Real-time KPIs · Monte Carlo", category: "analytics", x: 72, y: 72 },
  { id: "schedule", label: "Scheduling Engine", sublabel: "Primavera P6 · Critical Path · Delay Attribution", category: "analytics", x: 88, y: 56 },

  // Compliance (right side)
  { id: "compliance", label: "Compliance Gateway", sublabel: "ASME · API · EN · ISO 3834 · PED", category: "compliance", x: 88, y: 40 },

  // Integration Layer (left middle)
  { id: "api-gateway", label: "API Gateway / ESB", sublabel: "REST · OPC-UA · MQTT · Kafka", category: "integration", x: 28, y: 44 },

  // Supplier Portal
  { id: "supplier-portal", label: "Supplier Portal", sublabel: "Claims · Change Requests · Evidence", category: "integration", x: 50, y: 88 },
];

const dataFlows: DataFlow[] = [
  { from: "erp", to: "api-gateway", label: "PO / Cost Data", bidirectional: true },
  { from: "procurement", to: "api-gateway", label: "Vendor Status" },
  { from: "api-gateway", to: "rca-ai", label: "Unified Data Bus", bidirectional: true },
  { from: "eng-backbone", to: "rca-ai", label: "Design Data / P&ID", bidirectional: false },
  { from: "doc-mgmt", to: "rca-ai", label: "ITP / Drawings", bidirectional: true },
  { from: "3d-model", to: "rca-ai", label: "3D Geometry + Clash", bidirectional: false },
  { from: "field-app", to: "rca-ai", label: "Inspection Reports", bidirectional: true },
  { from: "iot-sensors", to: "cv-engine", label: "Sensor Streams" },
  { from: "cv-engine", to: "rca-ai", label: "AI Findings" },
  { from: "rca-ai", to: "bi-dashboard", label: "Analytics Feed" },
  { from: "rca-ai", to: "schedule", label: "Delay Attribution", bidirectional: true },
  { from: "rca-ai", to: "compliance", label: "Code Validation", bidirectional: true },
  { from: "rca-ai", to: "supplier-portal", label: "Claims & CO", bidirectional: true },
  { from: "schedule", to: "erp", label: "Cost Forecast" },
];

const categoryColors: Record<SystemNode["category"], { bg: string; border: string; text: string; glow: string }> = {
  erp: { bg: "bg-blue-950/80", border: "border-blue-400/40", text: "text-blue-300", glow: "shadow-blue-500/20" },
  engineering: { bg: "bg-emerald-950/80", border: "border-emerald-400/40", text: "text-emerald-300", glow: "shadow-emerald-500/20" },
  field: { bg: "bg-amber-950/80", border: "border-amber-400/40", text: "text-amber-300", glow: "shadow-amber-500/20" },
  ai: { bg: "bg-cyan-950/90", border: "border-cyan-400/60", text: "text-cyan-300", glow: "shadow-cyan-500/30" },
  analytics: { bg: "bg-purple-950/80", border: "border-purple-400/40", text: "text-purple-300", glow: "shadow-purple-500/20" },
  compliance: { bg: "bg-red-950/80", border: "border-red-400/40", text: "text-red-300", glow: "shadow-red-500/20" },
  document: { bg: "bg-slate-800/80", border: "border-slate-400/40", text: "text-slate-300", glow: "shadow-slate-500/20" },
  integration: { bg: "bg-indigo-950/80", border: "border-indigo-400/40", text: "text-indigo-300", glow: "shadow-indigo-500/20" },
};

const categoryLabels: { category: SystemNode["category"]; label: string; color: string }[] = [
  { category: "erp", label: "ERP / Finance", color: "bg-blue-400" },
  { category: "engineering", label: "Engineering", color: "bg-emerald-400" },
  { category: "field", label: "Field / IoT", color: "bg-amber-400" },
  { category: "ai", label: "RCA AI Core", color: "bg-cyan-400" },
  { category: "analytics", label: "Analytics", color: "bg-purple-400" },
  { category: "compliance", label: "Compliance", color: "bg-red-400" },
  { category: "integration", label: "Integration", color: "bg-indigo-400" },
  { category: "document", label: "Document Mgmt", color: "bg-slate-400" },
];

const LNGITLandscape = () => {
  return (
    <div className="space-y-8">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {categoryLabels.map((c) => (
          <div key={c.category} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
            <span className="text-[11px] font-mono text-white/50 tracking-wider uppercase">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Main Landscape — SVG + absolutely positioned nodes */}
      <div className="relative w-full aspect-[16/10] min-h-[500px] md:min-h-[650px] rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(160deg, hsl(220, 20%, 8%), hsl(220, 15%, 5%), hsl(220, 20%, 10%))' }}>

        {/* Grid pattern background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
          <defs>
            <pattern id="landscape-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#landscape-grid)" />
        </svg>

        {/* Radial glow behind RCA AI */}
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            left: '47%', top: '48%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(190, 80%, 40%) 0%, transparent 70%)'
          }}
        />

        {/* Data flow lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 625" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.25)" />
            </marker>
            <marker id="arrowhead-bi" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse">
              <polygon points="8 0, 0 3, 8 6" fill="rgba(255,255,255,0.25)" />
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
            // Slight curve
            const dx = x2 - x1;
            const dy = y2 - y1;
            const cx = mx - dy * 0.15;
            const cy = my + dx * 0.15;

            return (
              <g key={`flow-${i}`}>
                <motion.path
                  d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.2"
                  strokeDasharray="6 4"
                  markerEnd="url(#arrowhead)"
                  markerStart={flow.bidirectional ? "url(#arrowhead-bi)" : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.08 }}
                />
                {/* Flow label */}
                <text x={cx} y={cy - 6} fill="rgba(255,255,255,0.25)" fontSize="7" textAnchor="middle" fontFamily="monospace">
                  {flow.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* System Nodes */}
        {systems.map((node, i) => {
          const colors = categoryColors[node.category];
          const isCenter = node.category === "ai";
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
              className={`absolute z-10 ${isCenter ? 'w-[200px] md:w-[240px]' : 'w-[140px] md:w-[170px]'}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className={`
                ${colors.bg} ${colors.border} border backdrop-blur-sm rounded-lg
                ${isCenter ? 'p-4 md:p-5 shadow-lg ring-1 ring-cyan-400/20' : 'p-2.5 md:p-3'}
                ${isCenter ? colors.glow : ''} shadow-md
                transition-all hover:scale-105
              `}>
                {isCenter && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-cyan-500/90 rounded-full">
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">Core Engine</span>
                  </div>
                )}
                <div className={`${isCenter ? 'text-sm md:text-base' : 'text-[11px] md:text-xs'} font-bold ${colors.text} leading-tight`}>
                  {node.label}
                </div>
                <div className={`${isCenter ? 'text-[10px] md:text-[11px]' : 'text-[9px] md:text-[10px]'} text-white/35 mt-1 leading-tight`}>
                  {node.sublabel}
                </div>
                {isCenter && (
                  <div className="mt-3 grid grid-cols-2 gap-1">
                    {["Inspection AI", "Claims Engine", "CV Analysis", "Risk Scoring"].map(mod => (
                      <div key={mod} className="text-[8px] md:text-[9px] text-cyan-400/70 bg-cyan-400/10 rounded px-1.5 py-0.5 text-center font-mono">
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
        <div className="absolute top-3 left-4 text-[9px] font-mono text-white/15 tracking-[0.3em] uppercase">ERP & Finance Zone</div>
        <div className="absolute top-3 right-4 text-[9px] font-mono text-white/15 tracking-[0.3em] uppercase">Engineering Zone</div>
        <div className="absolute bottom-3 left-4 text-[9px] font-mono text-white/15 tracking-[0.3em] uppercase">Field Operations Zone</div>
        <div className="absolute bottom-3 right-4 text-[9px] font-mono text-white/15 tracking-[0.3em] uppercase">Analytics Zone</div>
      </div>

      {/* Key Integration Points */}
      <div className="grid md:grid-cols-4 gap-4 mt-8">
        {[
          { title: "ERP ↔ RCA AI", desc: "Numen/1C pushes PO data, contracts and cost baselines. RCA returns claim amounts, penalty forecasts, and change order costs for automatic booking.", icon: "📊" },
          { title: "Engineering ↔ RCA AI", desc: "AVEVA/SmartPlant feeds design data, P&IDs, isometrics. 3D model clash data triggers inspection priority re-ranking in real time.", icon: "⚙️" },
          { title: "Field ↔ RCA AI", desc: "ScanPro+ tablets sync inspection data offline. IoT sensors stream weld parameters. CV engine processes RT films and coating thickness maps.", icon: "📱" },
          { title: "Analytics ↔ Schedule", desc: "Primavera P6 critical path integrates with RCA delay attribution. Monte Carlo simulation feeds back to ERP for cost forecast updates.", icon: "📈" },
        ].map((point, i) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-5 border border-white/10 rounded-xl bg-white/[0.03] backdrop-blur-sm"
          >
            <div className="text-2xl mb-3">{point.icon}</div>
            <h4 className="text-sm font-bold text-white/90 mb-2 font-mono">{point.title}</h4>
            <p className="text-[11px] text-white/40 leading-relaxed">{point.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LNGITLandscape;
