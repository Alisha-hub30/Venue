// models/booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    notes: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    // New fields from your form
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    selectedServices: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        basePrice: {
          type: Number,
          required: true,
        },
        description: String,
        isMainService: Boolean,
        extraServiceId: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    // Additional fields that might be useful
    eventType: {
      type: String,
    },
    guestCount: {
      type: Number,
    },
    specialRequests: {
      type: String,
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);
export default BookingModel;
