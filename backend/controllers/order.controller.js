import Order from "../models/order.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// Create a new order
export const newOrder = async (req, res) => {
  const {
    name,
    userID,
    email,
    productID,
    productName,
    quantity,
    totalPrice,
    phoneNumber,
    address,
    paymentMethod,
  } = req.body;

  try {
    // Create a new order instance
    const order = new Order({
      name,
      userID,
      email,
      productID,
      productName,
      quantity,
      totalPrice,
      phoneNumber,
      address,
      paymentMethod,
    });

    // Save the order to the database
    const savedOrder = await order.save();
    // Send a response with the created order
    res.status(201).json({
      message: "Order created successfully, emails sent",
      order: savedOrder,
    });

    // Create a transporter object using SMTP transport for sending email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can use other services like SendGrid, Mailgun, etc.
      auth: {
        user: process.env.EMAIL_USER, // Replace with your email
        pass: process.env.EMAIL_PASS, // Replace with your email password or app-specific password
      },
    });

    // Email content for the customer
    const customerMailOptions = {
      from: " The Store Owner <your-email@gmail.com>",
      to: email, // Send to customer email
      subject: "Order Confirmation - Thank you for your purchase!",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for your order. Your order details are as follows:</p>
        <p><strong>Order ID:</strong> ${savedOrder._id}</p>
        <p><strong>Product Name:</strong> ${productName}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <p>We will notify you once your order is dispatched.</p>
        <p>Thank you for shopping with us!</p>
      `,
    };

    // Email content for the admin
    const adminMailOptions = {
      from: "Store Owner <your-email@gmail.com>",
      to: process.env.ADMIN_EMAIL, // Replace with admin email
      subject: "New Order Placed",
      html: `
        <h3>New Order Received</h3>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Order ID:</strong> ${savedOrder._id}</p>
        <p><strong>Product Name:</strong> ${productName}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <p>Please process the order at your earliest convenience.</p>
      `,
    };

    // Send emails to both customer and admin
    await transporter.sendMail(customerMailOptions);
    await transporter.sendMail(adminMailOptions);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const allOrders = async (req, res) => {
  //function to get all the orders
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error", error.message);
    res
      .status(500)
      .json({ message: "Failed to get all orders", error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params; // Extract order ID from URL params
  const { deliveryStatus, paymentMethod } = req.body; // Extract delivery status and payment method from the request body

  try {
    // Find the order by its ID and update the relevant fields
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        deliveryStatus: deliveryStatus, // Update delivery status if provided
        ...(paymentMethod && { paymentMethod }), // Update payment method if provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ message: "Failed to update order", error });
  }
};

export const myOrders = async (req, res) => {
  try {
    // Get the token from headers
    const token = req.headers.authorization.split(" ")[1]; // Bearer token
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify and decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Assuming JWT_SECRET is your secret key
    // console.log('Decoded Token:', decoded); // Check the decoded token

    const userId = decoded.userId; // Extract user ID from the decoded token
    // console.log('User ID:', userId); // Log user ID for debugging
    // console.log('Decoded user ID:', userId);

    // Fetch the user's orders from the database
    const userOrders = await Order.find({ userID: userId }).populate("userID");

    if (userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Send the user's orders as response
    res.status(200).json(userOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch user orders", error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  const { id } = req.params; // Get the order ID from the request parameters

  try {
    // Find the order by ID and update the 'isCancelled' field to true
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { isCancelled: true },
      { new: true } // This option returns the updated document
    );

    // If the order is not found
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Send success response
    res.status(200).json({
      message: "Order cancelled successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({
      message: "Failed to cancel the order",
      error: error.message,
    });
  }
};
