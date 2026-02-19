import { motion } from "framer-motion";
import { Mail, FileText, Phone, Database, BookOpen, Truck, BarChart3, PenTool, AlertTriangle, XCircle, Clock, Unlink } from "lucide-react";

/**
 * "The Fragmentation Trap" — spaghetti diagram showing
 * chaotic current-state data flows in traditional EPC inspection.
 * Light background. Uses Naumen/1C (not SAP).
 */

interface TrapNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
}

interface TrapFlow {
  from: string;
  to: string;
  label: string;
  broken?: boolean;
}

const nodes: TrapNode[] = [
  { id: "cad",        label: "CAD System",         icon: <PenTool size={16} />,       x: 18, y: 12 },
  { id: "email",      label: "Outlook Email",       icon: <Mail size={16} />,          x: 50, y: 12 },
  { id: "whatsapp",   label: "WhatsApp / Phone",    icon: <Phone size={16} />,         x: 82, y: 12 },
  { id: "pdf",        label: "PDF Report",          icon: <FileText size={16} />,      x: 18, y: 50 },
  { id: "erp",        label: "Naumen / 1C",         icon: <Database size={16} />,      x: 82, y: 50 },
  { id: "logbook",    label: "Paper Logbook",        icon: <BookOpen size={16} />,      x: 12, y: 88 },
  { id: "supplier",   label: "Supplier System",     icon: <Truck size={16} />,         x: 46, y: 88 },
  { id: "spaghetti",  label: "Spaghetti Chart",     icon: <BarChart3 size={16} />,     x: 80, y: 88 },
];

const flows: TrapFlow[] = [
  { from: "cad", to: "email", label: "Manual Entry" },
  { from: "email", to: "whatsapp", label: "File Transfer", broken: true },
  { from: "cad", to: "pdf", label: "Copy / Paste" },
  { from: "cad", to: "erp", label: "Copy / Paste" },
  { from: "email", to: "pdf", label: "Copy / Paste" },
  { from: "email", to: "erp", label: "Manual Entry", broken: true },
  { from: "email", to: "supplier", label: "File Transfer" },
  { from: "whatsapp", to: "erp", label: "Copy / Paste", broken: true },
  { from: "whatsapp", to: "pdf", label: "File Transfer" },
  { from: "whatsapp", to: "spaghetti", label: "Copy / Paste" },
  { from: "pdf", to: "erp", label: "Manual Entry" },
  { from: "pdf", to: "logbook", label: "Manual Entry" },
  { from: "pdf", to: "supplier", label: "Manual Entry", broken: true },
  { from: "erp", to: "spaghetti", label: "File Transfer" },
  { from: "erp", to: "supplier", label: "Copy / Paste" },
  { from: "logbook", to: "supplier", label: "Manual Entry" },
  { from: "supplier", to: "spaghetti", label: "Copy / Paste" },
  { from: "cad", to: "supplier", label: "Manual Entry", broken: true },
  { from: "cad", to: "whatsapp", label: "Copy / Paste" },
  { from: "email", to: "logbook", label: "Manual Entry" },
  { from: "whatsapp", to: "supplier", label: "Copy / Paste", broken: true },
  { from: "logbook", to: "erp", label: "Manual Entry" },
  { from: "pdf", to: "spaghetti", label: "File Transfer" },
  { from: "cad", to: "logbook", label: "Copy / Paste" },
];

const urgencyAnnotations = [
  { text: "Specs lived in CAD —\nnever reach the tablet", x: 1, y: 30, anchor: "start" as const, icon: <AlertTriangle size={12} className="text-[hsl(0,70%,50%)]" /> },
  { text: "Changes agreed via chat\nNo read receipts. No audit trail.", x: 99, y: 6, anchor: "end" as const, icon: <XCircle size={12} className="text-[hsl(0,70%,50%)]" /> },
  { text: "Version conflicts —\nwhich PDF is current?", x: 1, y: 65, anchor: "start" as const, icon: <Unlink size={12} className="text-[hsl(25,85%,50%)]" /> },
  { text: "Progress reported\nin static PDFs. No one reads.", x: 99, y: 75, anchor: "end" as const, icon: <Clock size={12} className="text-[hsl(25,85%,50%)]" /> },
];

