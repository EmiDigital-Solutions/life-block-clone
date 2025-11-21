import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

const SearchSuppliers = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<Array<{role: 'user' | 'ai', message: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const conversation = [
    {
      role: 'ai' as const,
      message: "What type of product or service are you looking for?"
    },
    {
      role: 'user' as const,
      message: "CNC machining for automotive parts"
    },
    {
      role: 'ai' as const,
      message: "Great! What certifications are important for your project?"
    },
    {
      role: 'user' as const,
      message: "ISO 9001 and IATF 16949"
    },
    {
      role: 'ai' as const,
      message: "Perfect! I found 127 suppliers matching your requirements. Here are the top 3..."
    }
  ];

  useEffect(() => {
    if (currentStep < conversation.length) {
      const timer = setTimeout(() => {
        setConversationHistory(prev => [...prev, conversation[currentStep]]);
        setCurrentStep(currentStep + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Reset after showing all messages
      const resetTimer = setTimeout(() => {
        setConversationHistory([]);
        setCurrentStep(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversationHistory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        data-nav-theme="light"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-gray-900">Finding Suppliers</span>
              <br />
              <span className="text-gray-400">Made Simple</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              AI-powered search across 25M+ suppliers worldwide. Get verified results in minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <button className="group inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 text-base">
                Start Search
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-900 px-8 py-4 rounded-full font-medium hover:border-gray-900 transition-all duration-300 text-base">
                Watch Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scrolling Client Band */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-6 overflow-hidden"
        >
          <p className="text-center text-sm text-gray-500 mb-4">
            Trusted by procurement teams worldwide
          </p>
          <div className="relative flex">
            <motion.div
              className="flex gap-12 whitespace-nowrap"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-12 items-center">
                  {[
                    "BMW",
                    "Siemens",
                    "Bosch",
                    "Mercedes-Benz",
                    "Volkswagen",
                    "Continental",
                    "Schneider Electric",
                    "ABB",
                  ].map((company, idx) => (
                    <span
                      key={idx}
                      className="text-base font-medium text-gray-400 tracking-wide"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Demo Section */}
      <section 
        data-nav-theme="light"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-600">
                  AI-Powered
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
                Conversational Search
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                Tell us what you need in plain English. Our AI understands your requirements and finds the perfect suppliers.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "Natural language input",
                  "Smart requirement extraction",
                  "Instant verified results"
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Demo Chat Interface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
                  <h3 className="text-white text-lg font-bold">SearchPro+</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">Live</span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div 
                  ref={chatContainerRef}
                  className="p-6 space-y-4 h-96 overflow-y-auto bg-gray-50"
                >
                  {conversationHistory.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-full">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Describe what you're looking for..."
                      className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        data-nav-theme="light"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Everything you need
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              From search to onboarding, we've got you covered
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Search",
                description: "Natural language processing understands your exact requirements"
              },
              {
                title: "Real-time Verification",
                description: "Instant validation of certifications and capabilities"
              },
              {
                title: "Instant Export",
                description: "Export supplier data to your ERP system in one click"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-900 transition-all hover:shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-900 font-bold text-lg mb-6">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        data-nav-theme="light"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Ready to find your suppliers?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 mb-8"
          >
            Start searching for free. No credit card required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button className="group inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 text-base">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchSuppliers;
