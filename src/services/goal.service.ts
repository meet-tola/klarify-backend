import GoalModel from "../models/goal.model";
import UserModel from "../models/user.model";
import { NotFoundException, BadRequestException } from "../utils/appError";
import { sendGoalReminderEmail } from "../utils/mailer";
import { scheduleJob, cancelJob, RecurrenceRule } from "node-schedule";

// Store scheduled jobs in memory
const scheduledJobs: Record<string, any> = {};

export const createGoal = async (
  userId: string,
  title: string,
  description: string,
  skill: string,
  startDate: Date,
  endDate: Date,
  repeat: "daily" | "weekly" | "weekend" | "none",
  reminders: { email: boolean; inApp: boolean },
  target: number
) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");

  if (!user.learningPath.some(path => path.skill === skill)) {
    throw new BadRequestException("Skill not in user's learning path");
  }

  const goal = await GoalModel.create({
    userId,
    title,
    description,
    skill,
    startDate,
    endDate,
    repeat,
    reminders,
    progress: {
      current: 0,
      target,
      completed: false,
    }
  });

  // Schedule initial reminders if needed
  if (reminders.email) {
    scheduleRemindersForGoal(goal);
  }

  return goal;
};

export const updateGoal = async (
  goalId: string,
  updates: Partial<{
    title: string;
    description: string;
    skill: string;
    startDate: Date;
    endDate: Date;
    repeat: "daily" | "weekly" | "weekend" | "none";
    reminders: { email: boolean; inApp: boolean };
    progress: { current: number; target: number };
  }>
) => {
  if (updates.skill) {
    const goal = await GoalModel.findById(goalId);
    if (!goal) throw new NotFoundException("Goal not found");

    const user = await UserModel.findById(goal.userId);
    if (!user || !user.learningPath.some(path => path.skill === updates.skill)) {
      throw new BadRequestException("Skill not in user's learning path");
    }
  }

  const goal = await GoalModel.findByIdAndUpdate(goalId, updates, { new: true });
  if (!goal) throw new NotFoundException("Goal not found");

  // Check if progress reached target
  if (goal.progress.current >= goal.progress.target && !goal.progress.completed) {
    goal.progress.completed = true;
    goal.progress.lastUpdated = new Date();
    await goal.save();
  }

  return goal;
};

export const deleteGoal = async (goalId: string) => {
  const goal = await GoalModel.findByIdAndDelete(goalId);
  if (!goal) throw new NotFoundException("Goal not found");

  return goal;
};

export const getGoalsByUser = async (userId: string) => {
  const goals = await GoalModel.find({ userId });
  return goals;
};

export const getGoalProgress = async (goalId: string) => {
  const goal = await GoalModel.findById(goalId);
  if (!goal) throw new NotFoundException("Goal not found");

  return {
    current: goal.progress.current,
    target: goal.progress.target,
    percentage: Math.min(100, Math.round((goal.progress.current / goal.progress.target) * 100)),
    completed: goal.progress.completed,
    remainingDays: Math.ceil((goal.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
  };
};

export const updateGoalProgress = async (goalId: string, increment: number = 1) => {
  const goal = await GoalModel.findById(goalId);
  if (!goal) throw new NotFoundException("Goal not found");

  if (goal.progress.completed) {
    throw new BadRequestException("Goal already completed");
  }

  goal.progress.current += increment;
  goal.progress.lastUpdated = new Date();

  if (goal.progress.current >= goal.progress.target) {
    goal.progress.completed = true;
    // Cancel any scheduled reminders if goal is completed
    if (scheduledJobs[goalId]) {
      cancelJob(scheduledJobs[goalId]);
      delete scheduledJobs[goalId];
    }
  }

  await goal.save();

  // Reschedule reminders based on new progress time
  if (goal.reminders.email && !goal.progress.completed) {
    if (scheduledJobs[goalId]) {
      cancelJob(scheduledJobs[goalId]);
    }
    scheduleRemindersForGoal(goal);
  }

  return goal;
};


export const getRemindersForUser = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");
  const now = new Date();
  const goals = await GoalModel.find({
    userId,
    endDate: { $gte: now }, // Only active goals
    "progress.completed": false,
    $or: [
      { "reminders.email": true },
      { "reminders.inApp": true }
    ]
  }).populate("userId");

  const reminders = goals.map((goal) => {
    const today = new Date().toDateString();
    const lastUpdated = goal.progress.lastUpdated.toDateString();

    // Only send reminder if not updated today
    if (lastUpdated !== today) {
      if (goal.reminders.email) {
        sendGoalReminderEmail(
          user.email,
          goal.title,
          goal.progress.current,
          goal.progress.target,
          Math.ceil((goal.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        );
      }

      if (goal.reminders.inApp) {
        return {
          goalId: goal._id,
          title: goal.title,
          message: `Don't forget to work on your goal: ${goal.title}`,
          progress: `${goal.progress.current}/${goal.progress.target}`,
          daysRemaining: Math.ceil((goal.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        };
      }
    }

    return null;
  }).filter((reminder) => reminder !== null);

  return reminders;
};

const scheduleRemindersForGoal = (goal: any) => {
  if (!goal.reminders.email || goal.progress.completed) return;

  const lastUpdated = goal.progress.lastUpdated;
  const reminderTime = new Date(lastUpdated);

  // Set the reminder for the same time as last progress
  const rule = new RecurrenceRule();
  rule.hour = reminderTime.getHours();
  rule.minute = reminderTime.getMinutes();

  switch (goal.repeat) {
    case "daily":
      rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
      break;
    case "weekly":
      rule.dayOfWeek = lastUpdated.getDay();
      break;
    case "weekend":
      rule.dayOfWeek = [0, 6]; // Sunday and Saturday
      break;
    case "none":
      // For "none", we'll schedule just one reminder for next day
      const nextDay = new Date(lastUpdated);
      nextDay.setDate(nextDay.getDate() + 1);
      scheduledJobs[goal._id] = scheduleJob(nextDay, () => sendReminder(goal));
      return;
  }

  scheduledJobs[goal._id] = scheduleJob(rule, () => sendReminder(goal));
};

const sendReminder = async (goal: any) => {
  const now = new Date();
  if (now > goal.endDate || goal.progress.completed) {
    if (scheduledJobs[goal._id]) {
      cancelJob(scheduledJobs[goal._id]);
      delete scheduledJobs[goal._id];
    }
    return;
  }

  const user = await UserModel.findById(goal.userId);
  if (!user) return;

  if (goal.reminders.email) {
    sendGoalReminderEmail(
      user.email,
      goal.title,
      goal.progress.current,
      goal.progress.target,
      Math.ceil((goal.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    );
  }
};

export const getPendingInAppReminders = async (userId: string) => {
  const now = new Date();
  const goals = await GoalModel.find({
    userId,
    endDate: { $gte: now },
    "progress.completed": false,
    "reminders.inApp": true,
    $or: [
      { lastReminderSent: { $exists: false } },
      { lastReminderSent: { $lt: new Date(new Date().setHours(0, 0, 0, 0)) } }
    ]
  });

  if (goals.length === 0) return [];

  // Update lastReminderSent for these goals
  await GoalModel.updateMany(
    { _id: { $in: goals.map(g => g._id) } },
    { $set: { lastReminderSent: new Date() } }
  );

  return goals.map(goal => ({
    goalId: goal._id,
    title: goal.title,
    message: `Don't forget to work on your goal: ${goal.title}`,
    progress: `${goal.progress.current}/${goal.progress.target}`,
    daysRemaining: Math.ceil((goal.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }));
};