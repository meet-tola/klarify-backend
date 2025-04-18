export const getMainContentPrompt = (skill: string, level: string) => `
You are an expert AI course creator specializing in comprehensive skill development. Generate the core structure for a learning roadmap for "${skill}" at the "${level}" level in STRICT JSON format.
Prioritize creating a complete, valid JSON structure even if it means slightly deviating from strict word counts.

### COURSE STRUCTURE:
{
  "title": "Master ${skill}: From ${level} to Pro",
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
    "youtubeVideos": "single keyword or double words related to ${skill} for sourcing all YouTube videos",
    "articles": "single keyword or double words  related to ${skill} for sourcing all relevant articles",
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
          "exercises": [
            {
              "name": "name of the exercise",
              "description": "description of the exercise",
              "task": "task to be performed"
            },
            {
              "name": "name of the exercise",
              "description": "description of the exercise",
              "task": "task to be performed"
            }
          ],
          "youtubeVideos": "single keyword or double words related to lesson Title for sourcing all YouTube videos",
          "articles": "single keyword or double words related to lesson Title for sourcing all relevant articles"
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
1. Generate exactly 6 phases with 5-7 lessons each
2. Phases must completely cover the skill from beginner to advanced level
3. Each lesson must include lessonTitle, lessonSummary, resources and empty sections array
4. Ensure valid JSON array output with no comments or markdown
5. Phase titles should follow the progression guide exactly
`;

export const getSectionPrompt = (skill: string, level: string, phaseTitle: string, lessonTitle: string, lessonSummary: string) => `
You are an expert AI course creator. Generate detailed sections for the following lesson in STRICT JSON format.

### LESSON DETAILS:
- Skill: ${skill}
- Level: ${level}
- Phase: ${phaseTitle}
- Lesson Title: ${lessonTitle}
- Lesson Summary: ${lessonSummary}

Generate a JSON object with a "sections" array containing three objects.
{
  "sections": [
    {
      "sectionTitle": "Title (6-8 words)",
      "sectionType": "Concept Explanation",
      "keyPoints": {
        "metadata": ["bullets"],
        "items": [
          "15-30 word key takeaway",
          "15-30 word key takeaway",
          "15-30 word key takeaway"
        ]
      }
      "content": [
        {
          "heading": {
            "text": "Specific concept (4-6 words)",
            "metadata": ["bold"]
          },
          "description": [
            {
              "text": "80-120 word detailed explanation",
              "metadata": ["bold", "highlight"]
            }
          ],
          "examples": [
            {
              "type": "case-study",
              "content": "50-100 word practical example",
              "metadata": []
            }
          ]
        }
      ],
      
    },
    {
      "sectionTitle": "Title (6-8 words)",
      "sectionType": "Practical Exercise",
      "keyPoints": {
        "metadata": ["bullets"],
        "items": [
          "15-30 word key takeaway",
          "15-30 word key takeaway",
          "15-30 word key takeaway"
        ]
      }
      "content": [
        {
          "heading": {
            "text": "Specific concept (4-6 words)",
            "metadata": ["bold"]
          },
          "description": [
            {
              "text": "80-100 word detailed explanation",
              "metadata": []
            }
          ],
          "examples": [
            {
              "type": "code-sample",
              "content": "50–80 word practical example",
              "metadata": ["code"]
            },
            {
              "type": "thought-experiment",
              "content": "Imagine if React didn't have hooks. How would you manage state in functional components? What patterns would emerge to work around this limitation?",
              "metadata": ["question"]
            }, // pick one of the two examples
          ]
        }
      ],
      
    },
    {
      "sectionTitle": "Title (6-8 words)",
      "sectionType": "Case Study",
      "keyPoints": {
        "metadata": ["bullets"],
        "items": [
          "15-30 word key takeaway",
          "15-30 word key takeaway",
          "15-30 word key takeaway"
        ]
      }
      "content": [
        {
          "heading": {
            "text": "Specific concept (4-6 words)",
            "metadata": ["bold"]
          },
          "description": [
            {
              "text": "80-100 word detailed explanation",
              "metadata": []
            }
          ],
          "examples": [
            {
              "type": "analogy",
              "content": "50–100 word practical example",
              "metadata": ["italic"]
            }
          ]
        }
      ],
      
    }
  ]
}

#### Available metadata values (used in \`metadata\` arrays):
- **bold** – Emphasize important text
- **italic** – Highlight supporting or contrasting ideas
- **code** – Denote code, syntax, or commands
- **quote** – For quoted insights or cited material
- **highlight** – Draw special attention to concepts
- **link:**[url] – Include reference URLs

#### Available example types:
- **case-study** – Real-world application or scenario
- **code-sample** – Short, illustrative code snippet or pattern
- **analogy** – Simple metaphor to explain a complex topic
- **thought-experiment** – Hypothetical situation to explore ideas

`;