import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAdminStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalOrders = await Order.countDocuments();

    const totalProducts = await Product.countDocuments();

    const orders = await Order.find();

    const totalIncome = orders.reduce(
      (acc, order) => acc + order.totalPrice,0);

    res.status(200).json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalIncome,
    });

  } catch (err) {

    res.status(500).json({
      message: "Error fetching admin stats",
      error: err.message,
    });
  }
};












