import { Request, Response } from "express";
import { generateRoadmapContentService, fetchRoadmapsService } from "../services/roadmap.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";

export const getRoadmapContent = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const roadmap = await generateRoadmapContentService(userId);
  res.status(200).json({ roadmap });
});

export const getRoadmaps = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const roadmaps = await fetchRoadmapsService(userId);
  res.status(200).json({ roadmaps });
});
