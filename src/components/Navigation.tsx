import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navBgColor, setNavBgColor] = useState('rgb(31, 41, 55)'); // Default dark navy
  const [textColor, setTextColor] = useState('rgb(255, 255, 255)'); // Default white
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

  // Helper function to calculate luminance and determine text color
  const getContrastColor = (rgb: string): string => {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return 'rgb(255, 255, 255)';
    
    const [r, g, b] = match.map(Number);
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark backgrounds, dark for light backgrounds
    return luminance > 0.5 ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)';
  };

  // Detect scroll position and extract exact background colors
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 80;
      
      // Get the element directly under the navbar
      const elementAtNavbar = document.elementFromPoint(window.innerWidth / 2, navbarHeight + 10);
      
      if (elementAtNavbar) {
        // Walk up the DOM tree to find the first element with a solid background
        let currentElement = elementAtNavbar;
        let foundColor = false;
        
        while (currentElement && currentElement !== document.body && !foundColor) {
          const computedStyle = window.getComputedStyle(currentElement);
          let bgColor = computedStyle.backgroundColor;
          
          // Check if we have a valid color (not transparent)
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            foundColor = true;
            
            // Extract RGB values
            const rgbMatch = bgColor.match(/\d+/g);
            if (rgbMatch && rgbMatch.length >= 3) {
              const [r, g, b] = rgbMatch.map(Number);
              setNavBgColor(`rgba(${r}, ${g}, ${b}, 0.95)`);
              setTextColor(getContrastColor(`rgb(${r}, ${g}, ${b})`));
            }
          }
          
          // Also check for gradient backgrounds
          if (!foundColor) {
            const bgImage = computedStyle.backgroundImage;
            if (bgImage && bgImage !== 'none' && bgImage.includes('gradient')) {
              // Extract first color from gradient
              const colorMatch = bgImage.match(/rgba?\([^)]+\)/);
              if (colorMatch) {
                const color = colorMatch[0];
                const rgbMatch = color.match(/\d+/g);
                if (rgbMatch && rgbMatch.length >= 3) {
                  const [r, g, b] = rgbMatch.map(Number);
                  setNavBgColor(`rgba(${r}, ${g}, ${b}, 0.95)`);
                  setTextColor(getContrastColor(`rgb(${r}, ${g}, ${b})`));
                  foundColor = true;
                }
              }
            }
          }
          
          currentElement = currentElement.parentElement as HTMLElement;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    // Also call after a short delay to ensure styles are loaded
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we're on a light or dark background
  const isLightBg = textColor === 'rgb(31, 41, 55)';
  
  // Dynamic border color based on background
  const borderColor = isLightBg ? 'rgba(31, 41, 55, 0.1)' : 'rgba(255, 255, 255, 0.1)';

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-all duration-300 ease-in-out"
      style={{ 
        backgroundColor: navBgColor,
        borderBottomColor: borderColor,
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ backgroundColor: isLightBg ? 'rgba(31, 41, 55, 0.1)' : 'rgba(255, 255, 255, 0.1)' }}
            >
              <div 
                className="w-6 h-6 border-2 rounded-full transition-all duration-300"
                style={{ borderColor: textColor }}
              ></div>
            </div>
            <div>
              <div 
                className="font-sans text-lg font-bold transition-all duration-300"
                style={{ color: textColor }}
              >
                YVOO
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="transition-all duration-300 font-sans text-sm flex items-center gap-1 opacity-80 hover:opacity-100"
                style={{ color: textColor }}
              >
                Solutions
                <ChevronDown className="w-4 h-4 transition-transform duration-300" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              
              {isDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 rounded-lg shadow-xl border overflow-hidden transition-all duration-300 animate-fade-in"
                  style={{ 
                    backgroundColor: isLightBg ? 'rgb(255, 255, 255)' : 'rgb(31, 41, 55)',
                    borderColor: borderColor 
                  }}
                >
                  <a 
                    href="#search-suppliers" 
                    className="block px-4 py-3 transition-colors duration-300 border-b"
                    style={{ 
                      color: textColor,
                      borderBottomColor: borderColor 
                    }}
                  >
                    <div className="font-semibold">Search Suppliers</div>
                    <div className="text-xs opacity-60 mt-0.5">Find relevant companies</div>
                  </a>
                  <a 
                    href="#ground-intelligence" 
                    className="block px-4 py-3 transition-colors duration-300 border-b"
                    style={{ 
                      color: textColor,
                      borderBottomColor: borderColor 
                    }}
                  >
                    <div className="font-semibold">Ground Intelligence</div>
                    <div className="text-xs opacity-60 mt-0.5">Qualify suppliers on-site</div>
                  </a>
                  <a 
                    href="#be-found" 
                    className="block px-4 py-3 transition-colors duration-300"
                    style={{ color: textColor }}
                  >
                    <div className="font-semibold">Be found</div>
                    <div className="text-xs opacity-60 mt-0.5">Reach your target audience</div>
                  </a>
                </div>
              )}
            </div>

            <a 
              href="#pricing" 
              className="transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              Pricing
            </a>
            <a 
              href="#auditors" 
              className="transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              For auditors
            </a>
            <a 
              href="#blog" 
              className="transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              Blog
            </a>
            <a 
              href="#about" 
              className="transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              About us
            </a>
            <Button 
              variant="outline" 
              className="font-sans text-sm px-6 transition-all duration-300 border hover:opacity-90"
              style={{
                backgroundColor: isLightBg ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
                color: isLightBg ? 'rgb(255, 255, 255)' : 'rgb(31, 41, 55)',
                borderColor: isLightBg ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
              }}
            >
              Estimate project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden transition-all duration-300"
            style={{ color: textColor }}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {/* Solutions Submenu */}
            <div className="space-y-2">
              <div 
                className="font-sans text-sm font-semibold transition-all duration-300"
                style={{ color: textColor }}
              >
                Solutions
              </div>
              <a 
                href="#search-suppliers" 
                className="block pl-4 transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
                style={{ color: textColor }}
              >
                Search Suppliers
              </a>
              <a 
                href="#ground-intelligence" 
                className="block pl-4 transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
                style={{ color: textColor }}
              >
                Ground Intelligence
              </a>
              <a 
                href="#be-found" 
                className="block pl-4 transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
                style={{ color: textColor }}
              >
                Be found
              </a>
            </div>
            
            <a 
              href="#pricing" 
              className="block transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              Pricing
            </a>
            <a 
              href="#auditors" 
              className="block transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              For auditors
            </a>
            <a 
              href="#blog" 
              className="block transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              Blog
            </a>
            <a 
              href="#about" 
              className="block transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              About us
            </a>
            <Button 
              variant="outline" 
              className="w-full font-sans text-sm transition-all duration-300 border hover:opacity-90"
              style={{
                backgroundColor: isLightBg ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
                color: isLightBg ? 'rgb(255, 255, 255)' : 'rgb(31, 41, 55)',
                borderColor: isLightBg ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
              }}
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
