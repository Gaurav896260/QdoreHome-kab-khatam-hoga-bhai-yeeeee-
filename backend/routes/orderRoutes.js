import express from "express";
import Order from "../models/orderDetails.js"; // Adjust path if necessary
import axios from "axios";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getOrder,
  getOrderById,
  cancelOrder,
  TrackOrder,
  changeShippingAddress,
  ReturnOrder,
  DownloadInvoice,
  createBuynowOrder,
  getShiprocketResponse,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/users/orders", authenticate, createOrder);
router.post("/users/buynoworder", authenticate, createBuynowOrder);
router.get("/users/orders/:userId", authenticate, getOrder);
router.get("/orders/:orderId", getOrderById);
router.get("/orders/:orderId/shiprocketresponse", getShiprocketResponse);
router.patch("/orders/:orderId/cancel", authenticate, cancelOrder);
router.get("/orders/:orderId/track", authenticate, TrackOrder);
router.patch("/orders/:orderId/return", authenticate, ReturnOrder);
router.post("/orders/:orderId/invoice", authenticate, DownloadInvoice);
router.patch(
  "/orders/:orderId/change-address",
  authenticate,
  changeShippingAddress
);

// Get all orders of a user
router.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }); // Assuming each order has a 'user' field referencing the MongoDB ObjectId of the user
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});
export default router;