import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import founderPortrait from "@/assets/founder-portrait.jpg";
import { Factory, CheckCircle, Award, Package, Users, Clock, AlertCircle, Cog, Flag } from "lucide-react";
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
      icon: AlertCircle,
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
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-6 md:p-8 shadow-2xl">
                <p className="text-xl md:text-2xl text-white leading-relaxed font-semibold mb-4">
                  "I built my career on supplier decisions. I'm not gambling yours on AI guesses."
                </p>
                <p className="text-base md:text-lg text-white leading-relaxed">
                  25 years in procurement taught me one thing: The best supplier
                  data comes from being there. AI is brilliant at finding needles
                  in haystacks—but here's what it will never tell you about a supplier:
                </p>
              </div>
            </motion.div>

            {/* Modern Interactive Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-8">
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
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Card */}
                    <div className="relative backdrop-blur-xl bg-white/25 border border-white/40 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-white/60 hover:bg-white/30">
                      {/* Professional Risk Indicator */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white/40">
                        <AlertCircle className="w-4 h-4 text-white" />
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm md:text-base font-bold text-white mb-1 line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-white/80 group-hover:text-white transition-colors font-medium">
                            Click to learn more
                          </p>
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative backdrop-blur-xl bg-white/25 border border-white/40 rounded-3xl p-6 md:p-8 shadow-2xl">
                <p className="text-base md:text-lg font-bold text-white mb-4">
                  These aren't details. These are deal-breakers.
                </p>
                <p className="text-xl md:text-2xl font-bold text-white mb-6">
                  That's why we built YVOO: AI finds them. Humans verify what matters.
                </p>
                <div className="mt-6 pt-6 border-t border-white/40 flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-500/30 border border-blue-300/50 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base md:text-lg text-white leading-relaxed font-medium">
                      We make professional on-site audits <span className="font-bold">affordable and effortless</span> for every procurement team—regardless of company size or budget.
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
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          {selectedDetail && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <selectedDetail.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-white">
                      {selectedDetail.title}
                    </DialogTitle>
                    <p className="text-sm text-gray-400 mt-1">
                      {selectedDetail.description}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              <DialogDescription className="text-base text-gray-300 leading-relaxed mt-4">
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
