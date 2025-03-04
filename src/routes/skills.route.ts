import express from "express";
import { getSkillQuestions, getSuggestedSkills, saveSkillsAssessment, selectSkill } from "../controllers/skill.controller";

const router = express.Router();
router.get("/:userId/questions", getSkillQuestions);
router.post("/:userId/assessment", saveSkillsAssessment);
router.get("/:userId/suggested", getSuggestedSkills);
router.post("/:userId/select", selectSkill);

export default router;
