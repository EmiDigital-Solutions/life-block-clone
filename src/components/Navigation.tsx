import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-deep/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-white font-sans text-2xl font-bold">YVOO</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="text-white/80 hover:text-white transition-colors font-sans text-sm flex items-center gap-1">
                Solutions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-72 bg-navy-deep/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="p-4 space-y-3">
                  <a href="#search-suppliers" className="block p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400">›</span>
                      <div>
                        <div className="text-white font-semibold text-sm">Search Suppliers</div>
                        <div className="text-white/60 text-xs mt-1">Find relevant companies</div>
                      </div>
                    </div>
                  </a>
                  <a href="#ground-intelligence" className="block p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400">›</span>
                      <div>
                        <div className="text-white font-semibold text-sm">Ground Intelligence</div>
                        <div className="text-white/60 text-xs mt-1">Qualify suppliers on-site</div>
                      </div>
                    </div>
                  </a>
                  <a href="#be-found" className="block p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-400">›</span>
                      <div>
                        <div className="text-white font-semibold text-sm">Be found</div>
                        <div className="text-white/60 text-xs mt-1">Reach your target audience</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <a href="#pricing" className="text-white/80 hover:text-white transition-colors font-sans text-sm">
              Pricing
            </a>
            <a href="#auditors" className="text-white/80 hover:text-white transition-colors font-sans text-sm">
              For auditors
            </a>
            <a href="#blog" className="text-white/80 hover:text-white transition-colors font-sans text-sm">
              Blog
            </a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors font-sans text-sm">
              About us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#pricing" className="block text-white/80 hover:text-white transition-colors font-sans text-sm">
              Pricing
            </a>
            <a href="#auditors" className="block text-white/80 hover:text-white transition-colors font-sans text-sm">
              For auditors
            </a>
            <a href="#blog" className="block text-white/80 hover:text-white transition-colors font-sans text-sm">
              Blog
            </a>
            <a href="#about" className="block text-white/80 hover:text-white transition-colors font-sans text-sm">
              About us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
