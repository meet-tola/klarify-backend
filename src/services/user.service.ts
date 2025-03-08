import UserModel from "../models/user.model";

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