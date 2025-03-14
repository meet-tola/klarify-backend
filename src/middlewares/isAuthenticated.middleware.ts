import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.status(401).json({ message: "Access denied!" });

  const token = authHeader.split(" ")[1]; 
  if (!token) return res.status(401).json({ message: "Access denied! No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as { userId: string };
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token!" });
  }
};

export default isAuthenticated;
