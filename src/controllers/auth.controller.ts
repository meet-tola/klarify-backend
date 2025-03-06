import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { registerUserService, verifyUserService, confirmVerificationCodeService } from "../services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);
  const { user } = await registerUserService(body);

  req.session.userId = user._id;
  res.status(HTTPSTATUS.CREATED).json({ message: "Registration successful. Check your email for the verification code.", user });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const { user } = await confirmVerificationCodeService(email, code);

  res.status(HTTPSTATUS.OK).json({ message: "Email verified successfully.", user });
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
