import express from "express";
import { 
  register, 
  login, 
  verifyEmail, 
  resendVerificationCode, 
  logOut, 
  requestPasswordReset,
  validateResetToken,
  completePasswordReset,
} from "../controllers/auth.controller";
import isAuthenticated from "../middlewares/isAuthenticated.middleware";

const router = express.Router();

router.post("/register", register); 
router.post("/login", login); 
router.post("/logout", logOut); 
router.post("/verify-email", isAuthenticated, verifyEmail); 
router.post("/resend-verification-code", isAuthenticated, resendVerificationCode); 
router.post("/request-password-reset", requestPasswordReset); 
router.get("/validate-reset-token/:token", validateResetToken); 
router.post("/complete-password-reset", completePasswordReset); 

export default router;