import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import connectimusLogo from "@/assets/connectimus-o-logo.png";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navBgColor, setNavBgColor] = useState('rgba(31, 41, 55, 0.95)'); // Default dark navy with opacity
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

  // Detect scroll position and extract exact section background colors (ignore cards)
  useEffect(() => {
    const handleScroll = () => {
      const navbarHeight = 80;
      const scrollPosition = window.scrollY + navbarHeight;
      
      // Get all section elements (these contain the background colors we want)
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        // Check if navbar is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          // Get the computed style directly from the section (not its children)
          const computedStyle = window.getComputedStyle(section);
          let bgColor = computedStyle.backgroundColor;
          
          // If transparent, check for gradient background
          if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            const bgImage = computedStyle.backgroundImage;
            if (bgImage && bgImage !== 'none' && bgImage.includes('gradient')) {
              // Extract first color from gradient
              const colorMatch = bgImage.match(/rgba?\([^)]+\)/);
              if (colorMatch) {
                bgColor = colorMatch[0];
              }
            }
          }
          
          // Also check the parent container if section is still transparent
          if ((bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') && section.parentElement) {
            const parentStyle = window.getComputedStyle(section.parentElement);
            const parentBg = parentStyle.backgroundColor;
            if (parentBg && parentBg !== 'rgba(0, 0, 0, 0)' && parentBg !== 'transparent') {
              bgColor = parentBg;
            }
          }
          
          // Extract RGB values and set colors
          const rgbMatch = bgColor.match(/\d+/g);
          if (rgbMatch && rgbMatch.length >= 3) {
            const [r, g, b] = rgbMatch.map(Number);
            setNavBgColor(`rgba(${r}, ${g}, ${b}, 0.95)`);
            setTextColor(getContrastColor(`rgb(${r}, ${g}, ${b})`));
          }
        }
      });
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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ease-in-out shadow-sm"
      style={{ 
        backgroundColor: navBgColor,
        borderBottomColor: borderColor,
        minHeight: '64px',
      }}
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:pl-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 sm:gap-1.5 hover:opacity-80 transition-opacity">
            <img 
              src={connectimusLogo} 
              alt="Connectimus O" 
              className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 xl:h-18 xl:w-18 2xl:h-20 2xl:w-20 object-contain"
              style={{ filter: 'contrast(1.1) saturate(1.1)' }}
            />
            <div className="hidden sm:block">
              <div 
                className="font-brand text-lg sm:text-xl lg:text-[22px] xl:text-2xl 2xl:text-3xl font-semibold tracking-tight transition-all duration-300"
                style={{ color: textColor }}
              >
                Connectimus
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="transition-all duration-300 font-sans text-sm xl:text-base 2xl:text-lg flex items-center gap-1 opacity-80 hover:opacity-100"
                style={{ color: textColor }}
              >
                Solutions
                <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5 transition-transform duration-300" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
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
                  <Link 
                    to="/ground-intelligence" 
                    className="block px-4 py-3 transition-colors duration-300 border-b"
                    style={{ 
                      color: textColor,
                      borderBottomColor: borderColor 
                    }}
                  >
                    <div className="font-semibold">Ground Intelligence</div>
                    <div className="text-xs opacity-60 mt-0.5">On-site supplier audits</div>
                  </Link>
                  <Link 
                    to="/be-found" 
                    className="block px-4 py-3 transition-colors duration-300"
                    style={{ color: textColor }}
                  >
                    <div className="font-semibold">Be found</div>
                    <div className="text-xs opacity-60 mt-0.5">Reach your target audience</div>
                  </Link>
                </div>
              )}
            </div>

            <a 
              href="#pricing" 
              className="transition-all duration-300 font-sans text-sm xl:text-base 2xl:text-lg opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              Pricing
            </a>
            <Link 
              to="/auditors" 
              className="transition-all duration-300 font-sans text-sm xl:text-base 2xl:text-lg opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              For auditors
            </Link>
            <a 
              href="#blog" 
              className="transition-all duration-300 font-sans text-sm xl:text-base 2xl:text-lg opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              Blog
            </a>
            <Link 
              to="/about-us" 
              className="transition-all duration-300 font-sans text-sm xl:text-base 2xl:text-lg opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              About us
            </Link>
            <Link to="/auth">
              <Button 
                variant="outline" 
                className="font-sans text-xs sm:text-sm px-4 lg:px-6 py-2 transition-all duration-300 hover:opacity-90 bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-100 rounded-full shadow-md hover:scale-105"
              >
                Admin Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
            style={{ color: textColor }}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 sm:space-y-4 animate-fade-in">
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
              <Link 
                to="/ground-intelligence" 
                className="block pl-4 transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
                style={{ color: textColor }}
              >
                Ground Intelligence
              </Link>
              <Link 
                to="/be-found" 
                className="block pl-4 transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
                style={{ color: textColor }}
              >
                Be found
              </Link>
            </div>
            
            <a 
              href="#pricing" 
              className="block transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              Pricing
            </a>
            <Link 
              to="/auditors" 
              className="block transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              For auditors
            </Link>
            <a 
              href="#blog" 
              className="block transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              Blog
            </a>
            <Link 
              to="/about-us" 
              className="block transition-all duration-300 font-sans text-sm opacity-80 hover:opacity-100"
              style={{ color: textColor }}
            >
              About us
            </Link>
            <Link to="/auth" className="block">
              <Button 
                variant="outline" 
                className="w-full font-sans text-sm py-3 transition-all duration-300 hover:opacity-90 bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-100 rounded-full shadow-md"
              >
                Admin Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
