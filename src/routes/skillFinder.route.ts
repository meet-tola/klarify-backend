import express from "express";
import { findSkills } from "../controllers/skillFinder.controller";

const router = express.Router();
router.get("/:userId", findSkills);
export default router;