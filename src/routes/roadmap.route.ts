import express from "express";
import {
    generateRoadmapContent, 
    getLearningPathAndRoadmapBySkill,
    generateRoadmapSections,
    checkSectionsStatus,
    getRoadmapBySkill
} from "../controllers/roadmap.controller";

const router = express.Router();

router.post("/:userId/content", generateRoadmapContent);
router.post("/:userId/sections", generateRoadmapSections);
router.post("/:userId/roadmap-by-skill", getRoadmapBySkill);
router.post("/:userId/learning-path", getLearningPathAndRoadmapBySkill);
router.post('/:userId/sections-status', checkSectionsStatus);

export default router;