const FragmentationTrapSection = () => {
  return (
    <section data-nav-theme="light" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Header — project standard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground/20" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-foreground/40">Current Reality</span>
          </div>
          <h2 className="section-headline text-foreground">
            The fragmentation trap
          </h2>
          <p className="text-base md:text-lg text-foreground/50 mt-6 max-w-2xl leading-relaxed">
            In a typical EPC project, inspection data is scattered across 8+ disconnected systems. 
            Every handover is manual. Every transfer is a potential evidence gap. 
            When a claim arrives, you're doing <span className="font-bold text-foreground/70">digital archaeology</span> — not project management.
          </p>
        </motion.div>

        {/* Spaghetti Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[16/10] min-h-[450px] md:min-h-[600px] rounded-xl border border-foreground/10 bg-foreground/[0.02]"
          style={{ overflow: 'visible' }}
        >
          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            viewBox="0 0 1000 625"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker id="trap-arrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                <polygon points="0 0, 7 2.5, 0 5" fill="hsl(25, 90%, 55%)" />
              </marker>
              <marker id="trap-arrow-broken" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                <polygon points="0 0, 7 2.5, 0 5" fill="hsl(0, 70%, 50%)" />
              </marker>
            </defs>

            {/* Chaotic flow lines */}
            {flows.map((flow, i) => {
              const fromNode = nodes.find(n => n.id === flow.from)!;
              const toNode = nodes.find(n => n.id === flow.to)!;
              const x1 = fromNode.x * 10;
              const y1 = fromNode.y * 6.25;
              const x2 = toNode.x * 10;
              const y2 = toNode.y * 6.25;
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;
              const dx = x2 - x1;
              const dy = y2 - y1;
              const dir = i % 3 === 0 ? 1 : i % 3 === 1 ? -1 : 0.5;
              const offset = 0.15 + (i % 5) * 0.04;
              const cx = mx - dy * offset * dir;
              const cy = my + dx * offset * dir;
              const isBroken = flow.broken;

              return (
                <motion.path
                  key={`trap-flow-${i}`}
                  d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                  fill="none"
                  stroke={isBroken ? "hsl(0, 70%, 50%)" : "hsl(25, 85%, 55%)"}
                  strokeWidth={isBroken ? "2" : "1.5"}
                  strokeOpacity={isBroken ? 0.7 : 0.45 + (i % 3) * 0.12}
                  strokeDasharray={isBroken ? "6 4" : undefined}
                  markerEnd={isBroken ? "url(#trap-arrow-broken)" : "url(#trap-arrow)"}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.04 }}
                />
              );
            })}

            {/* Flow labels on key connections */}
            {flows.filter((_, i) => i < 10).map((flow, i) => {
              const fromNode = nodes.find(n => n.id === flow.from)!;
              const toNode = nodes.find(n => n.id === flow.to)!;
              const x1 = fromNode.x * 10;
              const y1 = fromNode.y * 6.25;
              const x2 = toNode.x * 10;
              const y2 = toNode.y * 6.25;
              const lx = (x1 + x2) / 2;
              const ly = (y1 + y2) / 2 - 6;

              return (
                <text
                  key={`trap-label-${i}`}
                  x={lx}
                  y={ly}
                  fill={flow.broken ? "hsl(0, 60%, 40%)" : "hsl(25, 70%, 40%)"}
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="600"
                  fontStyle="italic"
                  textAnchor="middle"
                  opacity="0.7"
                >
                  {flow.label}
                </text>
              );
            })}

            {/* Broken communication warnings — SVG text annotations */}
            {urgencyAnnotations.map((ann, i) => (
              <text
                key={`ann-${i}`}
                x={ann.x * 10}
                y={ann.y * 6.25}
                fill="hsl(220, 40%, 20%)"
                fontSize="11"
                fontFamily="sans-serif"
                fontWeight="600"
                textAnchor={ann.anchor}
                opacity="0.8"
              >
                {ann.text.split('\n').map((line, j) => (
                  <tspan key={j} x={ann.x * 10} dy={j === 0 ? 0 : 16}>{line}</tspan>
                ))}
              </text>
            ))}

            {/* "BROKEN" labels on red dashed lines */}
            {flows.filter(f => f.broken).slice(0, 3).map((flow, i) => {
              const fromNode = nodes.find(n => n.id === flow.from)!;
              const toNode = nodes.find(n => n.id === flow.to)!;
              const mx = ((fromNode.x + toNode.x) / 2) * 10;
              const my = ((fromNode.y + toNode.y) / 2) * 6.25 + 12;
              return (
                <g key={`broken-${i}`}>
                  <rect x={mx - 28} y={my - 7} width="56" height="14" rx="3" fill="hsl(0, 70%, 50%)" fillOpacity="0.15" />
                  <text x={mx} y={my + 3} fill="hsl(0, 65%, 45%)" fontSize="7" fontFamily="monospace" fontWeight="800" textAnchor="middle" letterSpacing="0.1em">
                    BROKEN
                  </text>
                </g>
              );
            })}
          </svg>

          {/* System Nodes with real icons */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="absolute z-10 w-[120px] md:w-[150px]"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="bg-background border-2 border-foreground/20 rounded-lg px-3 py-2.5 md:px-4 md:py-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-foreground/50">{node.icon}</span>
                  <span className="text-[11px] md:text-xs font-bold text-foreground tracking-tight leading-tight">
                    {node.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Result statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16"
        >
          <div className="max-w-4xl">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-[1.15]">
              Result: <span className="text-[hsl(0,70%,45%)]">"Digital Archaeology"</span> — scrambling to find 
              proof while the supplier demands ₽220M.
            </p>
            <p className="text-base md:text-lg text-foreground/45 mt-4 max-w-2xl leading-relaxed">
              24 manual transfer points. Zero traceability. Broken communication chains. 
              When a claim lands on your desk, you spend weeks reconstructing evidence that should have been captured at source.
            </p>
          </div>
        </motion.div>

        {/* Pain point stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { stat: "8+", label: "Disconnected systems" },
            { stat: "24", label: "Manual transfer points" },
            { stat: "72h", label: "Avg. time to find evidence" },
            { stat: "€0", label: "Recovered without proof" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 border border-foreground/10 rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-bold text-[hsl(0,70%,45%)] font-mono">{item.stat}</div>
              <div className="text-xs md:text-sm text-foreground/50 mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FragmentationTrapSection;
