const adminAuth = async (req, res, next) => {
  console.log("adminAuth middleware called");
  try {
    const userId = req.userId; // From userAuth middleware

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin auth error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
