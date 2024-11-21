const connectToDatabase = require("../utils/db");

const GetBuses = async (req, res) => {
  const { fromDestination, toDestination } = req.body;

  if (!fromDestination || !toDestination) {
    return res.status(400).send("No Destination in the Entry");
  }

  try {
    const connection = await connectToDatabase();
    console.log("Executing query with:", fromDestination, toDestination);

    // Query to fetch ride, bus, route, and seat details
    const [rows] = await connection.query(
      `
      SELECT 
          r.ride_id,
          r.shift,
          r.ride_time,
          r.price,
          r.bus_features,
          b.bus_name,
          b.bus_number,
          ro.from_location,
          ro.to_location,
          s.seat_id,
          s.seat_number,
          s.is_available
      FROM 
          Rides AS r
      JOIN 
          BusRoutes AS br ON r.bus_route_id = br.bus_route_id
      JOIN 
          Buses AS b ON br.bus_id = b.bus_id
      JOIN 
          Routes AS ro ON br.route_id = ro.route_id
      LEFT JOIN
          Seats AS s ON s.ride_id = r.ride_id
      WHERE 
          ro.from_location = ? AND ro.to_location = ?;
      `,
      [fromDestination, toDestination]
    );

    console.log("Query result:", rows);

    if (rows.length === 0) {
      return res.status(404).send("No buses found for the selected route");
    }

    // Reformat data by grouping by ride_id and attaching seat information
    const rides = rows.reduce((acc, row) => {
      const {
        ride_id,
        shift,
        ride_time,
        price,
        bus_features,
        bus_name,
        bus_number,
        from_location,
        to_location,
        seat_id,
        seat_number,
        is_available,
      } = row;

      // Check if the ride is already added
      let ride = acc.find((r) => r.ride_id === ride_id);

      if (!ride) {
        // Add new ride
        ride = {
          ride_id,
          shift,
          ride_time,
          price,
          bus_features:
            typeof bus_features === "string"
              ? JSON.parse(bus_features)
              : bus_features, // Fix bus_features parsing
          bus_name,
          bus_number,
          from_location,
          to_location,
          seats: [],
        };
        acc.push(ride);
      }

      // Add seat details to the ride
      if (seat_id !== null) {
        ride.seats.push({
          seat_id,
          seat_number,
          is_available: !!is_available, // Convert to boolean
        });
      }

      return acc;
    }, []);

    res.status(200).json(rides);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  GetBuses,
};
