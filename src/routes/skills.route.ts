import express from "express";
import { saveSkillsAssessment } from "../controllers/skills.controller";

const router = express.Router();
router.post("/:userId", saveSkillsAssessment);
export default router;
