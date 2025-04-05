import React from "react";
import location1 from "../../assets/about/location1.png";
import location2 from "../../assets/about/location2.png";
import location3 from "../../assets/about/location3.png";
import about1 from "../../assets/about/1.jpeg";
import about2 from "../../assets/about/2.jpeg";
import about3 from "../../assets/about/3.jpeg";
import about4 from "../../assets/about/4.jpeg";
import about5 from "../../assets/about/5.jpeg";
import about6 from "../../assets/about/6.jpeg";
import about7 from "../../assets/about/7.jpeg";
import about8 from "../../assets/about/8.jpeg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LogoSlider from "../LogoSlider/logoslider";
import SwanVideo from "../../assets/Swan.mp4";

const locations = [
  {
    city: "GOA",
    image: location1,
    description: "Modern Thai bar & Grill",
    comingSoon: true,
  },
  {
    city: "DELHI",
    image: location3,
    description: "Modern Thai bar & Grill",
    comingSoon: false,
  },
  {
    city: "BANGALORE",
    image: location2,
    description: "Modern Thai bar & Grill",
    comingSoon: true,
  },
];
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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
const OurLocation = () => {
  return (
    <div className="w-full mx-auto bg-[#758b6b] m-10 align-items-center">
      {/* Header Text and Video */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 p-12 flex items-center">
          <div className="h-[400px] w-full">
            <video 
              src={SwanVideo} 
              className="w-full h-full object-cover rounded-lg shadow-lg" 
              controls
              autoPlay
              muted
              loop
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-12 flex items-center text-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
            {/* <h3 className="text-2xl font-semibold mb-4 text-[#000000]">Our Story</h3> */}
            <p className="text-lg text-white leading-relaxed text-center">
              Nestled in the heart of Mehrauli with a breathtaking view of the iconic Qutub Minar, Swan is more than just a restaurant—it's an experience. We bring together the elegance of Italian cuisine and the precision of Japanese flavors in a space that's both contemporary and soulful. At Swan, every detail matters—from our thoughtfully curated menu to our stylish interiors featuring artistic installations and open-air seating.
            </p>
            <p className="text-lg text-white leading-relaxed mt-4 text-center">
              Whether you're joining us for a romantic evening, a celebration, or a leisurely afternoon, Swan offers a perfect balance of ambiance, flavor, and hospitality. Passionate chefs, a curated bar, and impeccable service come together to create moments that linger long after your meal. Welcome to Swan—where fine dining meets timeless charm.
            </p>
          </div>
        </div>
      </div>
      <LogoSlider />

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-8 mb-10 mt-10">
        {/* {locations.map((location, index) => (
          <div
            key={index}
            className="relative rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 w-full max-w-sm"
            style={{
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              className={`relative w-full ${
                index === 2 ? '' : 'h-full'
              }`} 
              style={{ display: 'flex', height: '100%' }}
            >
              <img
                src={location.image}
                alt={`${location.city} location`}
                className={`w-full object-cover ${
                  index === 2 ? 'h-auto' : 'h-full'
                } rounded-lg`} 
              />

              {location.comingSoon && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">COMING SOON</h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))} */}
     
        
      </div>
      {/* <Carousel 
      responsive={responsive}
      infinite={true}>
          <div className="about_carousel">
            <img src={about1} alt="" />
          </div>
          <div className="about_carousel">
            <img src={about2} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about3} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about4} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about5} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about6} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about7} alt=""/>
          </div>
          <div className="about_carousel">
            <img src={about8} alt=""/>
          </div>
        </Carousel> */}
    </div>
  );
};

export default OurLocation;
