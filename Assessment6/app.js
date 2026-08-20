const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const reviewRoutes = require("./src/routes/review.route");
const staffRoutes = require("./src/routes/staff.route");

const app = express();

app.use(express.json());
app.use(cookieParser()); // req.cookies fill karta hai — authMiddleware ko token yahi se milta hai

app.get("/", (req, res) => {
  res.json({ success: true, message: "Review API is running" });
});

app.use("/api/reviews", reviewRoutes);
app.use("/staff", staffRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Central error-handling middleware (catches AppError thrown from service layer)
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

module.exports = app;
