import TodoTaskModel from "../models/todoTask.model";
import { NotFoundException } from "../utils/appError";
import UserModel from "../models/user.model";
import { sendTaskReminderEmail } from "../utils/mailer";

export const createTask = async (
  userId: string,
  taskName: string,
  schedule: Date,
  repeat: "daily" | "weekly" | "monthly" | "none",
  reminders: { email: boolean; inApp: boolean }
) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  const task = await TodoTaskModel.create({
    userId,
    taskName,
    schedule,
    repeat,
    reminders,
  });

  return task;
};

export const updateTask = async (
  taskId: string,
  updates: Partial<{
    taskName: string;
    schedule: Date;
    repeat: "daily" | "weekly" | "monthly" | "none";
    reminders: { email: boolean; inApp: boolean };
    isCompleted: boolean;
  }>
) => {
  const task = await TodoTaskModel.findByIdAndUpdate(taskId, updates, { new: true });
  if (!task) throw new NotFoundException("Task not found");

  return task;
};

export const deleteTask = async (taskId: string) => {
  const task = await TodoTaskModel.findByIdAndDelete(taskId);
  if (!task) throw new NotFoundException("Task not found");

  return task;
};

export const getTasksByUser = async (userId: string) => {
  const tasks = await TodoTaskModel.find({ userId });
  return tasks;
};

// services/todoTask.service.ts
export const getRemindersForUser = async (userId: string) => {
  const now = new Date();
  const tasks = await TodoTaskModel.find({
    userId,
    schedule: { $lte: now },
    isCompleted: false,
  }).populate("userId");

  const reminders = tasks.map((task) => {
    const user = task.userId;

    // if (task.reminders.email && !user.isActiveInApp) {
    //   // Send email if user is not active in the app
    //   sendTaskReminderEmail(user.email, task.taskName);
    // }

    // if (task.reminders.inApp && user.isActiveInApp) {
    //   // Return in-app reminder if user is active
    //   return { message: `Don't forget to complete: ${task.taskName}` };
    // }

    return null;
  }).filter((reminder) => reminder !== null); // Filter out null values

  return reminders;
};