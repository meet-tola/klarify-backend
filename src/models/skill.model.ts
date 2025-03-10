import mongoose, { Schema, Document } from "mongoose";

interface SkillDocument extends Document {
  category: string;
  description: string;
  keySkills: string[];
  jobRoles: string[];
}

const SkillSchema = new Schema<SkillDocument>({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  keySkills: [
    {
      type: String,
      required: true,
    },
  ],
  jobRoles: [
    {
      type: String,
      required: true,
    },
  ],
});

const SkillModel = mongoose.model<SkillDocument>("Skill", SkillSchema);

export default SkillModel;
