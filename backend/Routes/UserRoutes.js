const express = require("express");
const {
  login,
  register,
} = require("../Controllers/Authentication/LoginController");

const {
  updateProfilePicture,
  removeProfilePicture,
  upload,
} = require("../Controllers/UserController");
const verifyToken = require("../Middelware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post(
  "/profile/avatar",
  verifyToken,
  upload.single("avatar"), // Uses in-memory storage and Cloudinary in UserController
  updateProfilePicture
);
router.delete("/profile/avatar", verifyToken, removeProfilePicture);

module.exports = router;
