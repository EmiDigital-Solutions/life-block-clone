import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface Capability {
  title: string;
  description: string;
  detailedDescription: string;
}

const capabilities: Capability[] = [
  { 
    title: "Flexible Templates", 
    description: "Create custom frameworks per industry, standard or customer requirement.",
    detailedDescription: "Build audit templates tailored to specific industries, international standards (ISO 9001, IATF 16949, AS9100), or customer-specific requirements. Our template builder allows you to define custom criteria, scoring methods, and documentation requirements. Templates can be shared across your organization and updated centrally to ensure consistency. Support for multi-language templates enables global deployment while maintaining standardization."
  },
  { 
    title: "AI Guidance", 
    description: "Contextual hints during audits to ensure completeness and objectivity.",
    detailedDescription: "AI-powered contextual assistance guides auditors through complex assessments in real-time. The system analyzes audit progress and provides intelligent suggestions for missing evidence, potential compliance gaps, and best practices. Machine learning models trained on thousands of audits help ensure objective evaluations by flagging potential biases and recommending standardized approaches. Smart prompts help auditors ask the right questions at the right time."
  },
  { 
    title: "Equipment Intelligence", 
    description: "Identify machines and assets from photos; assess condition and compliance.",
    detailedDescription: "Advanced computer vision automatically identifies machinery, equipment, and assets from photos taken during audits. The system can recognize thousands of industrial equipment types, assess their condition, verify compliance with safety standards, and detect potential maintenance issues. Asset tracking capabilities link equipment to maintenance records, certifications, and performance history. Automated condition reports reduce documentation time by up to 70%."
  },
  { 
    title: "Dynamic Scoring", 
    description: "Configurable weightings and 1–5 scoring for transparent results.",
    detailedDescription: "Flexible scoring engine supports multiple methodologies including weighted scoring, pass/fail criteria, and numeric scales (1-5, 1-10). Customize scoring weightings based on priority areas, regulatory requirements, or risk levels. Real-time score calculation provides immediate feedback during audits. Advanced analytics compare scores across suppliers, facilities, and time periods. Transparent scoring methodology ensures stakeholder confidence and supports continuous improvement programs."
  },
  { 
    title: "Evidence Handling", 
    description: "Auto-categorize photos & files (quality, safety, environment) for traceability.",
    detailedDescription: "Intelligent document management system automatically categorizes photos, videos, and documents by topic (quality, safety, environmental, social). AI-powered tagging links evidence to specific audit criteria and findings. Unlimited cloud storage with advanced search capabilities makes it easy to retrieve evidence years later. Automatic compression and optimization reduce storage costs while maintaining audit-grade quality. Full audit trail tracks all evidence additions, modifications, and access."
  },
  { 
    title: "Real-Time Progress", 
    description: "Live milestones and alerts during audits for fast course-corrections.",
    detailedDescription: "Live dashboard provides real-time visibility into audit progress, completion rates, and emerging issues. Stakeholders can monitor audits remotely without disrupting the assessment process. Automated alerts notify teams of critical findings, deadline risks, or incomplete sections. Progress tracking helps optimize audit scheduling and resource allocation. Integration with project management tools enables seamless coordination between audit teams and procurement departments."
  },
  { 
    title: "Predictive Risk Scoring", 
    description: "Anticipate issues from historical patterns and equipment signals.",
    detailedDescription: "Machine learning algorithms analyze historical audit data, supplier performance metrics, and equipment sensor data to predict potential issues before they occur. Risk scoring models identify patterns that indicate emerging problems such as quality degradation, capacity constraints, or compliance risks. Predictive analytics support proactive supplier development and risk mitigation strategies. Early warning system triggers preventive actions 3-6 months before issues typically surface."
  },
  { 
    title: "Corrective Action Tracking", 
    description: "Monitor improvements with reminders and due-dates.",
    detailedDescription: "Comprehensive corrective action management system tracks findings from identification through verification of effectiveness. Automated workflows assign responsibilities, set due dates, and send reminders to responsible parties. Suppliers can submit evidence of corrective actions directly through the platform. Built-in approval workflows ensure corrective actions are verified before closure. Analytics dashboard shows closure rates, overdue actions, and effectiveness trends across your supplier base."
  },
];

const InfiniteScrollingGallery = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {capabilities.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCapability(item)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="aspect-square bg-gradient-to-br from-accent/20 to-secondary/30 flex items-center justify-center p-6">
              <h4 className="text-lg md:text-xl font-bold text-foreground text-center leading-tight">
                {item.title}
              </h4>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                {item.description}
              </p>
              <span className="text-xs font-medium text-primary mt-2 inline-block group-hover:underline">
                Learn more →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      <Dialog open={selectedCapability !== null} onOpenChange={() => setSelectedCapability(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-4 text-primary">
              {selectedCapability?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {selectedCapability?.detailedDescription}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfiniteScrollingGallery;
