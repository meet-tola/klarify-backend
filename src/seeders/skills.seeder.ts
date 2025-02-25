import "dotenv/config";
import SkillModel from "../models/skill.model";
import connectDB from "../config/database.config";

// List of all available skills
const allSkills = [
  "communication",
  "teamwork",
  "problem-solving",
  "critical thinking",
  "creativity",
  "innovation",
  "stress management",
  "resilience",
  "self-care",
  "work-life balance",
  "adaptability",
  "leadership",
  "empathy",
  "time management",
  "conflict resolution"
];

const seedSkills = async () => {
  await connectDB();
  await SkillModel.deleteMany(); // Clear existing skills
  const skills = allSkills.map((skill) => ({ name: skill }));
  await SkillModel.insertMany(skills);
  console.log("Skills have been seeded.");
  process.exit();
};

seedSkills();
