const connectToDatabase = require("../utils/db");

const ReserveBus = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    seatNumbers,
    departureDate,
    fromLocation,
    toLocation,
    busName,
    busType,
    rideTime,
    seatPrice,
  } = req.body;

  // Validation
  if (
    !fullName ||
    !email ||
    !phone ||
    !seatNumbers ||
    !departureDate ||
    !fromLocation ||
    !toLocation ||
    !busName ||
    !rideTime ||
    !seatPrice
  ) {
    return res
      .status(400)
      .json({ error: "Missing required fields in request body" });
  }

  try {
    const connection = await connectToDatabase();

    const query = `
      INSERT INTO triper.passengerdetails (
        fullName, email, phone, seatNumbers, departureDate,
        fromLocation, toLocation, busName, busType, rideTime, seatPrice
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      fullName,
      email,
      phone,
      seatNumbers,
      departureDate,
      fromLocation,
      toLocation,
      busName,
      busType || "Unknown",
      rideTime, // Use rideTime as-is from frontend
      parseFloat(seatPrice),
    ];

    console.log("Inserting into database with values:", values);

    await connection.execute(query, values);

    res.status(201).json({ message: "Reservation successful" });
  } catch (error) {
    console.error("Error reserving bus:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

module.exports = { ReserveBus };
