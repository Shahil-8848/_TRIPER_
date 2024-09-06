import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './BusHub.css';
import { FcWiFiLogo } from "react-icons/fc";
import { ImArrowRight2 } from "react-icons/im";

interface BusData {
  fromdest: string;
  todest: string;
  shift: string;
  seatsAvailable: { seatNumber: number; isAvailable: boolean }[];
  busFeatures: string;
  ridetime: string;
  rideId: number;
  price: number;
  busid: number;
  busname: string;
  busno: string;
}

const BusHub: React.FC = () => {
  const param = useLocation();
  
  const [fromDestination, setFromDest] = useState<string | null>(null);
  const [toDestination, setToDestination] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [busData, setBusData] = useState<BusData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSeats, setShowSeats] = useState<number | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(param.search);
    // if(searchParams)
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");
    if(!from&&to&&date){
      return <h1>There are no Buses a man</h1>
      

    }
    setFromDest(from);
    setToDestination(to);
    setSelectedDate(date);
  }, [param.search]);

  useEffect(() => {
    if (fromDestination && toDestination) {
      async function getBuses() {
        try {
          setLoading(true);
          const response = await fetch('http://localhost:3000/routes/searchbus', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              fromDestination: fromDestination,
              toDestination: toDestination
            })
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
            // console.log('error in feectching ')

          }
          

          const data = await response.json();
          setBusData(data);
          
  
        } catch (err) {
          setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
          setLoading(false);
        }
      }

      getBuses();
    }
  }, [fromDestination, toDestination]);

  const handleViewSeats = (rideId: number) => {
    setShowSeats(showSeats === rideId ? null : rideId);
  };

  return (
    <div className='bus_hub'>
      <div className="bushub-box">
        <div className="hub-left">
          <div className="hub-left-box">
            {/* Filter section (to be implemented) */}
            /* From Uiverse.io by Nawsome */ 
<div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
	<div className="wheel"></div>
	<div className="hamster">
		<div className="hamster__body">
			<div className="hamster__head">
				<div className="hamster__ear"></div>
				<div className="hamster__eye"></div>
				<div className="hamster__nose"></div>
			</div>
			<div className="hamster__limb hamster__limb--fr"></div>
			<div className="hamster__limb hamster__limb--fl"></div>
			<div className="hamster__limb hamster__limb--br"></div>
			<div className="hamster__limb hamster__limb--bl"></div>
			<div className="hamster__tail"></div>
		</div>
	</div>
	<div className="spoke"></div>
</div>
          </div>
          <div className="hub-places">
            {/* Places section (to be implemented) */}
          </div>
        </div>
        <div className="hub-right"> 
          <div className='hub-right-box'>
            <div className='hub-right-top'>
              <div className='h-places'>
                <h4>{fromDestination}</h4>
                <span><ImArrowRight2 /></span>
                <h4>{toDestination}</h4>
                <h4>{selectedDate}</h4>
              </div>
            </div>
            <div className="hub-buses-items">
              {loading && <p>Loading buses...</p>}
              {error && <p className="error-message">{error}</p>}
              {busData.length > 0 ? (
                busData.map((bus) => (
                  <div key={bus.rideId} className="bus-card">
                    <div className='bus-items'>
                      <div className="bus-heading">
                      <h3>{bus.busname} ({bus.busno})</h3>
                      <p className='arrival-time'>{bus.ridetime}</p>
                      </div>
                    
                      <p><span className='icon'><FcWiFiLogo /></span> {bus.busFeatures}</p>
                      <p>Shift: {bus.shift}</p>
                      <p>Ride Time: {bus.ridetime}</p>
                      <p>Price: ${bus.price}</p>
                      <button className='view-seats-btn' onClick={() => handleViewSeats(bus.rideId)}>
                        {showSeats === bus.rideId ? "Hide Seats" : "View Seats"}
                      </button>
                    </div>
                    {showSeats === bus.rideId && (
                      <div className="seats-container">
                        <h4>Seats Available:</h4>
                        <div className="seats-grid">
                          {bus.seatsAvailable.map(seat => (
                            <div key={seat.seatNumber} className={`seat ${seat.isAvailable ? 'available' : 'unavailable'}`}>
                              {seat.seatNumber}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : !loading && <p>No buses available for the selected route.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusHub;
