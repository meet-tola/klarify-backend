import questionModel from "../models/question.model";
import SkillModel from "../models/skill.model";

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
