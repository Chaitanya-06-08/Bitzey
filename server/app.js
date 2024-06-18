const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config({
  path: "./.env",
});

//3rd party package requirements
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
//routes
const authRoute = require("./routes/Auth");
const imageHandlingRoute = require("./routes/ImageHandling");
const restaurantAdminRoute=require('./routes/RestaurantAdmin')
const restaurantsRoute=require('./routes/Restaurants')

app.use("/api", authRoute);
app.use("/api", imageHandlingRoute);
app.use("/api", restaurantAdminRoute);
app.use("/api", restaurantsRoute);

mongoose
  .connect(process.env.MONGO_DB_URI, {
    dbName: "Bitzey",
  })
  .then((res) => {
    app.listen(3000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log("Error in connecting to database\n" + err);
  });
