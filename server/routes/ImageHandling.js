const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const ImageHandling = require("../controllers/ImageHandling");
router.post(
  "/uploadToCloudinary",
  upload.single("image"),
  ImageHandling.uploadImage
);
router.post('/deleteImageFromCloudinary',ImageHandling.deleteImage)

module.exports = router;
