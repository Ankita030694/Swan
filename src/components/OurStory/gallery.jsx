import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import insta from "../../assets/instabg.png";

const BoTaiGallery = () => {
  useEffect(() => {
    const scriptId = 'elfsight-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.3 },
    },
  };

  return (
    <motion.div
      className="w-full min-h-[500px] p-6 flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${insta})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      {/* Responsive Wrapper for Elfsight Widget */}
      <div className="relative z-10 w-full max-w-[90%] md:max-w-[90%] lg:max-w-[100%]">
        <div className="elfsight-app-4d7ca820-d3ff-43ef-9384-774a5ade1d5c" data-elfsight-app-lazy></div>
      </div>
    </motion.div>
  );
};

export default BoTaiGallery;
