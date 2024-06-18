const jwt=require('jsonwebtoken')
const generateAccessToken = (_id) => {
  let accessToken = jwt.sign({ _id: _id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
  return accessToken ;
};

module.exports=generateAccessToken