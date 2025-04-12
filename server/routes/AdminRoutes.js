import express from "express";
import {
  deleteUser,
  deleteVendor,
  Getuser,
  GetVendors,
} from "../controllers/Admin.js";
import { isAdmin } from "../middleware/verifyToken.js";

const AdminRoutes = express.Router();
AdminRoutes.get("/getuser", isAdmin, Getuser);
AdminRoutes.get("/getvendors", isAdmin, GetVendors);
AdminRoutes.delete("/delete/:id", isAdmin, deleteUser);
AdminRoutes.delete("/vendor/:id", isAdmin, deleteVendor);

export default AdminRoutes;
