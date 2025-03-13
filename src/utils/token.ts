import { Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";


export const setToken = (userId: string): string => {
  return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '2d' });
};

