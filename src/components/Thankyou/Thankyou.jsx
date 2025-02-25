import React from "react";
import reserve from "../../assets/thanks.jpeg";
import NavbarTwo from "../Navbar/navbar2";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom";

const Thankyou = () => {
  const containerStyle = {
    backgroundImage: `url(${reserve})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    backgroundColor: "rgba(244, 182, 193, 0.17)", // Light tint of #e07e90
  };
  return (
    <div className="bg-black">
      <NavbarTwo />
      <div
        style={containerStyle}
        className="flex items-center justify-center w-full"
      >
        <div className="w-full max-w-2xl mx-4 bg-transparent bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-16 text-center">
          <h2 className="text-3xl font-bold text-[#000000] mb-4">
            Thank You!
          </h2>
          <p className="text-[#000000] font-medium mb-6">
            Your reservation has been successfully submitted.
          </p>
          <Link to="/reservation">
            <button
              className="bg-[#ffffff] hover:bg-[#000000] hover:text-white text-dark font-medium py-2 px-6 rounded-lg transition-colors duration-200 border-2 border-dark"
            >
              Make Another Reservation
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Thankyou;
