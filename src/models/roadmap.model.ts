import mongoose, { Document, Schema } from "mongoose";

export interface RoadmapDocument extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    skill: string;
    level: string;
    steps: string[];
    concepts: string[];
    exercises: string[];
    technologies: string[];
    timeline: string;
    createdAt: Date;
    updatedAt: Date;
}

const roadmapSchema = new Schema<RoadmapDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        skill: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        steps: [
            {
                type: String,
            },
        ],
        concepts: [
            {
                type: String,
            },
        ],
        exercises: [
            {
                type: String,
            },
        ],
        technologies: [
            {
                type: String,
            },
        ],
        timeline: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const RoadmapModel = mongoose.model<RoadmapDocument>("Roadmap", roadmapSchema);
export default RoadmapModel;
