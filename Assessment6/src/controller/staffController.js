const staffService = require("../service/staffService");

const register = async (req, res, next) => {
  try {
    const staff = await staffService.registerStaff(req.body);
    res.status(201).json({ success: true, message: "Staff registered", data: staff });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { staff, token } = await staffService.loginStaff(email, password);

    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ success: true, message: "Login successful", data: staff });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Staff detail fetched", data: req.user });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ success: true, message: "Logged out", data: null });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};
