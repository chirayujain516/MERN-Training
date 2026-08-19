const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const registerUserService = async ({ name, email, password }) => {
  let user = await userModel.findOne({ email });
  if (user) {
    const error = new Error("User already exist with this email");
    error.statusCode = 409;
    throw error;
  }
  let hashPassword = await bcrypt.hash(password, 10);

  user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });
  return user;
};

const loginUserService = async ({ email, password }) => {
  let user = await userModel.findOne({ email });
  if (!user) {
    const error = new Error("User not found with this email address");
    error.statusCode = 404;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid Credentials");
    error.statusCode = 401;
    throw error;
  }
  // const token = jwt.sign({ id: user._id }, process.env.secret, {
  //   expiresIn: "5h",
  // });
  const accessToken = jwt.sign({ id: user._id }, process.env.access_key, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign({ id: user._id }, process.env.refresh_key, {
    expiresIn: "7d",
  });
  return { user, accessToken, refreshToken };
};

const updateUserRoleService = async (id, role) => {
  const allowedRoles = ["user", "seller", "admin"];
  if (!allowedRoles.includes(role)) {
    const error = new Error("Invalid role");
    error.statusCode = 400;
    throw error;
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return updatedUser;
};

module.exports = {
  registerUserService,
  loginUserService,
  updateUserRoleService,
};
