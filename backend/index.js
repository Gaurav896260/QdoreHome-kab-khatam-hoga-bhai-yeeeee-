// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
// Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { authenticate } from "./middlewares/authMiddleware.js";
import User from "./models/user.js";
import Cart from "./models/Cart.js";

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

// Configuration
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(helmet());
app.use(xss());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/users", userRoutes);
app.use("/api/send-email", mailRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

// Checkout route
app.post("/api/checkout", async (req, res) => {
  const { userId, productId, name, price, image, quantity, address } = req.body;

  if (
    !userId ||
    !productId ||
    !name ||
    !price ||
    !image ||
    !quantity ||
    !address
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newOrder = new Order({
      userId,
      products: [
        {
          productId,
          name,
          price,
          image,
          quantity,
        },
      ],
      totalAmount: price * quantity,
      address, // Include the selected address
    });

    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order created successfully!", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later." });
  }
});

// Express.js route for updating phone number
app.post("/api/users/update-phone", authenticate, async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const userId = req.user.id; // Assuming req.user.id contains the authenticated user's ID

    // Validate phoneNumber
    if (!phoneNumber || typeof phoneNumber !== "string") {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // Find the user and update the phone number
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.mobile = phoneNumber;
    await user.save();

    res.status(200).json({ message: "Phone number updated successfully" });
  } catch (error) {
    console.error("Error updating phone number:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Example of a backend route for updating an address
app.post("/api/users/address", authenticate, async (req, res) => {
  try {
    const { addressLine1, city, state, pincode, nearestLocation } = req.body;

    // Basic validation
    if (!addressLine1 || !city || !state || !pincode) {
      return res
        .status(400)
        .json({ message: "All address fields are required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push new address to user's addresses array
    const newAddress = {
      addressLine1,
      city,
      state,
      pincode,
      nearestLocation,
    };

    user.addresses.push(newAddress);
    await user.save();

    // Return the newly added address
    res
      .status(201)
      .json({ address: user.addresses[user.addresses.length - 1] });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Error adding address" });
  }
});

// Edit address
app.put("/api/users/address/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { address } = req.body;
    const user = await User.findById(req.user.id);
    const addressIndex = user.addresses.findIndex(
      (a) => a._id.toString() === id
    );
    if (addressIndex > -1) {
      user.addresses[addressIndex].address = address;
      await user.save();
      res.json(user.addresses[addressIndex]);
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating address" });
  }
});

// Express.js route for removing item from cart
app.delete(
  "/api/cart/:userId/remove/:productId",
  authenticate,
  async (req, res) => {
    try {
      const { userId, productId } = req.params;

      // Validate the productId and userId
      if (!userId || !productId) {
        return res
          .status(400)
          .json({ message: "User ID or Product ID is missing" });
      }

      // Find the cart for the user
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Remove the item from the cart
      const productIndex = cart.products.findIndex(
        (item) => item._id.toString() === productId
      );

      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      // Remove the product from the cart
      cart.products.splice(productIndex, 1);

      // Save the updated cart
      await cart.save();

      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      res.status(500).json({ message: error.message });
    }
  }
);

// Static Files
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
