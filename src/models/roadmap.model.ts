import mongoose, { Document, Schema } from "mongoose";
interface Section {
  type: string;
  content: string;
  metadata?: {
    bold?: boolean;
    bullets?: string[];
    imageLink?: string;
    alignment?: string;
    language?: string;
  };
}
interface Lesson {
  lessonTitle: string;
  lessonSummary: {
    heading: string;
    description: string;
  };
  sections: Section[];
  resources: {
    exercises: string[];
    videos: string[];
    articles: string[];
    books: string[];
  };
}
interface Phase {
  phaseTitle: string;
  phaseKeywords: string[];
  lessons: Lesson[];
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

const SectionSchema = new Schema({
  type: { type: String, required: true },
  content: { type: [String], default: [] },
  metadata: {
    bold: { type: Boolean, default: false },
    bullets: { type: [String], default: [] },
    imageLink: { type: String },
    alignment: { type: String },
    language: { type: String },
  },
});

const LessonSchema = new Schema({
  lessonTitle: { type: String, required: true },
  lessonSummary: {
    heading: { type: String, required: true },
    description: { type: String, required: true },
  },
  sections: { type: [SectionSchema], required: true },
  resources: {
    exercises: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    articles: { type: [String], default: [] },
    books: { type: [String], default: [] },
  },
});

const PhaseSchema = new Schema({
  phaseTitle: { type: String, required: true },
  phaseKeywords: { type: [String], required: true },
  lessons: { type: [LessonSchema], required: true },
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
    phases: { type: [PhaseSchema], required: true },
  },
  {
    timestamps: true,
  }
);

const RoadmapModel = mongoose.model<RoadmapDocument>("Roadmap", roadmapSchema);
export default RoadmapModel;