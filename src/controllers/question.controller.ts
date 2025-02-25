import { Request, Response } from "express";
import QuestionModel from "../models/question.model";
import { HTTPSTATUS } from "../config/http.config";

export const getQuestions = async (req: Request, res: Response) => {
  const questions = await QuestionModel.find();
  res.status(HTTPSTATUS.OK).json(questions);
};
