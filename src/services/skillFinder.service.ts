import questionModel from "../models/question.model";

export const findSkillsService = async (answers: { questionId: string, answer: string }[]) => {
    // Create an array to hold all the suggested skills
    let suggestedSkills: string[] = [];

    // Loop through the answers and match skills based on the answer
    for (const answer of answers) {
        const question = await questionModel.findById(answer.questionId);
        if (question && question.skillMapping && question.skillMapping[answer.answer]) {
            suggestedSkills.push(...question.skillMapping[answer.answer]);
        }
    }

    // Remove duplicate skills
    suggestedSkills = [...new Set(suggestedSkills)];

    return suggestedSkills;
};
