import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  console.log("adminAuth middleware called");
  try {
    const { userId } = req.body;
    console.log("User ID in request body:", userId);

    // Find the user
    const user = await userModel.findById(userId);
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      console.log("User not found");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is admin
    console.log("User role:", user.role);
    if (user.role !== "admin") {
      console.log("User is not admin");
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    console.log("Admin authentication successful");
    // If user is admin, proceed
    next();
  } catch (error) {
    console.log("Admin auth error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default adminAuth;
