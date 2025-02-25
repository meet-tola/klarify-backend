
import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { getCurrentUserService } from "../services/user.service";

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "User ID is missing",
      });
    }

    const { user } = await getCurrentUserService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User fetch successfully",
      user,
    });
  }
);
