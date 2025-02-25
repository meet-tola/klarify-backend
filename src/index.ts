import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { config } from "./config/app.config";
import cors from "cors";
import session from "cookie-session";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/error.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { ErrorCodeEnum } from "./enums/error-code.enum";
import { BadRequestException } from "./utils/appError";
import authRoutes from "./routes/auth.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import userRoutes from "./routes/user.route";
import skillsRoutes from "./routes/skills.route";
import careerRoutes from "./routes/career.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException(
      "This is a bad request",
      ErrorCodeEnum.AUTH_INVALID_TOKEN
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Test route",
    });

  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/skills`, isAuthenticated, skillsRoutes);
app.use(`${BASE_PATH}/career`, isAuthenticated, careerRoutes);


app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server running on http://localhost:${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});