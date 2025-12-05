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
  const [selectedYear, setSelectedYear] = useState(2023);

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
    { year: 2023, title: "Foundation", desc: "YVOO Technologies founded in Zagreb with a vision to revolutionize B2B procurement through AI and human expertise." },
    { year: 2024, title: "Platform Innovation", desc: "Launched SalesPro+ supplier visibility platform, reaching 7M+ B2B decision-makers worldwide." },
    { year: 2025, title: "Market Leadership", desc: "Achieved 70% cost reduction and 80% time savings for enterprise clients across Europe." },
  ];

  const locations = {
    zagreb: {
      name: "Zagreb HQ",
      address: "Ulica grada Vukovara 271, 10000 Zagreb, Croatia",
      phone: "+385 1 234 5678",
      email: "info@yvoo.com"
    },
    munich: {
      name: "Munich",
      address: "Leopoldstraße 244, 80807 Munich, Germany",
      phone: "+49 89 1234 5678",
      email: "munich@yvoo.com"
    }
  };

  const selectedTimeline = timelineData.find(item => item.year === selectedYear);
  const selectedLocationData = locations[selectedLocation as keyof typeof locations];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* HERO SECTION - Compliance Modal Style */}
      <section data-nav-theme="light" className="relative bg-gradient-to-br from-[#e8f4f8] via-white to-[#e8f4f8]">
        {/* Mobile/Tablet Image - Top */}
        <motion.div 
          className="lg:hidden w-full h-48 sm:h-64 md:h-80 overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-4 gap-0.5 h-full w-full">
            {heroImages.slice(0, 4).map((image, index) => (
              <div key={index} className="relative overflow-hidden">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop - Left side image - clipped ellipse */}
        <div className="absolute left-0 top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{ clipPath: 'ellipse(100% 100% at 0% 50%)' }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-4 gap-0.5 h-full w-full">
              {heroImages.slice(0, 8).map((image, index) => (
                <div key={index} className="relative overflow-hidden">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16 lg:py-24 lg:min-h-[80vh] flex items-center">
          <motion.div 
            className="lg:ml-[45%] lg:pl-16 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Building the Global B2B Platform
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Connecting clients, suppliers, and local experts through innovative technology and human expertise.
            </p>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl">
              Our team provides ongoing expertise and guidance to ensure your procurement process remains thorough, compliant and effective.
            </p>
            <Button className="bg-[#0A7FA5] text-white hover:bg-[#0A7FA5]/90 rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg">
              Get In Touch
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div 
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#0A7FA5] flex items-center justify-center animate-bounce"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
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
            <div className="w-12 h-0.5 bg-[#B2CDBC] mx-auto" />
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
                Core <span className="text-primary font-black">Principles</span>
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
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" strokeWidth={4} />
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

      {/* SUSTAINABILITY - Compliance Modal Style */}
      <section data-nav-theme="light" className="relative bg-gradient-to-br from-[#e8f4f8] via-white to-[#e8f4f8]">
        {/* Mobile/Tablet Image - Top */}
        <motion.div 
          className="lg:hidden w-full h-48 sm:h-64 md:h-80 overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src={sustainabilityImage} alt="Sustainable operations" className="w-full h-full object-cover" />
        </motion.div>

        {/* Desktop - Left side image - clipped ellipse */}
        <div className="absolute left-0 top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{ clipPath: 'ellipse(100% 100% at 0% 50%)' }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={sustainabilityImage} alt="Sustainable operations" className="h-full w-full object-cover" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16 lg:py-24 lg:min-h-[80vh] flex items-center">
          <motion.div 
            className="lg:ml-[45%] lg:pl-16 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Building a Sustainable Future
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              We're committed to minimizing our environmental impact through renewable energy adoption, 
              waste reduction initiatives, and sustainable practices across all operations.
            </p>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl">
              Our team provides ongoing expertise and guidance to ensure your sustainability goals are achieved through continuous improvement in carbon footprint reduction and resource efficiency.
            </p>
            <Button className="bg-[#0A7FA5] text-white hover:bg-[#0A7FA5]/90 rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg">
              Get In Touch
            </Button>
          </motion.div>
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
              <h2 className="text-4xl md:text-5xl font-black text-primary">
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
                        backgroundColor: selectedYear === item.year ? 'hsl(195, 89%, 34%)' : '#d1d5db',
                      }}
                    />
                    <span 
                      className="text-sm font-semibold transition-colors"
                      style={{ color: selectedYear === item.year ? 'hsl(195, 89%, 34%)' : '#9ca3af', fontWeight: selectedYear === item.year ? '900' : '600' }}
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
                  {/* Green highlight on specific objects - like helmet reference */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `
                        radial-gradient(ellipse 200px 180px at 50% 40%, rgba(168, 197, 184, 0.9) 0%, rgba(168, 197, 184, 0.55) 28%, transparent 58%),
                        radial-gradient(ellipse 120px 100px at 35% 60%, rgba(168, 197, 184, 0.8) 0%, rgba(168, 197, 184, 0.45) 25%, transparent 52%)
                      `,
                      mixBlendMode: 'overlay'
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

      {/* LEADERSHIP - Compliance Modal Style */}
      <section data-nav-theme="light" className="relative bg-gradient-to-br from-[#e8f4f8] via-white to-[#e8f4f8]">
        {/* Mobile/Tablet Image - Top */}
        <motion.div 
          className="lg:hidden w-full h-48 sm:h-64 md:h-80 overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src={leadershipTeamImage} alt="YVOO Leadership Team" className="w-full h-full object-cover" />
        </motion.div>

        {/* Desktop - Left side image - clipped ellipse */}
        <div className="absolute left-0 top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            style={{ clipPath: 'ellipse(100% 100% at 0% 50%)' }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src={leadershipTeamImage} alt="YVOO Leadership Team" className="h-full w-full object-cover" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16 lg:py-24 lg:min-h-[80vh] flex items-center">
          <motion.div 
            className="lg:ml-[45%] lg:pl-16 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Leadership Team
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Our leadership brings together entrepreneurial expertise and deep industry knowledge—a combination 
              that drives innovation in AI-powered procurement and global supplier verification.
            </p>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl">
              Our team provides ongoing guidance and strategic direction to ensure YVOO remains at the forefront of procurement technology innovation.
            </p>
            <Button className="bg-[#0A7FA5] text-white hover:bg-[#0A7FA5]/90 rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg">
              Get In Touch
            </Button>
          </motion.div>
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
                      backgroundColor: selectedLocation === key ? '#B2CDBC' : 'transparent',
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
                className="bg-[#B2CDBC] text-black hover:bg-[#B2CDBC]/90 rounded-full px-8 py-6 text-base font-semibold"
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
