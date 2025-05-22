import ServiceModel from "../models/service.js";
import UserModel from "../models/user.js";

// Get all users
const Getuser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

// Delete user (prevent deleting admin)
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkAdmin = await UserModel.findById(userId);

    if (checkAdmin.role === "admin") {
      return res.status(409).json({ message: "You cannot delete yourself" });
    }

    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

// Get all vendors
const GetVendors = async (req, res) => {
  try {
    const vendors = await UserModel.find({ role: "vendor" });
    res.status(200).json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

// Delete vendor
const deleteVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await UserModel.findById(vendorId);

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

    const deletedVendor = await UserModel.findByIdAndDelete(vendorId);
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

// Update service status (approve/reject)
const updateServiceStatus = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status value. Only 'pending' and 'approved' and 'rejected' are allowed.",
      });
    }

    const service = await ServiceModel.findById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    service.status = status;
    await service.save();

    res.status(200).json({
      success: true,
      message: "Service status updated successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

// Get all services (admin view)
const getAllServicesForAdmin = async (req, res) => {
  try {
    const services = await ServiceModel.find().populate(
      "vendor",
      "name email phone location category price discount"
    );
    res.status(200).json({ success: true, services });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

// ❗️Fixed: Delete service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ServiceModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import ContactModel from "../models/contact.js";

// Submit contact form
const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, contactNo, mobileNo, message } = req.body;

    const newContact = new ContactModel({
      fullName,
      email,
      contactNo,
      mobileNo,
      message,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Thank you for contacting us!",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
    });
    console.log(error);
  }
};

// Get all contact submissions
const getContactSubmissions = async (req, res) => {
  try {
    const submissions = await ContactModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact submissions",
    });
    console.log(error);
  }
};

// Update submission status
const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await ContactModel.findByIdAndUpdate(
      id,
      { status: "read" },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Submission marked as read",
      submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update submission status",
    });
    console.log(error);
  }
};

// Delete contact submission
const deleteContactSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ContactModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete submission",
    });
    console.log(error);
  }
};

export {
  deleteContactSubmission,
  deleteService,
  deleteUser,
  deleteVendor,
  getAllServicesForAdmin,
  getContactSubmissions,
  Getuser,
  GetVendors,
  submitContactForm,
  updateServiceStatus,
  updateSubmissionStatus,
};
