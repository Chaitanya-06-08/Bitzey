const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const {verifyAccessToken} = require("../middlewares/verifyAccessToken");
router.post("/placeOrder", verifyAccessToken, ordersController.placeOrder);
router.get(
  "/getOrdersByCustomerId",
  ordersController.getOrdersByCustomerId
);
router.post('/cancelOrder',ordersController.cancelOrder)
module.exports = router;
