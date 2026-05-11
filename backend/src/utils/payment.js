import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (amount) => {
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  const order = await instance.orders.create(options);

  return order;
};