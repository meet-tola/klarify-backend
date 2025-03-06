import axios from "axios";
import { OpenAI } from "openai";
import { config } from "../config/app.config";

const token = config.OPENAI_API_KEY;

const YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;

export const fetchYouTubeVideos = async (query: string) => {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
            q: query,
            key: YOUTUBE_API_KEY,
            part: "snippet",
            maxResults: 5,
            type: "video",
        },
    });

    return (response.data as { items: any[] }).items.map((item: any) => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnail: item.snippet.thumbnails.medium.url,
    }));
};

export const fetchArticles = async (query: string) => {
    const client = new OpenAI({
        baseURL: "https://models.inference.ai.azure.com",
        apiKey: token,
    });

    const prompt = `
Suggest 5 high-quality articles or blog posts to learn about "${query}". 

Provide the results in the following JSON format:

[
  {
    "title": "Article Title 1",
    "url": "https://linktoarticle1.com",
    "author": "Author Name or Blog Name"
  },
  ...
]

Ensure all links are from reliable sources like Medium, freeCodeCamp, official documentation, or industry blogs.

Return only the JSON array, without any extra text.
    `;

    const response = await client.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
        temperature: 0.7,
        max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content received from OpenAI");

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("Failed to extract JSON array from OpenAI response");

    try {
        const articles = JSON.parse(jsonMatch[0]);
        return articles;
    } catch (err) {
        console.error("Invalid JSON:", content);
        throw new Error("Failed to parse JSON from OpenAI response");
    }
};

export const fetchProjects = async (query: string) => {
    const client = new OpenAI({
        baseURL: "https://models.inference.ai.azure.com",
        apiKey: token,
    });

    const prompt = `
You are an expert in designing learning projects. Your task is to suggest 5 practical project ideas for learning and applying "${query}". 

Each project should include a title, a brief description, and a list of features. 

Please provide the suggestions in the following JSON format:

[
  {
    "title": "Project Title 1",
    "description": "Brief summary of project 1",
    "features": ["Feature 1", "Feature 2", "Feature 3"]
  },
  ...
]

Ensure the response is valid JSON without extra text.
    `;

    const response = await client.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
        temperature: 0.7,
        max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content received from OpenAI");

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("Failed to extract JSON array from OpenAI response");

    try {
        const projects = JSON.parse(jsonMatch[0]);
        return projects;
    } catch (err) {
        console.error("Invalid JSON:", content);
        throw new Error("Failed to parse JSON from OpenAI response");
    }

};
