import mongoose, { Document, Schema } from "mongoose";

export interface QuestionDocument extends Document {
    questionText: string;
    options: string[];
    skillMapping: {
        [key: string]: string[]; // e.g., { "option1": ["skill1", "skill2"] }
    };
}

const questionSchema = new Schema<QuestionDocument>(
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
            type: Map,
            of: [String],
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<QuestionDocument>("Question", questionSchema);