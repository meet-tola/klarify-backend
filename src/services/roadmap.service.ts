import { GoogleGenerativeAI } from "@google/generative-ai";
import { BadRequestException } from "../utils/appError";
import UserModel from "../models/user.model";
import RoadmapModel from "../models/roadmap.model";
import { config } from "../config/app.config";
import { fetchYouTubeVideos, fetchArticles, fetchProjects, fetchArticlesFromGoogle } from "../services/learningResources.service";
import OpenAI from "openai";
import { getMainContentPrompt, getPhasesPrompt, getSectionPrompt } from "../utils/prompt";

const apiKey = config.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const token = config.OPENAI_API_KEY;


const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 200000,
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

  // Generate main content (without phases)
  // const mainContentResponse = await client.chat.completions.create({
  //   messages: [{ role: "user", content: getMainContentPrompt(skill, level) }],
  //   model: "gpt-4o",
  //   temperature: 0.7,
  //   max_tokens: 4000,
  // });

  // const mainContent = mainContentResponse.choices[0]?.message?.content;
  // if (!mainContent) throw new Error("No main content received from OpenAI");

  const mainContentResponse = await model.generateContent(getMainContentPrompt(skill, level));
  const mainContent = mainContentResponse.response.text();
  if (!mainContent) throw new Error("No content received from Gemini AI");


  const mainContentJsonMatch = mainContent.match(/\{[\s\S]*\}/);
  if (!mainContentJsonMatch) throw new Error("Failed to extract JSON from main content");

  let roadmapData = JSON.parse(mainContentJsonMatch[0]);
  if (!roadmapData) throw new Error("Failed to parse main content JSON");

  // Generate phases separately
  // const phasesResponse = await client.chat.completions.create({
  //   messages: [{ role: "user", content: getPhasesPrompt(skill, level) }],
  //   model: "gpt-4o",
  //   temperature: 0.7,
  //   max_tokens: 10000,
  // });

  // const phasesContent = phasesResponse.choices[0]?.message?.content;
  // if (!phasesContent) throw new Error("No phases content received from OpenAI");

  const phasesResponse = await model.generateContent(getPhasesPrompt(skill, level));
  const phasesContent = phasesResponse.response.text();
  if (!phasesContent) throw new Error("No content received from Gemini AI");

  const phasesJsonMatch = phasesContent.match(/\[[\s\S]*\]/);
  if (!phasesJsonMatch) throw new Error("Failed to extract JSON from phases content");

  const phasesData = JSON.parse(phasesJsonMatch[0]);
  if (!phasesData || !Array.isArray(phasesData) || phasesData.length !== 6) {
    throw new Error("Invalid phases data - must contain exactly 6 phases");
  }

  // Process each phase and fetch lesson resources
  for (const phase of phasesData) {
    for (const lesson of phase.lessons) {
      // Fetch YouTube videos for the lesson
      if (lesson.resources?.youtubeVideos) {
        lesson.resources.youtubeVideos = await fetchYouTubeVideos(lesson.resources.youtubeVideos);
      } else {
        lesson.resources.youtubeVideos = [];
      }

      // Fetch articles for the lesson
      if (lesson.resources?.articles) {
        lesson.resources.articles = await fetchArticlesFromGoogle(lesson.resources.articles);
      } else {
        lesson.resources.articles = [];
      }

      // Ensure exercises exists
      if (!lesson.resources?.exercises) {
        lesson.resources.exercises = [];
      }
    }
  }

  // Combine both results
  roadmapData.phases = phasesData;

  // Fetch supplementary resources for the main roadmap
  const youtubeVideos = await fetchYouTubeVideos(roadmapData.resources.youtubeVideos);
  const articles = await fetchArticlesFromGoogle(roadmapData.resources.youtubeVideos);

  // Save roadmap to MongoDB
  const roadmap = new RoadmapModel({
    userId: user._id,
    skill: roadmapData.skill,
    level: roadmapData.level,
    title: roadmapData.title,
    phases: roadmapData.phases.map((phase: { phaseTitle: string; phaseDescription: string; lessons: any[] }) => ({
      phaseTitle: phase.phaseTitle,
      phaseDescription: phase.phaseDescription,
      lessons: phase.lessons.map(lesson => ({
        lessonTitle: lesson.lessonTitle,
        lessonSummary: lesson.lessonSummary,
        sections: lesson.sections || [],
        resources: {
          exercises: lesson.resources.exercises,
          youtubeVideos: lesson.resources.youtubeVideos,
          articles: lesson.resources.articles
        }
      }))
    })),
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

export const generateLessonSectionsService = async (
  userId: string,
  roadmapId: string,
  phaseIndex: number = 0
): Promise<void> => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");

  const roadmap = await RoadmapModel.findOne({ _id: roadmapId, userId });
  if (!roadmap) throw new BadRequestException("Roadmap not found or doesn't belong to user");

  // Out of bounds check
  if (phaseIndex >= roadmap.phases.length) return;

  const phase = roadmap.phases[phaseIndex];
  let hasGeneratedSections = false;

  for (let lessonIndex = 0; lessonIndex < phase.lessons.length; lessonIndex++) {
    const lesson = phase.lessons[lessonIndex];

    if (lesson.sections && lesson.sections.length > 0) continue;

    // const response = await client.chat.completions.create({
    //   messages: [{
    //     role: "user",
    //     content: getSectionPrompt(
    //       roadmap.skill,
    //       roadmap.level,
    //       phase.phaseTitle,
    //       lesson.lessonTitle,
    //       JSON.stringify(lesson.lessonSummary)
    //     )
    //   }],
    //   model: "gpt-4o",
    //   temperature: 0.7,
    //   max_tokens: 10000,
    // });

    // const content = response.choices[0]?.message?.content;
    // if (!content) throw new Error("No content received from OpenAI");

    const response = await model.generateContent(getSectionPrompt(
      roadmap.skill,
      roadmap.level,
      phase.phaseTitle,
      lesson.lessonTitle,
      JSON.stringify(lesson.lessonSummary)
    ));
    const content = response.response.text();
    if (!content) throw new Error("No content received from Gemini AI");

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Failed to extract JSON");

    function sanitizeJSON(input: string): string {
      return input.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
    }

    let rawJSON = sanitizeJSON(jsonMatch[0]);

    let sectionsData;
    try {
      sectionsData = JSON.parse(rawJSON);

      sectionsData.sections.forEach((section: any) => {
        if (!section.sectionTitle || !section.sectionType || !Array.isArray(section.content) || !section.keyPoints) {
          throw new Error("Invalid section structure");
        }
      });
    } catch (err: any) {
      console.error('Sanitized JSON:', rawJSON);
      throw new Error(`JSON parsing failed: ${err.message}`);
    }

    lesson.sections = sectionsData.sections;
    hasGeneratedSections = true;
  }

  if (hasGeneratedSections) {
    roadmap.markModified(`phases.${phaseIndex}.lessons`);

    // Mark sectionsGenerated = true after phase 0 is fully done
    const currentPhaseComplete = phase.lessons.every(
      l => l.sections && l.sections.length > 0
    );
    if (phaseIndex === 0 && currentPhaseComplete) {
      roadmap.sectionsGenerated = true;
    }

    await roadmap.save();
  }

  // Automatically proceed to next phase
  if (phaseIndex + 1 < roadmap.phases.length) {
    await generateLessonSectionsService(userId, roadmapId, phaseIndex + 1);
  }
};

export const checkSectionsGeneratedService = async (roadmapId: string) => {
  const roadmap = await RoadmapModel.findOne({ _id: roadmapId });
  if (!roadmap) throw new BadRequestException("Roadmap not found or doesn't belong to user");

  return {
    sectionsGenerated: roadmap.sectionsGenerated || false,
    roadmapTitle: roadmap.title,
    totalPhases: roadmap.phases.length,
  };
};


export const fetchRoadmapBySkillService = async (userId: string, pickedSkill: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new BadRequestException("User not found");

  const learningPath = user.learningPath.find((path) => path.skill === pickedSkill);
  if (!learningPath) throw new BadRequestException("Skill not found in learning path");

  const roadmap = await RoadmapModel.findById(learningPath.roadmap);
  if (!roadmap) throw new BadRequestException("Roadmap not found");

  return roadmap;
};
