import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import laptopMockup from "@/assets/hero-architecture.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-16">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-cyan-500/20"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/30 via-purple-600/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-600/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Become visible,
                </span>
              </h1>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                to over 7 million+
              </h1>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                B2B decision-makers.
              </h1>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-medium">Free of Charge</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-medium">Paid Advertisement</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-full font-semibold shadow-lg shadow-purple-600/30 transition-all hover:scale-105">
              Claim your company
            </Button>

            {/* Bottom Text */}
            <div className="pt-8 space-y-3 max-w-lg">
              <h3 className="text-white text-xl font-bold">
                Create or Claim your free profile just in minutes.
              </h3>
              <p className="text-gray-400 leading-relaxed">
                If your company is already represented by ensun: take over the account free of charge and control the content individually.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Laptop Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div
              className="relative"
              style={{
                transform: "perspective(1200px) rotateY(-15deg) rotateX(5deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Browser Chrome */}
              <div className="bg-gray-800 rounded-t-xl p-3 shadow-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 bg-gray-700 rounded px-4 py-1 text-gray-400 text-xs ml-4">
                    yvoo.io
                  </div>
                </div>
              </div>
              
              {/* Browser Content */}
              <div className="bg-white rounded-b-xl overflow-hidden shadow-2xl">
                <img
                  src={laptopMockup}
                  alt="YVOO Platform Dashboard"
                  className="w-full h-auto"
                />
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-3xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
