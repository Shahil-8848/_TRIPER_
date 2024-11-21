// src/pages/home/HomePage.tsx
import React from "react";
import "./HomePage.css";
import Flow from "../../components/Flow/Flow";
import Card from "../../components/Flow/Card/Card";
import streets from "../../photos/streets.jpg";

const HomePage: React.FC = () => {
  return (
    <div className="home-cnt">
      <div className="home-box" style={{ backgroundImage: `url(${streets})` }}>
        <div className="home-content">
          {" "}
          <h1>Your ultimate Tour Friend</h1>
          <p>
            With the travelling vision we look forward for better goals and new
            roads
          </p>
        </div>
      </div>
      <Flow />
      <Card />
    </div>
  );
};

export default HomePage;
