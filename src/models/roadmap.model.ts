import mongoose, { Document, Schema } from "mongoose";

interface Week {
    week: string;
    topic: string;
    overview: string;
    concepts: string[];
    exercises: string[];
    resources: {
        videos: string[];
        articles: string[];
        books: string[];
    };
    illustration: string;
}

interface Phase {
    title: string;
    description: string;
    weeks: Week[];
}

export interface RoadmapDocument extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    skill: string;
    level: string;
    phases: Phase[];
    createdAt: Date;
    updatedAt: Date;
}

const WeekSchema = new Schema({
    week: String,
    topic: String,
    overview: String,
    concepts: [String],
    exercises: [String],
    resources: {
        videos: [String],
        articles: [String],
        books: [String]
    },
    illustration: String
});

const PhaseSchema = new Schema({
    title: String,
    description: String,
    weeks: [WeekSchema]
});

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
        phases: [PhaseSchema],
    },
    {
        timestamps: true,
    }
);

const RoadmapModel = mongoose.model<RoadmapDocument>("Roadmap", roadmapSchema);
export default RoadmapModel;