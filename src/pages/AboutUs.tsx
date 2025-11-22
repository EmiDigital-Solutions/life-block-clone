import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import sustainabilityImage from "@/assets/about-sustainability.jpg";
import timelineImage from "@/assets/about-timeline-2019.jpg";
import leadershipTeamImage from "@/assets/about-leadership-team.jpg";

// Import diverse professional faces
import auditorBlonde1 from "@/assets/auditor-blonde-1.jpg";
import auditorBlonde2 from "@/assets/auditor-blonde-2.jpg";
import auditorBlonde3 from "@/assets/auditor-blonde-3.jpg";
import auditorBlonde4 from "@/assets/auditor-blonde-4.jpg";
import auditorBlonde5 from "@/assets/auditor-blonde-5.jpg";
import procurementFemaleBlonde from "@/assets/procurement-female-blonde.jpg";
import procurementMaleOceania from "@/assets/procurement-male-oceania.jpg";
import procurementFemaleEuropean from "@/assets/procurement-female-european.jpg";
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import procurementMaleAsian from "@/assets/procurement-male-asian.jpg";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import procurementFemaleAsian from "@/assets/procurement-female-asian.jpg";
import procurementMaleLatin from "@/assets/procurement-male-latin.jpg";
import auditorGen1 from "@/assets/auditor-gen-1.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";
import auditorGen3 from "@/assets/auditor-gen-3.jpg";

