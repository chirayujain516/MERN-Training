const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StaffModel = require("../model/staffModel");
const AppError = require("../utils/AppError");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

const registerStaff = async (data) => {
  const { name, email, password, department } = data;

  const existing = await StaffModel.findOne({ email });
  if (existing) {
    throw new AppError("Email already registered", 409);
  }

  // Password yahan hash NAHI karna — staffModel.js ka pre("save") hook
  // khud hash kar dega.
  const staff = await StaffModel.create({ name, email, password, department });

  // Response me password kabhi mat bhejo
  const { password: _removed, ...safeStaff } = staff.toObject();
  return safeStaff;
};

const loginStaff = async (email, password) => {
  const staff = await StaffModel.findOne({ email });
  if (!staff) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, staff.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  // JWT payload me sirf id aur department — kabhi bhi password ya koi
  // sensitive data mat daalo.
  const token = jwt.sign({ id: staff._id, department: staff.department }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const { password: _removed, ...safeStaff } = staff.toObject();
  return { staff: safeStaff, token };
};

const getStaffById = async (id) => {
  // password field select hi nahi karte, response me kabhi jaana nahi chahiye
  const staff = await StaffModel.findById(id).select("-password");
  if (!staff) {
    throw new AppError("Staff not found", 401);
  }
  return staff;
};

module.exports = {
  registerStaff,
  loginStaff,
  getStaffById,
};
