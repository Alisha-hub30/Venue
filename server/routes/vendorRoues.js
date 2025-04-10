// routes/vendorRoutes.js
import express from "express";
import { isVendor } from "../middleware/verifyToken.js";

// You'll need to create these controller functions
import {
  getVendorDashboard,
  updateVendorProfile,
} from "../controllers/vendor.js";

const vendorRoutes = express.Router();

vendorRoutes.get("/dashboard", isVendor, getVendorDashboard);
vendorRoutes.put("/profile", isVendor, updateVendorProfile);

export default vendorRoutes;
