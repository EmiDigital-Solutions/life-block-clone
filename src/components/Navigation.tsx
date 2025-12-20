import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import yvooLogo from "@/assets/logo-new.svg";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Floating Pill Navigation - Off Menu Style */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl rounded-full px-2 py-2 shadow-lg border border-white/20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center justify-center px-4 py-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src={yvooLogo} 
              alt="YVOO Logo"
              className="h-6 w-auto object-contain"
              style={{ filter: 'brightness(0)' }}
            />
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* CTA Button */}
          <a
            href="https://calendly.com/yvoo/demo-yvoo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
          >
            Book a Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white animate-fade-in">
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          {/* Menu Content */}
          <div className="flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
            <nav className="space-y-6">
              {/* Solutions with Dropdown */}
              <div ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 text-4xl md:text-5xl lg:text-6xl font-light text-foreground hover:text-primary transition-colors"
                >
                  Solutions
                  <ChevronDown 
                    className="w-8 h-8 transition-transform duration-300" 
                    style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                  />
                </button>
                
                {isDropdownOpen && (
                  <div className="mt-4 ml-4 space-y-3 animate-fade-in">
                    <Link 
                      to="/search-suppliers" 
                      className="block text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Search Suppliers
                    </Link>
                    <Link 
                      to="/ground-intelligence" 
                      className="block text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Ground Intelligence
                    </Link>
                    <Link 
                      to="/scanpro-plus" 
                      className="block text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      ScanPro+
                    </Link>
                    <Link 
                      to="/be-found" 
                      className="block text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Be Found
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                to="/auditors" 
                className="block text-4xl md:text-5xl lg:text-6xl font-light text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                For Auditors
              </Link>

              <a 
                href="#pricing" 
                className="block text-4xl md:text-5xl lg:text-6xl font-light text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>

              <Link 
                to="/about-us" 
                className="block text-4xl md:text-5xl lg:text-6xl font-light text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>

              <a 
                href="#blog" 
                className="block text-4xl md:text-5xl lg:text-6xl font-light text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </a>
            </nav>

            {/* Bottom CTA */}
            <div className="mt-12">
              <a
                href="https://calendly.com/yvoo/demo-yvoo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-foreground text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-foreground/90 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Call
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
