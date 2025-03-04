import mongoose, { Document, Schema } from "mongoose";

export interface skillQuestionDocument extends Document {
    questionText: string;
    options: string[];
    skillMapping: {
        [key: string]: string[]; 
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
            type: Map,
            of: [String],
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<skillQuestionDocument>("SkilQuestion", skillQuestionSchema);