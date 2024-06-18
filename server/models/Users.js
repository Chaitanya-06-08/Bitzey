const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is empty"],
    },
    email: {
      type: String,
      required: [true, "email is empty"],
    },
    password: {
      type: String,
      required: [true, "password is empty"],
    },
    usertype: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

exports.User = mongoose.model("users", UserSchema);