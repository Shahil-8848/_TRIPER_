import React, { useState } from "react";
import "./Flow.css";
import { CiLocationOn, CiFlag1, CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
const Flow: React.FC = () => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/search?from=${location}&to=${destination}&date=${date}`);
    console.log(
      `Location: ${location}, Destination: ${destination}, Date: ${date}`
    );
  };

  return (
    <div className="flow-main">
      <div className="flow-box">
        <div className="fl-location">
          <div className="l-cnt">
            <span>
              <CiLocationOn />
            </span>
            <select onChange={(e) => setLocation(e.target.value)}>
              <option>New York</option>
              <option value="New York">New York</option>
              <option value="Washington">Washington</option>
              <option value="Las-vegas">Las-Vegas</option>
            </select>
          </div>
        </div>
        <div className="fl-destination">
          <div className="d-cnt">
            <span>
              <CiFlag1 />
            </span>
            <select onChange={(e) => setDestination(e.target.value)}>
              <option value="New York">Paris</option>
              <option value="Paris">Paris</option>
              <option value="Boston">Boston</option>
              <option value="Washington">Washington</option>
              <option value="Las-vegas">Las-Vegas</option>
            </select>
          </div>
        </div>
        <div className="fl-date">
          <div className="d-cnt">
            <span>
              <CiCalendarDate />
            </span>
            <input type="date" onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
        <div className="fl-button">
          <button onClick={handleSearch}>
            <span>{<FaArrowCircleRight />}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flow;
