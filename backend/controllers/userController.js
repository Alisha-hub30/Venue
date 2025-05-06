// controllers/userController.js
import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId; // From middleware

    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const user = await userModel.findById(userId); // Fetch the user from DB

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    console.log("Full user from DB:", user); // <-- This will log the entire user object, including the role

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        role: user.role, // Ensure role is included here
        isAccountVerified: user.isAccountVerified,
      },
      debugFields: Object.keys(user.toObject ? user.toObject() : user), // Optional: log all user fields for debugging
    });
  } catch (error) {
    console.error("Get user data error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add this to your userController.js
export const debugUserRole = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    res.json({
      success: true,
      debugInfo: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasRole: !!user.role,
        allFields: Object.keys(user.toObject()),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
