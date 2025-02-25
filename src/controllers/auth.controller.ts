import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerSchema } from "../validation/auth.validation";
import { HTTPSTATUS } from "../config/http.config";
import { registerUserService, verifyUserService } from "../services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body = registerSchema.parse({ ...req.body });

  const { user } = await registerUserService(body);

  // Store user ID in the session
  req.session.userId = user._id;

  return res.status(HTTPSTATUS.CREATED).json({
    message: "User created successfully",
    user,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { user } = await verifyUserService(email, password);

  // Store user ID in the session
  req.session.userId = user._id;

  return res.status(HTTPSTATUS.OK).json({
    message: "Logged in successfully",
    user,
  });
});

export const logOut = asyncHandler(async (req: Request, res: Response) => {
  // Destroy session
  req.session = null;

  return res.status(HTTPSTATUS.OK).json({ message: "Logged out successfully" });
});
