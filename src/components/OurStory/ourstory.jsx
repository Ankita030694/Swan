import React from 'react';
import { motion } from 'framer-motion';
import story from '../../assets/story2.png'
import location from "../../assets/about/ourstory.jpg"
import ourstory from "../../assets/ourstory.mp4"

const OurStory = () => {
  const titleVariants = {
    hidden: { 
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const statCardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full py-16 px-8 bg-[#fae6e7] relative -m-1">
   
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 relative z-10">
        {/* Left side - Title */}
        <motion.div 
          className="md:w-1/3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
        >
          <video
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={ourstory} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Right side - Content */}
        <div className="md:w-2/3 flex flex-col gap-8 text-center">
        <h2 className="text-[#e07e90] text-5xl font-bold">
            OUR STORY
          </h2>
          {/* Description */}
          <motion.p 
            className="text-lg leading-relaxed text-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={contentVariants}
          >
           Indulge in a refined fusion of Japanese elegance and Italian comfort at Swan Restaurant. Savor exquisite sushi, delicate sashimi, and handcrafted wood-fired pizzas and pastas, perfectly complemented by artisanal cocktails and mocktails. Nestled in a sophisticated setting with impeccable service, it's the ideal retreat for a relaxed yet luxurious dining experience. All this, paired with breathtaking views of the iconic Qutub Minar, makes every visit truly unforgettable—a must for culinary enthusiasts and culture aficionados alike.
          </motion.p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {/* Outlets stat */}
            <motion.div 
              className="flex-1 min-w-[200px] rounded-2xl p-6 border-2 border-[#e07e90]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={statCardVariants}
            >
              {/* <div className="text-4xl font-bold mb-2">Handmade Syrups</div> */}
              <div className="text-xl text-center text-[#e07e90] border-[#e07e90]">Handmade Syrups</div>
            </motion.div>

            {/* Awards stat */}
            <motion.div 
              className="flex-1 min-w-[200px] rounded-2xl p-6 border-2 border-[#e07e90]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={statCardVariants}
            >
              {/* <div className="text-4xl font-bold mb-2">Live Sushi Bar</div> */}
              <div className="text-xl text-center text-[#e07e90] border-[#e07e90]" >Live Sushi Bar</div>
            </motion.div>

            {/* Additional Awards stat */}
            <motion.div 
              className="flex-1 min-w-[200px] rounded-2xl p-6 border-2 border-[#e07e90]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={statCardVariants}
            >
              {/* <div className="text-4xl font-bold mb-2">Infinity View</div> */}
              <div className="text-xl text-center text-[#e07e90] border-[#e07e90]">Infinity View</div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;