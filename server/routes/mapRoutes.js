const express = require("express");
const { authenticateToken } = require("../middleware/auth"); // ✅ Correct Import

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const db = req.db; // Get the database instance

    // Fetch map data for the logged-in user
    const mapData = await db.all("SELECT latitude, longitude FROM map_data WHERE user_id = ?", [req.user.user_id]);

    res.status(200).json({
      message: "Map data retrieved successfully",
      user: req.user,
      locations: mapData,
    });
  } catch (error) {
    console.error("❌ Error fetching map data:", error);
    res.status(500).json({ message: "Server error while retrieving map data" });
  }
});

module.exports = router;
