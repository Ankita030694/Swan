import React, { useState, useEffect } from "react";
import "./header.css";
import bannervid from "../../assets/bannervid.mp4";
import bannerimg from "../../assets/hero5.png";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile on component mount
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkDevice();
    
    // Add resize event listener
    window.addEventListener('resize', checkDevice);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className="relative h-screen">
      {isMobile ? (
        <img 
          src={bannerimg} 
          className="w-full h-screen object-cover" 
          alt="Swan Banner" 
        />
      ) : (
        <video
          src={bannervid}
          className="w-full h-screen object-cover"
          autoPlay
          muted
          loop
        ></video>
      )}
    </div>
  );
};

export default Header;
