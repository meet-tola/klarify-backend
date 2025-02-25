import express from "express";
import { getCareerQuestions, getSuggestedSkills, saveSkillsAssessment, selectSkill } from "../controllers/skill.controller";

const router = express.Router();
router.post("/:userId/assessment", saveSkillsAssessment);
router.get("/:userId/suggested", getSuggestedSkills);
router.post("/:userId/select", selectSkill);
router.get("/:userId/career-questions", getCareerQuestions);

export default router;