const AboutUs = () => {
  const [selectedLocation, setSelectedLocation] = useState("zagreb");
  const [selectedYear, setSelectedYear] = useState(2019);

  const heroImages = [
    { src: auditorBlonde1, alt: 'Quality Inspector' },
    { src: auditorBlonde2, alt: 'Safety Manager' },
    { src: auditorBlonde3, alt: 'Compliance Auditor' },
    { src: auditorBlonde4, alt: 'Operations Director' },
    { src: auditorBlonde5, alt: 'Factory Inspector' },
    { src: procurementFemaleBlonde, alt: 'Procurement Manager' },
    { src: procurementMaleOceania, alt: 'Supply Chain Lead' },
    { src: procurementFemaleEuropean, alt: 'Vendor Relations' },
    { src: auditorEuropean, alt: 'Senior Auditor' },
    { src: procurementMaleAsian, alt: 'Sourcing Director' },
    { src: auditorFemaleEuropean, alt: 'Quality Lead' },
    { src: procurementFemaleAsian, alt: 'Procurement Specialist' },
    { src: procurementMaleLatin, alt: 'Operations Manager' },
    { src: auditorGen1, alt: 'Site Inspector' },
    { src: auditorGen2, alt: 'Factory Manager' },
    { src: auditorGen3, alt: 'Quality Director' },
  ];

  const timelineData = [
    { year: 2019, title: "Foundation", desc: "YVOO Technologies founded in Zagreb with a vision to revolutionize B2B procurement through AI and human expertise." },
    { year: 2020, title: "Product Launch", desc: "Launched SearchPro+ AI supplier discovery platform, connecting buyers with verified suppliers globally." },
    { year: 2021, title: "Global Expansion", desc: "Expanded ScanPro+ auditing platform to 90+ countries with 2,000+ local expert auditors." },
    { year: 2022, title: "Enterprise Growth", desc: "Secured major automotive and manufacturing clients including Mercedes, BMW, and Bosch." },
    { year: 2023, title: "Platform Innovation", desc: "Launched SalesPro+ supplier visibility platform, reaching 7M+ B2B decision-makers worldwide." },
    { year: 2024, title: "Market Leadership", desc: "Achieved 70% cost reduction and 80% time savings for enterprise clients across Europe." },
  ];

  const locations = {
    zagreb: {
      name: "Zagreb HQ",
      address: "Ulica grada Vukovara 271, 10000 Zagreb, Croatia",
      phone: "+385 1 234 5678",
      email: "info@yvoo.com"
    },
    frankfurt: {
      name: "Frankfurt",
      address: "Bockenheimer Landstraße 2-4, 60306 Frankfurt, Germany",
      phone: "+49 69 1234 5678",
      email: "frankfurt@yvoo.com"
    },
    munich: {
      name: "Munich",
      address: "Leopoldstraße 244, 80807 Munich, Germany",
      phone: "+49 89 1234 5678",
      email: "munich@yvoo.com"
    },
    stuttgart: {
      name: "Stuttgart",
      address: "Königstraße 10, 70173 Stuttgart, Germany",
      phone: "+49 711 1234 5678",
      email: "stuttgart@yvoo.com"
    }
  };

  const selectedTimeline = timelineData.find(item => item.year === selectedYear);
  const selectedLocationData = locations[selectedLocation as keyof typeof locations];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* HERO SECTION - Radical Geometric Grid */}
      <section data-nav-theme="light" className="pt-32 pb-24 bg-white">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left - Geometric Photo Grid */}
            <motion.div 
              className="lg:col-span-7 relative" 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-4 gap-2 max-w-[600px]">
                {heroImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-square overflow-hidden bg-gray-100 touch-none select-none"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.02 }}
                  >
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover pointer-events-none"
                      style={{ filter: 'grayscale(100%)' }}
                      initial={{ scale: 1.15 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.02 }}
                    />
                    {/* Subtle green effect */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.4 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.02 + 0.2 }}
                      style={{
                        background: `rgba(168, 197, 184, 0.25)`,
                        mixBlendMode: 'color'
                      }}
                    />
                    {/* Touch flash effect */}
                    <motion.div
                      className="absolute inset-0 bg-[#A8C5B8] pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileTap={{ opacity: [0, 0.3, 0], transition: { duration: 0.4 } }}
                    />
                    <div className="absolute inset-0 border border-black/5" />
                  </motion.div>
                ))}
              </div>
              
              {/* Geometric accent lines */}
              <motion.div 
                className="absolute -top-6 -left-6 w-20 h-20 border-l border-t border-[#A8C5B8]"
                initial={{ opacity: 0, x: -10, y: -10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <motion.div 
                className="absolute -bottom-6 -right-6 w-20 h-20 border-r border-b border-[#A8B8CA]"
                initial={{ opacity: 0, x: 10, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              />
            </motion.div>
            
            {/* Right - Text Content */}
            <motion.div 
              className="lg:col-span-5 space-y-8" 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6">
                <div className="w-12 h-0.5 bg-[#A8C5B8]" />
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-black">
                  Building the Global B2B Platform
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connecting clients, suppliers, and local experts through innovative technology and human expertise.
                </p>
              </div>
              
              <div className="flex gap-1.5">
                <div className="w-10 h-0.5 bg-[#A8C5B8]" />
                <div className="w-6 h-0.5 bg-[#A8B8CA]" />
                <div className="w-3 h-0.5 bg-gray-300" />
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* MISSION STATEMENT - Full Width */}
      <section data-nav-theme="light" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-0.5 bg-[#A8C5B8] mx-auto" />
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              Our Mission
            </h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-light">
              Building exceptional supplier relationships through every interaction. 
              We empower our customers, partners, and team to achieve continuous growth 
              in a culture of mutual respect and trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE PRINCIPLES - Minimal List */}
      <section data-nav-theme="light" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Core <span className="text-[#A8C5B8]">Principles</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
              {[
                { title: "Innovation First", desc: "Leading the industry with AI-powered procurement solutions that transform how businesses source and verify suppliers." },
                { title: "Customer-Centric", desc: "Delivering outstanding experiences through technology designed around real procurement challenges and workflows." },
                { title: "Global Reach", desc: "Operating in 90+ countries with 2,000+ local experts providing personalized support worldwide." },
                { title: "Ethical Technology", desc: "Building trust through transparent AI systems, data privacy protection, and responsible innovation." }
              ].map((principle, index) => (
                <motion.div
                  key={index}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#A8C5B8] flex-shrink-0 mt-1" strokeWidth={3} />
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2">{principle.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{principle.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SUSTAINABILITY - Split Layout */}
      <section data-nav-theme="light" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                <motion.img 
                  src={sustainabilityImage} 
                  alt="Sustainable operations" 
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%)' }}
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />
                {/* Subtle green effect */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `rgba(168, 197, 184, 0.25)`,
                    mixBlendMode: 'color',
                    opacity: 0.4
                  }}
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="text-sm font-semibold uppercase tracking-wider text-[#A8C5B8]">
                  Environmental Commitment
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                  Building a Sustainable Future
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We're committed to minimizing our environmental impact through renewable energy adoption, 
                waste reduction initiatives, and sustainable practices across all operations. Our goal is 
                continuous improvement in carbon footprint reduction and resource efficiency.
              </p>

              <div className="flex gap-1.5 pt-4">
                <div className="w-10 h-0.5 bg-[#A8C5B8]" />
                <div className="w-6 h-0.5 bg-[#A8B8CA]" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TIMELINE - Minimal Horizontal */}
      <section data-nav-theme="light" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-[#A8C5B8]">
                Our Journey
              </h2>
            </div>

            {/* Timeline Navigation */}
            <div className="relative">
              <div className="absolute top-2 left-0 right-0 h-px bg-gray-200" />
              <div className="flex justify-between relative">
                {timelineData.map((item) => (
                  <button
                    key={item.year}
                    onClick={() => setSelectedYear(item.year)}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <motion.div 
                      className="w-4 h-4 rounded-sm transition-all"
                      whileHover={{ scale: 1.2 }}
                      style={{
                        backgroundColor: selectedYear === item.year ? '#A8C5B8' : '#d1d5db',
                      }}
                    />
                    <span 
                      className="text-sm font-semibold transition-colors"
                      style={{ color: selectedYear === item.year ? '#A8C5B8' : '#9ca3af' }}
                    >
                      {item.year}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Content */}
            {selectedTimeline && (
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-12"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  <img 
                    src={timelineImage} 
                    alt={`Year ${selectedTimeline.year}`}
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `rgba(168, 197, 184, 0.25)`,
                      mixBlendMode: 'color',
                      opacity: 0.4
                    }}
                  />
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <h3 className="text-3xl font-bold text-black">{selectedTimeline.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{selectedTimeline.desc}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* LEADERSHIP - Split Layout */}
      <section data-nav-theme="light" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8 lg:order-1"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-black">
                  Leadership <span className="text-[#A8B8CA]">Team</span>
                </h2>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Our leadership brings together entrepreneurial expertise and deep industry knowledge—a combination 
                that drives innovation in AI-powered procurement and global supplier verification.
              </p>

              <Button 
                variant="outline" 
                className="rounded-full border-2 border-[#A8C5B8] text-[#A8C5B8] hover:bg-[#A8C5B8] hover:text-white transition-colors px-8 py-6 text-base"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:order-2"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                <motion.img 
                  src={leadershipTeamImage} 
                  alt="YVOO Leadership Team" 
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%)' }}
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />
                {/* Subtle green effect */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `rgba(168, 197, 184, 0.25)`,
                    mixBlendMode: 'color',
                    opacity: 0.4
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* LOCATIONS - Minimal List */}
      <section data-nav-theme="light" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-16"
          >
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Global <span className="text-[#A8B8CA]">Locations</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Location Selector */}
              <div className="space-y-2">
                {Object.entries(locations).map(([key, location]) => (
                  <motion.button
                    key={key}
                    onClick={() => setSelectedLocation(key)}
                    className="w-full text-left px-6 py-4 transition-all"
                    whileHover={{ x: 4 }}
                    style={{
                      backgroundColor: selectedLocation === key ? '#A8C5B8' : 'transparent',
                      color: selectedLocation === key ? 'white' : 'black',
                      borderLeft: selectedLocation === key ? 'none' : '2px solid #e5e7eb'
                    }}
                  >
                    <span className="font-semibold text-lg">{location.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Location Details */}
              <motion.div
                key={selectedLocation}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 p-8 bg-gray-50"
              >
                <h3 className="text-2xl font-bold text-black">{selectedLocationData.name}</h3>
                <div className="space-y-3 text-gray-600">
                  <p><span className="font-semibold text-[#A8B8CA]">Address:</span> {selectedLocationData.address}</p>
                  <p><span className="font-semibold text-[#A8B8CA]">Phone:</span> {selectedLocationData.phone}</p>
                  <p><span className="font-semibold text-[#A8B8CA]">Email:</span> {selectedLocationData.email}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION - Full Width */}
      <section data-nav-theme="light" className="py-32 bg-black text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your Procurement?
            </h2>
            <p className="text-xl text-gray-400">
              Join leading enterprises achieving 70% cost reduction and 80% time savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                className="bg-[#A8C5B8] text-black hover:bg-[#A8C5B8]/90 rounded-full px-8 py-6 text-base font-semibold"
              >
                Request Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-6 text-base font-semibold"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
