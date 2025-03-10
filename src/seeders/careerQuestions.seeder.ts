import "dotenv/config";
import CareerModel from "../models/career.model";
import connectDB from "../config/database.config";

const careerQuestions = [
  {
    skill: "Web Development",
    questions: [
      {
        question: "Have you ever built a website or worked on a web project?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’m interested"],
      },
      {
        question: "Do you enjoy solving problems and creating things online?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "How comfortable are you with learning new tools and technologies?",
        answers: ["Very comfortable", "Somewhat comfortable", "Not comfortable"],
      },
      {
        question: "Do you prefer working on the visual part of websites or the behind-the-scenes functionality?",
        answers: ["Visual part", "Behind-the-scenes", "Both equally"],
      },
      {
        question: "How do you feel about working in teams to build websites?",
        answers: ["I enjoy teamwork", "I prefer working alone", "I’m open to both"],
      },
      {
        question: "Have you ever taken an online course or tutorial about web development?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy creating things that people can interact with online?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle challenges when something doesn’t work as expected?",
        answers: ["I keep trying until I fix it", "I ask for help", "I feel frustrated"],
      },
      {
        question: "Do you see yourself building websites or apps in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How interested are you in learning how websites work?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
    ],
  },
  {
    skill: "UI/UX Design",
    questions: [
      {
        question: "Do you enjoy designing things that look good and are easy to use?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever created a design for a website, app, or poster?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’m interested"],
      },
      {
        question: "How do you feel about understanding what users need and want?",
        answers: ["I enjoy it", "I’m curious about it", "Not sure yet"],
      },
      {
        question: "Do you like working with colors, layouts, and visuals?",
        answers: ["Yes, I love it", "Sometimes", "Not really"],
      },
      {
        question: "How do you handle feedback on your designs?",
        answers: ["I use it to improve", "I take it personally", "I’m not sure"],
      },
      {
        question: "Have you ever used design tools like Figma or Canva?",
        answers: ["Yes, regularly", "Yes, a little", "No, but I’d like to"],
      },
      {
        question: "Do you enjoy solving problems related to how people interact with products?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in making things user-friendly?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself designing apps or websites in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new design trends and tools?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Digital Marketing",
    questions: [
      {
        question: "Do you enjoy promoting products or ideas online?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever managed a social media account or campaign?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’m interested"],
      },
      {
        question: "How do you feel about analyzing data to improve results?",
        answers: ["I enjoy it", "I’m curious about it", "Not sure yet"],
      },
      {
        question: "Do you like creating content like posts, videos, or ads?",
        answers: ["Yes, I love it", "Sometimes", "Not really"],
      },
      {
        question: "How do you handle working on multiple tasks at once?",
        answers: ["I’m good at multitasking", "I prefer focusing on one thing", "It’s challenging"],
      },
      {
        question: "Have you ever taken an online course or tutorial about marketing?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy interacting with people online?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how to grow a brand online?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working in marketing in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new marketing tools and strategies?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Data Science",
    questions: [
      {
        question: "Do you enjoy working with numbers and data?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever analyzed data to find patterns or insights?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’m interested"],
      },
      {
        question: "How do you feel about solving problems using data?",
        answers: ["I enjoy it", "I’m curious about it", "Not sure yet"],
      },
      {
        question: "Do you like learning how to make predictions or decisions based on data?",
        answers: ["Yes, I love it", "Sometimes", "Not really"],
      },
      {
        question: "How do you handle working with large amounts of information?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Have you ever taken an online course or tutorial about data analysis?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy finding stories or trends hidden in data?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how data impacts decisions?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working with data in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new tools for analyzing data?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Cybersecurity",
    questions: [
      {
        question: "Do you enjoy solving puzzles or figuring out how things work?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever thought about how to protect information online?",
        answers: ["Yes, often", "Sometimes", "Not really"],
      },
      {
        question: "How do you feel about learning how to keep systems safe?",
        answers: ["I enjoy it", "I’m curious about it", "Not sure yet"],
      },
      {
        question: "Do you like the idea of preventing online threats?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not really"],
      },
      {
        question: "How do you handle challenges that require attention to detail?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Have you ever taken an online course or tutorial about cybersecurity?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy learning about how hackers think?",
        answers: ["Yes, it’s fascinating", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in protecting people and businesses online?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working in cybersecurity in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new tools for security?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Project Management",
    questions: [
      {
        question: "Do you enjoy organizing tasks and keeping things on track?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever led a team or managed a project?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’m interested"],
      },
      {
        question: "How do you handle deadlines and time management?",
        answers: ["I’m very organized", "I try my best", "I struggle with it"],
      },
      {
        question: "Do you enjoy solving problems and finding solutions for teams?",
        answers: ["Yes, it’s rewarding", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you feel about communicating with different people to achieve a goal?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Have you ever used tools like Trello or Asana to manage tasks?",
        answers: ["Yes, regularly", "Yes, a little", "No, but I’d like to"],
      },
      {
        question: "Do you like the idea of helping teams work together effectively?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how to manage projects?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself leading teams or projects in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new project management techniques?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Mobile Development",
    questions: [
      {
        question: "Do you enjoy using mobile apps and thinking about how they work?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever thought about creating your own mobile app?",
        answers: ["Yes, I have ideas", "Maybe", "Not really"],
      },
      {
        question: "How do you feel about learning how to build apps for phones?",
        answers: ["I’m excited", "I’m curious", "Not sure yet"],
      },
      {
        question: "Do you prefer working on apps for iOS, Android, or both?",
        answers: ["iOS", "Android", "Both"],
      },
      {
        question: "How do you handle challenges when something doesn’t work as expected?",
        answers: ["I keep trying until I fix it", "I ask for help", "I feel frustrated"],
      },
      {
        question: "Have you ever taken an online course or tutorial about mobile development?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy creating things that people can use on their phones?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how mobile apps are built?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself building mobile apps in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new tools for mobile development?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Cloud Computing",
    questions: [
      {
        question: "Do you enjoy learning about how data is stored and accessed online?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever used cloud services like Google Drive or Dropbox?",
        answers: ["Yes, regularly", "Yes, a little", "No, but I’d like to"],
      },
      {
        question: "How do you feel about working with online tools and platforms?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of managing resources over the internet?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle learning new technologies?",
        answers: ["I’m quick to learn", "I take my time", "It’s challenging"],
      },
      {
        question: "Have you ever taken an online course or tutorial about cloud computing?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy solving problems related to online storage and access?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how cloud systems work?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working with cloud technologies in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new cloud platforms?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Backend Development",
    questions: [
      {
        question: "Do you enjoy working on the behind-the-scenes functionality of websites?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever thought about how data is processed and stored online?",
        answers: ["Yes, often", "Sometimes", "Not really"],
      },
      {
        question: "How do you feel about solving problems that users don’t see directly?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of building systems that power websites and apps?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle learning new programming concepts?",
        answers: ["I’m quick to learn", "I take my time", "It’s challenging"],
      },
      {
        question: "Have you ever taken an online course or tutorial about backend development?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy working with databases and servers?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how backend systems work?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working on backend systems in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new backend tools and frameworks?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Blockchain",
    questions: [
      {
        question: "Do you enjoy learning about new technologies like blockchain?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever thought about how cryptocurrencies work?",
        answers: ["Yes, often", "Sometimes", "Not really"],
      },
      {
        question: "How do you feel about solving problems using decentralized systems?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of creating secure and transparent systems?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle learning complex concepts?",
        answers: ["I’m quick to learn", "I take my time", "It’s challenging"],
      },
      {
        question: "Have you ever taken an online course or tutorial about blockchain?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy exploring new ways to use technology for security?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how blockchain works?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working with blockchain in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new blockchain tools and platforms?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Artificial Intelligence",
    questions: [
      {
        question: "Do you enjoy learning about how machines can think and learn?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever thought about how AI is used in everyday life?",
        answers: ["Yes, often", "Sometimes", "Not really"],
      },
      {
        question: "How do you feel about solving problems using AI?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of creating systems that can learn and adapt?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle learning complex topics?",
        answers: ["I’m quick to learn", "I take my time", "It’s challenging"],
      },
      {
        question: "Have you ever taken an online course or tutorial about AI?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy exploring how AI can solve real-world problems?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how AI works?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working with AI in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new AI tools and techniques?",
        answers: ["Excited", "Curious", "Overwhelmed"],
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
    skill: "DevOps",
    questions: [
      {
        question: "Do you enjoy learning about how software is developed and deployed?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever thought about how apps are released and updated?",
        answers: ["Yes, often", "Sometimes", "Not really"],
      },
      {
        question: "How do you feel about solving problems related to software delivery?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of automating processes to make things faster?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle learning new tools and technologies?",
        answers: ["I’m quick to learn", "I take my time", "It’s challenging"],
      },
      {
        question: "Have you ever taken an online course or tutorial about DevOps?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy exploring ways to improve software development?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how DevOps works?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working in DevOps in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new DevOps tools and practices?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "E-commerce",
    questions: [
      {
        question: "Do you enjoy learning about how online stores work?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever shopped online or thought about running an online store?",
        answers: ["Yes, often", "Sometimes", "Not really"],
      },
      {
        question: "How do you feel about solving problems related to online sales?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of helping businesses sell products online?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle learning new e-commerce tools and platforms?",
        answers: ["I’m quick to learn", "I take my time", "It’s challenging"],
      },
      {
        question: "Have you ever taken an online course or tutorial about e-commerce?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy exploring ways to improve online shopping experiences?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how e-commerce works?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working in e-commerce in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new e-commerce tools and strategies?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
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
    skill: "Internet of Things (IoT)",
    questions: [
      {
        question: "Do you enjoy learning about how devices connect and communicate?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever used smart devices like thermostats or lights?",
        answers: ["Yes, regularly", "Yes, a little", "No, but I’d like to"],
      },
      {
        question: "How do you feel about solving problems related to connected devices?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of creating smart systems for homes or businesses?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle learning new technologies?",
        answers: ["I’m quick to learn", "I take my time", "It’s challenging"],
      },
      {
        question: "Have you ever taken an online course or tutorial about IoT?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy exploring how IoT can improve everyday life?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how IoT works?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working with IoT in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new IoT tools and platforms?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Business Intelligence",
    questions: [
      {
        question: "Do you enjoy analyzing data to make decisions?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever worked with tools like Excel or Tableau?",
        answers: ["Yes, regularly", "Yes, a little", "No, but I’d like to"],
      },
      {
        question: "How do you feel about solving problems using data insights?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of helping businesses make better decisions?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle working with large amounts of data?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Have you ever taken an online course or tutorial about business intelligence?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "Do you enjoy exploring trends and patterns in data?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning how business intelligence works?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working in business intelligence in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new BI tools and techniques?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
  },
  {
    skill: "Tech Beginner",
    questions: [
      {
        question: "Do you enjoy learning about technology and how it works?",
        answers: ["Yes, I love it", "Sometimes", "Not sure yet"],
      },
      {
        question: "Have you ever taken an online course or tutorial about tech?",
        answers: ["Yes, multiple", "Yes, one or two", "No, but I plan to"],
      },
      {
        question: "How do you feel about solving problems using technology?",
        answers: ["I enjoy it", "It’s challenging", "Not sure yet"],
      },
      {
        question: "Do you like the idea of exploring different tech fields?",
        answers: ["Yes, it’s exciting", "Sometimes", "Not sure yet"],
      },
      {
        question: "How do you handle learning new concepts and tools?",
        answers: ["I’m quick to learn", "I take my time", "It’s challenging"],
      },
      {
        question: "Have you ever built or created something using technology?",
        answers: ["Yes, multiple times", "Yes, once", "No, but I’d like to"],
      },
      {
        question: "Do you enjoy exploring how technology impacts everyday life?",
        answers: ["Yes, it’s fun", "Sometimes", "Not sure yet"],
      },
      {
        question: "How interested are you in learning more about technology?",
        answers: ["Very interested", "Somewhat interested", "Not interested"],
      },
      {
        question: "Do you see yourself working in tech in the future?",
        answers: ["Yes, definitely", "Maybe", "Not sure"],
      },
      {
        question: "How do you feel about learning new tech tools and platforms?",
        answers: ["Excited", "Curious", "Overwhelmed"],
      },
    ],
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