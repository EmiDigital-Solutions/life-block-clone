import { Monitor, TrendingUp, Shield, CheckCircle2, BarChart3, Bell, Database, Activity, Workflow } from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: React.ReactNode;
  variant: 'dark' | 'blue';
}

const capabilities: Capability[] = [
  { 
    title: "Real-Time Monitoring", 
    description: "Live dashboards of supplier operations",
    icon: <Monitor className="w-12 h-12" />,
    variant: 'dark'
  },
  { 
    title: "Predictive Analytics", 
    description: "Forecast delays and quality issues",
    icon: <TrendingUp className="w-12 h-12" />,
    variant: 'blue'
  },
  { 
    title: "Risk Scoring", 
    description: "Dynamic supplier risk assessment",
    icon: <Shield className="w-12 h-12" />,
    variant: 'dark'
  },
  { 
    title: "Compliance Tracking", 
    description: "Continuous verification of standards",
    icon: <CheckCircle2 className="w-12 h-12" />,
    variant: 'blue'
  },
  { 
    title: "Performance Benchmarking", 
    description: "Compare suppliers across network",
    icon: <BarChart3 className="w-12 h-12" />,
    variant: 'dark'
  },
  { 
    title: "Alert System", 
    description: "Instant notifications for critical events",
    icon: <Bell className="w-12 h-12" />,
    variant: 'blue'
  },
  { 
    title: "Capacity Intelligence", 
    description: "Real-time visibility into production",
    icon: <Database className="w-12 h-12" />,
    variant: 'dark'
  },
  { 
    title: "Quality Signals", 
    description: "Early detection of quality drift",
    icon: <Activity className="w-12 h-12" />,
    variant: 'blue'
  },
  { 
    title: "Integration Hub", 
    description: "Connect with ERP, MES, and QMS",
    icon: <Workflow className="w-12 h-12" />,
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
                flex-shrink-0 rounded-3xl p-8 flex flex-col items-center justify-center text-center
                transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                ${item.variant === 'dark' 
                  ? 'bg-gray-900 text-white shadow-xl' 
                  : 'bg-blue-600 text-white shadow-xl'
                }
              `}
              style={{
                width: '300px',
                height: '200px',
              }}
            >
              <div className="mb-4 opacity-90">
                {item.icon}
              </div>
              <h4 className="text-lg font-bold mb-2">{item.title}</h4>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5 py-8">
      {renderRow(row1, 'left', 1)}
      {renderRow(row2, 'right', 2)}
      {renderRow(row3, 'left', 3)}

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * 3));
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(calc(-320px * 3));
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
