const express = require("express");
const router = express.Router();
const restaurantAdminController = require("../controllers/restaurantAdminController");
const { verifyAccessToken } = require("../middlewares/verifyAccessToken");

router.post(
  "/addMenuItem",
  verifyAccessToken,
  restaurantAdminController.addMenuItem
);
router.get(
  "/getItemsByRestaurantId",
  verifyAccessToken,
  restaurantAdminController.getItemsByRestaurantId
);
router.post(
  "/updateMenuItem",
  verifyAccessToken,
  restaurantAdminController.updateMenuItem
);
router.post(
  "/deleteMenuItem",
  verifyAccessToken,
  restaurantAdminController.deleteMenuItem
);
module.exports = router;
