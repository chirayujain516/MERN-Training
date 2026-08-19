require("dotenv").config();
const express = require("express");
const reviewRoutes = require("./src/routes/review.route");
const connectDB = require("./src/config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/reviews", reviewRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// connecting db first
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
