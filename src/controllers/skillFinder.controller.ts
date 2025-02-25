import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { findSkillsService } from "../services/skillFinder.service";
import { HTTPSTATUS } from "../config/http.config";

export const findSkills = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { answers } = req.body; // [{ questionId, answer }]
  const suggestedSkills = await findSkillsService(answers);

  res.status(HTTPSTATUS.CREATED).json({
    message: "Suggested skills retrieved successfully",
    suggestedSkills,
  });
});
