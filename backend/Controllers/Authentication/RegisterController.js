const express = require("express");
const bcrypt = require("bcryptjs");
const connectToDatabase = require("../../utils/db");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let connection = await connectToDatabase();

    // Check if user already exist
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
    await connection.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
};
