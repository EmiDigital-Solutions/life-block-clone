import { Button } from "@/components/ui/button";
import { Check, Users, Eye, TrendingUp, ArrowRight, Building2, Globe2, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const BeFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Matching Main Page Style */}
      <section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Pure Black Background */}
        <div className="absolute inset-0 bg-black"></div>

        {/* Content - Centered Layout like Main Page */}
        <div className="relative z-10 container mx-auto px-6 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-8">
              
              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight tracking-tight max-w-4xl"
              >
                Reach Your Target Clients, Showcase Verified Excellence
              </motion.h1>

              {/* Subtitle */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl font-sans font-medium text-cyan-400/90 tracking-wide"
              >
                Free Profile · Premium Visibility · Global Reach
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-white/70 font-sans font-medium max-w-3xl"
              >
                Create or claim your supplier profile in minutes. If your company is already listed on YVOO, take control of your profile for free and manage your content.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
                  Claim Your Profile
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mb-12 text-base font-sans"
          >
            Trusted by industry leaders worldwide
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center"
          >
            {["REWE", "KNORR", "IFM", "ABUS", "AVL", "KROMBACHER"].map((name, index) => (
              <motion.div 
                key={name} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center h-24 bg-white rounded-xl shadow-md hover:shadow-lg transition-all px-6"
              >
                <span className="text-2xl md:text-3xl font-bold text-gray-800">{name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-20"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Our Value</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: "7M+",
                title: "Users per year",
                items: ["Worldwide Audience", "B2B driven", "All industries"]
              },
              {
                number: "12M+",
                title: "Suppliers viewed per month",
                items: ["Manage Supplier Profile Content", "Enrich Supplier Data", "Organic Analytics"]
              },
              {
                number: "5x",
                title: "More Visibility for Premium",
                items: ["Precise Targeting", "Advanced Analytics", "Buyer Intent Data"]
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-4">
                  {stat.number}
                </div>
                <div className="text-2xl font-semibold mb-6 text-foreground">{stat.title}</div>
                <ul className="space-y-3 text-muted-foreground">
                  {stat.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Product</span> <span className="text-foreground">Overview.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-20 max-w-2xl"
          >
            Get started in three simple steps and begin connecting with global buyers
          </motion.p>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                number: 1,
                title: "Create / Claim your company profile",
                description: "Sign up and create your supplier profile with your company details, capabilities, certifications, and audit history. Make your profile stand out to potential buyers.",
                active: false
              },
              {
                number: 2,
                title: "Analytics",
                description: "Schedule an on-site audit with our verified auditors. Once completed, your profile receives the YVOO verified badge, significantly increasing buyer trust and visibility.",
                active: true
              },
              {
                number: 3,
                title: "YVOO Ads",
                description: "Start receiving inquiries from global buyers searching for verified suppliers. Track your profile performance, manage leads, and grow your business opportunities.",
                active: false
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="space-y-4"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold ${
                  step.active 
                    ? 'bg-cyan-100 text-cyan-700 border-b-4 border-cyan-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Global Leads on Autopilot</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-2xl md:text-3xl font-semibold mb-20 text-foreground"
          >
            with YVOO Ads
          </motion.p>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: TrendingUp,
                label: "Ranking",
                title: "Secure a top ranking position at YVOO Search for more leads and greater visibility.",
                color: "from-blue-600 to-cyan-600"
              },
              {
                icon: BarChart3,
                label: "Performance Reporting",
                title: "Get advanced insights into the performance of your ad campaigns.",
                color: "from-cyan-600 to-emerald-600"
              },
              {
                icon: Users,
                label: "Buyer Intent Data",
                title: "Our platform delivers intent-driven insights so you can focus on the prospects that matter most - those actively exploring solutions like yours.",
                color: "from-emerald-600 to-teal-600"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <p className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}>
                    {feature.label}
                  </p>
                  <h3 className="text-xl font-semibold text-foreground leading-tight">
                    {feature.title}
                  </h3>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
                >
                  <feature.icon className="w-20 h-20 text-cyan-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">Ready to Get</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Discovered?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Join thousands of verified suppliers connecting with global buyers on YVOO
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-xl hover:scale-105 transition-all border-2 border-gray-200">
              Create Free Profile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-xl hover:scale-105 transition-all border-2 border-gray-200">
              View Pricing
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeFound;
