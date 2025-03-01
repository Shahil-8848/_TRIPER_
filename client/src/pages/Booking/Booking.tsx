import React, { useState, useEffect } from "react";
import "./Booking.css";

interface Passenger {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  seatNumbers: string;
  departureDate: string;
  fromLocation: string;
  toLocation: string;
  busName: string;
  busType: string;
  rideTime: string;
  seatPrice: number | string; // Allow for string in case backend sends it
  createdAt: string;
}

const Booking: React.FC = () => {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/passengers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data: Passenger[] = await response.json();
        console.log("Fetched passengers:", data);

        // Ensure seatPrice is a number
        const normalizedData = data.map((passenger) => ({
          ...passenger,
          seatPrice:
            typeof passenger.seatPrice === "string"
              ? parseFloat(passenger.seatPrice)
              : passenger.seatPrice,
        }));

        setPassengers(normalizedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPassengers();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <h1 className="booking-title">Passenger Reservations</h1>
      {passengers.length === 0 ? (
        <p className="no-data">No reservations found.</p>
      ) : (
        <div className="booking-table-container">
          <table className="booking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Seats</th>
                <th>Date</th>
                <th>Route</th>
                <th>Bus</th>
                <th>Type</th>
                <th>Time</th>
                <th>Price</th>
                <th>Booked On</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((passenger) => (
                <tr key={passenger.id}>
                  <td>{passenger.id}</td>
                  <td>{passenger.fullName}</td>
                  <td>{passenger.email}</td>
                  <td>{passenger.phone}</td>
                  <td>{passenger.seatNumbers}</td>
                  <td>
                    {new Date(passenger.departureDate).toLocaleDateString()}
                  </td>
                  <td>{`${passenger.fromLocation} → ${passenger.toLocation}`}</td>
                  <td>{passenger.busName}</td>
                  <td>{passenger.busType}</td>
                  <td>{passenger.rideTime}</td>
                  <td>₹{Number(passenger.seatPrice).toFixed(2)}</td>
                  <td>{new Date(passenger.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Booking;
