import { GoogleGenerativeAI } from "@google/generative-ai";
import { BadRequestException } from "../utils/appError";
import UserModel from "../models/user.model";
import RoadmapModel from "../models/roadmap.model";
import { config } from "../config/app.config";
import { fetchYouTubeVideos, fetchArticles, fetchProjects } from "../services/learningResources.service";

const apiKey = config.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 4096,
    responseMimeType: "application/json",
  },
});

export const generateRoadmapContentService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");
  if (!user.pickedSkill) throw new BadRequestException("No skill selected");

  const skill = user.pickedSkill;
  const level = user.learningPath[0]?.level || "Beginner";

  // Updated AI Prompt - Structured JSON format
  const prompt = `
You are an AI skill tutor generator. Your task is to generate a structured learning course in JSON format.

The course should be designed to teach "${skill}" at a "${level}" proficiency level. It should be comprehensive and divided into five (5) distinct phases. 
Each phase should contain well-structured lessons with rich content, similar to what you would find in a full course PDF.

### Requirements:
1. **Total Lessons**: Generate at least 30 lessons in total, distributed evenly across the 5 phases.
2. **Rich Content**: Each lesson should include **400–500 words of detailed content**, with a mix of:
   - Headings
   - Descriptions
   - Code examples (if applicable)
   - Bullet points
   - Images (if applicable)
   - Other relevant elements
3. **Resources**: Include resources like exercises, videos, articles, and books for each lesson.
4. **Tips**: Provide practical tips for each lesson to help learners apply the concepts.
5. **Keywords**: Generate a list of keywords for each phase to fetch external resources like YouTube videos, articles, and projects.

### JSON Structure:
Return the response as a JSON object with the following structure:
{
  "courseTitle": "string", // A descriptive title for the course
  "userLevel": "string", // The proficiency level (e.g., Beginner, Intermediate, Advanced)
  "keywords": ["string"], // General keywords for the course
  "phases": [
    {
      "phaseTitle": "string", // Title of the phase
      "phaseKeywords": ["string"], // Keywords specific to this phase
      "lessons": [
        {
          "lessonTitle": "string", // Title of the lesson
          "lessonSummary": {
            "heading": "string", // A brief heading for the lesson
            "description": "string" // A detailed description of the lesson
          },
          "sections": [
            {
              "type": "string", // Type of content (e.g., "heading", "description", "code example", "bullet points")
              "content": ["string"], // Detailed content for the section (400–500 words per lesson)
              "metadata": {
                "bold": "boolean", // Whether the content should be bold
                "bullets": ["string"], // Bullet points (if applicable)
                "imageLink": "string", // Link to an image (if applicable)
                "alignment": "string", // Alignment of the content (e.g., "left", "center", "right")
                "language": "string" // Programming language (if applicable)
              }
            }
          ],
          "resources": {
            "exercises": ["string"], // List of exercises for the lesson
            "videos": ["string"], // List of video resources
            "articles": ["string"], // List of article resources
            "books": ["string"] // List of book resources
          },
          "tips": [
            {
              "title": "string", // Title of the tip
              "content": "string" // Detailed content of the tip
            }
          ]
        }
      ]
    }
  ]
}

### Additional Instructions:
1. Ensure the course is comprehensive and covers all essential topics for "${skill}" at the "${level}" level.
2. Each lesson should have **400–500 words of rich content**, including:
   - At least 2–3 headings
   - Detailed descriptions
   - Code examples (if applicable)
   - Bullet points for key takeaways
   - Images (if applicable)
3. Distribute the lessons evenly across the 5 phases, with at least 6 lessons per phase.
4. Return only the JSON object. Do not include any additional text, explanations, or markdown formatting.
`;

  const result = await model.generateContent(prompt);
  const content = result.response.text();

  if (!content) throw new Error("No content received from Gemini");

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to extract JSON");

  let roadmapData;
  roadmapData = JSON.parse(jsonMatch[0]);
  if (!roadmapData) throw new Error("Failed to parse JSON");

  // Ensure all sections have content
  roadmapData.phases.forEach((phase: any) => {
    phase.lessons.forEach((lesson: any) => {
      lesson.sections.forEach((section: any) => {
        if (Array.isArray(section.content)) {
          section.content = section.content.join(", ");
        }
        if (!section.content) {
          section.content = "Default content";
        }
      });
    });
  });

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
    tips: roadmapData.phases.flatMap((phase: any) =>
      phase.lessons.flatMap((lesson: any) =>
        lesson.tips.map((tip: { title: string; content: string }) => ({
          title: tip.title,
          content: tip.content,
        }))
      )
    ),
  });

  await user.save();

  return roadmap;
};

export const fetchRoadmapsService = async (userId: string) => {
  const roadmaps = await RoadmapModel.find({ userId });
  return roadmaps;
};