// const express = require("express");
// const cors = require("cors");
// const sqlite3 = require("sqlite3").verbose();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // Database setup
// const db = new sqlite3.Database("./appmap.db", sqlite3.OPEN_READWRITE, (err) => {
//   if (err) console.error(err);
//   else console.log("Connected to SQLite database");
// });

// // Create User Table
// db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, name TEXT, gender TEXT)`);

// // Middleware for authentication
// const authenticateToken = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "User not logged in" });

//   jwt.verify(token, "your_secret_key", (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid Token" });
//     req.user = user;
//     next();
//   });
// };

// // **Register API**
// app.post("/api/register", async (req, res) => {
//   const { username, password, name, gender } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   db.run(`INSERT INTO users (username, password, name, gender) VALUES (?, ?, ?, ?)`,
//     [username, hashedPassword, name, gender],
//     (err) => {
//       if (err) return res.status(400).json({ message: "User already exists" });
//       res.json({ message: "Registration successful" });
//     }
//   );
// });

// // **Login API**
// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;

//   db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ username: user.username }, "your_secret_key", { expiresIn: "1h" });
//     res.json({ message: "Login successful", token });
//   });
// });

// // **Dashboard API**
// app.get("/api/dashboard", authenticateToken, (req, res) => {
//   res.json({ message: `Welcome ${req.user.username}` });
// });

// // **MapView API**
// app.get("/api/mapview", authenticateToken, (req, res) => {
//   res.json({ message: "Map data retrieved" });
// });

// // Start Server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')

const dataBasePath = path.join(__dirname, 'mapapp.db')
const app = express()
app.use(express.json())

let dataBase
const initializeDBAndServer = async () => {
  try {
    dataBase = await open({
      filename: dataBasePath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (err) {
    console.log(`DataBase Error ${err.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()
