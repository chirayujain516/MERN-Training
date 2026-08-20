const jwt = require("jsonwebtoken");
const staffService = require("../service/staffService");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const staff = await staffService.getStaffById(decoded.id);

    if (!staff) {
      return res.status(401).json({ success: false, message: "Staff not found" });
    }

    req.user = staff;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
