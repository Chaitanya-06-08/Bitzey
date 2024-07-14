const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");
const { verifyAccessToken } = require("../middlewares/verifyAccessToken");

router.get(
  "/getPaymentAPIKey",
  verifyAccessToken,
  paymentsController.getPaymentAPIKey
);
router.post(
  "/createPaymentOrder",
  verifyAccessToken,
  paymentsController.createPaymentOrder
);
router.post("/paymentVerification", paymentsController.paymentVerification);
router.get("/getPaymentStatus", paymentsController.getPaymentStatus);
module.exports = router;
