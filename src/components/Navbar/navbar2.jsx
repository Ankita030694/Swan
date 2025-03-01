import React, { useState, useEffect } from "react";
import logo from "../../assets/logos/8.png";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaCross, FaHamburger } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import pdf from "../../assets/BoTai_FoodMenu.pdf";

const NavbarTwo = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "ABOUT", path: "/about" },
    // { name: "RESERVATION", path: "/reservation" },
    { name: "CONTACT", path: "/contact" },
  ];

  const menuItems = [
    { name: "MENU 1", path: pdf },
    { name: "MENU 2", path: pdf },
    { name: "MENU 3", path: pdf },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 h-21 left-0 right-0 z-[999] transition-all duration-300 bg-white`}
      >
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`text-md font-medium transition-colors duration-300 py-2 px-4 rounded-lg ${
                    isScrolled
                      ? "text-dark hover:text-[#000000]"
                      : "text-dark font-medium hover:text-[#000000]"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              {/* Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className={`text-md font-medium transition-colors duration-300 py-2 px-4 rounded-lg ${
                    isScrolled
                      ? "text-dark hover:text-[#000000]"
                      : "text-dark font-medium hover:text-[#000000]"
                  }`}
                >
                  MENU
                </button>
                {isMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-dark hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Logo */}
            <div className="flex">
              <a href="/">
                <img src={logo} alt="Logo" className="w-28 h-22" />
              </a>
            </div>
            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:+918130933899"
                className="px-4 py-2 rounded-lg transition-colors duration-300 border-2 border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-[#ffffff]"
              >
                Call Us
              </a>
              <Link
                to={"/reservation"}
                className="px-4 py-2 bg-dark border-2 font-medium rounded-lg text-white bg-[#000000] hover:bg-white hover:text-[#000000] hover:border-2 hover:border-[#000000]"
              >
                Reservation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-dark hover:text-[#ffffff] hover:bg-[#000000]"
            >
              {isSidebarOpen ? (
                <FaX color="000000" className="text-2xl" />
              ) : (
                <FaBars color="000000" className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[1000] transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={toggleSidebar}
        ></div>
        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col">
          <div className="flex-1 pt-32 px-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="block py-3 text-base font-medium text-brown rounded-md"
                onClick={toggleSidebar}
              >
                {item.name}
              </a>
            ))}
            {/* Mobile Menu Items */}
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 text-base font-medium text-brown rounded-md"
                onClick={toggleSidebar}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-6 space-y-4">
              <a href="tel:+919870587770">
                <button className="w-full px-4 py-2 bg-white text-dark rounded-lg border-2 border-[#000000]">
                  Call Us
                </button>
              </a>
              <div></div>
              <a href="/reservation">
                <button className="w-full px-4 py-2 bg-white text-dark rounded-lg border-2 border-[#000000]">
                  Reservation
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTwo;
