const connectToDatabase = require("../utils/db");

const GetBuses = async (req, res) => {
  const { fromDestination, toDestination } = req.body;

  if (!fromDestination || !toDestination) {
    return res
      .status(400)
      .send("Missing 'fromDestination' or 'toDestination' in request body");
  }

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.query(
      `
      SELECT 
          ab.rideID AS ride_id,
          ab.shift,
          ab.rideTime AS ride_time,
          ab.price,
          ab.busFeatures AS bus_features,
          ab.fromDest AS from_location,
          ab.toDest AS to_location,
          ab.bus_id,
          ab.seatsAvailable AS seats,
          b.bus_name,
          b.bus_type
      FROM 
          availablebuses ab
      LEFT JOIN 
          buses b ON ab.bus_id = b.bus_id
      WHERE 
          ab.fromDest = ? AND ab.toDest = ?;
      `,
      [fromDestination, toDestination]
    );

    if (rows.length === 0) {
      return res.status(404).send("No buses found for the selected route");
    }

    const buses = rows.map((row) => {
      const features = row.bus_features.split(", ").reduce((acc, feature) => {
        acc[feature] = true;
        return acc;
      }, {});

      return {
        ...row,
        ride_time: new Date(row.ride_time).toISOString(),
        price: parseInt(row.price),
        bus_features: features,
        seats: JSON.parse(row.seats),
        total_seats: JSON.parse(row.seats).length,
        bus_name: row.bus_name || `Bus ${row.bus_id}`,
        bus_type: row.bus_type || "Unknown",
      };
    });

    res.status(200).json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).send("Server Error");
  }
  6;
};

module.exports = { GetBuses };
