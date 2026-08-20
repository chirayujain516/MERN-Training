const express = require("express");
const router = express.Router();

const staffController = require("../controller/staffController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", staffController.register);
router.post("/login", staffController.login);
router.get("/me", authMiddleware, staffController.getMe);
router.post("/logout", authMiddleware, staffController.logout);

module.exports = router;
