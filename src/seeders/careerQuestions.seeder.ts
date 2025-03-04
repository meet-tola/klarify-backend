import "dotenv/config";
import CareerModel from "../models/career.model";
import connectDB from "../config/database.config";

const careerQuestions = [
  {
    skill: "communication",
    questions: [
      {
        question: "How do you handle communication challenges in a team?",
        answers: ["Open dialogue", "Active listening", "Clear articulation of ideas"]
      },
      {
        question: "How do you adapt your communication style for different audiences?",
        answers: ["Adjust tone", "Simplify language", "Use visual aids"]
      }
    ]
  },
  {
    skill: "leadership",
    questions: [
      {
        question: "What is your leadership style?",
        answers: ["Transformational", "Servant leadership", "Authoritative"]
      },
      {
        question: "How do you handle team conflicts as a leader?",
        answers: ["Mediation", "Direct resolution", "Delegation"]
      }
    ]
  },
  {
    skill: "time management",
    questions: [
      {
        question: "How do you prioritize tasks?",
        answers: ["Eisenhower Matrix", "Time blocking", "To-do lists"]
      },
      {
        question: "How do you manage deadlines?",
        answers: ["Set reminders", "Work in sprints", "Break tasks into steps"]
      }
    ]
  }
];

const seedCareerQuestions = async () => {
  await connectDB();
  await CareerModel.deleteMany();
  await CareerModel.insertMany(careerQuestions);
  console.log("Career questions have been seeded.");
  process.exit();
};

seedCareerQuestions();
