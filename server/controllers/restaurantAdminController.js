const checkForEmpty = require("../utils/checkForEmpty");
const MenuItem = require("../models/MenuItems");
const Cloudinary = require("../utils/Cloudinary");
module.exports.addMenuItem = async (req, res) => {
  let {
    name,
    category,
    price,
    imageUrl,
    public_id,
    restaurant_id,
    description,
    servesfor,
    type,
  } = req.body;
  if (
    checkForEmpty([
      name,
      category,
      price,
      imageUrl,
      public_id,
      restaurant_id,
      description,
      servesfor,
      type,
    ])
  ) {
    return res.status(400).json({ message: "required fields are missing" });
  }
  try {
    await MenuItem.create({
      name,
      category,
      imageUrl,
      public_id,
      price,
      description,
      servesfor: parseInt(servesfor),
      type,
      restaurant_id,
    });
    res.status(200).json({ message: "Item created successfully" });
  } catch (error) {
    console.log(error);
    res.status().json({
      success: false,
      message: "Error in fetching items by restaurant id",
    });
  }
};

module.exports.getItemsByRestaurantId = async (req, res) => {
  let restaurant_id = req.query?.restaurant_id;
  if (!restaurant_id) {
    return res
      .status(400)
      .json({ message: "Restaurant ID is missing in request" });
  }
  try {
    let items = await MenuItem.find({ restaurant_id });
    // console.log(items);
    res.status(200).json({ message: "Items fetched", items });
  } catch (error) {
    console.log(error);
    res.status().json({
      success: false,
      message: "Error in fetching items by restaurant id",
    });
  }
};

module.exports.deleteMenuItem = async (req, res) => {
  let { _id, public_id } = req.body;
  if (!_id || !public_id) {
    return res
      .status(400)
      .json({ message: "Menu item ID is missing in request" });
  }
  try {
    const response = await Cloudinary.deleteImage(public_id);
    await MenuItem.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ message: "Item deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status().json({
      success: false,
      message: "Error in fetching items by restaurant id",
    });
  }
};

module.exports.updateMenuItem = async (req, res) => {
  let { _id, name, category, price, description, imageUrl, servesfor, type } =
    req.body;
  if (
    checkForEmpty([
      _id,
      name,
      category,
      price,
      description,
      imageUrl,
      servesfor,
      type,
    ])
  ) {
    return res.status(400).json({ message: "required fields are missing" });
  }
  try {
    let menuItem = await MenuItem.findOne({ _id });
    menuItem.name = name;
    menuItem.category = category;
    menuItem.price = price;
    menuItem.description = description;
    menuItem.imageUrl = imageUrl;
    menuItem.servesfor = servesfor;
    menuItem.type = type;
    menuItem.save();
    res.status(200).json({ success: true, message: "Item Updated" });
  } catch (error) {
    console.log(error);
    res.status().json({
      success: false,
      message: "Error in updating item",
    });
  }
};
