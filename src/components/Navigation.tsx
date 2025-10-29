import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const solutions = [
    {
      title: "Search Companies",
      description: "Find relevant suppliers",
    },
    {
      title: "Ground Intelligence",
      description: "Qualify suppliers on-site",
    },
    {
      title: "Be found",
      description: "Reach your target audience",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-white">
              YVOO
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button className="flex items-center gap-1 text-white hover:text-purple-400 transition-colors">
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isSolutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-[#0A0A0A] border border-white/10 rounded-lg shadow-xl overflow-hidden">
                  {solutions.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-6 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-purple-400 mt-1">›</span>
                        <div>
                          <div className="text-white font-medium">{item.title}</div>
                          <div className="text-gray-400 text-sm mt-1">{item.description}</div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="text-white hover:text-purple-400 transition-colors">
              Pricing
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition-colors">
              For auditors
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition-colors">
              For supplier
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition-colors">
              Blog
            </a>
            <a href="#" className="text-white hover:text-purple-400 transition-colors">
              Industries
            </a>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="flex items-center gap-1 text-white hover:text-purple-400 transition-colors">
              EN
              <ChevronDown className="w-4 h-4" />
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
              Sign in
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-white hover:text-purple-400 transition-colors">
                Solutions
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors">
                Pricing
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors">
                For auditors
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors">
                For supplier
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors">
                Blog
              </a>
              <a href="#" className="text-white hover:text-purple-400 transition-colors">
                Industries
              </a>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-full mt-4">
                Sign in
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
