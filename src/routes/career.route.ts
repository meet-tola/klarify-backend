import express from "express";
import { getCareerQuestions, evaluateCareerAnswers } from "../controllers/career.controller";

const router = express.Router();

router.get("/:userId/career-questions", getCareerQuestions);
router.post("/:userId/evaluate-career", evaluateCareerAnswers);

export default router;
