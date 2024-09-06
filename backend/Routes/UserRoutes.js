const express = require("express");
const {
  register,
} = require("../Controllers/Authentication/RegisterController");
const { login } = require("../Controllers/Authentication/LoginController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);



module.exports = router;
