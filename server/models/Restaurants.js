const mongoose = require("mongoose");
const LocationSchema = require("./Locations");

const RestaurantSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Restaurant Name is required"],
  },
  imageUrl: {
    type: String,
    require: [true, "Restaurant Image is required"],
  },
  public_id: {
    type: String,
    require: [true, "Public ID is required"],
  },
  location: {
    type: LocationSchema,
    required: [true, "Loaction Required"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  cuisines: [
    {
      type: String,
    },
  ],
  opentime: {
    type: Date,
    required: true,
  },
  closetime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("restaurants", RestaurantSchema);
