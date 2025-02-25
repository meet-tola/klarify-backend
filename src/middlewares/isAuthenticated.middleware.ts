import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import { UnauthorizedException } from "../utils/appError";

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) {
    throw new UnauthorizedException("Unauthorized. Please log in.");
  }

  // Fetch the user and attach to req.user
  const user = await UserModel.findById(req.session.userId).select("-password");
  if (!user) {
    throw new UnauthorizedException("User not found.");
  }

  req.user = user;
  next();
};

export default isAuthenticated;
