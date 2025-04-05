import React from 'react';
import TableReservation from '../../components/Reservation/reservationComponent';
import OurLocation from '../../components/ourlocation/ourlocation';
import AboutGallery from '../../components/AboutGallery/aboutgallery';
import Footer from '../../components/Footer/footer';
import NavbarTwo from '../../components/Navbar/navbar2';
import LogoSlider from '../../components/LogoSlider/logoslider';
import Navbar from '../../components/Navbar/navbar';
import aboutheader from '../../assets/Swan2147.jpg';
import mobileAboutHeader from '../../assets/SwanAbout.jpeg';

const About = () => {
  return (
    <div className="relative">
      <NavbarTwo />  
      <div className="w-full bg-[#fae6e7] mt-20 pt-4 md:mt-20">
        <div className="">
          <div className="relative mt-9">
            <div className="aspect-[16/9] md:aspect-[16/9] w-full overflow-hidden">
              <div className="relative h-full w-full">
                <img
                  src={aboutheader}
                  alt="Thai dish presentation"
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                />
                {/* <img
                  src={mobileAboutHeader}
                  alt="Thai dish presentation"
                  className="block md:hidden h-full w-full object-cover object-center"
                  loading="eager"
                /> */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              </div>
            </div>
            
            {/* <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#e07e90] tracking-wider">
                ABOUT US
              </h1>
            </div> */}
          </div>
        </div>
      </div>

      <OurLocation />
      {/* <AboutGallery /> */}
      

      <Footer />
    </div>
  );
};

export default About;