const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ message: "Access Denied!" });

  try {
    const verified = jwt.verify(token, process.env.SECRET||'SecretKey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token!" });
  }
};
