import axios from "axios";
import { config } from "../config/app.config";

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

  return response.data.items.map((item: any) => ({
    title: item.snippet.title,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    thumbnail: item.snippet.thumbnails.medium.url,
  }));
};

export const fetchArticles = async (query: string) => {
  const response = await axios.get(`https://dev.to/api/articles?tag=${query}`);
  return response.data.slice(0, 5).map((article: any) => ({
    title: article.title,
    url: article.url,
    author: article.user.username,
  }));
};
