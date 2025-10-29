const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">YVOO</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-gray-700">CONNECTIMUS PROJECT d.o.o.</p>
              <p>Novotnijeva 12</p>
              <p>10000 Zagreb</p>
              <p>Croatia</p>
            </div>
          </div>

          {/* Column 2 - Solutions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Search Companies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Become Visible
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Jobs & Career
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-sm text-gray-500 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <a href="#" className="hover:text-gray-700 transition-colors">
                Imprint
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Privacy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Cookies
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Terms of use
              </a>
            </div>
            <p>© 2025 CONNECTIMUS PROJECT d.o.o. • Croatia</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
