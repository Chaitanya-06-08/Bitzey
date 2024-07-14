const checkForempty = require("../utils/checkForEmpty");
const Order = require("../models/Orders");
const MenuItem = require("../models/MenuItems");
const { ObjectId } = require("mongoose").Types;
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
    payment_reference_id,
  } = req.body;
  // console.log(req.body);
  if (
    checkForempty([
      user_email,
      customerName,
      restaurant_id,
      totalPrice,
      deliveryStatus,
      paymentStatus,
      payment_reference_id,
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
      payment_reference_id,
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
    let orders = await Order.find({ user_id: _id })
      .populate("items.item_id restaurant_id")
      .sort({ createdAt: -1 });
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
  let { _id } = req.body;
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
module.exports.updateOrderStatus = async (req, res) => {
  let { status, _id } = req.body;
  if (!_id || !status) {
    return res.status(400).json({ message: "option or Order ID is missing" });
  }
  try {
    await Order.findByIdAndUpdate(_id, {
      deliveryStatus: status,
    });
    res.status(200).json({
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in updating order status", success: false });
  }
};

module.exports.getOrdersByRestaurantId = async (req, res) => {
  let _id = req.query._id;
  if (!_id) {
    return res.status(400).json({ message: "Restaurant ID is missing" });
  }
  try {
    let orders = await Order.find({ restaurant_id: _id })
      .populate("items.item_id restaurant_id")
      .sort({ createdAt: -1 });
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

module.exports.getDashboardDetails = async (req, res) => {
  let { _id, year } = req.query;
  if (!_id || !year) {
    return res.status(400).json({
      message:
        "Restaurant ID or year is missing for fetching dashboard details",
    });
  }
  try {
    let orders = await Order.aggregate([
      {
        $match: { restaurant_id: new ObjectId(_id) },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $cond: [
                { $eq: ["$deliveryStatus", "delivered"] },
                "$totalPrice",
                0,
              ],
            },
          },
          totalCustomers: { $addToSet: "$user_id" },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalCustomers: { $size: "$totalCustomers" },
          totalOrders: 1,
        },
      },
    ]);
    let menuitems = await MenuItem.countDocuments({ restaurant_id: _id });

    let categoryData = await MenuItem.aggregate([
      {
        $match: { restaurant_id: new ObjectId(_id) },
      },
      {
        $group: {
          _id: "$category",
          categoryCount: { $sum: 1 },
        },
      },
    ]);

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    let revenueData = await Order.aggregate([
      {
        $match: {
          restaurant_id: new ObjectId(_id),
          createdAt: { $gt: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenueOfMonth: {
            $sum: {
              $cond: [
                { $eq: ["$deliveryStatus", "delivered"] },
                "$totalPrice",
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    console.log(revenueData);
    let dashboardDetails =
      orders.length == 0
        ? {
            totalRevenue: 0,
            totalCustomers: 0,
            totalOrders: 0,
            totalMenuItems: 0,
            categoryData: [],
          }
        : {
            ...orders[0],
            totalMenuItems: menuitems,
            categoryData,
            revenueData,
          };
    res.status(200).json({
      message: "Dashboard details fetched successfully",
      dashboardDetails,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in fetching dashboard details", success: false });
  }
};
