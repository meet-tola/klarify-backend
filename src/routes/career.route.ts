import express from "express";
import { saveCareerAssessment } from "../controllers/career.controller";

const router = express.Router();
router.post("/:userId", saveCareerAssessment);
export default router;