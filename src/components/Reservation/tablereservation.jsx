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
    <div className="row table_cont">
      {/* Left Section */}
      <div className="relative col-md-6 bg-white flex items-center justify-center">
        <motion.section
          className="relative flex items-center justify-center h-full w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}  
        >
          {/* Glassy Effect Box */}
          <div
            variants={fadeInUpVariants}
            className="glassy-box1 md:p-12 rounded-lg text-center"
          >
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#e07e90]"
              variants={fadeInUpVariants}
            >
              WANT TO BOOK A TABLE?
            </h1>

            <motion.div variants={fadeInUpVariants} className="mt-6">
              <motion.button
                className="px-8 py-5 bg-[#e07e90] text-lg font-semibold text-white rounded-full border-[#e07e90]
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 relative anything"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/reservation">Book a Table Now</Link>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Right Section - Video */}
      <div className="col-md-6">
        <video
          src={newspaper}
          className="w-full h-screen object-cover"
          autoPlay
          muted
          loop
        ></video>
      </div>
    </div>
  );
};

export default TableReservation;
