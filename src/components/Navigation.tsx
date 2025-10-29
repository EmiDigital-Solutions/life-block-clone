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
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <div className="text-white font-sans text-sm font-light">Architect</div>
              <div className="text-white font-serif text-lg font-semibold -mt-1">Nicolai</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-white/80 hover:text-white transition-colors font-sans text-sm">
              Services
            </a>
            <a href="#projects" className="text-white/80 hover:text-white transition-colors font-sans text-sm">
              Projects
            </a>
            <a href="#faq" className="text-white/80 hover:text-white transition-colors font-sans text-sm">
              FAQ
            </a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors font-sans text-sm">
              About
            </a>
            <Button 
              variant="outline" 
              className="bg-white text-navy-deep hover:bg-white/90 border-white font-sans text-sm px-6"
            >
              Estimate project
            </Button>
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
            <a href="#services" className="block text-white/80 hover:text-white transition-colors font-sans text-sm">
              Services
            </a>
            <a href="#projects" className="block text-white/80 hover:text-white transition-colors font-sans text-sm">
              Projects
            </a>
            <a href="#faq" className="block text-white/80 hover:text-white transition-colors font-sans text-sm">
              FAQ
            </a>
            <a href="#about" className="block text-white/80 hover:text-white transition-colors font-sans text-sm">
              About
            </a>
            <Button 
              variant="outline" 
              className="w-full bg-white text-navy-deep hover:bg-white/90 border-white font-sans text-sm"
            >
              Estimate project
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
