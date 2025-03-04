import express from "express";
import { getRoadmapContent, getRoadmaps } from "../controllers/roadmap.controller";

const router = express.Router();

router.post("/:userId/content", getRoadmapContent);

router.get("/:userId", getRoadmaps);

export default router;
