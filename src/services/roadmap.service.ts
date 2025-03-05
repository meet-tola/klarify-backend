import { OpenAI } from "openai";
import { BadRequestException } from "../utils/appError";
import UserModel from "../models/user.model";
import RoadmapModel from "../models/roadmap.model";
import { config } from "../config/app.config";
import { fetchYouTubeVideos, fetchArticles } from "../services/learningResources.service";

const token = config.OPENAI_API_KEY;

export const generateRoadmapContentService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");
  if (!user.pickedSkill) throw new BadRequestException("No skill selected");

  const skill = user.pickedSkill;
  const level = user.learningPath[0]?.level || "Beginner";

  // Updated AI Prompt
  const prompt = `
  You are a career advisor AI. Based on the user's selected skill, generate a structured learning roadmap.

  ### Skill: ${skill}  
  ### User's Background: ${level}  

  **Output Format:**  
  - **Key Learning Steps:**  
    - (List steps, starting with "- ")  
  - **Concepts to Focus On:**  
    - (List concepts, starting with "- ")  
  - **Hands-on Exercises:**  
    - (List exercises, starting with "- ")  
  - **Recommended Learning Keywords:** (Comma-separated keywords)  
  - **Project Idea:**  
    - Title: (Project title)  
    - Description: (Brief description)  
    - Features: (List 3-5 features)  
  - **Estimated Learning Timeline:** (Short timeframe)  

  Ensure the project idea is **practical and relevant** to the skill.
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

  // Extract sections from AI response
  const roadmapText = content.trim().split("\n");
  const extractSection = (title: string) =>
    roadmapText
      .slice(roadmapText.findIndex(line => line.includes(title)) + 1)
      .filter(line => line.startsWith("- "))
      .map(line => line.replace("- ", "").trim());

  const steps = extractSection("**Key Learning Steps:**");
  const concepts = extractSection("**Concepts to Focus On:**");
  const keywords = roadmapText.find(line => line.includes("Recommended Learning Keywords:"))?.split(":")[1]?.trim().split(", ") || [];
  const projectTitle = roadmapText.find(line => line.includes("Title:"))?.split(":")[1]?.trim() || "";
  const projectDesc = roadmapText.find(line => line.includes("Description:"))?.split(":")[1]?.trim() || "";
  const projectFeatures = extractSection("Features:");
  const timeline = roadmapText.find(line => line.includes("Estimated Learning Timeline:"))?.split(":")[1]?.trim() || "";

  // Fetch Learning Resources
  const youtubeVideos = await fetchYouTubeVideos(keywords[0] || skill);
  const articles = await fetchArticles(keywords[0] || skill);

  // Save roadmap to MongoDB
  const roadmap = new RoadmapModel({
    userId: user._id,
    skill,
    level,
    steps,
    concepts,
    timeline,
  });

  await roadmap.save();

  // Save to userModel.learningPath
  user.learningPath.push({
    skill,
    level,
    steps,
    youtubeVideos,
    articles,
    projects: [
      {
        name: projectTitle,
        description: projectDesc,
        features: projectFeatures,
      },
    ],
    roadmap: roadmap._id,
  });

  await user.save();

  return roadmap;
};

export const fetchRoadmapsService = async (userId: string) => {
  const roadmaps = await RoadmapModel.find({ userId });
  return roadmaps;
};
