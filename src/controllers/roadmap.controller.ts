import { Request, Response } from "express";
import { generateRoadmapContentService, fetchRoadmapsService } from "../services/roadmap.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import UserModel from "../models/user.model";
import RoadmapModel from "../models/roadmap.model";
import { BadRequestException } from "../utils/appError";

export const generateRoadmapContent = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const roadmap = await generateRoadmapContentService(userId);
  res.status(200).json({ roadmap });
});

export const getRoadmaps = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const roadmaps = await fetchRoadmapsService(userId);
  res.status(200).json({ roadmaps });
});


export const getLearningPathAndRoadmapBySkill = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { pickedSkill } = req.body;


  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");

  const learningPath = user.learningPath.find((path) => path.skill === pickedSkill);
  if (!learningPath) throw new BadRequestException("Skill not found in learning path");

  const roadmap = await RoadmapModel.findById(learningPath.roadmap);
  if (!roadmap) throw new BadRequestException("Roadmap not found");

  res.status(200).json({
    learningPath: learningPath,
    roadmap,
  });
});
