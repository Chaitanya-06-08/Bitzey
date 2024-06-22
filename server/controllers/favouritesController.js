const { User } = require("../models/Users");
module.exports.markRestaurantAsFavourite = async (req, res) => {
  let { user_id, restaurant_id } = req.body;
  if (!restaurant_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Restaurant ID or user Id is missing" });
  }
  try {
    let user = await User.findOne({ _id: user_id });
    user.favouriteRestaurants.push(restaurant_id);
    user.save();
    // console.log(user);
    res.status(200).json({
      message: "Restaurant marked as Favourite successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in marking restaurant as favourite",
      success: false,
    });
  }
};

module.exports.reomveRestaurantFromFavourite = async (req, res) => {
  let { user_id, restaurant_id } = req.body;
  if (!restaurant_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Restaurant ID or user Id is missing" });
  }
  try {
    let user = await User.findOne({ _id: user_id });
    user.favouriteRestaurants = user.favouriteRestaurants.filter(
      (_id) => _id != restaurant_id
    );
    user.save();
    res.status(200).json({
      message: "Restaurant removed from Favourite successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in removing restaurant as favourite",
      success: false,
    });
  }
};
module.exports.markFoodItemAsFavourite = async (req, res) => {
  let { user_id, menuitem_id } = req.body;
  if (!menuitem_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Menuitem ID or user Id is missing" });
  }
  try {
    let user = await User.findOne({ _id: user_id });
    user.favouriteFoodItems.push(menuitem_id);
    user.save();
    console.log(user);
    res.status(200).json({
      message: "Fooditem marked as Favourite successfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Error in marking fooditem as favourite",
      success: false,
    });
  }
};

module.exports.removeFoodItemFromFavourite = async (req, res) => {
  let { user_id, menuitem_id } = req.body;
  if (!menuitem_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Menuitem ID or user Id is missing" });
  }
  try {
    let user = await User.findOne({ _id: user_id });
    user.favouriteFoodItems = user.favouriteFoodItems.filter(
      (_id) => _id != menuitem_id
    );
    user.save();
    res.status(200).json({
      message: "Fooditem removed from Favourite successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in removing fooditem as favourite",
      success: false,
    });
  }
};

module.exports.getFavouritesByCustomerid = async (req, res) => {
  let _id = req.query._id;
  if (!_id) {
    return res
      .status(400)
      .json({ message: "User ID is missing for fetching favourites" });
  }
  try {
    let { favouriteRestaurants, favouriteFoodItems } = await User.findOne({
      _id,
    }).populate("favouriteRestaurants favouriteFoodItems");
    res.status(200).json({
      message: "Favourites fetched successfully",
      favouriteRestaurants,
      favouriteFoodItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in fetching favourites",
      success: false,
    });
  }
};
