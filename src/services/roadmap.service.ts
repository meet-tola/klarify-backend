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

  // Updated AI Prompt - Generate basic structure without sections
  const prompt = `
You are an expert AI course creator specializing in comprehensive skill development. Generate a detailed, structured learning roadmap for "${skill}" at the "${level}" level in STRICT JSON format.
Prioritize creating a complete, valid JSON structure even if it means slightly deviating from strict word counts.

### COMPLETE COURSE STRUCTURE (WITHOUT SECTIONS):
{
  "title": "Complete ${skill} Mastery: From ${level} to Proficient",
  "skill": "${skill}",
  "level": "${level}",
  "tips": [
    {
      "title": "Good title for the first general tip",
      "content": "Description of the first general tip for mastering the skill across all phases of the course."
    },
    {
      "title": "Good title for the second general tip",
      "content": "Description of the second general tip for mastering the skill across all phases of the course."
    },
    {
      "title": "Good title for the third general tip",
      "content": "Description of the third general tip for mastering the skill across all phases of the course."
    },
    {
      "title": "Good title for the fourth general tip",
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
        {
        "name": "Project 3 Title",
        "description": "Brief overview of the project and its learning objectives.",
        "features": ["Key feature 1", "Key feature 2", "Key feature 3"]
      }
    ]
  },
  "phases": [
    {
      "phaseTitle": "Phase 1: Foundations",
      "phaseDescription": "Build core fundamentals and basic concepts",
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
          "sections": [], // LEAVE THIS EMPTY - SECTIONS WILL BE GENERATED LATER
          "resources": {
            "exercises": ["Build a simple X", "Practice Y technique"]
          }
        }
      ]
    },
    {
      "phaseTitle": "Core Concepts",
      "phaseDescription": ".....",
      "lessons": [...]
    },
    {
      "phaseTitle": "Practical Applications",
      "phaseDescription": ".....",
      "lessons": [...]
    },
    {
      "phaseTitle": "Intermediate Techniques",
      "phaseDescription": ".....",
      "lessons": [...]
    },
    {
      "phaseTitle": "Advanced Topics",
      "phaseDescription": ".....",
      "lessons": [...]
    },
    {
      "phaseTitle": "Mastery and Real-world Implementation",
      "phaseDescription": ".....",
      "lessons": [...]
    } 
  ]
}
### PHASE PROGRESSION GUIDE:
1. Phase 1: Absolute Fundamentals
2. Phase 2: Core Concepts
3. Phase 3: Practical Applications
4. Phase 4: Intermediate Techniques
5. Phase 5: Advanced Topics
6. Phase 6: Mastery and Real-world Implementation

Remember: Your response MUST contain exactly 6 phases or i will be rejected!

### REQUIREMENTS:
1. Generate 6 complete phases with 6-8 lessons each
2. 6 phases must completely cover the skill from beginner to advanced level
3. Leave "sections" array empty for all lessons
4. Include all other required fields (title, summary, resources, etc.)
5. Ensure valid JSON output with no comments or markdown
`;

  const response = await client.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 15000,
  });

  const content = response.choices[0]?.message?.content;

  if (!content) throw new Error("No content received from OpenAI");

  // const result = await model.generateContent(prompt);
  // const content = result.response.text();
  // if (!content) throw new Error("No content received from Gemini");

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to extract JSON");

  let roadmapData;
  roadmapData = JSON.parse(jsonMatch[0]);


  if (!roadmapData) throw new Error("Failed to parse JSON");

  // Validate the basic structure
  if (!roadmapData.phases || !Array.isArray(roadmapData.phases)) {
    throw new Error("Invalid phases data");
  }

  // Fetch supplementary resources using AI-generated keywords from roadmapData
  const youtubeVideos = await fetchYouTubeVideos(roadmapData.resources.youtubeVideos);
  const articles = await fetchArticles(roadmapData.resources.articles);

  // Save roadmap to MongoDB without sections
  const roadmap = new RoadmapModel({
    userId: user._id,
    skill: roadmapData.skill,
    level: roadmapData.level,
    title: roadmapData.title,
    phases: roadmapData.phases,
    resources: {
      youtubeVideos,
      articles,
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
    projects: roadmapData.resources.projects.map((project: { name: string; description: string; features: string[] }) => ({
      name: project.name,
      description: project.description,
      features: project.features,
    })),
    tips: roadmapData.tips,
  });

  await user.save();

  return roadmap;
};

