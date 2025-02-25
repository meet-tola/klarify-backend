import express from "express";
import { saveSkillsAssessment } from "../controllers/skill.controller";

const router = express.Router();
router.post("/:userId/assessment", saveSkillsAssessment);

export default router;
