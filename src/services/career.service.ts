import UserModel from "../models/user.model";
import CareerModel from "../models/career.model";
import { NotFoundException, BadRequestException } from "../utils/appError";
import mongoose from "mongoose";

export const getCareerQuestionsService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  if (!user.pickedSkill) {
    throw new BadRequestException("No skill picked");
  }

  const careerQuestions = await CareerModel.find({ skill: user.pickedSkill });
  return careerQuestions;
};

export const evaluateCareerAnswersService = async (
  userId: string,
  answers: { questionId: string; answer: string }[]
) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  if (!user.pickedSkill) {
    throw new BadRequestException("No skill picked");
  }

  // Retrieve relevant questions
  const careerQuestions = await CareerModel.find({ skill: user.pickedSkill });

  if (!careerQuestions.length) {
    throw new NotFoundException("No career questions found for the selected skill");
  }

  let score = 0;

  for (const answer of answers) {
    const question = careerQuestions
      .flatMap(career => career.questions)
      .find(q => q._id.toString() === answer.questionId);

    if (question) {
      score += 1;
    }
  }

  // Determine skill level based on score
  let level = "Beginner";
  if (score >= 2) level = "Intermediate";
  if (score >= 4) level = "Advanced";

  // Store career assessment in the user model
  user.careerAssessment = answers.map(answer => ({
    questionId: new mongoose.Types.ObjectId(answer.questionId),
    answer: answer.answer,
  }));

  // Update user's learning path
  user.learningPath = [
    {
      skill: user.pickedSkill,
      level,
    }
  ];
  
  await user.save();

  return { skill: user.pickedSkill, level };
};

