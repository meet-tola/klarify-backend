import { getEnv } from "../utils/get-env"

const appConfig = ()  => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "5000"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    MONGO_URI: getEnv("MONGO_URI", ""),

    SESSION_SECRET: getEnv("SESSION_SECRET"),
    SESSION_EXPIRES_IN: getEnv("SESSION_EXPIRES_IN", "1d"),

    OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),

    YOUTUBE_API_KEY: getEnv("YOUTUBE_API_KEY"),

    SMTP_PASS:getEnv("SMTP_PASS"),
    SMTP_USER: getEnv("SMTP_USER"),

    FRONTEND_URL: getEnv("FRONTEND_URL", "localhost"),
    FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN"),
})

export const config = appConfig();

