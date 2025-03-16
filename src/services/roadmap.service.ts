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
  You are an AI skill tutor generator. Your task is to generate a structured learning content in JSON format. 
  You are to generate a course on "${skill}" for a "${level}" user. The course should be divided into phases, and each phase should have lessons. Each lesson should include:

1. A lesson summary with a heading and description.
2. Sections with different types of content, such as headings, descriptions, code examples, bold text, bullet points, and images.
3. Resources for the lesson, including exercises, videos, articles, and books.

For each phase, generate a list of keywords that will be used to fetch external resources like YouTube videos, articles, and projects.

Return the response as a JSON object with the following structure:
{
  "courseTitle": "string",
  "userLevel": "string",
  "keywords": ["string"],
  "phases": [
    {
      "phaseTitle": "string",
      "phaseKeywords": ["string"],
      "lessons": [
        {
          "lessonTitle": "string",
          "lessonSummary": {
            "heading": "string",
            "description": "string"
          },
          "sections": [
            {
              "type": "string",
              "content": "string",
              "metadata": {
                "bold": "boolean",
                "bullets": ["string"],
                "imageLink": "string",
                "alignment": "string",
                "language": "string"
              }
            }
          ],
          "resources": {
            "exercises": ["string"],
            "videos": ["string"],
            "articles": ["string"],
            "books": ["string"]
          }
        }
      ]
    }
  ]
}
  
  Ensure the response is valid JSON.
  `;

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });

  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 4096,
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

  // Fetch supplementary resources using phase keywords
  const keywords = [skill, ...roadmapData.phases.flatMap((phase: { phaseKeywords: string[] }) => phase.phaseKeywords)].slice(0, 5);
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
    projects: projects.map((project: { title: string; description: string; features: string[] }) => ({
      name: project.title,
      description: project.description,
      features: project.features,
    })),
  });

  await user.save();

  return roadmap;
};

export const fetchRoadmapsService = async (userId: string) => {
  const roadmaps = await RoadmapModel.find({ userId });
  return roadmaps;
};