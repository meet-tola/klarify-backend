import "dotenv/config";
import QuestionModel from "../models/skillQuestion.model";
import connectDB from "../config/database.config";

const questions = [
  {
    questionText: "How do you approach problem-solving?",
    options: ["Logical Analysis", "Creative Thinking", "Team Collaboration"],
    skillMapping: {
      "Logical Analysis": ["problem-solving", "critical thinking"],
      "Creative Thinking": ["creativity", "innovation"],
      "Team Collaboration": ["teamwork", "communication"],
      "default": ["adaptability"],
    },
  },
  {
    questionText: "How do you handle stressful situations?",
    options: ["Stay Calm", "Seek Help", "Take Breaks"],
    skillMapping: {
      "Stay Calm": ["stress management", "resilience"],
      "Seek Help": ["communication", "teamwork"],
      "Take Breaks": ["self-care", "work-life balance"],
      "default": ["adaptability"],
    },
  },
];

const seedQuestions = async () => {
  await connectDB();
  await QuestionModel.deleteMany();
  await QuestionModel.insertMany(questions);
  console.log("Questions have been seeded.");
  process.exit();
};

seedQuestions();
