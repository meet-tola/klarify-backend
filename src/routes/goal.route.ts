import express from "express";
import {
    createGoalHandler,
    updateGoalHandler,
    deleteGoalHandler,
    getGoalsHandler,
    getRemindersHandler,
    getProgressHandler,
    updateProgressHandler,
    getInAppRemindersHandler,
} from "../controllers/goal.controller";

const router = express.Router();

router.post("/:userId", createGoalHandler);
router.put("/:goalId", updateGoalHandler);
router.delete("/:goalId", deleteGoalHandler);
router.get("/user/:userId", getGoalsHandler);
router.get("/reminders/:userId", getRemindersHandler);
router.get("/progress/:goalId", getProgressHandler);
router.post("/progress/:goalId", updateProgressHandler);
router.get("/in-app-reminders/:userId", getInAppRemindersHandler);

export default router;
