import { Request, Response } from "express";
import { generateRoadmapContentService, generateLessonSectionsService, checkSectionsGeneratedService, fetchRoadmapBySkillService } from "../services/roadmap.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import UserModel from "../models/user.model";
import RoadmapModel from "../models/roadmap.model";
import { BadRequestException } from "../utils/appError";

export const generateRoadmapContent = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const roadmap = await generateRoadmapContentService(userId);

  // Start generating sections in the background
  generateLessonSectionsService(userId, roadmap._id.toString(), 0)
    .then(() => console.log("All phases generated"))
    .catch(err => console.error("Section generation error:", err));

  res.status(200).json({ roadmap });
});


export const getRoadmapBySkill = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { pickedSkill } = req.body;

  const roadmap = await fetchRoadmapBySkillService(userId, pickedSkill);
  res.status(200).json({ roadmap });
});


export const generateRoadmapSections = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { roadmapId, phaseIndex } = req.body;

  if (typeof roadmapId !== 'string') {
    throw new BadRequestException("Invalid or missing roadmapId");
  }

  const parsedPhaseIndex = phaseIndex !== undefined ? Number(phaseIndex) : 0;

  const result = await generateLessonSectionsService(
    userId,
    roadmapId,
    parsedPhaseIndex
  );

  res.status(200).json(result);
};

export const checkSectionsStatus = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { roadmapId } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");

  if (!roadmapId || typeof roadmapId !== 'string') {
    throw new BadRequestException("Missing or invalid roadmapId");
  }

  const status = await checkSectionsGeneratedService(roadmapId);
  res.status(200).json(status);
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
