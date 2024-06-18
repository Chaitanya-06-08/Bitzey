const jwt=require('jsonwebtoken')
const generateRefreshToken = (_id) => {
  let refreshToken = jwt.sign({ _id: _id }, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
  return  refreshToken ;
};

module.exports=generateRefreshToken