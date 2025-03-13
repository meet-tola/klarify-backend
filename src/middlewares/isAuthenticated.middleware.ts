import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";
import { verify } from "jsonwebtoken";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthorizedException("Unauthorized. Please log in.");
  }

  verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      throw new UnauthorizedException("Unauthorized. Please log in.");
    }
    req.user = user;
    next();
  });
};

export default isAuthenticated;