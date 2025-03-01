const express = require("express");
const router = express.Router();

const { ReserveBus } = require("../Controllers/ReserveController");

router.post("/reserve", ReserveBus);

module.exports = router;
