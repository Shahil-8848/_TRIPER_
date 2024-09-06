const connectToDatabase = require("../utils/db");
// const express = require("express");
const GetBuses = async (req, res) => {
  const { fromDestination, toDestination } = req.body; // Updated to match request body field names

  if (!fromDestination || !toDestination) {
    return res.status(400).send("No Destination in the Entry");
  }

  try {
    const connection = await connectToDatabase();
    console.log("Executing query with:", fromDestination, toDestination); // Debug log

    const [rows] = await connection.query(
      `
      SELECT 
          ab.fromdest,
          ab.todest,
          ab.shift,
          ab.seatsAvailable,
          ab.busFeatures,
          ab.ridetime,
          ab.rideId,
          ab.price,
          ab.busid,
          b.busname,
          b.busno
      FROM 
          available_buses AS ab
      JOIN 
          buses AS b ON ab.busid = b.id
      WHERE 
          ab.fromdest = ? AND ab.todest = ?;
      `,
      [fromDestination, toDestination]
    );

    console.log("Query result:", rows); // Debug log

    if (rows.length === 0) {
      return res.status(404).send("No buses found for the selected route");
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).send("Server Error");
  }
};

const filterBuses = (req, res) => {
  //requires the logic to search buses based on filters , like ac , non ac,
};

module.exports = {
  GetBuses,
};
