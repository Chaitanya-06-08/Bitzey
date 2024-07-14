const mongoose = require("mongoose");
const LocationSchema = require("./Locations");
const OrdersSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
    items: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "menuitems",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryLocation: {
      type: LocationSchema,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    payment_reference_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "orders" }
);

module.exports = mongoose.model("orders", OrdersSchema);
