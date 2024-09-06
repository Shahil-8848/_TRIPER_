const express = require("express");
const router = express.Router();

const { GetBuses } = require("../Controllers/BusSearchController");

router.post("/searchbus", GetBuses);

module.exports = router;
