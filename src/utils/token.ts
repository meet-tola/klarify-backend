import { Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";


export const setToken = (res: Response, userId: string): string => {
  const token = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.NODE_ENV !== "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 60 * 60 * 1000,
  });

  return token;
};


export const clearToken = (res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  });
};
