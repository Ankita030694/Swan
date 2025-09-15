import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../../configs/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../assets/logo1.png";

const AddRev = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState({
    taste: 0,
    service: 0,
    hygiene: 0,
    ambience: 0,
    experience: 0,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = {
        ...data,
        ratings,
        createdAt: Timestamp.now(),
      };
      
      await addDoc(collection(db, "feedback"), formData);
      toast.success("Feedback submitted successfully!");
      reset();
      setRatings({
        taste: 0,
        service: 0,
        hygiene: 0,
        ambience: 0,
        experience: 0,
      });
    } catch (error) {
      console.error("Error adding feedback: ", error);
      toast.error("Error submitting feedback.");
    }
    setLoading(false);
  };

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="max-w-md w-full bg-[#fdfbf7] p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex justify-center mb-6">
            <h1 className="text-2xl font-bold">Feedback Form</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-2">Date no:</span>
              <input 
                type="date" 
                {...register("date")} 
                className="w-40 border rounded px-2 py-1"
                placeholder="DD/MM/YY"
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2">Table no:</span>
              <input 
                {...register("tableNo")} 
                className="w-20 border rounded px-2 py-1" 
              />
            </div>
          </div> */}

          <div className="space-y-2">
            <div className="flex flex-col">
              <label>Name:</label>
              <input
                {...register("name", { required: true })}
                className="border rounded p-1"
              />
            </div>
            
            <div className="flex flex-col">
              <label>Phone:</label>
              <input
                {...register("phone", { required: true })}
                className="border rounded p-1"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-center mb-2">Please rate us</p>
            <p className="text-sm text-center mb-4">with 5 being the highest & 1 being the lowest</p>
            
            <div className="space-y-2">
              {Object.entries({
                "Taste": "taste",
                "Service": "service",
                "Hygiene": "hygiene",
                "Ambience": "ambience",
                "Experience": "experience"
              }).map(([label, key]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="w-24">{label}</span>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="flex items-center">
                        <input
                          type="radio"
                          name={key}
                          value={value}
                          checked={ratings[key] === value}
                          onChange={() => handleRatingChange(key, value)}
                          className="mr-1"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col">
              <label>How did you hear about us?</label>
              <input
                {...register("source")}
                className="border rounded p-1"
              />
            </div>

            <div className="flex flex-col">
              <label>Additional suggestions/feedback?</label>
              <textarea
                {...register("feedback")}
                className="border rounded p-1 h-20"
              />
            </div>

            <div className="flex items-center gap-2">
              <label>Would you recommend us?</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("recommend")}
                    value="yes"
                    className="mr-1"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("recommend")}
                    value="no"
                    className="mr-1"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e07e90] text-white py-2 rounded-lg hover:bg-[#d06a7c] disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddRev; 