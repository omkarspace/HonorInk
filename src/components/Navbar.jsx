import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/udemy", label: "Udemy" },
    { to: "/linkedin", label: "LinkedIn" },
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
    </nav>
  );
};

export default Navbar;
