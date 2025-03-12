import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../utils/appError";
import { config } from "../config/app.config";
import { asyncHandler } from "./asyncHandler.middleware";

export const isAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token; 
    if (!token) throw new UnauthorizedException("Please authenticate.");

    const decoded = jwt.verify(token, config.JWT_SECRET) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    throw new UnauthorizedException("Invalid or expired token.");
  }
});
