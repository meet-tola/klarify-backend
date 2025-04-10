import mongoose, { Document, Schema } from "mongoose";

interface DescriptionItem {
  text: string;
  metadata?: string[];
}

interface Example {
  type: string;
  content: string;
  metadata?: string[];
}

interface ContentItem {
  heading: {
    text: string;
    metadata?: string[];
  };
  description: DescriptionItem[];
  examples?: Example[];
}

interface KeyPoints {
  metadata?: string[];
  items: string[];
}

interface Section {
  sectionTitle: string;
  sectionType: string;
  content: ContentItem[];
  keyPoints: KeyPoints;
}

interface Tip {
  title: string;
  content: string;
}

interface Project {
  name: string;
  description: string;
  features: string[];
}

interface Lesson {
  lessonTitle: string;
  lessonSummary: {
    heading: string;
    description: string[];
  };
  sections?: Section[];
  resources: {
    exercises: string[];
  };
}

interface Phase {
  phaseTitle: string;
  phaseDescription: string;
  lessons: Lesson[];
}

export interface RoadmapDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  skill: string;
  level: string;
  phases: Phase[];
  resources: {
    youtubeVideos?: {
      title: string;
      url: string;
      thumbnail: string;
    }[];
    articles?: {
      title: string;
      url: string;
      author: string;
    }[];
    projects: Project[];
  };
  tips: Tip[];
  createdAt: Date;
  updatedAt: Date;
}

const DescriptionItemSchema = new Schema({
  text: { type: String, required: true },
  metadata: { type: [String], default: [] }
});

const ExampleSchema = new Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  metadata: { type: [String], default: [] }
});

const HeadingSchema = new Schema({
  text: { type: String, required: true },
  metadata: { type: [String], default: [] }
});

const ContentItemSchema = new Schema({
  heading: { type: HeadingSchema },
  description: { type: [DescriptionItemSchema] },
  examples: { type: [ExampleSchema], default: [] }
});

const KeyPointsSchema = new Schema({
  metadata: { type: [String], default: [] },
  items: { type: [String], required: true }
});

const SectionSchema = new Schema({
  sectionTitle: { type: String, required: true },
  sectionType: { type: String, required: true },
  content: { type: [ContentItemSchema], required: true },
  keyPoints: { type: KeyPointsSchema, required: true }
});

const TipSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], required: true }
});

const LessonSchema = new Schema({
  lessonTitle: { type: String, required: true },
  lessonSummary: {
    heading: { type: String, required: true },
    description: { type: [String], required: true }
  },
  sections: { type: [SectionSchema], required: true, default: [] },
  resources: {
    exercises: { type: [String], required: true }
  }
});

const PhaseSchema = new Schema({
  phaseTitle: { type: String, required: true },
  phaseDescription: { type: String, required: true },
  lessons: { type: [LessonSchema], required: true }
});

const roadmapSchema = new Schema<RoadmapDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    skill: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true
    },
    phases: { type: [PhaseSchema], required: true },
    resources: {
      youtubeVideos: [
        {
          title: {
            type: String,
          },
          url: {
            type: String,
          },
          thumbnail: {
            type: String,
          },
        },
      ],
      articles: [
        {
          title: {
            type: String,
          },
          url: {
            type: String,
          },
          author: {
            type: String,
          },
        },
      ],
      projects: { type: [ProjectSchema], required: true }
    },
    tips: { type: [TipSchema], required: true }
  },
  {
    timestamps: true
  }
);

const RoadmapModel = mongoose.model<RoadmapDocument>("Roadmap", roadmapSchema);
export default RoadmapModel;
