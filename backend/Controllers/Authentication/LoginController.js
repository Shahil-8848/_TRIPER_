const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectToDatabase = require("../../utils/db");

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/9203/9203764.png";

// Registration handler
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let connection = await connectToDatabase();

    // Check if user already exists
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User already exists in the db bro" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user in the database
    const [result] = await connection.execute(
      "INSERT INTO users (username, email, password, avatar_url) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, defaultAvatar]
    );

    // Get the newly created user's ID
    const userId = result.insertId;

    // Return user data without password
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: userId,
        username,
        email,
        avatar_url: defaultAvatar,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login handler
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await connectToDatabase();

    // Get user with all necessary fields
    const [rows] = await connection.execute(
      "SELECT id, username, email, password, avatar_url FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "4days" }
    );

    // Send response with user data (excluding password)
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url:
          user.avatar_url ||
          "https://cdn-icons-png.flaticon.com/512/9203/9203764.png",
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
