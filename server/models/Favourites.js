const mongoose = require("mongoose");

const FavouritesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  type:{
    type: String,
    required:[true,"Favourite type is required"]
  },
  restaurant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"restaurants",
    default:''
  },
  menuitem:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"menuitems",
    default:''
  }
});

module.exports = mongoose.model("favourites", FavouritesSchema);
