import "dotenv/config";
import CareerModel from "../models/career.model";
import connectDB from "../config/database.config";

const careerQuestions = [
  {
    skill: "Web Development",
    questions: [
      {
        question: "Have you built any websites before?",
        answers: ["Yes, multiple live sites", "Just practice projects", "Never tried"],
      },
      {
        question: "How comfortable are you with HTML/CSS?",
        answers: ["Very comfortable", "Know the basics", "No experience"],
      },
      {
        question: "Do you enjoy making things look good on screen?",
        answers: ["Love the visual aspect", "Prefer functionality", "Not sure yet"],
      },
      {
        question: "Have you used JavaScript to make websites interactive?",
        answers: ["Yes, complex features", "Simple scripts", "Not yet"],
      },
      {
        question: "How do you approach fixing website layout issues?",
        answers: ["Debug systematically", "Trial and error", "Ask for help"],
      },
      {
        question: "Have you worked with any frontend frameworks?",
        answers: ["React/Vue/Angular", "Just learning", "What's a framework?"],
      },
      {
        question: "Do you test your websites on different browsers?",
        answers: ["Always cross-browser test", "Sometimes", "Didn't know I should"],
      },
      {
        question: "How do you learn new web technologies?",
        answers: ["Build projects", "Watch tutorials", "Haven't started"],
      },
      {
        question: "Have you deployed a website to the internet?",
        answers: ["Multiple deployments", "Once or twice", "Not yet"],
      },
      {
        question: "Do you see yourself as a web developer?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Backend Development",
    questions: [
      {
        question: "Have you written server-side code before?",
        answers: ["Yes, production systems", "Just tutorials", "No experience"],
      },
      {
        question: "How comfortable are you with APIs?",
        answers: ["Build REST/GraphQL APIs", "Consume APIs", "What's an API?"],
      },
      {
        question: "Do you enjoy working with databases?",
        answers: ["Love data modeling", "It's okay", "Prefer frontend"],
      },
      {
        question: "Have you handled user authentication?",
        answers: ["OAuth/JWT implementations", "Basic logins", "Not yet"],
      },
      {
        question: "How do you approach performance optimization?",
        answers: ["Benchmark/profile", "Basic caching", "Haven't needed to"],
      },
      {
        question: "Have you worked with backend frameworks?",
        answers: ["Express/Django/etc", "Just starting", "No"],
      },
      {
        question: "Do you think about security in your code?",
        answers: ["Always prioritize", "Basic protections", "Haven't considered"],
      },
      {
        question: "How do you handle errors in your applications?",
        answers: ["Comprehensive logging", "Basic try-catch", "Console.log"],
      },
      {
        question: "Have you deployed backend services?",
        answers: ["Cloud deployments", "Local only", "Not yet"],
      },
      {
        question: "Do you see yourself as a backend engineer?",
        answers: ["Career path", "Maybe full-stack", "Just learning"],
      },
    ],
  },
  {
    skill: "Full-Stack Development",
    questions: [
      {
        question: "Have you built complete applications yourself?",
        answers: ["Multiple full projects", "Partial implementations", "Not yet"],
      },
      {
        question: "How comfortable are you connecting frontend to backend?",
        answers: ["Very comfortable", "Done it a few times", "Never tried"],
      },
      {
        question: "Do you enjoy both visual and technical aspects?",
        answers: ["Love both equally", "Prefer one side", "Not sure"],
      },
      {
        question: "Have you worked with full-stack frameworks?",
        answers: ["MERN/MEAN stacks", "Just learning", "No experience"],
      },
      {
        question: "How do you approach application architecture?",
        answers: ["Plan thoroughly", "Start simple", "Haven't designed"],
      },
      {
        question: "Have you handled deployment pipelines?",
        answers: ["CI/CD setups", "Manual deploys", "Not yet"],
      },
      {
        question: "Do you think about the user and system needs together?",
        answers: ["Always consider both", "Focus on one", "Haven't considered"],
      },
      {
        question: "How do you stay current with full-stack trends?",
        answers: ["Daily learning", "Occasionally", "Just starting"],
      },
      {
        question: "Have you debugged full-stack issues?",
        answers: ["Front-to-back tracing", "Simple issues", "Not yet"],
      },
      {
        question: "Do you see yourself as a full-stack developer?",
        answers: ["Definitely", "Specializing later", "Exploring options"],
      },
    ],
  },
  {
    skill: "Mobile App Development",
    questions: [
      {
        question: "Have you built any mobile apps before?",
        answers: ["Published apps", "Practice projects", "Not yet"],
      },
      {
        question: "How comfortable are you with mobile platforms?",
        answers: ["iOS & Android", "One platform", "Just starting"],
      },
      {
        question: "Do you enjoy mobile-specific UI challenges?",
        answers: ["Love the constraints", "It's okay", "Prefer web"],
      },
      {
        question: "Have you used cross-platform frameworks?",
        answers: ["React Native/Flutter", "Just learning", "No"],
      },
      {
        question: "How do you approach different screen sizes?",
        answers: ["Responsive designs", "Basic adaptations", "Haven't needed"],
      },
      {
        question: "Have you worked with mobile device features?",
        answers: ["Camera/GPS/etc", "Basic features", "Not yet"],
      },
      {
        question: "Do you test on physical devices?",
        answers: ["Multiple devices", "Emulators only", "Haven't tested"],
      },
      {
        question: "How do you handle mobile performance?",
        answers: ["Optimize thoroughly", "Basic improvements", "Haven't needed"],
      },
      {
        question: "Have you published to app stores?",
        answers: ["Multiple apps", "Learning process", "Not yet"],
      },
      {
        question: "Do you see yourself as a mobile developer?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Low-Code/No-Code Development",
    questions: [
      {
        question: "Have you ever built an app or website without writing code?",
        answers: ["Yes, multiple projects", "Yes, one simple project", "No, but I'm curious"],
      },
      {
        question: "How do you feel about using drag-and-drop tools to create digital products?",
        answers: ["I love visual builders", "I'm willing to try", "I prefer traditional coding"],
      },
      {
        question: "Have you used platforms like Bubble, Webflow, or WordPress?",
        answers: ["Yes, extensively", "A little bit", "Never heard of them"],
      },
      {
        question: "Do you believe non-coders can build functional apps?",
        answers: ["Absolutely", "Maybe simple ones", "No, coding is essential"],
      },
      {
        question: "Would you prefer building something quickly with templates or coding from scratch?",
        answers: ["Quick building", "Depends on the project", "Always from scratch"],
      },
      {
        question: "Have you automated any tasks using no-code tools like Zapier?",
        answers: ["Yes, multiple workflows", "Yes, one or two", "No experience"],
      },
      {
        question: "How do you feel when technical people say 'real developers code'?",
        answers: ["Tools don't define value", "It makes me doubt", "I agree with them"],
      },
      {
        question: "Do you enjoy solving business problems more than technical challenges?",
        answers: ["Yes, business focus", "Both equally", "Prefer technical depth"],
      },
      {
        question: "Have you taken any no-code tutorials or courses?",
        answers: ["Yes, multiple", "Just some basics", "No, but interested"],
      },
      {
        question: "Do you see yourself building with visual tools in the future?",
        answers: ["Definitely my path", "Maybe for prototypes", "No, I'll learn coding"],
      },
    ],
  },
  {
    skill: "Game Development",
    questions: [
      {
        question: "Have you ever created any kind of game, even a simple one?",
        answers: ["Yes, multiple games", "Yes, one small game", "No, but I'd like to"],
      },
      {
        question: "What excites you more: game design or the technical implementation?",
        answers: ["Design/storytelling", "Technical challenges", "Both equally"],
      },
      {
        question: "Have you used game engines like Unity or Unreal?",
        answers: ["Yes, professionally", "Just tutorials", "Never touched them"],
      },
      {
        question: "Do you analyze game mechanics when you play?",
        answers: ["Always", "Sometimes", "I just play for fun"],
      },
      {
        question: "Have you created any game assets (art, sound, models)?",
        answers: ["Yes, multiple", "Yes, a few", "No experience"],
      },
      {
        question: "How do you feel about math/physics in game development?",
        answers: ["I enjoy it", "It's necessary", "Intimidates me"],
      },
      {
        question: "Have you participated in game jams or hackathons?",
        answers: ["Yes, multiple", "Yes, once", "No, but interested"],
      },
      {
        question: "Do you prefer 2D or 3D game development?",
        answers: ["2D is simpler", "3D is more powerful", "No preference"],
      },
      {
        question: "Have you taken any game dev courses?",
        answers: ["Formal education", "Online tutorials", "No experience"],
      },
      {
        question: "Do you see yourself working in the game industry?",
        answers: ["Dream career", "Maybe as a hobby", "Just curious"],
      },
    ],
  },
  {
    skill: "Database Management",
    questions: [
      {
        question: "Have you ever worked with organized data in tables?",
        answers: ["Yes, professionally", "Spreadsheets only", "No experience"],
      },
      {
        question: "Do you enjoy organizing information systematically?",
        answers: ["Love it", "It's okay", "Finds it tedious"],
      },
      {
        question: "Have you used SQL or any database tools?",
        answers: ["Yes, advanced queries", "Basic commands", "Never used"],
      },
      {
        question: "How do you feel about data relationships (one-to-many, etc.)?",
        answers: ["Comfortable", "Somewhat familiar", "No idea"],
      },
      {
        question: "Have you designed database structures before?",
        answers: ["Yes, optimized schemas", "Simple tables", "No experience"],
      },
      {
        question: "Do you notice when apps have poor data organization?",
        answers: ["Immediately", "Sometimes", "Rarely notice"],
      },
      {
        question: "Have you taken any database courses?",
        answers: ["Formal training", "Online basics", "No education"],
      },
      {
        question: "How do you feel about data security and backups?",
        answers: ["Crucial priority", "Important", "Haven't considered"],
      },
      {
        question: "Have you worked with NoSQL databases?",
        answers: ["Yes, multiple", "Just heard of them", "What's NoSQL?"],
      },
      {
        question: "Do you see yourself managing data systems?",
        answers: ["Career path", "Maybe occasionally", "Just basics"],
      },
    ],
  },
  {
    skill: "Blockchain & Smart Contracts(Web3)",
    questions: [
      {
        question: "Do you understand how cryptocurrencies work fundamentally?",
        answers: ["Yes, deeply", "Basic understanding", "Still confused"],
      },
      {
        question: "Have you interacted with blockchain networks?",
        answers: ["Yes, technically", "Just as user", "Never"],
      },
      {
        question: "How do you feel about decentralized systems?",
        answers: ["Future of tech", "Interesting concept", "Overhyped"],
      },
      {
        question: "Have you written or studied smart contracts?",
        answers: ["Yes, deployed some", "Just tutorials", "No experience"],
      },
      {
        question: "Do you follow crypto/blockchain news?",
        answers: ["Daily", "Occasionally", "Not at all"],
      },
      {
        question: "Have you used wallets like MetaMask?",
        answers: ["Yes, technically", "Just for transactions", "Never"],
      },
      {
        question: "How comfortable are you with cryptography concepts?",
        answers: ["Very comfortable", "Somewhat", "No knowledge"],
      },
      {
        question: "Have you taken any Web3 development courses?",
        answers: ["Multiple", "Just started", "No"],
      },
      {
        question: "Do you believe in blockchain's long-term potential?",
        answers: ["Transformational", "Some applications", "Overrated"],
      },
      {
        question: "Do you see yourself building dApps?",
        answers: ["Definitely", "Maybe experiment", "Just learning"],
      },
    ],
  },
  {
    skill: "UI/UX Design",
    questions: [
      {
        question: "Have you designed digital interfaces before?",
        answers: ["Professional work", "Personal projects", "Not yet"],
      },
      {
        question: "How comfortable are you with design tools?",
        answers: ["Figma/XD expert", "Basic skills", "Never used"],
      },
      {
        question: "Do you enjoy solving user problems?",
        answers: ["Love user research", "Some interest", "Prefer visuals"],
      },
      {
        question: "Have you created interactive prototypes?",
        answers: ["Advanced prototypes", "Basic click-throughs", "Not yet"],
      },
      {
        question: "How do you approach information architecture?",
        answers: ["Systematic planning", "Basic organization", "Haven't needed"],
      },
      {
        question: "Have you conducted user testing?",
        answers: ["Multiple sessions", "Casual feedback", "Not yet"],
      },
      {
        question: "Do you follow design systems?",
        answers: ["Create/maintain", "Use existing", "Not familiar"],
      },
      {
        question: "How do you stay current with design trends?",
        answers: ["Daily learning", "Occasionally", "Just starting"],
      },
      {
        question: "Have you collaborated with developers?",
        answers: ["Close teamwork", "Basic handoff", "Not yet"],
      },
      {
        question: "Do you see yourself as a UI/UX designer?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Graphic Design",
    questions: [
      {
        question: "Have you created professional graphics?",
        answers: ["Client work", "Personal projects", "Not yet"],
      },
      {
        question: "How comfortable are you with design software?",
        answers: ["Adobe Suite expert", "Basic skills", "Never used"],
      },
      {
        question: "Do you enjoy visual storytelling?",
        answers: ["Love creating visuals", "Some interest", "Prefer other media"],
      },
      {
        question: "Have you worked with branding materials?",
        answers: ["Complete brand systems", "Single logos", "Not yet"],
      },
      {
        question: "How do you approach typography?",
        answers: ["Thoughtfully pair fonts", "Basic selections", "Haven't focused"],
      },
      {
        question: "Have you prepared files for print?",
        answers: ["Professional prepress", "Basic exports", "Not yet"],
      },
      {
        question: "Do you follow design principles?",
        answers: ["Always apply", "Sometimes", "Not formally"],
      },
      {
        question: "How do you handle client feedback?",
        answers: ["Iterate professionally", "Basic revisions", "No experience"],
      },
      {
        question: "Have you created marketing materials?",
        answers: ["Complete campaigns", "Single pieces", "Not yet"],
      },
      {
        question: "Do you see yourself as a graphic designer?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Motion Graphics & Animation",
    questions: [
      {
        question: "Have you created any animations, even simple ones?",
        answers: ["Yes, professional work", "Personal projects", "Never"],
      },
      {
        question: "Do you enjoy bringing static designs to life?",
        answers: ["Love it", "It's fun", "Prefer static"],
      },
      {
        question: "Have you used tools like After Effects or Blender?",
        answers: ["Yes, advanced", "Basic knowledge", "Never used"],
      },
      {
        question: "Do you notice animation techniques in videos?",
        answers: ["Always analyze", "Sometimes", "Just watch content"],
      },
      {
        question: "How do you feel about learning animation principles?",
        answers: ["Excited", "Willing", "Intimidated"],
      },
      {
        question: "Have you created explainer videos or motion graphics?",
        answers: ["Yes, multiple", "Just experiments", "No"],
      },
      {
        question: "Do you prefer 2D or 3D animation?",
        answers: ["2D", "3D", "No preference"],
      },
      {
        question: "Have you taken any animation courses?",
        answers: ["Formal training", "Online tutorials", "No"],
      },
      {
        question: "How important do you think motion design is?",
        answers: ["Essential", "Nice to have", "Unnecessary"],
      },
      {
        question: "Do you see yourself creating animations professionally?",
        answers: ["Dream job", "Side projects", "Just curious"],
      },
    ],
  },
  {
    skill: "3D Modeling & Rendering",
    questions: [
      {
        question: "Have you created any 3D models before?",
        answers: ["Yes, professional work", "Personal projects", "Never"],
      },
      {
        question: "Do you enjoy working in three-dimensional space?",
        answers: ["Love it", "It's interesting", "Prefer 2D"],
      },
      {
        question: "Have you used software like Blender or Maya?",
        answers: ["Yes, advanced", "Basic knowledge", "Never used"],
      },
      {
        question: "How do you feel about learning topology and mesh modeling?",
        answers: ["Enjoy the challenge", "Willing to learn", "Seems difficult"],
      },
      {
        question: "Have you textured or rendered 3D models?",
        answers: ["Yes, professional quality", "Basic attempts", "No"],
      },
      {
        question: "Do you notice 3D assets in games/movies?",
        answers: ["Always analyze", "Sometimes", "Just enjoy content"],
      },
      {
        question: "Have you taken any 3D modeling courses?",
        answers: ["Formal education", "Online tutorials", "No"],
      },
      {
        question: "How important is lighting in your 3D work?",
        answers: ["Crucial element", "Somewhat important", "Haven't considered"],
      },
      {
        question: "Have you worked with sculpting tools?",
        answers: ["Yes, advanced", "Basic experience", "No"],
      },
      {
        question: "Do you see yourself pursuing 3D art?",
        answers: ["Career path", "Creative hobby", "Just exploring"],
      },
    ],
  },
  {
    skill: "Game Art & Concept Design",
    questions: [
      {
        question: "Have you created artwork for games?",
        answers: ["Yes, published games", "Personal projects", "No"],
      },
      {
        question: "Do you enjoy designing characters or environments?",
        answers: ["Love both", "Prefer one", "Not sure"],
      },
      {
        question: "Have you used tools like Photoshop or Procreate?",
        answers: ["Yes, professionally", "Casually", "No"],
      },
      {
        question: "How do you develop your art style?",
        answers: ["Established style", "Experimenting", "Haven't thought"],
      },
      {
        question: "Have you created game assets like sprites or textures?",
        answers: ["Yes, multiple", "A few", "No"],
      },
      {
        question: "Do you analyze art in games you play?",
        answers: ["Always study", "Sometimes", "Just play"],
      },
      {
        question: "Have you taken any game art courses?",
        answers: ["Formal training", "Online learning", "No"],
      },
      {
        question: "How important is concept art in development?",
        answers: ["Essential", "Helpful", "Unnecessary"],
      },
      {
        question: "Have you worked with 3D game art?",
        answers: ["Yes, extensively", "A little", "No"],
      },
      {
        question: "Do you see yourself in game art careers?",
        answers: ["Dream job", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Branding & Visual Identity",
    questions: [
      {
        question: "Have you created logos or brand identities?",
        answers: ["Yes, for clients", "Personal projects", "No"],
      },
      {
        question: "Do you notice branding in everyday products?",
        answers: ["Always analyze", "Sometimes", "Rarely"],
      },
      {
        question: "How important is consistency in branding?",
        answers: ["Crucial", "Important", "Flexible"],
      },
      {
        question: "Have you developed brand guidelines?",
        answers: ["Yes, professional", "Basic versions", "No"],
      },
      {
        question: "Do you enjoy typography and color theory?",
        answers: ["Passionate", "Some interest", "Not really"],
      },
      {
        question: "Have you taken any branding courses?",
        answers: ["Formal education", "Online learning", "No"],
      },
      {
        question: "How do you approach creating a brand identity?",
        answers: ["Strategic process", "Visual first", "No system"],
      },
      {
        question: "Have you worked with brand positioning?",
        answers: ["Yes, professionally", "Basic understanding", "No"],
      },
      {
        question: "Do you believe branding impacts business success?",
        answers: ["Significantly", "Somewhat", "Overrated"],
      },
      {
        question: "Do you see yourself in branding careers?",
        answers: ["Definitely", "Possibly", "Just learning"],
      },
    ],
  },
  {
    skill: "Product Design & Prototyping",
    questions: [
      {
        question: "Have you designed physical/digital products?",
        answers: ["Yes, launched", "Concepts only", "No"],
      },
      {
        question: "Do you enjoy the entire product development process?",
        answers: ["Love every stage", "Some aspects", "Not sure"],
      },
      {
        question: "Have you created prototypes?",
        answers: ["Yes, functional", "Basic mockups", "No"],
      },
      {
        question: "How do you approach user needs in design?",
        answers: ["Research-driven", "Intuition", "Haven't considered"],
      },
      {
        question: "Have you used CAD or prototyping tools?",
        answers: ["Yes, advanced", "Basics", "No"],
      },
      {
        question: "Do you iterate based on feedback?",
        answers: ["Always improve", "Sometimes", "Prefer first draft"],
      },
      {
        question: "Have you taken product design courses?",
        answers: ["Formal education", "Online learning", "No"],
      },
      {
        question: "How important is manufacturing in design?",
        answers: ["Essential consideration", "Somewhat", "Separate phase"],
      },
      {
        question: "Have you worked with 3D printing?",
        answers: ["Yes, regularly", "Tried it", "No"],
      },
      {
        question: "Do you see yourself in product design?",
        answers: ["Career path", "Possible interest", "Just curious"],
      },
    ],
  },
  {
    skill: "Video Editing",
    questions: [
      {
        question: "Have you edited videos before?",
        answers: ["Yes, professional work", "Personal projects", "No"],
      },
      {
        question: "Do you enjoy the storytelling aspect of editing?",
        answers: ["Love crafting stories", "Technical aspect", "Not sure"],
      },
      {
        question: "Have you used software like Premiere or DaVinci?",
        answers: ["Yes, advanced", "Basic knowledge", "No"],
      },
      {
        question: "How do you feel about color grading?",
        answers: ["Essential skill", "Important", "Haven't tried"],
      },
      {
        question: "Have you worked with audio in videos?",
        answers: ["Yes, professional mixes", "Basic editing", "No"],
      },
      {
        question: "Do you notice editing techniques in movies?",
        answers: ["Always analyze", "Sometimes", "Just watch"],
      },
      {
        question: "Have you taken editing courses?",
        answers: ["Formal training", "Online tutorials", "No"],
      },
      {
        question: "How important is pacing in your edits?",
        answers: ["Crucial element", "Consider it", "Haven't thought"],
      },
      {
        question: "Have you created motion graphics?",
        answers: ["Yes, regularly", "Simple titles", "No"],
      },
      {
        question: "Do you see yourself editing professionally?",
        answers: ["Career goal", "Side gig", "Just learning"],
      },
    ],
  },
  {
    skill: "Digital Illustration & Digital Art",
    questions: [
      {
        question: "Have you created digital artwork?",
        answers: ["Yes, professional", "Personal projects", "No"],
      },
      {
        question: "Do you prefer digital over traditional art?",
        answers: ["Digital only", "Both", "Traditional"],
      },
      {
        question: "Have you used tablets or drawing software?",
        answers: ["Yes, advanced", "Basic experience", "No"],
      },
      {
        question: "How do you develop your artistic style?",
        answers: ["Established style", "Experimenting", "No system"],
      },
      {
        question: "Have you sold or exhibited digital art?",
        answers: ["Yes, commercially", "Shared online", "No"],
      },
      {
        question: "Do you follow digital art trends?",
        answers: ["Actively", "Casually", "No"],
      },
      {
        question: "Have you taken digital art courses?",
        answers: ["Formal education", "Online learning", "No"],
      },
      {
        question: "How important is technical skill vs creativity?",
        answers: ["Both essential", "Balance depends", "One over other"],
      },
      {
        question: "Have you worked with layers/blending modes?",
        answers: ["Expert level", "Basic use", "No"],
      },
      {
        question: "Do you see digital art as your career?",
        answers: ["Professional path", "Serious hobby", "Just exploring"],
      },
    ],
  },

  // Marketing & Business
  {
    skill: "Digital Marketing",
    questions: [
      {
        question: "Have you run any digital marketing campaigns before?",
        answers: ["Yes, multiple campaigns", "Small personal projects", "No experience"],
      },
      {
        question: "How comfortable are you with SEO principles?",
        answers: ["Advanced knowledge", "Basic understanding", "Just learning"],
      },
      {
        question: "Do you enjoy analyzing campaign performance data?",
        answers: ["Love data-driven decisions", "It's useful", "Prefer creative side"],
      },
      {
        question: "Have you used tools like Google Ads or Facebook Ads Manager?",
        answers: ["Yes, professionally", "Basic familiarity", "Never used"],
      },
      {
        question: "How do you approach targeting the right audience?",
        answers: ["Detailed customer personas", "Basic demographics", "Not sure"],
      },
      {
        question: "Have you optimized websites for conversions?",
        answers: ["Yes, A/B testing", "Basic improvements", "Not yet"],
      },
      {
        question: "Do you stay updated with digital marketing trends?",
        answers: ["Daily industry news", "Occasional updates", "Just starting"],
      },
      {
        question: "Have you taken any digital marketing courses?",
        answers: ["Certifications/degrees", "Online courses", "No formal training"],
      },
      {
        question: "How do you measure campaign success?",
        answers: ["ROI and KPIs", "Basic metrics", "Not sure how"],
      },
      {
        question: "Do you see yourself in digital marketing careers?",
        answers: ["Definitely", "Possibly", "Just exploring"],
      },
    ],
  },
  {
    skill: "Social Media Management",
    questions: [
      {
        question: "Have you managed social media accounts before?",
        answers: ["Professional accounts", "Personal/practice", "No experience"],
      },
      {
        question: "How comfortable are you with content scheduling?",
        answers: ["Advanced scheduling tools", "Basic posting", "Just starting"],
      },
      {
        question: "Do you enjoy engaging with online communities?",
        answers: ["Love community building", "It's okay", "Prefer other tasks"],
      },
      {
        question: "Have you analyzed social media metrics?",
        answers: ["Regular reporting", "Basic insights", "Not yet"],
      },
      {
        question: "How do you approach content strategy?",
        answers: ["Data-driven calendar", "Basic planning", "Post spontaneously"],
      },
      {
        question: "Have you run social media ads?",
        answers: ["Multiple campaigns", "Small tests", "Not yet"],
      },
      {
        question: "Do you adapt content for different platforms?",
        answers: ["Platform-specific strategies", "Basic adjustments", "Same content everywhere"],
      },
      {
        question: "Have you handled a social media crisis?",
        answers: ["Professional experience", "Small issues", "No"],
      },
      {
        question: "How do you stay current with platform changes?",
        answers: ["Daily monitoring", "Occasional updates", "Not actively"],
      },
      {
        question: "Do you see yourself as a social media manager?",
        answers: ["Career goal", "Possible path", "Just learning"],
      },
    ],
  },
  {
    skill: "Influencer Marketing",
    questions: [
      {
        question: "Have you worked with influencers before?",
        answers: ["Multiple campaigns", "Small collaborations", "No experience"],
      },
      {
        question: "How comfortable are you identifying the right influencers?",
        answers: ["Advanced vetting process", "Basic research", "Not sure how"],
      },
      {
        question: "Do you enjoy building relationships with creators?",
        answers: ["Love partnership building", "It's okay", "Prefer other tasks"],
      },
      {
        question: "Have you negotiated influencer contracts?",
        answers: ["Professional agreements", "Casual arrangements", "Not yet"],
      },
      {
        question: "How do you measure influencer campaign success?",
        answers: ["ROI and KPIs", "Basic metrics", "Not sure"],
      },
      {
        question: "Have you managed influencer content approvals?",
        answers: ["Full creative direction", "Basic guidelines", "No experience"],
      },
      {
        question: "Do you understand FTC disclosure rules?",
        answers: ["Expert knowledge", "Basic awareness", "What's that?"],
      },
      {
        question: "Have you used influencer marketing platforms?",
        answers: ["Multiple tools", "Basic research", "No"],
      },
      {
        question: "How do you find emerging influencers?",
        answers: ["Advanced scouting", "Basic searches", "Not sure"],
      },
      {
        question: "Do you see yourself in influencer marketing?",
        answers: ["Definitely", "Possibly", "Just curious"],
      },
    ],
  },
  {
    skill: "Copywriting",
    questions: [
      {
        question: "Have you written professional marketing copy?",
        answers: ["Yes, for clients", "Personal projects", "No experience"],
      },
      {
        question: "How comfortable are you writing persuasive content?",
        answers: ["Very confident", "Somewhat comfortable", "Just learning"],
      },
      {
        question: "Do you enjoy crafting compelling headlines?",
        answers: ["Love the challenge", "It's okay", "Prefer long-form"],
      },
      {
        question: "Have you written for different industries?",
        answers: ["Multiple niches", "One specialty", "Not yet"],
      },
      {
        question: "How do you approach understanding target audiences?",
        answers: ["Detailed research", "Basic assumptions", "Not sure"],
      },
      {
        question: "Have you done A/B testing for copy?",
        answers: ["Multiple tests", "Basic experiments", "Not yet"],
      },
      {
        question: "Do you adapt tone for different brands?",
        answers: ["Expert at voice matching", "Basic adjustments", "Same style"],
      },
      {
        question: "Have you taken any copywriting courses?",
        answers: ["Professional training", "Online learning", "No"],
      },
      {
        question: "How do you handle feedback on your writing?",
        answers: ["Welcome revisions", "Somewhat okay", "Don't like it"],
      },
      {
        question: "Do you see yourself as a professional copywriter?",
        answers: ["Definitely", "Possibly", "Just exploring"],
      },
    ],
  },
  {
    skill: "E-commerce & Dropshipping",
    questions: [
      {
        question: "Have you run an online store before?",
        answers: ["Successful store", "Small attempt", "No experience"],
      },
      {
        question: "How comfortable are you with e-commerce platforms?",
        answers: ["Expert in Shopify/etc", "Basic knowledge", "Just starting"],
      },
      {
        question: "Do you enjoy product research?",
        answers: ["Love finding winners", "It's okay", "Prefer other tasks"],
      },
      {
        question: "Have you managed product sourcing?",
        answers: ["Multiple suppliers", "Basic research", "Not yet"],
      },
      {
        question: "How do you approach store optimization?",
        answers: ["Data-driven CRO", "Basic improvements", "Not sure"],
      },
      {
        question: "Have you run e-commerce ads?",
        answers: ["Profitable campaigns", "Small tests", "Not yet"],
      },
      {
        question: "Do you understand supply chain logistics?",
        answers: ["Advanced knowledge", "Basics", "No idea"],
      },
      {
        question: "Have you handled customer service?",
        answers: ["Professional systems", "Basic responses", "No"],
      },
      {
        question: "How do you analyze competitors?",
        answers: ["Detailed benchmarking", "Basic research", "Not sure"],
      },
      {
        question: "Do you see yourself in e-commerce?",
        answers: ["Definitely", "Possibly", "Just testing"],
      },
    ],
  },
  {
    skill: "Affiliate Marketing",
    questions: [
      {
        question: "Have you earned money through affiliate marketing?",
        answers: ["Significant income", "Small earnings", "Not yet"],
      },
      {
        question: "How comfortable are you with tracking links?",
        answers: ["Advanced tracking", "Basic setup", "No experience"],
      },
      {
        question: "Do you enjoy content creation for promotions?",
        answers: ["Love creating content", "It's okay", "Prefer other methods"],
      },
      {
        question: "Have you built an affiliate website?",
        answers: ["Successful site", "Basic attempt", "Not yet"],
      },
      {
        question: "How do you choose affiliate products?",
        answers: ["Detailed vetting", "Basic research", "Not sure"],
      },
      {
        question: "Have you used multiple affiliate networks?",
        answers: ["Many networks", "One platform", "No"],
      },
      {
        question: "Do you understand commission structures?",
        answers: ["Advanced knowledge", "Basics", "No idea"],
      },
      {
        question: "Have you done email marketing for affiliates?",
        answers: ["Successful campaigns", "Basic attempts", "No"],
      },
      {
        question: "How do you drive traffic to offers?",
        answers: ["Multiple channels", "Basic methods", "Not sure"],
      },
      {
        question: "Do you see affiliate marketing as income potential?",
        answers: ["Primary income", "Side income", "Just testing"],
      },
    ],
  },
  {
    skill: "Product Management",
    questions: [
      {
        question: "Have you managed a product lifecycle before?",
        answers: ["Multiple products", "Small features", "No experience"],
      },
      {
        question: "How comfortable are you with roadmapping?",
        answers: ["Expert at prioritization", "Basic planning", "Just learning"],
      },
      {
        question: "Do you enjoy gathering user requirements?",
        answers: ["Love user research", "It's necessary", "Prefer other tasks"],
      },
      {
        question: "Have you worked with cross-functional teams?",
        answers: ["Multiple departments", "Small teams", "Not yet"],
      },
      {
        question: "How do you approach MVP development?",
        answers: ["Strategic scoping", "Basic features", "Not sure"],
      },
      {
        question: "Have you analyzed product metrics?",
        answers: ["Data-driven decisions", "Basic analytics", "Not yet"],
      },
      {
        question: "Do you conduct competitive analysis?",
        answers: ["Regular benchmarking", "Occasionally", "No"],
      },
      {
        question: "Have you taken product management courses?",
        answers: ["Formal training", "Online learning", "No"],
      },
      {
        question: "How do you handle stakeholder feedback?",
        answers: ["Strategic balancing", "Basic incorporation", "Not sure"],
      },
      {
        question: "Do you see yourself as a product manager?",
        answers: ["Definitely", "Possibly", "Just exploring"],
      },
    ],
  },
  {
    skill: "Content Writing & Blogging",
    questions: [
      {
        question: "Have you published professional content before?",
        answers: ["Multiple publications", "Personal blog", "No experience"],
      },
      {
        question: "How comfortable are you with SEO writing?",
        answers: ["Expert at optimization", "Basic knowledge", "Just learning"],
      },
      {
        question: "Do you enjoy researching topics?",
        answers: ["Love deep research", "It's okay", "Prefer writing"],
      },
      {
        question: "Have you written long-form content?",
        answers: ["In-depth articles", "Basic posts", "Not yet"],
      },
      {
        question: "How do you approach content structure?",
        answers: ["Strategic formatting", "Basic organization", "Stream of thought"],
      },
      {
        question: "Have you managed an editorial calendar?",
        answers: ["Professional systems", "Basic planning", "No"],
      },
      {
        question: "Do you adapt tone for different audiences?",
        answers: ["Expert at voice matching", "Basic adjustments", "Same style"],
      },
      {
        question: "Have you taken writing courses?",
        answers: ["Formal education", "Online learning", "No"],
      },
      {
        question: "How do you handle writer's block?",
        answers: ["Reliable techniques", "Struggle through", "Give up"],
      },
      {
        question: "Do you see yourself as a professional writer?",
        answers: ["Definitely", "Possibly", "Just exploring"],
      },
    ],
  },

  // Content & Communication
  {
    skill: "Technical Writing",
    questions: [
      {
        question: "Have you written technical documentation before?",
        answers: ["Yes, professional docs", "Basic instructions", "No experience"],
      },
      {
        question: "How comfortable are you explaining complex topics simply?",
        answers: ["Very comfortable", "Somewhat okay", "Find it challenging"],
      },
      {
        question: "Do you enjoy creating user guides or manuals?",
        answers: ["Love making helpful docs", "It's okay", "Prefer other writing"],
      },
      {
        question: "Have you documented APIs or technical processes?",
        answers: ["Multiple projects", "Basic documentation", "Not yet"],
      },
      {
        question: "How do you approach organizing technical information?",
        answers: ["Logical structure", "Basic headings", "Not sure"],
      },
      {
        question: "Have you used documentation tools like Markdown or Sphinx?",
        answers: ["Advanced usage", "Basic knowledge", "Never used"],
      },
      {
        question: "Do you test your documentation for clarity?",
        answers: ["Always user-test", "Sometimes review", "Publish directly"],
      },
      {
        question: "Have you collaborated with developers on docs?",
        answers: ["Close teamwork", "Basic information", "No experience"],
      },
      {
        question: "How do you handle version control for documents?",
        answers: ["Git for docs", "Basic tracking", "No system"],
      },
      {
        question: "Do you see yourself as a technical writer?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Scriptwriting for Videos & Podcasts",
    questions: [
      {
        question: "Have you written scripts for media productions?",
        answers: ["Professional scripts", "Personal projects", "No experience"],
      },
      {
        question: "How comfortable are you with storytelling structure?",
        answers: ["Strong understanding", "Basic concepts", "Just learning"],
      },
      {
        question: "Do you enjoy writing dialogue or narration?",
        answers: ["Love crafting voice", "It's okay", "Prefer other writing"],
      },
      {
        question: "Have you created storyboards for scripts?",
        answers: ["Detailed visuals", "Basic sketches", "Not yet"],
      },
      {
        question: "How do you approach timing and pacing?",
        answers: ["Second-by-second", "General timing", "Not sure"],
      },
      {
        question: "Have you written for different formats (explainers, dramas)?",
        answers: ["Multiple formats", "One style", "Not yet"],
      },
      {
        question: "Do you consider the audience's attention span?",
        answers: ["Always optimize", "Sometimes", "Haven't considered"],
      },
      {
        question: "Have you collaborated with production teams?",
        answers: ["Close teamwork", "Basic input", "No experience"],
      },
      {
        question: "How do you handle script revisions?",
        answers: ["Welcome feedback", "Somewhat okay", "Resist changes"],
      },
      {
        question: "Do you see yourself writing media scripts?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Social Media Content Creation",
    questions: [
      {
        question: "Have you created content for social media platforms?",
        answers: ["Professional accounts", "Personal profiles", "No experience"],
      },
      {
        question: "How comfortable are you with platform-specific content?",
        answers: ["Tailor for each", "Basic adaptations", "Same content everywhere"],
      },
      {
        question: "Do you enjoy making short-form video content?",
        answers: ["Love creating reels", "It's okay", "Prefer other formats"],
      },
      {
        question: "Have you analyzed what performs well on social?",
        answers: ["Data-driven creation", "Basic observations", "Not yet"],
      },
      {
        question: "How do you approach trending topics?",
        answers: ["Strategic participation", "Occasional jumps", "Ignore trends"],
      },
      {
        question: "Have you built an engaged following?",
        answers: ["Significant audience", "Small following", "Not yet"],
      },
      {
        question: "Do you create content calendars?",
        answers: ["Detailed planning", "Basic scheduling", "Post spontaneously"],
      },
      {
        question: "Have you collaborated with brands?",
        answers: ["Paid partnerships", "Small collabs", "No experience"],
      },
      {
        question: "How do you measure content success?",
        answers: ["Analytics-driven", "Basic metrics", "Not sure"],
      },
      {
        question: "Do you see yourself as a content creator?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "UX Writing",
    questions: [
      {
        question: "Have you written microcopy for apps or websites?",
        answers: ["Professional projects", "Basic attempts", "No experience"],
      },
      {
        question: "How comfortable are you with UI terminology?",
        answers: ["Expert at clear labels", "Basic understanding", "Just learning"],
      },
      {
        question: "Do you enjoy improving user flows with words?",
        answers: ["Love simplifying", "It's interesting", "Prefer other writing"],
      },
      {
        question: "Have you collaborated with UX designers?",
        answers: ["Close teamwork", "Basic input", "No experience"],
      },
      {
        question: "How do you approach error messages?",
        answers: ["Helpful solutions", "Basic alerts", "Technical jargon"],
      },
      {
        question: "Have you conducted content usability tests?",
        answers: ["Multiple tests", "Basic feedback", "Not yet"],
      },
      {
        question: "Do you follow style guides for consistency?",
        answers: ["Create/maintain", "Follow existing", "No system"],
      },
      {
        question: "Have you worked with localization?",
        answers: ["Global products", "Basic translations", "Not yet"],
      },
      {
        question: "How do you balance brevity and clarity?",
        answers: ["Expert balance", "Lean too short/long", "Not sure"],
      },
      {
        question: "Do you see yourself as a UX writer?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Public Speaking",
    questions: [
      {
        question: "Have you given presentations to audiences?",
        answers: ["Large professional", "Small groups", "No experience"],
      },
      {
        question: "How comfortable are you speaking in front of people?",
        answers: ["Very comfortable", "Some nerves", "Extremely anxious"],
      },
      {
        question: "Do you enjoy crafting speeches or talks?",
        answers: ["Love the process", "It's okay", "Prefer not to"],
      },
      {
        question: "Have you received feedback on your speaking?",
        answers: ["Professional coaching", "Casual feedback", "No feedback"],
      },
      {
        question: "How do you handle nervousness?",
        answers: ["Effective techniques", "Some struggle", "No control"],
      },
      {
        question: "Have you adapted talks for different audiences?",
        answers: ["Tailored multiple", "Basic adjustments", "Same content"],
      },
      {
        question: "Do you practice your delivery?",
        answers: ["Rehearse thoroughly", "Some practice", "Wing it"],
      },
      {
        question: "Have you used visual aids effectively?",
        answers: ["Professional slides", "Basic support", "No visuals"],
      },
      {
        question: "How do you engage your audience?",
        answers: ["Interactive techniques", "Some connection", "Just present"],
      },
      {
        question: "Do you see yourself as a public speaker?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Content Strategy",
    questions: [
      {
        question: "Have you developed content strategies before?",
        answers: ["Full strategies", "Basic plans", "No experience"],
      },
      {
        question: "How comfortable are you with content audits?",
        answers: ["Comprehensive analysis", "Basic review", "Not sure how"],
      },
      {
        question: "Do you enjoy aligning content with business goals?",
        answers: ["Love the strategy", "It's okay", "Prefer creation"],
      },
      {
        question: "Have you created editorial calendars?",
        answers: ["Detailed systems", "Basic schedules", "Not yet"],
      },
      {
        question: "How do you approach content distribution?",
        answers: ["Multi-channel plan", "Basic sharing", "Not sure"],
      },
      {
        question: "Have you measured content performance?",
        answers: ["ROI analysis", "Basic metrics", "Not yet"],
      },
      {
        question: "Do you conduct audience research?",
        answers: ["Regular personas", "Basic understanding", "No research"],
      },
      {
        question: "Have you managed content teams?",
        answers: ["Full teams", "Small groups", "No experience"],
      },
      {
        question: "How do you stay current with content trends?",
        answers: ["Continuous learning", "Occasional updates", "Not actively"],
      },
      {
        question: "Do you see yourself as a content strategist?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },

  // Data & AI
  {
    skill: "Data Analysis",
    questions: [
      {
        question: "Have you worked with datasets to find insights?",
        answers: ["Yes, professionally", "Academic/personal projects", "No experience"],
      },
      {
        question: "How comfortable are you with Excel or Google Sheets?",
        answers: ["Advanced functions & macros", "Basic formulas", "Just starting"],
      },
      {
        question: "Do you enjoy finding patterns in numbers?",
        answers: ["Love discovering insights", "It's okay", "Prefer other work"],
      },
      {
        question: "Have you used SQL to query databases?",
        answers: ["Complex queries", "Basic SELECT statements", "Never used"],
      },
      {
        question: "How do you clean messy data?",
        answers: ["Systematic processes", "Basic fixes", "Not sure"],
      },
      {
        question: "Have you created data visualizations?",
        answers: ["Professional dashboards", "Basic charts", "Not yet"],
      },
      {
        question: "Do you understand statistical concepts?",
        answers: ["Confident with stats", "Basic knowledge", "Still learning"],
      },
      {
        question: "Have you used Python/R for analysis?",
        answers: ["Advanced scripts", "Basic scripts", "No coding"],
      },
      {
        question: "How do you present findings to others?",
        answers: ["Clear reports/stories", "Basic summaries", "Just raw data"],
      },
      {
        question: "Do you see yourself as a data analyst?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Machine Learning",
    questions: [
      {
        question: "Have you built machine learning models?",
        answers: ["Production models", "Academic projects", "No experience"],
      },
      {
        question: "How comfortable are you with ML algorithms?",
        answers: ["Understand many", "Know a few basics", "Just starting"],
      },
      {
        question: "Do you enjoy training models?",
        answers: ["Love the process", "It's interesting", "Prefer other work"],
      },
      {
        question: "Have you used scikit-learn or TensorFlow?",
        answers: ["Advanced usage", "Basic implementations", "Never used"],
      },
      {
        question: "How do you evaluate model performance?",
        answers: ["Multiple metrics", "Basic accuracy", "Not sure"],
      },
      {
        question: "Have you worked with feature engineering?",
        answers: ["Advanced techniques", "Basic transformations", "Not yet"],
      },
      {
        question: "Do you understand bias in ML?",
        answers: ["Deep understanding", "Basic awareness", "Not familiar"],
      },
      {
        question: "Have you deployed ML models?",
        answers: ["Production systems", "Local prototypes", "Not yet"],
      },
      {
        question: "How do you stay current with ML?",
        answers: ["Research papers", "Online courses", "Just starting"],
      },
      {
        question: "Do you see yourself in ML careers?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Deep Learning",
    questions: [
      {
        question: "Have you worked with neural networks?",
        answers: ["Multiple architectures", "Basic models", "No experience"],
      },
      {
        question: "How comfortable are you with frameworks like PyTorch?",
        answers: ["Expert level", "Basic usage", "Never used"],
      },
      {
        question: "Do you enjoy tuning hyperparameters?",
        answers: ["Love optimizing", "It's necessary", "Find it tedious"],
      },
      {
        question: "Have you implemented CNNs or RNNs?",
        answers: ["Multiple projects", "Basic implementations", "Not yet"],
      },
      {
        question: "How do you prevent overfitting?",
        answers: ["Multiple techniques", "Basic regularization", "Not sure"],
      },
      {
        question: "Have you used GPUs for training?",
        answers: ["Cloud/on-prem setups", "Basic Colab usage", "Not yet"],
      },
      {
        question: "Do you understand backpropagation?",
        answers: ["Could explain it", "Basic idea", "Not really"],
      },
      {
        question: "Have you worked with transfer learning?",
        answers: ["Fine-tuned models", "Basic implementations", "Not yet"],
      },
      {
        question: "How do you visualize neural networks?",
        answers: ["Architecture diagrams", "Basic sketches", "Not sure"],
      },
      {
        question: "Do you see yourself in deep learning?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Generative AI & LLMs",
    questions: [
      {
        question: "Have you worked with large language models?",
        answers: ["Fine-tuned models", "Basic API usage", "No experience"],
      },
      {
        question: "How comfortable are you with transformer architecture?",
        answers: ["Understand deeply", "Basic concepts", "Just starting"],
      },
      {
        question: "Do you enjoy prompt engineering?",
        answers: ["Love crafting prompts", "It's useful", "Prefer other work"],
      },
      {
        question: "Have you used tools like LangChain?",
        answers: ["Advanced implementations", "Basic usage", "Never used"],
      },
      {
        question: "How do you evaluate LLM outputs?",
        answers: ["Rigorous metrics", "Basic quality checks", "Not sure"],
      },
      {
        question: "Have you fine-tuned models?",
        answers: ["Multiple projects", "Basic attempts", "Not yet"],
      },
      {
        question: "Do you understand RLHF?",
        answers: ["Could implement", "Basic idea", "Not familiar"],
      },
      {
        question: "Have you deployed generative AI?",
        answers: ["Production systems", "Local prototypes", "Not yet"],
      },
      {
        question: "How do you stay current with AI advances?",
        answers: ["Research papers", "News/articles", "Casually"],
      },
      {
        question: "Do you see yourself in AI development?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Penetration Testing & Ethical Hacking",
    questions: [
      {
        question: "Have you performed security testing?",
        answers: ["Professional pentests", "Personal labs", "No experience"],
      },
      {
        question: "How comfortable are you with Kali Linux?",
        answers: ["Expert user", "Basic commands", "Never used"],
      },
      {
        question: "Do you enjoy finding vulnerabilities?",
        answers: ["Love the challenge", "It's interesting", "Prefer other work"],
      },
      {
        question: "Have you used tools like Metasploit?",
        answers: ["Advanced usage", "Basic commands", "Never used"],
      },
      {
        question: "How do you approach a new target?",
        answers: ["Methodical process", "Basic scanning", "Not sure"],
      },
      {
        question: "Have you written exploit code?",
        answers: ["Custom exploits", "Modified existing", "Not yet"],
      },
      {
        question: "Do you understand OWASP Top 10?",
        answers: ["Could explain all", "Know some", "Not familiar"],
      },
      {
        question: "Have you done bug bounties?",
        answers: ["Multiple programs", "Just starting", "Not yet"],
      },
      {
        question: "How do you stay ethical in hacking?",
        answers: ["Strict compliance", "Basic principles", "Haven't considered"],
      },
      {
        question: "Do you see yourself in cybersecurity?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Cloud Security & Compliance",
    questions: [
      {
        question: "Have you secured cloud environments?",
        answers: ["Enterprise systems", "Personal projects", "No experience"],
      },
      {
        question: "How comfortable are you with AWS/Azure security?",
        answers: ["Expert level", "Basic knowledge", "Just starting"],
      },
      {
        question: "Do you enjoy configuring security policies?",
        answers: ["Love the work", "It's necessary", "Prefer other tasks"],
      },
      {
        question: "Have you implemented compliance frameworks?",
        answers: ["SOC 2/ISO 27001", "Basic controls", "Not yet"],
      },
      {
        question: "How do you monitor cloud threats?",
        answers: ["Advanced tooling", "Basic alerts", "Not sure"],
      },
      {
        question: "Have you done cloud risk assessments?",
        answers: ["Formal processes", "Basic reviews", "Not yet"],
      },
      {
        question: "Do you understand IAM best practices?",
        answers: ["Could teach it", "Basic knowledge", "Still learning"],
      },
      {
        question: "Have you automated security checks?",
        answers: ["CI/CD pipelines", "Basic scripts", "Not yet"],
      },
      {
        question: "How do you stay current with cloud threats?",
        answers: ["Daily monitoring", "Occasional updates", "Not actively"],
      },
      {
        question: "Do you see yourself in cloud security?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Digital Forensics",
    questions: [
      {
        question: "Have you analyzed digital evidence?",
        answers: ["Professional cases", "Academic labs", "No experience"],
      },
      {
        question: "How comfortable are you with forensic tools?",
        answers: ["Multiple tools", "Basic usage", "Never used"],
      },
      {
        question: "Do you enjoy investigative work?",
        answers: ["Love the process", "It's interesting", "Prefer other work"],
      },
      {
        question: "Have you preserved chain of custody?",
        answers: ["Professional cases", "Academic practice", "Not yet"],
      },
      {
        question: "How do you approach malware analysis?",
        answers: ["Advanced techniques", "Basic examination", "Not sure"],
      },
      {
        question: "Have you recovered deleted files?",
        answers: ["Multiple methods", "Basic recovery", "Not yet"],
      },
      {
        question: "Do you understand legal requirements?",
        answers: ["Expert knowledge", "Basics", "Still learning"],
      },
      {
        question: "Have you testified about findings?",
        answers: ["Formal proceedings", "Practice scenarios", "Not yet"],
      },
      {
        question: "How do you document evidence?",
        answers: ["Court-ready reports", "Basic notes", "Not sure"],
      },
      {
        question: "Do you see yourself in forensics?",
        answers: ["Definitely", "Maybe", "Just exploring"],
      },
    ],
  },
  {
    skill: "Graphic Design",
    questions: [
      {
        question: "Do you enjoy creating visuals like logos, posters, or illustrations?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever used design tools like Photoshop or Canva?",
        answers: ["Yes, regularly", "Yes, a little", "No, but I’d like to"],
      },
      {
        question: "How do you feel about working with colors, fonts, and layouts?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of creating designs that communicate ideas?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle feedback on your creative work?",
        answers: ["I use it to improve", "I take it personally", "I’m not sure"],
      },
      {
        question: "Have you ever taken an online course or tutorial about graphic design?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy exploring new design trends and styles?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how to create professional designs?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working as a graphic designer in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new design tools and techniques?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Database Management",
    questions: [
      {
        question: "Do you enjoy organizing and managing information?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever worked with spreadsheets or databases?",
        answers: ["Yes, regularly", "Yes, a little", "No, but I’d like to"],
      },
      {
        question: "How do you feel about solving problems related to data organization?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of ensuring data is accurate and accessible?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle working with large amounts of data?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Have you ever taken an online course or tutorial about databases?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy learning how data is stored and retrieved?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how databases work?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working with databases in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new database tools and systems?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Robotics & Automation",
    questions: [
      {
        question: "Have you worked with robots before?",
        answers: ["Yes, hands-on", "Just seen them", "Not at all"]
      },
      {
        question: "Do you know how robots are programmed?",
        answers: ["Yes, fully", "Somewhat", "Not at all"]
      },
      {
        question: "Have you built or assembled a robot?",
        answers: ["Yes, multiple", "Just once", "Never tried"]
      },
      {
        question: "How comfortable are you with sensors and actuators?",
        answers: ["Very comfortable", "Somewhat", "Not at all"]
      },
      {
        question: "Do you know how automation is used in industries?",
        answers: ["Yes, clearly", "Somewhat", "Not really"]
      },
      {
        question: "Have you used any robotics programming languages like Python or ROS?",
        answers: ["Yes, actively", "Just learning", "Never tried"]
      },
      {
        question: "Do you enjoy designing and building machines?",
        answers: ["Love it", "Somewhat", "Not really"]
      },
      {
        question: "How do you approach troubleshooting robotic issues?",
        answers: ["Systematic debugging", "Trial and error", "Ask for help"]
      },
      {
        question: "Do you see yourself working in robotics?",
        answers: ["Definitely", "Maybe", "Just exploring"]
      },
      {
        question: "What interests you most about robotics?",
        answers: ["Building robots", "Programming them", "Not sure yet"]
      }
    ]
  },
  {
    skill: "IoT (Internet of Things)",
    questions: [
      {
        question: "Have you used a smart device before?",
        answers: ["Yes, many", "Just a few", "Not at all"]
      },
      {
        question: "Do you know what IoT means?",
        answers: ["Yes, clearly", "Somewhat", "Not at all"]
      },
      {
        question: "Have you ever built an IoT project?",
        answers: ["Yes, multiple", "Just once", "Never tried"]
      },
      {
        question: "How comfortable are you with sensors and microcontrollers?",
        answers: ["Very comfortable", "Somewhat", "Not at all"]
      },
      {
        question: "Do you know how IoT devices communicate?",
        answers: ["Yes, fully", "Somewhat", "Not really"]
      },
      {
        question: "Have you worked with platforms like Arduino or Raspberry Pi?",
        answers: ["Yes, actively", "Just learning", "Never tried"]
      },
      {
        question: "Do you enjoy connecting devices to the internet?",
        answers: ["Love it", "Somewhat", "Not really"]
      },
      {
        question: "How do you approach troubleshooting IoT issues?",
        answers: ["Systematic debugging", "Trial and error", "Ask for help"]
      },
      {
        question: "Do you see yourself working in IoT?",
        answers: ["Definitely", "Maybe", "Just exploring"]
      },
      {
        question: "What interests you most about IoT?",
        answers: ["Smart homes", "Industrial automation", "Not sure yet"]
      }
    ]
  },
  {
    skill: "Quantum Computing",
    questions: [
      {
        question: "Have you heard about quantum computing before?",
        answers: ["Yes, a lot", "Just a little", "Not at all"]
      },
      {
        question: "Do you understand the difference between classical and quantum computers?",
        answers: ["Yes, clearly", "Somewhat", "Not really"]
      },
      {
        question: "Have you tried any quantum computing simulators or platforms?",
        answers: ["Yes, multiple", "Just once", "Never tried"]
      },
      {
        question: "How comfortable are you with basic physics concepts?",
        answers: ["Very comfortable", "Somewhat", "Not at all"]
      },
      {
        question: "Do you know what a qubit is?",
        answers: ["Yes, fully", "Heard of it", "Not at all"]
      },
      {
        question: "Have you explored any quantum programming languages like Qiskit?",
        answers: ["Yes, actively", "Just learning", "Never tried"]
      },
      {
        question: "Do you enjoy solving complex computational problems?",
        answers: ["Love it", "Depends on the problem", "Not really"]
      },
      {
        question: "How do you learn about new scientific advancements?",
        answers: ["Read research papers", "Watch videos", "Haven't started"]
      },
      {
        question: "Do you see yourself working in quantum computing?",
        answers: ["Definitely", "Maybe", "Just exploring"]
      },
      {
        question: "What excites you most about quantum computing?",
        answers: ["Speed & power", "New possibilities", "Not sure yet"]
      }
    ]
  },
  {
    skill: "Entrepreneurship",
    questions: [
      {
        question: "Have you ever started your own business or project?",
        answers: ["Yes, multiple", "Just one", "Not yet"]
      },
      {
        question: "Do you enjoy coming up with new business ideas?",
        answers: ["Yes, all the time", "Sometimes", "Not really"]
      },
      {
        question: "How familiar are you with business planning?",
        answers: ["Very familiar", "Somewhat", "Not at all"]
      },
      {
        question: "Do you know what a business model is?",
        answers: ["Yes, fully", "Heard of it", "Not really"]
      },
      {
        question: "Have you ever pitched an idea to investors or partners?",
        answers: ["Yes, multiple times", "Just once", "Not yet"]
      },
      {
        question: "How comfortable are you with taking financial risks?",
        answers: ["Very comfortable", "Somewhat", "Not at all"]
      },
      {
        question: "Do you know the basics of marketing?",
        answers: ["Yes, fully", "Somewhat", "Not really"]
      },
      {
        question: "Have you ever sold a product or service?",
        answers: ["Yes, successfully", "Just tried once", "Not yet"]
      },
      {
        question: "Do you prefer working alone or building a team?",
        answers: ["Building a team", "Alone", "Depends on the situation"]
      },
      {
        question: "What motivates you to be an entrepreneur?",
        answers: ["Freedom & creativity", "Making money", "Not sure yet"]
      }
    ]
  },
  {
    skill: "Leadership",
    questions: [
      {
        question: "Have you ever led a team before?",
        answers: ["Yes, multiple times", "Just once", "Not yet"]
      },
      {
        question: "Do you enjoy making decisions that impact others?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "How comfortable are you with public speaking?",
        answers: ["Very comfortable", "Somewhat", "Not at all"]
      },
      {
        question: "Do you believe leadership is a skill that can be learned?",
        answers: ["Yes, definitely", "Maybe", "Not sure"]
      },
      {
        question: "How do you handle team conflicts?",
        answers: ["Mediate & solve", "Avoid conflicts", "Ask for help"]
      },
      {
        question: "Have you mentored or guided someone before?",
        answers: ["Yes, multiple times", "Just once", "Not yet"]
      },
      {
        question: "Do you prefer leading or following?",
        answers: ["Leading", "Following", "Depends on the situation"]
      },
      {
        question: "How do you handle responsibility?",
        answers: ["Take full ownership", "Share the load", "Avoid it"]
      },
      {
        question: "Do you see yourself in a leadership role in the future?",
        answers: ["Definitely", "Maybe", "Not sure yet"]
      },
      {
        question: "What quality do you think makes a great leader?",
        answers: ["Communication", "Vision", "Confidence"]
      }
    ]
  },
  {
    skill: "Project Management",
    questions: [
      {
        question: "Have you ever managed a project from start to finish?",
        answers: ["Yes, multiple times", "Just once", "Not yet"]
      },
      {
        question: "Do you enjoy organizing tasks and deadlines?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "How comfortable are you with planning and scheduling?",
        answers: ["Very comfortable", "Somewhat", "Not at all"]
      },
      {
        question: "Do you use any project management tools like Trello or Asana?",
        answers: ["Yes, regularly", "Tried them before", "Not yet"]
      },
      {
        question: "Have you worked with a team on a project?",
        answers: ["Yes, multiple times", "Just once", "Not yet"]
      },
      {
        question: "How do you handle unexpected problems in a project?",
        answers: ["Adjust & solve", "Seek help", "Panic"]
      },
      {
        question: "Do you believe deadlines are important?",
        answers: ["Yes, very important", "Somewhat", "Not really"]
      },
      {
        question: "Have you ever delegated tasks to a team?",
        answers: ["Yes, regularly", "A few times", "Not yet"]
      },
      {
        question: "How do you track project progress?",
        answers: ["Use tracking tools", "Regular check-ins", "I don’t track"]
      },
      {
        question: "What is the biggest challenge in managing projects?",
        answers: ["Time management", "Team coordination", "Unexpected issues"]
      }
    ]
  },
  {
    skill: "Content Creation",
    questions: [
      {
        question: "Have you ever created content for the web?",
        answers: ["Yes, regularly", "Just a few times", "Not yet"]
      },
      {
        question: "Do you enjoy writing, designing, or producing media?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "How familiar are you with tools like WordPress or Wix?",
        answers: ["Very familiar", "Somewhat", "Not at all"]
      },
      {
        question: "Do you know how to optimize content for search engines (SEO)?",
        answers: ["Yes, fully", "Somewhat", "Not at all"]
      },
      {
        question: "Have you created videos or podcasts for online platforms?",
        answers: ["Yes, multiple", "Just once", "Never tried"]
      },
      {
        question: "How comfortable are you with social media platforms?",
        answers: ["Very comfortable", "Somewhat", "Not at all"]
      },
      {
        question: "Do you have a blog or online presence?",
        answers: ["Yes, regularly updated", "I started one", "Not yet"]
      },
      {
        question: "Do you know how to measure the success of content?",
        answers: ["Yes, fully", "Somewhat", "Not really"]
      },
      {
        question: "Have you ever collaborated with others to create content?",
        answers: ["Yes, regularly", "Just once", "Not yet"]
      },
      {
        question: "What motivates you to create content?",
        answers: ["Sharing knowledge", "Building an audience", "Not sure yet"]
      }
    ]
  },
  {
    skill: "Problem Solving",
    questions: [
      {
        question: "Do you enjoy solving challenging problems?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "How do you approach a problem when you first encounter it?",
        answers: ["Break it down step-by-step", "Try different solutions", "Seek help immediately"]
      },
      {
        question: "Have you used logic or critical thinking to solve problems?",
        answers: ["Yes, regularly", "Sometimes", "Not really"]
      },
      {
        question: "Do you often find creative solutions to problems?",
        answers: ["Yes, often", "Sometimes", "Not really"]
      },
      {
        question: "When faced with a problem, how do you handle frustration?",
        answers: ["Take a break & try again", "Push through it", "Give up"]
      },
      {
        question: "Do you work better under pressure or when there’s more time?",
        answers: ["Under pressure", "More time", "Depends on the situation"]
      },
      {
        question: "Have you solved a problem by thinking outside the box?",
        answers: ["Yes, many times", "Just once", "Not yet"]
      },
      {
        question: "How do you handle problems with no clear solution?",
        answers: ["Look for alternatives", "Ask for help", "Leave it for later"]
      },
      {
        question: "Do you see problem-solving as a skill you need to improve?",
        answers: ["Yes, definitely", "Maybe", "Not really"]
      },
      {
        question: "What’s your go-to method for solving problems?",
        answers: ["Trial & error", "Systematic analysis", "Ask others"]
      }
    ]
  },
  {
    skill: "Creative Thinking",
    questions: [
      {
        question: "Do you enjoy thinking of new ideas?",
        answers: ["Yes, all the time", "Sometimes", "Not really"]
      },
      {
        question: "How often do you come up with creative solutions to problems?",
        answers: ["Often", "Sometimes", "Rarely"]
      },
      {
        question: "Have you ever thought of an idea that changed the way you work?",
        answers: ["Yes, multiple times", "Just once", "Not yet"]
      },
      {
        question: "Do you like brainstorming with others to generate ideas?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "How do you develop new ideas or solutions?",
        answers: ["Mind mapping", "Trial and error", "Ask for help"]
      },
      {
        question: "Do you enjoy thinking outside of the box?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "Have you used creative thinking to improve your work?",
        answers: ["Yes, regularly", "Just once", "Not yet"]
      },
      {
        question: "Do you find creative thinking challenging?",
        answers: ["Yes, sometimes", "Not really", "It comes naturally"]
      },
      {
        question: "Do you believe everyone can be creative?",
        answers: ["Yes, with practice", "Maybe", "Not sure"]
      },
      {
        question: "What helps you stay creative?",
        answers: ["Inspiration from others", "Solving problems", "Taking breaks"]
      }
    ]
  },
  {
    skill: "Augmented Reality/Virtual Reality",
    questions: [
      {
        question: "Do you enjoy exploring new technologies like AR and VR?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever tried an AR or VR experience?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’m interested"],
      },
      {
        question: "How do you feel about creating immersive digital experiences?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of blending the digital and physical worlds?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle learning new and complex technologies?",
        answers: ["I’m quick to learn", "I take my time", "It’s challenging"],
      },
      {
        question: "Have you ever taken an online course or tutorial about AR/VR?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy thinking about how AR/VR can be used in real life?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how AR/VR works?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working with AR/VR in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new AR/VR tools and platforms?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Team Collaboration",
    questions: [
      {
        question: "Have you worked in a team before?",
        answers: ["Yes, multiple teams", "Just once", "Not yet"]
      },
      {
        question: "Do you enjoy collaborating with others?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "How do you ensure clear communication within a team?",
        answers: ["Regular updates", "Ask questions", "Let others lead"]
      },
      {
        question: "Have you ever faced a conflict in a team?",
        answers: ["Yes, and resolved it", "Yes, but didn’t resolve", "Never faced one"]
      },
      {
        question: "How comfortable are you with giving and receiving feedback?",
        answers: ["Very comfortable", "Somewhat", "Not at all"]
      },
      {
        question: "Do you take initiative in team projects?",
        answers: ["Yes, always", "Sometimes", "Not really"]
      },
      {
        question: "How do you contribute to team success?",
        answers: ["Take on tasks", "Motivate others", "Just follow along"]
      },
      {
        question: "Do you prefer working in a team or alone?",
        answers: ["Team", "Alone", "Depends on the project"]
      },
      {
        question: "How do you manage differing opinions in a team?",
        answers: ["Open discussions", "Respect others' views", "Avoid confrontation"]
      },
      {
        question: "What role do you usually take in a team?",
        answers: ["Leader", "Contributor", "Follower"]
      }
    ]
  },
  {
    skill: "Continuous Learning",
    questions: [
      {
        question: "Do you enjoy learning new skills?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "How do you stay updated with new trends in your field?",
        answers: ["Read articles", "Watch tutorials", "Ask others"]
      },
      {
        question: "Have you taken any courses recently?",
        answers: ["Yes, multiple", "Just one", "Not yet"]
      },
      {
        question: "Do you prefer self-learning or structured courses?",
        answers: ["Self-learning", "Structured courses", "A mix of both"]
      },
      {
        question: "How do you apply what you learn in real-world situations?",
        answers: ["Through projects", "In my job", "I don’t apply much"]
      },
      {
        question: "How much time do you dedicate to learning new things?",
        answers: ["Every day", "A few hours a week", "Not much time"]
      },
      {
        question: "Have you used online platforms like Coursera or Udemy for learning?",
        answers: ["Yes, regularly", "Just once", "Never tried"]
      },
      {
        question: "Do you believe learning should be a lifelong process?",
        answers: ["Yes, definitely", "Maybe", "Not sure"]
      },
      {
        question: "How do you overcome challenges when learning something new?",
        answers: ["Keep practicing", "Ask for help", "Give up"]
      },
      {
        question: "What motivates you to keep learning?",
        answers: ["Personal growth", "Career advancement", "Curiosity"]
      }
    ]
  },
  {
    skill: "Hands-on Learning",
    questions: [
      {
        question: "Do you prefer learning by doing rather than reading or watching?",
        answers: ["Yes, hands-on all the way", "A mix of both", "Prefer reading or watching"]
      },
      {
        question: "Have you ever learned a new skill through hands-on projects?",
        answers: ["Yes, multiple", "Just once", "Not yet"]
      },
      {
        question: "Do you enjoy working on practical tasks to reinforce your learning?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "How do you approach a hands-on project?",
        answers: ["Start with a plan", "Jump right in", "Ask for help first"]
      },
      {
        question: "Do you find hands-on learning more effective than theoretical learning?",
        answers: ["Yes, definitely", "Sometimes", "Not really"]
      },
      {
        question: "Have you tried learning by building a project from scratch?",
        answers: ["Yes, multiple projects", "Just once", "Never tried"]
      },
      {
        question: "Do you prefer learning in a workshop or classroom setting?",
        answers: ["Workshop", "Classroom", "Online"]
      },
      {
        question: "How do you keep track of your progress in hands-on learning?",
        answers: ["Track tasks", "Reflect on what I’ve learned", "I don’t track it"]
      },
      {
        question: "How do you stay motivated when learning through hands-on methods?",
        answers: ["See progress", "Break tasks into smaller steps", "Get feedback from others"]
      },
      {
        question: "What type of hands-on activities do you enjoy most?",
        answers: ["Building things", "Experimenting", "Solving real-world problems"]
      }
    ]
  },
  {
    skill: "Community Engagement",
    questions: [
      {
        question: "Have you ever volunteered for a community project?",
        answers: ["Yes, multiple times", "Just once", "Not yet"]
      },
      {
        question: "Do you enjoy interacting with people in your community?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "How do you contribute to the well-being of your community?",
        answers: ["Volunteer work", "Support local businesses", "I don’t contribute much"]
      },
      {
        question: "Do you follow local news and events?",
        answers: ["Yes, regularly", "Sometimes", "Not really"]
      },
      {
        question: "Have you participated in online communities or forums?",
        answers: ["Yes, regularly", "Just once", "Not yet"]
      },
      {
        question: "Do you believe it's important to support local causes?",
        answers: ["Yes, very important", "Maybe", "Not sure"]
      },
      {
        question: "Have you ever organized an event or initiative in your community?",
        answers: ["Yes, multiple", "Just once", "Not yet"]
      },
      {
        question: "Do you think community engagement can positively impact society?",
        answers: ["Yes, definitely", "Maybe", "Not sure"]
      },
      {
        question: "How do you promote positive change in your community?",
        answers: ["Share ideas", "Encourage participation", "Take action myself"]
      },
      {
        question: "What motivates you to be involved in community efforts?",
        answers: ["Making a difference", "Helping others", "Building relationships"]
      }
    ]
  },
  {
    skill: "Tech Beginner",
    questions: [
      {
        question: "Are you new to the world of technology?",
        answers: ["Yes, just started", "A little experience", "Not new to tech"]
      },
      {
        question: "Do you enjoy learning about new tech gadgets or tools?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "Have you ever built or coded a simple program?",
        answers: ["Yes, multiple", "Just once", "Not yet"]
      },
      {
        question: "How comfortable are you using digital tools and apps?",
        answers: ["Very comfortable", "Somewhat", "Not very comfortable"]
      },
      {
        question: "Do you follow tech news and updates?",
        answers: ["Yes, regularly", "Sometimes", "Not really"]
      },
      {
        question: "Do you find learning about technology exciting?",
        answers: ["Yes, it’s fascinating", "Sometimes", "Not really"]
      },
      {
        question: "Have you taken any introductory courses in technology?",
        answers: ["Yes, a few", "Just one", "Not yet"]
      },
      {
        question: "Do you like experimenting with new tech tools or software?",
        answers: ["Yes, often", "Sometimes", "Not really"]
      },
      {
        question: "How do you usually learn about new technologies?",
        answers: ["Read articles", "Watch videos", "Ask others"]
      },
      {
        question: "Do you think technology is important in today's world?",
        answers: ["Yes, very important", "Somewhat", "Not sure"]
      }
    ]
  },
  {
    skill: "Emerging Tech",
    questions: [
      {
        question: "Are you familiar with emerging technologies like AI or blockchain?",
        answers: ["Yes, fully", "Heard of them", "Not really"]
      },
      {
        question: "Do you follow trends in emerging technologies?",
        answers: ["Yes, regularly", "Sometimes", "Not really"]
      },
      {
        question: "How comfortable are you with the concepts behind emerging tech?",
        answers: ["Very comfortable", "Somewhat", "Not at all"]
      },
      {
        question: "Have you ever worked with emerging tech like virtual reality or machine learning?",
        answers: ["Yes, extensively", "Just experimented", "Not yet"]
      },
      {
        question: "Do you think emerging tech will significantly impact the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"]
      },
      {
        question: "Would you be interested in pursuing a career in emerging technologies?",
        answers: ["Yes, definitely", "Maybe", "Not sure"]
      },
      {
        question: "Do you think emerging tech could solve current global problems?",
        answers: ["Yes, many solutions", "Maybe, some solutions", "Not sure"]
      },
      {
        question: "Have you taken any courses related to emerging technologies?",
        answers: ["Yes, a few", "Just one", "Not yet"]
      },
      {
        question: "Do you like exploring new tech and seeing how it works?",
        answers: ["Yes, love it", "Sometimes", "Not really"]
      },
      {
        question: "What emerging tech do you find the most exciting?",
        answers: ["AI", "Blockchain", "Quantum computing"]
      }
    ]
  },
  {
    skill: "Adaptability",
    questions: [
      {
        question: "Do you enjoy learning new things and trying new approaches?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle changes in your work or personal life?",
        answers: ["I adapt quickly", "I take time to adjust", "I find it challenging"],
      },
      {
        question: "Do you like the idea of working in dynamic and fast-paced environments?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you feel about stepping out of your comfort zone?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "How do you handle unexpected challenges?",
        answers: ["I stay calm and find solutions", "I feel stressed", "I’m not sure"],
      },
      {
        question: "Have you ever taken on a new role or responsibility?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’d like to"],
      },
      {
        question: "Do you enjoy exploring new ways to solve problems?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in improving your adaptability skills?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself thriving in changing environments?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new skills quickly?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Team Collaboration",
    questions: [
      {
        question: "Do you enjoy working with others to achieve a common goal?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle conflicts or disagreements in a team?",
        answers: ["I communicate openly", "I avoid conflict", "I’m not sure"],
      },
      {
        question: "Do you like the idea of contributing to a team’s success?",
        answers: ["Yes, it’s rewarding", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you feel about sharing ideas and feedback with others?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "How do you handle working with people who have different opinions?",
        answers: ["I listen and collaborate", "I find it difficult", "I’m not sure"],
      },
      {
        question: "Have you ever worked on a team project?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’d like to"],
      },
      {
        question: "Do you enjoy brainstorming and solving problems as a team?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in improving your teamwork skills?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working in collaborative environments?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new ways to work effectively in teams?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Leadership",
    questions: [
      {
        question: "Do you enjoy guiding and motivating others?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever taken on a leadership role?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’d like to"],
      },
      {
        question: "How do you handle making decisions for a group?",
        answers: ["I’m confident", "I find it challenging", "I’m not sure"],
      },
      {
        question: "Do you like the idea of helping others achieve their goals?",
        answers: ["Yes, it’s rewarding", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle responsibility and accountability?",
        answers: ["I embrace it", "I find it stressful", "I’m not sure"],
      },
      {
        question: "Have you ever mentored or coached someone?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’d like to"],
      },
      {
        question: "Do you enjoy inspiring and influencing others?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in improving your leadership skills?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself leading teams or projects in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new leadership techniques?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Content Creation",
    questions: [
      {
        question: "Do you enjoy creating content like videos, blogs, or social media posts?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever shared your creative work online?",
        answers: ["Yes, regularly", "Yes, a little", "No, but I’d like to"],
      },
      {
        question: "How do you feel about expressing ideas through content?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of building an audience or community?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle feedback on your creative work?",
        answers: ["I use it to improve", "I take it personally", "I’m not sure"],
      },
      {
        question: "Have you ever taken an online course or tutorial about content creation?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy exploring new ways to tell stories or share ideas?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how to create engaging content?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working as a content creator in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new content creation tools and techniques?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
];

const seedCareerQuestions = async () => {
  await connectDB();
  await CareerModel.deleteMany();
  await CareerModel.insertMany(careerQuestions);
  console.log("Career questions have been seeded.");
  process.exit();
};

seedCareerQuestions();