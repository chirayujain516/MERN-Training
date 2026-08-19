const express = require("express");
const router = express.Router();
const validation = require("../Middlewares/checkValidation");
const checkToken = require("../Middlewares/checkToken");
const authorization = require("../Middlewares/authorization");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUserRole,
} = require("../Controllers/user");
const {
  registerSchema,
  loginSchema,
} = require("../Middlewares/validationSchema");

router.post("/register", validation(registerSchema), registerUser);
router.post("/login", validation(loginSchema), loginUser);
router.patch(
  "/updaterole/:id",
  checkToken,
  authorization("admin"),
  updateUserRole,
);
router.get("/logout", checkToken, logoutUser);

//refreshToekn API
router.get("/refreshToken", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token Not found",
      });
    }
  } catch (error) {
    return res.end(error);
  }
});

module.exports = router;
