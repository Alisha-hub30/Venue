import express from "express";
import { debugUserRole, getUserData } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.post("/data", userAuth, getUserData);
userRouter.get("/debug-role", userAuth, debugUserRole);

export default userRouter;
