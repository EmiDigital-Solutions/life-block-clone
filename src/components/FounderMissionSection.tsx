import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import founderPortrait from "@/assets/founder-portrait.jpg";
import { Factory, CheckCircle, Award, Package, Users, Clock, AlertTriangle, Cog, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
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
    <div ref={sectionRef} className="mt-16 md:mt-20 bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 bg-white">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Left Side - Smaller Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="relative group w-full max-w-[250px] lg:max-w-none bg-white p-4 rounded-2xl">
              <img
                src={founderPortrait}
                alt="Ivo Karaula, CEO YVOO"
                className="w-full rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02] bg-white"
                style={{ backgroundColor: 'white' }}
              />
            </div>
            <div className="mt-4 text-center lg:text-left space-y-1">
              <p className="text-sm font-semibold text-gray-900">
                Ivo Karaula
              </p>
              <p className="text-sm text-gray-700">
                CEO YVOO
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Former Global Procurement Leader
              </p>
              <p className="text-xs text-gray-600">
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/10 to-[#14B8A6]/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
                <p className="text-xl md:text-2xl text-gray-900 leading-relaxed font-semibold mb-4">
                  "I built my career on supplier decisions. I'm not gambling yours on <strong>AI guesses</strong>."
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  <strong>25 years in procurement</strong> taught me one thing: The <strong>best supplier
                  data comes from being there</strong>. AI is brilliant at finding needles
                  in haystacks—but here's what it will <strong>never tell you</strong> about a supplier:
                </p>
              </div>
            </motion.div>

            {/* Cards Grid - Exact 7 AI Features Style */}
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {detailItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isVisible
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.05,
                      ease: "easeOut",
                    }}
                    onClick={() => setSelectedDetail(item)}
                    className="cursor-pointer"
                  >
                    <Card className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border-0 overflow-hidden hover:scale-[1.02] group">
                      <div className="flex items-start gap-0">
                        {/* Left side - Watermark area */}
                        <div className="w-28 h-28 bg-gradient-to-br from-red-50 to-red-100/30 flex items-center justify-center relative flex-shrink-0">
                          {/* Large red ! watermark */}
                          <span className="text-[56px] font-black text-red-500/40 leading-none select-none">
                            !
                          </span>
                        </div>
                        
                        {/* Right side - Content */}
                        <div className="flex-1 p-6">
                          <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#14B8A6] transition-colors whitespace-nowrap">{item.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.description}</p>
                          
                          <div className="flex items-center gap-2 text-[#14B8A6] text-sm font-semibold group-hover:gap-3 transition-all">
                            <CheckCircle className="w-4 h-4" />
                            <span>Click to learn more</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/10 to-[#14B8A6]/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
                <p className="text-base md:text-lg font-bold text-gray-900 mb-4">
                  These aren't details. <strong>These are deal-breakers.</strong>
                </p>
                <p className="text-xl md:text-2xl font-bold text-[#14B8A6] mb-6">
                  That's why we built YVOO: <strong>AI finds them. Humans verify what matters.</strong>
                </p>
                <div className="mt-6 pt-6 border-t border-gray-200 flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-6 h-6 text-[#14B8A6]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium mb-4">
                      We make <strong>professional on-site audits affordable and effortless</strong> for every procurement team—regardless of company size or budget.
                    </p>
                    <a 
                      href="/scanpro-plus#roi-calculator"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#14B8A6] hover:bg-[#14B8A6]/90 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Calculate Your ROI
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Detail Modal - Match 7 AI Features Style */}
      <Dialog open={!!selectedDetail} onOpenChange={() => setSelectedDetail(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-0 shadow-2xl">
          {selectedDetail && (
            <div className="space-y-6">
              {/* Header with Icon */}
              <DialogHeader className="flex flex-row items-start gap-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-xl flex-shrink-0">
                  <selectedDetail.icon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-red-50 rounded-full mb-3">
                    <span className="text-red-600 text-xs font-bold uppercase tracking-wide">AI Limitation</span>
                  </div>
                  <DialogTitle className="text-3xl font-bold text-gray-900 mb-3">
                    {selectedDetail.title}
                  </DialogTitle>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {selectedDetail.description}
                  </p>
                </div>
              </DialogHeader>

              {/* Detailed Content */}
              <div className="space-y-5 mt-8">
                <div className="group relative bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-[#14B8A6]/10 rounded-full mb-3">
                      <span className="text-[#14B8A6] text-xs font-bold uppercase">Why This Matters</span>
                    </div>
                    <DialogDescription className="text-gray-700 leading-relaxed text-base">
                      {selectedDetail.details}
                    </DialogDescription>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FounderMissionSection;
