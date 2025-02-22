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
    <div className="flex flex-col md:flex-row table_cont">
      {/* Left Section */}
      <div className="relative flex-1 bg-white flex items-center justify-center p-4 md:p-0">
        <motion.section
          className="relative block md:flex items-center justify-center h-full w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            variants={fadeInUpVariants}
            className="glassy-box1  md:p-8 rounded-lg text-center"
          >
            <h1
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-[#e07e90]"
              variants={fadeInUpVariants}
            >
              WANT TO BOOK A TABLE?
            </h1>

            <motion.div variants={fadeInUpVariants} className="mt-4 sm:mt-6">
              <motion.button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#e07e90] text-sm sm:text-base md:text-lg font-semibold text-white rounded-full border border-[#e07e90] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 relative mt-4"
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
      <div className="flex-1">
        <video
          src={newspaper}
          className="w-full h-[40rem] md:h-screen object-cover"
          autoPlay
          muted
          loop
        ></video>
      </div>
    </div>
  );
};

export default TableReservation;
