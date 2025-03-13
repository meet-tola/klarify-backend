import questionModel from "../models/skillQuestion.model";
import SkillModel from "../models/skill.model";
import UserModel from "../models/user.model";
import { NotFoundException } from "../utils/appError";

export const findSkillsService = async (answers: { questionId: string; answer: string }[]) => {
  let suggestedCategories: string[] = [];

  // Loop through answers to find suggested categories
  for (const answer of answers) {
    const question = await questionModel.findById(answer.questionId);
    if (question && question.skillMapping) {
      if (question.skillMapping[answer.answer]) {
        suggestedCategories.push(...question.skillMapping[answer.answer]);
      } else if (question.skillMapping["default"]) {
        suggestedCategories.push(...question.skillMapping["default"]);
      }
    }
  }

  // Remove duplicate categories
  suggestedCategories = [...new Set(suggestedCategories)];

  // Fetch skills based on suggested categories
  let suggestedSkills: { category: string; keySkills: string[]; jobRoles: string[] }[] = [];

  if (suggestedCategories.length > 0) {
    // Find skills that match the suggested categories
    const skills = await SkillModel.find({ category: { $in: suggestedCategories } });
    suggestedSkills = skills.map((skill) => ({
      category: skill.category,
      keySkills: skill.keySkills,
      jobRoles: skill.jobRoles,
    }));
  } else {
    // If no relevant answers, randomly pick 10 skills from all available
    const allSkills = await SkillModel.find();
    const randomSkills = allSkills
      .sort(() => 0.5 - Math.random()) // Shuffle skills
      .slice(0, 10) // Pick first 10
      .map((skill) => ({
        category: skill.category,
        keySkills: skill.keySkills,
        jobRoles: skill.jobRoles,
      }));
    suggestedSkills = randomSkills;
  }

  return suggestedSkills;
};

export const getSuggestedSkillsService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const suggestedSkills = await SkillModel.find({ category: { $in: user.selectedSkills } });
  return suggestedSkills.map((skill, index) => ({
    id: `skill-${index}`, 
    title: skill.category, 
    description: skill.description, 
    skills: skill.keySkills,
    roles: skill.jobRoles,
  }));
};

export const selectSkillService = async (userId: string, pickedSkill: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  // Check if the picked skill is in the user's selected skills
  if (!user.selectedSkills || !user.selectedSkills.includes(pickedSkill)) {
    throw new NotFoundException("Skill not in suggested skills");
  }

  // Update the user's picked skill
  user.pickedSkill = pickedSkill;
  await user.save();

  // Return the full skill details
  const skill = await SkillModel.findOne({ category: pickedSkill });
  if (!skill) {
    throw new NotFoundException("Skill details not found");
  }

  return {
    category: skill.category,
    keySkills: skill.keySkills,
    jobRoles: skill.jobRoles,
  };
};