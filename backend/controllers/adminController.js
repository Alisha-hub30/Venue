import userModel from "../models/userModel.js";

export const Getuser = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .select("-password -verifyOtp -resetOtp");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const checkAdmin = await userModel.findById(userId);

    if (checkAdmin.role === "admin") {
      return res
        .status(409)
        .json({ success: false, message: "You cannot delete yourself" });
    }

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

export const GetVendors = async (req, res) => {
  try {
    // Find all users with role "vendor"
    const vendors = await userModel
      .find({ role: "vendor" })
      .select("-password -verifyOtp -resetOtp");
    res.status(200).json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;

    // Check if the user exists and is a vendor
    const vendor = await userModel.findById(vendorId);

    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    if (vendor.role !== "vendor") {
      return res
        .status(400)
        .json({ success: false, message: "User is not a vendor" });
    }

    // Delete the vendor
    const deletedVendor = await userModel.findByIdAndDelete(vendorId);

    res.status(200).json({
      success: true,
      message: "Vendor deleted successfully",
      vendor: deletedVendor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};
