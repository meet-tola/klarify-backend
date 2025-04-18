import mongoose, { Document, Schema } from "mongoose";

interface SkillMapping {
  primary: string[];
  secondary: string[];
}

export interface skillQuestionDocument extends Document {
  questionText: string;
  options: string[];
  skillMapping: {
    [key: string]: SkillMapping;
  };
}

const skillQuestionSchema = new Schema<skillQuestionDocument>(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    skillMapping: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<skillQuestionDocument>("SkillQuestion", skillQuestionSchema);