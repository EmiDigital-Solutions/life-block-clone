import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import founderPortrait from "@/assets/founder-portrait.jpg";
import { Factory, CheckCircle, Award, Package, Users, Clock, AlertTriangle, Cog, Flag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DetailItem {
  title: string;
  icon: any;
  description: string;
  details: string;
}

const FounderMissionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const detailItems: DetailItem[] = [
    {
      title: "Production Floor Organization",
      icon: Factory,
      description: "Real-world operational efficiency assessment",
      details: "AI can analyze production layouts from photos, but it can't tell you if the floor is truly organized or chaotic. Our auditors assess workflow efficiency, material handling processes, inventory management systems, and cleanliness standards. They identify bottlenecks, evaluate 5S implementation, and determine if the supplier can maintain consistent quality under pressure. This on-site verification ensures your supplier's operational excellence isn't just theoretical."
    },
    {
      title: "Quality System Effectiveness",
      icon: CheckCircle,
      description: "Beyond certifications to actual implementation",
      details: "Having ISO certifications doesn't guarantee effective quality systems. Our auditors examine whether documented procedures are actually followed, if quality checkpoints are properly implemented, and whether the team understands their quality responsibilities. We verify calibration systems, inspection protocols, corrective action processes, and how quality data drives improvements. Real quality systems work in practice, not just on paper."
    },
    {
      title: "Certification Validity",
      icon: Award,
      description: "Verifying authenticity and proper implementation",
      details: "Certificates can be outdated, falsified, or not properly maintained. Our auditors verify certification authenticity, check expiration dates, review audit reports, and ensure the supplier maintains the standards that earned them certification. We examine whether certified processes are consistently followed and if the supplier keeps up with changing requirements. Valid certifications require ongoing compliance, not just a document on the wall."
    },
    {
      title: "Volume Capacity",
      icon: Package,
      description: "Realistic production capabilities assessment",
      details: "Suppliers often overstate their capacity. Our auditors evaluate actual production capacity by examining equipment capabilities, shift patterns, workforce size, material availability, and current order books. We assess whether scaling up production is realistic without quality compromise. Understanding true capacity prevents supply chain disruptions and ensures your supplier can meet your volume requirements reliably."
    },
    {
      title: "Management Competence",
      icon: Users,
      description: "Leadership quality and decision-making capability",
      details: "Strong management is critical for supplier reliability. Our auditors assess leadership experience, technical knowledge, communication effectiveness, and problem-solving capabilities. We evaluate how management handles challenges, drives continuous improvement, and maintains team morale. Competent management ensures consistent performance, proactive issue resolution, and long-term partnership success."
    },
    {
      title: "Actual Lead Times",
      icon: Clock,
      description: "Real-world delivery performance verification",
      details: "Quoted lead times often differ from reality. Our auditors analyze actual production schedules, interview current customers, review delivery records, and assess factors that affect timing. We identify potential delays from material sourcing, production constraints, quality issues, or logistics challenges. Realistic lead time expectations prevent costly disruptions to your operations."
    },
    {
      title: "Quality Issue Handling",
      icon: AlertTriangle,
      description: "Problem resolution and customer responsiveness",
      details: "How suppliers handle quality issues reveals their true capabilities. Our auditors investigate complaint handling procedures, corrective action effectiveness, customer communication practices, and problem-solving approaches. We speak with current customers about their experiences with quality issues. A supplier's response to problems often matters more than avoiding them entirely."
    },
    {
      title: "Equipment Modernity",
      icon: Cog,
      description: "Technology and tooling capability assessment",
      details: "Equipment age and capability directly impact quality and efficiency. Our auditors evaluate machinery condition, technology level, maintenance practices, and upgrade plans. We assess whether equipment can meet your specifications, maintain tolerances, and support future requirements. Modern, well-maintained equipment indicates a supplier's commitment to quality and continuous improvement."
    }
  ];

  return (
    <div ref={sectionRef} className="mt-16 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Left Side - Smaller Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative group w-full max-w-[250px] lg:max-w-none">
              <img
                src={founderPortrait}
                alt="Ivo Karaula, CEO YVOO"
                className="w-full rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 text-center lg:text-left space-y-1">
              <p className="text-sm font-semibold text-white">
                Ivo Karaula
              </p>
              <p className="text-sm text-white/80">
                CEO YVOO
              </p>
              <p className="text-xs text-white/60 mt-2">
                Former Global Procurement Leader
              </p>
              <p className="text-xs text-white/60">
                Linde • BSH • SANYO
              </p>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Professional Quote Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-50/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
                <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-semibold mb-4">
                  "I built my career on supplier decisions. I'm not gambling yours on AI guesses."
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  25 years in procurement taught me one thing: The best supplier
                  data comes from being there. AI is brilliant at finding needles
                  in haystacks—but here's what it will never tell you about a supplier:
                </p>
              </div>
            </motion.div>

            {/* Modern Interactive Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-8">
              {detailItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isVisible
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.08,
                      ease: "easeOut",
                    }}
                    onClick={() => setSelectedDetail(item)}
                    className="group relative text-left"
                  >
                    {/* Card with Reference Design */}
                    <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01] hover:border-blue-300 overflow-hidden">
                      
                      {/* Clean Flat Alert Triangle */}
                      <div className="absolute top-4 right-4 z-10">
                        <AlertTriangle className="w-5 h-5 text-red-500 fill-red-50" strokeWidth={2} />
                      </div>

                      <div className="flex gap-5 items-start">
                        {/* Left Side - Icon with Background */}
                        <div className="flex-shrink-0 relative">
                          {/* Watermark Background Shape */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl scale-125 -z-10 opacity-60" />
                          
                          {/* Icon Container */}
                          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <IconComponent className="w-8 h-8 text-white" strokeWidth={2} />
                          </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="flex-1 min-w-0">
                          {/* Feature Label */}
                          <p className="text-xs uppercase tracking-wider text-blue-500 font-bold mb-2">
                            Critical Factor {String(index + 1).padStart(2, '0')}
                          </p>
                          
                          {/* Title */}
                          <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-tight">
                            {item.title}
                          </h4>
                          
                          {/* Description */}
                          <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            {item.description}
                          </p>

                          {/* Click to Learn More */}
                          <div className="flex items-center gap-2 text-blue-500 group-hover:text-blue-600 transition-colors font-medium text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Click to learn more</span>
                            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="relative group mt-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-50/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
                <p className="text-base md:text-lg font-bold text-gray-900 mb-4">
                  These aren't details. These are deal-breakers.
                </p>
                <p className="text-xl md:text-2xl font-bold text-blue-600 mb-6">
                  That's why we built YVOO: AI finds them. Humans verify what matters.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-200 flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                      We make professional on-site audits <span className="font-bold text-gray-900">affordable and effortless</span> for every procurement team—regardless of company size or budget.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedDetail} onOpenChange={() => setSelectedDetail(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white border-gray-200">
          {selectedDetail && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <selectedDetail.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      {selectedDetail.title}
                    </DialogTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedDetail.description}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              <DialogDescription className="text-base text-gray-700 leading-relaxed mt-4">
                {selectedDetail.details}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FounderMissionSection;
