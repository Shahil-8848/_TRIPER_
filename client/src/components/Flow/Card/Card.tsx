import React from "react";
import "./Card.css";
import kathmandu from "../../../photos/kathmandu.jpeg";
import pokhara from "../../../photos/pokhara.jpeg";
import newYork from "../../../photos/newYork.jpg";

interface DestinationCardProps {
  name: string;
  className: string;
  imageUrl: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  className,
  imageUrl,
}) => (
  <div
    className={`destination-card ${className}`}
    style={{ backgroundImage: `url(${imageUrl})` }}
  >
    <span className="destination-name">{name}</span>
  </div>
);

export default function Card() {
  return (
    <div className="popular-destinations-container">
      {/* <h2 className="popular-destinations-title">Popular destinations</h2> */}
      <div className="destinations-grid">
        <DestinationCard
          name="Spain"
          className="large-card spain"
          imageUrl={kathmandu}
        />
        <DestinationCard
          name="London"
          className="small-card london"
          imageUrl={pokhara}
        />
        <DestinationCard
          name="Croatia"
          className="large-card croatia"
          imageUrl={newYork}
        />
        <DestinationCard
          name="Lisbon"
          className="small-card lisbon"
          imageUrl={
            "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/gc-v1/san-francisco/shutterstock_2392291507_san_francisco_non_editorial?_a=BAVARSDW0"
          }
        />
        <DestinationCard
          name="Bratislava"
          className="small-card bratislava"
          imageUrl={
            "https://imageio.forbes.com/specials-images/imageserve/656df61cc3a44648c235dde3/Las-Vegas--Nevada--USA-at-the-Welcome-Sign/960x0.jpg?format=jpg&width=960"
          }
        />
        <DestinationCard
          name="Copenhagen"
          className="small-card copenhagen"
          imageUrl={
            "https://cdn.choosechicago.com/uploads/2019/07/first-time-bean-1.jpg"
          }
        />
      </div>
    </div>
  );
}
