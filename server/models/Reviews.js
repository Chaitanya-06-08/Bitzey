const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  restaurant_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"restaurants"
  },
  review:{
    type:String,
    required:[true,"Review is required"]
  },
  rating:{
    type:mongoose.Schema.Types.Decimal128,
    required:[true,"Rating is required"]
  }
});

module.exports=mongoose.model('reviews',ReviewsSchema)
