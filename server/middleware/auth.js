const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key"; // Use environment variable

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Access denied: Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
