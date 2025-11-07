import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Globe, Shield, Target, TrendingUp, Award, Zap } from "lucide-react";
import { useState } from "react";

const AboutUs = () => {
  const [selectedLocation, setSelectedLocation] = useState("zagreb");

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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* SECTION 1: HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-white to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/20 aspect-[4/3] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <Zap className="w-32 h-32 mx-auto text-primary animate-pulse-soft" />
                    <p className="text-2xl font-bold text-primary">AI-Powered Procurement</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Text */}
            <div className="order-1 lg:order-2 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                AI-Powered Solutions for Global Procurement Excellence
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-gray-700">
                Transforming B2B Supplier Discovery, Auditing, and Management
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                YVOO leads the AI revolution in procurement and supplier intelligence. With our award-winning technology, 
                businesses get instant supplier discovery, on-site auditing in days (not weeks), and global supplier 
                visibility—all powered by AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TECHNOLOGY & INNOVATION */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Circular Diagram */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Center AI Logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
                    <Zap className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-center mt-3 font-bold text-gray-900">AI Core</p>
                </div>
                
                {/* Orbiting Products */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex flex-col items-center justify-center shadow-lg">
                    <Target className="w-12 h-12 text-white mb-1" />
                    <span className="text-xs font-bold text-white">SearchPro+</span>
                  </div>
                </div>
                
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex flex-col items-center justify-center shadow-lg">
                    <Shield className="w-12 h-12 text-white mb-1" />
                    <span className="text-xs font-bold text-white">ScanPro+</span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex flex-col items-center justify-center shadow-lg">
                    <TrendingUp className="w-12 h-12 text-white mb-1" />
                    <span className="text-xs font-bold text-white">SalesPro+</span>
                  </div>
                </div>
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <line x1="50%" y1="15%" x2="50%" y2="50%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="85%" y1="50%" x2="50%" y2="50%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50%" y1="85%" x2="50%" y2="50%" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>
            </div>
            
            {/* Right: Text */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Technology and Innovation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                With cutting-edge AI, YVOO's platforms deliver next-generation procurement intelligence. 
                <strong className="text-gray-900"> SearchPro+</strong> discovers suppliers globally in seconds, 
                <strong className="text-gray-900"> ScanPro+</strong> conducts on-site audits with certified auditors in 90+ countries, and 
                <strong className="text-gray-900"> SalesPro+</strong> gives suppliers visibility to 7 million+ B2B decision-makers. 
                Our AI learns from every interaction and becomes a true partner in your supply chain team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MISSION & VALUES */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our Mission and Values
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Exceptional supplier relationships with every interaction. Our values guide everything we do. 
              We empower customers, partners, and employees, fostering continuous growth in a culture of 
              mutual respect and trust.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR PRINCIPLES */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            Our Principles
          </h2>
          
          {/* 2x2 Grid with Connected Circles */}
          <div className="relative max-w-5xl mx-auto">
            {/* Center Logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
                <span className="text-2xl font-bold text-white">YVOO</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
              {/* Innovation */}
              <div className="text-center space-y-4 animate-fade-in">
                <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <Lightbulb className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Innovation is at the heart of YVOO. That's why we're the global leader in 
                  AI-powered procurement solutions.
                </p>
              </div>
              
              {/* Customer-Oriented */}
              <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-xl">
                  <Users className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Customer-Oriented Approach</h3>
                <p className="text-gray-600 leading-relaxed">
                  We leverage AI's potential for outstanding customer experiences in procurement.
                </p>
              </div>
              
              {/* Global & Personalized */}
              <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
                  <Globe className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Global & Personalized</h3>
                <p className="text-gray-600 leading-relaxed">
                  Technology for maximum flexibility and unique experiences for customers and partners worldwide.
                </p>
              </div>
              
              {/* Ethical AI */}
              <div className="text-center space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-xl">
                  <Shield className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Ethical AI</h3>
                <p className="text-gray-600 leading-relaxed">
                  We build trust through integrity, transparency, and responsibility. Learn more in our Trust Center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: SUSTAINABILITY COMMITMENT */}
      <section className="relative py-32 bg-gradient-to-br from-green-800 to-green-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 text-white">
            <h2 className="text-4xl md:text-5xl font-bold">
              Carbon Reduction Commitment
            </h2>
            <p className="text-xl leading-relaxed">
              YVOO is committed to reducing our CO₂ footprint and making a sustainable contribution to the future. 
              We pledge to minimize greenhouse gas emissions by increasing energy efficiency and using renewable 
              energy sources whenever possible. We also reduce waste and promote environmentally friendly practices 
              in all our operations.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMPANY HISTORY TIMELINE */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            Company History
          </h2>
          
          {/* Horizontal Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary hidden md:block"></div>
            
            {/* Timeline Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {/* 2019 */}
              <div className="text-center space-y-3 relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center shadow-lg relative z-10">
                  <span className="text-white font-bold">2019</span>
                </div>
                <h3 className="font-bold text-gray-900">Company Founded</h3>
                <p className="text-sm text-gray-600">
                  YVOO Technologies Ltd. founded in Zagreb, Croatia by Ivo and team.
                </p>
              </div>
              
              {/* 2020 */}
              <div className="text-center space-y-3 relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center shadow-lg relative z-10">
                  <span className="text-white font-bold">2020</span>
                </div>
                <h3 className="font-bold text-gray-900">Product Launch</h3>
                <p className="text-sm text-gray-600">
                  SearchPro+ launched - AI supplier discovery platform
                </p>
              </div>
              
              {/* 2021 */}
              <div className="text-center space-y-3 relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-teal-600 flex items-center justify-center shadow-lg relative z-10">
                  <span className="text-white font-bold">2021</span>
                </div>
                <h3 className="font-bold text-gray-900">Expansion</h3>
                <p className="text-sm text-gray-600">
                  ScanPro+ auditing platform goes live with global auditor network
                </p>
              </div>
              
              {/* 2022 */}
              <div className="text-center space-y-3 relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center shadow-lg relative z-10">
                  <span className="text-white font-bold">2022</span>
                </div>
                <h3 className="font-bold text-gray-900">Growth</h3>
                <p className="text-sm text-gray-600">
                  Expanded to major automotive and manufacturing clients
                </p>
              </div>
              
              {/* 2023 */}
              <div className="text-center space-y-3 relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-600 flex items-center justify-center shadow-lg relative z-10">
                  <span className="text-white font-bold">2023</span>
                </div>
                <h3 className="font-bold text-gray-900">Innovation</h3>
                <p className="text-sm text-gray-600">
                  SalesPro+ supplier visibility platform launched
                </p>
              </div>
              
              {/* 2024 */}
              <div className="text-center space-y-3 relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center shadow-lg relative z-10">
                  <span className="text-white font-bold">2024</span>
                </div>
                <h3 className="font-bold text-gray-900">Scale</h3>
                <p className="text-sm text-gray-600">
                  Serving enterprise clients across Europe, achieving 70% cost reduction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LEADERSHIP TEAM */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-white to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              YVOO Leadership
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our leadership team brings a broad range of entrepreneurial skills and industry-specific 
              expertise – a combination that shapes YVOO's success.
            </p>
          </div>
          
          {/* Leadership Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Leadership Member {item}</h3>
                  <p className="text-gray-600">Position Title</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full">
              Learn More About Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 8: LOCATIONS */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
            Our Locations
          </h2>
          
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Location List */}
            <div className="lg:col-span-2 space-y-3">
              {Object.entries(locations).map(([key, location]) => (
                <button
                  key={key}
                  onClick={() => setSelectedLocation(key)}
                  className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-300 ${
                    selectedLocation === key
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-semibold">{location.name}</span>
                </button>
              ))}
            </div>
            
            {/* Selected Location Details */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl p-8 h-full flex flex-col justify-center space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">
                  {locations[selectedLocation as keyof typeof locations].name}
                </h3>
                <div className="space-y-3 text-lg">
                  <p className="text-gray-700">
                    <strong>Address:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].address}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].phone}
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong><br />
                    {locations[selectedLocation as keyof typeof locations].email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CTA FOOTER SECTION */}
      <section className="py-32 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-teal-600 flex items-center justify-center shadow-2xl animate-pulse-soft">
              <Zap className="w-24 h-24 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Experience YVOO in Action
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover how AI-powered platforms revolutionize your procurement and supplier management.
            </p>
            
            <Button className="bg-primary hover:bg-primary/90 text-white px-12 py-7 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              REQUEST DEMO
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;