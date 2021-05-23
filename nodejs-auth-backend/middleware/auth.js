const jwt = require("jsonwebtoken");
const { userError } = require("../utils");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });
  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    return userError(res, { message: "Invalid Token" });
  }
};
