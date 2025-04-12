import mongoose from "mongoose";
import RoadmapModel from "../models/roadmap.model";
import UserModel from "../models/user.model";
import GoalModel from "../models/goal.model";

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate("learningPath")
    .select("-password");

  if (!user) {
    return { user: null };
  }

  return {
    user,
  };
};


export const updateUserService = async (userId: string, updateData: any) => {
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .populate("learningPath")
    .select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    user,
  };
};

export const deleteUserService = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await RoadmapModel.find({ userId: userId }).session(session);
    await RoadmapModel.deleteMany({ userId: userId }).session(session);
    await GoalModel.find({ userId: userId }).session(session);
    await GoalModel.deleteMany({ userId: userId }).session(session);
    const result = await UserModel.findByIdAndDelete(userId).session(session);

    if (!result) {
      throw new Error("User not found");
    }

    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};