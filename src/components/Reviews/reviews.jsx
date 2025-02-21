import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../../configs/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import review2 from "../../assets/2.png";

const cardAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Function to render stars based on rating
const renderStars = (rating) => {
  const stars = [];
  const roundedRating = parseFloat(rating);

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }
  return stars;
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviewsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(reviewsList);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (!isPaused && reviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % reviews.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isPaused, reviews.length]);

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#e07e90] mb-6">What People Say About Us?</h2>
        
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">No reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Left Image Section (50%) */}
            <motion.div 
              initial={{ x: -100, opacity: 0, rotateY: -30 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
              className="flex justify-center"
            >
              <img 
                src={review2} 
                alt="Review Image" 
                className="shadow-xl max-w-full sm:w-80 md:w-full rounded-lg"
              />
            </motion.div>

            {/* Right Review Section (50%) */}
            <motion.div 
              key={reviews[currentPage].id}
              initial={cardAnimation.initial}
              whileInView={cardAnimation.whileInView}
              viewport={{ once: true }}
              transition={cardAnimation.transition}
              className="border-2 border-[#e07e90] bg-white p-6 rounded-lg shadow-lg"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <p className="text-lg font-semibold mb-2 text-black">"{reviews[currentPage].comment}"</p>
              <div className="flex items-center gap-1 mb-2">{renderStars(reviews[currentPage].rating)}</div>
              <p className="text-sm font-light text-black">- {reviews[currentPage].name}</p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
