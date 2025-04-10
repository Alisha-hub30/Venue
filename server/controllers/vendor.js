// controllers/vendor.js
import UserModel from "../models/user.js";

const getVendorDashboard = async (req, res) => {
  try {
    // The vendor's user information is available in req.user thanks to the middleware
    const vendor = req.user;

    // For now, just return the vendor data
    // In a real app, you'd likely include more vendor-specific data
    res.status(200).json({
      success: true,
      message: "Vendor dashboard data fetched successfully",
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        role: vendor.role,
        createdAt: vendor.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

const updateVendorProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const vendorId = req.user._id;

    const updatedVendor = await UserModel.findByIdAndUpdate(
      vendorId,
      { name },
      { new: true }
    );

    if (!updatedVendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Vendor profile updated successfully",
      vendor: {
        id: updatedVendor._id,
        name: updatedVendor.name,
        email: updatedVendor.email,
        role: updatedVendor.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

export { getVendorDashboard, updateVendorProfile };
