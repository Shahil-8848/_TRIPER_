import React, { useState, useEffect } from "react";
import "./Form.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChair,
  FaCreditCard,
  FaLock,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useBusContext } from "../../Context/BusContext";

const Form: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { busDetails } = useBusContext();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    seatNumbers: "",
    departureDate: "",
    from: "",
    to: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    busName: "",
    busType: "",
    rideTime: "00:00:00", // Default to a valid time
    seatPrice: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (busDetails) {
      console.log("BusContext Data:", busDetails);
      setFormData((prev) => ({
        ...prev,
        seatNumbers: busDetails.selectedSeatNumbers.join(", "),
        departureDate: busDetails.travelDate || "",
        from: busDetails.routeFrom || "",
        to: busDetails.routeTo || "",
        busName: busDetails.busName || "Unknown",
        busType: busDetails.busType || "Unknown",
        rideTime: busDetails.rideTime || "00:00:00", // Use as-is from BusHub
        seatPrice: busDetails.seatPrice || 0,
      }));
    } else if (location.state) {
      const state = location.state as any;
      console.log("Location State Data:", state);
      setFormData((prev) => ({
        ...prev,
        seatNumbers: state.selectedSeatNumbers.join(", "),
        departureDate: state.travelDate || "",
        from: state.routeFrom || "",
        to: state.routeTo || "",
        busName: state.busName || "Unknown",
        busType: state.busType || "Unknown",
        rideTime: state.rideTime || "00:00:00", // Use as-is from BusHub
        seatPrice: state.seatPrice || 0,
      }));
    }
  }, [busDetails, location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed. Errors:", errors);
      return;
    }

    setLoading(true);
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      seatNumbers: formData.seatNumbers,
      departureDate: formData.departureDate,
      fromLocation: formData.from,
      toLocation: formData.to,
      busName: formData.busName,
      busType: formData.busType,
      rideTime: formData.rideTime,
      seatPrice: formData.seatPrice,
    };
    console.log("Submitting data to backend:", payload);

    try {
      const response = await fetch("http://localhost:3000/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = { error: await response.text() };
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to reserve ticket");
      }

      console.log("Reservation successful:", result);
      alert(result.message);
      navigate("/");
    } catch (error) {
      console.error("Reservation error:", error);
      alert(`Failed to reserve ticket: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-section passenger-info">
          <h2>
            <FaUser /> Passenger Information
          </h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "error" : ""}
                placeholder="Ram Kumar"
              />
            </div>
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>
        </div>

        <div className="form-section contact-info">
          <h2>
            <FaEnvelope /> Contact Information
          </h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="ramkumar@example.com"
              />
            </div>
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-wrapper">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
                placeholder="1234567890"
              />
            </div>
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>
        </div>

        <div className="form-section trip-details">
          <h2>
            <FaMapMarkerAlt /> Trip Details
          </h2>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  id="from"
                  name="from"
                  value={formData.from}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="to">To</label>
              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  id="to"
                  name="to"
                  value={formData.to}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="departureDate">Departure Date</label>
            <div className="input-wrapper">
              <FaCalendarAlt className="input-icon" />
              <input
                type="text"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="seatNumbers">Seat Numbers</label>
            <div className="input-wrapper">
              <FaChair className="input-icon" />
              <input
                type="text"
                id="seatNumbers"
                name="seatNumbers"
                value={formData.seatNumbers}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="busName">Bus Name</label>
            <div className="input-wrapper">
              <FaChair className="input-icon" />
              <input
                type="text"
                id="busName"
                name="busName"
                value={formData.busName}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="busType">Bus Type</label>
            <div className="input-wrapper">
              <FaChair className="input-icon" />
              <input
                type="text"
                id="busType"
                name="busType"
                value={formData.busType}
                readOnly
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rideTime">Ride Time</label>
            <div className="input-wrapper">
              <FaChair className="input-icon" />
              <input
                type="text"
                id="rideTime"
                name="rideTime"
                value={formData.rideTime}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="form-section payment-info">
          <h2>
            <FaCreditCard /> Payment Information
          </h2>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <div className="input-wrapper">
              <FaCreditCard className="input-icon" />
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className={errors.cardNumber ? "error" : ""}
                placeholder="1234567890123456"
              />
            </div>
            {errors.cardNumber && (
              <span className="error-message">{errors.cardNumber}</span>
            )}
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <div className="input-wrapper">
                <FaCalendarAlt className="input-icon" />
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={errors.expiryDate ? "error" : ""}
                  placeholder="MM/YY"
                />
              </div>
              {errors.expiryDate && (
                <span className="error-message">{errors.expiryDate}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={errors.cvv ? "error" : ""}
                  placeholder="123"
                />
              </div>
              {errors.cvv && (
                <span className="error-message">{errors.cvv}</span>
              )}
            </div>
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            <FaCreditCard className="button-icon" />
            {loading ? "Reserving..." : "Complete Reservation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
