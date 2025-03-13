import { Request, Response } from "express";
import QuestionModel from "../models/skillQuestion.model";
import UserModel from "../models/user.model";
import { HTTPSTATUS } from "../config/http.config";
import { findSkillsService, getSuggestedSkillsService, selectSkillService } from "../services/skill.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import mongoose from "mongoose";
import { NotFoundException } from "../utils/appError";
import SkillModel from "../models/skill.model";

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


export const searchSkills = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query;

  // If no query is provided, return all skills
  const filter = query
    ? {
        $or: [
          { category: { $regex: query as string, $options: "i" } },
          { description: { $regex: query as string, $options: "i" } },
        ],
      }
    : {};

  const skills = await SkillModel.find(filter, { category: 1, description: 1, _id: 0 });

  res.status(HTTPSTATUS.OK).json(skills);
});



export const selectSkillFromSearch = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { pickedSkill } = req.body;

  // Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  // Update the user's picked skill
  user.pickedSkill = pickedSkill;

  // Set skillsAssessment and careerAssessment to null to bypass onboarding
  user.skillsAssessment = null;
  user.careerAssessment = null;
  user.selectedSkills = null;

  await user.save();

  res.status(HTTPSTATUS.OK).json({
    message: "Skill selected successfully",
    pickedSkill: user.pickedSkill,
  });
});


export const selectedSearchSkill = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { pickedSkill } = req.body;

  // Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  // Fetch the skill details
  const skill = await SkillModel.findOne({ category: pickedSkill });
  if (!skill) {
    throw new NotFoundException("Skill details not found");
  }

  // Prepare the response data
  const selectedSearchSkill = {
    category: skill.category,
    description: skill.description,
    keySkills: skill.keySkills,
    jobRoles: skill.jobRoles,
  };

  // Update the user's pickedSkill (optional, if needed)
  user.pickedSkill = pickedSkill;
  await user.save();

  // Send the response
  res.status(HTTPSTATUS.OK).json({
    message: "Skill selected successfully",
    data: selectedSearchSkill,
  });
});