import "dotenv/config";
import SkillModel from "../models/skill.model";
import connectDB from "../config/database.config";

const skills = [
  {
    category: "Web Development",
    keySkills: ["HTML", "CSS", "JavaScript", "React"],
    jobRoles: ["Web Developer", "Frontend Developer"],
    description: "Building and maintaining websites and web applications using modern technologies.",
  },
  {
    category: "UI/UX Design",
    keySkills: ["Figma", "Adobe XD", "User Research"],
    jobRoles: ["UI Designer", "UX Researcher"],
    description: "Designing intuitive and user-friendly interfaces to enhance user experience.",
  },
  {
    category: "Digital Marketing",
    keySkills: ["SEO", "Google Ads", "Social Media Marketing"],
    jobRoles: ["Marketing Specialist", "SEO Analyst"],
    description: "Promoting brands and products through online channels to drive engagement and sales.",
  },
  {
    category: "Data Science",
    keySkills: ["Python", "Machine Learning", "Data Analysis"],
    jobRoles: ["Data Scientist", "Data Analyst"],
    description: "Extracting insights and building predictive models from large datasets.",
  },
  {
    category: "Cybersecurity",
    keySkills: ["Network Security", "Ethical Hacking", "Penetration Testing"],
    jobRoles: ["Cybersecurity Analyst", "Ethical Hacker"],
    description: "Protecting systems and networks from cyber threats and vulnerabilities.",
  },
  {
    category: "Project Management",
    keySkills: ["Agile", "Scrum", "Leadership"],
    jobRoles: ["Project Manager", "Scrum Master"],
    description: "Planning and executing projects efficiently to achieve business goals.",
  },
  {
    category: "Mobile Development",
    keySkills: ["Swift", "Kotlin", "Flutter"],
    jobRoles: ["Mobile Developer", "iOS Developer", "Android Developer"],
    description: "Creating mobile applications for iOS and Android platforms.",
  },
  {
    category: "Cloud Computing",
    keySkills: ["AWS", "Azure", "Google Cloud"],
    jobRoles: ["Cloud Engineer", "DevOps Engineer"],
    description: "Managing and deploying applications on cloud platforms for scalability and reliability.",
  },
  {
    category: "Backend Development",
    keySkills: ["Node.js", "Django", "Ruby on Rails"],
    jobRoles: ["Backend Developer", "Full Stack Developer"],
    description: "Developing server-side logic and databases to power web applications.",
  },
  {
    category: "Blockchain",
    keySkills: ["Solidity", "Ethereum", "Smart Contracts"],
    jobRoles: ["Blockchain Developer", "Crypto Analyst"],
    description: "Building decentralized applications and working with blockchain technologies.",
  },
  {
    category: "Artificial Intelligence",
    keySkills: ["TensorFlow", "NLP", "Deep Learning"],
    jobRoles: ["AI Engineer", "Machine Learning Engineer"],
    description: "Creating intelligent systems and algorithms to mimic human decision-making.",
  },
  {
    category: "Game Development",
    keySkills: ["Unity", "Unreal Engine", "C#"],
    jobRoles: ["Game Developer", "Level Designer"],
    description: "Designing and developing interactive games for various platforms.",
  },
  {
    category: "DevOps",
    keySkills: ["Docker", "Kubernetes", "CI/CD"],
    jobRoles: ["DevOps Engineer", "Site Reliability Engineer"],
    description: "Streamlining software development and deployment processes for efficiency.",
  },
  {
    category: "Graphic Design",
    keySkills: ["Photoshop", "Illustrator", "InDesign"],
    jobRoles: ["Graphic Designer", "Creative Director"],
    description: "Creating visual content to communicate messages and ideas effectively.",
  },
  {
    category: "Database Management",
    keySkills: ["SQL", "MongoDB", "Database Optimization"],
    jobRoles: ["Database Administrator", "Data Engineer"],
    description: "Managing and optimizing databases for efficient data storage and retrieval.",
  },
  {
    category: "E-commerce",
    keySkills: ["Shopify", "WooCommerce", "Digital Sales"],
    jobRoles: ["E-commerce Specialist", "Online Store Manager"],
    description: "Building and managing online stores to drive sales and customer engagement.",
  },
  {
    category: "Augmented Reality/Virtual Reality",
    keySkills: ["ARKit", "VR Development", "3D Modeling"],
    jobRoles: ["AR/VR Developer", "Immersive Experience Designer"],
    description: "Creating immersive experiences using AR and VR technologies.",
  },
  {
    category: "Internet of Things (IoT)",
    keySkills: ["IoT Protocols", "Embedded Systems", "Sensor Integration"],
    jobRoles: ["IoT Developer", "Smart Device Engineer"],
    description: "Connecting and managing smart devices to enable seamless communication.",
  },
  {
    category: "Business Intelligence",
    keySkills: ["Power BI", "Tableau", "Data Visualization"],
    jobRoles: ["BI Analyst", "Data Strategist"],
    description: "Transforming data into actionable insights for business decision-making.",
  },
  {
    category: "Software Testing",
    keySkills: ["Selenium", "Manual Testing", "Automation Testing"],
    jobRoles: ["QA Engineer", "Test Automation Specialist"],
    description: "Ensuring software quality through rigorous testing and debugging.",
  },
  {
    category: "Tech Beginner",
    keySkills: ["Introduction to Tech", "Basic Computer Skills", "Online Learning"],
    jobRoles: ["Tech Enthusiast", "Career Explorer"],
    description: "Starting your journey in tech with foundational knowledge and skills.",
  },
  {
    category: "Adaptability",
    keySkills: ["Flexibility", "Learning Agility", "Problem-Solving"],
    jobRoles: ["Versatile Professional", "Lifelong Learner"],
    description: "Thriving in dynamic environments by embracing change and learning quickly.",
  },
  {
    category: "Team Collaboration",
    keySkills: ["Communication", "Teamwork", "Conflict Resolution"],
    jobRoles: ["Team Player", "Collaborative Leader"],
    description: "Working effectively with others to achieve common goals.",
  },
  {
    category: "Leadership",
    keySkills: ["Decision-Making", "Mentorship", "Strategic Planning"],
    jobRoles: ["Team Lead", "Manager", "Entrepreneur"],
    description: "Guiding teams and organizations towards success through vision and strategy.",
  },
  {
    category: "Hands-on Practice",
    keySkills: ["Project-Based Learning", "Experimentation", "Prototyping"],
    jobRoles: ["DIY Enthusiast", "Practical Learner"],
    description: "Learning by doing and applying knowledge in real-world scenarios.",
  },
  {
    category: "Self-Learning",
    keySkills: ["Online Courses", "Research", "Self-Paced Study"],
    jobRoles: ["Independent Learner", "Autodidact"],
    description: "Taking charge of your own education and skill development.",
  },
  {
    category: "Work-Life Balance",
    keySkills: ["Time Management", "Stress Management", "Mindfulness"],
    jobRoles: ["Balanced Professional", "Wellness Advocate"],
    description: "Maintaining a healthy balance between professional and personal life.",
  },
  {
    category: "Creative Thinking",
    keySkills: ["Ideation", "Design Thinking", "Innovation"],
    jobRoles: ["Creative Professional", "Innovator"],
    description: "Generating new ideas and solutions through creative problem-solving.",
  },
  {
    category: "Problem-Solving",
    keySkills: ["Critical Thinking", "Analytical Skills", "Decision-Making"],
    jobRoles: ["Analyst", "Consultant", "Strategist"],
    description: "Identifying and solving complex problems with logical and analytical approaches.",
  },
  {
    category: "Content Creation",
    keySkills: ["Writing", "Video Editing", "Storytelling"],
    jobRoles: ["Content Creator", "Blogger", "YouTuber"],
    description: "Producing engaging content to inform, entertain, and inspire audiences.",
  },
  
];

const seedSkills = async () => {
  await connectDB();
  await SkillModel.deleteMany(); 
  await SkillModel.insertMany(skills);
  console.log("Skills have been seeded.");
  process.exit();
};

seedSkills();