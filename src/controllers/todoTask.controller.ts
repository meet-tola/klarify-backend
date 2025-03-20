import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasksByUser,
  getRemindersForUser,
} from "../services/todoTask.service";
import { HTTPSTATUS } from "../config/http.config";

export const createTaskHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { taskName, schedule, repeat, reminders } = req.body;

  const task = await createTask(userId, taskName, schedule, repeat, reminders);
  res.status(HTTPSTATUS.CREATED).json(task);
});

export const updateTaskHandler = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const updates = req.body;

  const task = await updateTask(taskId, updates);
  res.status(HTTPSTATUS.OK).json(task);
});

export const deleteTaskHandler = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = req.params;

  const task = await deleteTask(taskId);
  res.status(HTTPSTATUS.OK).json(task);
});

export const getTasksHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const tasks = await getTasksByUser(userId);
  res.status(HTTPSTATUS.OK).json(tasks);
});

export const getRemindersHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const reminders = await getRemindersForUser(userId);
  res.status(HTTPSTATUS.OK).json(reminders);
});