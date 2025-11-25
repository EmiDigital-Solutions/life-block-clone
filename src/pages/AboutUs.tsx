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
      
      {/* HERO SECTION - Radical Geometric Grid */}
      <section data-nav-theme="light" className="pt-32 pb-24 bg-gray-50">
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
                    {/* Touch flash effect */}
                    <motion.div
                      className="absolute inset-0 bg-primary pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileTap={{ opacity: [0, 0.3, 0], transition: { duration: 0.4 } }}
                    />
                    <div className="absolute inset-0 border border-black/5" />
                  </motion.div>
                ))}
              </div>
              
              {/* Geometric accent lines */}
              <motion.div 
                className="absolute -top-6 -left-6 w-20 h-20 border-l border-t border-primary"
                initial={{ opacity: 0, x: -10, y: -10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <motion.div 
                className="absolute -bottom-6 -right-6 w-20 h-20 border-r border-b border-secondary"
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
                <div className="w-12 h-0.5 bg-primary" />
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-black">
                  Building the Global B2B Platform
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connecting clients, suppliers, and local experts through innovative technology and human expertise.
                </p>
              </div>
              
              <div className="flex gap-1.5">
                <div className="w-10 h-0.5 bg-primary" />
                <div className="w-6 h-0.5 bg-secondary" />
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
            <div className="w-12 h-0.5 bg-primary mx-auto" />
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
                Core <span className="text-primary font-black drop-shadow-sm">Principles</span>
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
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1 drop-shadow-md" strokeWidth={4} />
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
                {/* Green highlight on specific objects */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(ellipse 180px 160px at 45% 35%, hsl(var(--primary) / 0.9) 0%, hsl(var(--primary) / 0.6) 30%, transparent 60%),
                      radial-gradient(ellipse 140px 120px at 65% 55%, hsl(var(--primary) / 0.85) 0%, hsl(var(--primary) / 0.5) 28%, transparent 55%)
                    `,
                    mixBlendMode: 'overlay'
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
                <div className="text-sm font-black uppercase tracking-wider text-primary drop-shadow-sm">
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
                <div className="w-10 h-0.5 bg-primary" />
                <div className="w-6 h-0.5 bg-secondary" />
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
              <h2 className="text-4xl md:text-5xl font-black text-primary drop-shadow-md">
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
                        backgroundColor: selectedYear === item.year ? 'hsl(var(--primary))' : '#d1d5db',
                      }}
                    />
                    <span 
                      className="text-sm font-semibold transition-colors"
                      style={{ 
                        color: selectedYear === item.year ? 'hsl(var(--primary))' : '#9ca3af', 
                        fontWeight: selectedYear === item.year ? '900' : '600', 
                        textShadow: selectedYear === item.year ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' 
                      }}
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
                  {/* Green highlight on specific objects */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `
                        radial-gradient(ellipse 200px 180px at 50% 40%, hsl(var(--primary) / 0.9) 0%, hsl(var(--primary) / 0.55) 28%, transparent 58%),
                        radial-gradient(ellipse 120px 100px at 35% 60%, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.45) 25%, transparent 52%)
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

      {/* LEADERSHIP - Photo + Team */}
      <section data-nav-theme="light" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Leadership Team Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <img 
                src={leadershipTeamImage} 
                alt="Leadership Team" 
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%)' }}
              />
            </motion.div>

            {/* Team Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Leadership <span className="text-secondary">Team</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Our diverse leadership team brings decades of experience in manufacturing, 
                supply chain management, technology, and quality assurance. United by a shared 
                vision of transforming B2B procurement through innovation and trust.
              </p>

              <button
                className="rounded-full border-3 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors px-8 py-6 text-base shadow-sm"
              >
                Meet the Team <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* LOCATIONS - Interactive Map Section */}
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
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Global <span className="text-secondary">Locations</span>
              </h2>
              <p className="text-lg text-gray-600">
                Our offices serve as hubs for innovation and collaboration
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                {Object.entries(locations).map(([key, location]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLocation(key)}
                    className="w-full text-left px-6 py-4 rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: selectedLocation === key ? 'hsl(var(--primary))' : 'transparent',
                      border: '2px solid',
                      borderColor: selectedLocation === key ? 'hsl(var(--primary))' : '#e5e7eb',
                      color: selectedLocation === key ? 'white' : '#111827'
                    }}
                  >
                    <h3 className="text-xl font-bold mb-1">{location.name}</h3>
                    <p className="text-sm opacity-70">{location.address.split(',')[location.address.split(',').length - 1]}</p>
                  </button>
                ))}
              </div>

              <motion.div
                key={selectedLocation}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 rounded-2xl p-8 space-y-4"
              >
                <h3 className="text-2xl font-bold text-black mb-6">{selectedLocationData.name}</h3>
                <div className="space-y-3 text-gray-700">
                  <p><span className="font-semibold text-secondary">Address:</span> {selectedLocationData.address}</p>
                  <p><span className="font-semibold text-secondary">Phone:</span> {selectedLocationData.phone}</p>
                  <p><span className="font-semibold text-secondary">Email:</span> {selectedLocationData.email}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section data-nav-theme="light" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              Join Us in Transforming B2B Procurement
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're a buyer, supplier, or auditor — let's build the future together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-primary text-black hover:bg-primary/90 rounded-full px-8 py-6 text-base font-semibold"
              >
                Get Started <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-semibold"
              >
                Contact Us
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