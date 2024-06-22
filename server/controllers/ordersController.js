const checkForempty = require("../utils/checkForEmpty");
const Order = require("../models/Orders");
const { User } = require("../models/Users");
module.exports.placeOrder = async (req, res) => {
  let {
    user_email,
    customerName,
    restaurant_id,
    items,
    totalPrice,
    deliveryLocation,
    deliveryStatus,
    paymentStatus,
  } = req.body;
  console.log(req.body);
  if (
    checkForempty([
      user_email,
      customerName,
      restaurant_id,
      totalPrice,
      deliveryStatus,
      paymentStatus,
    ]) ||
    items?.length == 0 ||
    !deliveryLocation
  ) {
    return res.status(400).json({ message: "Order details are missing" });
  }
  try {
    let { _id } = await User.findOne({ email: user_email });
    let order = await Order.create({
      user_id: _id,
      user_email,
      customerName,
      restaurant_id,
      items,
      totalPrice,
      deliveryLocation,
      deliveryStatus,
      paymentStatus,
    });
    res.status(200).json({ message: "Order created successfully", order });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in creating order", success: false });
  }
};

module.exports.getOrdersByCustomerId = async (req, res) => {
  let _id = req.query._id;
  if (!_id) {
    return res.status(400).json({ message: "Customer ID is missing" });
  }
  try {
    let orders = await Order.find({ user_id: _id }).populate(
      "items.item_id restaurant_id"
    );
    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in creating order", success: false });
  }
};

module.exports.cancelOrder = async (req, res) => {
  let _id = req.query._id;
  if (!_id) {
    return res.status(400).json({ message: "Order ID is missing" });
  }
  try {
    await Order.findByIdAndUpdate(_id, {
      deliveryStatus: "cancelled",
    });
    res.status(200).json({
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in cancelling order", success: false });
  }
};
