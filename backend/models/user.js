import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

const addressSchema = mongoose.Schema({
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  nearestLocation: {
    type: String,
    required: false,
  },
  isDefault: { type: Boolean, default: false },
});

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    mobile: {
      type: String,
      required: true,
    },
    profileComplete: { type: Boolean, default: false },
    addresses: [addressSchema],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    fbUserId: {
      type: String, // Add this field if you want to store the Firebase ID separately
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;