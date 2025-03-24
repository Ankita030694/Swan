import React, { useState, useEffect } from 'react';
import logo from '../../assets/logos/8.png'
import { Link, useNavigate } from 'react-router-dom';
const AdminNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navi = useNavigate();

  const navItems = [
    { name: "CONTACT", path: "/admin/contact" },
    { name: "RESERVATION", path: "/admin/reservation" },
    { name: "REVIEWS", path: "/admin/reviews" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const logOut = () => {
    // Implement logout logic here
    navi('/login');
    console.log('Logged out');
  };
  return (
    <div className="relative">
      {/* Main AdminNavbar */}
      <nav className={`fixed h-auto md:h-28 w-full left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#758b6b] shadow-md' : 'bg-[#758b6b]'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-0">
            {/* Logo */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-8 md:w-28 md:h-22"
              />
              {/* Mobile menu button */}
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-md text-gray-100 hover:text-gray-200"
              >
                {isSidebarOpen ? (
                  <span className="text-2xl">✖</span>
                ) : (
                  <span className="text-2xl">☰</span>
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 p-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isScrolled ? 'text-white hover:text-white' : 'text-white hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to={'/admin/add/outlet'} className="px-4 py-2 bg-orange-200 text-brown-200 font-medium rounded-lg hover:bg-orange-300 transition-colors">
                Outlets
              </Link>
              <button onClick={logOut} className="px-4 py-2 bg-orange-200 text-brown-200 font-medium rounded-lg hover:bg-orange-300 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#758b6b] shadow-xl flex flex-col">
          <div className="flex-1 pt-20 px-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block py-3 text-base font-medium text-dark hover:bg-[#647a5a] rounded-md px-4 transition-colors"
                onClick={toggleSidebar}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-6 space-y-4 px-4">
              <Link 
                to="/admin/add/outlet"
                className="block w-full px-4 py-2 bg-orange-200 text-brown-200 rounded-lg text-center hover:bg-orange-300 transition-colors"
                onClick={toggleSidebar}
              >
                Outlets
              </Link>
              <button 
                onClick={() => {
                  toggleSidebar();
                  logOut();
                }} 
                className="w-full px-4 py-2 bg-orange-200 text-brown-200 rounded-lg hover:bg-orange-300 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;