import questionModel from "../models/skillQuestion.model";
import SkillModel from "../models/skill.model";
import UserModel from "../models/user.model";
import { NotFoundException } from "../utils/appError";

const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

export const findSkillsService = async (answers: { questionId: string; answer: string }[]) => {
  let primaryCategories: Set<string> = new Set();
  let secondaryCategories: Set<string> = new Set();

  // Loop through answers to find suggested categories
  for (const answer of answers) {
    const question = await questionModel.findById(answer.questionId);
    if (question?.skillMapping?.[answer.answer]) {
      const { primary = [], secondary = [] } = question.skillMapping[answer.answer];

      // Add categories while ensuring uniqueness
      primary.forEach((cat: string) => primaryCategories.add(cat));
      secondary.forEach((cat: string) => secondaryCategories.add(cat));
    }
  }

  // Remove any secondary categories that are also in primary
  secondaryCategories = new Set([...secondaryCategories].filter(cat => !primaryCategories.has(cat)));

  // Fetch skills from DB
  const primarySkills = await SkillModel.find({ category: { $in: [...primaryCategories] } });
  const secondarySkills = await SkillModel.find({ category: { $in: [...secondaryCategories] } });

  // Format skills to return all selected primary and secondary skills
  const formatSkill = (skill: any) => ({
    category: skill.category,
    keySkills: skill.keySkills || [],
    jobRoles: skill.jobRoles || [],
  });

  return {
    primarySkills: primarySkills.map(formatSkill),
    secondarySkills: secondarySkills.map(formatSkill),
  };
};

export const getSuggestedSkillsService = async (userId: string) => {
  const user = await UserModel.findById(userId) as {
    selectedSkills?: {
      primary?: { category: string }[];
      secondary?: { category: string }[];
    };
  };

  if (!user || !user.selectedSkills) {
    throw new NotFoundException("User has no selected skills");
  }

  // Extract categories from primary and secondary skills
  const primaryCategories = user.selectedSkills.primary?.map(skill => skill.category) || [];
  const secondaryCategories = user.selectedSkills.secondary?.map(skill => skill.category) || [];

  const primarySkills = await SkillModel.find({ category: { $in: primaryCategories } }) as Array<{ _id: any; category: string; description: string; keySkills?: string[]; jobRoles?: string[] }>;
  const secondarySkills = await SkillModel.find({ category: { $in: secondaryCategories } }) as Array<{ _id: any; category: string; description: string; keySkills?: string[]; jobRoles?: string[] }>;

  const shuffledPrimary = shuffleArray(primarySkills);
  const shuffledSecondary = shuffleArray(secondarySkills);

  return {
    primary: shuffledPrimary.map(skill => ({
      id: String(skill._id),
      title: skill.category,
      description: skill.description,
      skills: skill.keySkills || [],
      roles: skill.jobRoles || [],
    })),
    secondary: shuffledSecondary.map(skill => ({
      id: skill._id.toString(),
      title: skill.category,
      description: skill.description,
      skills: skill.keySkills || [],
      roles: skill.jobRoles || [],
    })),
  };
};

export const selectSkillService = async (userId: string, pickedSkill: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  // Check if the picked skill is in the user's selected skills
  if (!Array.isArray(user.selectedSkills) || !user.selectedSkills.includes(pickedSkill)) {
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