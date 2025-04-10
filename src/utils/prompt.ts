export const getMainContentPrompt = (skill: string, level: string) => `
You are an expert AI course creator specializing in comprehensive skill development. Generate the core structure for a learning roadmap for "${skill}" at the "${level}" level in STRICT JSON format.
Prioritize creating a complete, valid JSON structure even if it means slightly deviating from strict word counts.

### COURSE STRUCTURE:
{
  "title": "Complete ${skill} Mastery: From ${level} to Proficient",
  "skill": "${skill}",
  "level": "${level}",
  "tips": [
    {
      "title": "Good title for the first general tip",
      "content": "Description of the first general tip for mastering the skill across all phases of the course."
    },
    {
      "title": "Good title for the second general tip",
      "content": "Description of the second general tip for mastering the skill across all phases of the course."
    },
    {
      "title": "Good title for the third general tip",
      "content": "Description of the third general tip for mastering the skill across all phases of the course."
    },
    {
      "title": "Good title for the fourth general tip",
      "content": "Description of the fourth general tip for mastering the skill across all phases of the course."
    }
  ],
  "resources": {
    "youtubeVideos": "single keyword related to ${skill} for sourcing all YouTube videos",
    "articles": "single keyword related to ${skill} for sourcing all relevant articles",
    "projects": [
      {
        "name": "Project 1 Title",
        "description": "Brief overview of the project and its learning objectives.",
        "features": ["Key feature 1", "Key feature 2", "Key feature 3"]
      },
      {
        "name": "Project 2 Title",
        "description": "Brief overview of the project and its learning objectives.",
        "features": ["Key feature 1", "Key feature 2", "Key feature 3"]
      },
      {
        "name": "Project 3 Title",
        "description": "Brief overview of the project and its learning objectives.",
        "features": ["Key feature 1", "Key feature 2", "Key feature 3"]
      }
    ]
  }
}

### REQUIREMENTS:
1. Include all required fields (title, skill, level, tips, resources)
2. Ensure valid JSON output with no comments or markdown
3. Leave phases array empty as they will be generated separately
`;

export const getPhasesPrompt = (skill: string, level: string) => `
You are an expert AI course creator specializing in comprehensive skill development. Generate exactly 6 learning phases for "${skill}" at the "${level}" level in STRICT JSON format.

### PHASE STRUCTURE REQUIREMENTS:
[
  {
    "phaseTitle": "Phase 1: Foundations",
    "phaseDescription": "Build core fundamentals and basic concepts",
    "lessons": [
      {
        "lessonTitle": "Essential ${skill} Concepts",
        "lessonSummary": {
          "heading": "Mastering the building blocks",
          "description": [
            "This lesson establishes the foundational knowledge required for ${skill}.",
            "We'll explore core principles every ${level} practitioner needs to know.",
            "Practical examples will demonstrate real-world application."
          ]
        },
        "sections": [],
        "resources": {
          "exercises": ["Build a simple X", "Practice Y technique"]
        }
      }
      // 5-7 more lessons per phase
    ]
  }
  // 5 more phases following same structure
]

### PHASE PROGRESSION GUIDE (MUST FOLLOW THIS EXACT STRUCTURE):
1. Phase 1: Absolute Fundamentals (Basic concepts, terminology, setup)
2. Phase 2: Core Concepts (Essential techniques and theory)
3. Phase 3: Practical Applications (Beginner projects and use cases)
4. Phase 4: Intermediate Techniques (More complex concepts)
5. Phase 5: Advanced Topics (Specialized knowledge areas)
6. Phase 6: Mastery and Real-world Implementation (Complex projects and optimizations)

### REQUIREMENTS:
1. Generate exactly 6 phases with 6-8 lessons each
2. Phases must completely cover the skill from beginner to advanced level
3. Each lesson must include lessonTitle, lessonSummary, and empty sections array
4. Ensure valid JSON array output with no comments or markdown
5. Phase titles should follow the progression guide exactly
`;