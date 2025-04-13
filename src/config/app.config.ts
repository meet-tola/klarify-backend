import { getEnv } from "../utils/get-env"

const appConfig = () => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "5000"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    MONGO_URI: getEnv("MONGO_URI", ""),

    JWT_SECRET: getEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1d"),

    OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),

    GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),

    YOUTUBE_API_KEY: getEnv("YOUTUBE_API_KEY"),
    GOOGLE_SEARCH_API_KEY: getEnv("GOOGLE_SEARCH_API_KEY"),
    GOOGLE_CX: getEnv("GOOGLE_CX"),

    SMTP_PASS: getEnv("SMTP_PASS"),
    SMTP_USER: getEnv("SMTP_USER"),

    FRONTEND_URL: getEnv("FRONTEND_URL"),
    SERVER_DOMAIN: getEnv("SERVER_DOMAIN", `http://localhost:${getEnv("PORT", "5000")}`),
})

export const config = appConfig();

