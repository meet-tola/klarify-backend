import "dotenv/config";
import QuestionModel from "../models/skillQuestion.model";
import connectDB from "../config/database.config";

const questions = [
  {
    questionText: "What type of activities do you enjoy in your free time?",
    options: [
      "Building or creating things (e.g., DIY projects, crafting)",
      "Solving puzzles or playing strategy games",
      "Designing or decorating spaces",
      "Analyzing data or researching topics",
      "Helping others or working in teams",
      "Exploring new technologies or gadgets",
    ],
    skillMapping: {
      "Building or creating things (e.g., DIY projects, crafting)": ["Web Development", "Mobile Development", "Game Development"],
      "Solving puzzles or playing strategy games": ["Data Science", "Cybersecurity", "Artificial Intelligence"],
      "Designing or decorating spaces": ["UI/UX Design", "Graphic Design", "Augmented Reality/Virtual Reality"],
      "Analyzing data or researching topics": ["Data Science", "Business Intelligence", "SEO"],
      "Helping others or working in teams": ["Project Management", "Digital Marketing", "Content Creation"],
      "Exploring new technologies or gadgets": ["Cloud Computing", "Internet of Things (IoT)", "Blockchain"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "What kind of books or media do you enjoy most?",
    options: [
      "Tech blogs, coding tutorials, or programming books",
      "Design magazines, art books, or creative content",
      "Business strategy, marketing, or entrepreneurship",
      "Science fiction, futuristic tech, or AI-related content",
      "Self-help, teamwork, or leadership books",
      "I prefer hands-on learning over reading",
    ],
    skillMapping: {
      "Tech blogs, coding tutorials, or programming books": ["Web Development", "Backend Development", "Software Testing"],
      "Design magazines, art books, or creative content": ["UI/UX Design", "Graphic Design", "Content Creation"],
      "Business strategy, marketing, or entrepreneurship": ["Digital Marketing", "E-commerce", "Project Management"],
      "Science fiction, futuristic tech, or AI-related content": ["Artificial Intelligence", "Blockchain", "Game Development"],
      "Self-help, teamwork, or leadership books": ["Project Management", "Team Collaboration", "Leadership"],
      "I prefer hands-on learning over reading": ["Hands-on Practice", "Web Development", "Mobile Development"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "If you were to start a side project, what would it be?",
    options: [
      "Building a website or app",
      "Creating a game or interactive experience",
      "Designing a brand or marketing campaign",
      "Analyzing data to solve a real-world problem",
      "Organizing events or managing a team",
      "Exploring new tech like AR/VR or IoT",
    ],
    skillMapping: {
      "Building a website or app": ["Web Development", "Mobile Development", "Backend Development"],
      "Creating a game or interactive experience": ["Game Development", "Augmented Reality/Virtual Reality", "UI/UX Design"],
      "Designing a brand or marketing campaign": ["Graphic Design", "Digital Marketing", "Content Creation"],
      "Analyzing data to solve a real-world problem": ["Data Science", "Business Intelligence", "Cybersecurity"],
      "Organizing events or managing a team": ["Project Management", "Team Collaboration", "Leadership"],
      "Exploring new tech like AR/VR or IoT": ["Augmented Reality/Virtual Reality", "Internet of Things (IoT)", "Artificial Intelligence"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "How do you usually approach challenges?",
    options: [
      "Break them down into smaller, logical steps",
      "Think outside the box and come up with creative solutions",
      "Collaborate with others to find the best approach",
      "Research and analyze data to make informed decisions",
      "Experiment and learn by doing",
      "Use technology or tools to simplify the process",
    ],
    skillMapping: {
      "Break them down into smaller, logical steps": ["Data Science", "Cybersecurity", "Software Testing"],
      "Think outside the box and come up with creative solutions": ["UI/UX Design", "Graphic Design", "Content Creation"],
      "Collaborate with others to find the best approach": ["Project Management", "Team Collaboration", "Leadership"],
      "Research and analyze data to make informed decisions": ["Business Intelligence", "SEO", "Data Analysis"],
      "Experiment and learn by doing": ["Web Development", "Mobile Development", "Game Development"],
      "Use technology or tools to simplify the process": ["Cloud Computing", "DevOps", "Blockchain"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "What kind of tools or software do you enjoy using?",
    options: [
      "Creative tools like Photoshop, Figma, or Canva",
      "Programming tools like VS Code, Python, or GitHub",
      "Analytics tools like Excel, Tableau, or Power BI",
      "Project management tools like Trello or Asana",
      "Social media or marketing platforms",
      "I don’t have much experience with tools yet",
    ],
    skillMapping: {
      "Creative tools like Photoshop, Figma, or Canva": ["UI/UX Design", "Graphic Design", "Content Creation"],
      "Programming tools like VS Code, Python, or GitHub": ["Web Development", "Backend Development", "Software Testing"],
      "Analytics tools like Excel, Tableau, or Power BI": ["Data Science", "Business Intelligence", "SEO"],
      "Project management tools like Trello or Asana": ["Project Management", "Team Collaboration", "Leadership"],
      "Social media or marketing platforms": ["Digital Marketing", "E-commerce", "Content Creation"],
      "I don’t have much experience with tools yet": ["Tech Beginner"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "What kind of role do you see yourself in?",
    options: [
      "A creative role (e.g., designer, artist, content creator)",
      "A technical role (e.g., developer, engineer, data scientist)",
      "A leadership role (e.g., manager, team lead, entrepreneur)",
      "A problem-solving role (e.g., analyst, consultant, strategist)",
      "A hands-on role (e.g., builder, tester, freelancer)",
      "I’m not sure yet, but I want to explore",
    ],
    skillMapping: {
      "A creative role (e.g., designer, artist, content creator)": ["UI/UX Design", "Graphic Design", "Content Creation"],
      "A technical role (e.g., developer, engineer, data scientist)": ["Web Development", "Data Science", "Cybersecurity"],
      "A leadership role (e.g., manager, team lead, entrepreneur)": ["Project Management", "Leadership", "Digital Marketing"],
      "A problem-solving role (e.g., analyst, consultant, strategist)": ["Data Science", "Business Intelligence", "SEO"],
      "A hands-on role (e.g., builder, tester, freelancer)": ["Web Development", "Mobile Development", "Software Testing"],
      "I’m not sure yet, but I want to explore": ["Tech Beginner"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "What type of games or puzzles do you enjoy?",
    options: [
      "Logic puzzles or brain teasers",
      "Creative games like Minecraft or Roblox",
      "Strategy games like Chess or Risk",
      "Team-based games or multiplayer games",
      "I don’t play games or puzzles",
    ],
    skillMapping: {
      "Logic puzzles or brain teasers": ["Data Science", "Cybersecurity", "Artificial Intelligence"],
      "Creative games like Minecraft or Roblox": ["Game Development", "UI/UX Design", "Graphic Design"],
      "Strategy games like Chess or Risk": ["Project Management", "Business Intelligence", "Leadership"],
      "Team-based games or multiplayer games": ["Team Collaboration", "Digital Marketing", "Content Creation"],
      "I don’t play games or puzzles": ["Tech Beginner"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "How do you prefer to spend your weekends?",
    options: [
      "Working on personal projects or hobbies",
      "Learning something new or taking online courses",
      "Socializing with friends or networking",
      "Relaxing and consuming media (movies, books, etc.)",
      "Organizing or planning for the week ahead",
    ],
    skillMapping: {
      "Working on personal projects or hobbies": ["Web Development", "Game Development", "Content Creation"],
      "Learning something new or taking online courses": ["Data Science", "Artificial Intelligence", "UI/UX Design"],
      "Socializing with friends or networking": ["Digital Marketing", "Team Collaboration", "Leadership"],
      "Relaxing and consuming media (movies, books, etc.)": ["Content Creation", "Graphic Design", "SEO"],
      "Organizing or planning for the week ahead": ["Project Management", "Business Intelligence", "Leadership"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "What kind of problems do you enjoy solving?",
    options: [
      "Technical problems (e.g., fixing bugs, optimizing code)",
      "Creative problems (e.g., designing a logo, writing a story)",
      "Business problems (e.g., increasing sales, improving processes)",
      "Social problems (e.g., helping others, building communities)",
      "I’m not sure, but I like solving problems in general",
    ],
    skillMapping: {
      "Technical problems (e.g., fixing bugs, optimizing code)": ["Web Development", "Software Testing", "Cybersecurity"],
      "Creative problems (e.g., designing a logo, writing a story)": ["UI/UX Design", "Graphic Design", "Content Creation"],
      "Business problems (e.g., increasing sales, improving processes)": ["Digital Marketing", "Project Management", "Business Intelligence"],
      "Social problems (e.g., helping others, building communities)": ["Team Collaboration", "Leadership", "Content Creation"],
      "I’m not sure, but I like solving problems in general": ["Tech Beginner"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "What kind of apps or websites do you use most often?",
    options: [
      "Social media platforms (e.g., Instagram, Twitter)",
      "Productivity tools (e.g., Notion, Trello)",
      "Creative tools (e.g., Canva, Adobe Creative Suite)",
      "Learning platforms (e.g., Coursera, Udemy)",
      "Entertainment platforms (e.g., Netflix, YouTube)",
    ],
    skillMapping: {
      "Social media platforms (e.g., Instagram, Twitter)": ["Digital Marketing", "Content Creation", "SEO"],
      "Productivity tools (e.g., Notion, Trello)": ["Project Management", "Leadership", "Team Collaboration"],
      "Creative tools (e.g., Canva, Adobe Creative Suite)": ["UI/UX Design", "Graphic Design", "Content Creation"],
      "Learning platforms (e.g., Coursera, Udemy)": ["Data Science", "Artificial Intelligence", "Web Development"],
      "Entertainment platforms (e.g., Netflix, YouTube)": ["Content Creation", "SEO", "Digital Marketing"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "What kind of events or meetups do you enjoy attending?",
    options: [
      "Tech conferences or hackathons",
      "Creative workshops or art exhibitions",
      "Business networking events or seminars",
      "Community service or volunteer events",
      "I don’t attend events often",
    ],
    skillMapping: {
      "Tech conferences or hackathons": ["Web Development", "Artificial Intelligence", "Blockchain"],
      "Creative workshops or art exhibitions": ["UI/UX Design", "Graphic Design", "Content Creation"],
      "Business networking events or seminars": ["Digital Marketing", "Project Management", "Leadership"],
      "Community service or volunteer events": ["Team Collaboration", "Content Creation", "Leadership"],
      "I don’t attend events often": ["Tech Beginner"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "What kind of content do you enjoy creating?",
    options: [
      "Written content (e.g., blogs, articles)",
      "Visual content (e.g., graphics, videos)",
      "Technical content (e.g., tutorials, code snippets)",
      "Social media content (e.g., posts, stories)",
      "I don’t create content often",
    ],
    skillMapping: {
      "Written content (e.g., blogs, articles)": ["Content Creation", "SEO", "Digital Marketing"],
      "Visual content (e.g., graphics, videos)": ["Graphic Design", "UI/UX Design", "Content Creation"],
      "Technical content (e.g., tutorials, code snippets)": ["Web Development", "Data Science", "Software Testing"],
      "Social media content (e.g., posts, stories)": ["Digital Marketing", "Content Creation", "SEO"],
      "I don’t create content often": ["Tech Beginner"],
      "default": ["Adaptability"],
    },
  },
  {
    questionText: "What kind of environment do you thrive in?",
    options: [
      "Fast-paced and dynamic",
      "Structured and organized",
      "Creative and open-ended",
      "Collaborative and team-oriented",
      "Independent and self-directed",
    ],
    skillMapping: {
      "Fast-paced and dynamic": ["Digital Marketing", "Project Management", "Leadership"],
      "Structured and organized": ["Data Science", "Business Intelligence", "Cybersecurity"],
      "Creative and open-ended": ["UI/UX Design", "Graphic Design", "Content Creation"],
      "Collaborative and team-oriented": ["Team Collaboration", "Leadership", "Project Management"],
      "Independent and self-directed": ["Web Development", "Data Science", "Artificial Intelligence"],
      "default": ["Adaptability"],
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

