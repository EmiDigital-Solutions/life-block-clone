import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import yvooLogo from "@/assets/logo-new.svg";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50" ref={menuRef}>
      <div 
        className={`bg-white/50 backdrop-blur-2xl shadow-2xl border border-white/40 transition-all duration-300 ${
          isMenuOpen ? 'rounded-[2rem]' : 'rounded-full'
        }`}
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Main Nav Bar */}
        <div className="flex items-center gap-6 px-6 py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center justify-center px-5 py-3 hover:opacity-80 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          >
            <img 
              src={yvooLogo} 
              alt="YVOO Logo"
              className="h-10 md:h-12 w-auto object-contain"
              style={{ filter: 'brightness(0)' }}
            />
          </Link>

          {/* Hamburger Menu Button - Two lines style */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center justify-center w-14 h-14 gap-2 rounded-full hover:bg-gray-100/50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-7 h-7 text-foreground" />
            ) : (
              <>
                <span className="w-7 h-0.5 bg-foreground rounded-full" />
                <span className="w-7 h-0.5 bg-foreground rounded-full" />
              </>
            )}
          </button>

          {/* CTA Button */}
          <a
            href="https://calendly.com/yvoo/demo-yvoo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-foreground text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
          >
            Book a Call
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="px-8 pb-8 pt-4 animate-fade-in">
            <nav className="space-y-2">
              <Link 
                to="/search-suppliers" 
                className="block text-2xl md:text-3xl font-medium text-foreground/80 hover:text-foreground transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Search Suppliers
              </Link>
              <Link 
                to="/ground-intelligence" 
                className="block text-2xl md:text-3xl font-medium text-foreground/80 hover:text-foreground transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Ground Intelligence
              </Link>
              <Link 
                to="/auditors" 
                className="block text-2xl md:text-3xl font-medium text-foreground/80 hover:text-foreground transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                For Auditors
              </Link>
              <a 
                href="#pricing" 
                className="block text-2xl md:text-3xl font-medium text-foreground/80 hover:text-foreground transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <Link 
                to="/about-us" 
                className="block text-2xl md:text-3xl font-medium text-foreground/80 hover:text-foreground transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
