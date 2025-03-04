import { Request, Response } from "express";
import QuestionModel from "../models/skillQuestion.model";
import UserModel from "../models/user.model";
import { HTTPSTATUS } from "../config/http.config";
import { findSkillsService, getSuggestedSkillsService, selectSkillService } from "../services/skill.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import mongoose from "mongoose";

export const getSkillQuestions = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await UserModel.findById(userId);
  if (!user) return res.status(HTTPSTATUS.NOT_FOUND).json({ message: "User not found" })

  const questions = await QuestionModel.find();
  res.status(HTTPSTATUS.OK).json(questions);
});

export const saveSkillsAssessment = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { answers } = req.body;

  const user = await UserModel.findById(userId);
  if (!user) return res.status(HTTPSTATUS.NOT_FOUND).json({ message: "User not found" });

  // Convert questionId to ObjectId
  const formattedAnswers = answers.map((answer: { questionId: string, answer: string }) => ({
    questionId: new mongoose.Types.ObjectId(answer.questionId),
    answer: answer.answer,
  }));

  // Save the skills assessment
  user.skillsAssessment = formattedAnswers;
  await user.save();

  const suggestedSkills = await findSkillsService(answers);
  user.selectedSkills = suggestedSkills;
  await user.save();

  res.status(HTTPSTATUS.CREATED).json({
    message: "Skills assessment saved and skills suggested",
    suggestedSkills: user.selectedSkills,
  });
});

export const getSuggestedSkills = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const skills = await getSuggestedSkillsService(userId);
  res.status(HTTPSTATUS.OK).json(skills);
};

export const selectSkill = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { pickedSkill } = req.body;
  const selectedSkill = await selectSkillService(userId, pickedSkill);
  res.status(HTTPSTATUS.OK).json({ selectedSkill });
};


