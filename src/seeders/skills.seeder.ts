import "dotenv/config";
import SkillModel from "../models/skill.model";
import connectDB from "../config/database.config";

const skills = [
  // Development
  {
    category: "Web Development",
    keySkills: ["HTML", "CSS", "JavaScript", "React", "Vue", "Angular"],
    jobRoles: ["Web Developer", "Frontend Developer", "Full-Stack Developer"],
    description: "Building and maintaining websites and web applications using modern technologies.",
  },
  {
    category: "Backend Development",
    keySkills: ["Node.js", "Express", "Django", "Ruby on Rails", "Spring Boot"],
    jobRoles: ["Backend Developer", "API Developer", "Software Engineer"],
    description: "Developing server-side logic, APIs, and database management for applications.",
  },
  {
    category: "Full-Stack Development",
    keySkills: ["MERN Stack", "MEAN Stack", "LAMP Stack"],
    jobRoles: ["Full-Stack Developer", "Software Engineer"],
    description: "Combining frontend and backend development to create complete web applications.",
  },
  {
    category: "Mobile App Development",
    keySkills: ["Flutter", "React Native", "Swift", "Kotlin"],
    jobRoles: ["Mobile App Developer", "iOS Developer", "Android Developer"],
    description: "Designing and developing mobile applications for iOS and Android platforms.",
  },
  {
    category: "Low-Code/No-Code Development",
    keySkills: ["Bubble", "OutSystems", "Adalo"],
    jobRoles: ["No-Code Developer", "Low-Code Developer"],
    description: "Creating applications with minimal coding using drag-and-drop platforms.",
  },
  {
    category: "Game Development",
    keySkills: ["Unity", "Unreal Engine", "C#", "C++"],
    jobRoles: ["Game Developer", "Game Programmer", "Gameplay Engineer"],
    description: "Designing and developing interactive games for various platforms.",
  },
  {
    category: "Database Management",
    keySkills: ["SQL", "MongoDB", "PostgreSQL", "Oracle"],
    jobRoles: ["Database Administrator", "Database Engineer"],
    description: "Managing and optimizing databases for applications and enterprises.",
  },
  {
    category: "Blockchain & Smart Contracts(Web3)",
    keySkills: ["Solidity", "Ethereum", "Hyperledger"],
    jobRoles: ["Blockchain Developer", "Smart Contract Engineer"],
    description: "Developing decentralized applications and smart contracts.",
  },

  // Design & Creative
  {
    category: "UI/UX Design",
    keySkills: ["Figma", "Adobe XD", "Sketch"],
    jobRoles: ["UI/UX Designer", "Product Designer"],
    description: "Creating intuitive and visually appealing user interfaces and experiences.",
  },
  {
    category: "Graphic Design",
    keySkills: ["Photoshop", "Illustrator", "Canva"],
    jobRoles: ["Graphic Designer", "Visual Designer"],
    description: "Designing visual content, branding, and marketing materials.",
  },
  {
    category: "Motion Graphics & Animation",
    keySkills: ["After Effects", "Blender", "Cinema 4D"],
    jobRoles: ["Motion Designer", "Animator"],
    description: "Creating animated content for videos, advertisements, and presentations.",
  },
  {
    category: "3D Modeling & Rendering",
    keySkills: ["Blender", "Maya", "3ds Max"],
    jobRoles: ["3D Artist", "3D Modeler"],
    description: "Designing and rendering 3D assets for various applications.",
  },
  {
    category: "Game Art & Concept Design",
    keySkills: ["Photoshop", "Procreate", "ZBrush"],
    jobRoles: ["Game Artist", "Concept Artist"],
    description: "Creating visual concepts, characters, and assets for games.",
  },
  {
    category: "Branding & Visual Identity",
    keySkills: ["Logo Design", "Typography", "Brand Guidelines"],
    jobRoles: ["Brand Designer", "Marketing Designer"],
    description: "Developing and maintaining brand identities.",
  },
  {
    category: "Product Design & Prototyping",
    keySkills: ["CAD", "3D Printing", "Prototyping"],
    jobRoles: ["Product Designer", "Industrial Designer"],
    description: "Designing and prototyping physical or digital products.",
  },
  {
    category: "Video Editing",
    keySkills: ["Premiere Pro", "Final Cut Pro", "DaVinci Resolve"],
    jobRoles: ["Video Editor", "Content Creator"],
    description: "Editing and producing professional-quality videos.",
  },
  {
    category: "Digital Illustration & Digital Art",
    keySkills: ["Procreate", "Krita", "Adobe Fresco"],
    jobRoles: ["Digital Illustrator", "Concept Artist"],
    description: "Creating digital artworks for various media.",
  },

  // Marketing & Business
  {
    "category": "Digital Marketing",
    "keySkills": ["SEO", "PPC Advertising", "Email Marketing", "Conversion Rate Optimization"],
    "jobRoles": ["Digital Marketer", "SEO Specialist", "Growth Hacker"],
    "description": "Promoting brands and products through online channels using data-driven strategies."
  },
  {
    "category": "Social Media Management",
    "keySkills": ["Community Engagement", "Content Scheduling", "Analytics", "Platform Algorithms"],
    "jobRoles": ["Social Media Manager", "Brand Strategist"],
    "description": "Managing and optimizing brand presence across social media platforms."
  },
  {
    "category": "Influencer Marketing",
    "keySkills": ["Partnership Negotiation", "Campaign Tracking", "Audience Alignment"],
    "jobRoles": ["Influencer Manager", "Brand Collaborator"],
    "description": "Leveraging influencers to amplify brand reach and credibility."
  },
  {
    "category": "Copywriting",
    "keySkills": ["Persuasive Writing", "A/B Testing", "Brand Voice Development"],
    "jobRoles": ["Copywriter", "Creative Director"],
    "description": "Crafting compelling text for advertisements, websites, and marketing materials."
  },
  {
    "category": "E-commerce & Dropshipping",
    "keySkills": ["Shopify", "Product Sourcing", "Supply Chain Logistics"],
    "jobRoles": ["E-commerce Manager", "Dropshipping Entrepreneur"],
    "description": "Building and managing online stores with minimal inventory overhead."
  },
  {
    "category": "Affiliate Marketing",
    "keySkills": ["Commission Structures", "Link Tracking", "Niche Targeting"],
    "jobRoles": ["Affiliate Marketer", "Revenue Optimizer"],
    "description": "Earning commissions by promoting third-party products or services."
  },
  {
    "category": "Product Management",
    "keySkills": ["Roadmapping", "User Stories", "MVP Development"],
    "jobRoles": ["Product Manager", "Product Owner"],
    "description": "Overseeing product lifecycles from ideation to launch and iteration."
  },

  // Content & Communication
  {
    "category": "Content Writing & Blogging",
    "keySkills": ["SEO Writing", "Long-Form Content", "Editorial Calendars"],
    "jobRoles": ["Blogger", "Content Writer"],
    "description": "Creating informative and engaging written content for audiences."
  },
  {
    "category": "Technical Writing",
    "keySkills": ["API Documentation", "User Manuals", "Technical Guides"],
    "jobRoles": ["Technical Writer", "Documentation Specialist"],
    "description": "Translating complex technical information into clear, accessible content."
  },
  {
    "category": "Scriptwriting for Videos & Podcasts",
    "keySkills": ["Storyboarding", "Dialogue Writing", "Pacing"],
    "jobRoles": ["Scriptwriter", "Video Producer"],
    "description": "Writing scripts for multimedia content to engage audiences."
  },
  {
    "category": "Social Media Content Creation",
    "keySkills": ["Short-Form Video", "Memes", "Trend Analysis"],
    "jobRoles": ["Content Creator", "Social Media Specialist"],
    "description": "Designing visually appealing and shareable content for social platforms."
  },
  {
    "category": "UX Writing",
    "keySkills": ["Microcopy", "User Flows", "Accessibility Guidelines"],
    "jobRoles": ["UX Writer", "Product Content Strategist"],
    "description": "Crafting concise, user-friendly text for digital interfaces."
  },
  {
    "category": "Public Speaking",
    "keySkills": ["Storytelling", "Audience Engagement", "Speech Writing"],
    "jobRoles": ["Keynote Speaker", "Presenter"],
    "description": "Communicating ideas effectively to live or virtual audiences."
  },
  {
    "category": "Content Strategy",
    "keySkills": ["Audience Research", "Content Audits", "Omnichannel Planning"],
    "jobRoles": ["Content Strategist", "Marketing Director"],
    "description": "Designing and executing long-term content plans to meet business goals."
  },

  // Data & AI
  {
    category: "Data Analysis",
    keySkills: ["Excel", "Python", "SQL"],
    jobRoles: ["Data Analyst", "Business Analyst"],
    description: "Analyzing data to extract insights and inform decisions.",
  },
  {
    category: "Machine Learning",
    keySkills: ["Scikit-learn", "TensorFlow", "PyTorch"],
    jobRoles: ["Machine Learning Engineer", "AI Engineer"],
    description: "Developing machine learning models for various applications.",
  },
  {
    category: "Deep Learning",
    keySkills: ["Neural Networks", "PyTorch", "Keras"],
    jobRoles: ["Deep Learning Engineer", "AI Researcher"],
    description: "Building and training deep neural networks for AI applications.",
  },
  {
    category: "Generative AI & LLMs",
    keySkills: ["GPT", "Stable Diffusion", "LangChain"],
    jobRoles: ["AI Engineer", "Prompt Engineer"],
    description: "Developing and working with generative AI models.",
  },

  // Cybersecurity & Ethical Hacking
  {
    category: "Cybersecurity",
    keySkills: ["Network Security", "Firewalls", "Security Monitoring"],
    jobRoles: ["Cybersecurity Analyst", "Security Engineer"],
    description: "Safeguarding systems, networks, and data from digital attacks and unauthorized access.",
  },
  {
    category: "Ethical Hacking",
    keySkills: ["Penetration Testing", "Metasploit", "Kali Linux"],
    jobRoles: ["Ethical Hacker", "Penetration Tester"],
    description: "Legally probing systems for vulnerabilities to help organizations strengthen their defenses.",
  },
  {
    category: "Penetration Testing & Ethical Hacking",
    keySkills: ["Metasploit", "Kali Linux", "Burp Suite"],
    jobRoles: ["Ethical Hacker", "Security Analyst"],
    description: "Identifying and fixing security vulnerabilities in systems.",
  },

  {
    category: "Cloud Security & Compliance",
    keySkills: ["AWS Security", "ISO 27001", "SOC 2"],
    jobRoles: ["Cloud Security Engineer", "Compliance Analyst"],
    description: "Ensuring security compliance and protecting cloud infrastructure.",
  },
  {
    category: "Digital Forensics",
    keySkills: ["Forensic Tools", "Incident Response"],
    jobRoles: ["Forensic Analyst", "Cybersecurity Investigator"],
    description: "Investigating cyber incidents and recovering digital evidence.",
  },

  // Infrastructure & DevOps
  {
    category: "Cloud Computing",
    keySkills: ["AWS", "Azure", "Google Cloud"],
    jobRoles: ["Cloud Engineer", "Cloud Architect", "DevOps Engineer"],
    description: "Deploying and managing applications in cloud environments.",
  },
  {
    category: "Containerization",
    keySkills: ["Docker", "Kubernetes", "Podman"],
    jobRoles: ["DevOps Engineer", "Cloud Engineer"],
    description: "Using containerization technology to deploy and manage applications efficiently.",
  },
  {
    category: "Linux/Unix Administration",
    keySkills: ["Bash", "Shell Scripting", "System Administration"],
    jobRoles: ["System Administrator", "DevOps Engineer"],
    description: "Managing Linux/Unix-based servers and automating administrative tasks.",
  },
  {
    category: "Networking & Security",
    keySkills: ["Firewalls", "VPN", "IDS/IPS"],
    jobRoles: ["Network Engineer", "Security Engineer"],
    description: "Securing and managing network infrastructure.",
  },
  {
    category: "Scripting",
    keySkills: ["Python", "Bash", "PowerShell"],
    jobRoles: ["DevOps Engineer", "SRE (Site Reliability Engineer)"],
    description: "Automating system processes and workflows using scripts.",
  },

  // Emerging Tech & Others
  {
    category: "Quantum Computing",
    keySkills: ["Qiskit", "Quantum Circuits"],
    jobRoles: ["Quantum Computing Researcher", "Quantum Engineer"],
    description: "Developing and researching quantum computing applications.",
  },
  {
    category: "Robotics & Automation",
    keySkills: ["ROS", "Arduino", "Automation Tools"],
    jobRoles: ["Robotics Engineer", "Automation Engineer"],
    description: "Building and programming robotic systems.",
  },
  {
    category: "IoT (Internet of Things)",
    keySkills: ["Raspberry Pi", "Arduino", "IoT Security"],
    jobRoles: ["IoT Engineer", "Embedded Systems Engineer"],
    description: "Developing and securing IoT devices and networks.",
  },

  //Soft Skill
  {
    "category": "Entrepreneurship",
    "keySkills": ["Business Planning", "Startup Funding", "Market Research", "Pitching"],
    "jobRoles": ["Founder", "Entrepreneur", "Startup Consultant"],
    "description": "Creating and scaling new business ventures with innovative ideas."
  },
  {
    "category": "Leadership",
    "keySkills": ["Team Management", "Decision-Making", "Conflict Resolution", "Mentorship"],
    "jobRoles": ["Team Lead", "Manager", "Executive"],
    "description": "Guiding teams and organizations toward shared goals with vision and strategy."
  },
  {
    "category": "Project Management",
    "keySkills": ["Agile", "Scrum", "Risk Management", "Stakeholder Communication"],
    "jobRoles": ["Project Manager", "Product Owner", "Program Manager"],
    "description": "Planning, executing, and closing projects efficiently while meeting objectives."
  },
  {
    "category": "Content Creation",
    "keySkills": ["Copywriting", "Video Production", "Social Media Content", "Storyboarding"],
    "jobRoles": ["Content Creator", "Social Media Manager", "Video Producer"],
    "description": "Producing engaging digital content for audiences across platforms."
  },
  {
    "category": "Problem Solving",
    "keySkills": ["Critical Thinking", "Root Cause Analysis", "Logical Reasoning"],
    "jobRoles": ["Consultant", "Analyst", "Engineer"],
    "description": "Identifying solutions to complex challenges through structured approaches."
  },
  {
    "category": "Creative Thinking",
    "keySkills": ["Ideation", "Brainstorming", "Design Thinking"],
    "jobRoles": ["Designer", "Innovation Strategist", "Creative Director"],
    "description": "Generating original ideas and unconventional solutions."
  },
  {
    "category": "Team Collaboration",
    "keySkills": ["Active Listening", "Feedback", "Cross-Functional Coordination"],
    "jobRoles": ["Team Member", "Collaborator", "Coordinator"],
    "description": "Working effectively with others to achieve shared outcomes."
  },
  {
    "category": "Continuous Learning",
    "keySkills": ["Self-Paced Study", "Online Courses", "Skill Stacking"],
    "jobRoles": ["Lifelong Learner", "Career Switcher", "Student"],
    "description": "Commitment to ongoing personal and professional development."
  },
  {
    "category": "Hands-on Learning",
    "keySkills": ["Prototyping", "Experimentation", "DIY Projects"],
    "jobRoles": ["Maker", "Tinkerer", "Hobbyist"],
    "description": "Learning through practical application and iterative testing."
  },
  {
    "category": "Community Engagement",
    "keySkills": ["Volunteering", "Public Speaking", "Networking"],
    "jobRoles": ["Community Manager", "Nonprofit Worker", "Activist"],
    "description": "Connecting with and mobilizing groups for social impact."
  },
  {
    "category": "Emerging Tech",
    "keySkills": ["AI Ethics", "Tech Scouting", "Future Trends Analysis"],
    "jobRoles": ["Innovation Researcher", "Tech Futurist", "Emerging Tech Analyst"],
    "description": "Exploring and evaluating cutting-edge technological advancements."
  },
  {
    "category": "Leisure Activities",
    "keySkills": ["Hobbies", "Work-Life Balance", "Recreation"],
    "jobRoles": ["Enthusiast", "Hobbyist"],
    "description": "Activities pursued for personal enjoyment and relaxation."
  },
  {
    "category": "Practical Skills",
    "keySkills": ["Tool Proficiency", "Troubleshooting", "Adaptability"],
    "jobRoles": ["Technician", "Handyman", "Generalist"],
    "description": "Applying functional knowledge to real-world tasks."
  },
  {
    "category": "Tech Beginner",
    "keySkills": ["Foundational Literacy", "Curiosity", "Growth Mindset"],
    "jobRoles": ["Trainee", "Apprentice", "Newcomer"],
    "description": "Early-stage exploration of digital tools and concepts."
  }
];

const seedSkills = async () => {
  await connectDB();
  await SkillModel.deleteMany();
  await SkillModel.insertMany(skills);
  console.log("Skills have been seeded.");
  process.exit();
};

seedSkills();
