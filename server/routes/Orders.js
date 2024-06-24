const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const { verifyAccessToken } = require("../middlewares/verifyAccessToken");
router.post("/placeOrder", verifyAccessToken, ordersController.placeOrder);
router.get(
  "/getOrdersByCustomerId",
  verifyAccessToken,
  ordersController.getOrdersByCustomerId
);
router.get(
  "/getOrdersByRestaurantId",
  verifyAccessToken,
  ordersController.getOrdersByRestaurantId
);
router.post("/cancelOrder", verifyAccessToken, ordersController.cancelOrder);
router.post(
  "/updateOrderStatus",
  verifyAccessToken,
  ordersController.updateOrderStatus
);
router.get(
  "/getDashboardDetails",
  verifyAccessToken,
  ordersController.getDashboardDetails
);
module.exports = router;
