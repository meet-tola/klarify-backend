
import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { deleteUserService, getCurrentUserService, updateUserService } from "../services/user.service";

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "User ID is missing" });
    }

    const { user } = await getCurrentUserService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User fetch successfully",
      user,
    });
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "User ID is missing" });
    }

    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated this way
    delete updateData.password;
    delete updateData._id;

    const { user } = await updateUserService(userId, updateData);

    return res.status(HTTPSTATUS.OK).json({
      message: "User updated successfully",
      user,
    });
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "User ID is missing" });
    }

    await deleteUserService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User account deleted successfully",
    });
  }
);
