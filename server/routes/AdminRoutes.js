import express from "express";
import {
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
} from "../controllers/Admin.js";
import { isAdmin } from "../middleware/verifyToken.js";

const AdminRoutes = express.Router();
AdminRoutes.get("/getuser", isAdmin, Getuser);
AdminRoutes.get("/getvendors", isAdmin, GetVendors);
AdminRoutes.get("/getservices", isAdmin, getAllServicesForAdmin);
AdminRoutes.delete("/delete/:id", isAdmin, deleteUser);
AdminRoutes.delete("/vendor/:id", isAdmin, deleteVendor);
AdminRoutes.put("/services/:id/status", isAdmin, updateServiceStatus);
AdminRoutes.delete("/services/:id", isAdmin, deleteService);
AdminRoutes.post("/contact", submitContactForm);
AdminRoutes.get("/contact-submissions", isAdmin, getContactSubmissions);
AdminRoutes.put(
  "/contact-submissions/:id/read",
  isAdmin,
  updateSubmissionStatus
);
AdminRoutes.delete(
  "/contact-submissions/:id",
  isAdmin,
  deleteContactSubmission
);

export default AdminRoutes;
