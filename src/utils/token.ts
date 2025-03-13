import { Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";


export const setToken = (res: Response, userId: string): string => {
  const accessToken = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: "15m" }); // Shorter expiry
  const refreshToken = jwt.sign({ userId }, config.JWT_REFRESH_SECRET, { expiresIn: "7d" });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return accessToken;
};


export const clearToken = (res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  });
};
