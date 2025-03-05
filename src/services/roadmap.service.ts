import { OpenAI } from "openai";
import { BadRequestException } from "../utils/appError";
import UserModel from "../models/user.model";
import RoadmapModel from "../models/roadmap.model";
import { config } from "../config/app.config";
import { fetchYouTubeVideos, fetchArticles, fetchProjects } from "../services/learningResources.service";

const token = config.OPENAI_API_KEY;

export const generateRoadmapContentService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");
  if (!user.pickedSkill) throw new BadRequestException("No skill selected");

  const skill = user.pickedSkill;
  const level = user.learningPath[0]?.level || "Beginner";

  // Updated AI Prompt - Structured JSON format
  const prompt = `
  You are an AI roadmap generator. Your task is to generate a structured learning roadmap in JSON format. The roadmap should contain multiple phases, each divided into weekly learning steps. Each week should include an overview, key concepts, exercises, additional resources, and suggested images.

  ### User Information  
  - Skill: ${skill}  
  - User Level: ${level}  

  ### JSON Format Example:
  {
    "phases": [
      {
        "title": "Phase 1: Foundations",
        "description": "Introduction to the basics of ${skill}.",
        "weeks": [
          {
            "week": "Week 1",
            "topic": "Introduction to ${skill}",
            "overview": "Detailed explanation of the topic...",
            "concepts": ["Concept 1", "Concept 2"],
            "exercises": ["Exercise 1", "Exercise 2"],
            "resources": {
              "videos": ["YouTube link 1", "YouTube link 2"],
              "articles": ["Article link 1", "Article link 2"],
              "books": ["Book recommendation 1"]
            },
            "illustration": "Description of an image that supports learning"
          },
          {
            "week": "Week 2",
            "topic": "Advanced Basics",
            "overview": "More details about...",
            "concepts": ["Concept 3", "Concept 4"],
            "exercises": ["Exercise 3", "Exercise 4"],
            "resources": {
              "videos": ["YouTube link 3"],
              "articles": ["Article link 3"]
            },
            "illustration": "Another image description"
          }
        ]
      },
      {
        "title": "Phase 2: Intermediate Level",
        "description": "Building more advanced skills...",
        "weeks": [
          {
            "week": "Week 3",
            "topic": "Design Principles",
            "overview": "Understanding color, typography...",
            "concepts": ["UI Concepts", "UX Theories"],
            "exercises": ["Create a wireframe"],
            "resources": {
              "videos": ["UI video"],
              "articles": ["Design article"]
            },
            "illustration": "Image of a UI wireframe"
          }
        ]
      }
    ],
    "finalProject": {
      "title": "Build a Full Project",
      "description": "Apply everything learned to create a complete project",
      "features": ["Feature 1", "Feature 2", "Feature 3"]
    }
  }
  
  Ensure the response is valid JSON.
  `;

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token
  });

  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 4096
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No content received from OpenAI");  

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to extract JSON");
  
  let roadmapData;
  try {
    roadmapData = JSON.parse(jsonMatch[0]);
  } catch (error) {
    throw new Error("Invalid JSON response from OpenAI");
  }

  // Fetch supplementary resources
  const keywords = [skill, ...roadmapData.phases.flatMap((p: { weeks: { concepts: any; }[]; }) => p.weeks.flatMap((w: { concepts: any; }) => w.concepts))].slice(0, 5);
  const youtubeVideos = await fetchYouTubeVideos(keywords[0] || skill);
  const articles = await fetchArticles(keywords[0] || skill);
  const projects = await fetchProjects(keywords[0] || skill);

  // Save roadmap to MongoDB
  const roadmap = new RoadmapModel({
    userId: user._id,
    skill,
    level,
    phases: roadmapData.phases,
  });

  await roadmap.save();

  // Save to userModel.learningPath
  user.learningPath.push({
    skill,
    level,
    roadmap: roadmap._id,
    youtubeVideos,
    articles,
    projects: projects.map((project: { title: any; description: any; features: any; }) => ({
      name: project.title,
      description: project.description,
      features: project.features
    }))
  });

  await user.save();

  return roadmap;
};

export const fetchRoadmapsService = async (userId: string) => {
  const roadmaps = await RoadmapModel.find({ userId });
  return roadmaps;
};
