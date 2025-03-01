import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BusHub.css";
import { ImArrowRight2 } from "react-icons/im";
import { FaWifi } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";
import { useBusContext } from "../../../Context/BusContext";

interface Seat {
  seatNumber: number;
  isAvailable: boolean;
}

interface BusData {
  ride_id: number;
  shift: string;
  seats: Seat[];
  bus_features: { [key: string]: boolean | undefined };
  ride_time: string;
  price: number;
  from_location: string;
  to_location: string;
  bus_id: number;
  total_seats: number;
  bus_name: string;
  bus_type?: string;
}

interface Filters {
  priceRange: [number, number];
  departureTime: string[];
  busType: string[];
  amenities: string[];
}

const BusHub: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setBusDetails } = useBusContext();
  const [fromDestination, setFromDest] = useState<string | null>(null);
  const [toDestination, setToDestination] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [busData, setBusData] = useState<BusData[]>([]);
  const [filteredBusData, setFilteredBusData] = useState<BusData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSeats, setShowSeats] = useState<number | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<
    Record<number, Set<number>>
  >({});
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 5000],
    departureTime: [],
    busType: [],
    amenities: [],
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setFromDest(searchParams.get("from"));
    setToDestination(searchParams.get("to"));
    setSelectedDate(searchParams.get("date"));
  }, [location.search]);

  useEffect(() => {
    if (fromDestination && toDestination) fetchBuses();
  }, [fromDestination, toDestination]);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/routes/searchbus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromDestination, toDestination }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data: BusData[] = await response.json();
      console.log("Fetched bus data:", data);
      setBusData(data);
      setFilteredBusData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleViewSeats = (rideId: number) => {
    setShowSeats(showSeats === rideId ? null : rideId);
    if (showSeats !== rideId) {
      setSelectedSeats((prev) => ({ ...prev, [rideId]: new Set() }));
    }
  };

  const handleSeatClick = (rideId: number, seat: Seat) => {
    if (!seat.isAvailable) return;
    setSelectedSeats((prev) => {
      const currentSeats = prev[rideId] || new Set();
      const newSeats = new Set(currentSeats);
      newSeats.has(seat.seatNumber)
        ? newSeats.delete(seat.seatNumber)
        : newSeats.add(seat.seatNumber);
      return { ...prev, [rideId]: newSeats };
    });
  };

  const handleContinue = (rideId: number, bus: BusData) => {
    const selectedSeatNumbers = Array.from(selectedSeats[rideId] || []);
    if (selectedSeatNumbers.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    const selectedSeatsData = bus.seats.filter((seat) =>
      selectedSeatNumbers.includes(seat.seatNumber)
    );

    // Format rideTime to HH:MM:SS
    const formatTime = (timeInput: string): string => {
      console.log("BusHub formatting rideTime:", timeInput);
      if (!timeInput || typeof timeInput !== "string") return "00:00:00";
      const date = new Date(timeInput);
      if (isNaN(date.getTime())) {
        console.warn("Invalid rideTime in BusHub:", timeInput);
        return "00:00:00";
      }
      return date.toTimeString().split(" ")[0];
    };

    const busDetailsData = {
      selectedBus: selectedSeatsData,
      seatPrice: selectedSeatNumbers.length * bus.price,
      routeFrom: fromDestination,
      routeTo: toDestination,
      travelDate: selectedDate,
      rideTime: formatTime(bus.ride_time),
      rideID: rideId,
      busType: Object.keys(bus.bus_features)
        .filter((key) => bus.bus_features[key])
        .join(", "),
      shift: bus.shift,
      busName: bus.bus_name,
      selectedSeatNumbers,
    };

    console.log("Setting busDetails:", busDetailsData);
    setBusDetails(busDetailsData);
    navigate("/form", { state: busDetailsData });
  };

  const applyFilters = () => {
    let filtered = [...busData];
    filtered = filtered.filter(
      (bus) =>
        bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]
    );
    if (filters.departureTime.length > 0) {
      filtered = filtered.filter((bus) =>
        filters.departureTime.includes(
          bus.shift.charAt(0) + bus.shift.slice(1).toLowerCase()
        )
      );
    }
    if (filters.busType.length > 0) {
      filtered = filtered.filter((bus) => {
        const busType = bus.bus_type || (bus.bus_features.AC ? "AC" : "Non AC");
        return filters.busType.includes(busType);
      });
    }
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((bus) =>
        filters.amenities.every((amenity) => bus.bus_features[amenity])
      );
    }
    setFilteredBusData(filtered);
  };

  const handleFilterChange = (filterType: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const renderBusLayout = (seats: Seat[], rideId: number) => {
    const seatsPerRow = 4;
    const rows = Math.ceil(seats.length / seatsPerRow);
    return (
      <div className="bus-layout">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="bus-row">
            {seats
              .slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow)
              .map((seat) => (
                <div
                  key={seat.seatNumber}
                  className={`seat ${
                    !seat.isAvailable
                      ? "unavailable"
                      : selectedSeats[rideId]?.has(seat.seatNumber)
                        ? "selected"
                        : "available"
                  }`}
                  onClick={() => handleSeatClick(rideId, seat)}
                >
                  {seat.seatNumber}
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  };

  const renderAmenityIcon = (amenityType: string) => {
    switch (amenityType.toLowerCase()) {
      case "wifi":
        return <FaWifi />;
      case "recliningseats":
        return <FaBed />;
      case "food":
        return <FaBowlFood />;
      default:
        return null;
    }
  };

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  if (error)
    return (
      <div className="error-container">
        <h2>Error loading buses</h2>
        <p>{error}</p>
        <button onClick={fetchBuses}>Try Again</button>
      </div>
    );
  if (filteredBusData.length === 0)
    return (
      <div className="no-buses">
        <h2>No buses found</h2>
        <button onClick={() => setFilteredBusData(busData)}>
          Clear Filters
        </button>
      </div>
    );

  return (
    <div className="bus_hub">
      <div className="bushub-box">
        <div className="hub-left">
          <div className="filter-section">
            <h3>Filter Buses</h3>
            <div className="filter-group">
              <label>Price Range</label>
              <div className="range-container">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handleFilterChange("priceRange", [
                      filters.priceRange[0],
                      parseInt(e.target.value),
                    ])
                  }
                />
                <span>
                  ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                </span>
              </div>
            </div>
            <div className="filter-group">
              <label>Departure Time</label>
              {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
                <div key={time} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.departureTime.includes(time)}
                    onChange={() =>
                      handleFilterChange(
                        "departureTime",
                        filters.departureTime.includes(time)
                          ? filters.departureTime.filter((t) => t !== time)
                          : [...filters.departureTime, time]
                      )
                    }
                  />
                  <span>{time}</span>
                </div>
              ))}
            </div>
            <div className="filter-group">
              <label>Bus Type</label>
              {["AC", "Non AC", "Sleeper", "Seater"].map((type) => (
                <div key={type} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.busType.includes(type)}
                    onChange={() =>
                      handleFilterChange(
                        "busType",
                        filters.busType.includes(type)
                          ? filters.busType.filter((t) => t !== type)
                          : [...filters.busType, type]
                      )
                    }
                  />
                  <span>{type}</span>
                </div>
              ))}
            </div>
            <div className="filter-group">
              <label>Amenities</label>
              {["WiFi", "RecliningSeats", "Food"].map((amenity) => (
                <div key={amenity} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() =>
                      handleFilterChange(
                        "amenities",
                        filters.amenities.includes(amenity)
                          ? filters.amenities.filter((a) => a !== amenity)
                          : [...filters.amenities, amenity]
                      )
                    }
                  />
                  <span>
                    {renderAmenityIcon(amenity)}{" "}
                    {amenity.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </div>
              ))}
            </div>
            <button className="apply-filter-btn" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
        <div className="hub-right">
          <div className="hub-right-box">
            <div className="hub-right-top">
              <div className="route-info">
                <h2>
                  {fromDestination} <ImArrowRight2 /> {toDestination}
                </h2>
                <span>{selectedDate}</span>
              </div>
              <p>{filteredBusData.length} buses found</p>
            </div>
            <div className="bus-list">
              {filteredBusData.map((bus) => (
                <div key={bus.ride_id} className="bus-card">
                  <div className="bus-header">
                    <h3>{bus.bus_name}</h3>
                    <span className="departure-time">
                      {new Date(bus.ride_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="bus-details">
                    <div className="features-shift">
                      <div className="bus-features">
                        {Object.entries(bus.bus_features)
                          .filter(([, value]) => value)
                          .map(([feature]) => (
                            <span key={feature} className="feature-tag">
                              {renderAmenityIcon(feature)}
                              {feature.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                          ))}
                      </div>
                      <div className="bus-shift">
                        <FiSun className="shift-icon" />
                        {bus.shift.charAt(0) + bus.shift.slice(1).toLowerCase()}
                      </div>
                    </div>
                    <div className="price-action">
                      <span className="price">
                        ₹{bus.price} <small>/seat</small>
                      </span>
                      <button
                        className="view-seats-btn"
                        onClick={() => handleViewSeats(bus.ride_id)}
                      >
                        {showSeats === bus.ride_id
                          ? "Hide Seats"
                          : "View Seats"}
                      </button>
                    </div>
                  </div>
                  {showSeats === bus.ride_id && (
                    <div className="seat-selection">
                      {renderBusLayout(bus.seats, bus.ride_id)}
                      <div className="selection-summary">
                        <p>
                          Selected Seats:{" "}
                          <strong>
                            {selectedSeats[bus.ride_id]
                              ? Array.from(selectedSeats[bus.ride_id]).join(
                                  ", "
                                )
                              : "None"}
                          </strong>
                        </p>
                        <p>
                          Total Price:{" "}
                          <strong>
                            ₹
                            {selectedSeats[bus.ride_id]
                              ? Array.from(selectedSeats[bus.ride_id]).length *
                                bus.price
                              : 0}
                          </strong>
                        </p>
                        <button
                          className="book-btn"
                          onClick={() => handleContinue(bus.ride_id, bus)}
                          disabled={
                            !selectedSeats[bus.ride_id] ||
                            selectedSeats[bus.ride_id].size === 0
                          }
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusHub;
