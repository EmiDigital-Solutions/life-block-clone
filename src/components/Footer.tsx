const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Company Info */}
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-4">YVOO</div>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-gray-700">CONNECTIMUS PROJECT d.o.o.</p>
              <p>Novotnijeva 12</p>
              <p>10000 Zagreb</p>
              <p>Croatia</p>
            </div>
          </div>

          {/* Column 2 - Solutions */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <a href="#search-companies" className="text-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  Search Companies
                </a>
              </li>
              <li>
                <a href="#become-visible" className="text-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  Become Visible
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#technology" className="text-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#team" className="text-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#careers" className="text-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  Jobs & Career
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 flex flex-wrap items-center justify-center gap-2">
              <a href="#imprint" className="hover:text-gray-700 transition-colors">Imprint</a>
              <span>•</span>
              <a href="#privacy" className="hover:text-gray-700 transition-colors">Privacy</a>
              <span>•</span>
              <a href="#cookies" className="hover:text-gray-700 transition-colors">Cookies</a>
              <span>•</span>
              <a href="#terms" className="hover:text-gray-700 transition-colors">Terms of use</a>
            </div>
            <div className="text-xs text-gray-500">
              © 2025 CONNECTIMUS PROJECT d.o.o. • Croatia
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
