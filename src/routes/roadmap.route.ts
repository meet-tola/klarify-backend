import express from "express";
import {
    generateRoadmapContent,
    getRoadmaps,
    getLearningPathAndRoadmapBySkill
} from "../controllers/roadmap.controller";

const router = express.Router();

router.post("/:userId/content", generateRoadmapContent);
router.get("/:userId/roadmap", getRoadmaps);
router.post("/:userId/learning-path", getLearningPathAndRoadmapBySkill);

export default router;
