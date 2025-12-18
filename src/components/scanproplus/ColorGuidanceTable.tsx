import { motion } from "framer-motion";

interface ColorGuide {
  color: string;
  label: string;
  description: string;
  bgClass: string;
  textClass: string;
}

const colorGuides: ColorGuide[] = [
  { color: "#7CC2A7", label: "Compliant", description: "Meets all requirements", bgClass: "bg-[#7CC2A7]", textClass: "text-[#7CC2A7]" },
  { color: "#1391BF", label: "In Progress", description: "Under review or pending", bgClass: "bg-[#1391BF]", textClass: "text-[#1391BF]" },
  { color: "#D8A860", label: "Attention", description: "Minor issues or observations", bgClass: "bg-[#D8A860]", textClass: "text-[#D8A860]" },
  { color: "#C4564F", label: "Critical", description: "Non-conformance requiring action", bgClass: "bg-[#C4564F]", textClass: "text-[#C4564F]" },
  { color: "#C0C0C0", label: "Not Assessed", description: "Pending evaluation", bgClass: "bg-[#C0C0C0]", textClass: "text-[#C0C0C0]" },
];

const riskLevels = [
  { level: "Low", score: "80-100%", color: "#7CC2A7", description: "Excellent compliance" },
  { level: "Medium", score: "60-79%", color: "#D8A860", description: "Acceptable with improvements needed" },
  { level: "High", score: "40-59%", color: "#C4564F", description: "Significant gaps identified" },
  { level: "Critical", score: "<40%", color: "#C4564F", description: "Immediate action required" },
];

const ColorGuidanceTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#0A0A0A] rounded-2xl p-6 lg:p-8"
    >
      <h3 className="text-xl font-semibold text-white mb-6">Status & Risk Indicators</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Compliance Status */}
        <div>
          <h4 className="text-sm font-medium text-[#C0C0C0]/60 uppercase tracking-wider mb-4">Compliance Status</h4>
          <div className="space-y-3">
            {colorGuides.map((guide, index) => (
              <motion.div
                key={guide.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-[#161616] rounded-lg"
              >
                <div className={`w-4 h-4 rounded-full ${guide.bgClass}`} />
                <div className="flex-1">
                  <span className={`font-medium ${guide.textClass}`}>{guide.label}</span>
                  <p className="text-xs text-[#C0C0C0]/60 mt-0.5">{guide.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risk Levels */}
        <div>
          <h4 className="text-sm font-medium text-[#C0C0C0]/60 uppercase tracking-wider mb-4">Risk Scoring</h4>
          <div className="space-y-3">
            {riskLevels.map((risk, index) => (
              <motion.div
                key={risk.level}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-[#161616] rounded-lg"
              >
                <div 
                  className="w-12 h-2 rounded-full overflow-hidden bg-[#C0C0C0]/20"
                >
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: risk.level === "Low" ? "100%" : risk.level === "Medium" ? "70%" : risk.level === "High" ? "50%" : "30%",
                      backgroundColor: risk.color 
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{risk.level} Risk</span>
                    <span className="text-xs font-mono" style={{ color: risk.color }}>{risk.score}</span>
                  </div>
                  <p className="text-xs text-[#C0C0C0]/60 mt-0.5">{risk.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Ratings Legend */}
      <div className="mt-8 pt-6 border-t border-[#C0C0C0]/10">
        <h4 className="text-sm font-medium text-[#C0C0C0]/60 uppercase tracking-wider mb-4">Quality Ratings</h4>
        <div className="flex flex-wrap gap-4">
          {[
            { rating: "A", score: "90-100", color: "#7CC2A7" },
            { rating: "B", score: "75-89", color: "#1391BF" },
            { rating: "C", score: "60-74", color: "#D8A860" },
            { rating: "D", score: "40-59", color: "#C4564F" },
            { rating: "F", score: "<40", color: "#C4564F" },
          ].map((item) => (
            <div 
              key={item.rating}
              className="flex items-center gap-2 px-3 py-2 bg-[#161616] rounded-lg"
            >
              <div 
                className="w-6 h-6 rounded flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                {item.rating}
              </div>
              <span className="text-xs text-[#C0C0C0]/80">{item.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ColorGuidanceTable;
