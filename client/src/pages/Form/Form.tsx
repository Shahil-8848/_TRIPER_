import React, { useState } from "react";
import "./Form.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaChair,
  FaCreditCard,
  FaLock,
} from "react-icons/fa";

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    seatNumbers: "12, 13",
    departureDate: "2023-06-15",
    departureTime: "09:00",
    from: "New York",
    to: "Washington D.C.",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has errors");
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
                placeholder="John Doe"
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
                placeholder="johndoe@example.com"
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
                placeholder="(123) 456-7890"
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="departureDate">Departure Date</label>
              <div className="input-wrapper">
                <FaCalendarAlt className="input-icon" />
                <input
                  type="text"
                  id="departureDate"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="departureTime">Departure Time</label>
              <div className="input-wrapper">
                <FaClock className="input-icon" />
                <input
                  type="text"
                  id="departureTime"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  readOnly
                />
              </div>
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
                onChange={handleChange}
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
                placeholder="1234 5678 9012 3456"
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
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={errors.expiryDate ? "error" : ""}
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
          <button type="submit" className="submit-button">
            <FaCreditCard className="button-icon" />
            Complete Reservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
