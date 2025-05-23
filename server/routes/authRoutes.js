const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = "your_secret_key"; // Change this to a secure key

// Register User
router.post("/register", async (req, res) => {
    const { username, password, name, gender } = req.body;

    if (!username || !password || !name || !gender) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const db = req.db;
        const existingUser = await db.get("SELECT * FROM user WHERE username = ?", [username]);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.run(
            "INSERT INTO user (username, password, name, gender) VALUES (?, ?, ?, ?)",
            [username, hashedPassword, name, gender]
        );

        res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const db = req.db;
        const user = await db.get("SELECT * FROM user WHERE username = ?", [username]);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

module.exports = router;
