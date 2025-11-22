import { PixelIcon } from "@/components/PixelIcon";

interface Capability {
  title: string;
  description: string;
  accentColor: string;
}

const capabilities: Capability[] = [
  { 
    title: "Flexible Templates", 
    description: "Create custom frameworks per industry, standard or customer requirement.",
    accentColor: '#A8C5B8'
  },
  { 
    title: "AI Guidance", 
    description: "Contextual hints during audits to ensure completeness and objectivity.",
    accentColor: '#A8B8CA'
  },
  { 
    title: "Equipment Intelligence", 
    description: "Identify machines and assets from photos; assess condition and compliance.",
    accentColor: '#A8C5B8'
  },
  { 
    title: "Dynamic Scoring", 
    description: "Configurable weightings and 1–5 scoring for transparent results.",
    accentColor: '#A8B8CA'
  },
  { 
    title: "Evidence Handling", 
    description: "Auto-categorize photos & files (quality, safety, environment) for traceability.",
    accentColor: '#A8C5B8'
  },
  { 
    title: "Real-Time Progress", 
    description: "Live milestones and alerts during audits for fast course-corrections.",
    accentColor: '#A8B8CA'
  },
  { 
    title: "Predictive Risk Scoring", 
    description: "Anticipate issues from historical patterns and equipment signals.",
    accentColor: '#A8C5B8'
  },
  { 
    title: "Corrective Action Tracking", 
    description: "Monitor improvements with reminders and due-dates.",
    accentColor: '#A8B8CA'
  },
  { 
    title: "Integrations", 
    description: "ERP/QMS connectors (SAP, Oracle, Dynamics, Trackwise, MasterControl, ETQ).",
    accentColor: '#A8C5B8'
  },
];

const InfiniteScrollingGallery = () => {
  // Distribute capabilities across 3 rows
  const row1 = [capabilities[0], capabilities[1], capabilities[2]];
  const row2 = [capabilities[3], capabilities[4], capabilities[5]];
  const row3 = [capabilities[6], capabilities[7], capabilities[8]];

  const renderRow = (items: Capability[], direction: 'left' | 'right', rowIndex: number) => {
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items, ...items];
    
    return (
      <div className="overflow-hidden">
        <div 
          className={`flex gap-6 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} hover:animation-pause`}
          style={{
            width: 'fit-content',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${rowIndex}-${index}`}
              className="flex-shrink-0 rounded-2xl sm:rounded-3xl p-8 bg-white border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                width: '320px',
                minHeight: '200px',
                borderColor: item.accentColor,
              }}
            >
              <div className="flex items-start gap-3 mb-4">
                <PixelIcon 
                  name="arrow-right" 
                  className="w-5 h-5 flex-shrink-0 mt-1" 
                  color={item.accentColor}
                />
                <h4 
                  className="text-xl font-bold leading-tight"
                  style={{ color: item.accentColor }}
                >
                  {item.title}
                </h4>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 py-8">
      {renderRow(row1, 'left', 1)}
      {renderRow(row2, 'right', 2)}
      {renderRow(row3, 'left', 3)}

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-344px * 3));
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-344px * 3));
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 25s linear infinite;
        }

        .hover\\:animation-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScrollingGallery;
