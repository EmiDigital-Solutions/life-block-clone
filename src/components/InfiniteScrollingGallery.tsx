import { PixelIcon } from "@/components/PixelIcon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface Capability {
  title: string;
  description: string;
  accentColor: string;
  detailedDescription: string;
}

const capabilities: Capability[] = [
  { 
    title: "Flexible Templates", 
    description: "Create custom frameworks per industry, standard or customer requirement.",
    accentColor: '#A8C5B8',
    detailedDescription: "Build audit templates tailored to specific industries, international standards (ISO 9001, IATF 16949, AS9100), or customer-specific requirements. Our template builder allows you to define custom criteria, scoring methods, and documentation requirements. Templates can be shared across your organization and updated centrally to ensure consistency. Support for multi-language templates enables global deployment while maintaining standardization."
  },
  { 
    title: "AI Guidance", 
    description: "Contextual hints during audits to ensure completeness and objectivity.",
    accentColor: '#A8B8CA',
    detailedDescription: "AI-powered contextual assistance guides auditors through complex assessments in real-time. The system analyzes audit progress and provides intelligent suggestions for missing evidence, potential compliance gaps, and best practices. Machine learning models trained on thousands of audits help ensure objective evaluations by flagging potential biases and recommending standardized approaches. Smart prompts help auditors ask the right questions at the right time."
  },
  { 
    title: "Equipment Intelligence", 
    description: "Identify machines and assets from photos; assess condition and compliance.",
    accentColor: '#A8C5B8',
    detailedDescription: "Advanced computer vision automatically identifies machinery, equipment, and assets from photos taken during audits. The system can recognize thousands of industrial equipment types, assess their condition, verify compliance with safety standards, and detect potential maintenance issues. Asset tracking capabilities link equipment to maintenance records, certifications, and performance history. Automated condition reports reduce documentation time by up to 70%."
  },
  { 
    title: "Dynamic Scoring", 
    description: "Configurable weightings and 1–5 scoring for transparent results.",
    accentColor: '#A8B8CA',
    detailedDescription: "Flexible scoring engine supports multiple methodologies including weighted scoring, pass/fail criteria, and numeric scales (1-5, 1-10). Customize scoring weightings based on priority areas, regulatory requirements, or risk levels. Real-time score calculation provides immediate feedback during audits. Advanced analytics compare scores across suppliers, facilities, and time periods. Transparent scoring methodology ensures stakeholder confidence and supports continuous improvement programs."
  },
  { 
    title: "Evidence Handling", 
    description: "Auto-categorize photos & files (quality, safety, environment) for traceability.",
    accentColor: '#A8C5B8',
    detailedDescription: "Intelligent document management system automatically categorizes photos, videos, and documents by topic (quality, safety, environmental, social). AI-powered tagging links evidence to specific audit criteria and findings. Unlimited cloud storage with advanced search capabilities makes it easy to retrieve evidence years later. Automatic compression and optimization reduce storage costs while maintaining audit-grade quality. Full audit trail tracks all evidence additions, modifications, and access."
  },
  { 
    title: "Real-Time Progress", 
    description: "Live milestones and alerts during audits for fast course-corrections.",
    accentColor: '#A8B8CA',
    detailedDescription: "Live dashboard provides real-time visibility into audit progress, completion rates, and emerging issues. Stakeholders can monitor audits remotely without disrupting the assessment process. Automated alerts notify teams of critical findings, deadline risks, or incomplete sections. Progress tracking helps optimize audit scheduling and resource allocation. Integration with project management tools enables seamless coordination between audit teams and procurement departments."
  },
  { 
    title: "Predictive Risk Scoring", 
    description: "Anticipate issues from historical patterns and equipment signals.",
    accentColor: '#A8C5B8',
    detailedDescription: "Machine learning algorithms analyze historical audit data, supplier performance metrics, and equipment sensor data to predict potential issues before they occur. Risk scoring models identify patterns that indicate emerging problems such as quality degradation, capacity constraints, or compliance risks. Predictive analytics support proactive supplier development and risk mitigation strategies. Early warning system triggers preventive actions 3-6 months before issues typically surface."
  },
  { 
    title: "Corrective Action Tracking", 
    description: "Monitor improvements with reminders and due-dates.",
    accentColor: '#A8B8CA',
    detailedDescription: "Comprehensive corrective action management system tracks findings from identification through verification of effectiveness. Automated workflows assign responsibilities, set due dates, and send reminders to responsible parties. Suppliers can submit evidence of corrective actions directly through the platform. Built-in approval workflows ensure corrective actions are verified before closure. Analytics dashboard shows closure rates, overdue actions, and effectiveness trends across your supplier base."
  },
  { 
    title: "Integrations", 
    description: "ERP/QMS connectors (SAP, Oracle, Dynamics, Trackwise, MasterControl, ETQ).",
    accentColor: '#A8C5B8',
    detailedDescription: "Pre-built connectors integrate with major ERP systems (SAP, Oracle, Microsoft Dynamics), quality management systems (Trackwise, MasterControl, ETQ), and procurement platforms. Bi-directional data synchronization ensures audit findings, supplier scores, and corrective actions flow automatically into your existing systems. API-first architecture enables custom integrations with proprietary systems. Automated data exchange eliminates manual data entry and reduces errors by up to 95%."
  },
];

const InfiniteScrollingGallery = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

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
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                {item.description}
              </p>
              <button
                onClick={() => setSelectedCapability(item)}
                className="text-sm font-medium hover:underline transition-all"
                style={{ color: item.accentColor }}
              >
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
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

      {/* Modal Dialog */}
      <Dialog open={selectedCapability !== null} onOpenChange={() => setSelectedCapability(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle 
              className="text-3xl font-bold mb-4"
              style={{ color: selectedCapability?.accentColor }}
            >
              {selectedCapability?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              {selectedCapability?.detailedDescription}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfiniteScrollingGallery;
