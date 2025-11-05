import { FileText, Brain, Cog, Gauge, Camera, Clock, TrendingUp, ListChecks, Plug } from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: React.ReactNode;
  variant: 'dark' | 'blue';
}

const capabilities: Capability[] = [
  { 
    title: "Flexible Templates", 
    description: "Create custom frameworks per industry, standard or customer requirement.",
    icon: <FileText className="w-12 h-12" />,
    variant: 'dark'
  },
  { 
    title: "AI Guidance", 
    description: "Contextual hints during audits to ensure completeness and objectivity.",
    icon: <Brain className="w-12 h-12" />,
    variant: 'blue'
  },
  { 
    title: "Equipment Intelligence", 
    description: "Identify machines and assets from photos; assess condition and compliance.",
    icon: <Cog className="w-12 h-12" />,
    variant: 'dark'
  },
  { 
    title: "Dynamic Scoring", 
    description: "Configurable weightings and 1–5 scoring for transparent results.",
    icon: <Gauge className="w-12 h-12" />,
    variant: 'blue'
  },
  { 
    title: "Evidence Handling", 
    description: "Auto-categorize photos & files (quality, safety, environment) for traceability.",
    icon: <Camera className="w-12 h-12" />,
    variant: 'dark'
  },
  { 
    title: "Real-Time Progress", 
    description: "Live milestones and alerts during audits for fast course-corrections.",
    icon: <Clock className="w-12 h-12" />,
    variant: 'blue'
  },
  { 
    title: "Predictive Risk Scoring", 
    description: "Anticipate issues from historical patterns and equipment signals.",
    icon: <TrendingUp className="w-12 h-12" />,
    variant: 'dark'
  },
  { 
    title: "Corrective Action Tracking", 
    description: "Monitor improvements with reminders and due-dates.",
    icon: <ListChecks className="w-12 h-12" />,
    variant: 'blue'
  },
  { 
    title: "Integrations", 
    description: "ERP/QMS connectors (SAP, Oracle, Dynamics, Trackwise, MasterControl, ETQ).",
    icon: <Plug className="w-12 h-12" />,
    variant: 'dark'
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
          className={`flex gap-5 ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} hover:animation-pause`}
          style={{
            width: 'fit-content',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${rowIndex}-${index}`}
              className={`
                flex-shrink-0 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center
                transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                ${item.variant === 'dark' 
                  ? 'bg-gray-900 text-white shadow-xl' 
                  : 'bg-blue-600 text-white shadow-xl'
                }
              `}
              style={{
                width: '280px',
                height: '180px',
              }}
            >
              <div className="mb-3 sm:mb-4 opacity-90 scale-90 sm:scale-100">
                {item.icon}
              </div>
              <h4 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{item.title}</h4>
              <p className="text-xs sm:text-sm opacity-80 leading-tight">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-5 py-6 sm:py-8">
      {renderRow(row1, 'left', 1)}
      {renderRow(row2, 'right', 2)}
      {renderRow(row3, 'left', 3)}

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-300px * 3));
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-300px * 3));
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }

        .hover\\:animation-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScrollingGallery;
