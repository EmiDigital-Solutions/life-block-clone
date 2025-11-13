import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Globe, Shield, Target, TrendingUp, MessageCircle, Package, Zap, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import sustainabilityImage from "@/assets/about-sustainability.jpg";
import timelineImage from "@/assets/about-timeline-2019.jpg";
import leadershipTeamImage from "@/assets/about-leadership-team.jpg";
import SphereImageGrid, { ImageData } from "@/components/SphereImageGrid";
import FounderMissionSection from "@/components/FounderMissionSection";

// Import 40 unique faces for sphere - mix of auditors and procurement professionals
import auditorEuropean from "@/assets/auditor-real-european.jpg";
import auditorAsian from "@/assets/auditor-real-asian.jpg";
import auditorAfrican from "@/assets/auditor-real-african.jpg";
import auditorLatin from "@/assets/auditor-real-latin.jpg";
import auditorMiddleEast from "@/assets/auditor-real-middle-east.jpg";
import auditorSouthAsian from "@/assets/auditor-real-south-asian.jpg";
import auditorFemaleEuropean from "@/assets/auditor-female-european.jpg";
import auditorFemaleAsian from "@/assets/auditor-female-asian.jpg";
import auditorFemaleAfrican from "@/assets/auditor-female-african.jpg";
import auditorFemaleLatin from "@/assets/auditor-female-latin.jpg";
import auditorFemaleMiddleEast from "@/assets/auditor-female-middle-east.jpg";
import auditorFemaleSouthAsian from "@/assets/auditor-female-south-asian.jpg";
import auditorFemaleOceania from "@/assets/auditor-female-oceania.jpg";
import auditorMaleNorthAmerica from "@/assets/auditor-male-north-america.jpg";
import auditorGen1 from "@/assets/auditor-gen-1.jpg";
import auditorGen2 from "@/assets/auditor-gen-2.jpg";
import auditorGen3 from "@/assets/auditor-gen-3.jpg";
import auditorGen4 from "@/assets/auditor-gen-4.jpg";
import auditorGen13 from "@/assets/auditor-gen-13.jpg";
import auditorGen15 from "@/assets/auditor-gen-15.jpg";
import auditorGen17 from "@/assets/auditor-gen-17.jpg";
import auditorGen18 from "@/assets/auditor-gen-18.jpg";
import auditorGen21 from "@/assets/auditor-gen-21.jpg";
import auditorGen23 from "@/assets/auditor-gen-23.jpg";
import auditorGen24 from "@/assets/auditor-gen-24.jpg";
// Blonde auditors for better diversity balance
import auditorBlonde1 from "@/assets/auditor-blonde-1.jpg";
import auditorBlonde2 from "@/assets/auditor-blonde-2.jpg";
import auditorBlonde3 from "@/assets/auditor-blonde-3.jpg";
import auditorBlonde4 from "@/assets/auditor-blonde-4.jpg";
import auditorBlonde5 from "@/assets/auditor-blonde-5.jpg";
// Procurement professionals
import procurementFemaleEuropean from "@/assets/procurement-female-european.jpg";
import procurementMaleAsian from "@/assets/procurement-male-asian.jpg";
import procurementFemaleAfrican from "@/assets/procurement-female-african.jpg";
import procurementMaleLatin from "@/assets/procurement-male-latin.jpg";
import procurementFemaleMiddleEast from "@/assets/procurement-female-middle-east.jpg";
import procurementMaleSouthAsian from "@/assets/procurement-male-south-asian.jpg";
import procurementFemaleBlonde from "@/assets/procurement-female-blonde.jpg";
import procurementMaleOceania from "@/assets/procurement-male-oceania.jpg";
import procurementFemaleAsian from "@/assets/procurement-female-asian.jpg";
import procurementMaleEuropean from "@/assets/procurement-male-european.jpg";
const AboutUs = () => {
  const [selectedLocation, setSelectedLocation] = useState("zagreb");
  const [selectedYear, setSelectedYear] = useState(2019);

  // 40 unique auditor faces for the sphere - balanced diversity
  const sphereImages: ImageData[] = [{
    id: '1',
    src: auditorBlonde1,
    alt: 'European Female Auditor',
    title: 'Europe'
  }, {
    id: '2',
    src: auditorBlonde2,
    alt: 'Scandinavian Inspector',
    title: 'Northern Europe'
  }, {
    id: '3',
    src: auditorBlonde3,
    alt: 'German Quality Manager',
    title: 'Europe'
  }, {
    id: '4',
    src: auditorBlonde4,
    alt: 'Dutch Auditor',
    title: 'Netherlands'
  }, {
    id: '5',
    src: auditorBlonde5,
    alt: 'Swedish Safety Inspector',
    title: 'Sweden'
  }, {
    id: '6',
    src: procurementFemaleBlonde,
    alt: 'Procurement Coordinator',
    title: 'UK'
  }, {
    id: '7',
    src: procurementMaleOceania,
    alt: 'Procurement Officer',
    title: 'Australia'
  }, {
    id: '8',
    src: procurementFemaleEuropean,
    alt: 'Procurement Manager',
    title: 'Norway'
  }, {
    id: '9',
    src: auditorEuropean,
    alt: 'European Auditor',
    title: 'Europe'
  }, {
    id: '10',
    src: procurementMaleAsian,
    alt: 'Procurement Specialist',
    title: 'East Asia'
  }, {
    id: '11',
    src: auditorFemaleEuropean,
    alt: 'European Female Auditor',
    title: 'Europe'
  }, {
    id: '12',
    src: procurementFemaleAsian,
    alt: 'Vendor Relations Manager',
    title: 'East Asia'
  }, {
    id: '13',
    src: procurementMaleLatin,
    alt: 'Procurement Director',
    title: 'Americas'
  }, {
    id: '14',
    src: auditorGen1,
    alt: 'Industrial Safety Auditor',
    title: 'Global'
  }, {
    id: '15',
    src: auditorGen2,
    alt: 'Factory Quality Inspector',
    title: 'Asia'
  }, {
    id: '16',
    src: auditorGen3,
    alt: 'Warehouse Quality Manager',
    title: 'Middle East'
  }, {
    id: '17',
    src: auditorGen4,
    alt: 'Industrial Site Inspector',
    title: 'Africa'
  }, {
    id: '18',
    src: procurementMaleSouthAsian,
    alt: 'Supply Chain Analyst',
    title: 'Americas'
  }, {
    id: '19',
    src: procurementMaleEuropean,
    alt: 'Strategic Sourcing Manager',
    title: 'Europe'
  }, {
    id: '20',
    src: procurementFemaleAfrican,
    alt: 'Supply Chain Manager',
    title: 'Africa'
  }, {
    id: '21',
    src: procurementFemaleMiddleEast,
    alt: 'Purchasing Manager',
    title: 'Americas'
  }, {
    id: '22',
    src: auditorMaleNorthAmerica,
    alt: 'North American Male Auditor',
    title: 'North America'
  }, {
    id: '23',
    src: auditorGen13,
    alt: 'Facility Operations Manager',
    title: 'Europe'
  }, {
    id: '24',
    src: auditorFemaleOceania,
    alt: 'Oceania Female Auditor',
    title: 'Oceania'
  }, {
    id: '25',
    src: auditorGen15,
    alt: 'Site Operations Director',
    title: 'East Asia'
  }, {
    id: '26',
    src: auditorMiddleEast,
    alt: 'Middle East Auditor',
    title: 'Middle East'
  }, {
    id: '27',
    src: auditorGen17,
    alt: 'Plant Compliance Auditor',
    title: 'Pacific'
  }, {
    id: '28',
    src: auditorGen18,
    alt: 'Laboratory Quality Control',
    title: 'Americas'
  }, {
    id: '29',
    src: auditorFemaleMiddleEast,
    alt: 'Middle East Female Auditor',
    title: 'Middle East'
  }, {
    id: '30',
    src: auditorGen21,
    alt: 'Factory Floor Inspector',
    title: 'Eastern Europe'
  }, {
    id: '31',
    src: auditorAfrican,
    alt: 'African Male Auditor',
    title: 'Africa'
  }, {
    id: '32',
    src: auditorGen23,
    alt: 'Quality Operations Director',
    title: 'Africa'
  }, {
    id: '33',
    src: auditorGen24,
    alt: 'Construction Compliance Inspector',
    title: 'Americas'
  }, {
    id: '34',
    src: auditorSouthAsian,
    alt: 'South Asian Auditor',
    title: 'South Asia'
  }, {
    id: '35',
    src: auditorFemaleSouthAsian,
    alt: 'South Asian Female Auditor',
    title: 'South Asia'
  }, {
    id: '36',
    src: auditorEuropean,
    alt: 'European Senior Auditor',
    title: 'Europe'
  }, {
    id: '37',
    src: auditorFemaleEuropean,
    alt: 'European Regional Lead',
    title: 'Europe'
  }, {
    id: '38',
    src: auditorAsian,
    alt: 'Asian Senior Auditor',
    title: 'Asia'
  }, {
    id: '39',
    src: auditorFemaleAsian,
    alt: 'Asian Regional Lead',
    title: 'East Asia'
  }, {
    id: '40',
    src: auditorLatin,
    alt: 'Americas Regional Auditor',
    title: 'Americas'
  }];
  const locations = {
    zagreb: {
      name: "Zagreb (Headquarters)",
      address: "Ulica grada Vukovara 271, 10000 Zagreb, Croatia",
      phone: "+385 1 234 5678",
      email: "info@yvoo.com"
    },
    frankfurt: {
      name: "Frankfurt Office",
      address: "Bockenheimer Landstraße 2-4, 60306 Frankfurt, Germany",
      phone: "+49 69 1234 5678",
      email: "frankfurt@yvoo.com"
    },
    munich: {
      name: "Munich Office",
      address: "Leopoldstraße 244, 80807 Munich, Germany",
      phone: "+49 89 1234 5678",
      email: "munich@yvoo.com"
    },
    stuttgart: {
      name: "Stuttgart Office",
      address: "Königstraße 10, 70173 Stuttgart, Germany",
      phone: "+49 711 1234 5678",
      email: "stuttgart@yvoo.com"
    }
  };
  const timelineData = [{
    year: 2019,
    title: "Company Founded",
    desc: "YVOO Technologies Ltd. founded in Zagreb, Croatia by Ivo and team. Mission: Create the ultimate AI-powered B2B procurement platform.",
    image: "office"
  }, {
    year: 2020,
    title: "Product Launch",
    desc: "SearchPro+ launched - AI supplier discovery platform with instant global supplier matching.",
    image: "launch"
  }, {
    year: 2021,
    title: "Expansion",
    desc: "ScanPro+ auditing platform goes live with global auditor network in 90+ countries.",
    image: "expansion"
  }, {
    year: 2022,
    title: "Growth",
    desc: "Expanded to major automotive and manufacturing clients including Mercedes, BMW, Bosch.",
    image: "growth"
  }, {
    year: 2023,
    title: "Innovation",
    desc: "SalesPro+ supplier visibility platform launched, reaching 7M+ B2B decision-makers.",
    image: "innovation"
  }, {
    year: 2024,
    title: "Scale",
    desc: "Serving enterprise clients across Europe, achieving 70% cost reduction and 80% time savings.",
    image: "scale"
  }];
  const selectedTimeline = timelineData.find(item => item.year === selectedYear);
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* SECTION 1: HERO SECTION - Cognigy Style */}
      <section data-nav-theme="light" className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-12 sm:pb-16 md:pb-20 lg:pb-28 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1500px]">
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 sm:gap-16 md:gap-20 lg:gap-24 items-center">
            
            {/* Left - 3D Sphere */}
            <motion.div className="relative flex justify-center items-center order-1 md:order-1 md:ml-4 lg:ml-8" initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }}>
              <SphereImageGrid 
                images={sphereImages} 
                containerSize={550} 
                sphereRadius={280} 
                autoRotate={true} 
                autoRotateSpeed={0.03}
                dragSensitivity={0.25}
                momentumDecay={0.98}
                maxRotationSpeed={2}
                baseImageScale={0.8} 
              />
            </motion.div>
            
            {/* Right - Text Content with staggered animation */}
            <motion.div className="flex flex-col space-y-4 sm:space-y-6 order-2 md:order-2" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }}>
              {/* Main Heading */}
              <motion.h1 initial={{
              opacity: 0,
              y: 50
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-[-0.02em]" style={{
              color: "#1E2A3A"
            }}>Building the Global B2B Platform linking Clients, Suppliers & local Experts </motion.h1>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* SECTION 2: TECHNOLOGY & INNOVATION */}
      <section data-nav-theme="light" className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            {/* Left: Text */}
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }} className="space-y-6">
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
                Technology and <span className="text-blue-600">Innovation</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                [Please provide the text content you'd like to add here]
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION & VALUES */}
      <section data-nav-theme="light" className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="max-w-4xl mx-auto text-center space-y-8 text-gray-900">
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold">
              Our Mission and Values
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-700">
              Exceptional supplier relationships with every interaction. Our values guide everything we do. 
              We empower customers, partners, and employees, fostering continuous growth in a culture of 
              mutual respect and trust.
            </p>
          </motion.div>
          
          {/* Founder Mission Section */}
          <FounderMissionSection />
        </div>
      </section>

      {/* SECTION 4: OUR PRINCIPLES */}
      <section data-nav-theme="light" className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-gray-50">
        <div className="container mx-auto">
          <motion.h2 initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 text-center mb-20">
            Our <span className="text-blue-600">Principles</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <div className="space-y-8">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.1
            }} className="space-y-3">
                <h3 className="text-2xl font-bold text-blue-600">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Innovation is at the heart of YVOO. That's why we're the global leader in 
                  AI-powered procurement solutions.
                </p>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.2
            }} className="space-y-3">
                <h3 className="text-2xl font-bold text-[#14B8A6]">Customer-Oriented Approach</h3>
                <p className="text-gray-600 leading-relaxed">
                  We leverage AI's potential for outstanding customer experiences in procurement.
                </p>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.3
            }} className="space-y-3">
                <h3 className="text-2xl font-bold text-blue-600">Global & Personalized</h3>
                <p className="text-gray-600 leading-relaxed">
                  Technology for maximum flexibility and unique experiences for customers and partners worldwide.
                </p>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.4
            }} className="space-y-3">
                <h3 className="text-2xl font-bold text-[#14B8A6]">Ethical AI</h3>
                <p className="text-gray-600 leading-relaxed">
                  We build trust through integrity, transparency, and responsibility. Learn more in our Trust Center.
                </p>
              </motion.div>
            </div>
            
            {/* Right: Connected circular badges */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }} className="relative">
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <line x1="100" y1="100" x2="300" y2="100" stroke="#e5e7eb" strokeWidth="2" />
                  <line x1="300" y1="100" x2="300" y2="300" stroke="#e5e7eb" strokeWidth="2" />
                  <line x1="300" y1="300" x2="100" y2="300" stroke="#e5e7eb" strokeWidth="2" />
                  <line x1="100" y1="300" x2="100" y2="100" stroke="#e5e7eb" strokeWidth="2" />
                </svg>
                
                {/* Center text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-3xl font-bold text-gray-900">YVOO</span>
                </div>
                
                {/* Circular badges */}
                <motion.div initial={{
                scale: 0
              }} whileInView={{
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.3
              }} className="absolute top-0 left-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Lightbulb className="w-12 h-12 text-[#14B8A6]" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div initial={{
                scale: 0
              }} whileInView={{
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.4
              }} className="absolute top-0 right-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0F8775] p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Users className="w-12 h-12 text-[#14B8A6]" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div initial={{
                scale: 0
              }} whileInView={{
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.5
              }} className="absolute bottom-0 left-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Globe className="w-12 h-12 text-[#14B8A6]" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div initial={{
                scale: 0
              }} whileInView={{
                scale: 1
              }} viewport={{
                once: true
              }} transition={{
                delay: 0.6
              }} className="absolute bottom-0 right-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0F8775] p-1 shadow-xl">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Shield className="w-12 h-12 text-[#14B8A6]" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SUSTAINABILITY COMMITMENT */}
      <section data-nav-theme="light" className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left: Image */}
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="lg:col-span-2">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5]">
                <img src={sustainabilityImage} alt="Sustainable office building with green technology" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating badge */}
                <motion.div animate={{
                y: [0, -10, 0]
              }} transition={{
                duration: 3,
                repeat: Infinity
              }} className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
                  <Package className="w-8 h-8 text-[#14B8A6]" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right: Content */}
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="lg:col-span-3 space-y-6">
              <div className="text-sm font-semibold text-[#14B8A6] uppercase tracking-wider">
                Carbon Reduction Commitment
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Committed to Reducing Our Carbon Footprint and Building a Sustainable Future
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We pledge to minimize greenhouse gas emissions by increasing energy efficiency and using renewable 
                energy sources whenever possible. We also reduce waste and promote environmentally friendly practices 
                in all our operations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMPANY HISTORY TIMELINE */}
      <section id="timeline-section" data-nav-theme="light" className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-gray-50">
        <div className="container mx-auto">
          <motion.h2 initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-4xl md:text-5xl xl:text-6xl font-bold text-blue-600 text-center mb-20">
            Our History
          </motion.h2>
          
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Timeline dots */}
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
              {timelineData.map(item => <button key={item.year} onClick={() => setSelectedYear(item.year)} className="flex flex-col items-center gap-2 group">
                  <motion.div whileHover={{
                scale: 1.2
              }} className={`w-4 h-4 rounded-full transition-all ${selectedYear === item.year ? 'bg-[#14B8A6] ring-4 ring-[#14B8A6]/20' : 'bg-gray-300 hover:bg-gray-400'}`} />
                  <span className={`text-sm font-semibold ${selectedYear === item.year ? 'text-[#14B8A6]' : 'text-gray-400'}`}>
                    {item.year}
                  </span>
                </button>)}
            </div>
            
            {/* Timeline content */}
            {selectedTimeline && <motion.div key={selectedYear} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} className="relative">
                <div className="grid md:grid-cols-5 gap-8">
                  <div className="md:col-span-3 relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video">
                    <img src={timelineImage} alt={`Company milestone in ${selectedTimeline.year}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-8 left-8">
                      <span className="text-6xl font-bold text-white/30">{selectedTimeline.year}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4 text-blue-600">{selectedTimeline.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedTimeline.desc}</p>
                  </div>
                </div>
              </motion.div>}
          </div>
        </div>
      </section>

      {/* SECTION 7: LEADERSHIP TEAM */}
      <section id="leadership-section" data-nav-theme="light" className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Team photo */}
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="order-2 lg:order-1">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3]">
                <img src={leadershipTeamImage} alt="YVOO leadership team" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <p className="text-center mt-4 text-gray-500 text-sm">
                YVOO Leadership Team
              </p>
            </motion.div>
            
            {/* Right: Text */}
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
                YVOO <span className="text-blue-600">Leadership</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Our leadership team brings together entrepreneurial expertise and industry-specific knowledge—a 
                combination that drives YVOO's success and innovation in AI-powered procurement solutions.
              </p>
              <Button variant="outline" className="border-2 border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6]/10 rounded-xl px-8 py-6 text-lg">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 8: LOCATIONS */}
      <section data-nav-theme="light" className="py-24 md:py-32 px-4 sm:px-6 lg:px-12 bg-gray-50">
        <div className="container mx-auto">
          <motion.h2 initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 text-center mb-20">
            Our <span className="text-blue-600">Locations</span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Location List */}
            <div className="lg:col-span-2 space-y-3">
              {Object.entries(locations).map(([key, location]) => <button key={key} onClick={() => setSelectedLocation(key)} className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 ${selectedLocation === key ? 'bg-[#14B8A6] text-white shadow-lg' : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-200'}`}>
                  <span className="font-semibold">{location.name}</span>
                </button>)}
            </div>
            
            {/* Selected Location Details */}
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-[2.5rem] p-10 h-full flex flex-col justify-center space-y-8 shadow-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {locations[selectedLocation as keyof typeof locations].name}
                </h3>
                <div className="space-y-4 text-lg md:text-xl">
                  <p className="text-gray-600">
                    <strong className="text-blue-600">Address:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].address}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-blue-600">Phone:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].phone}
                  </p>
                  <p className="text-gray-600">
                    <strong className="text-blue-600">Email:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].email}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CTA FOOTER SECTION */}
      <section data-nav-theme="dark" className="py-32 px-4 sm:px-6 lg:px-12" style={{
      background: "linear-gradient(135deg, rgb(15, 135, 117), rgb(20, 184, 166), rgb(45, 212, 191))"
    }}>
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="max-w-4xl mx-auto text-center space-y-10 text-white">
            <motion.div animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }} transition={{
            duration: 4,
            repeat: Infinity
          }} className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
              <Zap className="w-16 h-16 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              Experience YVOO in Action
            </h2>
            
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Discover how AI-powered platforms revolutionize your procurement and supplier management.
            </p>
            
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center" whileHover={{
            scale: 1.02
          }}>
              <Button className="bg-white hover:bg-white/90 text-[#14B8A6] px-12 py-7 text-xl font-semibold rounded-full shadow-2xl">
                REQUEST DEMO
              </Button>
              <Button asChild className="bg-[#14B8A6] hover:bg-[#14B8A6]/90 text-white px-12 py-7 text-xl font-semibold rounded-full shadow-2xl border-2 border-white/30">
                <a href="/auditors">
                  ONBOARD AS EXPERT
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default AboutUs;