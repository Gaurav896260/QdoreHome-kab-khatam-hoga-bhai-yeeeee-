import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    address: {
      line1: { type: String, required: true },
      line2: { type: String, required: false },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String },
    paymentStatus: { type: String, default: "Pending" },
    orderStatus: { type: String, default: "Processing" },
    transactionId: { type: String },
    shiprocketOrderId: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
