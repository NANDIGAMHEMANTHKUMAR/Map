const express = require("express");
const { authenticateToken } = require("../middleware/auth"); // ✅ Correct Import

const router = express.Router();

// Protected Dashboard Route
router.get("/", authenticateToken, (req, res) => {
  try {
    res.status(200).json({
      message: "Dashboard data retrieved successfully",
      user: req.user,
      dashboard: {
        totalUsers: 100, // Example data
        totalLocations: 25,
        recentActivity: [
          { id: 1, activity: "User logged in", timestamp: "2025-03-24T12:00:00Z" },
          { id: 2, activity: "Location added", timestamp: "2025-03-24T12:30:00Z" }
        ],
      },
    });
  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
