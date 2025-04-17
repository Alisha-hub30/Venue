import express from "express";
import {
  deleteUser,
  deleteVendor,
  Getuser,
  GetVendors,
} from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";

const adminRouter = express.Router();
adminRouter.get("/test", (req, res) => {
  res.json({ success: true, message: "Admin routes are working" });
});
adminRouter.get("/users", userAuth, adminAuth, Getuser);
adminRouter.get("/vendors", userAuth, adminAuth, GetVendors);
adminRouter.delete("/users/:id", userAuth, adminAuth, deleteUser);
adminRouter.delete("/vendors/:id", userAuth, adminAuth, deleteVendor);

export default adminRouter;
