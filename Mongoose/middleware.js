const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.end("Invalid credentials");
  }

  const decoded = jwt.verify(token, "hii");
  req.user = decoded;

  next();
};

module.exports = checkToken;
