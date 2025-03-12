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

  // Retrieve relevant questions for the user's picked skill
  const careerQuestions = await CareerModel.findOne({ skill: user.pickedSkill });
  if (!careerQuestions) {
    throw new NotFoundException("No career questions found for the selected skill");
  }

  let score = 0;

  // Evaluate answers based on the question structure
  for (const answer of answers) {
    const question = careerQuestions.questions.find(
      q => q._id.toString() === answer.questionId
    );

    if (question) {
      // Assign points based on the answer
      const answerIndex = question.answers.indexOf(answer.answer);
      if (answerIndex !== -1) {
        // Higher points for more confident/advanced answers
        score += answerIndex + 1; // Adjust scoring logic as needed
      }
    }
  }

  // Determine skill level based on score
  let level = "Beginner";
  const totalPossibleScore = careerQuestions.questions.length * 3; // Assuming 3 answer options per question
  const scorePercentage = (score / totalPossibleScore) * 100;

  if (scorePercentage >= 70) {
    level = "Advanced";
  } else if (scorePercentage >= 40) {
    level = "Intermediate";
  }

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

