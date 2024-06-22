const express = require("express");
const router = express.Router();
const favouritesController = require("../controllers/favouritesController");
const { verifyAccessToken } = require("../middlewares/verifyAccessToken");
router.post(
  "/markRestaurantAsFavourite",
  verifyAccessToken,
  favouritesController.markRestaurantAsFavourite
);
router.post(
  "/reomveRestaurantFromFavourite",
  verifyAccessToken,
  favouritesController.reomveRestaurantFromFavourite
);
router.post(
  "/markFoodItemAsFavourite",
  verifyAccessToken,
  favouritesController.markFoodItemAsFavourite
);
router.post(
  "/removeFoodItemFromFavourite",
  verifyAccessToken,
  favouritesController.removeFoodItemFromFavourite
);
router.get(
  "/getFavouritesByCustomerid",
  verifyAccessToken,
  favouritesController.getFavouritesByCustomerid
);
module.exports = router;
