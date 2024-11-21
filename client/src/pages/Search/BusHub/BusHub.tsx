import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./BusHub.css";
import { ImArrowRight2 } from "react-icons/im";
import { IoWifi } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { MdFastfood } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";

// BusData interface
interface BusData {
  ride_id: number;
  shift: string;
  seats: { seat_id: number; seat_number: number; is_available: boolean }[];
  bus_features: {
    AC?: boolean;
    WiFi?: boolean;
    RecliningSeats?: boolean;
    [key: string]: boolean | undefined;
  };
  ride_time: string;
  price: number;
  bus_name: string;
  bus_number: string;
}

// Filter interface
interface Filters {
  priceRange: [number, number];
  departureTime: string[];
  busType: string[];
  amenities: string[];
}

const BusHub: React.FC = () => {
  const location = useLocation();
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
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    setFromDest(from);
    setToDestination(to);
    setSelectedDate(date);
  }, [location.search]);

  useEffect(() => {
    if (fromDestination && toDestination) {
      fetchBuses();
    }
  }, [fromDestination, toDestination]);

  // Fetch buses based on fromDestination and toDestination
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
      const formattedData = data.map((bus: BusData) => ({
        ...bus,
        bus_features:
          typeof bus.bus_features === "string"
            ? JSON.parse(bus.bus_features)
            : bus.bus_features,
        price: parseFloat(bus.price.toString()),
      }));
      setBusData(formattedData);
      setFilteredBusData(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Toggle seat display for the selected bus
  const handleViewSeats = (rideId: number) => {
    setShowSeats(showSeats === rideId ? null : rideId);
    console.log(rideId);
  };

  // Filter logic for buses
  const applyFilters = () => {
    let filtered = [...busData];

    // Apply price filter
    filtered = filtered.filter(
      (bus) =>
        bus.price >= filters.priceRange[0] && bus.price <= filters.priceRange[1]
    );

    // Apply departure time filter
    if (filters.departureTime.length > 0) {
      filtered = filtered.filter((bus) => {
        const rideTime = new Date(bus.ride_time);
        const hour = rideTime.getHours();
        return filters.departureTime.some((time) => {
          if (time === "Morning" && hour >= 5 && hour < 12) return true;
          if (time === "Afternoon" && hour >= 12 && hour < 17) return true;
          if (time === "Evening" && hour >= 17 && hour < 21) return true;
          if (time === "NIGHT" && hour >= 20 && hour < 5) return true;
          return false;
          // &&(hour >= 21 || hour < 5)
        });
      });
    }

    // Apply bus type filter
    if (filters.busType.length > 0) {
      filtered = filtered.filter((bus) => {
        return filters.busType.some((type) => {
          if (type === "AC" && bus.bus_features.AC) return true;
          if (type === "Non AC" && !bus.bus_features.AC) return true;
          if (type === "Sleeper" && bus.bus_features.RecliningSeats)
            return true;
          if (type === "Seater" && !bus.bus_features.RecliningSeats)
            return true;
          return false;
        });
      });
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((bus) =>
        filters.amenities.every((amenity) => {
          if (amenity === "WiFi" && bus.bus_features.WiFi) return true;
          if (amenity === "Sleeper" && bus.bus_features.RecliningSeats)
            return true;
          if (amenity === "Food" && bus.bus_features.Food) return true;
          return false;
        })
      );
    }

    setFilteredBusData(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (filterType: keyof Filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle Confirm and Search button
  const handleSearch = () => {
    applyFilters();
    console.log("ho ho");
  };

  // Handle price range click
  const handlePriceClick = (price: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], price],
    }));
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

  // useEffect(() => {
  //   if (busData.length > 0) {
  //     applyFilters();
  //   }
  // }, [filters, busData]);

  return (
    <div className="bus_hub">
      <div className="bushub-box">
        <div className="hub-left">
          <div className="filter-section">
            <h3>Filters</h3>

            {/* Price Range Filter */}
            <div className="filter-group">
              <h4>Price Range</h4>
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
              <div className="priceOpt">
                <ul>
                  {[500, 1000, 1500, 3000].map((price) => (
                    <li key={price} onClick={() => handlePriceClick(price)}>
                      {price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Departure Time Filter */}
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

            {/* Bus Type Filter */}
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

            {/* Amenities Filter */}
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

            {/* Confirm and Search Button */}
            <div className="filter-group">
              <button onClick={handleSearch}>Confirm and Search</button>
            </div>
          </div>
        </div>

        <div className="hub-right">
          <div className="hub-right-box">
            <div className="hub-right-top">
              <div className="h-places">
                <h4>{fromDestination}</h4>
                <span>
                  <ImArrowRight2 />
                </span>
                <h4>{toDestination}</h4>
                <h4>{selectedDate}</h4>
              </div>
            </div>
            <div className="hub-buses-items">
              {loading && <p>Loading buses...</p>}
              {error && <p className="error-message">{error}</p>}
              {filteredBusData.length > 0
                ? filteredBusData.map((bus) => (
                    <div key={bus.ride_id} className="bus-card">
                      <div className="bus-items">
                        <div className="bus-heading">
                          <h3>{bus.bus_name}</h3>
                          <p className="arrival-time">
                            {new Date(bus.ride_time).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="bus-info-cnt">
                          <div className="bus-info-icons">
                            <ul>
                              {Object.entries(bus.bus_features).map(
                                ([feature, value]) =>
                                  value && (
                                    <li key={feature}>
                                      {renderAmenityIcon(feature)}
                                    </li>
                                  )
                              )}
                            </ul>
                          </div>
                          <div>{bus.shift}</div>
                          <p className="bus-shift">
                            Shift: {bus.shift}{" "}
                            <span>
                              <FiSun />
                            </span>{" "}
                          </p>
                          <div className="Price-tag">
                            <button
                              className="view-seats-btn"
                              onClick={() => handleViewSeats(bus.ride_id)}
                            >
                              {showSeats === bus.ride_id
                                ? "Hide Seats"
                                : "View Seats"}
                            </button>
                            <h4>
                              Rs.{bus.price} <span>per seat</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                      {showSeats === bus.ride_id && (
                        <div className="seats-container">
                          <h4>Seats Available:</h4>
                          <div className="seats-grid">
                            {bus.seats.slice(0, 8).map((seat) => (
                              <div
                                key={seat.seat_number}
                                className={`seat ${
                                  seat.is_available
                                    ? "available"
                                    : "unavailable"
                                }`}
                              >
                                {seat.seat_number}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                : !loading && <p>No buses available for the selected route.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusHub;
