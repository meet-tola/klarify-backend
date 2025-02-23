import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { config } from "./config/app.config";
import cors from "cors";
import session from "cookie-session";
import connectDatabase from "./config/database.config";
import { error } from "console";
import { errorHandler } from "./middlewares/error.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";

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
    '/',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // const user = await UserModel.findOne({
        //     email: email
        // });
        // if (!user) {
        //     return res.status(HTTPSTATUS.NOT_FOUND).json({
        //         message: "User not found",
        //     });
        // }
        
       return res.status(HTTPSTATUS.OK).json({
            message: "Hello World",
        });
    })
);

app.use(errorHandler);

app.listen(config.PORT, async () => {
    console.log(`Server running on http://localhost:${config.PORT} in ${config.NODE_ENV}`);
    await connectDatabase();
});