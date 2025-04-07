import express from "express";
import {
    generateRoadmapContent,
    getRoadmaps,
    getLearningPathAndRoadmapBySkill,
    generateRoadmapSections
} from "../controllers/roadmap.controller";

const router = express.Router();

router.post("/:userId/content", generateRoadmapContent);
router.post("/:userId/sections", generateRoadmapSections);
router.get("/:userId/roadmap", getRoadmaps);
router.post("/:userId/learning-path", getLearningPathAndRoadmapBySkill);

export default router;
