import mongoose, { Schema, Document } from "mongoose";

interface SkillDocument extends Document {
  name: string;
}

const SkillSchema = new Schema<SkillDocument>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const SkillModel = mongoose.model<SkillDocument>("Skill", SkillSchema);

export default SkillModel;
