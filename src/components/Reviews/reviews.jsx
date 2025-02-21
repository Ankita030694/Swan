import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../../configs/firebase";
import { collection, getDocs } from "firebase/firestore";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const cardAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// Function to render stars based on rating
const renderStars = (rating) => {
  const stars = [];
  const roundedRating = parseFloat(rating); // Convert rating to number

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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviewsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewsList);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#e07e90] mb-6">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Reviews Grid */}
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center col-span-3">
              No reviews yet.
            </p>
          ) : (
            reviews.slice(0, 6).map((review) => (
              <motion.div
                key={review.id}
                initial={cardAnimation.initial}
                whileInView={cardAnimation.whileInView}
                viewport={{ once: true }}
                transition={cardAnimation.transition}
                className="border-2 border-[#e07e90] bg-white p-6 rounded-lg shadow-lg"
              >
                <p className="text-lg mb-2 text-black font-light">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-1 mb-2 text-[#e07e90]">
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm font-bold text-black">- {review.name}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
