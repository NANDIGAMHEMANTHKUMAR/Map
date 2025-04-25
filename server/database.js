const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ensure correct path to database file
const dbPath = path.join(__dirname, "appmap.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;
