const jwt = require("jsonwebtoken");
const { User } = require("../models/Users");
module.exports.verifyAccessToken = async (req, res, next) => {
  let accessToken = req.cookies?.accessToken||req.body?.accessToken
  if (!accessToken) {
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized request" });
  }
  let decodedToken = null;
  try {
    decodedToken=jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return res
        .status(403)
        .json({ success: false, message: "Access Token Expired" });
    return res.staus(500).json({ success: false, message: error.message });
  }

  try {
    let user = await User.findOne({ _id: decodedToken._id });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
