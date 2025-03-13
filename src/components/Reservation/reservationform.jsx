import React, { useState, useEffect } from "react";
import FirestoreService from "../../services/firestore-service";
import reserve from "../../assets/bg.png";
import loadingAnimation from "../../assets/loader-old.json";
import Lottie from "lottie-react";
import "./reservation.css";
import { useNavigate } from "react-router-dom";
import reservationbg from "../../assets/reservationbg.jpg";

const ReservationForm = () => {
  const navigate = useNavigate();
  const [outlets, setOutlets] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  // Consolidated form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "",
    date: today,
    timeSlot: "",
    timing: "",
    countryCode: "+91 (India)",
  });

  const [errors, setErrors] = useState({});

  // Add new state to track if timing type is selected
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  useEffect(() => {
    getOutlets();
  }, []);

  // Reset time slot when date changes, especially for March 14th
  useEffect(() => {
    if (formData.date && formData.timing) {
      // Reset time slot when date changes
      handleInputChange("timeSlot", "");
      // If the date has changed, reapply the timing filter
      filterTimeSlots(formData.timing, true);
    }
  }, [formData.date]);

  // Helper function to validate a phone number in various formats.
  // It removes non-digit characters and then checks the digit count.
  const isValidPhoneNumber = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 6 && digits.length <= 15;
  };

  // Converts a time like "8:00 PM" to 24-hour format
  const parseTime = (time) => {
    const [hourMinute, period] = time.split(" ");
    const [hour, minute] = hourMinute.split(":").map(Number);
    if (period === "PM" && hour !== 12) {
      return hour + 12;
    } else if (period === "AM" && hour === 12) {
      return 0;
    }
    return hour;
  };

  // Check if the selected date is March 14th, 2025
  const isMarch14th = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear() === 2025 && date.getMonth() === 2 && date.getDate() === 14;
  };

  // Filter time slots based on type (lunch or dinner) and check for March 14th
  const filterTimeSlots = (slotType, keepTimingSelection = false) => {
    if (!selectedOutlet) return;
    
    let filteredSlots = selectedOutlet.timeSlots;

    // Special case for March 14th, 2025 - only show slots after 6 PM
    if (isMarch14th(formData.date)) {
      filteredSlots = filteredSlots.filter(slot => {
        const hour = parseTime(slot);
        return hour >= 18; // Only show slots from 6 PM onwards
      });
      
      // If it's March 14th and user selected lunch, automatically switch to dinner
      if (slotType === "lunch") {
        slotType = "dinner";
      }
    } else {
      // Normal filtering for other days
      filteredSlots = filteredSlots.filter(slot => {
        const hour = parseTime(slot);
        return slotType === "lunch"
          ? hour >= 11 && hour < 18
          : hour >= 18 && hour < 24;
      });
    }

    // Sort the time slots
    filteredSlots.sort((a, b) => parseTime(a) - parseTime(b));
    
    setTimeSlots(filteredSlots);
    
    // Only update the timing if we're not keeping the current selection
    if (!keepTimingSelection) {
      handleInputChange("timing", slotType);
    }
    
    // Reset selected time slot when filtering changes available options
    handleInputChange("timeSlot", "");
    
    // Show time slots after selecting timing
    setShowTimeSlots(true);
  };

  const handleCounter = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    if (value >= 1 && value <= 150) {
      handleInputChange("persons", value);
    } else if (value < 1) {
      handleInputChange("persons", 1);
    } else if (value > 150) {
      handleInputChange("persons", 150);
    }
  };

  const increment = () => {
    const currentPersons = parseInt(formData.persons) || 0;
    if (currentPersons < 150) {
      handleInputChange("persons", currentPersons + 1);
    }
  };

  const decrement = () => {
    const currentPersons = parseInt(formData.persons) || 0;
    if (currentPersons > 1) {
      handleInputChange("persons", currentPersons - 1);
    }
  };

  async function getOutlets() {
    const outletsData = await FirestoreService.getAll("Constraints");
    setOutlets(outletsData);
    setLoading(false);
    if (outletsData.length > 0) {
      const sortedTimeSlots = outletsData[0].timeSlots.sort((a, b) => {
        return parseTime(a) - parseTime(b);
      });
      setSelectedOutlet(outletsData[0]);
      setTimeSlots(sortedTimeSlots);
    }
  }

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate phone number using our helper
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Please Enter A Valid Phone Number";
    }

    if (!selectedOutlet) {
      newErrors.outlet = "Please select an outlet";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.timing) {
      newErrors.timing = "Please select lunch or dinner time";
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = "Please select a time slot";
    }

    if (!formData.persons || formData.persons === "" || formData.persons <= 0) {
      newErrors.persons = "Please enter the number of people";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate phone on blur rather than on every change
  const validatePhone = () => {
    if (!formData.phone.trim()) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
    } else if (!isValidPhoneNumber(formData.phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please Enter A Valid Phone Number",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const reservation = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        persons: parseInt(formData.persons),
        outlet: {
          title: selectedOutlet.outlet,
          id: selectedOutlet.id,
        },
        timeSlot: formData.timeSlot,
        date: formData.date,
        timing: formData.timing,
        createdAt: Date.now(),
        countryCode: formData.countryCode,
      };

      await FirestoreService.add("Reservations", reservation);
      navigate("/thanks");

      // Reset form fields (except outlet)
      setFormData({
        ...formData,
        name: "",
        email: "",
        phone: "",
        persons: "",
        date: today,
        timeSlot: "",
        timing: "",
      });
    } catch (error) {
      alert(
        "An error occurred while submitting your reservation. Please try again."
      );
    }
    setLoading(false);
  };

  // Update formData and clear any error for the field on change.
  // Note: No live validation for phone here.
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const containerStyle = {
    backgroundImage: `url('${reservationbg}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };

  // Determine if we should disable the lunch button (for March 14th)
  const isLunchDisabled = isMarch14th(formData.date);

  return (
    <div
      style={containerStyle} 
      className="flex items-center justify-center w-full py-8 h-auto px-2"
    >
      <div
        className="w-full max-w-5xl rounded-lg shadow-lg p-8 mt-24 border-[#758b6b] border-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            BOOK YOUR TABLE NOW
          </h2>
          {isMarch14th(formData.date) && (
            <p className="text-white mt-2 bg-red-600 p-2 rounded">
              Note: On March 14th, 2025, the restaurant opens only after 6 PM.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow alphabets and spaces
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  handleInputChange("name", value);
                }
              }}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.name ? "border-red-500 border" : "border-gray-100"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.email ? "border-red-500 border" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone Number with Country Code */}
          <div className="space-y-2">
            <div className="col-md-12 w-full flex">
              <div className="flex-1 pr-2">
                <select
                  value={formData.countryCode || "+91"}
                  onChange={(e) => {
                    const selectedCode = e.target.value;
                    handleInputChange("countryCode", selectedCode);
                  }}
                  className="w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 border-gray-300"
                >
                  <option value="+91 (India)">+91 India</option>
                  <option value="+1 (USA)">+1 USA</option>
                  {/* Country code options remain the same */}
                  {/* Other country codes... */}
                </select>
              </div>
              <div className="flex-1 pl-2">
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    handleInputChange("phone", numericValue);
                  }}
                  onBlur={validatePhone}
                  className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                    errors.phone ? "border-red-500 border" : "border-gray-300"
                  }`}
                  minLength={10}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Outlet Selection and Persons Counter */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <select
                value={selectedOutlet?.id || ""}
                onChange={(e) => {
                  const outlet = outlets.find((o) => o.id === e.target.value);
                  setSelectedOutlet(outlet);
                  setTimeSlots(outlet.timeSlots);
                  handleInputChange("timeSlot", "");
                  handleInputChange("timing", "");
                  setShowTimeSlots(false);
                }}
                className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                  errors.outlet ? "border-red-500 border" : "border-gray-300"
                }`}
              >
                <option value="">Select outlet</option>
                {outlets.map((outlet) => (
                  <option key={outlet.id} value={outlet.id}>
                    {outlet.outlet}
                  </option>
                ))}
              </select>
              {errors.outlet && (
                <p className="text-red-500 text-sm">{errors.outlet}</p>
              )}
            </div>

            <div className="space-y-2 text-white">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={decrement}
                  className="px-2 py-2 bg-gray-200 rounded-md focus:outline-none"
                >
                  -
                </button>
                <input
                  type="number"
                  value={formData.persons}
                  onChange={handleCounter}
                  className={`w-full px-4 py-2 border-gray-300 rounded-md text-center outline-none focus:ring-2 focus:ring-orange-300 ${
                    errors.persons ? "border-red-500 pl-4" : ""
                  }`}
                  placeholder="Pax"
                />
                <button
                  type="button"
                  onClick={increment}
                  className="px-2 py-2 bg-gray-200 rounded-md focus:outline-none"
                >
                  +
                </button>
              </div>
              {errors.persons && (
                <p className="text-red-500 text-sm ml-4">{errors.persons}</p>
              )}
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <input
              type="date"
              placeholder="DD-MM-YYYY"
              value={formData.date}
              min={today}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className={`w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-orange-300 ${
                errors.date ? "border-red-500 border" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date}</p>
            )}
          </div>

          {/* Time Slot Filtering Buttons */}
          <div className="flex justify-evenly">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => filterTimeSlots("lunch")}
                disabled={isLunchDisabled}
                className={`p-2 rounded-md transition-colors duration-200 md:w-48 ${
                  formData.timing === "lunch"
                    ? "bg-[#758b6b] font-semibold text-white"
                    : isLunchDisabled
                    ? "bg-gray-400 cursor-not-allowed opacity-50"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                Lunch Time
              </button>
              {isLunchDisabled && (
                <p className="text-[#FF5733] text-lg text-center">Not available on Mar 14</p>
              )}
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => filterTimeSlots("dinner")}
                className={`p-2 rounded-md transition-colors duration-200 md:w-48 ${
                  formData.timing === "dinner"
                    ? "bg-[#758b6b] font-semibold text-white"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                Dinner Time
              </button>
            </div>
          </div>
          {errors.timing && (
            <p className="text-red-500 text-sm text-center">{errors.timing}</p>
          )}

          {/* Time Slot Selection */}
          {showTimeSlots && (
            <div className="space-y-2 align items-center">
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleInputChange("timeSlot", slot)}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      formData.timeSlot === slot
                        ? "bg-[#758b6b] font-semibold text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.timeSlot && (
                <p className="text-red-500 text-sm">{errors.timeSlot}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#758b6b] text-white hover:bg-white font-semibold hover:text-[#758b6b] py-3 rounded-lg transition-colors duration-200 disabled:bg-orange-300"
          >
            {loading ? "Please Wait .." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;