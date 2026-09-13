import express from "express"
import { login, register, getAllUsers } from "../controllers/authController.js";
import { resetPassword, verifyEmail, verifyOtp } from "../controllers/passwordController.js";

const authRouter = express.Router();

authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.get("/users", getAllUsers)

authRouter.post("/verify-email", verifyEmail)
authRouter.post("/verify-otp", verifyOtp )
authRouter.post("/reset-password", resetPassword)

export default authRouter