import { OpenAI } from "openai";
import { BadRequestException } from "../utils/appError";
import UserModel from "../models/user.model";
import RoadmapModel from "../models/roadmap.model";
import { config } from "../config/app.config";

const token = config.OPENAI_API_KEY;

export const generateRoadmapContentService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");
  if (!user.pickedSkill) throw new BadRequestException("No skill selected");

  const skill = user.pickedSkill;
  const level = user.learningPath[0]?.level || "Beginner";

  const prompt = `Generate a structured learning roadmap for ${skill} at ${level} level. Include:
  - Key learning steps
  - Concepts to focus on
  - Hands-on exercises
  - Technologies/tools needed
  - Timeline`;

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
    steps: roadmapText.filter((line) => line.startsWith("- Key learning steps:")).map((line) => line.replace("- Key learning steps:", "").trim()),
    concepts: roadmapText.filter((line) => line.startsWith("- Concepts to focus on:")).map((line) => line.replace("- Concepts to focus on:", "").trim()),
    exercises: roadmapText.filter((line) => line.startsWith("- Hands-on exercises:")).map((line) => line.replace("- Hands-on exercises:", "").trim()),
    technologies: roadmapText.filter((line) => line.startsWith("- Technologies/tools needed:")).map((line) => line.replace("- Technologies/tools needed:", "").trim()),
    timeline: roadmapText.find((line) => line.startsWith("- Timeline:"))?.replace("- Timeline:", "").trim() || "",
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
