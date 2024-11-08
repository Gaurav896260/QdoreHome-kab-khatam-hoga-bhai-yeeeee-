import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [productSchema],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
