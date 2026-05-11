import crypto from "crypto";

import { createRazorpayOrder } from "../utils/payment.js";

// Create Razorpay Order
export const createdOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
      });
    }

    const order = await createRazorpayOrder(amount);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error creating payment order",
      error: error.message,
    });  
  }
};

// Verify Payment
export const verifypayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error verifying payment",
      error: error.message,
    });
  }
};
