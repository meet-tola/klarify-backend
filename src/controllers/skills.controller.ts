import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { findSkillsService } from "../services/skillFinder.service";

export const saveSkillsAssessment = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { answers } = req.body; // [{ questionId, answer }]

  const user = await UserModel.findById(userId);
  if (!user) return res.status(HTTPSTATUS.NOT_FOUND).json({ message: "User not found" });

  // Save skills assessment to user
  user.skillsAssessment = answers;
  await user.save();

  // Get suggested skills from the service
  const suggestedSkills = await findSkillsService(answers);

  // Save suggested skills to user model
  user.selectedSkills = suggestedSkills;
  await user.save();

  res.status(HTTPSTATUS.CREATED).json({
    message: "Skills assessment saved and skills suggested",
    suggestedSkills,
  });
});
