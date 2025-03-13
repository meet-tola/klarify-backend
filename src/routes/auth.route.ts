import express from "express";
import { 
  register, 
  login, 
  verifyEmail, 
  resendVerificationCode, 
  logOut, 
  resetPassword,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const router = express.Router();

router.post("/register", register); 
router.post("/login", login); 
router.post("/logout", logOut); 
router.post("/verify-email", isAuthenticated, verifyEmail); 
router.post("/resend-verification-code", isAuthenticated, resendVerificationCode); 
router.post("/reset-password", isAuthenticated, resetPassword); 

export default router;