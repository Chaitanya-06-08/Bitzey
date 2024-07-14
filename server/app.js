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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
//routes
const authRoute = require("./routes/Auth");
const imageHandlingRoute = require("./routes/ImageHandling");
const restaurantAdminRoute = require("./routes/RestaurantAdmin");
const restaurantsRoute = require("./routes/Restaurants");
const ordersRoute = require("./routes/Orders");
const favouritesRoute = require("./routes/Favourites");
const usersRoute = require("./routes/Users");
const paymentsRoute = require("./routes/PaymentsRoute");

app.use("/api", authRoute);
app.use("/api", imageHandlingRoute);
app.use("/api", restaurantAdminRoute);
app.use("/api", restaurantsRoute);
app.use("/api", ordersRoute);
app.use("/api", favouritesRoute);
app.use("/api", usersRoute);
app.use("/api", paymentsRoute);

mongoose
  .connect(process.env.MONGO_DB_URI, {
    dbName: "Bitzey",
  })
  .then((res) => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log("Error in connecting to database\n" + err);
  });
