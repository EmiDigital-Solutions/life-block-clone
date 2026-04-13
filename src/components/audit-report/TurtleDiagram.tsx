import { cn } from "@/lib/utils";
import type { Station } from "@/data/auditReportData";
import { Users, Cpu, FileText, Gauge, ArrowRight } from "lucide-react";

// VDA 6.3 Turtle Diagram — formal process visualization
// Shows: Input → Process → Output with 4 surrounding elements
// (Personnel, Equipment, Methods/Procedures, KPIs/Metrics)

interface TurtleDiagramProps {
  station: Station;
}

// Map station index to turtle data
function getTurtleData(station: Station) {
  const idx = station.index;
  const name = station.name;

  const baseData: Record<number, { inputs: string[]; outputs: string[]; personnel: string[]; equipment: string[]; methods: string[]; kpis: string[] }> = {
    2: {
      inputs: ['Customer requirements', 'Technical specifications', 'Quality targets', 'Feasibility study'],
      outputs: ['Project plan', 'Risk assessment (FMEA)', 'Resource allocation', 'Timeline milestones'],
      personnel: ['Project Manager', 'Quality Engineer', 'Design Engineer'],
      equipment: ['CAD/CAM systems', 'ERP software', 'Project management tools'],
      methods: ['VDA 4.3 Project Planning', 'APQP Phase 1-2', 'Risk analysis per ISO 31000'],
      kpis: ['Milestone adherence', 'Budget variance', 'Risk coverage rate'],
    },
    3: {
      inputs: ['Product design', 'Customer specifications', 'Material requirements', 'Tolerance specs'],
      outputs: ['Validated product', 'PPAP documentation', 'Control plan', 'Test reports'],
      personnel: ['Design Engineer', 'Test Engineer', 'Quality Manager'],
      equipment: ['CMM machines', 'Test rigs', 'Material testing lab'],
      methods: ['Design FMEA', 'DVP&R', 'GD&T analysis', 'PPAP per AIAG'],
      kpis: ['First-pass yield', 'Cpk values', 'Test coverage %'],
    },
    4: {
      inputs: ['Product requirements', 'Process FMEA', 'Equipment specs', 'Layout plans'],
      outputs: ['Validated process', 'Work instructions', 'Process flow diagram', 'SPC plan'],
      personnel: ['Process Engineer', 'Manufacturing Engineer', 'Maintenance Tech'],
      equipment: ['Production machinery', 'SPC software', 'Calibration equipment'],
      methods: ['Process FMEA', 'MSA', 'Capability studies (Cpk/Ppk)', 'Run@Rate'],
      kpis: ['Process capability (Cpk)', 'OEE', 'Cycle time adherence'],
    },
    5: {
      inputs: ['Raw materials', 'Sub-components', 'Work orders', 'Control plan'],
      outputs: ['Finished parts', 'Quality records', 'Traceability data', 'SPC charts'],
      personnel: ['Operators (trained)', 'Shift supervisors', 'Quality inspectors'],
      equipment: ['CNC machines', 'Injection molding', 'Assembly stations', 'Gauges'],
      methods: ['Control plan execution', 'Work instructions', 'Layered process audits'],
      kpis: ['Scrap rate', 'Rework %', 'PPM internal', 'OEE'],
    },
    6: {
      inputs: ['Customer orders', 'Delivery schedules', 'Inventory data', 'Logistics plan'],
      outputs: ['On-time deliveries', 'Shipping documentation', 'Customer satisfaction data'],
      personnel: ['Logistics Manager', 'Warehouse Staff', 'Customer Service'],
      equipment: ['WMS system', 'Barcode scanners', 'Packaging equipment'],
      methods: ['FIFO management', 'EDI processing', 'Container management'],
      kpis: ['OTD rate', 'Inventory turns', 'Shipping accuracy'],
    },
    7: {
      inputs: ['Customer feedback', 'Warranty claims', 'Field returns', 'Audit findings'],
      outputs: ['CAPA reports', 'Lessons learned', 'Process improvements', 'Updated FMEA'],
      personnel: ['Quality Manager', 'CAPA coordinator', 'Process owner'],
      equipment: ['8D software', 'Root cause analysis tools', 'Statistical software'],
      methods: ['8D methodology', 'Ishikawa analysis', '5-Why', 'PDCA cycle'],
      kpis: ['CAPA closure rate', 'Recurrence rate', 'Customer PPM'],
    },
    8: {
      inputs: ['Supplier quotations', 'Material specs', 'Quality requirements'],
      outputs: ['Approved suppliers', 'Incoming inspection data', 'Supplier scorecards'],
      personnel: ['Purchasing Manager', 'SQE', 'Incoming Inspector'],
      equipment: ['Inspection equipment', 'Supplier portal', 'ERP system'],
      methods: ['Supplier audit (VDA 6.3)', 'PPAP review', 'Incoming inspection plan'],
      kpis: ['Supplier PPM', 'Delivery reliability', 'Audit score trend'],
    },
    9: {
      inputs: ['Management targets', 'KPI reports', 'Internal audit results', 'Customer scorecards'],
      outputs: ['Management review minutes', 'Improvement actions', 'Resource decisions', 'Policy updates'],
      personnel: ['Plant Manager', 'Quality Director', 'Department heads'],
      equipment: ['BI dashboard', 'Reporting systems', 'Meeting infrastructure'],
      methods: ['Management review per ISO 9001 §9.3', 'KPI monitoring', 'Balanced scorecard'],
      kpis: ['Customer satisfaction index', 'Cost of quality', 'Improvement rate'],
    },
  };

  return baseData[idx] || {
    inputs: ['Process inputs', 'Requirements', 'Specifications'],
    outputs: ['Process outputs', 'Records', 'Documentation'],
    personnel: ['Process owner', 'Operators', 'Quality staff'],
    equipment: ['Production equipment', 'Measurement tools'],
    methods: ['Standard procedures', 'Work instructions'],
    kpis: ['Performance metrics', 'Quality indicators'],
  };
}

