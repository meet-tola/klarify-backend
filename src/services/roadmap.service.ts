import { GoogleGenerativeAI } from "@google/generative-ai";
import { BadRequestException } from "../utils/appError";
import UserModel from "../models/user.model";
import RoadmapModel from "../models/roadmap.model";
import { config } from "../config/app.config";
import { fetchYouTubeVideos, fetchArticles, fetchProjects } from "../services/learningResources.service";
import OpenAI from "openai";

const apiKey = config.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const token = config.OPENAI_API_KEY;


const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 200000,
    responseMimeType: "application/json",
  },
});

const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: token,
});

export const generateRoadmapContentService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");
  if (!user.pickedSkill) throw new BadRequestException("No skill selected");

  const skill = user.pickedSkill;
  const level = user.learningPath[0]?.level || "Beginner";

  // Updated AI Prompt - Structured JSON format
  const prompt = `
You are an expert AI course creator specializing in comprehensive skill development. Generate a detailed, structured learning roadmap for "${skill}" at the "${level}" level in STRICT JSON format.
Prioritize creating a complete, valid JSON structure even if it means slightly deviating from strict word counts.

### COMPLETE COURSE STRUCTURE:
{
  "title": "Complete ${skill} Mastery: From ${level} to Proficient",
  "skill": "${skill}",
  "level": "${level}",
  "tips": [
    {
      "title": "General Skill Mastery Tip 1",
      "content": "Description of the first general tip for mastering the skill across all phases of the course."
    },
    {
      "title": "General Skill Mastery Tip 2",
      "content": "Description of the second general tip for mastering the skill across all phases of the course."
    },
    {
      "title": "General Skill Mastery Tip 3",
      "content": "Description of the third general tip for mastering the skill across all phases of the course."
    },
    {
      "title": "General Skill Mastery Tip 4",
      "content": "Description of the fourth general tip for mastering the skill across all phases of the course."
    }
  ],
  "resources": {
    "youtubeVideos": "single keyword related to ${skill} for sourcing all YouTube videos",
    "articles": "single keyword related to ${skill} for sourcing all relevant articles",
    "projects": [
      {
        "name": "Project 1 Title",
        "description": "Brief overview of the project and its learning objectives.",
        "features": ["Key feature 1", "Key feature 2", "Key feature 3"]
      },
      {
        "name": "Project 2 Title",
        "description": "Brief overview of the project and its learning objectives.",
        "features": ["Key feature 1", "Key feature 2", "Key feature 3"]
      }
    ]
  },
  "phases": [
    {
      "phaseTitle": "Phase 1: Foundations",
      "phaseDescription": "Build core fundamentals and basic concepts",
      "phaseKeywords": ["basics", "fundamentals", "getting-started"],
      "lessons": [
        {
          "lessonTitle": "Essential ${skill} Concepts",
          "lessonSummary": {
            "heading": "Mastering the building blocks",
            "description": [
              "This lesson establishes the foundational knowledge required for ${skill}.",
              "We'll explore core principles every ${level} practitioner needs to know.",
              "Practical examples will demonstrate real-world application."
            ]
          },
          "sections": [
            {
              "sectionTitle": "Core Principles Explained",
              "sectionType": "Concept Explanation",
              "content": [
                {
                  "heading": {
                    "text": "What is ${skill}?",
                    "metadata": ["bold"]
                  },
                  "description": [
                    {
                      "text": "[80-120 words] Comprehensive definition covering key aspects, historical context if relevant, and modern applications. Explain why this skill matters in today's context.",
                      "metadata": []
                    }
                  ],
                  "examples": [
                    {
                      "type": "case-study",
                      "content": "[50-100 words] Real-world scenario showing application",
                      "metadata": ["warning"]
                    }
                  ]
                }
              ],
              "keyPoints": {
                "metadata": ["bullets"],
                "items": [
                  "Key takeaway 1 (15-30 words)",
                  "Key takeaway 2 (15-30 words)"
                ]
              }
            }
          ],
          "resources": {
            "exercises": ["Build a simple X", "Practice Y technique"]
          }
        }
      ]
    },
    {
      "phaseTitle": "Phase 2: Core Concepts",
      "phaseDescription": "Deeper exploration of essential techniques",
      "phaseKeywords": ["intermediate", "techniques", "applications"]
      ....
    },
      {
      "phaseTitle": "Phase 3: .......",
      "phaseDescription": "......",
      "phaseKeywords": ["......"]
      ....
    }
  ]
}

### REQUIRED ELEMENTS FOR EACH COMPONENT:

1. **PHASE REQUIREMENTS:**
   - Title: "Phase [1-5]: [Descriptive Name]"  
   - Description: 2-3 sentences (40-60 words).  
   - 4-6 complete lessons per phase.

2. **LESSON REQUIREMENTS:**
   - Title: Clear focus area (e.g., "Data Structures in ${skill}").  
   - Summary:  
     - "heading": 1 sentence (10-15 words).  
     - "description": 2 paragraphs (40-60 words each).  
   - 3 detailed sections.  
   - Resources should **only include 2-3 exercises** (no YouTube videos or articles at the lesson level).  

3. **SECTION REQUIREMENTS:**
   - Title: Specific concept/task name.  
   - Type: One of ["Concept", "Practice", "Example"].  
   - Content:  
     - 2 description paragraphs (80-100 words each).  
     - 1-2 examples (50-70 words each).  
     - 3-5 key points (15-30 words each).  

4. **RESOURCE REQUIREMENTS (Global, NOT per lesson):**
   - **YouTube Videos:** 1 **unique keyword** related to the skill for sourcing all relevant YouTube content.  
   - **Articles:** 1 **unique keyword** related to the skill for sourcing all relevant articles.  
   - **Projects:**  
     - At least **two projects** with a **title, description, and key features**.  

5. **TIPS REQUIREMENTS:**
   - 5 general **actionable** tips for the **entire course**.  
   - Each tip should have:  
     - A title (5-8 words).  
     - Content (20-30 words) with relevant descriptions and metadata.  
   - These tips should apply **to the whole course** and **not individual lessons**.  

### CONTENT QUALITY CHECKS:
1. Verify **ALL elements exist** in every lesson:  
   - Title.  
   - Summary (heading + description).  
   - Sections (with complete content).  
   - Resources (only **2-3 exercises per lesson**).  

2. Validate **word counts**:  
   - Lesson descriptions: **80-100 words total**.  
   - Section content: **200-250 words total**.  

3. **Ensure no placeholder text exists**.

### FINAL OUTPUT REQUIREMENTS:
1. **Valid JSON only**.  
2. **5 complete phases**.  
3. **6 lessons per phase**.  
4. **All specified fields populated**.  
5. **No markdown or commentary**.  

STRICT REQUIREMENTS:
IMPORTANT: Return ONLY valid JSON, with all property names double-quoted and no comments, markdown, or explanations. Use strict JSON syntax. Your output will be parsed directly by a JSON parser.

`;

  const result = await model.generateContent(prompt);
  const content = result.response.text();
  if (!content) throw new Error("No content received from Gemini");


  // const response = await client.chat.completions.create({
  //   messages: [{ role: "user", content: prompt }],
  //   model: "gpt-4o",
  //   temperature: 0.7,
  //   max_tokens: 10000,
  // });

  // const content = response.choices[0]?.message?.content;

  // if (!content) throw new Error("No content received from OpenAI");

  console.log("Generated content:", content);

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to extract JSON");

  let roadmapData;
  roadmapData = JSON.parse(jsonMatch[0]);
  if (!roadmapData) throw new Error("Failed to parse JSON");

  roadmapData.phases.forEach((phase: any) => {
    phase.lessons.forEach((lesson: any) => {
      lesson.sections.forEach((section: any) => {
        if (!section.content) {
          section.content = [];
        } else if (!Array.isArray(section.content)) {
          section.content = [section.content];
        }
  
        section.content.forEach((contentItem: any, index: number) => {
          if (!contentItem.heading || !contentItem.heading.text) {
            throw new Error(
              `Missing heading in phase: "${phase.phaseTitle}", lesson: "${lesson.lessonTitle}", section: "${section.sectionTitle}", content index: ${index}`
            );
          }
        });
      });
    });
  });
  

  // Fetch supplementary resources using AI-generated keywords from roadmapData
  const youtubeVideos = await fetchYouTubeVideos(roadmapData.resources.youtubeVideos);
  const articles = await fetchArticles(roadmapData.resources.articles);

  // Save roadmap to MongoDB
  const roadmap = new RoadmapModel({
    userId: user._id,
    skill:roadmapData.skill,
    level: roadmapData.level,
    title: roadmapData.title,
    phases: roadmapData.phases,
    resources: {
      articles: roadmapData.resources.articles,
      youtubeVideos: roadmapData.resources.youtubeVideos,
      projects: roadmapData.resources.projects
    },
    tips: roadmapData.tips,
  });

  await roadmap.save();

  // Save to userModel.learningPath
  user.learningPath.push({
    skill,
    level,
    roadmap: roadmap._id,
    youtubeVideos,
    articles,
    projects: roadmapData.resources.projects.map((project: { title: string; description: string; features: string[] }) => ({
      name: project.title,
      description: project.description,
      features: project.features,
    })),
    tips: roadmapData.tips,
  });

  await user.save();

  return roadmap;

};

export const fetchRoadmapsService = async (userId: string) => {
  const roadmaps = await RoadmapModel.find({ userId });
  return roadmaps;
};