const Restaurant = require("../models/Restaurants");
const MenuItem = require("../models/MenuItems");
const { ObjectId } = require("mongoose").Types;
module.exports.fetchRestaurants = async (req, res) => {
  try {
    let restaurants = await Restaurant.find({}).select("-user_id");
    res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      restaurants,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error in fetching restaurants",
    });
  }
};

module.exports.getRestauarntById = async (req, res) => {
  // console.log(req.query);
  let _id = req.query._id;
  if (!_id) {
    return res.status(400).json({
      status: false,
      message: "Require restaurant ID",
    });
  }
  try {
    let restaurant = await Restaurant.findById(_id);
    // console.log(restaurant);
    res.status(200).json({
      success: true,
      message: "Restaurant page fetched successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error in fetching restaurants",
    });
  }
};

module.exports.getMenuByRestaurantId = async (req, res) => {
  let _id = req.query._id;
  if (!_id) {
    return res.status(400).json({
      status: false,
      message: "Require restaurant ID",
    });
  }
  let menuitems = await MenuItem.aggregate([
    {
      $match: { restaurant_id: new ObjectId(_id) },
    },
    {
      $group: {
        _id: "$category",
        category_count: { $sum: 1 },
        items: { $push: "$$ROOT" },
      },
    },
  ]);
  // console.log(menuitems);
  res.status(200).json({
    success: true,
    message: "Restaurant page fetched successfully",
    menuitems,
  });
};