export default function TurtleDiagram({ station }: TurtleDiagramProps) {
  const data = getTurtleData(station);
  const hc = station.health === 'green' ? 'hsl(155,24%,55%)' : station.health === 'amber' ? 'hsl(24,72%,63%)' : 'hsl(0,48%,46%)';

  return (
    <div className="border-t border-border/50">
      <div className="px-4 py-1.5" style={{ background: 'hsl(220,14%,92%)' }}>
        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
          Turtle Diagram — Process Element P{station.index}
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="relative">
          {/* Top row: Personnel + Equipment */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <TurtleLeg
              icon={Users}
              title="Personnel / Competence"
              items={data.personnel}
              position="top-left"
            />
            <TurtleLeg
              icon={Cpu}
              title="Equipment / Facilities"
              items={data.equipment}
              position="top-right"
            />
          </div>

          {/* Center: Input → Process → Output */}
          <div className="flex items-stretch gap-0 my-1">
            {/* Input */}
            <div className="flex-1 border border-border bg-card p-2.5">
              <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Input
              </div>
              <ul className="space-y-0.5">
                {data.inputs.map((item, i) => (
                  <li key={i} className="text-[9px] text-foreground/80 flex items-start gap-1">
                    <span className="text-[7px] mt-[3px] text-muted-foreground">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow → Process → Arrow */}
            <div className="flex items-center px-1.5 shrink-0">
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </div>

            <div
              className="w-[200px] shrink-0 flex flex-col items-center justify-center p-3 border-2"
              style={{ borderColor: hc, background: `${hc}08` }}
            >
              <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                Process
              </div>
              <div className="text-[11px] font-bold text-foreground text-center leading-tight">
                P{station.index}
              </div>
              <div className="text-[9px] font-medium text-foreground/70 text-center leading-tight mt-0.5">
                {station.name}
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: hc }} />
                <span className="text-[8px] font-bold uppercase" style={{ color: hc }}>
                  {station.health === 'green' ? 'OK' : station.health === 'amber' ? 'RISK' : 'FAIL'}
                </span>
              </div>
            </div>

            <div className="flex items-center px-1.5 shrink-0">
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </div>

            {/* Output */}
            <div className="flex-1 border border-border bg-card p-2.5">
              <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Output
              </div>
              <ul className="space-y-0.5">
                {data.outputs.map((item, i) => (
                  <li key={i} className="text-[9px] text-foreground/80 flex items-start gap-1">
                    <span className="text-[7px] mt-[3px] text-muted-foreground">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom row: Methods + KPIs */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <TurtleLeg
              icon={FileText}
              title="Methods / Procedures"
              items={data.methods}
              position="bottom-left"
            />
            <TurtleLeg
              icon={Gauge}
              title="KPIs / Metrics"
              items={data.kpis}
              position="bottom-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TurtleLeg({
  icon: Icon,
  title,
  items,
  position,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
  position: string;
}) {
  return (
    <div className="border border-border/60 bg-muted/30 p-2.5">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-3 h-3 text-primary" />
        <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">{title}</span>
      </div>
      <ul className="space-y-0.5">
        {items.map((item, i) => (
          <li key={i} className="text-[9px] text-foreground/80 flex items-start gap-1">
            <span className="text-[7px] mt-[3px] text-primary/50">●</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
