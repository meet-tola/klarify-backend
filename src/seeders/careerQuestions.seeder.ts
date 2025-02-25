import "dotenv/config";
import CareerModel from "../models/career.model";
import  connectDB  from "../config/database.config";

const careerQuestions = [
  {
    skill: "communication",
    question: "How do you handle communication challenges in a team?",
    answers: [
      "Open dialogue",
      "Active listening",
      "Clear articulation of ideas"
    ]
  },
  {
    skill: "leadership",
    question: "What is your leadership style?",
    answers: [
      "Transformational",
      "Servant leadership",
      "Authoritative"
    ]
  },
  {
    skill: "time management",
    question: "How do you prioritize tasks?",
    answers: [
      "Eisenhower Matrix",
      "Time blocking",
      "To-do lists"
    ]
  }
];

const seedCareerQuestions = async () => {
  await connectDB();
  await CareerModel.deleteMany(); // Clear existing questions
  await CareerModel.insertMany(careerQuestions);
  console.log("Career questions have been seeded.");
  process.exit();
};

seedCareerQuestions();
