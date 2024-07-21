const { User } = require("../models/Users");
const Restaurant = require("../models/Restaurants");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");
const verifyRefreshToken = require("../utils/verifyRefreshToken");
const signup = require("../utils/signup");
const checkForEmpty = require("../utils/checkForEmpty");

module.exports.customerLogin = async (req, res) => {
  let { email, password, usertype } = req.body;
  if (checkForEmpty([email, password])) {
    return res.status(422).json({ message: "All details should be filled" });
  }
  try {
    let user = await User.findOne({
      $and: [{ email }, { usertype }],
    });
    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    let accessToken = generateAccessToken(user._id);
    let refreshToken = generateRefreshToken(user._id);
    user = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          refreshToken,
        },
      },
      { new: true }
    )
      .select("-password")
      .lean(true);
    // console.log("Logged in:");
    // console.log(user);
    user.accessToken = accessToken;
    const options = { httpOnly: true, secure: true, sameSite: "None" };
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    res.status(200).json({
      message: "Logged in successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in sigining in" });
  }
};

module.exports.restaurantLogin = async (req, res) => {
  let { email, password, usertype } = req.body;
  if (checkForEmpty([email, password])) {
    return res.status(422).json({ message: "All details should be filled" });
  }
  try {
    let user = await User.findOne({
      $and: [{ email }, { usertype }],
    });
    if (!user) {
      return res.status(404).json({ message: "No User found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    let accessToken = generateAccessToken(user._id);
    let refreshToken = generateRefreshToken(user._id);
    user = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          refreshToken,
        },
      },
      { new: true }
    )
      .select("-password")
      .lean(true);
    // console.log("Logged in:");
    // console.log(temp);
    user.accessToken = accessToken;
    let restaurant = await Restaurant.findOne({ user_id: user._id })
      .populate("user_id")
      .lean(true);

    const options = { httpOnly: true, secure: true, sameSite: "None" };
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    res.status(200).json({
      message: "Logged in successfully",
      user: user,
      restaurantInfo: restaurant,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in sigining in" });
  }
};

module.exports.logout = async (req, res) => {
  try {
    const temp = await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );
    // console.log("Logged out\n");
    // console.log(temp);
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ status: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Error in logging out" });
  }
};

module.exports.customerSignup = async (req, res) => {
  let { username, email, password, confirmPassword, usertype } = req.body;
  //validation
  if (
    checkForEmpty([username, email, password, usertype]) ||
    password.trim() !== confirmPassword.trim()
  ) {
    res.status(422).json({ messgae: "All details should be filled" });
  }
  try {
    const result = await signup({ username, email, password, usertype });
    if (!result.success) {
      return res.status(409).json({ success: false, message: result.message });
    }
    // console.log("New User created:\n" + user);

    res.status(200).json({
      message: "User signup success",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in signing up" });
  }
};

module.exports.restaurantSignup = async (req, res) => {
  let { user, name, image, location, cuisines, opentime, closetime } = req.body;
  console.log(cuisines);
  if (
    !user ||
    !name ||
    !image ||
    !location ||
    isNaN(Date.parse(opentime)) ||
    isNaN(Date.parse(closetime))
  ) {
    return res.status(400).json({
      success: false,
      message: "Fields are missing for restaurant signup",
    });
  }
  try {
    const result = await signup(user);
    if (!result.success) {
      return res.status(409).json({ success: false, message: result.message });
    }
    let user_id = result.user._id;
    const restaurant = await Restaurant.create({
      user_id,
      name,
      image,
      location,
      cuisines,
      opentime,
      closetime,
    });
    if (!restaurant) {
      throw new Error("Error in creating restaurant");
    }
    res
      .status(200)
      .json({ success: true, message: "Restaurant Signup succesful" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, messgae: "Error in restaurant signup" });
  }
};

module.exports.refreshAccessToken = async (req, res) => {
  const userRefreshToken = req.cookies?.refreshToken;
  if (!userRefreshToken) {
    return res
      .status(403)
      .json({ success: false, message: "Refersh Token sent is invalid" });
  }
  const email = req.body.email;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  try {
    let user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    if (verifyRefreshToken(user.refreshToken)) {
      if (userRefreshToken != user.refreshToken) {
        return res
          .status(403)
          .json({ success: false, message: "Refersh Token sent is invalid" });
      }
      let accessToken = generateAccessToken(user._id);
      let restaurant = null;
      if (user.usertype == "restaurant") {
        restaurant = await Restaurant.findOne({ user_id: user._id });
      }
      let userDetails = { ...user };
      let restaurantDetails = { ...restaurant };
      const options = { httpOnly: true, secure: true, sameSite: "None" };
      res.cookie("accessToken", accessToken, options);
      res.cookie("refreshToken", user.refreshToken, options);
      res.status(200).json({
        success: true,
        message: "Access token refreshed",
        refreshToken: user.refreshToken,
        user: userDetails._doc,
        restaurant: restaurantDetails._doc,
        accessToken,
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Refresh Token expired" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in refreshing access token", success: false });
  }
};
