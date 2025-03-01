const connectToDatabase = require("../utils/db");

const GetAllPassengers = async (req, res) => {
  try {
    const connection = await connectToDatabase();

    const query = `
      SELECT 
        id, fullName, email, phone, seatNumbers, departureDate,
        fromLocation, toLocation, busName, busType, rideTime,
        CAST(seatPrice AS DECIMAL(10,2)) AS seatPrice, createdAt
      FROM triper.passengerdetails
      ORDER BY createdAt DESC
    `;

    const [rows] = await connection.execute(query);
    console.log("Fetched passenger details:", rows);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching passenger details:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

module.exports = { GetAllPassengers };
