import { Request, Response } from "express";
import QuestionModel from "../models/skillQuestion.model";
import UserModel from "../models/user.model";
import { HTTPSTATUS } from "../config/http.config";
import { findSkillsService, getSuggestedSkillsService, selectSkillService } from "../services/skill.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import mongoose from "mongoose";
import { NotFoundException } from "../utils/appError";

export const getSkillQuestions = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  // Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  // Fetch all skill assessment questions
  const questions = await QuestionModel.find();
  res.status(HTTPSTATUS.OK).json(questions);
});

export const saveSkillsAssessment = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { answers } = req.body;

  // Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  // Validate and format answers
  const formattedAnswers = answers.map((answer: { questionId: string; answer: string }) => {
    // Check if questionId is a valid 24-character hex string
    if (!mongoose.isValidObjectId(answer.questionId)) {
      throw new Error(`Invalid questionId: ${answer.questionId}`);
    }

    return {
      questionId: new mongoose.Types.ObjectId(answer.questionId), // Convert to ObjectId
      answer: answer.answer,
    };
  });

  // Save the skills assessment
  user.skillsAssessment = formattedAnswers;
  await user.save();

  // Find suggested skills based on answers
  const suggestedSkills = await findSkillsService(answers);

  // Update user's selected skills
  user.selectedSkills = suggestedSkills.map((skill) => skill.category);
  await user.save();

  res.status(HTTPSTATUS.CREATED).json({
    message: "Skills assessment saved and skills suggested",
    suggestedSkills: user.selectedSkills,
  });
});

export const getSuggestedSkills = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  // Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  // Fetch suggested skills
  const suggestedSkills = await getSuggestedSkillsService(userId);
  res.status(HTTPSTATUS.OK).json(suggestedSkills);
});

export const selectSkill = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { pickedSkill } = req.body;

  // Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  // Select the skill and update user
  const selectedSkill = await selectSkillService(userId, pickedSkill);
  res.status(HTTPSTATUS.OK).json({ selectedSkill });
});