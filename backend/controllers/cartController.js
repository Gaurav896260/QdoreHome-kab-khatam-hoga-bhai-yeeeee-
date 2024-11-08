import Cart from "../models/Cart.js";
import mongoose from "mongoose";

// Get cart by user ID
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  const { userId, productId, name, price, image, quantity } = req.body;

  if (!userId || !productId || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId,
        name,
        price,
        image,
        quantity,
      });
    }

    await cart.save();
    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    const objectId = mongoose.Types.ObjectId(productId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex((p) =>
      p.productId.equals(objectId)
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: error.message });
  }
};

export const UpdateItem = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body; // Assuming we are updating the quantity of the product

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const product = cart.products.find(
      (item) => item._id.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the product's quantity (or other details as needed)
    if (quantity) {
      product.quantity = quantity;
    }

    // Save the updated cart
    await cart.save();

    return res
      .status(200)
      .json({ message: "Product updated successfully", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
