import UserModel from "../models/user.model";
import { NotFoundException } from "../utils/appError";

export const saveCareerAssessmentService = async (userId: string, answers: any[]) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  // Save career answers to user model
  user.careerAssessment = answers;
  await user.save();

  // Example of how you could suggest careers based on answers (simplified)
  const suggestedCareers = ["Software Engineer", "Data Analyst"];

  return suggestedCareers;
};
