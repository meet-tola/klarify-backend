import express from "express";
import { getSkillQuestions, getSuggestedSkills, saveSkillsAssessment, selectSkill } from "../controllers/skill.controller";

const router = express.Router();
router.get("/:userId/skill-questions", getSkillQuestions);
router.post("/:userId/save-skills-assessment", saveSkillsAssessment);
router.get("/:userId/suggested-skills", getSuggestedSkills);
router.post("/:userId/select-skill", selectSkill);

export default router;
