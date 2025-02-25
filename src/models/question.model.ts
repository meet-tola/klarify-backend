import mongoose, { Document, Schema } from "mongoose";

export interface QuestionDocument extends Document {
    category: "skills" | "career";
    question: string;
    options: string[];
    skillMapping?: {
        [key: string]: string[]; //Answer to skill mapping
    }
}

const questionSchema = new Schema<QuestionDocument>(
    {
        category: {
            type: String,
            enum: ["skills", "career"],
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        options: {
            type: [String],
            required: true,
        },
        skillMapping: {
            type: Object,
            of: [String],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<QuestionDocument>("Question", questionSchema);