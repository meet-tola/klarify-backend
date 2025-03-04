import { Request, Response } from "express";
import { evaluateCareerAnswersService, getCareerQuestionsService } from "../services/career.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";


export const getCareerQuestions = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const questions = await getCareerQuestionsService(userId);
  res.status(HTTPSTATUS.OK).json(questions);
};

export const evaluateCareerAnswers = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { answers } = req.body;

  const result = await evaluateCareerAnswersService(userId, answers);

  res.status(HTTPSTATUS.OK).json({
    message: "Career level evaluated successfully",
    learningPath: result
  });
});
