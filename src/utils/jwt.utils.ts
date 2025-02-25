import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, config.SESSION_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};
