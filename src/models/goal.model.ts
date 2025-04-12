import mongoose, { Schema, Document } from "mongoose";

interface GoalDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  skill: string; 
  startDate: Date;
  endDate: Date;
  repeat: "daily" | "weekly" | "weekend" | "none";
  reminders: {
    email: boolean;
    inApp: boolean;
  };
  progress: {
    current: number;
    target: number;
    completed: boolean;
    lastUpdated: Date;
  };
}

const GoalSchema = new Schema<GoalDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  skill: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  repeat: {
    type: String,
    enum: ["daily", "weekly", "weekend", "none"],
    default: "none",
  },
  reminders: {
    email: {
      type: Boolean,
      default: false,
    },
    inApp: {
      type: Boolean,
      default: false,
    },
  },
  progress: {
    current: {
      type: Number,
      default: 0,
    },
    target: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
});

const GoalModel = mongoose.model<GoalDocument>("Goal", GoalSchema);

export default GoalModel;