export const generateLessonSectionsService = async (userId: string, roadmapId: string, phaseIndex: number = 0): Promise<{ roadmap: any; completed: boolean; nextPhaseIndex?: number } | { completed: boolean; message: string }> => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");

  const roadmap = await RoadmapModel.findOne({
    _id: roadmapId,
    userId
  });
  if (!roadmap) throw new BadRequestException("Roadmap not found or doesn't belong to user");

  // 2. Check if we've processed all phases
  if (phaseIndex >= roadmap.phases.length) {
    return {
      roadmap,
      completed: true
    };
  }

  const phase = roadmap.phases[phaseIndex];
  let hasGeneratedSections = false;

  // 3. Process each lesson in the phase
  for (let lessonIndex = 0; lessonIndex < phase.lessons.length; lessonIndex++) {
    const lesson = phase.lessons[lessonIndex];

    // Skip if lesson already has sections
    if (lesson.sections && lesson.sections.length > 0) continue;

    // Generate sections for this lesson
    const prompt = `
You are an expert AI course creator. Generate detailed sections for the following lesson in STRICT JSON format.

### LESSON DETAILS:
- Skill: ${roadmap.skill}
- Level: ${roadmap.level}
- Phase: ${phase.phaseTitle}
- Lesson Title: ${lesson.lessonTitle}
- Lesson Summary: ${JSON.stringify(lesson.lessonSummary)}

Generate a JSON object with a "sections" array containing three objects.
{
  "sections": [
    {
      "sectionTitle": "Title (6-8 words)",
      "sectionType": "Concept Explanation",
      "keyPoints": {
        "metadata": ["bullets"],
        "items": [
          "15-30 word key takeaway",
          "15-30 word key takeaway",
          "15-30 word key takeaway"
        ]
      }
      "content": [
        {
          "heading": {
            "text": "Specific concept (4-6 words)",
            "metadata": ["bold"]
          },
          "description": [
            {
              "text": "80-120 word detailed explanation",
              "metadata": []
            }
          ],
          "examples": [
            {
              "type": "case-study",
              "content": "50-100 word practical example",
              "metadata": []
            }
          ]
        }
      ],
      
    },
    {
      "sectionTitle": "Title (6-8 words)",
      "sectionType": "Practical Exercise",
      "keyPoints": {
        "metadata": ["bullets"],
        "items": [
          "15-30 word key takeaway",
          "15-30 word key takeaway",
          "15-30 word key takeaway"
        ]
      }
      "content": [
        {
          "heading": {
            "text": "Specific concept (4-6 words)",
            "metadata": ["bold"]
          },
          "description": [
            {
              "text": "80-120 word detailed explanation",
              "metadata": []
            }
          ],
          "examples": [
            {
              "type": "code-sample",
              "content": "50-100 word practical example",
              "metadata": []
            }
          ]
        }
      ],
      
    },
    {
      "sectionTitle": "Title (6-8 words)",
      "sectionType": "Case Study",
      "keyPoints": {
        "metadata": ["bullets"],
        "items": [
          "15-30 word key takeaway",
          "15-30 word key takeaway",
          "15-30 word key takeaway"
        ]
      }
      "content": [
        {
          "heading": {
            "text": "Specific concept (4-6 words)",
            "metadata": ["bold"]
          },
          "description": [
            {
              "text": "80-120 word detailed explanation",
              "metadata": []
            }
          ],
          "examples": [
            {
              "type": "analogy",
              "content": "50-100 word practical example",
              "metadata": []
            }
          ]
        }
      ],
      
    }
  ]
}


`;

    const response = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
      temperature: 0.7,
      max_tokens: 10000,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) throw new Error("No content received from OpenAI");

    // const result = await model.generateContent(prompt);
    // const content = result.response.text();
    // if (!content) throw new Error("No content received from Gemini");
    
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to extract JSON");

    function sanitizeJSON(input: string): string {
      return input.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
    }


    let rawJSON = jsonMatch?.[0];
    rawJSON = sanitizeJSON(rawJSON);

    let sectionsData;
    try {
      sectionsData = JSON.parse(rawJSON);

      // Validate each section within the array
      sectionsData.sections.forEach((section: any) => {
        if (!section.sectionTitle || !section.sectionType || !Array.isArray(section.content) || typeof section.keyPoints !== 'object' || !Array.isArray(section.keyPoints.items)) {
          console.error("Malformed JSON (Invalid section structure):", JSON.stringify(section, null, 2));
          throw new Error('Invalid section structure');
        }
        if (section.content.some((c: any) => c.keyPoints)) {
          console.error("Malformed JSON ('keyPoints' found in content):", JSON.stringify(section.content.find((c: any) => c.keyPoints), null, 2));
          throw new Error('keyPoints found in content array');
        }
      });
    } catch (err: any) {
      console.error('Sanitized JSON:', rawJSON);
      throw new Error(`JSON parsing failed: ${err.message}`);
    }

    if (!sectionsData?.sections || !Array.isArray(sectionsData.sections)) {
      throw new Error("Invalid sections data format");
    }

    // Validate sections structure
    sectionsData.sections.forEach((section: any) => {
      if (!section.sectionTitle || !section.sectionType || !section.content || !section.keyPoints) {
        throw new Error("Invalid section structure");
      }
    });

    // Update the lesson with the generated sections
    lesson.sections = sectionsData.sections;
    hasGeneratedSections = true;
  }

  // 4. Save changes if we generated any sections
  if (hasGeneratedSections) {
    roadmap.markModified(`phases.${phaseIndex}.lessons`);
    await roadmap.save();
  }

  // 5. Determine if we should continue to next phase
  const allPhasesCompleted = phaseIndex >= roadmap.phases.length - 1;
  const currentPhaseFullyProcessed = phase.lessons.every(
    lesson => lesson.sections && lesson.sections.length > 0
  );

  return {
    roadmap,
    completed: allPhasesCompleted && currentPhaseFullyProcessed,
    nextPhaseIndex: currentPhaseFullyProcessed ? phaseIndex + 1 : phaseIndex
  };
};

export const fetchRoadmapsService = async (userId: string) => {
  const roadmaps = await RoadmapModel.find({ userId });
  return roadmaps;
};