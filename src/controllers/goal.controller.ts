import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createGoal,
  updateGoal,
  deleteGoal,
  getGoalsByUser,
  getRemindersForUser,
  getGoalProgress,
  updateGoalProgress,
  getPendingInAppReminders,
} from "../services/goal.service";
import { HTTPSTATUS } from "../config/http.config";

export const createGoalHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { title, description, skill, startDate, endDate, repeat, reminders, target } = req.body;

  const goal = await createGoal(
    userId,
    title,
    description,
    skill,
    new Date(startDate),
    new Date(endDate),
    repeat,
    reminders,
    target
  );
  res.status(HTTPSTATUS.CREATED).json(goal);
});

export const updateGoalHandler = asyncHandler(async (req: Request, res: Response) => {
  const { goalId } = req.params;
  const updates = req.body;

  const goal = await updateGoal(goalId, updates);
  res.status(HTTPSTATUS.OK).json(goal);
});

export const deleteGoalHandler = asyncHandler(async (req: Request, res: Response) => {
  const { goalId } = req.params;

  const goal = await deleteGoal(goalId);
  res.status(HTTPSTATUS.OK).json(goal);
});

export const getGoalsHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const goals = await getGoalsByUser(userId);
  res.status(HTTPSTATUS.OK).json(goals);
});

export const getRemindersHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const reminders = await getRemindersForUser(userId);
  res.status(HTTPSTATUS.OK).json(reminders);
});

export const getProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const { goalId } = req.params;

  const progress = await getGoalProgress(goalId);
  res.status(HTTPSTATUS.OK).json(progress);
});

export const updateProgressHandler = asyncHandler(async (req: Request, res: Response) => {
  const { goalId } = req.params;
  const { increment } = req.body;

  const goal = await updateGoalProgress(goalId, increment || 1);
  res.status(HTTPSTATUS.OK).json(goal);
});

export const getInAppRemindersHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const reminders = await getPendingInAppReminders(userId);
  res.status(HTTPSTATUS.OK).json(reminders);
});