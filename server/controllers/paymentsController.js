const crypto = require("crypto");
const instance = require("../utils/razorpayInstance");
const Transaction = require("../models/Transactions");

module.exports.getPaymentAPIKey = (req, res) => {
  return res.status(200).json({
    message: "API Key sent for payment",
    key: process.env.RAZORPAY_KEY_ID,
  });
};

module.exports.createPaymentOrder = async (req, res) => {
  const { amount, currency } = req.body;
  if (!amount) {
    return res.status(400).json({
      message: "Amount field is missing for payment",
      success: false,
    });
  }
  try {
    let order = await instance.orders.create({
      amount: Math.round(Number(amount)) * 100,
      currency: currency,
    });
    res.status(200).json({
      message: "Order created for payment",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error in creating order for payment",
    });
  }
};

module.exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  console.log(req.body);
  try {
    const generatedSignature = crypto
      .createHmac("SHA256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    const isSignatureValid = generatedSignature == razorpay_signature;
    if (isSignatureValid) {
      await Transaction.create({
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
        status: "success",
      });
      return res.redirect(
        `${process.env.CLIENT_ORIGIN}/paymentStatus/${razorpay_payment_id}`
      );
    } else {
      await Transaction.create({
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
        status: "failure",
      });
      return res.redirect(`${process.env.CLIENT_ORIGIN}/paymentStatus/${null}`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error in verifying payment",
    });
    return res.redirect(`${process.env.CLIENT_ORIGIN}/paymentStatus/${null}`);
  }
};

module.exports.getPaymentStatus = async (req, res) => {
  const { order_id } = req.query;

  try {
    const transaction = await Transaction.findOne({
      razorpay_order_id: order_id,
    });

    if (!transaction) {
      return res.status(404).json({ status: "not found" });
    }

    res.status(200).json({
      status: transaction.status,
      payment_reference_id: transaction.razorpay_payment_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching payment status" });
  }
};
