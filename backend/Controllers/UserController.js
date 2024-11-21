// UserController.js

const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const path = require("path");
const connectToDatabase = require("../utils/db");

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error("Only image files are allowed!"));
  },
});

const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const connection = await connectToDatabase();
    const userId = req.user.id; // Retrieved from JWT token

    // Upload to Cloudinary
    const result = await cloudinary.uploader
      .upload_stream({ folder: "avatars" }, (error, result) => {
        if (error) throw error;
        return result;
      })
      .end(req.file.buffer);

    const newAvatarUrl = result.secure_url;

    // Update database with new avatar URL
    await connection.execute("UPDATE users SET avatar_url = ? WHERE id = ?", [
      newAvatarUrl,
      userId,
    ]);

    res.json({
      message: "Profile picture updated successfully",
      avatar_url: newAvatarUrl,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeProfilePicture = async (req, res) => {
  // Your existing removeProfilePicture code here
};

module.exports = {
  updateProfilePicture,
  removeProfilePicture,
  upload,
};
