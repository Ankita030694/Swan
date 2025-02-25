import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import newspaper from "../../assets/newspaper1.mp4";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import imagebg from "../../assets/imagebg.png";
const TableReservation = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="w-full py-16 relative">
      <div className="max-w-full mx-auto px-4 bg-white rounded-lg shadow-[0_4px_20px_rgba(233,114,132,0.3)] p-8 relative">
        <img 
          src={image1} 
          alt="Decorative left" 
          className="absolute -left-1 w-40 h-40 object-contain z-10"
        />
        <img 
          src={image2} 
          alt="Decorative right" 
          className="absolute -right-1 w-40 h-40 object-contain z-10"
        />
        <motion.div
          className="text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariants}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000000] mb-8">
            WANT TO BOOK A TABLE?
          </h2>

          <motion.div className="mt-8">
            <Link to="/reservation">
              <motion.button
                className="px-8 py-4 bg-[#ffffff] text-lg font-semibold text-dark rounded-full hover:bg-[#c96476] transition-colors duration-300 shadow-lg"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Book a Table Now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TableReservation;
