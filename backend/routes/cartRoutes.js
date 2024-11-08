import express from "express";
import {
  getCart,
  addToCart,
  UpdateItem,
} from "../controllers/cartController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/cart/:userId", authenticate, getCart);
router.post("/cart", authenticate, addToCart);
router.patch("/cart/:userId/update/:productId", authenticate, UpdateItem);

export default router;
