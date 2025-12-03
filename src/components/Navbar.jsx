import { Link, useLocation } from "react-router-dom";
<<<<<<< HEAD
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
=======

const Navbar = () => {
  const { pathname } = useLocation();
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280

  const links = [
    { to: "/", label: "Home" },
    { to: "/udemy", label: "Udemy" },
    { to: "/linkedin", label: "LinkedIn" },
<<<<<<< HEAD
    { to: "/coursera", label: "Coursera" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="bg-background/95 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-foreground hover:text-primary transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            HonorInk
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent hover:text-accent-foreground text-foreground ${
                      pathname === link.to
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : ""
                    }`}
                    aria-current={pathname === link.to ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    pathname === link.to
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  aria-current={pathname === link.to ? "page" : undefined}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
=======
  ];

  return (
    <nav
      className="flex justify-center items-center py-4 px-6 bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg sticky top-0 z-50"
      aria-label="Main navigation"
    >
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-700 text-white ${
                pathname === link.to ? "bg-gradient-to-r from-blue-700 to-purple-700" : ""
              }`}
              aria-current={pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
>>>>>>> e501412cee8a8d731fef59835af1ee644c96d280
    </nav>
  );
};

export default Navbar;
