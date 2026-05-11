import sendEmail from "../utils/sendEmail.js";
import Order from "../models/Order.js";


// Create Order
export const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, address, paymentId } = req.body;

    if (!products || products.length === 0 || !totalPrice || !address) {
      return res.status(400).json({
        message: "Invalid order data",
      });
    }

    const order = new Order({
      user: req.user._id,
      products,
      totalPrice,
      address,
      paymentId,
    });

    await order.save();

    const message = `
Dear ${req.user.name},

Your order has been created successfully.

Total Price: ₹${totalPrice}

Thank you for shopping with us!
`;

    await sendEmail(
      req.user.email,
      "Order Created Successfully",
      message
    );

    res.status(201).json({
      message: "Order created successfully",
      order,
    });

  } catch (err) {
    res.status(500).json({
      message: "Error creating order",
      error: err.message,
    });
  }
};


// Get All Orders (Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.productId", "name price");

    res.status(200).json(orders);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching orders",
      error: err.message,
    });
  }
};


// Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.productId", "name price");

    // Order not found
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Security check
    // Sirf owner ya admin access kar sakta
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.status(200).json(order);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching order",
      error: err.message,
    });
  }
};


// Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status || order.status;

    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order,
    });

  } catch (err) {
    res.status(500).json({
      message: "Error updating order",
      error: err.message,
    });
  }
};


// Get Logged-in User Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("products.productId", "name price");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};