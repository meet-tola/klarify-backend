import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { saveCareerAssessmentService } from "../services/career.service";
import { HTTPSTATUS } from "../config/http.config";

export const saveCareerAssessment = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { answers } = req.body; // Answer array: [{ questionId, answer }]

  // Call the service to save career answers and get suggested careers
  const suggestedCareers = await saveCareerAssessmentService(userId, answers);

  res.status(HTTPSTATUS.CREATED).json({
    message: "Career assessment saved successfully",
    suggestedCareers,
  });
});
