import express from "express";
import crypto from "crypto";
import { sendResetEmail } from "../utils/email.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import {
  CheckUser,
  Login,
  Logout,
  register,
  registerVendor,
} from "../controllers/Auth.js";
import { isUser } from "../middleware/verifyToken.js";


const AuthRoutes = express.Router();

// Existing routes
AuthRoutes.post("/register", register);
AuthRoutes.post("/registerVendor", registerVendor);
AuthRoutes.post("/login", Login);
AuthRoutes.post("/logout", Logout);
AuthRoutes.get("/checkUser", isUser, CheckUser);

// New routes for password reset

// Forgot password route: generates reset token and sends the email
AuthRoutes.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a reset token and save it in the user's record
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.tokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Generate the reset password link
    const resetLink = `http://localhost:5173/reset-password/${token}`; 

    // Send the reset email
    const emailSent = await sendResetEmail(email, resetLink);

    if (emailSent) {
      res.status(200).json({ message: "Reset email sent" });
    } else {
      res.status(500).json({ message: "Failed to send email" });
    }
  } catch (err) {
    console.error("Forgot password error:", err); // Enhanced logging
    res.status(500).json({ message: "Server error" });
  }
});

// Password reset route: validates token and resets the password
AuthRoutes.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    console.log(`Processing reset request for token: ${token}`);

    // Ensure the token is valid and not expired
    const user = await User.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() }, // Check if token is expired
    });

    if (!user) {
      console.log("Invalid or expired token detected");
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log(`Reset password for user: ${user.email}`);
    
    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Clear the reset token and expiry after successful reset
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();

    console.log("Password reset completed successfully");
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err); // Enhanced logging
    res.status(500).json({ message: "Server error" });
  }
});

export default AuthRoutes;
