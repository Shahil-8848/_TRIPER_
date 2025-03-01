const express = require("express");
const router = express.Router();

const { GetAllPassengers } = require("../Controllers/PassengerController");

router.get("/passengers", GetAllPassengers);

module.exports = router;
