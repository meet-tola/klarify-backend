import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import {
  registerUserService,
  verifyUserService,
  confirmVerificationCodeService,
  resendVerificationCodeService,
  validatePasswordResetTokenService,
  completePasswordResetService,
  requestPasswordResetService
} from "../services/auth.service";
import { UnauthorizedException } from "../utils/appError";
import { setToken } from "../utils/token";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);
  const { user } = await registerUserService(body);

  const token = setToken(user._id.toString());

  res.status(HTTPSTATUS.CREATED).json({
    message: "Registration successful. Check your email for the verification code.",
    user,
    token, 
  });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedException("Session expired. Please log in again.");

  const { user } = await confirmVerificationCodeService(userId, code);

  res.status(HTTPSTATUS.OK).json({ message: "Email verified successfully.", user });
});

export const resendVerificationCode = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedException("Session expired. Please log in again.");

  const response = await resendVerificationCodeService(userId);
  res.status(HTTPSTATUS.OK).json(response);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user } = await verifyUserService(email, password);

  const token = setToken(user._id.toString());

  res.status(HTTPSTATUS.OK).json({
    message: "Logged in successfully",
    token, 
    user,
  });
});

export const logOut = asyncHandler(async (req: Request, res: Response) => {
  return res.status(HTTPSTATUS.OK).json({ message: "Logged out successfully" });
});

export const requestPasswordReset = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  await requestPasswordResetService(email);
  
  res.status(HTTPSTATUS.OK).json({
    message: "If an account with that email exists, a password reset link has been sent."
  });
});

export const validateResetToken = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.params;
  await validatePasswordResetTokenService(token);
  
  res.status(HTTPSTATUS.OK).json({
    message: "Token is valid"
  });
});

export const completePasswordReset = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  await completePasswordResetService(token, newPassword);
  
  res.status(HTTPSTATUS.OK).json({
    message: "Password has been reset successfully"
  });
});
