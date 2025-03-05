import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../configs/firebase';
import AdminNavbar from '../../../components/Navbar/navbarAdmin';

const ReviewDetails = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, 'reviews');
        const reviewsSnapshot = await getDocs(reviewsCollection);
        const reviewsList = reviewsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Fetched reviews:', reviewsList);
        setReviews(reviewsList);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <>
      <AdminNavbar />
      <main className="w-full min-h-screen bg-[#ffffff] px-2 sm:px-6 pb-10 pt-52">
        <div className="container mx-auto">
          <div className="bg-[#758b6b] shadow-md rounded-lg overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="min-w-full bg-[#758b6b] table-auto">
                <thead className="bg-gray-300 text-gray-600 uppercase text-xs sm:text-sm leading-normal border-b">
                  <tr>
                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Name</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left sm:table-cell">Email</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left md:table-cell">Mobile</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Comment</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Rating</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left lg:table-cell">Anniversary</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left lg:table-cell">DOB</th>
                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-left md:table-cell">Created At</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-xs sm:text-sm font-light bg-[#ffffff]">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <tr
                        key={review.id}
                        className="border-b border-gray-200 hover:bg-[#758b6b] hover:text-[#ffffff] transition-colors duration-200"
                      >
                        <td className="py-2 px-3 sm:py-3 sm:px-6 text-left whitespace-nowrap">
                          {review.name || 'N/A'}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-6 text-left sm:table-cell">
                          {review.email || 'N/A'}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-6 text-left md:table-cell">
                          {review.mobile || 'N/A'}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                          <div className="max-w-[150px] sm:max-w-[200px] truncate">
                            {review.comment || 'N/A'}
                          </div>
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                          {review.rating || 'N/A'}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-6 text-left lg:table-cell">
                          {review.anniversary || 'N/A'}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-6 text-left lg:table-cell">
                          {review.dob || 'N/A'}
                        </td>
                        <td className="py-2 px-3 sm:py-3 sm:px-6 text-left md:table-cell">
                          {review.createdAt
                            ? new Date(review.createdAt.seconds * 1000).toLocaleString()
                            : 'N/A'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-3 px-6 text-center text-gray-500"
                      >
                        No reviews found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReviewDetails;
