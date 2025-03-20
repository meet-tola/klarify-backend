import mongoose, { Schema, Document } from "mongoose";

interface TodoTaskDocument extends Document {
  userId: mongoose.Types.ObjectId; 
  taskName: string;
  schedule: Date;
  repeat: "daily" | "weekly" | "monthly" | "none";
  reminders: {
    email: boolean;
    inApp: boolean;
  };
  isCompleted: boolean;
}

const TodoTaskSchema = new Schema<TodoTaskDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
    required: true,
  },
  repeat: {
    type: String,
    enum: ["daily", "weekly", "monthly", "none"],
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
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const TodoTaskModel = mongoose.model<TodoTaskDocument>("TodoTask", TodoTaskSchema);

export default TodoTaskModel;