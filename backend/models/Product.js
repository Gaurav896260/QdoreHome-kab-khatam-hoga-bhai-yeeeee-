import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true }, // Custom ID
  name: String,
  description: [String],
  price: Number,
  imageUrl: String,
});

export default mongoose.model("Product", productSchema);
