const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/UserRoutes");
const searchRoutes = require("./Routes/SearchRoutes");
const reserveRoutes = require("./Routes/ReserveRoutes");
const passengerRoutes = require("./Routes/PassengerRoutes");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
var cors = require("cors");
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes
app.use("/api/auth", userRoutes);
app.use("/routes", searchRoutes);
app.use("/api", reserveRoutes);
app.use("/api", passengerRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
