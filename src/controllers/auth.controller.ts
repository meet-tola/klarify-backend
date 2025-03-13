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
import { setToken } from "../utils/token";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);
  const { user } = await registerUserService(body);

  const token = setToken(user._id.toString());
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  res.status(HTTPSTATUS.CREATED).json({
    message: "Registration successful. Check your email for the verification code.",
    user,
    token
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
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  return res.status(HTTPSTATUS.OK).json({
    message: "Logged in successfully",
    token,
    user,
  });
});

export const logOut = asyncHandler(async (req: Request, res: Response) => {
  try {
    res.cookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    return res.status(HTTPSTATUS.OK).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to log out" });
  }
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  const userId = req.user?.userId;
  if (!userId) throw new UnauthorizedException("Session expired. Please log in again.");

  const response = await resetPasswordService(userId, newPassword);
  res.status(HTTPSTATUS.OK).json(response);
});