import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ImArrowRight2 } from "react-icons/im";
import { IoFilter } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { MdFastfood, MdAirlineSeatReclineNormal } from "react-icons/md";
import { FaWifi, FaBed } from "react-icons/fa";
import "./BusHub.css";
// Updated interface with correct types



interface BusData {
  fromdest: string;
  todest: string;
  shift: string;
  seatsAvailable: { seatNumber: number; isAvailable: boolean }[];
  busFeatures: string; // This is a string, not an array
  ridetime: string;
  rideId: number;
  price: number;
  busid: number;
  busname: string;
  busno: string;
}

interface Filters {
  priceRange: [number, number];
  departureTime: string[];
  busType: string[];
  amenities: string[];
}

const BusHub: React.FC = () => {
  const param = useLocation();
  const [fromDestination, setFromDest] = useState<string | null>(null);
  const [toDestination, setToDestination] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [busData, setBusData] = useState<BusData[]>([]);
  const [filteredBusData, setFilteredBusData] = useState<BusData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSeats, setShowSeats] = useState<number | null>(null);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 5000],
    departureTime: [],
    busType: [],
    amenities: [],
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(param.search);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    setFromDest(from);
    setToDestination(to);
    setSelectedDate(date);
  }, [param.search]);

  useEffect(() => {
    if (fromDestination && toDestination) {
      fetchBuses();
    }
  }, [fromDestination, toDestination]);

  useEffect(() => {
    applyFilters();
  }, [filters, busData]);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/routes/searchbus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromDestination, toDestination }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setBusData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if a bus has a specific amenity
  const busHasAmenity = (busFeatures: string, amenity: string): boolean => {
    return busFeatures.toLowerCase().includes(amenity.toLowerCase());
  };
  

  const applyFilters = () => {
    let filtered = [...busData];

    // Apply price filter
    filtered = filtered.filter(
      (bus) =>
        bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]
    );

    // Apply departure time filter
    if (filters.departureTime.length > 0) {
      filtered = filtered.filter((bus) =>
        filters.departureTime.some((time) => bus.ridetime.includes(time))
      );
    }

    // Apply bus type filter
    if (filters.busType.length > 0) {
      filtered = filtered.filter((bus) => filters.busType.includes(bus.shift));
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((bus) =>
        filters.amenities.every((amenity) =>
          busHasAmenity(bus.busFeatures, amenity)
        )
      );
    }

    setFilteredBusData(filtered);
  };

  const handleFilterChange = (filterType: keyof Filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleViewSeats = (rideId: number) => {
    setShowSeats(showSeats === rideId ? null : rideId);
  };

  // Helper function to render amenity icon
  const renderAmenityIcon = (amenityType: string) => {
    switch (amenityType.toLowerCase()) {
      case "wifi":
        return <FaWifi />;
      case "sleeper":
        return <FaBed />;
      case "food":
        return <MdFastfood />;
      default:
        return null;
    }
  };

  return (
    <div className="bus-hub">
      <div className="bushub-box">
        <div className="hub-left">
          <div className="filter-section">
            <h3>
              <IoFilter /> Filters
            </h3>

            <div className="filter-group">
              <h4>Price Range</h4>
              <input
                type="range"
                min="0"
                max="5000"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    0,
                    parseInt(e.target.value),
                  ])
                }
              />
              <span>₹0 - ₹{filters.priceRange[1]}</span>
            </div>

            <div className="filter-group">
              <h4>Departure Time</h4>
              {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
                <label key={time}>
                  <input
                    type="checkbox"
                    checked={filters.departureTime.includes(time)}
                    onChange={() => {
                      const updatedTimes = filters.departureTime.includes(time)
                        ? filters.departureTime.filter((t) => t !== time)
                        : [...filters.departureTime, time];
                      handleFilterChange("departureTime", updatedTimes);
                    }}
                  />
                  {time}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Bus Type</h4>
              {["AC", "Non AC", "Sleeper", "Seater"].map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    checked={filters.busType.includes(type)}
                    onChange={() => {
                      const updatedTypes = filters.busType.includes(type)
                        ? filters.busType.filter((t) => t !== type)
                        : [...filters.busType, type];
                      handleFilterChange("busType", updatedTypes);
                    }}
                  />
                  {type}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Amenities</h4>
              {["WiFi", "Sleeper", "Food"].map((amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => {
                      const updatedAmenities = filters.amenities.includes(
                        amenity
                      )
                        ? filters.amenities.filter((a) => a !== amenity)
                        : [...filters.amenities, amenity];
                      handleFilterChange("amenities", updatedAmenities);
                    }}
                  />
                  {renderAmenityIcon(amenity)} {amenity}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="hub-right">
          <div className="hub-right-box">
            <div className="hub-right-top">
              <div className="route-info">
                <h2>
                  {fromDestination} <ImArrowRight2 /> {toDestination}
                </h2>
                <p className="date">{selectedDate}</p>
              </div>
              <div className="results-count">
                {filteredBusData.length} buses found
              </div>
            </div>

            <div className="hub-buses-items">
              {loading && (
                <div className="loading-spinner">Loading buses...</div>
              )}
              {error && <p className="error-message">{error}</p>}

              {filteredBusData.length > 0
                ? filteredBusData.map((bus) => (
                    <div key={bus.rideId} className="bus-card">
                      <div className="bus-items">
                        <div className="bus-heading">
                          <h3>{bus.busname}</h3>
                          <span className="bus-type">{bus.shift}</span>
                        </div>

                        <div className="bus-details">
                          <div className="time-price">
                            <p className="departure-time">{bus.ridetime}</p>
                            <p className="price">₹{bus.price}</p>
                          </div>

                          <div className="amenities">
                            {["WiFi", "Sleeper", "Food"].map(
                              (feature) =>
                                busHasAmenity(bus.busFeatures, feature) && (
                                  <span key={feature} className="amenity">
                                    {renderAmenityIcon(feature)}
                                  </span>
                                )
                            )}
                          </div>

                          <div className="seats-info">
                            <MdAirlineSeatReclineNormal />
                            {
                              bus.seatsAvailable.filter(
                                (seat) => seat.isAvailable
                              ).length
                            }{" "}
                            seats available
                          </div>
                        </div>

                        <button
                          className="view-seats-btn"
                          onClick={() => handleViewSeats(bus.rideId)}
                        >
                          {showSeats === bus.rideId
                            ? "Hide Seats"
                            : "View Seats"}
                        </button>
                      </div>

                      {showSeats === bus.rideId && (
                        <div className="seats-container">
                          <h4>Select Seats</h4>
                          <div className="seats-grid">
                            {bus.seatsAvailable.map((seat) => (
                              <div
                                key={seat.seatNumber}
                                className={`seat ${seat.isAvailable ? "available" : "unavailable"}`}
                              >
                                {seat.seatNumber}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                : !loading && (
                    <p className="no-results">
                      No buses available for the selected criteria.
                    </p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusHub;
