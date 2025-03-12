import "dotenv/config";
import express from "express";
import { config } from "./config/app.config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import authRoutes from "./routes/auth.route";
import { isAuthenticated } from "./middlewares/isAuthenticated.middleware";
import userRoutes from "./routes/user.route";
import skillsRoutes from "./routes/skills.route";
import careerRoutes from "./routes/career.route";
import roadmapRoutes from "./routes/roadmap.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: config.FRONTEND_ORIGIN, credentials: true }));

// Routes
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/skills`, isAuthenticated, skillsRoutes);
app.use(`${BASE_PATH}/career`, isAuthenticated, careerRoutes);
app.use(`${BASE_PATH}/roadmap`, isAuthenticated, roadmapRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(config.PORT, async () => {
  console.log(`Server running on http://localhost:${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
