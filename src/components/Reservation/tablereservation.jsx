import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import newspaper from "../../assets/newspaper1.mp4";

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
    <div className="w-full bg-[#fae6e7] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariants}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#e07e90] mb-8">
            WANT TO BOOK A TABLE?
          </h2>

          <motion.div className="mt-8">
            <Link to="/reservation">
              <motion.button
                className="px-8 py-4 bg-[#e07e90] text-lg font-semibold text-white rounded-full hover:bg-[#c96476] transition-colors duration-300 shadow-lg"
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
