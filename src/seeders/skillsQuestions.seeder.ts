import "dotenv/config";
import QuestionModel from "../models/skillQuestion.model";
import connectDB from "../config/database.config";

const questions = [
  {
    "questionText": "How do you like to spend your free time?",
    "options": [
      "Building or creating things (DIY, coding, crafting)",
      "Solving puzzles or playing strategy games",
      "Designing or decorating spaces",
      "Researching topics or analyzing data",
      "Helping others or working in teams",
      "Exploring new technologies and gadgets"
    ],
    "skillMapping": {
      "Building or creating things (DIY, coding, crafting)": {
        "primary": ["Web Development", "Mobile App Development"],
        "secondary": ["Game Development", "Low-Code/No-Code Development"]
      },
      "Solving puzzles or playing strategy games": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Cybersecurity & Ethical Hacking"]
      },
      "Designing or decorating spaces": {
        "primary": ["UI/UX Design", "Graphic Design"],
        "secondary": ["3D Modeling & Rendering"]
      },
      "Researching topics or analyzing data": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Generative AI & LLMs"]
      },
      "Helping others or working in teams": {
        "primary": ["Project Management"],
        "secondary": ["Digital Marketing"]
      },
      "Exploring new technologies and gadgets": {
        "primary": ["Emerging Tech"],
        "secondary": ["IoT (Internet of Things)"]
      }
    }
  },
  {
    "questionText": "What kind of books, blogs, or media do you enjoy most?",
    "options": [
      "Tech blogs, coding tutorials, or programming books",
      "Design magazines, creative content, or art books",
      "Business, marketing, or entrepreneurship books",
      "Science fiction, AI, or futuristic tech content",
      "Self-improvement, teamwork, or leadership books",
      "I prefer learning by doing rather than reading"
    ],
    "skillMapping": {
      "Tech blogs, coding tutorials, or programming books": {
        "primary": ["Web Development", "Backend Development"],
        "secondary": ["Full-Stack Development"]
      },
      "Design magazines, creative content, or art books": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "Business, marketing, or entrepreneurship books": {
        "primary": ["Digital Marketing", "Entrepreneurship"],
        "secondary": ["Content Strategy"]
      },
      "Science fiction, AI, or futuristic tech content": {
        "primary": ["Generative AI & LLMs", "Machine Learning"],
        "secondary": ["Deep Learning"]
      },
      "Self-improvement, teamwork, or leadership books": {
        "primary": ["Project Management", "Leadership"],
        "secondary": ["Public Speaking"]
      },
      "I prefer learning by doing rather than reading": {
        "primary": ["Hands-on Learning"],
        "secondary": ["Practical Skills"]
      }
    }
  }, 
  {
    "questionText": "If you had unlimited time, what side project would you start?",
    "options": [
      "Building a website or an app",
      "Creating a game or interactive experience",
      "Designing a brand or marketing campaign",
      "Analyzing data to solve a real-world problem",
      "Organizing events or leading a team",
      "Experimenting with emerging tech like AI, AR/VR, or IoT"
    ],
    "skillMapping": {
      "Building a website or an app": {
        "primary": ["Web Development", "Mobile App Development"],
        "secondary": ["Full-Stack Development"]
      },
      "Creating a game or interactive experience": {
        "primary": ["Game Development"],
        "secondary": ["3D Modeling & Rendering"]
      },
      "Designing a brand or marketing campaign": {
        "primary": ["Branding & Visual Identity", "Digital Marketing"],
        "secondary": ["Copywriting"]
      },
      "Analyzing data to solve a real-world problem": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Deep Learning"]
      },
      "Organizing events or leading a team": {
        "primary": ["Project Management"],
        "secondary": ["Leadership"]
      },
      "Experimenting with emerging tech like AI, AR/VR, or IoT": {
        "primary": ["Generative AI & LLMs", "IoT (Internet of Things)"],
        "secondary": ["Robotics & Automation"]
      }
    }
  },
  {
    "questionText": "How do you usually approach challenges?",
    "options": [
      "Break them into smaller, logical steps",
      "Think creatively and find unique solutions",
      "Work with others to brainstorm ideas",
      "Research and analyze data before acting",
      "Experiment and learn by trial and error",
      "Use technology to simplify the process"
    ],
    "skillMapping": {
      "Break them into smaller, logical steps": {
        "primary": ["Data Analysis", "Backend Development"],
        "secondary": ["Problem Solving"]
      },
      "Think creatively and find unique solutions": {
        "primary": ["UI/UX Design", "Graphic Design"],
        "secondary": ["Creative Thinking"]
      },
      "Work with others to brainstorm ideas": {
        "primary": ["Project Management"],
        "secondary": ["Team Collaboration"]
      },
      "Research and analyze data before acting": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Research Skills"]
      },
      "Experiment and learn by trial and error": {
        "primary": ["Hands-on Learning"],
        "secondary": ["Practical Skills"]
      },
      "Use technology to simplify the process": {
        "primary": ["Automation"],
        "secondary": ["Scripting"]
      }
    }
  },
  {
    "questionText": "What kind of tools or software do you enjoy using the most?",
    "options": [
      "Creative tools (Photoshop, Figma, Canva)",
      "Programming tools (VS Code, Python, GitHub)",
      "Analytics tools (Excel, Tableau, Power BI)",
      "Project management tools (Notion, Trello, Asana)",
      "Social media or digital marketing platforms",
      "I haven't used many tools yet, but I'm open to learning"
    ],
    "skillMapping": {
      "Creative tools (Photoshop, Figma, Canva)": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "Programming tools (VS Code, Python, GitHub)": {
        "primary": ["Web Development", "Backend Development"],
        "secondary": ["Full-Stack Development"]
      },
      "Analytics tools (Excel, Tableau, Power BI)": {
        "primary": ["Data Analysis"],
        "secondary": ["Machine Learning"]
      },
      "Project management tools (Notion, Trello, Asana)": {
        "primary": ["Project Management"],
        "secondary": ["Team Collaboration"]
      },
      "Social media or digital marketing platforms": {
        "primary": ["Social Media Management", "Digital Marketing"],
        "secondary": ["Content Creation"]
      },
      "I haven't used many tools yet, but I'm open to learning": {
        "primary": ["Tech Beginner"],
        "secondary": ["Learning Agility"]
      }
    }
  },
  {
    "questionText": "If you could have any job for a week, which one would you pick?",
    "options": [
      "A designer creating stunning visuals",
      "A software developer coding cool projects",
      "A business leader making big decisions",
      "A cybersecurity expert stopping hackers",
      "A social media influencer or digital marketer",
      "An AI or data scientist solving complex problems"
    ],
    "skillMapping": {
      "A designer creating stunning visuals": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "A software developer coding cool projects": {
        "primary": ["Web Development", "Mobile App Development"],
        "secondary": ["Full-Stack Development"]
      },
      "A business leader making big decisions": {
        "primary": ["Project Management", "Leadership"],
        "secondary": ["Entrepreneurship"]
      },
      "A cybersecurity expert stopping hackers": {
        "primary": ["Cybersecurity & Ethical Hacking"],
        "secondary": ["Cloud Security & Compliance"]
      },
      "A social media influencer or digital marketer": {
        "primary": ["Influencer Marketing", "Digital Marketing"],
        "secondary": ["Content Creation"]
      },
      "An AI or data scientist solving complex problems": {
        "primary": ["Machine Learning", "Generative AI & LLMs"],
        "secondary": ["Deep Learning"]
      }
    }
  },
  {
    "questionText": "What excites you the most about technology?",
    "options": [
      "The ability to create things from scratch",
      "How it can solve complex problems",
      "Its endless potential for creativity",
      "How it connects people and communities",
      "The opportunities it creates for businesses",
      "I’m not sure yet, but I love discovering new things"
    ],
    "skillMapping": {
      "The ability to create things from scratch": {
        "primary": ["Web Development", "Mobile App Development"],
        "secondary": ["Game Development"]
      },
      "How it can solve complex problems": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Deep Learning"]
      },
      "Its endless potential for creativity": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "How it connects people and communities": {
        "primary": ["Digital Marketing"],
        "secondary": ["Content Creation"]
      },
      "The opportunities it creates for businesses": {
        "primary": ["Project Management"],
        "secondary": ["Entrepreneurship"]
      },
      "I’m not sure yet, but I love discovering new things": {
        "primary": ["Tech Beginner"],
        "secondary": ["Learning Agility"]
      }
    }
  },
  {
    "questionText": "What type of games or puzzles do you enjoy?",
    "options": [
      "Logic puzzles and brain teasers",
      "Creative building games like Minecraft or Sims",
      "Strategy games like Chess or Civilization",
      "Multiplayer or team-based games",
      "I don’t play games often, but I like problem-solving"
    ],
    "skillMapping": {
      "Logic puzzles and brain teasers": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Problem Solving"]
      },
      "Creative building games like Minecraft or Sims": {
        "primary": ["3D Modeling & Rendering", "Game Development"],
        "secondary": ["Creative Thinking"]
      },
      "Strategy games like Chess or Civilization": {
        "primary": ["Project Management"],
        "secondary": ["Strategic Planning"]
      },
      "Multiplayer or team-based games": {
        "primary": ["Team Collaboration"],
        "secondary": ["Leadership"]
      },
      "I don’t play games often, but I like problem-solving": {
        "primary": ["Problem Solving"],
        "secondary": ["Analytical Thinking"]
      }
    }
  },
  {
    "questionText": "How do you prefer to spend your weekends?",
    "options": [
      "Working on personal projects or hobbies",
      "Learning something new through online courses",
      "Socializing and networking with people",
      "Relaxing with movies, books, or games",
      "Planning and organizing for the week ahead"
    ],
    "skillMapping": {
      "Working on personal projects or hobbies": {
        "primary": ["Web Development", "Graphic Design"],
        "secondary": ["Creative Projects"]
      },
      "Learning something new through online courses": {
        "primary": ["Continuous Learning"],
        "secondary": ["Skill Development"]
      },
      "Socializing and networking with people": {
        "primary": ["Networking"],
        "secondary": ["Communication Skills"]
      },
      "Relaxing with movies, books, or games": {
        "primary": ["Content Consumption"],
        "secondary": ["Leisure Activities"]
      },
      "Planning and organizing for the week ahead": {
        "primary": ["Time Management"],
        "secondary": ["Productivity"]
      }
    }
  },
  {
    "questionText": "What kind of problems do you love solving?",
    "options": [
      "Technical challenges (fixing bugs, coding, optimizing)",
      "Creative challenges (design, writing, storytelling)",
      "Business challenges (marketing, sales, strategies)",
      "Social challenges (helping communities, organizing teams)",
      "I like solving problems in general, but I’m not sure which type yet"
    ],
    "skillMapping": {
      "Technical challenges (fixing bugs, coding, optimizing)": {
        "primary": ["Web Development", "Backend Development"],
        "secondary": ["Problem Solving"]
      },
      "Creative challenges (design, writing, storytelling)": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Creative Thinking"]
      },
      "Business challenges (marketing, sales, strategies)": {
        "primary": ["Digital Marketing"],
        "secondary": ["Entrepreneurship"]
      },
      "Social challenges (helping communities, organizing teams)": {
        "primary": ["Project Management"],
        "secondary": ["Leadership"]
      },
      "I like solving problems in general, but I’m not sure which type yet": {
        "primary": ["Problem Solving"],
        "secondary": ["Analytical Thinking"]
      }
    }
  },
  {
    "questionText": "If you could master one skill instantly, what would it be?",
    "options": [
      "Coding and building software",
      "Designing stunning visuals and experiences",
      "Analyzing data to predict trends",
      "Leading and managing projects",
      "Marketing and promoting ideas effectively",
      "Cybersecurity and ethical hacking"
    ],
    "skillMapping": {
      "Coding and building software": {
        "primary": ["Web Development", "Mobile App Development"],
        "secondary": ["Full-Stack Development"]
      },
      "Designing stunning visuals and experiences": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "Analyzing data to predict trends": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Deep Learning"]
      },
      "Leading and managing projects": {
        "primary": ["Project Management"],
        "secondary": ["Leadership"]
      },
      "Marketing and promoting ideas effectively": {
        "primary": ["Digital Marketing"],
        "secondary": ["Content Creation"]
      },
      "Cybersecurity and ethical hacking": {
        "primary": ["Cybersecurity & Ethical Hacking"],
        "secondary": ["Cloud Security & Compliance"]
      }
    }
  },
  {
    "questionText": "What kind of apps or websites do you use most often?",
    "options": [
      "Social media platforms (Instagram, Twitter, TikTok)",
      "Productivity tools (Notion, Evernote, Trello)",
      "Creative platforms (Canva, Adobe Suite, Figma)",
      "Learning platforms (Coursera, Udemy, YouTube tutorials)",
      "Entertainment platforms (Netflix, YouTube, Twitch)"
    ],
    "skillMapping": {
      "Social media platforms (Instagram, Twitter, TikTok)": {
        "primary": ["Digital Marketing"],
        "secondary": ["Content Creation"]
      },
      "Productivity tools (Notion, Evernote, Trello)": {
        "primary": ["Project Management"],
        "secondary": ["Time Management"]
      },
      "Creative platforms (Canva, Adobe Suite, Figma)": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "Learning platforms (Coursera, Udemy, YouTube tutorials)": {
        "primary": ["Continuous Learning"],
        "secondary": ["Skill Development"]
      },
      "Entertainment platforms (Netflix, YouTube, Twitch)": {
        "primary": ["Content Consumption"],
        "secondary": ["Leisure Activities"]
      }
    }
  },
  {
    "questionText": "If you were asked to teach someone a skill, what would it be?",
    "options": [
      "Something technical (coding, debugging, automation)",
      "Something creative (design, video editing, storytelling)",
      "Something business-related (marketing, entrepreneurship)",
      "Something analytical (data insights, problem-solving)",
      "Something social (teamwork, leadership, communication)"
    ],
    "skillMapping": {
      "Something technical (coding, debugging, automation)": {
        "primary": ["Web Development", "Backend Development"],
        "secondary": ["Full-Stack Development"]
      },
      "Something creative (design, video editing, storytelling)": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "Something business-related (marketing, entrepreneurship)": {
        "primary": ["Digital Marketing"],
        "secondary": ["Entrepreneurship"]
      },
      "Something analytical (data insights, problem-solving)": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Deep Learning"]
      },
      "Something social (teamwork, leadership, communication)": {
        "primary": ["Project Management"],
        "secondary": ["Leadership"]
      }
    }
  },
  {
    "questionText": "What kind of work environment do you thrive in?",
    "options": [
      "Fast-paced and ever-changing",
      "Well-structured and organized",
      "Creative and open-ended",
      "Collaborative and team-oriented",
      "Independent and flexible"
    ],
    "skillMapping": {
      "Fast-paced and ever-changing": {
        "primary": ["Adaptability"],
        "secondary": ["Problem Solving"]
      },
      "Well-structured and organized": {
        "primary": ["Project Management"],
        "secondary": ["Time Management"]
      },
      "Creative and open-ended": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Creative Thinking"]
      },
      "Collaborative and team-oriented": {
        "primary": ["Team Collaboration"],
        "secondary": ["Leadership"]
      },
      "Independent and flexible": {
        "primary": ["Self-Management"],
        "secondary": ["Autonomy"]
      }
    }
  },
  {
    "questionText": "If you had to pick a dream project, what would it involve?",
    "options": [
      "Developing an innovative app or software",
      "Creating an immersive digital experience (AR/VR, gaming)",
      "Designing a brand, product, or website",
      "Analyzing trends and data to improve businesses",
      "Managing a team to launch something big",
      "Exploring cutting-edge technologies like AI, Blockchain, IoT"
    ],
    "skillMapping": {
      "Developing an innovative app or software": {
        "primary": ["Web Development", "Mobile App Development"],
        "secondary": ["Full-Stack Development"]
      },
      "Creating an immersive digital experience (AR/VR, gaming)": {
        "primary": ["Game Development", "3D Modeling & Rendering"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "Designing a brand, product, or website": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Branding & Visual Identity"]
      },
      "Analyzing trends and data to improve businesses": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Deep Learning"]
      },
      "Managing a team to launch something big": {
        "primary": ["Project Management"],
        "secondary": ["Leadership"]
      },
      "Exploring cutting-edge technologies like AI, Blockchain, IoT": {
        "primary": ["Generative AI & LLMs", "Blockchain & Smart Contracts(Web3)"],
        "secondary": ["IoT (Internet of Things)"]
      }
    }
  },
  {
    "questionText": "How do you like to learn new things?",
    "options": [
      "Watching tutorials and video courses",
      "Reading books, blogs, or research papers",
      "Learning by doing—hands-on projects",
      "Discussing with others and brainstorming ideas",
      "Experimenting and figuring things out myself"
    ],
    "skillMapping": {
      "Watching tutorials and video courses": {
        "primary": ["Visual Learning"],
        "secondary": ["Content Consumption"]
      },
      "Reading books, blogs, or research papers": {
        "primary": ["Reading Comprehension"],
        "secondary": ["Research Skills"]
      },
      "Learning by doing—hands-on projects": {
        "primary": ["Practical Skills"],
        "secondary": ["Hands-on Learning"]
      },
      "Discussing with others and brainstorming ideas": {
        "primary": ["Collaborative Learning"],
        "secondary": ["Communication Skills"]
      },
      "Experimenting and figuring things out myself": {
        "primary": ["Problem Solving"],
        "secondary": ["Analytical Thinking"]
      }
    }
  },
  {
    "questionText": "What kind of events or meetups interest you the most?",
    "options": [
      "Tech conferences, hackathons, or coding bootcamps",
      "Creative workshops, design exhibitions, or photography meetups",
      "Business networking events or startup seminars",
      "Community service projects or volunteering events",
      "I don’t usually attend events, but I’d love to explore"
    ],
    "skillMapping": {
      "Tech conferences, hackathons, or coding bootcamps": {
        "primary": ["Web Development", "Mobile App Development"],
        "secondary": ["Full-Stack Development"]
      },
      "Creative workshops, design exhibitions, or photography meetups": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "Business networking events or startup seminars": {
        "primary": ["Digital Marketing"],
        "secondary": ["Entrepreneurship"]
      },
      "Community service projects or volunteering events": {
        "primary": ["Community Engagement"],
        "secondary": ["Leadership"]
      },
      "I don’t usually attend events, but I’d love to explore": {
        "primary": ["Exploration"],
        "secondary": ["Curiosity"]
      }
    }
  },
  {
    "questionText": "If you had to launch a social media channel, what would it be about?",
    "options": [
      "Tech tutorials, programming, or software reviews",
      "Art, design, or creative inspiration",
      "Business, marketing, or entrepreneurship tips",
      "AI, futuristic tech, or cybersecurity insights",
      "A mix of everything—lifestyle, education, and fun"
    ],
    "skillMapping": {
      "Tech tutorials, programming, or software reviews": {
        "primary": ["Web Development", "Technical Writing"],
        "secondary": ["Developer Advocacy"]
      },
      "Art, design, or creative inspiration": {
        "primary": ["Graphic Design", "Digital Illustration & Digital Art"],
        "secondary": ["Content Creation"]
      },
      "Business, marketing, or entrepreneurship tips": {
        "primary": ["Digital Marketing", "Entrepreneurship"],
        "secondary": ["Content Strategy"]
      },
      "AI, futuristic tech, or cybersecurity insights": {
        "primary": ["Generative AI & LLMs", "Cybersecurity & Ethical Hacking"],
        "secondary": ["Technical Writing"]
      },
      "A mix of everything—lifestyle, education, and fun": {
        "primary": ["Content Creation"],
        "secondary": ["Versatility"]
      }
    }
  },
  {
    "questionText": "If you could time travel to the future, what would you be most excited to see?",
    "options": [
      "The next big breakthroughs in AI and robotics",
      "The evolution of web and app development",
      "How businesses and startups adapt to new trends",
      "The future of design, media, and content creation",
      "The way people communicate and work together globally"
    ],
    "skillMapping": {
      "The next big breakthroughs in AI and robotics": {
        "primary": ["Generative AI & LLMs", "Robotics & Automation"],
        "secondary": ["Deep Learning"]
      },
      "The evolution of web and app development": {
        "primary": ["Web Development", "Mobile App Development"],
        "secondary": ["Full-Stack Development"]
      },
      "How businesses and startups adapt to new trends": {
        "primary": ["Digital Marketing"],
        "secondary": ["Entrepreneurship"]
      },
      "The future of design, media, and content creation": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Motion Graphics & Animation"]
      },
      "The way people communicate and work together globally": {
        "primary": ["Project Management"],
        "secondary": ["Leadership"]
      }
    }
  },
  {
    "questionText": "Finally, what’s your biggest motivation for learning digital skills?",
    "options": [
      "I want to build something meaningful",
      "I love the challenge of solving complex problems",
      "I want a career that allows creativity and freedom",
      "I’m passionate about technology and innovation",
      "I want to help people and make an impact"
    ],
    "skillMapping": {
      "I want to build something meaningful": {
        "primary": ["Web Development", "Mobile App Development"],
        "secondary": ["Full-Stack Development"]
      },
      "I love the challenge of solving complex problems": {
        "primary": ["Data Analysis", "Machine Learning"],
        "secondary": ["Deep Learning"]
      },
      "I want a career that allows creativity and freedom": {
        "primary": ["Graphic Design", "UI/UX Design"],
        "secondary": ["Creative Thinking"]
      },
      "I’m passionate about technology and innovation": {
        "primary": ["Emerging Tech"],
        "secondary": ["Innovation"]
      },
      "I want to help people and make an impact": {
        "primary": ["Community Engagement"],
        "secondary": ["Leadership"]
      }
    }
  }
];

const seedQuestions = async () => {
  await connectDB();
  await QuestionModel.deleteMany();
  await QuestionModel.insertMany(questions);
  console.log("Questions have been seeded.");
  process.exit();
};

seedQuestions();

