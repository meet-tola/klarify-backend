import express from "express";
import {
    clearUserSkills,
    getSkillQuestions,
    getSuggestedSkills,
    saveSkillsAssessment,
    searchSkills,
    selectedSearchSkill,
    selectSkill,
    selectSkillFromSearch
} from "../controllers/skill.controller";

const router = express.Router();
router.get("/:userId/skill-questions", getSkillQuestions);
router.post("/:userId/save-skills-assessment", saveSkillsAssessment);
router.get("/:userId/suggested-skills", getSuggestedSkills);
router.post("/:userId/select-skill", selectSkill);
router.get("/search-skills", searchSkills);
router.post("/:userId/select-skill-from-search", selectSkillFromSearch);
router.post("/:userId/selected-search-skill", selectedSearchSkill);
router.put("/:userId/clear-skills", clearUserSkills);

export default router;
