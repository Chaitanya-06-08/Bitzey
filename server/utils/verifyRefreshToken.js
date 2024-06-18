const jwt = require("jsonwebtoken");
function verifyRefreshToken(refreshToken) {
  let decodedToken = null;
  try {
    decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    if (decodedToken) return true;
    return false;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Refersh token expired");
      return false;
    }
    console.log(error);
    throw error;
  }
}
module.exports = verifyRefreshToken;
