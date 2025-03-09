import { Router } from "express";
import {
  login,
  logOut,
  register,
  verifyEmail,
  resendVerificationCode,
  resetPassword
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/verify-email", verifyEmail);
authRoutes.post("/resend-verification-code", resendVerificationCode);
authRoutes.post("/reset-password", resetPassword);
authRoutes.post("/login", login);
authRoutes.post("/logout", logOut);

export default authRoutes;
