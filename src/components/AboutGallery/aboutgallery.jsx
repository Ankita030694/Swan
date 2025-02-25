import React, { useState, useEffect } from "react";
import photo1 from "../../assets/Photos/1.jpg";
import photo2 from "../../assets/Photos/2.jpg";
import photo3 from "../../assets/Photos/3.jpg";
import photo4 from "../../assets/Photos/4.jpg";
import photo5 from "../../assets/Photos/5.jpg";
import photo6 from "../../assets/Photos/6.jpg";
import photo7 from "../../assets/Photos/7.jpg";
import photo8 from "../../assets/Photos/8.jpg";
import photo9 from "../../assets/Photos/9.jpg";
import photo10 from "../../assets/Photos/10.jpg";
import photo11 from "../../assets/Photos/11.jpg";
import photo12 from "../../assets/Photos/12.jpg";
import photo13 from "../../assets/Photos/13.jpg";
import photo14 from "../../assets/Photos/14.jpg";
import photo15 from "../../assets/Photos/15.jpg";
import photo16 from "../../assets/Photos/16.jpg";
import photo17 from "../../assets/Photos/17.jpg";
import photo18 from "../../assets/Photos/18.jpg";
import photo19 from "../../assets/Photos/19.jpg";
import photo20 from "../../assets/Photos/20.jpg";
import photo21 from "../../assets/Photos/21.jpg";
import photo22 from "../../assets/Photos/22.jpg";
import photo23 from "../../assets/Photos/23.jpg";
import photo24 from "../../assets/Photos/24.jpg";
import photo25 from "../../assets/Photos/25.jpg";
import photo26 from "../../assets/Photos/26.jpg";
import photo27 from "../../assets/Photos/27.jpg";
import photo28 from "../../assets/Photos/28.jpg";
import photo29 from "../../assets/Photos/29.jpg";
import photo30 from "../../assets/Photos/30.jpg";
import photo31 from "../../assets/Photos/31.jpg";
import photo32 from "../../assets/Photos/32.jpg";
import photo33 from "../../assets/Photos/33.jpg";
import photo34 from "../../assets/Photos/34.jpg";
import photo35 from "../../assets/Photos/35.jpg";
import photo36 from "../../assets/Photos/36.jpg";
import photo37 from "../../assets/Photos/37.jpg";
import photo38 from "../../assets/Photos/38.jpg";
import photo39 from "../../assets/Photos/39.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HeroSection = () => {
  return (
    <div className="bg-[#758b6b] px-4 py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base sm:text-lg text-white leading-relaxed">
              SWAN, DELHI Part of the renowned Massive Restaurants group, Bo-Tai
              is a modern Thai bar and grill that offers an exceptional dining
              experience. Known for its vibrant ambiance and innovative menu,
              Bo-Tai seamlessly blends Thai flavors with global influences.
              Whether you're savoring its exquisite cuisine or enjoying its chic
              setting, Bo-Tai is the perfect destination for those who
              appreciate culinary excellence and contemporary elegance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GallerySection = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="mb-5">
      <Carousel responsive={responsive} infinite={true}>
        <div className="about_carousel">
          <img src={photo1} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo2} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo3} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo4} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo5} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo6} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo7} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo8} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo9} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo10} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo11} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo12} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo13} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo14} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo15} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo16} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo17} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo18} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo19} alt="" />
        </div>
        <div className="about_carousel">
          <img src={photo20} alt="" />
        </div>
      </Carousel>
    </div>
  );
};

const AboutGallery = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <GallerySection />
    </div>
  );
};

export default AboutGallery;
