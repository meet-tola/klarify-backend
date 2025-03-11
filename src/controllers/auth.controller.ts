import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { 
  registerUserService, 
  verifyUserService, 
  confirmVerificationCodeService, 
  resendVerificationCodeService, 
  resetPasswordService 
} from "../services/auth.service";
import { UnauthorizedException } from "../utils/appError";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);
  const { user } = await registerUserService(body);

  req.session.userId = user._id;
  res.status(HTTPSTATUS.CREATED).json({ 
    message: "Registration successful. Check your email for the verification code.", 
    user 
  });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  const userId = req.session.userId;
  if (!userId) throw new UnauthorizedException("Session expired. Please log in again.");

  const { user } = await confirmVerificationCodeService(userId, code);
  res.status(HTTPSTATUS.OK).json({ message: "Email verified successfully.", user });
});

export const resendVerificationCode = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.session.userId;
  if (!userId) throw new UnauthorizedException("Session expired. Please log in again.");

  const response = await resendVerificationCodeService(userId);
  res.status(HTTPSTATUS.OK).json(response);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user } = await verifyUserService(email, password);

  req.session.userId = user._id;
  res.status(HTTPSTATUS.OK).json({ message: "Logged in successfully", user });
});

export const logOut = asyncHandler(async (req: Request, res: Response) => {
  req.session = null;
  res.status(HTTPSTATUS.OK).json({ message: "Logged out successfully" });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  const userId = req.session.userId;
  if (!userId) throw new UnauthorizedException("Session expired. Please log in again.");

  const response = await resetPasswordService(userId, newPassword);
  res.status(HTTPSTATUS.OK).json(response);
});
