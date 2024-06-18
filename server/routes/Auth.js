const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const { verifyAccessToken } = require("../middlewares/verifyAccessToken");
const upload=require('../middlewares/multer')
router.post("/login/customer", authController.customerLogin);
router.post("/login/restaurant", authController.restaurantLogin);
router.post("/logout", verifyAccessToken, authController.logout);
router.post("/signup/customer", authController.customerSignup);
router.post(
  "/restaurantSignup",
  upload.single("restaurantImage"),
  authController.restaurantSignup
);

router.post('/refreshAccessToken',authController.refreshAccessToken)

module.exports = router;
