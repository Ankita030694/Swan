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
      <main className="w-screen h-screen bg-[#ffffff] px-6 pb-10 pt-52">
        <div className="container mx-auto">
          <div className="bg-[#758b6b] shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-[#758b6b]">
              <thead className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal border-b">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Mobile</th>
                  <th className="py-3 px-6 text-left">Comment</th>
                  <th className="py-3 px-6 text-left">Rating</th>
                  <th className="py-3 px-6 text-left">Anniversary</th>
                  <th className="py-3 px-6 text-left">DOB</th>
                  <th className="py-3 px-6 text-left">Created At</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light bg-[#ffffff]">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-gray-200 hover:bg-brown hover:text-[#CFA177]"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {review.name || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {review.email || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {review.mobile || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {review.comment || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {review.rating || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {review.anniversary || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {review.dob || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left">
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
      </main>
    </>
  );
};

export default ReviewDetails;
