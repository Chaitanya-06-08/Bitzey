const { User } = require("../models/Users");
const signup = async ({ username, email, password, usertype }) => {
  let user = await User.findOne({
    $and: [{ username: username }, { usertype: usertype }],
  });
  // if user already exists
  if (user) {
    return { success: false, message: "User name already taken" };
  }
  user = await User.findOne({
    $and: [{ email: email }, { usertype: usertype }],
  });
  console.log(user);
  if (user) {
    return { success: false, message: "Email Id is already registered" };
  }

  //creating user and also hashing password
  user = await User.create({
    username,
    email,
    password,
    usertype,
  });
  return { success: true, user: user };
};
module.exports=signup