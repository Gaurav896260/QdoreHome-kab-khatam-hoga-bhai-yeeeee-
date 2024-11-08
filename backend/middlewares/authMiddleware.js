import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import User from "../models/user.js";
import asyncHandler from "./asyncHandler.js";
import serviceAccount from "./qdore-home2-437014-firebase-adminsdk-r988j-b726ce468a.json" assert { type: "json" };

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token received:", token);

    try {
      let decodedToken;
      let user;

      // Try to verify as a Firebase token
      try {
        decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded Firebase token:", decodedToken);
        user = await User.findOne({ email: decodedToken.email });
      } catch (firebaseError) {
        console.log("Not a valid Firebase token, trying JWT...");

        // If Firebase verification fails, try JWT
        try {
          decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          console.log("Decoded JWT token:", decodedToken);
          user = await User.findById(decodedToken.id);
        } catch (jwtError) {
          throw new Error("Invalid token");
        }
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in auth middleware:", error);
      return res.status(401).json({
        message: "Not authorized, token failed",
        error: error.message,
      });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});

// Admin authorization middleware
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

export { authenticate, authorizeAdmin };
