const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/UserRoutes");
const searchRoutes = require("./Routes/SearchRoutes");

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
