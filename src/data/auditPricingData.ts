// Audit pricing data organized by category and region

export interface AuditType {
  id: number;
  code: string;
  name: string;
  displayLabel: string;
  category: string;
  minDays: number;
  maxDays: number;
  auditors: number;
  complexity: string;
  traditionalEur: number;
  pricing: {
    dach: number;
    wEu: number;
    eEu: number;
    turkey: number;
    china: number;
    india: number;
    sea: number;
    usa: number;
    latam: number;
  };
  savingsPercent: number;
}

export const regions = [
  { id: 'dach', label: 'DACH (Germany, Austria, Switzerland)', key: 'dach' as const },
  { id: 'wEu', label: 'Western Europe', key: 'wEu' as const },
  { id: 'eEu', label: 'Eastern Europe', key: 'eEu' as const },
  { id: 'turkey', label: 'Turkey', key: 'turkey' as const },
  { id: 'china', label: 'China', key: 'china' as const },
  { id: 'india', label: 'India', key: 'india' as const },
  { id: 'sea', label: 'Southeast Asia', key: 'sea' as const },
  { id: 'usa', label: 'USA', key: 'usa' as const },
  { id: 'latam', label: 'Latin America', key: 'latam' as const },
];

export const auditTypes: AuditType[] = [
  // Aerospace
  { id: 1, code: "AS6081", name: "Counterfeit Parts Prevention", displayLabel: "AS6081 - Counterfeit Parts Prevention", category: "Aerospace", minDays: 1, maxDays: 2, auditors: 1, complexity: "Medium", traditionalEur: 4825, pricing: { dach: 2090, wEu: 1818, eEu: 1272, turkey: 1135, china: 1408, india: 998, sea: 1080, usa: 2227, latam: 1135 }, savingsPercent: 57 },
  { id: 2, code: "AS9100", name: "Aerospace Quality Management System", displayLabel: "AS9100 - Aerospace Quality Management System", category: "Aerospace", minDays: 3, maxDays: 5, auditors: 2, complexity: "High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 3, code: "AS9110", name: "Aerospace MRO Quality Management", displayLabel: "AS9110 - Aerospace MRO Quality Management", category: "Aerospace", minDays: 3, maxDays: 5, auditors: 2, complexity: "High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 4, code: "AS9120", name: "Aerospace Distributor Quality Management", displayLabel: "AS9120 - Aerospace Distributor Quality Management", category: "Aerospace", minDays: 2, maxDays: 3, auditors: 1, complexity: "Medium", traditionalEur: 7375, pricing: { dach: 3378, wEu: 2922, eEu: 2012, turkey: 1785, china: 2240, india: 1558, sea: 1694, usa: 3605, latam: 1785 }, savingsPercent: 54 },
  { id: 5, code: "EASA Part 145", name: "Maintenance Organisation Approval (EU)", displayLabel: "EASA Part 145 - Maintenance Organisation Approval (EU)", category: "Aerospace", minDays: 3, maxDays: 5, auditors: 2, complexity: "High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 6, code: "EASA Part 21", name: "Production Organisation Approval (EU)", displayLabel: "EASA Part 21 - Production Organisation Approval (EU)", category: "Aerospace", minDays: 3, maxDays: 5, auditors: 2, complexity: "High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 9, code: "ITAR", name: "International Traffic in Arms Regulations", displayLabel: "ITAR - International Traffic in Arms Regulations", category: "Aerospace", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  { id: 12, code: "NADCAP", name: "Special Processes Accreditation", displayLabel: "NADCAP - Special Processes Accreditation", category: "Aerospace", minDays: 3, maxDays: 6, auditors: 2, complexity: "Very High", traditionalEur: 24950, pricing: { dach: 10222, wEu: 8818, eEu: 6010, turkey: 5308, china: 6712, india: 4606, sea: 5027, usa: 10924, latam: 5308 }, savingsPercent: 59 },
  
  // Automotive
  { id: 13, code: "APQP", name: "Advanced Product Quality Planning", displayLabel: "APQP - Advanced Product Quality Planning", category: "Automotive", minDays: 1, maxDays: 2, auditors: 1, complexity: "Medium", traditionalEur: 4825, pricing: { dach: 2090, wEu: 1818, eEu: 1272, turkey: 1135, china: 1408, india: 998, sea: 1080, usa: 2227, latam: 1135 }, savingsPercent: 57 },
  { id: 14, code: "ASPICE", name: "Automotive Software Process Improvement", displayLabel: "ASPICE - Automotive Software Process Improvement", category: "Automotive", minDays: 3, maxDays: 5, auditors: 2, complexity: "High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 23, code: "Formel Q", name: "VW Group Supplier Quality Standard", displayLabel: "Formel Q - VW Group Supplier Quality Standard", category: "Automotive", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  { id: 24, code: "IATF 16949", name: "Automotive Quality Management System", displayLabel: "IATF 16949 - Automotive Quality Management System", category: "Automotive", minDays: 4, maxDays: 8, auditors: 2, complexity: "Very High", traditionalEur: 32600, pricing: { dach: 13576, wEu: 11704, eEu: 7960, turkey: 7024, china: 8896, india: 6088, sea: 6650, usa: 14512, latam: 7024 }, savingsPercent: 58 },
  { id: 25, code: "ISO 26262", name: "Functional Safety (Road Vehicles)", displayLabel: "ISO 26262 - Functional Safety (Road Vehicles)", category: "Automotive", minDays: 3, maxDays: 5, auditors: 2, complexity: "Very High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 30, code: "TISAX", name: "Trusted Information Security Assessment", displayLabel: "TISAX - Trusted Information Security Assessment", category: "Automotive", minDays: 2, maxDays: 4, auditors: 1, complexity: "High", traditionalEur: 8650, pricing: { dach: 4021, wEu: 3475, eEu: 2383, turkey: 2110, china: 2656, india: 1837, sea: 2001, usa: 4294, latam: 2110 }, savingsPercent: 54 },
  { id: 34, code: "VDA 6.3", name: "Process Audit (German Automotive)", displayLabel: "VDA 6.3 - Process Audit (German Automotive)", category: "Automotive", minDays: 2, maxDays: 4, auditors: 1, complexity: "High", traditionalEur: 8650, pricing: { dach: 4021, wEu: 3475, eEu: 2383, turkey: 2110, china: 2656, india: 1837, sea: 2001, usa: 4294, latam: 2110 }, savingsPercent: 54 },
  
  // Food Safety
  { id: 76, code: "BRCGS Food", name: "BRC Global Standard for Food Safety", displayLabel: "BRCGS Food - BRC Global Standard for Food Safety", category: "Food Safety", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  { id: 79, code: "FSSC 22000", name: "Food Safety System Certification", displayLabel: "FSSC 22000 - Food Safety System Certification", category: "Food Safety", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  { id: 83, code: "HACCP", name: "Hazard Analysis Critical Control Points", displayLabel: "HACCP - Hazard Analysis Critical Control Points", category: "Food Safety", minDays: 1, maxDays: 2, auditors: 1, complexity: "Medium", traditionalEur: 4825, pricing: { dach: 2090, wEu: 1818, eEu: 1272, turkey: 1135, china: 1408, india: 998, sea: 1080, usa: 2227, latam: 1135 }, savingsPercent: 57 },
  { id: 85, code: "IFS Food", name: "International Featured Standard Food", displayLabel: "IFS Food - International Featured Standard Food", category: "Food Safety", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  { id: 87, code: "ISO 22000", name: "Food Safety Management System", displayLabel: "ISO 22000 - Food Safety Management System", category: "Food Safety", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  { id: 92, code: "SQF", name: "Safe Quality Food", displayLabel: "SQF - Safe Quality Food", category: "Food Safety", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  
  // IT & Cyber
  { id: 105, code: "GDPR", name: "General Data Protection Regulation", displayLabel: "GDPR - General Data Protection Regulation", category: "IT & Cyber", minDays: 2, maxDays: 3, auditors: 1, complexity: "Medium", traditionalEur: 7375, pricing: { dach: 3378, wEu: 2922, eEu: 2012, turkey: 1785, china: 2240, india: 1558, sea: 1694, usa: 3605, latam: 1785 }, savingsPercent: 54 },
  { id: 108, code: "ISO 27001", name: "Information Security Management System", displayLabel: "ISO 27001 - Information Security Management System", category: "IT & Cyber", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  { id: 113, code: "ISO 42001", name: "AI Management System", displayLabel: "ISO 42001 - AI Management System", category: "IT & Cyber", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  { id: 117, code: "PCI DSS", name: "Payment Card Industry Data Security", displayLabel: "PCI DSS - Payment Card Industry Data Security", category: "IT & Cyber", minDays: 3, maxDays: 5, auditors: 2, complexity: "High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 119, code: "SOC 2", name: "Service Organization Controls (Security)", displayLabel: "SOC 2 - Service Organization Controls (Security)", category: "IT & Cyber", minDays: 3, maxDays: 5, auditors: 2, complexity: "High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  
  // Medical
  { id: 131, code: "21 CFR 820", name: "FDA Quality System Regulation", displayLabel: "21 CFR 820 - FDA Quality System Regulation", category: "Medical", minDays: 3, maxDays: 5, auditors: 2, complexity: "Very High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 133, code: "ISO 13485", name: "Medical Device Quality Management", displayLabel: "ISO 13485 - Medical Device Quality Management", category: "Medical", minDays: 3, maxDays: 5, auditors: 2, complexity: "High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 136, code: "MDR 2017/745", name: "EU Medical Device Regulation", displayLabel: "MDR 2017/745 - EU Medical Device Regulation", category: "Medical", minDays: 3, maxDays: 5, auditors: 2, complexity: "Very High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  { id: 137, code: "MDSAP", name: "Medical Device Single Audit Program", displayLabel: "MDSAP - Medical Device Single Audit Program", category: "Medical", minDays: 5, maxDays: 8, auditors: 2, complexity: "Very High", traditionalEur: 35150, pricing: { dach: 14694, wEu: 12666, eEu: 8610, turkey: 7596, china: 9624, india: 6582, sea: 7190, usa: 15708, latam: 7596 }, savingsPercent: 58 },
  
  // Pharmaceutical
  { id: 163, code: "EU GMP", name: "European Good Manufacturing Practice", displayLabel: "EU GMP - European Good Manufacturing Practice", category: "Pharmaceutical", minDays: 3, maxDays: 6, auditors: 2, complexity: "Very High", traditionalEur: 24950, pricing: { dach: 10222, wEu: 8818, eEu: 6010, turkey: 5308, china: 6712, india: 4606, sea: 5027, usa: 10924, latam: 5308 }, savingsPercent: 59 },
  { id: 164, code: "GCP", name: "Good Clinical Practice", displayLabel: "GCP - Good Clinical Practice", category: "Pharmaceutical", minDays: 2, maxDays: 4, auditors: 2, complexity: "High", traditionalEur: 17300, pricing: { dach: 6868, wEu: 5932, eEu: 4060, turkey: 3592, china: 4528, india: 3124, sea: 3405, usa: 7336, latam: 3592 }, savingsPercent: 60 },
  { id: 165, code: "GDP", name: "Good Distribution Practice", displayLabel: "GDP - Good Distribution Practice", category: "Pharmaceutical", minDays: 2, maxDays: 3, auditors: 1, complexity: "Medium", traditionalEur: 7375, pricing: { dach: 3378, wEu: 2922, eEu: 2012, turkey: 1785, china: 2240, india: 1558, sea: 1694, usa: 3605, latam: 1785 }, savingsPercent: 54 },
  { id: 168, code: "ICH Q7", name: "GMP for Active Pharmaceutical Ingredients", displayLabel: "ICH Q7 - GMP for Active Pharmaceutical Ingredients", category: "Pharmaceutical", minDays: 3, maxDays: 5, auditors: 2, complexity: "Very High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  
  // Universal / General
  { id: 93, code: "Custom Audit", name: "Customer-Specific Requirements", displayLabel: "Custom Audit - Customer-Specific Requirements", category: "General", minDays: 1, maxDays: 3, auditors: 1, complexity: "Medium", traditionalEur: 6100, pricing: { dach: 2734, wEu: 2370, eEu: 1642, turkey: 1460, china: 1824, india: 1278, sea: 1387, usa: 2916, latam: 1460 }, savingsPercent: 55 },
  { id: 99, code: "Supplier Audit", name: "General Supplier Assessment", displayLabel: "Supplier Audit - General Supplier Assessment", category: "General", minDays: 1, maxDays: 2, auditors: 1, complexity: "Medium", traditionalEur: 4825, pricing: { dach: 2090, wEu: 1818, eEu: 1272, turkey: 1135, china: 1408, india: 998, sea: 1080, usa: 2227, latam: 1135 }, savingsPercent: 57 },
  { id: 96, code: "Process Audit", name: "General Process Assessment", displayLabel: "Process Audit - General Process Assessment", category: "General", minDays: 1, maxDays: 2, auditors: 1, complexity: "Medium", traditionalEur: 4825, pricing: { dach: 2090, wEu: 1818, eEu: 1272, turkey: 1135, china: 1408, india: 998, sea: 1080, usa: 2227, latam: 1135 }, savingsPercent: 57 },
  { id: 202, code: "ISO 14001", name: "Environmental Management System", displayLabel: "ISO 14001 - Environmental Management System", category: "Universal", minDays: 2, maxDays: 3, auditors: 1, complexity: "Medium", traditionalEur: 7375, pricing: { dach: 3378, wEu: 2922, eEu: 2012, turkey: 1785, china: 2240, india: 1558, sea: 1694, usa: 3605, latam: 1785 }, savingsPercent: 54 },
  { id: 211, code: "ISO 45001", name: "Occupational Health & Safety", displayLabel: "ISO 45001 - Occupational Health & Safety", category: "Universal", minDays: 2, maxDays: 3, auditors: 1, complexity: "Medium", traditionalEur: 7375, pricing: { dach: 3378, wEu: 2922, eEu: 2012, turkey: 1785, china: 2240, india: 1558, sea: 1694, usa: 3605, latam: 1785 }, savingsPercent: 54 },
  { id: 214, code: "ISO 9001", name: "Quality Management System", displayLabel: "ISO 9001 - Quality Management System", category: "Universal", minDays: 2, maxDays: 3, auditors: 1, complexity: "Medium", traditionalEur: 7375, pricing: { dach: 3378, wEu: 2922, eEu: 2012, turkey: 1785, china: 2240, india: 1558, sea: 1694, usa: 3605, latam: 1785 }, savingsPercent: 54 },
  
  // ESG & Sustainability
  { id: 59, code: "EcoVadis", name: "Sustainability Performance Rating", displayLabel: "EcoVadis - Sustainability Performance Rating", category: "ESG & Sustainability", minDays: 1, maxDays: 2, auditors: 1, complexity: "Medium", traditionalEur: 4825, pricing: { dach: 2090, wEu: 1818, eEu: 1272, turkey: 1135, china: 1408, india: 998, sea: 1080, usa: 2227, latam: 1135 }, savingsPercent: 57 },
  { id: 58, code: "CSRD/ESRS", name: "EU Corporate Sustainability Reporting", displayLabel: "CSRD/ESRS - EU Corporate Sustainability Reporting", category: "ESG & Sustainability", minDays: 3, maxDays: 5, auditors: 2, complexity: "High", traditionalEur: 22400, pricing: { dach: 9104, wEu: 7856, eEu: 5360, turkey: 4736, china: 5984, india: 4112, sea: 4486, usa: 9728, latam: 4736 }, savingsPercent: 59 },
  
  // Social & Ethical
  { id: 176, code: "BSCI", name: "Business Social Compliance Initiative", displayLabel: "BSCI - Business Social Compliance Initiative", category: "Social & Ethical", minDays: 1, maxDays: 2, auditors: 1, complexity: "Medium", traditionalEur: 4825, pricing: { dach: 2090, wEu: 1818, eEu: 1272, turkey: 1135, china: 1408, india: 998, sea: 1080, usa: 2227, latam: 1135 }, savingsPercent: 57 },
  { id: 185, code: "SA8000", name: "Social Accountability Standard", displayLabel: "SA8000 - Social Accountability Standard", category: "Social & Ethical", minDays: 2, maxDays: 4, auditors: 1, complexity: "High", traditionalEur: 8650, pricing: { dach: 4021, wEu: 3475, eEu: 2383, turkey: 2110, china: 2656, india: 1837, sea: 2001, usa: 4294, latam: 2110 }, savingsPercent: 54 },
  { id: 186, code: "SMETA", name: "Sedex Members Ethical Trade Audit", displayLabel: "SMETA - Sedex Members Ethical Trade Audit", category: "Social & Ethical", minDays: 1, maxDays: 2, auditors: 1, complexity: "Medium", traditionalEur: 4825, pricing: { dach: 2090, wEu: 1818, eEu: 1272, turkey: 1135, china: 1408, india: 998, sea: 1080, usa: 2227, latam: 1135 }, savingsPercent: 57 },
];

// Get unique categories
export const categories = [...new Set(auditTypes.map(a => a.category))].sort();

// Get audits by category
export const getAuditsByCategory = (category: string) => 
  auditTypes.filter(a => a.category === category);
