import questionModel from "../models/skillQuestion.model";
import SkillModel from "../models/skill.model";
import UserModel from "../models/user.model";
import { NotFoundException } from "../utils/appError";

export const findSkillsService = async (answers: { questionId: string; answer: string }[]) => {
  let suggestedSkills: string[] = [];

  // Loop through answers to find suggested skills
  for (const answer of answers) {
    const question = await questionModel.findById(answer.questionId);
    if (question && question.skillMapping) {
      if (question.skillMapping[answer.answer]) {
        suggestedSkills.push(...question.skillMapping[answer.answer]);
      } else if (question.skillMapping["default"]) {
        suggestedSkills.push(...question.skillMapping["default"]);
      }
    }
  }

  // If no relevant answers, randomly pick 10 skills from all available
  if (suggestedSkills.length === 0) {
    const allSkills = await SkillModel.find();
    const randomSkills = allSkills
      .sort(() => 0.5 - Math.random()) // Shuffle skills
      .slice(0, 10) // Pick first 10
      .map(skill => skill.name);
    suggestedSkills = randomSkills;
  }

  return [...new Set(suggestedSkills)];
};


export const getSuggestedSkillsService = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }
  return user.selectedSkills;
};

export const selectSkillService = async (userId: string, pickedSkill: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
  
    if (!user.selectedSkills.includes(pickedSkill)) {
      throw new NotFoundException("Skill not in suggested skills");
    }
  
    user.pickedSkill = pickedSkill;
    await user.save();
    return user.pickedSkill;
  };




