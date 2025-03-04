import { OpenAI } from "openai";
import { BadRequestException } from "../utils/appError";
import UserModel from "../models/user.model";
import RoadmapModel from "../models/roadmap.model";
import { config } from "../config/app.config";
import extractText from "../utils/helper";

const token = config.OPENAI_API_KEY;

export const generateRoadmapContentService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");
  if (!user.pickedSkill) throw new BadRequestException("No skill selected");

  const skill = user.pickedSkill;
  const level = user.learningPath[0]?.level || "Beginner";

  const prompt = `Generate a structured learning roadmap for ${skill} at ${level} level. Use this exact format:
  - Key learning steps: (List each step on a new line starting with "- ")
  - Concepts to focus on: (List each concept on a new line starting with "- ")
  - Hands-on exercises: (List each exercise on a new line starting with "- ")
  - Technologies/tools needed: (List each tool on a new line starting with "- ")
  - Timeline: (Provide a structured timeframe)
  
  Strictly follow this format.`;

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token
  });


  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "" },
      { role: "user", content: prompt }
    ],
    model: "gpt-4o",
    temperature: 1,
    max_tokens: 4096,
    top_p: 1
  });
  const content = response.choices[0]?.message?.content;
  
  if (!content) throw new Error("No content received from OpenAI");
  const roadmapText = content.trim().split("\n");
  
  const roadmap = new RoadmapModel({
    userId: user._id,
    skill,
    level,
    steps: extractText("Key learning steps", roadmapText),
    concepts: extractText("Concepts to focus on", roadmapText),
    exercises: extractText("Hands-on exercises", roadmapText),
    technologies: extractText("Technologies/tools needed", roadmapText),
    timeline: roadmapText.find((line) => line.toLowerCase().startsWith("- timeline:"))?.replace(/-?\s*timeline:?\s*/i, "").trim() || "",
  });  

  await roadmap.save();

  user.learningPath.push({
    skill,
    level,
    roadmap: roadmap._id,
  });

  await user.save();

  return roadmap;
};

export const fetchRoadmapsService = async (userId: string) => {
  const roadmaps = await RoadmapModel.find({ userId });
  return roadmaps;
};
