const mysql = require("mysql2/promise");

let connection;

async function connectToDatabase() {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: "triper",
      });
      console.log("Connected to MySQL");
    }
    return connection;
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
