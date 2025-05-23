import mongoose from "mongoose";
import BookingModel from "../models/booking.js";
import ServiceModel from "../models/service.js";
import UserModel from "../models/user.js";

const getVendorDashboard = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Vendor information is missing.",
      });
    }

    const vendorId = req.user._id;

    // Get counts for dashboard statistics
    const [
      servicesCount,
      bookingsCount,
      pendingBookingsCount,
      completedBookingsCount,
    ] = await Promise.all([
      ServiceModel.countDocuments({ vendor: vendorId }),
      BookingModel.countDocuments({ vendor: vendorId }),
      BookingModel.countDocuments({ vendor: vendorId, status: "pending" }),
      BookingModel.countDocuments({ vendor: vendorId, status: "completed" }),
    ]);

    res.status(200).json({
      success: true,
      message: "Vendor dashboard data fetched successfully",
      data: {
        vendor: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          createdAt: req.user.createdAt,
        },
        statistics: {
          totalServices: servicesCount,
          totalBookings: bookingsCount,
          pendingBookings: pendingBookingsCount,
          completedBookings: completedBookingsCount,
        },
      },
    });
  } catch (error) {
    console.error("Error in getVendorDashboard:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateVendorProfile = async (req, res) => {
  try {
    const { name, phone, description } = req.body;
    const vendorId = req.user._id;

    const updatedVendor = await UserModel.findByIdAndUpdate(
      vendorId,
      {
        name,
        phone,
        description,
      },
      { new: true, select: "-password" }
    );

    if (!updatedVendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor profile updated successfully",
      vendor: updatedVendor,
    });
  } catch (error) {
    console.error("Error in updateVendorProfile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const addService = async (req, res) => {
  try {
    const {
      title,
      category,
      location,
      vendorName,
      priceType,
      basePrice,
      shortDescription,
      fullDescription,
      image,
      comesWith,
      servicesOffered,
      priceUnit,
      maxPrice,
      discount,
      yearsInBusiness,
      eventsCompleted,
      teamSize,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "title",
      "category",
      "location",
      "vendorName",
      "priceType",
      "basePrice",
      "shortDescription",
      "fullDescription",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate numeric fields
    if (isNaN(basePrice) || (priceType === "range" && isNaN(maxPrice))) {
      return res.status(400).json({
        success: false,
        message: "Invalid numeric values for price fields.",
      });
    }

    // Validate comesWith array
    if (comesWith && comesWith.length > 10) {
      return res.status(400).json({
        success: false,
        message: "You can only add up to 10 items in 'What it comes with'.",
      });
    }

    const vendorId = req.user._id;

    const newService = new ServiceModel({
      title,
      category,
      location,
      vendorName,
      priceType,
      basePrice,
      shortDescription,
      fullDescription,
      image: image || "default-service.jpg",
      comesWith: comesWith || [],
      servicesOffered: servicesOffered || [],
      priceUnit,
      maxPrice: priceType === "range" ? maxPrice : undefined,
      discount,
      yearsInBusiness,
      eventsCompleted,
      teamSize,
      vendor: vendorId,
      status: "pending",
    });

    await newService.save();

    res.status(201).json({
      success: true,
      message: "Service added successfully and is pending approval.",
      service: newService,
    });
  } catch (error) {
    console.error("Error in addService:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getVendorServices = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const { status } = req.query;

    const filter = { vendor: vendorId };
    if (status) {
      filter.status = status;
    }

    const services = await ServiceModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Error in getVendorServices:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const vendorId = req.user._id;
    const updates = req.body;

    // Ensure vendor can only update their own services
    const service = await ServiceModel.findOne({
      _id: serviceId,
      vendor: vendorId,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found or you don't have permission to update it",
      });
    }

    // Don't allow changing status directly (should have separate endpoint for approval)
    if (updates.status && updates.status !== service.status) {
      return res.status(400).json({
        success: false,
        message: "Cannot manually change service status",
      });
    }

    // Validate comesWith array
    if (updates.comesWith && updates.comesWith.length > 10) {
      return res.status(400).json({
        success: false,
        message: "You can only add up to 10 items in 'What it comes with'.",
      });
    }

    // Don't allow changing vendor or vendorName
    delete updates.vendor;
    delete updates.vendorName;

    const updatedService = await ServiceModel.findByIdAndUpdate(
      serviceId,
      updates,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Error in updateService:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const vendorId = req.user._id;

    // Ensure vendor can only delete their own services
    const service = await ServiceModel.findOne({
      _id: serviceId,
      vendor: vendorId,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found or you don't have permission to delete it",
      });
    }

    // Check if there are any active bookings for this service
    const activeBookings = await BookingModel.find({
      service: serviceId,
      status: { $in: ["pending", "confirmed"] },
    });

    if (activeBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete service with active bookings",
        activeBookingsCount: activeBookings.length,
      });
    }

    await ServiceModel.findByIdAndDelete(serviceId);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteService:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getVendorBookings = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const { status } = req.query;

    const filter = { vendor: vendorId };
    if (status) {
      filter.status = status;
    }

    const bookings = await BookingModel.find(filter)
      .populate({
        path: "service",
        select: "title image basePrice",
      })
      .populate({
        path: "user",
        select: "name email phone",
      })
      .sort({ bookingDate: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Error in getVendorBookings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const vendorId = req.user._id;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format",
      });
    }

    // Verify the booking belongs to this vendor
    const booking = await BookingModel.findOne({
      _id: bookingId,
      vendor: vendorId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or you don't have permission to update it",
      });
    }

    // Validate status transition
    const validTransitions = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["completed", "cancelled"],
      completed: [],
      cancelled: [],
    };

    if (!validTransitions[booking.status].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from ${booking.status} to ${status}`,
      });
    }

    booking.status = status;

    // If marking as completed, set completedAt timestamp
    if (status === "completed") {
      booking.completedAt = new Date();
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Error in updateBookingStatus:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get booking details
const getBookingDetails = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const vendorId = req.user._id;

    const booking = await BookingModel.findOne({
      _id: bookingId,
      vendor: vendorId,
    })
      .populate({
        path: "service",
        select: "title image basePrice vendorName",
      })
      .populate({
        path: "user",
        select: "name email phone",
      });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or you don't have permission to view it",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Error in getBookingDetails:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  addService,
  deleteService,
  getBookingDetails,
  getVendorBookings,
  getVendorDashboard,
  getVendorServices,
  updateBookingStatus,
  updateService,
  updateVendorProfile,
};
