const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middlewares/verifyAccessToken");
const userController = require("../controllers/userController");
router.post(
  "/setUserProfileImage",
  verifyAccessToken,
  userController.setUserProfileImage
);
router.post(
  "/removeUserProfileImage",
  verifyAccessToken,
  userController.removeUserProfileImage
);
router.post(
  "/updateUserEmail",
  verifyAccessToken,
  userController.updateUserEmail
);
module.exports = router;
