import express from "express";
import { getSuggestedSkills, saveSkillsAssessment, selectSkill } from "../controllers/skill.controller";

const router = express.Router();
router.post("/:userId/assessment", saveSkillsAssessment);
router.get("/:userId/suggested", getSuggestedSkills);
router.post("/:userId/select", selectSkill);

export default router;
