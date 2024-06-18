const mongoose = require("mongoose");

const MenuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Menu Item Name is required"],
  },
  category: {
    type: String,
    required: [true, "Menu Item category is required"],
  },
  imageUrl: {
    type: String,
    default:''
  },
  public_id: {
    type: String,
    require: [true, "Public ID is required"],
  },
  price: {
    type: Number,
    required:[true,"price is not mentioned"]
  },
  description:{
    type:String,
    required : true
  },
  servesfor:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  restaurant_id :{
    type: mongoose.Schema.Types.ObjectId,
    ref : "restaurants"
  },
});

module.exports=mongoose.model('menuitems',MenuItemsSchema)
