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

  const navItems = [
    { name: "ABOUT", path: "/about" },
    // { name: "RESERVATION", path: "/reservation" },
    { name: "CONTACT", path: "/contact" },
    { name: "MENU", path: pdf, newTab: true },
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

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav
        className={`fixed h-21 left-0 right-0 z-50 transition-all duration-300 bg-white` }
      >
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  target={item.newTab ? "_blank" : ""}
                  rel={item.newTab ? "noopener noreferrer" : ""}
                  className={`text-md font-medium transition-colors duration-300 py-2 px-4 rounded-lg ${
                    isScrolled
                      ? "text-dark hover:text-[#000000]"
                      : "text-dark font-medium hover:text-[#000000]"
                  }`}
                >
                  {item.name}
                </a>
              ))}
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
                href="tel:+919870587770"
                className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                  isScrolled
                    ? "px-6 font-medium border-2 rounded-full border-[#e07e90] text-black hover:bg-[#e07e90] hover:text-white "
                    : "px-6 border-2 border-[#e07e90] border-[#000000] text-black font-medium hover:bg-[#e07e90] hover:text-white rounded-full"
                }`}
              >
                Call Us
              </a>
              <Link
                to={"/reservation"}
                className="px-4 py-2 bg-[#e07e90] font-medium rounded-lg text-black "
                style={{
                  transition: "background-color 0.3s ease, border 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.borderColor = "#ffffff"; // Add black border
                  e.target.style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#e07e90"; // Reset background
                  e.target.style.borderColor = "#ffffff"; // Reset border
                  e.target.style.color = "#000000";
                }}
              >
                Reservation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-400 hover:border-orange-100 hover:bg-brown"
            >
              {isSidebarOpen ? (
                <FaX color="CDA177" className="text-2xl" />
              ) : (
                <FaBars color="CDA177" className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-30 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={toggleSidebar}
        ></div>
        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-brown-100 shadow-xl flex flex-col">
          <div className="flex-1 pt-32 px-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="block py-3 text-base font-medium text-brown hover:bg-orange-100 rounded-md"
                onClick={toggleSidebar}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-6 space-y-4">
              <a href="tel:+919870587770">
                <button className="w-full px-4 py-2 bg-brown text-white rounded-lg hover:bg-brown-400">
                  Call Us
                </button>
              </a>
              <div></div>
              <a href="/reservation">
                <button className="w-full px-4 py-2 bg-brown text-white rounded-lg">
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
