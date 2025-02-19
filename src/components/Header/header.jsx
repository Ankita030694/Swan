import React, { useState, useEffect } from "react";
import "./header.css";
import bannervid from "../../assets/bannervid.mp4";

const Header = () => {

  return (
    <div className="relative h-screen">
      <video
        src={bannervid}
        className="w-full h-screen object-cover"
        autoPlay
        muted
      ></video>
    </div>
  );
};

export default Header;
